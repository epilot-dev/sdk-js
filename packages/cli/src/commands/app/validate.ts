import { defineCommand } from 'citty';
import { resolve } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import { validateManifest, log } from './manifest.js';

export default defineCommand({
  meta: { name: 'validate', description: 'Validate an app manifest.json' },
  args: {
    path: { type: 'string', description: 'Path to manifest.json (default: manifest.json)' },
  },
  run: ({ args }) => {
    const manifestPath = resolve(args.path ?? 'manifest.json');

    if (!existsSync(manifestPath)) {
      log.error(`File not found: ${manifestPath}`);
      process.exit(1);
    }

    let rawData: unknown;
    try {
      rawData = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    } catch (err) {
      log.error(`Failed to parse ${manifestPath}: ${(err as Error).message}`);
      process.exit(1);
    }

    const result = validateManifest(rawData);
    if (!result.valid) {
      log.error(`Validation failed for ${manifestPath}`);
      for (const err of result.errors) {
        log.info(`${err.path}: ${err.message}`);
      }
      process.exit(1);
    }

    const manifest = result.manifest!;
    log.success(`${manifestPath} is valid`);
    log.info(`${manifest.components.length} component(s) defined`);

    const secretOptions = manifest.components.flatMap(c => (c.options ?? []).filter(o => o.type === 'secret'));
    if (secretOptions.length > 0) log.info(`${secretOptions.length} secret option(s) (set per-installation)`);

    if (manifest.assets?.logo) log.info(`Logo: ${manifest.assets.logo}`);

    const bundleCount = manifest.components.filter(c => c.assets?.bundle).length;
    const zipCount = manifest.components.filter(c => c.assets?.zip).length;
    if (bundleCount > 0 || zipCount > 0) log.info(`Assets: ${bundleCount} bundle(s), ${zipCount} zip(s)`);
  },
});
