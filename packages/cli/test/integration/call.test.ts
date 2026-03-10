/**
 * Integration tests for the CLI call flow.
 *
 * Uses MSW to intercept real HTTP requests made by openapi-client-axios,
 * verifying that callApi correctly:
 * - loads the bundled OpenAPI definition
 * - resolves parameters (named + positional)
 * - sends request body
 * - sets auth headers
 * - formats and outputs responses
 * - handles errors
 */
import { describe, it, expect, vi, beforeAll, afterAll, afterEach, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { callApi, type CallArgs } from '../../src/lib/call.js';

// ─── Capture stdout / stderr ────────────────────────────────────────────────

let stdoutOutput: string;
let stderrOutput: string;
let stdoutSpy: ReturnType<typeof vi.spyOn>;
let stderrSpy: ReturnType<typeof vi.spyOn>;

const originalStdoutIsTTY = process.stdout.isTTY;
const originalStderrIsTTY = process.stderr.isTTY;

beforeEach(() => {
  stdoutOutput = '';
  stderrOutput = '';
  stdoutSpy = vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
    stdoutOutput += String(chunk);
    return true;
  });
  stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
    stderrOutput += String(chunk);
    return true;
  });
  // Simulate TTY so status badge is shown in tests
  Object.defineProperty(process.stdout, 'isTTY', { value: true, writable: true });
  Object.defineProperty(process.stderr, 'isTTY', { value: true, writable: true });
  // Ensure pager always falls through to direct write in tests
  Object.defineProperty(process.stdout, 'rows', { value: 9999, writable: true, configurable: true });
});

afterEach(() => {
  stdoutSpy.mockRestore();
  stderrSpy.mockRestore();
  Object.defineProperty(process.stdout, 'isTTY', { value: originalStdoutIsTTY, writable: true });
  Object.defineProperty(process.stderr, 'isTTY', { value: originalStderrIsTTY, writable: true });
});

// ─── Prevent process.exit from killing the test runner ──────────────────────

let lastExitCode: number | undefined;

beforeEach(() => {
  lastExitCode = undefined;
});

const exitSpy = vi.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
  lastExitCode = Number(code ?? 0);
  throw new Error(`process.exit(${code})`);
});

afterAll(() => {
  exitSpy.mockRestore();
});

// ─── MSW Server ─────────────────────────────────────────────────────────────

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ─── Helpers ────────────────────────────────────────────────────────────────

const ENTITY_BASE = 'https://entity.sls.epilot.io';
const USER_BASE = 'https://user.sls.epilot.io';
const FILE_BASE = 'https://file.sls.epilot.io';

const TOKEN = 'test-integration-token';

const baseArgs: Partial<CallArgs> = {
  token: TOKEN,
  interactive: false,
  json: true,
};

const call = (apiName: string, args: Partial<CallArgs>) => callApi(apiName, { ...baseArgs, ...args } as CallArgs);

// ─── Entity API ─────────────────────────────────────────────────────────────

describe('Entity API', () => {
  it('GET listSchemas', async () => {
    const mockSchemas = {
      results: [
        { slug: 'contact', name: 'Contact' },
        { slug: 'order', name: 'Order' },
      ],
    };

    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
        expect(request.headers.get('authorization')).toBe(`Bearer ${TOKEN}`);
        return HttpResponse.json(mockSchemas);
      }),
    );

    await call('entity', { operation: 'listSchemas' });

    const output = JSON.parse(stdoutOutput);
    expect(output.results).toHaveLength(2);
    expect(output.results[0].slug).toBe('contact');
  });

  it('GET getEntity with -p params', async () => {
    const mockEntity = {
      entity: { _id: 'abc-123', _schema: 'contact', first_name: 'John', last_name: 'Doe' },
      relations: [],
    };

    let capturedUrl: string | undefined;

    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/contact/abc-123`, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json(mockEntity);
      }),
    );

    await call('entity', {
      operation: 'getEntity',
      param: ['slug=contact', 'id=abc-123'],
    });

    const output = JSON.parse(stdoutOutput);
    expect(output.entity._id).toBe('abc-123');
    expect(output.entity.first_name).toBe('John');
    expect(capturedUrl).toContain('/v1/entity/contact/abc-123');
  });

  it('GET getEntity with positional args', async () => {
    const mockEntity = {
      entity: { _id: 'xyz-789', _schema: 'order', total: 100 },
      relations: [],
    };

    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/:slug/:id`, (_info) => {
        return HttpResponse.json(mockEntity);
      }),
    );

    // Positional args map to path params in declaration order from spec:
    // EntityIdPathParam (id) first, then EntitySlugPathParam (slug)
    await call('entity', {
      operation: 'getEntity',
      _args: ['xyz-789', 'order'],
    });

    const output = JSON.parse(stdoutOutput);
    expect(output.entity._schema).toBe('order');
  });

  it('POST searchEntities with body', async () => {
    const mockResults = {
      hits: 42,
      results: [
        { _id: '1', _schema: 'contact', first_name: 'Alice' },
        { _id: '2', _schema: 'contact', first_name: 'Bob' },
      ],
    };

    let capturedBody: unknown;

    server.use(
      http.post(`${ENTITY_BASE}/v1/entity:search`, async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json(mockResults);
      }),
    );

    await call('entity', {
      operation: 'searchEntities',
      data: JSON.stringify({ q: 'first_name:Alice', size: 10 }),
    });

    const output = JSON.parse(stdoutOutput);
    expect(output.hits).toBe(42);
    expect(output.results).toHaveLength(2);
    expect(capturedBody).toEqual({ q: 'first_name:Alice', size: 10 });
  });

  it('POST createEntity with slug param and body', async () => {
    const mockCreated = { entity: { _id: 'new-entity-1', _schema: 'contact', first_name: 'New' } };

    let capturedBody: unknown;

    server.use(
      http.post(`${ENTITY_BASE}/v1/entity/contact`, async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json(mockCreated, { status: 201 });
      }),
    );

    await call('entity', {
      operation: 'createEntity',
      param: 'slug=contact',
      data: JSON.stringify({ first_name: 'New', last_name: 'Entity' }),
    });

    const output = JSON.parse(stdoutOutput);
    expect(output.entity._id).toBe('new-entity-1');
    expect(capturedBody).toEqual({ first_name: 'New', last_name: 'Entity' });
  });

  it('PUT updateEntity with params and body', async () => {
    const mockUpdated = { entity: { _id: 'abc-123', _schema: 'contact', first_name: 'Updated' } };

    let capturedBody: unknown;

    server.use(
      http.put(`${ENTITY_BASE}/v1/entity/contact/abc-123`, async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json(mockUpdated);
      }),
    );

    await call('entity', {
      operation: 'updateEntity',
      param: ['slug=contact', 'id=abc-123'],
      data: JSON.stringify({ first_name: 'Updated' }),
    });

    const output = JSON.parse(stdoutOutput);
    expect(output.entity.first_name).toBe('Updated');
    expect(capturedBody).toEqual({ first_name: 'Updated' });
  });

  it('DELETE deleteEntity', async () => {
    server.use(
      http.delete(`${ENTITY_BASE}/v1/entity/contact/to-delete`, () => {
        return new HttpResponse(null, { status: 204 });
      }),
    );

    await call('entity', {
      operation: 'deleteEntity',
      param: ['slug=contact', 'id=to-delete'],
    });

    // 204 No Content — no body output
    expect(lastExitCode).toBeUndefined(); // no process.exit call = success
  });
});

// ─── User API ───────────────────────────────────────────────────────────────

describe('User API', () => {
  it('GET getMeV2', async () => {
    const mockUser = {
      id: 'user-1',
      email: 'dev@epilot.cloud',
      name: 'Test User',
      organization_id: 'org-123',
    };

    server.use(
      http.get(`${USER_BASE}/v2/users/me`, ({ request }) => {
        expect(request.headers.get('authorization')).toBe(`Bearer ${TOKEN}`);
        return HttpResponse.json(mockUser);
      }),
    );

    await call('user', { operation: 'getMeV2' });

    const output = JSON.parse(stdoutOutput);
    expect(output.email).toBe('dev@epilot.cloud');
    expect(output.organization_id).toBe('org-123');
  });

  it('GET getUserV2 with id param', async () => {
    const mockUser = { id: 'user-42', email: 'other@epilot.cloud', name: 'Other User' };

    server.use(
      http.get(`${USER_BASE}/v2/users/user-42`, () => {
        return HttpResponse.json(mockUser);
      }),
    );

    await call('user', {
      operation: 'getUserV2',
      param: 'id=user-42',
    });

    const output = JSON.parse(stdoutOutput);
    expect(output.id).toBe('user-42');
  });

  it('GET listUsersV2', async () => {
    const mockUsers = {
      results: [
        { id: 'u1', email: 'a@epilot.cloud' },
        { id: 'u2', email: 'b@epilot.cloud' },
      ],
    };

    server.use(
      http.get(`${USER_BASE}/v2/users`, () => {
        return HttpResponse.json(mockUsers);
      }),
    );

    await call('user', { operation: 'listUsersV2' });

    const output = JSON.parse(stdoutOutput);
    expect(output.results).toHaveLength(2);
  });
});

// ─── Error Handling ─────────────────────────────────────────────────────────

describe('Error handling', () => {
  it('returns 403 and exits with code 1', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, () => {
        return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
      }),
    );

    await expect(call('entity', { operation: 'listSchemas' })).rejects.toThrow('process.exit(1)');

    expect(lastExitCode).toBe(1);
    const output = JSON.parse(stdoutOutput);
    expect(output.message).toBe('Forbidden');
  });

  it('returns 404 and exits with code 1', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/contact/nonexistent`, () => {
        return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
      }),
    );

    await expect(
      call('entity', {
        operation: 'getEntity',
        param: ['slug=contact', 'id=nonexistent'],
      }),
    ).rejects.toThrow('process.exit(1)');

    expect(lastExitCode).toBe(1);
  });

  it('returns 500 and exits with code 1', async () => {
    server.use(
      http.post(`${ENTITY_BASE}/v1/entity:search`, () => {
        return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }),
    );

    await expect(
      call('entity', {
        operation: 'searchEntities',
        data: '{"q":"*"}',
      }),
    ).rejects.toThrow('process.exit(1)');

    expect(lastExitCode).toBe(1);
  });

  it('exits with code 1 for unknown operation', async () => {
    await expect(call('entity', { operation: 'nonExistentOperation' })).rejects.toThrow('process.exit(1)');

    expect(lastExitCode).toBe(1);
    expect(stderrOutput).toContain('Unknown operation');
  });

  it('exits with code 1 when no token and non-interactive', async () => {
    // Ensure no token is resolved from env or stored credentials
    const origToken = process.env.EPILOT_TOKEN;
    const origProfile = process.env.EPILOT_PROFILE;
    const origXdg = process.env.XDG_CONFIG_HOME;
    delete process.env.EPILOT_TOKEN;
    delete process.env.EPILOT_PROFILE;
    process.env.XDG_CONFIG_HOME = '/tmp/epilot-test-no-creds';

    try {
      await expect(
        callApi('entity', {
          operation: 'listSchemas',
          interactive: false,
          // no token
        } as CallArgs),
      ).rejects.toThrow('process.exit(1)');

      expect(lastExitCode).toBe(1);
      expect(stderrOutput).toContain('No authentication token');
    } finally {
      if (origToken !== undefined) process.env.EPILOT_TOKEN = origToken;
      else delete process.env.EPILOT_TOKEN;
      if (origProfile !== undefined) process.env.EPILOT_PROFILE = origProfile;
      else delete process.env.EPILOT_PROFILE;
      if (origXdg !== undefined) process.env.XDG_CONFIG_HOME = origXdg;
      else delete process.env.XDG_CONFIG_HOME;
    }
  });
});

// ─── Custom Headers ─────────────────────────────────────────────────────────

describe('Custom headers', () => {
  it('sends custom headers with -H', async () => {
    let capturedHeaders: Record<string, string> = {};

    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
        capturedHeaders = {
          'x-epilot-org-id': request.headers.get('x-epilot-org-id') || '',
          'x-custom': request.headers.get('x-custom') || '',
        };
        return HttpResponse.json({ results: [] });
      }),
    );

    await call('entity', {
      operation: 'listSchemas',
      header: ['x-epilot-org-id: 12345', 'x-custom: my-value'],
    });

    expect(capturedHeaders['x-epilot-org-id']).toBe('12345');
    expect(capturedHeaders['x-custom']).toBe('my-value');
  });
});

// ─── Server Override ────────────────────────────────────────────────────────

describe('Server override', () => {
  it('uses --server flag to override base URL', async () => {
    let requestReceived = false;

    server.use(
      http.get('http://localhost:9999/v1/entity/schemas', () => {
        requestReceived = true;
        return HttpResponse.json({ results: [] });
      }),
    );

    await call('entity', {
      operation: 'listSchemas',
      server: 'http://localhost:9999',
    });

    expect(requestReceived).toBe(true);
  });
});

// ─── JSONata ────────────────────────────────────────────────────────────────

describe('JSONata transformation', () => {
  it('filters response with JSONata expression', async () => {
    const mockResults = {
      hits: 2,
      results: [
        { _id: '1', _schema: 'contact', first_name: 'Alice' },
        { _id: '2', _schema: 'contact', first_name: 'Bob' },
      ],
    };

    server.use(
      http.post(`${ENTITY_BASE}/v1/entity:search`, () => {
        return HttpResponse.json(mockResults);
      }),
    );

    await call('entity', {
      operation: 'searchEntities',
      data: '{"q":"*"}',
      jsonata: 'results[0].first_name',
    });

    // JSONata extracts just the first name (strings output unquoted)
    expect(stdoutOutput.trim()).toBe('Alice');
  });

  it('extracts nested field with JSONata', async () => {
    const mockUser = { id: 'u1', email: 'dev@epilot.cloud', name: 'Dev' };

    server.use(
      http.get(`${USER_BASE}/v2/users/me`, () => {
        return HttpResponse.json(mockUser);
      }),
    );

    await call('user', {
      operation: 'getMeV2',
      jsonata: 'email',
    });

    expect(stdoutOutput.trim()).toBe('dev@epilot.cloud');
  });
});

// ─── Output Modes ───────────────────────────────────────────────────────────

describe('Output modes', () => {
  const mockData = { results: [{ slug: 'contact' }] };

  beforeEach(() => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, () => {
        return HttpResponse.json(mockData);
      }),
    );
  });

  it('--json outputs compact JSON without status badge', async () => {
    await call('entity', { operation: 'listSchemas', json: true });

    // stdout has JSON, stderr has no status badge in json mode
    const output = JSON.parse(stdoutOutput);
    expect(output.results[0].slug).toBe('contact');
    expect(stderrOutput).toBe(''); // no status badge in --json mode
  });

  it('non-json mode outputs status badge', async () => {
    await call('entity', { operation: 'listSchemas', json: false });

    const combined = stdoutOutput + stderrOutput;
    expect(combined).toContain('200');
    expect(combined).toContain('"contact"');
  });

  it('--include shows response meta and body labels', async () => {
    await call('entity', { operation: 'listSchemas', include: true });

    const combined = stdoutOutput + stderrOutput;
    expect(combined).toContain('RESPONSE META:');
    expect(combined).toContain('"code": 200');
    expect(combined).toContain('RESPONSE BODY:');
  });

  it('--verbose shows request meta and response meta', async () => {
    await call('entity', { operation: 'listSchemas', verbose: true });

    const combined = stdoutOutput + stderrOutput;
    expect(combined).toContain('REQUEST META:');
    expect(combined).toContain('GET');
    expect(combined).toContain('Bearer ***');
    expect(combined).toContain('RESPONSE META:');
  });
});

// ─── File API (different base URL) ─────────────────────────────────────────

describe('File API', () => {
  it('GET getFile with id param', async () => {
    const mockFile = {
      _id: 'file-abc',
      filename: 'document.pdf',
      mime_type: 'application/pdf',
      size_bytes: 12345,
    };

    server.use(
      http.get(`${FILE_BASE}/v2/files/file-abc`, () => {
        return HttpResponse.json(mockFile);
      }),
    );

    await call('file', {
      operation: 'getFile',
      param: 'id=file-abc',
    });

    const output = JSON.parse(stdoutOutput);
    expect(output._id).toBe('file-abc');
    expect(output.filename).toBe('document.pdf');
  });
});
