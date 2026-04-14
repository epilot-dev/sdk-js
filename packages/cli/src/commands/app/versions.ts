import { defineCommand } from 'citty';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { log, readManifest, createAppApiClient } from './manifest.js';
import { BOLD, RESET, DIM, GREEN, YELLOW, RED, CYAN } from '../../lib/utils.js';

export default defineCommand({
  meta: { name: 'versions', description: 'List app versions' },
  args: {
    'app-id': { type: 'string', description: 'App ID (reads from manifest.json if not provided)' },
    path: { type: 'string', description: 'Path to manifest.json' },
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    profile: { type: 'string', description: 'Use a named profile' },
  },
  run: async ({ args }) => {
    const client = createAppApiClient({ token: args.token, server: args.server, profile: args.profile });

    let appId = args['app-id'];
    if (!appId) {
      const manifestPath = resolve(args.path ?? 'manifest.json');
      if (existsSync(manifestPath)) {
        try {
          const manifest = readManifest(manifestPath);
          appId = manifest.app_id;
        } catch {
          /* ignore */
        }
      }
    }

    if (!appId) {
      log.error('No app_id found. Pass --app-id or ensure manifest.json has app_id set.');
      process.exit(1);
    }

    const config = (await client.getConfiguration(appId)) as Record<string, unknown>;
    const latestVersion = config.latest_version as string;
    const publicVersions = new Set((config.public_versions ?? []) as string[]);

    const data = (await client.listVersions(appId)) as { versions?: Record<string, unknown>[] };
    const versions = data.versions ?? [];

    if (versions.length === 0) {
      log.info('No versions found.');
      return;
    }

    const w = (s: string) => process.stdout.write(s);

    w(`\n${BOLD}${config.name}${RESET} ${DIM}(${appId})${RESET}\n\n`);

    // Header
    w(
      `  ${BOLD}${'VERSION'.padEnd(10)}${'VISIBILITY'.padEnd(14)}${'STATUS'.padEnd(12)}${'COMPONENTS'.padEnd(12)}${'CREATED'.padEnd(24)}${RESET}\n`,
    );
    w(`  ${'─'.repeat(70)}\n`);

    for (const v of versions) {
      const ver = v.version as string;
      const visibility = publicVersions.has(ver) ? 'public' : ((v.visibility as string) ?? 'private');
      const reviewStatus = v.review_status as string | undefined;
      const components = ((v.components as unknown[]) ?? []).length;
      const deprecatedAt = v.deprecated_at as string | undefined;
      const audit = v.version_audit as Record<string, unknown> | undefined;
      const createdAt = audit?.versioned_at ?? audit?.created_at;

      // Version with latest marker
      const isLatest = ver === latestVersion;
      const versionStr = isLatest ? `${ver} *` : ver;

      // Visibility color
      const visColor = visibility === 'public' ? GREEN : DIM;

      // Status
      let status = '';
      if (deprecatedAt) {
        status = `${RED}deprecated${RESET}`;
      } else if (reviewStatus === 'approved') {
        status = `${GREEN}approved${RESET}`;
      } else if (reviewStatus === 'pending') {
        status = `${YELLOW}pending${RESET}`;
      } else if (reviewStatus === 'rejected') {
        status = `${RED}rejected${RESET}`;
      } else {
        status = `${DIM}draft${RESET}`;
      }

      // Date
      const date = createdAt ? new Date(createdAt as string).toISOString().replace('T', ' ').slice(0, 19) : '';

      w(
        `  ${CYAN}${versionStr.padEnd(10)}${RESET}${visColor}${visibility.padEnd(14)}${RESET}${status}${' '.repeat(Math.max(0, 12 - stripAnsi(status).length))}${String(components).padEnd(12)}${DIM}${date}${RESET}\n`,
      );
    }

    w(`\n  ${DIM}* latest version${RESET}\n\n`);
  },
});

function stripAnsi(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: stripping ANSI escape sequences requires matching control characters
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}
