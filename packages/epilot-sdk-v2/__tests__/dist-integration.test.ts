/**
 * @vitest-environment node
 *
 * Integration tests that import from the built dist/ output
 * and make real API calls intercepted by msw.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const DIST_DIR = resolve(__dirname, '../dist');
const APIS_DIR = resolve(DIST_DIR, 'apis');
const DEFS_DIR = resolve(__dirname, '../definitions');

const ENTITY_BASE = 'https://entity.sls.epilot.io';
const USER_BASE = 'https://user.sls.epilot.io';

const apiEntries = (extension: string) =>
  readdirSync(APIS_DIR)
    .filter((f) => f.endsWith(extension) && !f.endsWith('.d.ts') && !f.startsWith('_'))
    .map((file) => ({ file, api: file.slice(0, -extension.length) }));

const toCamelCase = (api: string) => api.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());

/** `openapi()` serves the specs committed under src/definitions, and rejects for an API without one. */
const hasFullSpec = (api: string) => existsSync(resolve(__dirname, '../src/definitions', `${api}.json`));

const specNotFound = (api: string) => `Module not found in bundle: ./definitions/${api}.json`;

const isCodeFile = (file: string) => file.startsWith('apis/') || file.startsWith('chunk-');

/** Dist files an entry can load through static and dynamic imports of its code chunks. */
const reachableDistFiles = (entry: string): string[] => {
  const reached = new Set<string>();
  const pending = [entry];

  while (pending.length > 0) {
    const file = pending.pop() as string;
    if (reached.has(file)) continue;
    reached.add(file);
    // Docs and specs are data: their text may look like imports.
    if (!isCodeFile(file)) continue;

    const source = readFileSync(resolve(DIST_DIR, file), 'utf-8');
    for (const [, specifier] of source.matchAll(/(?:from|import|require)\s*\(?\s*['"](\.{1,2}\/[^'"]+)['"]/g)) {
      pending.push(relative(DIST_DIR, resolve(DIST_DIR, dirname(file), specifier)));
    }
  }

  return [...reached];
};

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ─── 1. ESM dist imports + API calls ──────────────────────────────────

describe('ESM dist imports', () => {
  it('main SDK: authorize + make API call', async () => {
    let capturedAuth: string | null = null;
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
        capturedAuth = request.headers.get('authorization');
        return HttpResponse.json({ results: [{ slug: 'contact' }] });
      }),
    );

    const { createSDK } = await import('../dist/index.js');
    const sdk = createSDK();
    sdk.authorize('esm-dist-token');

    const { data } = await sdk.entity.listSchemas();
    expect(data.results).toHaveLength(1);
    expect(data.results[0].slug).toBe('contact');
    expect(capturedAuth).toBe('Bearer esm-dist-token');
  });

  it('tree-shaken entity import: getClient + API call', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/:slug/:id`, ({ params }) =>
        HttpResponse.json({ _id: params.id, _schema: params.slug }),
      ),
    );

    const mod = await import('../dist/apis/entity.js');
    const client = mod.getClient();
    expect(client.getEntity).toBeTypeOf('function');

    const { data } = await client.getEntity({ slug: 'contact', id: 'abc-123' });
    expect(data).toEqual({ _id: 'abc-123', _schema: 'contact' });
  });

  it('tree-shaken entity import: createClient + authorize + API call', async () => {
    let capturedAuth: string | null = null;
    server.use(
      http.post(`${ENTITY_BASE}/v1/entity/:slug`, ({ request }) => {
        capturedAuth = request.headers.get('authorization');
        return HttpResponse.json({ entity: { _id: 'new-1', _schema: 'contact' } });
      }),
    );

    const mod = await import('../dist/apis/entity.js');
    const client = mod.createClient();
    mod.authorize(client, 'fresh-token');

    const { data } = await client.createEntity({ slug: 'contact' }, { first_name: 'Jane' });
    expect(data.entity._id).toBe('new-1');
    expect(capturedAuth).toBe('Bearer fresh-token');
  });

  it('tree-shaken user import: API call', async () => {
    server.use(http.get(`${USER_BASE}/v1/users/me`, () => HttpResponse.json({ _id: 'u1', email: 'dist@test.com' })));

    const mod = await import('../dist/apis/user.js');
    const client = mod.getClient();
    const { data } = await client.getMe();
    expect(data.email).toBe('dist@test.com');
  });

  it('handle proxy forwards operations from dist', async () => {
    server.use(
      http.post(`${ENTITY_BASE}/v1/entity:search`, () =>
        HttpResponse.json({ hits: 2, results: [{ _id: '1' }, { _id: '2' }] }),
      ),
    );

    const mod = await import('../dist/apis/entity.js');
    const { data } = await mod.entity.searchEntities(null, { q: 'test' });
    expect(data.hits).toBe(2);
    expect(data.results).toHaveLength(2);
  });
});

// ─── 2. CJS dist imports + API calls ──────────────────────────────────

describe('CJS dist imports', () => {
  it('main SDK: authorize + make API call', async () => {
    let capturedAuth: string | null = null;
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/schemas`, ({ request }) => {
        capturedAuth = request.headers.get('authorization');
        return HttpResponse.json({ results: [{ slug: 'order' }] });
      }),
    );

    const { createSDK } = require('../dist/index.cjs');
    const sdk = createSDK();
    sdk.authorize('cjs-dist-token');

    const { data } = await sdk.entity.listSchemas();
    expect(data.results[0].slug).toBe('order');
    expect(capturedAuth).toBe('Bearer cjs-dist-token');
  });

  it('tree-shaken entity CJS import: API call', async () => {
    server.use(
      http.get(`${ENTITY_BASE}/v1/entity/:slug/:id`, () =>
        HttpResponse.json({ _id: 'cjs-entity', _schema: 'contact' }),
      ),
    );

    const mod = require('../dist/apis/entity.cjs');
    const client = mod.getClient();
    const { data } = await client.getEntity({ slug: 'contact', id: 'cjs-entity' });
    expect(data._id).toBe('cjs-entity');
  });

  it('tree-shaken user CJS import: API call', async () => {
    server.use(
      http.get(`${USER_BASE}/v1/users/me`, () => HttpResponse.json({ _id: 'cjs-user', email: 'cjs@test.com' })),
    );

    const mod = require('../dist/apis/user.cjs');
    const client = mod.getClient();
    const { data } = await client.getMe();
    expect(data.email).toBe('cjs@test.com');
  });
});

// ─── 3. All dist API entries are importable ───────────────────────────

describe('all dist APIs importable', () => {
  it('all ESM entries export getClient and createClient', async () => {
    const jsFiles = readdirSync(APIS_DIR).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
    expect(jsFiles.length).toBeGreaterThan(40);

    for (const file of jsFiles) {
      const mod = await import(`../dist/apis/${file}`);
      expect(mod.getClient).toBeTypeOf('function');
      expect(mod.createClient).toBeTypeOf('function');
    }
  });

  it('all CJS entries export getClient and createClient', () => {
    const cjsFiles = readdirSync(APIS_DIR).filter((f) => f.endsWith('.cjs') && !f.startsWith('_'));
    expect(cjsFiles.length).toBeGreaterThan(40);

    for (const file of cjsFiles) {
      const mod = require(`../dist/apis/${file}`);
      expect(mod.getClient).toBeTypeOf('function');
      expect(mod.createClient).toBeTypeOf('function');
    }
  });

  it.each(['.js', '.cjs'])('every %s entry serves its own docs and spec on each access path', async (extension) => {
    const { epilot } = extension === '.js' ? await import('../dist/index.js') : require('../dist/index.cjs');

    for (const { file, api } of apiEntries(extension)) {
      const mod = extension === '.js' ? await import(`../dist/apis/${file}`) : require(`../dist/apis/${file}`);
      const handle = mod[toCamelCase(api)];
      const rootHandle = epilot[toCamelCase(api)];
      const docs = JSON.parse(readFileSync(resolve(__dirname, '../src/docs', `${api}.json`), 'utf-8'));

      for (const source of [mod.getClient(), mod.createClient(), handle, ...(rootHandle ? [rootHandle] : [])]) {
        expect(await source.help(), file).toBe(docs);

        if (hasFullSpec(api)) {
          expect(await source.openapi(), file).toBe(await mod.getClient().openapi());
        } else {
          await expect(source.openapi(), file).rejects.toThrow(specNotFound(api));
        }
      }

      if (hasFullSpec(api)) expect((await mod.getClient().openapi()).paths, file).toBeDefined();
      expect(mod.help, file).toBeUndefined();
      expect(mod.openapi, file).toBeUndefined();
      expect(mod.createClient(), file).not.toBe(mod.getClient());
      expect(mod.createClient().help, file).not.toBe(mod.getClient().help);
    }
  });
});

// ─── 4. Definition files ──────────────────────────────────────────────

describe('definition files', () => {
  it('runtime definitions exist and are compact format', () => {
    const runtimeFiles = readdirSync(DEFS_DIR).filter((f) => f.endsWith('-runtime.json'));
    expect(runtimeFiles.length).toBeGreaterThan(40);

    for (const file of runtimeFiles) {
      const def = JSON.parse(readFileSync(resolve(DEFS_DIR, file), 'utf-8'));
      expect(def.s).toBeDefined();
      expect(Array.isArray(def.o)).toBe(true);
    }
  });

  it('full OpenAPI definitions exist with standard structure', () => {
    const fullFiles = readdirSync(DEFS_DIR).filter((f) => f.endsWith('.json') && !f.includes('-runtime'));
    expect(fullFiles.length).toBeGreaterThan(40);

    for (const file of fullFiles) {
      const def = JSON.parse(readFileSync(resolve(DEFS_DIR, file), 'utf-8'));
      expect(def.openapi).toBeDefined();
      expect(def.paths).toBeDefined();
      expect(def.info).toBeDefined();
    }
  });
});

// ─── 5. Lazy loading / bundle size ────────────────────────────────────

describe('lazy loading', () => {
  it('index.js does not inline definition data', () => {
    const content = readFileSync(resolve(DIST_DIR, 'index.js'), 'utf-8');
    expect(content.length).toBeLessThan(100_000);
  });

  it('index.cjs does not inline definition data', () => {
    const content = readFileSync(resolve(DIST_DIR, 'index.cjs'), 'utf-8');
    expect(content.length).toBeLessThan(100_000);
  });

  it.each(['.js', '.cjs'])('a %s API entry reaches its own docs and spec and no other data', (extension) => {
    for (const { file, api } of apiEntries(extension)) {
      const reached = reachableDistFiles(`apis/${file}`);
      const dataFiles = reached.filter((reachedFile) => !isCodeFile(reachedFile));
      const ownDocsOrSpec = new RegExp(`^${api}-[A-Z0-9]{8}\\${extension}$`);
      const codeBytes = reached
        .filter(isCodeFile)
        .reduce((bytes, codeFile) => bytes + readFileSync(resolve(DIST_DIR, codeFile)).byteLength, 0);

      expect(
        dataFiles.filter((dataFile) => !ownDocsOrSpec.test(dataFile)),
        file,
      ).toEqual([]);
      expect(dataFiles.length, file).toBe(hasFullSpec(api) ? 2 : 1);
      // Docs or specs inlined into a code chunk would show here: the largest entry reaches about 40 KB of code.
      expect(codeBytes, file).toBeLessThan(100_000);
    }
  });

  it('dist file structure is complete', () => {
    expect(existsSync(resolve(DIST_DIR, 'index.js'))).toBe(true);
    expect(existsSync(resolve(DIST_DIR, 'index.cjs'))).toBe(true);
    expect(existsSync(resolve(DIST_DIR, 'index.d.ts'))).toBe(true);

    const files = readdirSync(APIS_DIR);
    const jsFiles = files.filter((f) => f.endsWith('.js') && !f.startsWith('_'));
    const cjsFiles = files.filter((f) => f.endsWith('.cjs') && !f.startsWith('_'));
    const dtsFiles = files.filter((f) => f.endsWith('.d.ts') && !f.startsWith('_'));

    expect(jsFiles.length).toBeGreaterThan(40);
    expect(cjsFiles.length).toEqual(jsFiles.length);
    expect(dtsFiles.length).toEqual(jsFiles.length);
  });
});
