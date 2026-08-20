import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { execSync } from 'node:child_process';
import { resolveToken, loadCredentials } from '../../lib/auth-store.js';
import { validateScheduleExpression } from './schedule.js';
import { getResolvedProfile } from '../../lib/profiles.js';
import { BOLD, RESET, GREEN, RED, YELLOW, DIM } from '../../lib/utils.js';

export interface AppManifest {
  $schema?: string;
  manifest_version: number;
  app_id?: string;
  name: string;
  description: { en?: string | null; de: string };
  category?: string;
  author?: { name?: string; company: string; email?: string };
  documentation_url?: string;
  support_email?: string;
  pricing?: { pricing_type?: string; billing_frequency?: string };
  notifications?: { email?: string; events?: string[] };
  permissions?: { action: string; resource?: string }[];
  blueprint?: { manifest_id?: string };
  assets?: { logo?: string };
  functions?: ManifestFunction[];
  components: ManifestComponent[];
}

export interface ManifestFunction {
  /** Unique function name within the app (kebab-case) */
  name: string;
  /**
   * workflow: referenced by a CUSTOM_FLOW_ACTION component (type "function").
   * scheduled: runs automatically once per installation on its cron schedule.
   */
  type: 'workflow' | 'scheduled';
  /** Human-readable display name, e.g. shown in the flow builder action picker */
  label?: { en?: string | null; de: string };
  description?: { en?: string | null; de: string };
  /** Local path to the bundled handler JS — inlined as `code` on deploy */
  handler: string;
  /** 5-field cron or rate(...) expression; requires type "scheduled" */
  schedule?: string;
  schedule_timezone?: string;
  schedule_overlap?: 'skip';
  /** Keys of installation options of type secret exposed to the function */
  secrets?: string[];
}

export interface ManifestComponent {
  id: string;
  component_type: string;
  name?: { en?: string | null; de: string };
  description?: { en?: string | null; de: string };
  options?: { key: string; label?: string; type: string; required?: boolean; description?: string }[];
  configuration: Record<string, unknown>;
  surfaces?: Record<string, unknown>;
  assets?: { bundle?: string; zip?: string };
  /** Local directory name in components/ (CLI-only, not sent to API) */
  _dir?: string;
}

// ─── Logger ────────────────────────────────────────────────────────────────────

export const log = {
  success: (msg: string) => process.stdout.write(`${GREEN}✓${RESET} ${msg}\n`),
  error: (msg: string) => process.stderr.write(`${RED}✗${RESET} ${msg}\n`),
  warn: (msg: string) => process.stdout.write(`${YELLOW}!${RESET} ${msg}\n`),
  info: (msg: string) => process.stdout.write(`  ${msg}\n`),
  dim: (msg: string) => process.stdout.write(`  ${DIM}${msg}${RESET}\n`),
  header: (msg: string) => process.stdout.write(`\n${BOLD}${msg}${RESET}\n`),
};

// ─── Validation ────────────────────────────────────────────────────────────────

const COMPONENT_TYPES = [
  'CUSTOM_JOURNEY_BLOCK',
  'CUSTOM_PORTAL_BLOCK',
  'PORTAL_EXTENSION',
  'CUSTOM_FLOW_ACTION',
  'CUSTOM_CAPABILITY',
  'EXTERNAL_PRODUCT_CATALOG',
  'CUSTOM_PAGE',
  'API_PROXY',
];

export interface ValidationError {
  path: string;
  message: string;
}

export function validateManifest(data: unknown): { valid: boolean; errors: ValidationError[]; manifest?: AppManifest } {
  const errors: ValidationError[] = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: [{ path: '/', message: 'Must be an object' }] };
  }
  const obj = data as Record<string, unknown>;

  if (obj.manifest_version !== 1) {
    errors.push({ path: '/manifest_version', message: 'Must be 1' });
  }
  if (!obj.name || typeof obj.name !== 'string') {
    errors.push({ path: '/name', message: 'Required string' });
  }
  if (!obj.description || typeof obj.description !== 'object') {
    errors.push({ path: '/description', message: 'Required object with "de" field' });
  } else if (!(obj.description as Record<string, unknown>).de) {
    errors.push({ path: '/description/de', message: 'Required' });
  }
  if (!Array.isArray(obj.components)) {
    errors.push({ path: '/components', message: 'Required array' });
  } else {
    for (let i = 0; i < obj.components.length; i++) {
      const comp = obj.components[i] as Record<string, unknown>;
      if (!comp.id) errors.push({ path: `/components/${i}/id`, message: 'Required' });
      if (!comp.component_type || !COMPONENT_TYPES.includes(comp.component_type as string)) {
        errors.push({
          path: `/components/${i}/component_type`,
          message: `Must be one of: ${COMPONENT_TYPES.join(', ')}`,
        });
      }
      if (!comp.configuration || typeof comp.configuration !== 'object') {
        errors.push({ path: `/components/${i}/configuration`, message: 'Required object' });
      }
    }
  }

  if (obj.functions !== undefined) {
    if (!Array.isArray(obj.functions)) {
      errors.push({ path: '/functions', message: 'Must be an array' });
    } else {
      validateFunctions(obj.functions, errors);
    }
  }

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, errors: [], manifest: data as AppManifest };
}

const FUNCTION_NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
const MAX_FUNCTIONS = 10;
const MAX_SCHEDULED_FUNCTIONS = 5;

function validateFunctions(functions: unknown[], errors: ValidationError[]): void {
  if (functions.length > MAX_FUNCTIONS) {
    errors.push({ path: '/functions', message: `At most ${MAX_FUNCTIONS} functions per app` });
  }

  const seen = new Set<string>();
  let scheduled = 0;

  for (let i = 0; i < functions.length; i++) {
    const fn = functions[i] as Record<string, unknown>;
    const path = `/functions/${i}`;

    if (fn.type !== 'workflow' && fn.type !== 'scheduled') {
      errors.push({ path: `${path}/type`, message: 'Required: "workflow" or "scheduled"' });
    }
    if (fn.type === 'scheduled' && fn.schedule === undefined) {
      errors.push({ path: `${path}/schedule`, message: 'Scheduled functions require a schedule expression' });
    }
    if (fn.type !== 'scheduled' && fn.schedule !== undefined) {
      errors.push({ path: `${path}/schedule`, message: 'Only functions of type "scheduled" may declare a schedule' });
    }
    if (typeof fn.name !== 'string' || !FUNCTION_NAME_PATTERN.test(fn.name)) {
      errors.push({ path: `${path}/name`, message: 'Required kebab-case string (a-z, 0-9, dashes; max 64 chars)' });
    } else if (seen.has(fn.name)) {
      errors.push({ path: `${path}/name`, message: `Duplicate function name "${fn.name}"` });
    } else {
      seen.add(fn.name);
    }

    if (typeof fn.handler !== 'string' || fn.handler.length === 0) {
      errors.push({ path: `${path}/handler`, message: 'Required path to the bundled handler JS' });
    }

    if (fn.schedule !== undefined) {
      scheduled++;
      if (typeof fn.schedule !== 'string') {
        errors.push({ path: `${path}/schedule`, message: 'Must be a cron or rate() expression string' });
      } else {
        const result = validateScheduleExpression(fn.schedule);
        if (!result.valid) {
          errors.push({ path: `${path}/schedule`, message: result.error ?? 'Invalid schedule expression' });
        }
      }
    }

    if (fn.schedule_overlap !== undefined && fn.schedule_overlap !== 'skip') {
      errors.push({ path: `${path}/schedule_overlap`, message: 'Only "skip" is supported' });
    }
  }

  if (scheduled > MAX_SCHEDULED_FUNCTIONS) {
    errors.push({
      path: '/functions',
      message: `At most ${MAX_SCHEDULED_FUNCTIONS} scheduled functions per app (schedules run once per installation)`,
    });
  }
}

// ─── Manifest I/O ──────────────────────────────────────────────────────────────

export function readManifest(path: string): AppManifest {
  const absPath = resolve(path);
  if (!existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }
  const content = readFileSync(absPath, 'utf-8');
  const data = JSON.parse(content);
  const result = validateManifest(data);
  if (!result.valid) {
    const msgs = result.errors.map((e) => `  ${e.path}: ${e.message}`).join('\n');
    throw new Error(`Invalid manifest:\n${msgs}`);
  }
  return result.manifest!;
}

export function writeManifest(path: string, manifest: AppManifest): void {
  writeFileSync(resolve(path), `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
}

// ─── API Client ────────────────────────────────────────────────────────────────

const DEFAULT_BASE_URL = 'https://app.sls.epilot.io';

export interface ApiClientOptions {
  token?: string;
  server?: string;
  profile?: string;
}

/** Bump the patch segment of a semver-ish version string (0.0.1 -> 0.0.2). */
export function bumpPatchVersion(version: string): string {
  const parts = version.split('.');
  const patch = Number.parseInt(parts[parts.length - 1], 10);
  if (Number.isNaN(patch)) {
    throw new Error(`Cannot derive next version from "${version}" — pass an explicit target version`);
  }
  parts[parts.length - 1] = String(patch + 1);
  return parts.join('.');
}

async function request(baseUrl: string, token: string, method: string, path: string, body?: unknown): Promise<unknown> {
  const url = `${baseUrl}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`API ${method} ${path} failed (${response.status}): ${text}`);
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  const text = await response.text();
  if (!text) return undefined;

  if (contentType.includes('application/json')) {
    return JSON.parse(text);
  }
  return text;
}

/**
 * Decode a JWT payload without verifying the signature.
 * Returns null if the token is not a valid JWT.
 */
const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(payload);
  } catch {
    return null;
  }
};

/**
 * Resolve the caller's organization id: token claims first (works for
 * --token / EPILOT_TOKEN), then the active profile / stored credentials.
 */
export function resolveOrgId(tokenFlag?: string, profile?: string): string | undefined {
  const token = resolveToken(tokenFlag, profile);
  const claims = token ? parseJwtPayload(token) : null;
  const fromToken = (claims?.org_id ?? claims?.['custom:ivy_org_id']) as string | undefined;
  if (fromToken) return fromToken;
  return getResolvedProfile(profile)?.org_id ?? loadCredentials()?.org_id;
}

/**
 * Derive the Permissions API base URL from the App API base URL
 * (e.g. https://app.sls.epilot.io -> https://permissions.sls.epilot.io).
 * Returns null if the URL doesn't follow the epilot service naming scheme.
 */
export function derivePermissionsBaseUrl(appBaseUrl: string): string | null {
  try {
    const url = new URL(appBaseUrl);
    if (!url.hostname.startsWith('app.')) return null;
    url.hostname = url.hostname.replace(/^app\./, 'permissions.');
    return url.origin;
  } catch {
    return null;
  }
}

export function createAppApiClient(opts: ApiClientOptions) {
  const baseUrl = opts.server ?? DEFAULT_BASE_URL;

  const getToken = (): string => {
    const token = resolveToken(opts.token, opts.profile);
    if (!token) {
      log.error('Not authenticated. Run "epilot auth login" first.');
      process.exit(1);
    }
    return token;
  };

  return {
    async createConfiguration(payload: {
      name: string;
      description: { en?: string | null; de: string };
      category?: string;
    }) {
      return request(baseUrl, getToken(), 'POST', '/v1/app-configurations', payload) as Promise<{
        app_id: string;
        version: string;
      }>;
    },
    async getConfiguration(appId: string) {
      return request(baseUrl, getToken(), 'GET', `/v1/app-configurations/${appId}`) as Promise<Record<string, unknown>>;
    },
    async patchMetadata(appId: string, payload: Record<string, unknown>) {
      await request(baseUrl, getToken(), 'PATCH', `/v1/app-configurations/${appId}`, payload);
    },
    async getVersion(appId: string, version: string) {
      return request(baseUrl, getToken(), 'GET', `/v1/app-configurations/${appId}/versions/${version}`) as Promise<
        Record<string, unknown>
      >;
    },
    async listVersions(appId: string) {
      return request(baseUrl, getToken(), 'GET', `/v1/app-configurations/${appId}/versions`) as Promise<
        Record<string, unknown>
      >;
    },
    async patchVersion(appId: string, version: string, payload: Record<string, unknown>) {
      await request(baseUrl, getToken(), 'PATCH', `/v1/app-configurations/${appId}/versions/${version}`, payload);
    },
    /**
     * Upsert the app's role in the developer's own organization with the
     * manifest grants. The role id is attached to the app version via
     * `role_id`; on installation the App API creates a copy of it (from the
     * version's grants) in the installer's organization.
     */
    async upsertAppRole(params: {
      orgId: string;
      appId: string;
      appName: string;
      grants: { action: string; resource?: string }[];
    }): Promise<string> {
      const permissionsBaseUrl = derivePermissionsBaseUrl(baseUrl);
      if (!permissionsBaseUrl) {
        throw new Error(`Cannot derive permissions API URL from ${baseUrl}`);
      }
      const roleId = `${params.orgId}:${params.appId}`;
      await request(permissionsBaseUrl, getToken(), 'PUT', `/v1/permissions/roles/${roleId}`, {
        id: roleId,
        organization_id: params.orgId,
        type: 'user_role',
        slug: params.appId,
        name: `Automatically created by App ${params.appName}`,
        grants: params.grants,
      });
      return roleId;
    },
    async cloneVersion(appId: string, sourceVersion: string, targetVersion?: string) {
      const target = targetVersion ?? bumpPatchVersion(sourceVersion);
      await request(
        baseUrl,
        getToken(),
        'POST',
        `/v1/app-configurations/${appId}/versions/${sourceVersion}/clone-to/${target}`,
      );
      return { version: target };
    },
    /** Returns the app's installation in the caller's org, or null if not installed. */
    async getInstallation(appId: string) {
      try {
        return (await request(baseUrl, getToken(), 'GET', `/v1/app/${appId}`)) as Record<string, unknown>;
      } catch (err) {
        if ((err as Error).message.includes('(404)')) return null;
        throw err;
      }
    },
    async patchInstallation(appId: string, payload: Record<string, unknown>) {
      return request(baseUrl, getToken(), 'PATCH', `/v1/app/${appId}`, payload);
    },
    async upsertComponent(appId: string, version: string, component: Record<string, unknown>) {
      const componentId = component.id as string | undefined;
      if (componentId) {
        try {
          // Try update first
          await request(
            baseUrl,
            getToken(),
            'PATCH',
            `/v1/app-configurations/${appId}/versions/${version}/components/${componentId}`,
            component,
          );
        } catch (err) {
          // If 404, component doesn't exist yet — create it
          if (err instanceof Error && err.message.includes('404')) {
            await request(
              baseUrl,
              getToken(),
              'POST',
              `/v1/app-configurations/${appId}/versions/${version}/components`,
              component,
            );
          } else {
            throw err;
          }
        }
      } else {
        await request(
          baseUrl,
          getToken(),
          'POST',
          `/v1/app-configurations/${appId}/versions/${version}/components`,
          component,
        );
      }
    },
    async deleteComponent(appId: string, version: string, componentId: string) {
      await request(
        baseUrl,
        getToken(),
        'DELETE',
        `/v1/app-configurations/${appId}/versions/${version}/components/${componentId}`,
      );
    },
    async createLogoUploadUrl(appId: string, filename: string, mimeType: string) {
      return request(baseUrl, getToken(), 'POST', `/v1/app-configurations/${appId}/logo`, {
        filename,
        mime_type: mimeType,
      }) as Promise<{ upload_url: string; s3_key: string }>;
    },
    async createBundleUploadUrl(appId: string, version: string, componentId: string) {
      return request(baseUrl, getToken(), 'POST', `/v1/app-configurations/${appId}/bundle`, {
        version,
        component_id: componentId,
      }) as Promise<{ upload_url: string; component_url: string }>;
    },
    async createZipUploadUrl(appId: string, version: string, componentId: string) {
      return request(baseUrl, getToken(), 'POST', `/v1/app-configurations/${appId}/zip`, {
        version,
        component_id: componentId,
      }) as Promise<{ upload_url: string; artifact_url: string }>;
    },
    async createReview(
      appId: string,
      version: string,
      payload: { technical_contact: string; marketing_contact: string; demo_url?: string },
    ) {
      return request(
        baseUrl,
        getToken(),
        'POST',
        `/v1/app-configurations/${appId}/versions/${version}/review`,
        payload,
      ) as Promise<{ review?: Record<string, unknown> }>;
    },
  };
}

export async function uploadFileToPresignedUrl(uploadUrl: string, filePath: string): Promise<void> {
  const absolutePath = resolve(filePath);
  const fileBuffer = readFileSync(absolutePath);
  const ext = extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.json': 'application/json',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.zip': 'application/zip',
  };
  const mimeType = mimeTypes[ext] ?? 'application/octet-stream';

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: fileBuffer,
    headers: { 'Content-Type': mimeType },
  });

  if (!response.ok) {
    throw new Error(`Upload failed (${response.status}): ${response.statusText}`);
  }
}

/**
 * Zip a directory and upload the zip to a presigned URL.
 * Uses the system `zip` command to create the archive.
 */
export async function uploadDirectoryAsZip(uploadUrl: string, dirPath: string): Promise<number> {
  const absoluteDir = resolve(dirPath);
  if (!existsSync(absoluteDir) || !statSync(absoluteDir).isDirectory()) {
    throw new Error(`Not a directory: ${absoluteDir}`);
  }

  const tmpZip = resolve(absoluteDir, '..', `.${Date.now()}-archive.zip`);

  try {
    // Create zip from directory contents (not the directory itself)
    execSync(`cd ${JSON.stringify(absoluteDir)} && zip -r ${JSON.stringify(tmpZip)} .`, { stdio: 'pipe' });

    const zipBuffer = readFileSync(tmpZip);
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: zipBuffer,
      headers: { 'Content-Type': 'application/zip' },
    });

    if (!response.ok) {
      throw new Error(`Upload failed (${response.status}): ${response.statusText}`);
    }

    return zipBuffer.length;
  } finally {
    // Clean up temp zip
    try {
      execSync(`rm -f ${JSON.stringify(tmpZip)}`, { stdio: 'pipe' });
    } catch {
      /* ignore */
    }
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function toManifest(config: Record<string, unknown>, version: Record<string, unknown>): AppManifest {
  const manifest: AppManifest = {
    $schema: 'https://cdn.app.sls.epilot.io/v1/schema.json',
    manifest_version: 1,
    app_id: config.app_id as string,
    name: config.name as string,
    description: config.description as AppManifest['description'],
    components: [],
  };

  if (config.category) manifest.category = config.category as string;
  if (config.author) manifest.author = config.author as AppManifest['author'];
  if (config.documentation_url) manifest.documentation_url = config.documentation_url as string;
  if (config.support_email) manifest.support_email = config.support_email as string;
  if (config.pricing) manifest.pricing = config.pricing as AppManifest['pricing'];
  if (config.notifications) manifest.notifications = config.notifications as AppManifest['notifications'];

  const role = version.role as { grants?: { action: string; resource?: string }[] } | undefined;
  if (role?.grants?.length) {
    manifest.permissions = role.grants.map((g) => ({
      action: g.action,
      ...(g.resource ? { resource: g.resource } : {}),
    }));
  }

  const blueprintRef = version.blueprint_ref as { manifest_id?: string } | undefined;
  if (blueprintRef?.manifest_id) {
    manifest.blueprint = { manifest_id: blueprintRef.manifest_id };
  }

  if (config.icon_url) {
    manifest.assets = { logo: './assets/logo.png' };
  }

  const components = (version.components ?? []) as Record<string, unknown>[];
  manifest.components = components.map((comp): ManifestComponent => {
    const component: ManifestComponent = {
      id: comp.id as string,
      component_type: comp.component_type as string,
      configuration: (comp.configuration ?? {}) as Record<string, unknown>,
    };

    if (comp.name) component.name = comp.name as ManifestComponent['name'];
    if (comp.description) component.description = comp.description as ManifestComponent['description'];

    if (Array.isArray(comp.options) && comp.options.length > 0) {
      component.options = comp.options.map((opt: Record<string, unknown>) => {
        const option: Record<string, unknown> = { key: opt.key, type: opt.type };
        if (opt.label) option.label = opt.label;
        if (opt.required) option.required = opt.required;
        if (opt.description) option.description = opt.description;
        return option as ManifestComponent['options'] extends (infer T)[] | undefined ? T : never;
      });
    }

    if (comp.surfaces && typeof comp.surfaces === 'object' && Object.keys(comp.surfaces as object).length > 0) {
      component.surfaces = comp.surfaces as Record<string, unknown>;
    }

    const assets: { bundle?: string; zip?: string } = {};
    if (comp.component_type === 'CUSTOM_JOURNEY_BLOCK') {
      const cfg = comp.configuration as Record<string, unknown> | undefined;
      if (cfg?.component_url) assets.bundle = `./dist/${comp.id}/bundle.js`;
    }
    if (comp.surfaces && typeof comp.surfaces === 'object') {
      for (const surface of Object.values(comp.surfaces as Record<string, unknown>)) {
        if (
          surface &&
          typeof surface === 'object' &&
          'zip_url' in surface &&
          (surface as Record<string, unknown>).zip_url
        ) {
          assets.zip = `./dist/${comp.id}/`;
        }
      }
    }
    if (Object.keys(assets).length > 0) component.assets = assets;

    return component;
  });

  return manifest;
}
