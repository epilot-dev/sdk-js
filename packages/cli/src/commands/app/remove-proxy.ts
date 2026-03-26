import { defineCommand } from 'citty';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { log, readManifest, writeManifest } from './manifest.js';

export default defineCommand({
  meta: { name: 'remove-proxy', description: 'Remove a proxy endpoint from the app' },
  args: {
    name: { type: 'positional', description: 'Proxy name to remove', required: false },
    path: { type: 'string', description: 'Path to manifest.json (default: manifest.json)' },
  },
  run: async ({ args }) => {
    const manifestPath = resolve(args.path ?? 'manifest.json');
    if (!existsSync(manifestPath)) {
      log.error('manifest.json not found.');
      process.exit(1);
    }
    const manifest = readManifest(manifestPath);

    if (!manifest.proxies?.length) {
      log.error('No proxies in manifest.');
      process.exit(1);
    }

    // Interactive: prompt to select proxy if not provided
    let proxyName = args.name;
    if (!proxyName) {
      const { select } = await import('@inquirer/prompts');
      proxyName = await select({
        message: 'Select proxy to remove',
        choices: manifest.proxies.map((p) => ({
          value: p.name,
          name: `${p.name} → ${p.target}`,
        })),
      });
    }

    const idx = manifest.proxies.findIndex((p) => p.name === proxyName);
    if (idx === -1) {
      log.error(`Proxy "${proxyName}" not found in manifest.`);
      log.info('');
      log.info('Available proxies:');
      for (const p of manifest.proxies) {
        log.info(`  ${p.name} → ${p.target}`);
      }
      process.exit(1);
    }

    const removed = manifest.proxies.splice(idx, 1)[0];
    if (manifest.proxies.length === 0) delete manifest.proxies;
    writeManifest(manifestPath, manifest);

    log.success(`Removed proxy "${removed.name}" → ${removed.target}`);
    log.info(`manifest.json updated (${manifest.proxies?.length ?? 0} proxy/proxies remaining)`);
  },
});
