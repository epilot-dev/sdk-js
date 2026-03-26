import { defineCommand } from 'citty';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { log, readManifest, writeManifest, type ManifestProxy, type ManifestProxyAuth } from './manifest.js';

export default defineCommand({
  meta: { name: 'add-proxy', description: 'Add a proxy endpoint to the app' },
  args: {
    name: { type: 'positional', description: 'Proxy name (used in proxy URL path)', required: false },
    target: { type: 'string', alias: 'u', description: 'Target HTTPS URL to proxy requests to' },
    'auth-type': {
      type: 'string',
      description: 'Authentication type: header, bearer, oauth2, none',
    },
    'auth-header': { type: 'string', description: 'Header name for "header" auth type' },
    'auth-secret': { type: 'string', description: 'Secret option key for the API key or client secret' },
    'oauth2-token-url': { type: 'string', description: 'OAuth2 token endpoint URL' },
    'oauth2-client-id-secret': { type: 'string', description: 'Secret option key for the OAuth2 client ID' },
    'oauth2-scope': { type: 'string', description: 'OAuth2 scopes (space-separated)' },
    path: { type: 'string', description: 'Path to manifest.json (default: manifest.json)' },
  },
  run: async ({ args }) => {
    const manifestPath = resolve(args.path ?? 'manifest.json');
    if (!existsSync(manifestPath)) {
      log.error('manifest.json not found. Run "epilot app init" first.');
      process.exit(1);
    }
    const manifest = readManifest(manifestPath);

    // Interactive: prompt for name if not provided
    let proxyName = args.name;
    if (!proxyName) {
      const { input } = await import('@inquirer/prompts');
      proxyName = await input({
        message: 'Proxy name',
        validate: (v) => {
          if (!v.trim()) return 'Name is required';
          if (!/^[a-zA-Z0-9_-]+$/.test(v)) return 'Use letters, numbers, hyphens, and underscores';
          if (v.length > 64) return 'Max 64 characters';
          return true;
        },
      });
    }

    // Check for duplicate
    if (manifest.proxies?.some((p) => p.name === proxyName)) {
      log.error(`Proxy "${proxyName}" already exists in manifest.`);
      process.exit(1);
    }

    // Interactive: prompt for target URL if not provided
    let target = args.target;
    if (!target) {
      const { input } = await import('@inquirer/prompts');
      target = await input({
        message: 'Target URL (must be HTTPS)',
        validate: (v) => {
          if (!v.trim()) return 'Target URL is required';
          if (!v.startsWith('https://')) return 'Must start with https://';
          try {
            new URL(v);
            return true;
          } catch {
            return 'Must be a valid URL';
          }
        },
      });
    }

    // Build auth config from flags
    let auth: ManifestProxyAuth | undefined;
    const authType = args['auth-type'] as ManifestProxyAuth['type'] | undefined;
    if (authType) {
      const validTypes = ['header', 'bearer', 'oauth2', 'none'] as const;
      if (!validTypes.includes(authType as (typeof validTypes)[number])) {
        log.error(`Invalid auth type: ${authType}. Must be one of: ${validTypes.join(', ')}`);
        process.exit(1);
      }

      auth = { type: authType };

      if (authType === 'header') {
        auth.header = args['auth-header'];
        auth.secret = args['auth-secret'];
      } else if (authType === 'bearer') {
        auth.secret = args['auth-secret'];
      } else if (authType === 'oauth2') {
        auth.secret = args['auth-secret'];
        if (args['oauth2-token-url'] && args['oauth2-client-id-secret']) {
          auth.oauth2 = {
            token_url: args['oauth2-token-url'],
            client_id_secret: args['oauth2-client-id-secret'],
            ...(args['oauth2-scope'] ? { scope: args['oauth2-scope'] } : {}),
          };
        }
      }
    }

    // Add proxy to manifest
    const proxy: ManifestProxy = { name: proxyName, target };
    if (auth) proxy.auth = auth;

    if (!manifest.proxies) manifest.proxies = [];
    manifest.proxies.push(proxy);
    writeManifest(manifestPath, manifest);

    log.success(`Added proxy "${proxyName}" → ${target}`);
    if (auth) {
      log.info(`  Auth: ${auth.type}`);
    }
    log.info(`manifest.json updated (${manifest.proxies.length} proxy/proxies)`);
  },
});
