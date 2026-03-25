import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const OVERRIDES_PATH = '.epilot/sdk-overrides.json';

const usage = () => {
  console.log(`
epilot-sdk CLI

Commands:
  override                              Apply all overrides from ${OVERRIDES_PATH}
  override <api-name> <spec-path>       Override or register a single API
  typegen                               Regenerate types from current specs

Examples:
  npx epilot-sdk override
  npx epilot-sdk override entity ./my-entity-spec.yaml
  npx epilot-sdk override myNewApi ./specs/my-new-api.yaml
  npx epilot-sdk typegen
`);
};

const isYamlFile = (filePath: string) => filePath.endsWith('.yaml') || filePath.endsWith('.yml');

const parseYaml = async (content: string): Promise<unknown> => {
  const { load } = await import('js-yaml');
  return load(content);
};

const readOverrides = (): Record<string, string> => {
  const filePath = resolve(process.cwd(), OVERRIDES_PATH);
  if (!existsSync(filePath)) return {};
  return JSON.parse(readFileSync(filePath, 'utf-8'));
};

const writeOverrides = (overrides: Record<string, string>) => {
  const filePath = resolve(process.cwd(), OVERRIDES_PATH);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(overrides, null, 2)}\n`);
};

const fetchSpec = async (specPath: string): Promise<string> => {
  if (specPath.startsWith('http://') || specPath.startsWith('https://')) {
    const response = await fetch(specPath);
    if (!response.ok) throw new Error(`Failed to fetch ${specPath}: ${response.statusText}`);
    return await response.text();
  }

  const absolutePath = resolve(process.cwd(), specPath);
  if (!existsSync(absolutePath)) throw new Error(`Spec file not found: ${absolutePath}`);
  return readFileSync(absolutePath, 'utf-8');
};

const parseSpec = async (content: string, specPath: string): Promise<Record<string, unknown>> => {
  if (isYamlFile(specPath)) {
    return (await parseYaml(content)) as Record<string, unknown>;
  }
  return JSON.parse(content);
};

/** Convert an API name like "accessToken" to kebab-case "access-token" */
const toKebabCase = (name: string) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

type CompactParam = [string, string, ...unknown[]];
type CompactRefParam = [string];
type CompactOp = (string | (CompactParam | CompactRefParam)[] | undefined | 0 | 1)[];

const compactifyParam = (p: Record<string, unknown>): unknown[] => {
  if (p.$ref) {
    return [(p.$ref as string).split('/').pop()!];
  }
  const loc = ({ path: 'p', query: 'q', header: 'h', cookie: 'c' } as Record<string, string>)[p.in as string] || 'q';
  const cp: unknown[] = [p.name as string, loc];
  if (p.required) cp.push(true);
  if (p.style) {
    if (!p.required) cp.push(false);
    cp.push(p.style as string);
  }
  if (p.explode !== undefined) {
    cp.push(p.explode as boolean);
  }
  return cp;
};

const compactifySpec = (spec: Record<string, unknown>): Record<string, unknown> => {
  const server: string = (spec.servers as { url: string }[])?.[0]?.url || '';
  const openapiVersion: string = (spec.openapi as string) || '3.0.2';
  const paths = (spec.paths || {}) as Record<string, Record<string, unknown>>;

  const ops: CompactOp[] = [];
  const pathParams: Record<string, unknown[][]> = {};

  for (const [path, methods] of Object.entries(paths)) {
    if (methods.parameters) {
      pathParams[path] = (methods.parameters as Record<string, unknown>[]).map(compactifyParam);
    }

    for (const [method, rawOp] of Object.entries(methods)) {
      if (method === 'parameters') continue;
      const op = rawOp as Record<string, unknown>;
      if (typeof op !== 'object' || !op.operationId) continue;

      const params = (op.parameters || []) as Record<string, unknown>[];
      const compactParams = params.map(compactifyParam);

      const hasBody = op.requestBody ? 1 : 0;
      const entry: CompactOp = [op.operationId as string, method, path];
      if (compactParams.length > 0 || hasBody) entry.push(compactParams.length > 0 ? compactParams : undefined);
      if (hasBody) entry.push(1);

      ops.push(entry);
    }
  }

  const componentParams = (spec.components as Record<string, unknown>)?.parameters as
    | Record<string, Record<string, unknown>>
    | undefined;

  const result: Record<string, unknown> = { s: server, o: ops };
  if (openapiVersion !== '3.0.2') result.v = openapiVersion;

  if (componentParams && Object.keys(componentParams).length > 0) {
    const cpObj: Record<string, unknown[]> = {};
    for (const [refName, p] of Object.entries(componentParams)) {
      cpObj[refName] = compactifyParam(p);
    }
    result.cp = cpObj;
  }

  if (Object.keys(pathParams).length > 0) {
    result.pp = pathParams;
  }

  return result;
};

/** Find the @epilot/sdk package root in node_modules */
const findSdkRoot = (): string | null => {
  try {
    // Walk up from cwd looking for node_modules/@epilot/sdk
    let dir = process.cwd();
    while (true) {
      const candidate = resolve(dir, 'node_modules/@epilot/sdk');
      if (existsSync(candidate)) return candidate;
      const parent = dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  } catch {
    // ignore
  }
  return null;
};

/**
 * Patch the bundled runtime chunk in dist/ so webpack/bundlers pick up the overridden spec.
 *
 * The published SDK bundles each API's compact runtime spec into chunk files.
 * We find the chunk that contains `require_<apiName>_runtime` and replace the
 * `module.exports = {...}` line with the new compact spec.
 */
const patchRuntimeChunk = (distDir: string, kebabName: string, compactSpec: unknown) => {
  if (!existsSync(distDir)) return;

  // The chunk contains a function named require_<name>_runtime
  const runtimeFnName = `require_${kebabName.replace(/-/g, '_')}_runtime`;

  const files = readdirSync(distDir);
  let patched = false;

  for (const file of files) {
    if (!file.endsWith('.js') && !file.endsWith('.cjs')) continue;
    if (file.startsWith('apis/')) continue;

    const filePath = resolve(distDir, file);
    const content = readFileSync(filePath, 'utf-8');

    if (!content.includes(runtimeFnName)) continue;

    // Replace module.exports = {...}; on the line containing the spec
    const newContent = content.replace(
      /module\.exports\s*=\s*\{.*\};/,
      `module.exports = ${JSON.stringify(compactSpec)};`,
    );

    if (newContent !== content) {
      writeFileSync(filePath, newContent);
      console.log(`    -> patched ${file} (runtime chunk)`);
      patched = true;
    }
  }

  if (!patched) {
    console.log(`    (no runtime chunk found to patch for ${kebabName})`);
  }
};

const overrideCmd = async (args: string[]) => {
  if (args.length === 2) {
    // Single API override: override <name> <path>
    // Saves, applies, and regenerates types in one step
    const [apiName, specPath] = args;
    const overrides = readOverrides();
    overrides[apiName] = specPath;
    writeOverrides(overrides);
    console.log(`Saved override: ${apiName} -> ${specPath}`);
  }

  // Apply all overrides
  const overrides = readOverrides();
  const entries = Object.entries(overrides);

  if (entries.length === 0) {
    console.log(`No overrides found in ${OVERRIDES_PATH}`);
    console.log(`Usage: npx epilot-sdk override <api-name> <spec-path>`);
    return;
  }

  const sdkRoot = findSdkRoot();
  if (!sdkRoot) {
    console.error('Could not find @epilot/sdk in node_modules. Is it installed?');
    process.exit(1);
  }

  const defsDir = resolve(sdkRoot, 'definitions');
  const distDir = resolve(sdkRoot, 'dist');

  // Ensure definitions directory exists
  if (!existsSync(defsDir)) {
    mkdirSync(defsDir, { recursive: true });
  }

  console.log(`Applying ${entries.length} override(s)...`);

  for (const [apiName, specPath] of entries) {
    try {
      const kebabName = toKebabCase(apiName);
      console.log(`  ${apiName} (${kebabName}): ${specPath}`);

      const rawContent = await fetchSpec(specPath);
      const spec = await parseSpec(rawContent, specPath);

      // Write full spec JSON to definitions/
      const fullSpecDest = resolve(defsDir, `${kebabName}.json`);
      writeFileSync(fullSpecDest, `${JSON.stringify(spec, null, 2)}\n`);
      console.log(`    -> definitions/${kebabName}.json`);

      // Write compact runtime spec to definitions/
      const compactSpec = compactifySpec(spec);
      const runtimeDest = resolve(defsDir, `${kebabName}-runtime.json`);
      writeFileSync(runtimeDest, JSON.stringify(compactSpec));
      console.log(`    -> definitions/${kebabName}-runtime.json`);

      // Patch the bundled runtime chunk so webpack picks up the override
      patchRuntimeChunk(distDir, kebabName, compactSpec);
    } catch (err) {
      console.error(`    Error: ${(err as Error).message}`);
    }
  }

  // Auto-run typegen after applying overrides
  console.log('');
  await typegenCmd();
};

const typegenCmd = async () => {
  try {
    const { execSync } = await import('node:child_process');

    const sdkRoot = findSdkRoot();
    if (!sdkRoot) {
      console.error('Could not find @epilot/sdk in node_modules. Is it installed?');
      process.exit(1);
    }

    const overrides = readOverrides();
    const entries = Object.entries(overrides);

    if (entries.length === 0) {
      console.log('No overrides found. Run "npx epilot-sdk override" first.');
      return;
    }

    const defsDir = resolve(sdkRoot, 'definitions');
    const distDir = resolve(sdkRoot, 'dist');

    for (const [apiName] of entries) {
      const kebabName = toKebabCase(apiName);
      const specPath = resolve(defsDir, `${kebabName}.json`);

      if (!existsSync(specPath)) {
        console.error(`  No spec found for ${apiName}. Run "npx epilot-sdk override" first.`);
        continue;
      }

      console.log(`Generating types for ${apiName}...`);
      try {
        const dtsPath = resolve(distDir, `apis/${kebabName}.d.ts`);
        const dctsPath = resolve(distDir, `apis/${kebabName}.d.cts`);

        // Generate new OpenAPI types
        const generatedTypes = execSync(`npx openapi-client-axios-typegen ${specPath} --client`, {
          stdio: 'pipe',
          encoding: 'utf-8',
        });

        // Standard module-level exports that every API entry point needs
        const moduleExports = [
          '',
          `import type { ApiHandle } from '../types';`,
          `export { authorize } from '../authorize';`,
          `export type { TokenArg } from '../authorize';`,
          `export type { OpenAPIClient } from 'openapi-client-axios';`,
          '',
          '/** Get the cached singleton client (lazy-initialized on first call) */',
          'declare const getClient: () => Client;',
          '/** Create a fresh client instance (not cached) */',
          'declare const createClient: () => Client;',
          '/**',
          ' * API handle — also exposes operations directly:',
          ` * \`${apiName}.getEntity(...)\` calls forwarded to lazy singleton`,
          ' */',
          `declare const ${apiName}: ApiHandle<Client>;`,
          '',
          `export { getClient, createClient, ${apiName} };`,
        ].join('\n');

        const fullContent = `${generatedTypes.trimEnd()}\n${moduleExports}\n`;

        writeFileSync(dtsPath, fullContent);
        console.log(`  -> dist/apis/${kebabName}.d.ts`);

        writeFileSync(dctsPath, fullContent);
        console.log(`  -> dist/apis/${kebabName}.d.cts`);
      } catch (err) {
        console.error(`  Error generating types for ${apiName}: ${(err as Error).message}`);
      }
    }

    console.log('\nDone.');
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
  }
};

const main = async () => {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case 'override':
      await overrideCmd(args);
      break;
    case 'typegen':
      await typegenCmd();
      break;
    case 'help':
    case '--help':
    case '-h':
      usage();
      break;
    default:
      usage();
      process.exit(1);
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
