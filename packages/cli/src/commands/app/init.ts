import { defineCommand } from 'citty';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { log, writeManifest, type AppManifest } from './manifest.js';

export default defineCommand({
  meta: { name: 'init', description: 'Scaffold a new epilot app project' },
  args: {
    name: { type: 'positional', description: 'App name (also used as directory name)', required: false },
  },
  run: ({ args }) => {
    const name = args.name ?? 'my-epilot-app';
    const rootDir = resolve(name);

    if (existsSync(rootDir)) {
      log.error(`Directory "${name}" already exists.`);
      process.exit(1);
    }

    // Create directory structure
    mkdirSync(rootDir, { recursive: true });
    mkdirSync(join(rootDir, 'components'));

    // manifest.json
    const manifest: AppManifest = {
      $schema: 'https://cdn.app.dev.sls.epilot.io/v1/schema.json',
      manifest_version: 1,
      name,
      description: { de: 'App description', en: 'App description' },
      category: 'integration',
      author: { company: 'Your Company', name: 'Your Name', email: 'dev@example.com' },
      components: [],
    };
    writeManifest(join(rootDir, 'manifest.json'), manifest);

    // package.json (monorepo root)
    writeFileSync(join(rootDir, 'package.json'), JSON.stringify({
      name,
      version: '0.0.1',
      private: true,
      packageManager: 'npm@10.9.2',
      workspaces: ['components/*'],
      scripts: {
        build: 'turbo build',
        dev: 'turbo dev',
        lint: 'turbo lint',
        deploy: 'epilot app deploy',
      },
      devDependencies: {
        turbo: '^2',
      },
    }, null, 2) + '\n');

    // turbo.json
    writeFileSync(join(rootDir, 'turbo.json'), JSON.stringify({
      $schema: 'https://turbo.build/schema.json',
      tasks: {
        build: {
          dependsOn: ['^build'],
          outputs: ['dist/**'],
        },
        dev: {
          cache: false,
          persistent: true,
        },
        lint: {},
      },
    }, null, 2) + '\n');

    // .gitignore
    writeFileSync(join(rootDir, '.gitignore'), [
      'node_modules',
      'dist',
      '.turbo',
      '',
    ].join('\n'));

    // components/README.md
    writeFileSync(join(rootDir, 'components', 'README.md'), [
      '# Components',
      '',
      'Each subdirectory is a component package in the monorepo.',
      '',
      'Add a new component with:',
      '',
      '```bash',
      'epilot app add-component <name> --type CUSTOM_CAPABILITY',
      '```',
      '',
      'Available component types:',
      '',
      'Code-based (have src/ and build step):',
      '- `CUSTOM_FLOW_ACTION_SANDBOX` — Sandboxed flow action (JS runs in epilot)',
      '- `CUSTOM_CAPABILITY` — Custom entity tab or group',
      '- `CUSTOM_JOURNEY_BLOCK` — Custom journey builder block',
      '- `CUSTOM_PAGE` — Custom navigation page',
      '- `CUSTOM_PORTAL_BLOCK` — Custom portal widget',
      '',
      'Config-only (configuration.json):',
      '- `CUSTOM_FLOW_ACTION_EXTERNAL` — External integration webhook',
      '- `PORTAL_EXTENSION` — Portal extension hooks',
      '- `EXTERNAL_PRODUCT_CATALOG` — External product catalog hooks',
      '',
    ].join('\n'));

    // README.md
    writeFileSync(join(rootDir, 'README.md'), [
      `# ${name}`,
      '',
      'An [epilot](https://epilot.cloud) app.',
      '',
      '## Getting started',
      '',
      '```bash',
      '# Install dependencies',
      'npm install',
      '',
      '# Add a component',
      'epilot app add-component my-action --type CUSTOM_FLOW_ACTION',
      '',
      '# Build all components',
      'npm run build',
      '',
      '# Validate the manifest',
      'epilot app validate',
      '',
      '# Deploy (dry run)',
      'epilot app deploy --dry-run',
      '',
      '# Deploy for real',
      'epilot app deploy',
      '```',
      '',
      '## Project structure',
      '',
      '```',
      `${name}/`,
      '├── manifest.json          # App manifest (source of truth)',
      '├── package.json           # Monorepo root',
      '├── turbo.json             # Turborepo config',
      '└── components/',
      '    └── <component-name>/  # Each component is a package',
      '        ├── package.json',
      '        ├── src/',
      '        └── dist/',
      '```',
      '',
    ].join('\n'));

    log.success(`Created ${name}/`);
    log.info('');
    log.info(`  cd ${name}`);
    log.info('  npm install');
    log.info('  epilot app add-component my-action --type CUSTOM_FLOW_ACTION');
    log.info('');
    log.dim('See README.md for more details.');
  },
});
