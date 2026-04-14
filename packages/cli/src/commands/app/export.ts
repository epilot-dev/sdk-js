import { defineCommand } from 'citty';
import { resolve } from 'node:path';
import { log, createAppApiClient, toManifest, writeManifest } from './manifest.js';

export default defineCommand({
  meta: { name: 'export', description: 'Export an existing app as manifest.json' },
  args: {
    'app-id': { type: 'string', description: 'App ID to export', required: true },
    version: { type: 'string', description: 'Version to export (default: latest)' },
    output: { type: 'string', alias: 'o', description: 'Output path (default: manifest.json)' },
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    profile: { type: 'string', description: 'Use a named profile' },
  },
  run: async ({ args }) => {
    const client = createAppApiClient({ token: args.token, server: args.server, profile: args.profile });
    const appId = args['app-id'];

    log.header(`Exporting app ${appId}...`);

    const config = await client.getConfiguration(appId);
    const targetVersion = args.version ?? (config.latest_version as string);
    const version = await client.getVersion(appId, targetVersion);

    log.info(`Version: ${targetVersion}`);

    const manifest = toManifest(config, version);
    const outputPath = resolve(args.output ?? 'manifest.json');
    writeManifest(outputPath, manifest);

    log.success(`Exported to ${outputPath}`);
    log.info(`App: ${manifest.name}`);
    log.info(`Components: ${manifest.components.length}`);
    log.dim('Asset paths are placeholders. Update them to point to your local files.');
  },
});
