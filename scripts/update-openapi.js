#!/usr/bin/env node

/**
 * This script is used to update the openapi.json files in the client from source definitions
 *
 * npm usage: npm run openapi <path-to-openapi.yml>
 * direct usage: node ./update-openapi.js <default_source> <source>
 */
const { execSync } = require('child_process');
const fs = require('fs');

const defaultSrc = process.argv[2];
const overrideSrc = process.argv[3];
const sourceFile = overrideSrc || defaultSrc;

const OPENAPICMD = 'npx openapicmd';
const OUTPUT_FILE = './src/openapi.json';
const RUNTIME_FILE = './src/openapi-runtime.json';

/**
 * Deduplicates the servers array in an OpenAPI spec by URL.
 * Ensures at least one server exists using the fallback URL if needed.
 */
function deduplicateServers(spec, fallbackServerURL) {
  const servers = spec.servers || [];
  const seen = new Set();
  const uniqueServers = [];

  for (const server of servers) {
    if (server.url && !seen.has(server.url)) {
      seen.add(server.url);
      uniqueServers.push(server);
    }
  }

  // Ensure at least one server exists
  if (uniqueServers.length === 0 && fallbackServerURL) {
    uniqueServers.push({ url: fallbackServerURL });
  }

  spec.servers = uniqueServers;
  return spec;
}

// get server from default external source
console.log(`===> Reading server URL from ${defaultSrc}...`);
const definitionJSON = execSync(`${OPENAPICMD} read --json ${defaultSrc}`).toString();
const serverURL = JSON.parse(definitionJSON).servers?.[0]?.url;
console.log(`=====>> URL: ${serverURL}`);

// save full openapi.json from source
console.log(`===> Updating openapi.json from ${sourceFile}...`);
execSync(
  [
    OPENAPICMD,
    'read',
    '--exclude-ext x-internal',
    `--json ${sourceFile}`,
    serverURL ? `--server ${serverURL}` : '',
    '>',
    OUTPUT_FILE,
  ].join(' '),
  { stdio: 'inherit' },
);

// deduplicate servers array (openapicmd --server may add duplicates if source already has servers)
console.log('===> Deduplicating servers...');
const spec = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
const deduplicatedSpec = deduplicateServers(spec, serverURL);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(deduplicatedSpec, null, 2) + '\n');

// store optimized runtime version for client
console.log('===> Generating openapi-runtime.json');
execSync([OPENAPICMD, 'read', `--json ${OUTPUT_FILE}`, '--strip openapi_client_axios', '>', RUNTIME_FILE].join(' '), {
  stdio: 'inherit',
});

console.log('===> Done!');
process.exit(0);
