import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { 'bin/epilot': 'bin/epilot.ts' },
  format: ['esm'],
  target: 'node18',
  dts: false,
  clean: true,
  outDir: 'dist',
  banner: { js: '#!/usr/bin/env node' },
  platform: 'node',
  // Keep heavy CJS deps external; they'll be resolved from node_modules at runtime
  external: [
    'openapi-client-axios',
    'axios',
    '@inquirer/prompts',
    'open',
    'jsonata',
  ],
});
