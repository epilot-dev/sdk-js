import { defineCommand } from 'citty';
import { resolve } from 'node:path';
import { readManifest, log, createAppApiClient } from './manifest.js';

/**
 * Toggle dev mode for an app: epilot loads the chosen component from a local
 * dev server instead of the CDN, so changes show up on reload without a
 * deploy. Wraps the two raw API patches (metadata dev_mode + component
 * override URL) that previously had to be done by hand — including the
 * full-object component PATCH and the per-component-type override location.
 */
export default defineCommand({
  meta: { name: 'dev', description: 'Serve a component from localhost inside epilot (dev mode)' },
  args: {
    path: { type: 'positional', description: 'Path to manifest.json', required: false },
    component: { type: 'string', alias: 'c', description: 'Component to override (folder name in components/)' },
    url: { type: 'string', alias: 'u', description: 'Local dev server URL (default: http://localhost:5173)' },
    off: { type: 'boolean', description: 'Disable dev mode and remove the override' },
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    profile: { type: 'string', description: 'Use a named profile' },
  },
  run: async ({ args }) => {
    const manifestPath = resolve(args.path ?? 'manifest.json');
    const manifest = readManifest(manifestPath);
    const client = createAppApiClient({ token: args.token, server: args.server, profile: args.profile });

    if (!manifest.app_id) {
      log.error('No app_id in manifest — deploy the app once before using dev mode.');
      process.exit(1);
    }
    const appId = manifest.app_id;
    const overrideUrl = args.url ?? 'http://localhost:5173';

    // Resolve the component to override from the local manifest
    const overridable = manifest.components.filter(
      (c) => c.component_type === 'CUSTOM_JOURNEY_BLOCK' || (c.surfaces && Object.keys(c.surfaces).length > 0),
    );

    let localComponent = args.component ? manifest.components.find((c) => c._dir === args.component) : undefined;

    if (args.component && !localComponent) {
      log.error(`Component "${args.component}" not found in manifest (expected its folder name in components/).`);
      process.exit(1);
    }

    if (!localComponent) {
      if (overridable.length === 1) {
        localComponent = overridable[0];
      } else if (overridable.length === 0) {
        log.error(
          'No overridable component found — dev mode works for UI components (capabilities, pages, portal blocks, journey blocks).',
        );
        process.exit(1);
      } else {
        log.error(
          `Multiple UI components found — pick one with --component <name>: ${overridable
            .map((c) => c._dir)
            .filter(Boolean)
            .join(', ')}`,
        );
        process.exit(1);
      }
    }

    // Fetch the remote component: the PATCH endpoint replaces, it does not
    // merge, so the full remote object must be re-sent with the override.
    const config = await client.getConfiguration(appId);
    const version = config.latest_version as string;
    const remoteVersion = await client.getVersion(appId, version);
    const remoteComponents = (remoteVersion.components ?? []) as Record<string, unknown>[];
    const remoteComponent = remoteComponents.find((c) => c.id === localComponent!.id);

    if (!remoteComponent) {
      log.error(`Component ${localComponent!.id} not found in deployed version ${version} — deploy first.`);
      process.exit(1);
    }

    // The override lives in a different place per component type:
    // journey blocks use configuration.override_dev_mode.override_url,
    // everything with surfaces uses <surface>.override_url.
    if (remoteComponent.component_type === 'CUSTOM_JOURNEY_BLOCK') {
      const configuration = (remoteComponent.configuration ?? {}) as Record<string, unknown>;
      if (args.off) {
        delete configuration.override_dev_mode;
      } else {
        configuration.override_dev_mode = { override_url: overrideUrl };
      }
      remoteComponent.configuration = configuration;
    } else {
      const surfaces = (remoteComponent.surfaces ?? {}) as Record<string, Record<string, unknown>>;
      for (const surface of Object.values(surfaces)) {
        if (surface && typeof surface === 'object') {
          if (args.off) {
            delete surface.override_url;
          } else {
            surface.override_url = overrideUrl;
          }
        }
      }
    }

    await client.upsertComponent(appId, version, remoteComponent);
    await client.patchMetadata(appId, { dev_mode: !args.off });

    if (args.off) {
      log.header('Dev mode disabled.');
      log.dim('The component is served from the CDN again.');
    } else {
      log.header(`Dev mode enabled for ${localComponent!._dir ?? localComponent!.id}`);
      log.info(`epilot now loads this component from ${overrideUrl}`);
      log.info('');
      log.info(`  1. cd components/${localComponent!._dir ?? '<component>'} && npm run dev`);
      log.info('  2. Reload the page in epilot to see your changes');
      log.info('');
      log.dim('Turn off with: epilot app dev --off  (required before cloning a new version)');
    }
  },
});
