import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { isValidJson } from './utils.js';

interface ResolveBodyOptions {
  dataFlag: string | undefined;
  hasRequestBody: boolean;
  isRequired: boolean;
  interactive?: boolean;
  defaultTemplate?: unknown;
  /** Cache key for persisting editor payloads (e.g. "entity/createEntity") */
  cacheKey?: string;
}

/**
 * Resolve request body from multiple sources.
 *
 * Priority:
 * 1. -d flag with JSON data
 * 2. Piped stdin (when not a TTY)
 * 3. Interactive $EDITOR prompt (when TTY and interactive mode)
 * 4. null (no body)
 */
export const resolveBody = async (opts: ResolveBodyOptions): Promise<unknown | null> => {
  const { dataFlag, hasRequestBody, isRequired, interactive, defaultTemplate, cacheKey } = opts;

  // 1. Explicit -d flag
  if (dataFlag) {
    if (!isValidJson(dataFlag)) {
      throw new Error('Invalid JSON in -d flag. Provide valid JSON data.');
    }
    return JSON.parse(dataFlag);
  }

  // 2. Check for piped stdin
  if (!process.stdin.isTTY) {
    const input = await readStdin();
    if (input.trim()) {
      if (!isValidJson(input)) {
        throw new Error('Invalid JSON from stdin. Provide valid JSON data.');
      }
      return JSON.parse(input);
    }
  }

  // 3. Interactive editor prompt (with retry on invalid JSON)
  if (hasRequestBody && interactive && process.stdin.isTTY) {
    const cached = cacheKey ? loadPayloadCache(cacheKey) : undefined;
    let editorDefault = cached ?? (defaultTemplate ? JSON.stringify(defaultTemplate, null, 2) : '{\n  \n}');
    const { editor } = await import('@inquirer/prompts');
    const MAX_RETRIES = 3;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const result = await editor({
        message: attempt === 0 ? 'Edit request body (JSON):' : 'Fix JSON and save (or empty to cancel):',
        default: editorDefault,
        waitForUserInput: false,
      });

      const trimmed = result.trim();
      if (!trimmed) {
        if (cacheKey) clearPayloadCache(cacheKey);
        if (isRequired) {
          throw new Error('Request body is required but editor returned empty content.');
        }
        return null;
      }

      if (isValidJson(trimmed)) {
        if (cacheKey) savePayloadCache(cacheKey, trimmed);
        return JSON.parse(trimmed);
      }

      // Show parse error and re-open editor with the invalid content so user can fix it
      const parseError = getJsonParseError(trimmed);
      process.stderr.write(`\x1b[31mInvalid JSON: ${parseError}\x1b[0m\n`);

      editorDefault = trimmed;
    }

    throw new Error('Invalid JSON from editor after multiple attempts.');
  }

  // 4. No body provided
  if (hasRequestBody && isRequired) {
    throw new Error(
      'This operation requires a request body. Provide data with -d \'{"key":"value"}\' or pipe via stdin.',
    );
  }

  return null;
};

/**
 * Check if an operation has a request body (and if it's required).
 */
export const getRequestBodyInfo = (
  spec: Record<string, unknown>,
  operationId: string,
): { hasBody: boolean; isRequired: boolean } => {
  const paths = (spec.paths ?? {}) as Record<string, Record<string, unknown>>;

  for (const methods of Object.values(paths)) {
    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']) {
      const op = methods[method] as Record<string, unknown> | undefined;
      if (!op || op.operationId !== operationId) continue;

      const reqBody = op.requestBody as Record<string, unknown> | undefined;
      if (!reqBody) return { hasBody: false, isRequired: false };

      return {
        hasBody: true,
        isRequired: !!reqBody.required,
      };
    }
  }

  return { hasBody: false, isRequired: false };
};

/**
 * Payload cache: persists the last editor payload per operation so users
 * can re-edit if they make a mistake. Stored under ~/.config/epilot/cache/.
 */
const getPayloadCacheDir = (): string => {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const base = xdgConfig || join(homedir(), '.config');
  return join(base, 'epilot', 'cache');
};

const getPayloadCachePath = (cacheKey: string): string => {
  // cacheKey is "apiName/operationId" — use as directory/file
  return join(getPayloadCacheDir(), `${cacheKey.replace(/\//g, '_')}.json`);
};

export const loadPayloadCache = (cacheKey: string): string | undefined => {
  const path = getPayloadCachePath(cacheKey);
  if (!existsSync(path)) return undefined;
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    return undefined;
  }
};

export const savePayloadCache = (cacheKey: string, payload: string): void => {
  const dir = getPayloadCacheDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(getPayloadCachePath(cacheKey), payload, 'utf-8');
};

export const clearPayloadCache = (cacheKey: string): void => {
  const path = getPayloadCachePath(cacheKey);
  if (existsSync(path)) {
    try {
      unlinkSync(path);
    } catch {
      // ignore
    }
  }
};

const getJsonParseError = (str: string): string => {
  try {
    JSON.parse(str);
    return 'unknown error';
  } catch (e) {
    return e instanceof Error ? e.message : String(e);
  }
};

const readStdin = (): Promise<string> => {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf-8');

    const timeout = setTimeout(() => {
      process.stdin.removeAllListeners('data');
      process.stdin.removeAllListeners('end');
      resolve(data);
    }, 100);

    process.stdin.on('data', (chunk) => {
      data += chunk;
    });

    process.stdin.on('end', () => {
      clearTimeout(timeout);
      resolve(data);
    });

    // If stdin is already ended
    if (process.stdin.readableEnded) {
      clearTimeout(timeout);
      resolve(data);
    }
  });
};
