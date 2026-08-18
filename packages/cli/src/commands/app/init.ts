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
    writeFileSync(
      join(rootDir, 'package.json'),
      `${JSON.stringify(
        {
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
        },
        null,
        2,
      )}\n`,
    );

    // turbo.json
    writeFileSync(
      join(rootDir, 'turbo.json'),
      `${JSON.stringify(
        {
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
        },
        null,
        2,
      )}\n`,
    );

    // .gitignore
    writeFileSync(join(rootDir, '.gitignore'), ['node_modules', 'dist', '.turbo', ''].join('\n'));

    // components/README.md
    writeFileSync(
      join(rootDir, 'components', 'README.md'),
      [
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
        '- `CUSTOM_CAPABILITY` — Custom entity tab, group or widget',
        '- `CUSTOM_JOURNEY_BLOCK` — Custom journey builder block',
        '- `CUSTOM_PAGE` — Custom navigation page',
        '- `CUSTOM_PORTAL_BLOCK` — Custom portal widget',
        '',
        'Config-only (configuration.json):',
        '- `CUSTOM_FLOW_ACTION_EXTERNAL` — External integration webhook',
        '- `PORTAL_EXTENSION` — Portal extension hooks',
        '- `EXTERNAL_PRODUCT_CATALOG` — External product catalog hooks',
        '',
        'Inline in manifest.json (no directory):',
        '- `API_PROXY` — Server-side API proxy with credential injection',
        '',
      ].join('\n'),
    );

    // README.md
    writeFileSync(
      join(rootDir, 'README.md'),
      [
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
      ].join('\n'),
    );

    // SKILL.md — AI agent instructions for building epilot apps
    writeFileSync(
      join(rootDir, 'SKILL.md'),
      `---
name: epilot App Builder
description: Build, deploy, and manage epilot Apps using the declarative manifest system and CLI. Covers all component types, project structure, and deployment workflow.
---

# epilot App Builder

You are working inside an epilot App project. This is a monorepo managed by Turborepo with a declarative \`manifest.json\` at the root. Your job is to help build, configure, and deploy this app.

## Project Structure

\`\`\`
<app-name>/
├── manifest.json            # Declarative app manifest (source of truth)
├── package.json             # npm workspaces monorepo root
├── turbo.json               # Turborepo task config
├── SKILL.md                 # This file (AI agent instructions)
└── components/              # Each component is a workspace package
    ├── <component-name>/    # Code-based component
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   ├── src/
    │   └── dist/            # Build output (uploaded on deploy)
    └── <component-name>/    # Config-only component
        └── configuration.json
\`\`\`

## manifest.json Schema

The manifest is the source of truth. The CLI reads it to create, update, and deploy the app.

\`\`\`json
{
  "$schema": "https://cdn.app.sls.epilot.io/v1/schema.json",
  "manifest_version": 1,
  "app_id": "uuid (set automatically after first deploy)",
  "name": "App Name",
  "description": { "de": "German description (required)", "en": "English description" },
  "category": "integration",
  "author": { "company": "Company", "name": "Name", "email": "dev@example.com" },
  "documentation_url": "https://docs.example.com",
  "support_email": "support@example.com",
  "pricing": { "pricing_type": "FREE" },
  "notifications": { "email": "dev@example.com", "events": ["app.installed", "app.uninstalled"] },
  "permissions": [
    { "action": "entity:read", "resource": "contact" },
    { "action": "entity:write", "resource": "order" }
  ],
  "blueprint": { "manifest_id": "uuid" },
  "assets": { "logo": "./assets/logo.png" },
  "components": []
}
\`\`\`

**Important rules:**
- \`description.de\` is always required (German)
- \`app_id\` is set automatically after first \`epilot app deploy\` — never set it manually
- \`_dir\` on components is a CLI-internal field mapping to the directory in \`components/\`
- Component \`id\` must be a UUID
- Option values of type \`secret\` are never stored in the manifest — they are set per-installation

## CLI Commands

All commands use \`epilot app <command>\`. Authentication uses stored credentials (\`epilot auth login\`) or \`--token\` / \`EPILOT_TOKEN\` env var.

### \`epilot app init <name>\`
Scaffold a new app project (monorepo with turbo, manifest.json, components/ dir).

### \`epilot app add-component <name> --type <TYPE>\`
Add a component. Downloads template from GitHub, adds entry to manifest.json.
Run interactively (no args) to get a type selector and name prompt.

### \`epilot app remove-component <name>\`
Remove a component from manifest and delete its directory.
Run interactively (no args) to get a component selector.

### \`epilot app validate\`
Validate manifest.json locally against the schema.

### \`epilot app deploy [--dry-run] [--new-version] [--server <url>]\`
Deploy the app:
1. Creates app on first deploy (writes \`app_id\` back to manifest)
2. Updates metadata (name, description, etc.)
3. Uploads assets (bundles, zips) and resolves CDN URLs
4. Upserts components with resolved URLs
5. Deletes remote components not in the manifest (sync)

**Important:** Components with missing build artifacts (bundle/zip) are skipped. Run \`npm run build\` first.

The deploy command reads \`components/<dir>/configuration.json\` at deploy time and uses it as the component's configuration. This means you edit config in the component directory, not in manifest.json.

**Deploy does not update existing installations.** Installations keep a frozen snapshot of
components, options and grants. After deploying to an app that is already installed:

\`\`\`bash
epilot app api patchInstallation <appId> -d '{"version":"<version>"}'
\`\`\`

This refreshes components and grants **and preserves configured option values**
(uninstall/reinstall loses them; \`promote-to\` to the already-installed version is a silent
no-op). The patch resets \`enabled\` to \`false\` — an org admin must re-save the app
configuration in the epilot UI afterwards.

**Auth tokens expire after ~1 hour.** A mid-deploy 403 that reads like a permissions problem
is usually just an expired token — run \`epilot auth login\` and deploy again.

### \`epilot app export --app-id <id> [-o manifest.json]\`
Export an existing app from the API as a manifest.json.

### \`epilot app versions [--app-id <id>]\`
List all versions with visibility, review status, and component count.

### \`epilot app review --technical-contact <email> --marketing-contact <email> [--demo-url <url>]\`
Submit the latest version for public marketplace review.

### \`epilot app api <operationId> [params]\`
Raw access to App API operations (OpenAPI-based).

## Component Types

### Code-based components (have src/, build step, produce dist/)

#### CUSTOM_JOURNEY_BLOCK
A Web Component embedded in the epilot Journey Builder. Built as a single UMD bundle.

**Stack:** React + Vite + \`@r2wc/react-to-web-component\` + \`@epilot/concorde-elements\`
**Build output:** \`dist/bundle.js\` (single file, CSS injected by JS)
**Manifest configuration:**
\`\`\`json
{
  "component_type": "CUSTOM_JOURNEY_BLOCK",
  "configuration": {
    "component_url": "./components/<name>/dist/bundle.js",
    "component_tag": "<name>",
    "component_args": []
  },
  "assets": { "bundle": "./components/<name>/dist/bundle.js" }
}
\`\`\`

The \`component_url\` is a local path in the manifest. On deploy, the CLI uploads the bundle and replaces it with the CDN URL automatically.

**Key files:**
- \`src/main.tsx\` — Wraps React app as Web Component using \`r2wc\`, defines the custom element tag
- \`src/App.tsx\` — React component using \`@epilot/concorde-elements\` (Button, Card, Input)
- \`vite.config.ts\` — UMD build with \`fileName: () => 'bundle.js'\`, CSS injected by JS, single file output

**Component props (passed by the Journey runtime):**
\`\`\`typescript
type AppProps<T> = {
  container: {
    setValue: React.Dispatch<T>        // Set the block's value
    value?: T                          // Current value
    theme?: string                     // Stringified theme JSON
    errors?: string                    // Validation errors
    required?: boolean                 // Whether the block is required
    args?: string                      // Extra args from Journey Builder config
    subscribe: (blockId: string, fn: (state: unknown) => void) => () => void
  }
}
\`\`\`

#### CUSTOM_CAPABILITY
A tab, group or widget on entity detail pages. Uses App Bridge for communication with epilot.

**Stack:** React + Vite + Tailwind + \`@epilot/volt-ui\` + \`@epilot/app-bridge\`
**Build output:** \`dist/\` directory (zipped and uploaded on deploy)
**Manifest configuration:**
\`\`\`json
{
  "component_type": "CUSTOM_CAPABILITY",
  "configuration": { "type": "tab", "allowed_schemas": ["contact", "order"] },
  "surfaces": { "capability_config": { "app_url": "./components/<name>/dist/index.html" } },
  "assets": { "zip": "./components/<name>/dist/" }
}
\`\`\`

\`allowed_schemas\` controls which entity types show the tab. Empty array = all schemas.
\`type\` can be \`"tab"\` (its own tab), \`"group"\` (a section on the main tab) or \`"widget"\` (a card in the widget grid at the top of the entity page). Widgets render in a compact card (~260px tall) alongside epilot's own widgets — design for a small, glanceable surface, not a full page.

**Key files:**
- \`src/main.tsx\` — Renders React app inside \`AppBridgeProvider\`
- \`src/AppBridgeProvider.tsx\` — Initializes App Bridge, receives auth token from parent
- \`src/AppBridgeContext.ts\` — React context for the bridge token
- \`vite.config.ts\` — Standard Vite build with \`base: './'\` for relative paths

#### CUSTOM_PAGE
A full custom page in the epilot navigation sidebar. Same stack as CUSTOM_CAPABILITY.

**Manifest configuration:**
\`\`\`json
{
  "component_type": "CUSTOM_PAGE",
  "configuration": { "slug": "<name>", "nav_label": "Page Title", "nav_icon": "layout" },
  "surfaces": { "page": { "app_url": "./components/<name>/dist/index.html" } },
  "assets": { "zip": "./components/<name>/dist/" }
}
\`\`\`

Reserved slugs (cannot use): entity, settings, dashboard, apps.

#### CUSTOM_PORTAL_BLOCK
A widget in the epilot Customer Portal. Same stack as CUSTOM_CAPABILITY.

**Manifest configuration:**
\`\`\`json
{
  "component_type": "CUSTOM_PORTAL_BLOCK",
  "configuration": {},
  "surfaces": { "portal_block": { "app_url": "./components/<name>/dist/index.html" } },
  "assets": { "zip": "./components/<name>/dist/" }
}
\`\`\`

#### CUSTOM_FLOW_ACTION_SANDBOX
JavaScript code that runs in epilot's sandboxed runtime when a flow action is triggered.

**Stack:** TypeScript (compiled to JS)
**Build output:** \`dist/handler.js\`
**Manifest configuration:**
\`\`\`json
{
  "component_type": "CUSTOM_FLOW_ACTION",
  "configuration": {
    "type": "sandbox",
    "sandbox_settings": { "code": "// read from dist/ during deploy" }
  }
}
\`\`\`

**Restrictions:** Max 300KB. \`eval()\` and \`Function()\` constructor are not allowed.

### Config-only components (no build step, just configuration.json)

#### CUSTOM_FLOW_ACTION_EXTERNAL
An external webhook called by epilot when a flow action triggers. No code to build.

**configuration.json:**
\`\`\`json
{
  "type": "external_integration",
  "external_integration_settings": {
    "url": "https://api.example.com/webhook",
    "headers": { "Content-Type": "application/json" }
  }
}
\`\`\`

Set \`"wait_for_callback": true\` if epilot should wait for your endpoint to respond before continuing the flow.

#### PORTAL_EXTENSION
Hooks that customize Customer Portal behavior. No UI, just configuration.

**configuration.json:**
\`\`\`json
{
  "hooks": [
    {
      "type": "registration_identifiers_check",
      "call": {
        "method": "POST",
        "url": "https://api.example.com/portal/register",
        "headers": { "x-api-key": "{{api_key}}" }
      }
    }
  ]
}
\`\`\`

**Available hook types:** \`registration_identifiers_check\`, \`contract_identification\`, \`meter_reading_plausibility_check\`, \`consumption_data_retrieval\`, \`cost_data_retrieval\`, \`price_data_retrieval\`.

Use \`{{option_key}}\` syntax in URLs/headers to interpolate secret option values set per-installation.

#### EXTERNAL_PRODUCT_CATALOG
Hooks that provide products from an external catalog to epilot Journeys.

**configuration.json:**
\`\`\`json
{
  "hooks": [
    {
      "id": "get-products",
      "name": { "de": "Produkte abrufen", "en": "Get Products" },
      "type": "products",
      "call": {
        "method": "POST",
        "url": "https://api.example.com/products",
        "headers": { "Content-Type": "application/json", "x-api-key": "{{api_key}}" }
      }
    }
  ]
}
\`\`\`

**Hook types:** \`products\`, \`product-recommendations\`.

### Inline components (no directory at all)

#### API_PROXY
A server-side proxy that lets your frontend components call an external API without exposing
credentials to the browser. Added with \`epilot app add-component <name> --type API_PROXY\`
(prompts for proxy name, target URL and auth type). Unlike every other component type it has
**no \`_dir\` and no folder** — it lives inline in \`manifest.json\`:

\`\`\`json
{
  "component_type": "API_PROXY",
  "configuration": {
    "name": "sap",
    "target": "https://my-gateway.example.com",
    "auth_type": "header"
  }
}
\`\`\`

Call it from the frontend with the \`@epilot/app-sdk\` helper (do not hand-roll fetch):

\`\`\`ts
import { proxy } from '@epilot/app-sdk';

const data = await proxy('sap', '/API_BUSINESS_PARTNER/A_BusinessPartner', {
  appId,
  token, // App Bridge session token
});
\`\`\`

Current limits — probe your target with curl through the proxy before building on it:

- **Query parameters are rejected** (400) by the proxy route's own request validation.
  Workaround until fixed: percent-encode the \`?\` into the path
  (\`/path%3F$expand=to_Customer\`) — fragile, leave a comment where you do it.
- Only **GET and POST** are proxied — no PUT/PATCH/DELETE.
- \`auth_type\` is \`none | header | bearer | oauth2\` — there is **no \`basic\`**. For HTTP Basic
  targets, add one secret option holding a pre-computed Base64 \`user:pass\` and configure
  \`"headers": { "Authorization": "Basic {{my_basic_secret}}" }\`.

## Local Development (Dev Mode)

\`npm run dev\` alone is of limited use for capabilities/pages: outside the epilot iframe there
is no token and no entity. **Dev mode** makes epilot load your component from localhost inside
the real epilot UI (localhost is a trustworthy origin, so the HTTPS iframe allows it).

\`\`\`bash
epilot app dev                                  # enable (default URL http://localhost:5173)
epilot app dev -c my-tab -u http://localhost:3000   # pick component and URL
epilot app dev --off                            # disable — required before cloning a version
\`\`\`

Then \`npm run dev\` in the component folder and reload the entity page in epilot.

If your CLI version predates \`app dev\`, it wraps these two raw API patches:

\`\`\`bash
# 1. Enable dev mode on the app
epilot app api patchMetadata <appId> -d '{"dev_mode": true}'

# 2. Add the override URL to the component.
#    The PATCH does NOT merge — fetch the full component object first and re-send
#    ALL of it with the override added, or you get: 400 must have required property 'id'.
epilot app api getConfiguration <appId>
epilot app api patchComponent <appId> <version> <componentId> -d '<full component + override>'
\`\`\`

The override location **depends on the component type**:

| Component type | Override field |
| --- | --- |
| \`CUSTOM_CAPABILITY\` (and other zip surfaces) | \`surfaces.capability_config.override_url\` |
| \`CUSTOM_JOURNEY_BLOCK\` | \`configuration.override_dev_mode.override_url\` |

Do not copy the journey-block shape onto a capability — it silently does nothing.

To leave dev mode, set \`dev_mode: false\` and remove the override (again re-sending the full
component).

Note: the dev-mode switch in the epilot portal UI is a different mechanism and does not write
these fields.

## Workflow: Building an App from Scratch

\`\`\`bash
# 0. If the app calls an external API: probe it with curl FIRST.
#    Get auth + one real response working in the terminal before writing any code.
#    (Through the proxy too, once deployed — its limits bite real targets, see API_PROXY.)

# 1. Scaffold the project
epilot app init my-app
cd my-app

# 2. Add components (interactive or with flags)
epilot app add-component my-block --type CUSTOM_JOURNEY_BLOCK
epilot app add-component my-tab --type CUSTOM_CAPABILITY
epilot app add-component my-webhook --type CUSTOM_FLOW_ACTION_EXTERNAL

# 3. Install dependencies
npm install

# 4. Develop components
cd components/my-block && npm run dev   # local dev server
cd components/my-tab && npm run dev     # local dev server

# 5. Edit config-only components
# Edit components/my-webhook/configuration.json directly

# 6. Build all components
npm run build

# 7. Validate the manifest
epilot app validate

# 8. Deploy (dry run first)
epilot app deploy --dry-run
epilot app deploy

# 9. Check versions
epilot app versions

# 10. Submit for marketplace review
epilot app review --technical-contact dev@example.com --marketing-contact marketing@example.com
\`\`\`

## Key Concepts

### Configuration override
For every component with a \`_dir\` field, the CLI reads \`components/<dir>/configuration.json\` at deploy time and uses it as the component's configuration, overriding whatever is in manifest.json. This means: **edit configuration in the component directory, not in manifest.json.**

### Asset upload flow
1. CLI reads local paths from manifest (\`./components/x/dist/bundle.js\`)
2. Requests a presigned S3 upload URL from the App API
3. Uploads the file to S3
4. Gets back the CDN URL
5. Injects the CDN URL into the component configuration/surfaces before upserting

### Permissions

Apps request permissions via the \`permissions\` array in the manifest. On installation, epilot
creates a role with these grants in the installing organization. Common actions:
\`entity:read\`, \`entity:write\`, \`entity:delete\`, \`workflow:read\`, \`workflow:write\`.

What permissions do and do not cover:

- They gate the app's **server-side** access to epilot APIs.
- They do **not** make the App Bridge token work against the Entity API — that call returns
  403 even with the permission granted. To show the current entity's data in a capability,
  read it from the App Bridge context (see the App Bridge section); that path needs **no
  permission at all**. Only request \`entity:*\` permissions for genuine server-side API use.
- **Every \`epilot app deploy\` re-patches the version's grants and desyncs existing
  installations** — the installed app starts getting 403s while the permissions UI still
  shows everything granted. After deploying to an already-installed app, re-sync with
  \`epilot app api patchInstallation <appId> -d '{"version":"<version>"}'\`, then have an org
  admin re-save the app configuration in epilot (the patch resets \`enabled\` to false).

### Options
Components can declare \`options\` — configuration values set by the installing organization. Types: \`text\`, \`number\`, \`boolean\`, \`secret\`. Use \`{{option_key}}\` in configuration URLs/headers for interpolation.

Two caveats:
- **Options merge on upsert.** Deploying a component without an \`options\` key leaves the old
  options in place, so removed options stay visible to installing admins. Send \`"options": []\`
  once to clear them, then patch the installation.
- **"Secret" means not delivered to the app's browser code.** Secret values are never stored
  in the manifest and are injected server-side — but organization admins with API access can
  read stored values back. Do not describe them to users as unreadable.

### Descriptions
All user-facing text (app name, component names, descriptions) must include a \`de\` (German) translation. \`en\` is optional but recommended.

### App Bridge

Capabilities, pages and portal blocks run in an iframe and talk to epilot via
\`@epilot/app-bridge\`. Wrap your app in an \`AppBridgeProvider\`.

**The context already contains the entity.** \`getEntityContext()\` returns the full entity
next to its id (the \`EntityContext\` type may not declare the \`entity\` field yet — it is
there at runtime). A tab that renders entity data needs no Entity API call and no
\`entity:read\` permission:

\`\`\`ts
const ctx = await getEntityContext()
ctx.entityId            // '53a9f8c4-…'
(ctx as any).entity     // the whole entity — prefer this over fetching it
\`\`\`

Prefer this over the Entity API: it is one round-trip cheaper, and app tokens are **not**
guaranteed to authorise direct Entity API calls (expect 403 there even when the permission
shows as granted).

**\`initialize()\` makes one attempt and rejects after \`timeout\` (default 5000 ms).** There is
no internal retry, so if the parent is not listening yet the message is lost. Retry 2–3 times
before concluding you are outside epilot, and keep the session token even when a later
context request fails — otherwise "epilot answered oddly" is indistinguishable from "no epilot".

**Report your height.** The iframe does not auto-size. Call \`updateContentHeight(px)\` from a
\`ResizeObserver\` on \`document.body\`. Do **not** set \`html, body, #root { height: 100% }\` while
measuring \`scrollHeight\` — the body then can never exceed the iframe, so the reported height
never grows and the tab stays a small scrolling box.

**Refresh on becoming visible.** \`onVisibilityChange(cb)\` fires when the user switches tabs.

**Debugging.** Your console output goes to the iframe's JS context (\`cdn.app.sls.epilot.io\`),
not \`top\`. Switch the DevTools context selector or you will see nothing and assume nothing ran.

### Volt UI
Use \`@epilot/volt-ui\` for UI components in App Bridge surfaces (capabilities, pages, portal blocks). It provides cards, buttons, forms, selectors, and more — consistent with epilot's design system.

### Concorde Elements
Use \`@epilot/concorde-elements\` for UI components in Journey Blocks. It provides buttons, cards, inputs — consistent with epilot's journey design system.
`,
    );

    log.success(`Created ${name}/`);
    log.info('');
    log.info(`  cd ${name}`);
    log.info('  npm install');
    log.info('  epilot app add-component my-action --type CUSTOM_FLOW_ACTION');
    log.info('');
    log.dim('See README.md for more details.');
  },
});
