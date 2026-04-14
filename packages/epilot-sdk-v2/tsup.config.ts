import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from 'tsup';

// Discover all API entry files for multi-entry build
const apisDir = resolve(__dirname, 'src/apis');
const apiEntries: Record<string, string> = {};

try {
  const files = readdirSync(apisDir).filter((f) => f.endsWith('.ts') && !f.startsWith('_'));
  for (const file of files) {
    const name = file.replace('.ts', '');
    apiEntries[`apis/${name}`] = `src/apis/${file}`;
  }
} catch {
  // apis directory may not exist yet before generation
}

export default defineConfig([
  // Main SDK bundle
  {
    entry: {
      index: 'src/index.ts',
      ...apiEntries,
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: true,
    clean: true,
    outDir: 'dist',
    external: ['openapi-client-axios', 'axios'],
    skipNodeModulesBundle: true,
  },
  // CLI binary
  {
    entry: { 'bin/cli': 'src/bin/cli.ts' },
    format: ['esm'],
    dts: false,
    outDir: 'dist',
    banner: { js: '#!/usr/bin/env node' },
    external: ['openapi-client-axios-typegen'],
  },
]);
