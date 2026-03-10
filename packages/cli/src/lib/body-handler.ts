import { isValidJson } from './utils.js';

/**
 * Resolve request body from multiple sources.
 *
 * Priority:
 * 1. -d flag with JSON data
 * 2. Piped stdin (when not a TTY)
 * 3. null (no body)
 */
export const resolveBody = async (
  dataFlag: string | undefined,
  hasRequestBody: boolean,
  isRequired: boolean,
): Promise<unknown | null> => {
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

  // 3. No body provided
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
