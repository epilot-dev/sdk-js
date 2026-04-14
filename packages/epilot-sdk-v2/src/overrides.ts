import type { Document } from 'openapi-client-axios';

import { registerApi } from './registry';
import type { ApiEntry, OverridesConfig } from './types';

const OVERRIDES_PATH = '.epilot/sdk-overrides.json';

let _loaded = false;

const createSpecLoader = (
  specPath: string,
  baseDir: string,
  fsModule: typeof import('node:fs'),
  pathModule: typeof import('node:path'),
): (() => Document) => {
  let cached: Document | null = null;

  return () => {
    if (cached) return cached;

    const absolutePath = pathModule.resolve(baseDir, specPath);
    const content = fsModule.readFileSync(absolutePath, 'utf-8');
    cached = JSON.parse(content) as Document;

    return cached;
  };
};

/**
 * Loads overrides from .epilot/sdk-overrides.json synchronously.
 * Only performs filesystem reads on first call - subsequent calls are no-ops.
 * Safe to call in browser environments (fs/path are dynamically required).
 */
export const loadOverrides = (registry: Map<string, ApiEntry>, cwd?: string) => {
  if (_loaded) return;
  _loaded = true;

  try {
    // Guard against browser environments
    if (typeof process === 'undefined' || typeof process.cwd !== 'function') return;

    // Dynamic require to avoid bundlers pulling in node builtins
    const fs: typeof import('node:fs') = require('node:fs');
    const path: typeof import('node:path') = require('node:path');

    // Search up from cwd for overrides file
    let dir = cwd ?? process.cwd();
    let overridesFile: string | null = null;
    while (true) {
      const candidate = path.resolve(dir, OVERRIDES_PATH);
      if (fs.existsSync(candidate)) {
        overridesFile = candidate;
        break;
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    if (!overridesFile) return;

    const baseDir = path.dirname(overridesFile);
    const overrides: OverridesConfig = JSON.parse(fs.readFileSync(overridesFile, 'utf-8'));

    for (const [name, specPath] of Object.entries(overrides)) {
      const loader = createSpecLoader(specPath, baseDir, fs, path);

      const existing = registry.get(name);
      if (existing) {
        existing.loader = loader;
        existing.instance = null;
      } else {
        registerApi({ registry, name, loader });
      }
    }
  } catch {
    // Silently ignore - overrides are optional
  }
};

/** Reset override loading state (for testing) */
export const _resetOverrides = () => {
  _loaded = false;
};
