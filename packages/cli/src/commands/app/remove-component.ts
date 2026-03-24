import { defineCommand } from 'citty';
import { existsSync, rmSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { log, readManifest, writeManifest } from './manifest.js';

export default defineCommand({
  meta: { name: 'remove-component', description: 'Remove a component from the app' },
  args: {
    name: { type: 'positional', description: 'Component name (directory name in components/)', required: false },
    'keep-files': { type: 'boolean', description: 'Keep the component directory on disk' },
    path: { type: 'string', description: 'Path to manifest.json (default: manifest.json)' },
  },
  run: async ({ args }) => {
    const manifestPath = resolve(args.path ?? 'manifest.json');

    if (!existsSync(manifestPath)) {
      log.error('manifest.json not found.');
      process.exit(1);
    }

    const manifest = readManifest(manifestPath);

    if (manifest.components.length === 0) {
      log.error('No components in manifest.');
      process.exit(1);
    }

    // Interactive: prompt to select component if not provided
    let componentName = args.name;
    if (!componentName) {
      const { select } = await import('@inquirer/prompts');
      componentName = await select({
        message: 'Select component to remove',
        choices: manifest.components.map((c) => ({
          value: c._dir ?? c.id,
          name: `${c._dir ?? c.id} (${c.component_type})`,
        })),
      });
    }

    // Find component by _dir or by id
    const idx = manifest.components.findIndex((c) => c._dir === componentName || c.id === componentName);
    if (idx === -1) {
      log.error(`Component "${componentName}" not found in manifest.`);
      log.info('');
      log.info('Available components:');
      for (const c of manifest.components) {
        log.info(`  ${c._dir ?? c.id} (${c.component_type})`);
      }
      process.exit(1);
    }

    const removed = manifest.components[idx];
    manifest.components.splice(idx, 1);
    writeManifest(manifestPath, manifest);

    log.success(`Removed "${removed._dir ?? removed.id}" (${removed.component_type}) from manifest`);

    // Remove directory unless --keep-files
    if (!args['keep-files']) {
      // Try _dir first, then componentName, then scan components/ for matching directory
      const candidates = [removed._dir, componentName].filter(Boolean) as string[];

      // Also scan components/ to find any dir that might match this component
      const componentsRoot = resolve('components');
      if (existsSync(componentsRoot)) {
        try {
          const dirs = readdirSync(componentsRoot, { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => d.name);
          // Check if componentName matches a directory
          for (const dir of dirs) {
            if (!candidates.includes(dir)) candidates.push(dir);
          }
        } catch {
          /* ignore */
        }
      }

      let deleted = false;
      for (const dirName of candidates) {
        const componentDir = resolve('components', dirName);
        if (existsSync(componentDir)) {
          rmSync(componentDir, { recursive: true });
          log.success(`Deleted components/${dirName}/`);
          deleted = true;
          break;
        }
      }

      if (!deleted) {
        log.dim('No component directory found to delete.');
      }
    }

    log.info(`manifest.json updated (${manifest.components.length} component(s) remaining)`);
  },
});
