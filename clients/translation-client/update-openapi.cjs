// Updates src/openapi.json and src/openapi-runtime.json from the Translation API spec.
//
// The shared scripts/update-openapi.js drops operations marked `x-internal`.
// Every Translation API operation is internal (the API serves epilot's own
// frontends), so the shared updater would leave an empty client. This script
// does the same conversion but keeps internal operations.
//
// usage: npm run openapi [path-or-url-to-openapi.yml]
const { execFileSync } = require('node:child_process');
const { writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const DEFAULT_SOURCE = resolve(__dirname, '../../../translation-api/packages/functions/openapi.yml');
const source = process.argv[2] || DEFAULT_SOURCE;

const OUTPUT_FILE = resolve(__dirname, 'src/openapi.json');
const RUNTIME_FILE = resolve(__dirname, 'src/openapi-runtime.json');

const openapicmd = (args) => execFileSync('npx', ['openapicmd', ...args], { cwd: __dirname }).toString();

console.log(`===> Updating openapi.json from ${source}...`);
const spec = JSON.parse(openapicmd(['read', '--json', source]));
if (!spec.servers || spec.servers.length === 0) {
  throw new Error(`No servers defined in ${source}`);
}
writeFileSync(OUTPUT_FILE, `${JSON.stringify(spec, null, 2)}\n`);

console.log('===> Generating openapi-runtime.json');
const runtime = JSON.parse(openapicmd(['read', '--json', OUTPUT_FILE, '--strip', 'openapi_client_axios']));
writeFileSync(RUNTIME_FILE, `${JSON.stringify(runtime, null, 2)}\n`);

console.log('===> Done!');
