// Keep Phone Integration's spec cleanup local, as with the Chat API updater.
const { execFileSync } = require('node:child_process');
const { readFileSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');

const source = process.argv[2] || 'https://docs.api.epilot.io/phone-integration-api.yaml';
// The shared updater interpolates the source into shell commands. Quote it
// here so local paths with spaces remain one argument.
const quotedSource = `'${source.replace(/'/g, "'\\''")}'`;
execFileSync(process.execPath, [resolve(__dirname, '../../scripts/update-openapi.js'), quotedSource], {
  cwd: __dirname,
  stdio: 'inherit',
});

// Excluding internal endpoints leaves empty component maps in this API. They
// carry no contract and are omitted by the SDK's compact runtime format.
for (const file of ['openapi.json', 'openapi-runtime.json']) {
  const path = resolve(__dirname, 'src', file);
  const spec = JSON.parse(readFileSync(path, 'utf8'));
  for (const [kind, components] of Object.entries(spec.components || {})) {
    if (Object.keys(components).length === 0) delete spec.components[kind];
  }
  writeFileSync(path, `${JSON.stringify(spec, null, 2)}\n`);
}
