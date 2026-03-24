import { defineCommand } from 'citty';
import { randomUUID } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { log, readManifest, writeManifest, type ManifestComponent } from './manifest.js';

// ─── Template registry ───────────────────────────────────────────────────────

const TEMPLATES_REPO = 'epilot-dev/app-templates';

type TemplateInfo = {
  /** Whether this component type is config-only (no build step) */
  configOnly: boolean;
  /** The component_type value for the manifest (API model) */
  manifestType: string;
  /** Directory name in the app-templates repo */
  templateDir: string;
  /** Description shown in interactive select */
  description: string;
  /** Default manifest configuration */
  configuration: (id: string) => Record<string, unknown>;
  /** Default surfaces */
  surfaces?: (id: string) => Record<string, unknown>;
  /** Default assets */
  assets?: (id: string) => { bundle?: string; zip?: string };
  /** Default options */
  options?: ManifestComponent['options'];
};

const TEMPLATE_REGISTRY: Record<string, TemplateInfo> = {
  CUSTOM_FLOW_ACTION_SANDBOX: {
    configOnly: false,
    manifestType: 'CUSTOM_FLOW_ACTION',
    templateDir: 'custom-flow-action-sandbox',
    description: 'Sandboxed flow action (JS runs in epilot)',
    configuration: () => ({
      type: 'sandbox',
      sandbox_settings: { code: '// code is read from dist/ during deploy' },
    }),
  },
  CUSTOM_FLOW_ACTION_EXTERNAL: {
    configOnly: true,
    manifestType: 'CUSTOM_FLOW_ACTION',
    templateDir: 'custom-flow-action-external',
    description: 'External integration webhook (config-only)',
    configuration: () => ({
      type: 'external_integration',
      external_integration_settings: { url: 'https://api.example.com/webhook' },
    }),
    options: [{ key: 'api_key', label: 'API Key', type: 'secret', required: true, description: 'API key for authentication' }],
  },
  CUSTOM_CAPABILITY: {
    configOnly: false,
    manifestType: 'CUSTOM_CAPABILITY',
    templateDir: 'custom-capability',
    description: 'Custom entity tab or group',
    configuration: () => ({ type: 'tab', allowed_schemas: [] }),
    surfaces: (id) => ({ capability_config: { app_url: `./components/${id}/dist/index.html` } }),
    assets: (id) => ({ zip: `./components/${id}/dist/` }),
  },
  CUSTOM_JOURNEY_BLOCK: {
    configOnly: false,
    manifestType: 'CUSTOM_JOURNEY_BLOCK',
    templateDir: 'custom-journey-block',
    description: 'Custom journey builder block',
    configuration: (id) => ({
      component_url: `./components/${id}/dist/bundle.js`,
      component_tag: id,
      component_args: [],
    }),
    assets: (id) => ({ bundle: `./components/${id}/dist/bundle.js` }),
  },
  CUSTOM_PAGE: {
    configOnly: false,
    manifestType: 'CUSTOM_PAGE',
    templateDir: 'custom-page',
    description: 'Custom navigation page',
    configuration: (id) => ({ slug: id, nav_label: toPascalCase(id), nav_icon: 'layout' }),
    surfaces: (id) => ({ page: { app_url: `./components/${id}/dist/index.html` } }),
    assets: (id) => ({ zip: `./components/${id}/dist/` }),
  },
  CUSTOM_PORTAL_BLOCK: {
    configOnly: false,
    manifestType: 'CUSTOM_PORTAL_BLOCK',
    templateDir: 'custom-portal-block',
    description: 'Custom portal widget',
    configuration: () => ({}),
    surfaces: (id) => ({ portal_block: { app_url: `./components/${id}/dist/index.html` } }),
    assets: (id) => ({ zip: `./components/${id}/dist/` }),
  },
  PORTAL_EXTENSION: {
    configOnly: true,
    manifestType: 'PORTAL_EXTENSION',
    templateDir: 'portal-extension',
    description: 'Portal extension hooks (config-only)',
    configuration: () => ({
      hooks: [{
        type: 'registration_identifiers_check',
        call: { method: 'POST', url: 'https://api.example.com/portal/register', headers: { 'x-api-key': '{{api_key}}' } },
      }],
    }),
    options: [{ key: 'api_key', label: 'API Key', type: 'secret', required: true, description: 'API key for your backend' }],
  },
  EXTERNAL_PRODUCT_CATALOG: {
    configOnly: true,
    manifestType: 'EXTERNAL_PRODUCT_CATALOG',
    templateDir: 'external-product-catalog',
    description: 'External product catalog hooks (config-only)',
    configuration: () => ({
      hooks: [{
        id: 'get-products',
        name: { de: 'Produkte abrufen', en: 'Get Products' },
        type: 'products',
        call: { method: 'POST', url: 'https://api.example.com/products', headers: { 'Content-Type': 'application/json', 'x-api-key': '{{api_key}}' } },
      }],
    }),
    options: [{ key: 'api_key', label: 'API Key', type: 'secret', required: true, description: 'API key for product catalog' }],
  },
};

const AVAILABLE_TYPES = Object.keys(TEMPLATE_REGISTRY);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str.replace(/(^|[-_])([a-z])/g, (_, __, c) => c.toUpperCase());
}

/**
 * Download a template from the app-templates repo using giget.
 * Replaces all {{name}} placeholders in files with the component name.
 */
async function downloadTemplate(templateDir: string, targetDir: string, componentName: string): Promise<void> {
  const { downloadTemplate: giget } = await import('giget');
  await giget(`github:${TEMPLATES_REPO}/${templateDir}`, {
    dir: targetDir,
    force: true,
  });

  // Replace {{name}} placeholders in all files
  replaceInDir(targetDir, '{{name}}', componentName);
}

function replaceInDir(dir: string, search: string, replace: string): void {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      replaceInDir(fullPath, search, replace);
    } else {
      try {
        const content = readFileSync(fullPath, 'utf-8');
        if (content.includes(search)) {
          writeFileSync(fullPath, content.replaceAll(search, replace));
        }
      } catch {
        // skip binary files
      }
    }
  }
}

// ─── Command ──────────────────────────────────────────────────────────────────

export default defineCommand({
  meta: { name: 'add-component', description: 'Add a new component to the app' },
  args: {
    name: { type: 'positional', description: 'Component name', required: false },
    type: { type: 'string', alias: 't', description: 'Component type' },
    path: { type: 'string', description: 'Path to manifest.json (default: manifest.json)' },
  },
  run: async ({ args }) => {
    // Interactive: prompt for type if not provided
    let componentType = args.type;
    if (!componentType) {
      const { select } = await import('@inquirer/prompts');
      componentType = await select({
        message: 'Select component type',
        choices: AVAILABLE_TYPES.map(type => ({
          value: type,
          name: `${type} — ${TEMPLATE_REGISTRY[type].description}`,
        })),
      });
    }

    if (!AVAILABLE_TYPES.includes(componentType)) {
      log.error(`Invalid component type: ${componentType}`);
      log.info('');
      log.info('Available types:');
      for (const type of AVAILABLE_TYPES) {
        log.info(`  ${type} — ${TEMPLATE_REGISTRY[type].description}`);
      }
      process.exit(1);
    }

    // Interactive: prompt for name if not provided
    let componentName = args.name;
    if (!componentName) {
      const { input } = await import('@inquirer/prompts');
      componentName = await input({
        message: 'Component name',
        validate: (v) => {
          if (!v.trim()) return 'Name is required';
          if (!/^[a-z0-9][a-z0-9-]*$/.test(v)) return 'Use lowercase letters, numbers, and hyphens';
          return true;
        },
      });
    }

    // Find and read manifest
    const manifestPath = resolve(args.path ?? 'manifest.json');
    if (!existsSync(manifestPath)) {
      log.error('manifest.json not found. Run "epilot app init" first.');
      process.exit(1);
    }
    const manifest = readManifest(manifestPath);

    // Check for duplicate _dir
    if (manifest.components.some(c => c._dir === componentName)) {
      log.error(`Component "${componentName}" already exists in manifest.`);
      process.exit(1);
    }

    // Create component directory
    const componentDir = resolve('components', componentName);
    if (existsSync(componentDir)) {
      log.error(`Directory "components/${componentName}" already exists.`);
      process.exit(1);
    }

    const tmpl = TEMPLATE_REGISTRY[componentType];

    // Download template from GitHub
    log.dim(`Downloading template from ${TEMPLATES_REPO}/${tmpl.templateDir}...`);
    await downloadTemplate(tmpl.templateDir, componentDir, componentName);

    // Add component to manifest
    const componentId = randomUUID();
    const component: ManifestComponent = {
      id: componentId,
      component_type: tmpl.manifestType,
      _dir: componentName,
      name: { de: toPascalCase(componentName), en: toPascalCase(componentName) },
      description: { de: 'Description', en: 'Description' },
      configuration: tmpl.configuration(componentName),
    };

    if (tmpl.surfaces) component.surfaces = tmpl.surfaces(componentName);
    if (tmpl.assets) component.assets = tmpl.assets(componentName);
    if (tmpl.options) component.options = tmpl.options;

    manifest.components.push(component);
    writeManifest(manifestPath, manifest);

    // Print summary
    log.success(`Added component "${componentName}" (${componentType})`);
    log.info('');
    log.info(`  components/${componentName}/`);

    if (tmpl.configOnly) {
      log.dim('This is a config-only component. Edit configuration.json to configure it.');
    } else {
      log.dim('Run "npm install" to link the new workspace.');
    }

    log.info('');
    log.info(`manifest.json updated (${manifest.components.length} component(s))`);
  },
});
