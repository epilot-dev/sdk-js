import { defineConfig } from 'tsup';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  entry: { 'bin/epilot': 'bin/epilot.ts' },
  format: ['esm'],
  target: 'node18',
  dts: false,
  clean: true,
  outDir: 'dist',
  banner: { js: '#!/usr/bin/env node' },
  platform: 'node',
  define: {
    __CLI_VERSION__: JSON.stringify(pkg.version),
  },
  // Keep heavy CJS deps external; they'll be resolved from node_modules at runtime
  external: [
    'openapi-client-axios',
    'axios',
    '@inquirer/prompts',
    'open',
    'jsonata',
    'dereference-json-schema',
    'mock-json-schema',
  ],
});
