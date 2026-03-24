import { defineCommand } from 'citty';
import { resolve, dirname, extname, join } from 'node:path';
import { existsSync, statSync, readFileSync } from 'node:fs';
import { readManifest, writeManifest, log, createAppApiClient, toManifest, uploadFileToPresignedUrl, uploadDirectoryAsZip, formatFileSize } from './manifest.js';

export default defineCommand({
  meta: { name: 'deploy', description: 'Deploy an app from manifest.json' },
  args: {
    path: { type: 'positional', description: 'Path to manifest.json', required: false },
    'new-version': { type: 'boolean', description: 'Create a new version' },
    'dry-run': { type: 'boolean', description: 'Show what would change without applying' },
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    profile: { type: 'string', description: 'Use a named profile' },
  },
  run: async ({ args }) => {
    const manifestPath = resolve(args.path ?? 'manifest.json');
    const manifestDir = dirname(manifestPath);
    const manifest = readManifest(manifestPath);
    const client = createAppApiClient({ token: args.token, server: args.server, profile: args.profile });
    const isNew = !manifest.app_id;
    const dryRun = args['dry-run'] ?? false;

    log.header(`Deploying ${manifest.name}...`);

    // Step 1: Create or update app
    let appId = manifest.app_id;
    let targetVersion: string;

    if (isNew) {
      if (dryRun) {
        log.info('[dry-run] Would create new app configuration');
        appId = '<new-app-id>';
        targetVersion = '0.0.1';
      } else {
        const result = await client.createConfiguration({
          name: manifest.name,
          description: manifest.description,
          category: manifest.category,
        });
        appId = result.app_id;
        targetVersion = result.version ?? '0.0.1';
        manifest.app_id = appId;
        writeManifest(manifestPath, manifest);
        log.success(`Created app ${appId}`);
        log.dim(`app_id written back to ${manifestPath}`);
      }
    } else {
      const config = await client.getConfiguration(appId!);
      targetVersion = config.latest_version as string;

      if (!dryRun) {
        // Patch metadata
        await client.patchMetadata(appId!, {
          name: manifest.name,
          description: manifest.description,
          ...(manifest.category ? { category: manifest.category } : {}),
          ...(manifest.documentation_url ? { documentation_url: manifest.documentation_url } : {}),
          ...(manifest.support_email ? { support_email: manifest.support_email } : {}),
          ...(manifest.pricing ? { pricing: manifest.pricing } : {}),
          ...(manifest.notifications ? { notifications: manifest.notifications } : {}),
        });
        log.success('Updated metadata');
      } else {
        log.info('[dry-run] Would update metadata');
      }
    }

    // Step 2: New version if requested
    if (args['new-version'] && appId && !isNew) {
      if (dryRun) {
        log.info('[dry-run] Would create new version');
      } else {
        const result = await client.cloneVersion(appId, targetVersion);
        targetVersion = result.version;
        log.success(`Created version ${targetVersion}`);
      }
    }

    // Step 3: Upload logo
    if (manifest.assets?.logo) {
      const logoPath = resolve(manifestDir, manifest.assets.logo);
      if (existsSync(logoPath)) {
        if (dryRun) {
          log.info(`[dry-run] Would upload logo: ${manifest.assets.logo}`);
        } else {
          const ext = extname(logoPath).toLowerCase();
          const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
          const filename = manifest.assets.logo.split('/').pop()!;
          const { upload_url, s3_key } = await client.createLogoUploadUrl(appId!, filename, mimeType);
          await uploadFileToPresignedUrl(upload_url, logoPath);
          await client.patchMetadata(appId!, { logo_url_key: s3_key });
          log.success(`Uploaded logo (${formatFileSize(statSync(logoPath).size)})`);
        }
      } else {
        log.warn(`Logo not found: ${logoPath}`);
      }
    }

    // Step 4: Patch version (permissions, blueprint)
    if (manifest.permissions?.length || manifest.blueprint?.manifest_id) {
      if (dryRun) {
        log.info('[dry-run] Would update version permissions/blueprint');
      } else {
        await client.patchVersion(appId!, targetVersion, {
          ...(manifest.permissions?.length ? { grants: manifest.permissions } : {}),
          ...(manifest.blueprint?.manifest_id ? { manifest_id: manifest.blueprint.manifest_id } : {}),
        });
        log.success(`Updated version ${targetVersion} (permissions/blueprint)`);
      }
    }

    // Step 5: Upload assets, resolve URLs, then upsert components
    for (const comp of manifest.components) {
      // Strip CLI-only fields before sending to API
      const { assets, _dir, ...componentPayload } = comp;
      for (const key of Object.keys(componentPayload)) {
        if (key.startsWith('_')) delete (componentPayload as Record<string, unknown>)[key];
      }

      // Read configuration.json override from component directory
      if (_dir) {
        const configJsonPath = resolve(manifestDir, 'components', _dir, 'configuration.json');
        if (existsSync(configJsonPath)) {
          try {
            const localConfig = JSON.parse(readFileSync(configJsonPath, 'utf-8'));
            componentPayload.configuration = localConfig;
            log.dim(`Read configuration from components/${_dir}/configuration.json`);
          } catch (err) {
            log.warn(`Failed to parse components/${_dir}/configuration.json: ${(err as Error).message}`);
          }
        }
      }

      // Upload bundle first to get the CDN URL
      if (assets?.bundle) {
        const bundlePath = resolve(manifestDir, assets.bundle);
        if (existsSync(bundlePath)) {
          if (dryRun) {
            log.info(`[dry-run] Would upload bundle: ${assets.bundle}`);
          } else {
            const { upload_url, component_url } = await client.createBundleUploadUrl(appId!, targetVersion, comp.id);
            await uploadFileToPresignedUrl(upload_url, bundlePath);
            log.success(`Uploaded bundle for ${comp.id} (${formatFileSize(statSync(bundlePath).size)})`);

            // Inject the CDN URL into configuration (for journey blocks)
            const config = componentPayload.configuration as Record<string, unknown>;
            if (config.component_url) {
              config.component_url = component_url;
            }
          }
        } else {
          log.warn(`Bundle not found: ${bundlePath} — run "npm run build" first, skipping component`);
          continue;
        }
      }

      // Upload zip to get the artifact URL
      if (assets?.zip) {
        const zipPath = resolve(manifestDir, assets.zip);
        if (existsSync(zipPath)) {
          if (dryRun) {
            log.info(`[dry-run] Would zip and upload: ${assets.zip}`);
          } else {
            const { upload_url, artifact_url } = await client.createZipUploadUrl(appId!, targetVersion, comp.id);
            const zipSize = await uploadDirectoryAsZip(upload_url, zipPath);
            log.success(`Uploaded zip for ${comp.id} (${formatFileSize(zipSize)})`);

            // Inject the artifact URL into surfaces (for app bridge components)
            if (componentPayload.surfaces && typeof componentPayload.surfaces === 'object') {
              for (const surface of Object.values(componentPayload.surfaces as Record<string, Record<string, unknown>>)) {
                if (surface && typeof surface === 'object') {
                  if ('app_url' in surface) {
                    surface.app_url = artifact_url;
                  }
                  if ('zip_url' in surface) {
                    surface.zip_url = artifact_url;
                  }
                }
              }
            }
          }
        } else {
          log.warn(`Directory not found: ${zipPath} — run "npm run build" first, skipping component`);
          continue;
        }
      }

      // Now upsert the component with resolved URLs
      if (dryRun) {
        log.info(`[dry-run] Would upsert component ${comp.id} (${comp.component_type})`);
      } else {
        await client.upsertComponent(appId!, targetVersion, componentPayload);
        log.success(`Upserted component ${comp.id}`);
      }
    }

    // Step 6: Delete remote components that are no longer in the manifest
    if (!isNew) {
      const remoteVersion = await client.getVersion(appId!, targetVersion);
      const remoteComponents = (remoteVersion.components ?? []) as { id: string; component_type?: string }[];
      const localIds = new Set(manifest.components.map(c => c.id));

      for (const remote of remoteComponents) {
        if (!localIds.has(remote.id)) {
          if (dryRun) {
            log.info(`[dry-run] Would delete remote component ${remote.id}`);
          } else {
            await client.deleteComponent(appId!, targetVersion, remote.id);
            log.success(`Deleted remote component ${remote.id}`);
          }
        }
      }
    }

    if (dryRun) {
      log.header('Dry run complete. No changes were made.');
    } else {
      log.header(`Deployed v${targetVersion} of ${manifest.name} (app_id: ${appId})`);
    }
  },
});
