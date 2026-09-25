// Chat API owns separate public and management specs. Regenerate them in the
// service first (pnpm generate), then pass its checkout directory to this script.
const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync, mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { resolve, join } = require('node:path');

const serviceDir = process.argv[2];
if (!serviceDir) throw new Error('Usage: npm run openapi -- /path/to/chat-api');
const read = (path) => JSON.parse(readFileSync(resolve(serviceDir, path), 'utf8'));
const management = read('lambda/ApiHandlerFunction/src/website-chats/definition.json');
const publicApi = read('lambda/ApiHandlerFunction/src/openapi/definition.json');

// Both documents define Error with different payloads. Preserve the public error
// contract without overwriting the management error schema.
publicApi.components.schemas.PublicChatError = publicApi.components.schemas.Error;
delete publicApi.components.schemas.Error;
const rewriteRefs = (value) => {
  if (!value || typeof value !== 'object') return;
  if (value.$ref === '#/components/schemas/Error') value.$ref = '#/components/schemas/PublicChatError';
  for (const child of Object.values(value)) rewriteRefs(child);
};
rewriteRefs(publicApi);

// Anonymous bootstrap/configuration operations must not inherit EpilotAuth.
for (const path of Object.values(publicApi.paths)) {
  for (const [method, operation] of Object.entries(path)) {
    if (['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'].includes(method)) {
      operation.security ??= publicApi.security ?? [];
    }
  }
}
const mergeUnique = (left = {}, right = {}) => {
  const collision = Object.keys(right).find((key) => key in left);
  if (collision) throw new Error(`Conflicting OpenAPI key: ${collision}`);
  return { ...left, ...right };
};
const components = {};
for (const key of new Set([...Object.keys(management.components), ...Object.keys(publicApi.components)])) {
  components[key] = mergeUnique(management.components[key], publicApi.components[key]);
}
const definition = {
  ...management,
  info: {
    ...management.info,
    title: 'epilot Chat API',
    description: 'Website Chat management and anonymous browser chat.',
  },
  paths: mergeUnique(management.paths, publicApi.paths),
  components,
};
const temporaryDir = mkdtempSync(join(tmpdir(), 'epilot-chat-sdk-'));
try {
  const source = join(temporaryDir, 'chat.json');
  writeFileSync(source, JSON.stringify(definition));
  execFileSync(process.execPath, [resolve(__dirname, '../../scripts/update-openapi.js'), source], {
    cwd: __dirname,
    stdio: 'inherit',
  });
} finally {
  rmSync(temporaryDir, { recursive: true, force: true });
}
