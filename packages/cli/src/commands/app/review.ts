import { defineCommand } from 'citty';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { log, createAppApiClient, readManifest } from './manifest.js';

export default defineCommand({
  meta: { name: 'review', description: 'Submit an app version for public review' },
  args: {
    'app-id': { type: 'string', description: 'App ID (reads from manifest.json if not provided)' },
    version: { type: 'string', description: 'Version to submit (default: latest)' },
    'technical-contact': { type: 'string', description: 'Technical contact email (required)' },
    'marketing-contact': { type: 'string', description: 'Marketing contact email (required)' },
    'demo-url': { type: 'string', description: 'URL to a demo of the app' },
    path: { type: 'string', description: 'Path to manifest.json (to read app_id)' },
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    profile: { type: 'string', description: 'Use a named profile' },
  },
  run: async ({ args }) => {
    const client = createAppApiClient({ token: args.token, server: args.server, profile: args.profile });

    // Resolve app_id from flag or manifest
    let appId = args['app-id'];
    if (!appId) {
      const manifestPath = resolve(args.path ?? 'manifest.json');
      if (existsSync(manifestPath)) {
        try {
          const manifest = readManifest(manifestPath);
          appId = manifest.app_id;
        } catch {
          // ignore parse errors, user can pass --app-id
        }
      }
    }

    if (!appId) {
      log.error('No app_id found. Pass --app-id or ensure manifest.json has app_id set.');
      process.exit(1);
    }

    const technicalContact = args['technical-contact'];
    const marketingContact = args['marketing-contact'];

    if (!technicalContact || !marketingContact) {
      log.error('Both --technical-contact and --marketing-contact are required.');
      process.exit(1);
    }

    // Resolve version
    let version = args.version;
    if (!version) {
      const config = await client.getConfiguration(appId);
      version = config.latest_version as string;
    }

    log.header(`Submitting v${version} of ${appId} for review...`);

    const result = await client.createReview(appId, version, {
      technical_contact: technicalContact,
      marketing_contact: marketingContact,
      ...(args['demo-url'] ? { demo_url: args['demo-url'] } : {}),
    });

    log.success(`Review submitted for v${version}`);
    log.info(`Status: ${(result.review as Record<string, unknown>)?.review_status ?? 'pending'}`);
    log.dim('The epilot team will review your app and update the status.');
  },
});
