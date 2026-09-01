import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

export const CLIENTS_DIR = resolve(__dirname, '../../../../clients');
export const SRC_DIR = resolve(__dirname, '../../src');

/**
 * Clients carrying a hand-written `src/<relPath>`, mirroring the discovery in
 * scripts/generate-sdk-v2.ts so a client added there is covered here too.
 */
export const clientsWith = (relPath: string) =>
  readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.endsWith('-client'))
    .filter((d) => existsSync(resolve(CLIENTS_DIR, d.name, 'src', relPath)))
    .map((d) => ({ dirName: d.name, kebabName: d.name.replace(/-client$/, '') }));
