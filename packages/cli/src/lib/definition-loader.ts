import { existsSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Document } from 'openapi-client-axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load an OpenAPI definition for the given API.
 *
 * Priority:
 * 1. --definition flag (file path or URL)
 * 2. .epilot/overrides/<api-name>.json in CWD
 * 3. Bundled definitions/<api-name>.json
 */
export const loadDefinition = async (
  apiName: string,
  definitionOverride?: string,
): Promise<Document> => {
  // 1. Explicit override via flag
  if (definitionOverride) {
    if (definitionOverride.startsWith('http://') || definitionOverride.startsWith('https://')) {
      const res = await fetch(definitionOverride);
      if (!res.ok) {
        throw new Error(`Failed to fetch definition from ${definitionOverride}: ${res.status} ${res.statusText}`);
      }
      return (await res.json()) as Document;
    }
    const absPath = resolve(definitionOverride);
    if (!existsSync(absPath)) {
      throw new Error(`Definition file not found: ${absPath}`);
    }
    return JSON.parse(readFileSync(absPath, 'utf-8')) as Document;
  }

  // 2. Project-level override
  const overridePath = join(process.cwd(), '.epilot', 'overrides', `${apiName}.json`);
  if (existsSync(overridePath)) {
    return JSON.parse(readFileSync(overridePath, 'utf-8')) as Document;
  }

  // 3. Bundled definition — check multiple possible locations
  const searchPaths = [
    // Built dist: dist/bin/epilot.js -> dist/definitions/
    resolve(__dirname, '..', 'definitions', `${apiName}.json`),
    // Built dist (deeper): dist/lib/ -> dist/definitions/
    resolve(__dirname, '..', '..', 'definitions', `${apiName}.json`),
    // Dev mode with tsx: src/lib/ -> definitions/
    resolve(__dirname, '..', '..', '..', 'definitions', `${apiName}.json`),
    // Dev mode: packages/cli/definitions/
    resolve(__dirname, '..', '..', 'definitions', `${apiName}.json`),
  ];

  for (const path of searchPaths) {
    if (existsSync(path)) {
      return JSON.parse(readFileSync(path, 'utf-8')) as Document;
    }
  }

  throw new Error(
    `No OpenAPI definition found for "${apiName}". ` +
    `Use --definition <file|url> to provide one, or place it at .epilot/overrides/${apiName}.json`,
  );
};
