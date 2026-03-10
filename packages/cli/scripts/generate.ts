#!/usr/bin/env tsx

/**
 * Generates CLI files from existing API clients:
 * - Copies full openapi.json specs to definitions/
 * - Generates src/generated/api-list.ts
 * - Generates src/commands/apis/*.ts (one per API)
 * - Updates src/index.ts with subCommands map
 * - Generates docs/*.md with copy-pasteable sample calls + responses
 */

import { readdirSync, existsSync, copyFileSync, writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dereferenceJsonSchema from 'dereference-json-schema';
import mockJsonSchema from 'mock-json-schema';
const { dereferenceSync } = dereferenceJsonSchema as unknown as { dereferenceSync: (schema: unknown) => unknown };
const { mock } = mockJsonSchema as unknown as { mock: (schema: unknown) => unknown };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_PKG = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8'));
const CLI_VERSION: string = CLI_PKG.version;

const ROOT = resolve(__dirname, '..', '..', '..');
const CLIENTS_DIR = resolve(ROOT, 'clients');
const CLI_DIR = resolve(ROOT, 'packages', 'cli');
const DEFS_DIR = resolve(CLI_DIR, 'definitions');
const APIS_CMD_DIR = resolve(CLI_DIR, 'src', 'commands', 'apis');
const GENERATED_DIR = resolve(CLI_DIR, 'src', 'generated');

const MAX_EXAMPLE_LINES = 80;
const TRUNCATED_DEPTH = 3;
const MAX_ARRAY_ITEMS = 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toCamelCase = (name: string): string => {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
};

type Schema = Record<string, unknown>;

type ParamInfo = {
  name: string;
  in: string;
  required: boolean;
  type: string;
  description: string;
  example: unknown;
};

type OperationInfo = {
  operationId: string;
  method: string;
  path: string;
  summary: string;
  description: string;
  deprecated: boolean;
  tags: string[];
  params: ParamInfo[];
  requestBodySchema: Schema | null;
  requestBodyRequired: boolean;
  responseSchema: Schema | null;
};

type ClientInfo = {
  dirName: string;
  apiName: string;
  kebabName: string;
  hasDefinition: boolean;
  title: string;
  description: string;
  serverUrl: string;
  operations: OperationInfo[];
};

const sanitizeDescription = (desc: string): string => {
  const firstParagraph = desc.split(/\n\s*\n/)[0] || '';
  return firstParagraph
    .replace(/^#{1,6}\s+/gm, '')
    .trim()
    .substring(0, 300);
};

/**
 * Extract the first sentence/line of a description for use as a short summary.
 * Prefers description over summary because epilot specs duplicate operationId in summary.
 */
const firstLine = (desc: string): string => {
  if (!desc) return '';
  const line = desc.split(/\n/)[0].trim();
  return line.substring(0, 120);
};

const formatSchemaType = (schema: Schema | undefined, depth = 0): string => {
  if (!schema) return 'unknown';
  if (depth > 2) return '...';
  if (schema.enum) return (schema.enum as unknown[]).map((v) => JSON.stringify(v)).join(' \\| ');
  if (schema.type === 'string') return schema.format ? `string (${schema.format})` : 'string';
  if (schema.type === 'integer' || schema.type === 'number') return 'number';
  if (schema.type === 'boolean') return 'boolean';
  if (schema.type === 'array') {
    const items = schema.items as Schema | undefined;
    return `${formatSchemaType(items, depth + 1)}[]`;
  }
  if (schema.type === 'object') return 'object';
  if (schema.oneOf || schema.anyOf) {
    const variants = (schema.oneOf || schema.anyOf) as Schema[];
    return variants.map((v) => formatSchemaType(v, depth + 1)).join(' \\| ');
  }
  return 'unknown';
};

/**
 * JSON serializer with depth/array truncation (matches SDK docs rules).
 */
const toJsonObject = (value: unknown, indent = 0, depth = 0, maxDepth = Infinity): string => {
  const pad = '  '.repeat(indent);
  const inner = '  '.repeat(indent + 1);

  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const hasComplexItems = value.some((v) => typeof v === 'object' && v !== null);
    if (!hasComplexItems) {
      const inline = value.map((v) => toJsonObject(v, 0, depth + 1, maxDepth)).join(', ');
      return `[${inline}]`;
    }
    if (depth >= maxDepth) return '[]';
    const shown = value.slice(0, MAX_ARRAY_ITEMS);
    const items = shown.map((v) => `${inner}${toJsonObject(v, indent + 1, depth + 1, maxDepth)}`);
    return `[\n${items.join(',\n')}\n${pad}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';
    if (depth >= maxDepth) return '{}';
    const props = entries.map(([k, v]) => {
      return `${inner}${JSON.stringify(k)}: ${toJsonObject(v, indent + 1, depth + 1, maxDepth)}`;
    });
    return `{\n${props.join(',\n')}\n${pad}}`;
  }

  return String(value);
};

/**
 * Build a mock JSON string from a schema, with depth/array truncation matching SDK docs.
 */
const mockJsonExample = (schema: Schema): string | null => {
  try {
    const example = mock(schema as any);
    const full = toJsonObject(example);
    if (full.split('\n').length > MAX_EXAMPLE_LINES) {
      return toJsonObject(example, 0, 0, TRUNCATED_DEPTH);
    }
    return full;
  } catch {
    return null;
  }
};

/**
 * Build a mock CLI `-d` body from a schema — compact single-line JSON for short
 * bodies, or truncated multi-line for long ones.
 */
const mockCliBody = (schema: Schema): string | null => {
  try {
    const example = mock(schema as any);
    const compact = JSON.stringify(example);
    if (compact.length <= 120) return compact;
    const full = toJsonObject(example);
    if (full.split('\n').length > MAX_EXAMPLE_LINES) {
      return toJsonObject(example, 0, 0, TRUNCATED_DEPTH);
    }
    return full;
  } catch {
    return null;
  }
};

/**
 * Produce a sample value for a single parameter (for -p flags).
 */
const sampleParamValue = (param: ParamInfo): string => {
  if (param.example !== undefined && param.example !== null) return String(param.example);
  if (param.type.includes('boolean')) return 'true';
  if (param.type.includes('number')) return '1';
  if (param.name === 'id' || param.name.endsWith('_id') || param.name.endsWith('Id'))
    return '123e4567-e89b-12d3-a456-426614174000';
  if (param.name === 'slug') return 'contact';
  if (param.name === 'email') return 'user@example.com';
  return 'example';
};

// ─── Client Discovery ─────────────────────────────────────────────────────────

const discoverClients = (): ClientInfo[] => {
  const dirs = readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.endsWith('-client'))
    .map((d) => d.name);

  return dirs.map((dirName) => {
    const baseName = dirName.replace(/-client$/, '');
    const apiName = toCamelCase(baseName);
    const clientDir = resolve(CLIENTS_DIR, dirName, 'src');
    const fullSpecPath = resolve(clientDir, 'openapi.json');
    const runtimeSpecPath = resolve(clientDir, 'openapi-runtime.json');
    const hasDefinition = existsSync(fullSpecPath) || existsSync(runtimeSpecPath);

    let title = apiName;
    let description = '';
    let serverUrl = '';
    let operations: OperationInfo[] = [];

    if (hasDefinition) {
      const result = extractOperations(dirName, baseName, apiName);
      title = result.title;
      description = result.description;
      serverUrl = result.serverUrl;
      operations = result.operations;
    }

    return { dirName, apiName, kebabName: baseName, hasDefinition, title, description, serverUrl, operations };
  });
};

const extractOperations = (
  dirName: string,
  _baseName: string,
  apiName: string,
): { title: string; description: string; serverUrl: string; operations: OperationInfo[] } => {
  const fullSpecPath = resolve(CLIENTS_DIR, dirName, 'src/openapi.json');
  const runtimeSpecPath = resolve(CLIENTS_DIR, dirName, 'src/openapi-runtime.json');
  const specPath = existsSync(fullSpecPath) ? fullSpecPath : runtimeSpecPath;
  if (!existsSync(specPath)) return { title: apiName, description: '', serverUrl: '', operations: [] };

  const rawSpec = JSON.parse(readFileSync(specPath, 'utf-8'));
  const title = rawSpec.info?.title || apiName;
  const description = sanitizeDescription(rawSpec.info?.description || '');
  const serverUrl = rawSpec.servers?.[0]?.url || '';

  let spec: Record<string, unknown>;
  try {
    spec = dereferenceSync(rawSpec) as Record<string, unknown>;
  } catch {
    spec = rawSpec;
  }

  const operations: OperationInfo[] = [];
  for (const [path, methods] of Object.entries((spec.paths || {}) as Record<string, Record<string, unknown>>)) {
    const pathParams = (methods.parameters || []) as Record<string, unknown>[];

    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']) {
      const op = methods[method] as Record<string, unknown> | undefined;
      if (!op?.operationId) continue;

      const opParams = (op.parameters || []) as Record<string, unknown>[];
      const mergedParams = [...pathParams];
      for (const p of opParams) {
        const idx = mergedParams.findIndex((pp) => pp.name === p.name && pp.in === p.in);
        if (idx >= 0) mergedParams[idx] = p;
        else mergedParams.push(p);
      }

      const params: ParamInfo[] = mergedParams.map((p) => ({
        name: (p.name as string) || '',
        in: (p.in as string) || '',
        required: !!p.required,
        type: formatSchemaType(p.schema as Schema | undefined),
        description: ((p.description as string) || '').substring(0, 200),
        example: (p.example as unknown) ?? (p.schema as Schema | undefined)?.example ?? undefined,
      }));

      const reqBodyObj = op.requestBody as Record<string, unknown> | undefined;
      const reqBodyContent = reqBodyObj?.content as Record<string, unknown> | undefined;
      const reqBodySchema = (reqBodyContent?.['application/json'] as Record<string, unknown>)?.schema as
        | Schema
        | undefined;

      const successResponse = ((op.responses as Record<string, unknown>)?.['200'] ||
        (op.responses as Record<string, unknown>)?.['201']) as Record<string, unknown> | undefined;
      const respContent = successResponse?.content as Record<string, unknown> | undefined;
      const respSchema = (respContent?.['application/json'] as Record<string, unknown>)?.schema as Schema | undefined;

      operations.push({
        operationId: op.operationId as string,
        method: method.toUpperCase(),
        path,
        summary: firstLine((op.description as string) || ''),
        description: sanitizeDescription((op.description as string) || ''),
        deprecated: !!op.deprecated,
        tags: (op.tags as string[]) || [],
        params,
        requestBodySchema: reqBodySchema || null,
        requestBodyRequired: !!reqBodyObj?.required,
        responseSchema: respSchema || null,
      });
    }
  }

  return { title, description, serverUrl, operations };
};

// ─── Code Generation (definitions, api-list, commands, index) ─────────────────

const copyDefinitions = (clients: ClientInfo[]) => {
  mkdirSync(DEFS_DIR, { recursive: true });
  for (const client of clients) {
    if (!client.hasDefinition) continue;
    const fullSrc = resolve(CLIENTS_DIR, client.dirName, 'src/openapi.json');
    const runtimeSrc = resolve(CLIENTS_DIR, client.dirName, 'src/openapi-runtime.json');
    const src = existsSync(fullSrc) ? fullSrc : runtimeSrc;
    const dest = resolve(DEFS_DIR, `${client.kebabName}.json`);
    copyFileSync(src, dest);
  }
};

const generateApiList = (clients: ClientInfo[]): string => {
  const entries = clients
    .filter((c) => c.hasDefinition)
    .map((c) => {
      const opIds = c.operations.map((op) => `'${op.operationId}'`).join(', ');
      const title = c.title.replace(/'/g, "\\'");
      return `  { apiName: '${c.apiName}', kebabName: '${c.kebabName}', title: '${title}', serverUrl: '${c.serverUrl}', operationCount: ${c.operations.length}, operationIds: [${opIds}] }`;
    });

  return `// Auto-generated by scripts/generate.ts — do not edit
export type ApiInfo = {
  apiName: string;
  kebabName: string;
  title: string;
  serverUrl: string;
  operationCount: number;
  operationIds: string[];
};

export const API_LIST: ApiInfo[] = [
${entries.join(',\n')},
];

export const API_NAMES = API_LIST.map((a) => a.apiName);
`;
};

const generateApiCommand = (client: ClientInfo): string => {
  return `// Auto-generated by scripts/generate.ts — do not edit
import { defineCommand } from 'citty';
import { callApi } from '../../lib/call.js';

export default defineCommand({
  meta: { name: '${client.kebabName}', description: '${client.title.replace(/'/g, "\\'")}' },
  args: {
    operation: { type: 'positional', description: 'operationId to call', required: false },
    param: { type: 'string', alias: 'p', description: 'Parameter key=value' },
    data: { type: 'string', alias: 'd', description: 'Request body JSON' },
    header: { type: 'string', alias: 'H', description: 'Custom header' },
    include: { type: 'boolean', alias: 'i', description: 'Include response headers' },
    definition: { type: 'string', description: 'Override OpenAPI spec file/URL' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    profile: { type: 'string', description: 'Use a named profile' },
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    json: { type: 'boolean', description: 'Output raw JSON' },
    verbose: { type: 'boolean', alias: 'v', description: 'Verbose output' },
    interactive: { type: 'boolean', description: 'Interactive mode' },
    jsonata: { type: 'string', description: 'JSONata expression to transform response' },
    _ophelp: { type: 'boolean', description: 'Show operation help', required: false },
    _apihelp: { type: 'boolean', description: 'Show API help', required: false },
  },
  run: ({ args, rawArgs }) => {
    // Extract additional positional args (after operationId)
    const positionalArgs: string[] = [];
    if (args.operation && rawArgs) {
      const opIdx = rawArgs.indexOf(args.operation);
      if (opIdx >= 0) {
        for (let i = opIdx + 1; i < rawArgs.length; i++) {
          const arg = rawArgs[i];
          if (arg.startsWith('-')) break;
          positionalArgs.push(arg);
        }
      }
    }

    return callApi('${client.kebabName}', {
      ...args,
      help: !!(args as Record<string, unknown>)._ophelp,
      _apihelp: !!(args as Record<string, unknown>)._apihelp,
      _args: positionalArgs,
    });
  },
});
`;
};

const generateIndexFile = (clients: ClientInfo[]): string => {
  const validClients = clients.filter((c) => c.hasDefinition);

  const subCommandEntries = validClients.map((c) => {
    const key = c.kebabName.includes('-') ? `'${c.kebabName}'` : c.kebabName;
    return `    ${key}: () => import('./commands/apis/${c.kebabName}.js').then((m) => m.default),`;
  });

  return `import { defineCommand } from 'citty';

export const main = defineCommand({
  meta: {
    name: 'epilot',
    version: '${CLI_VERSION}',
    description: 'CLI for epilot APIs',
  },
  args: {
    token: { type: 'string', alias: 't', description: 'Bearer token' },
    profile: { type: 'string', description: 'Use a named profile (or EPILOT_PROFILE env)' },
    server: { type: 'string', alias: 's', description: 'Override server base URL' },
    json: { type: 'boolean', description: 'Output raw JSON' },
    verbose: { type: 'boolean', alias: 'v', description: 'Verbose output' },
    interactive: { type: 'boolean', default: true, description: 'Interactive mode' },
    jsonata: { type: 'string', description: 'JSONata expression' },
  },
  subCommands: {
    auth: () => import('./commands/auth.js').then((m) => m.default),
    profile: () => import('./commands/profile.js').then((m) => m.default),
    completion: () => import('./commands/completion.js').then((m) => m.default),
    upgrade: () => import('./commands/upgrade.js').then((m) => m.default),
${subCommandEntries.join('\n')}
  },
});
`;
};

// ─── Doc Generation ───────────────────────────────────────────────────────────

const generateClientDoc = (client: ClientInfo): string => {
  const lines: string[] = [];
  const { title, serverUrl, description, kebabName, operations } = client;

  // ── Header ──
  lines.push(`# ${title}`);
  lines.push(``);
  if (serverUrl) lines.push(`- **Base URL:** \`${serverUrl}\``);
  lines.push(`- **API Docs:** [https://docs.epilot.io/api/${kebabName}](https://docs.epilot.io/api/${kebabName})`);
  lines.push(``);
  if (description) {
    lines.push(description, ``);
  }

  // ── Quick-start ──
  lines.push(`## Quick Start`, ``);
  lines.push('```bash');
  lines.push(`# List available operations`);
  lines.push(`epilot ${kebabName}`);
  if (operations.length > 0) {
    lines.push(``);
    lines.push(`# Call an operation`);
    const first = operations[0];
    const firstParams = first.params.filter((p) => p.required);
    const paramStr = firstParams.map((p) => `-p ${p.name}=${sampleParamValue(p)}`).join(' ');
    lines.push(`epilot ${kebabName} ${first.operationId}${paramStr ? ` ${paramStr}` : ''}`);
  }
  lines.push('```');
  lines.push(``);

  const activeOps = operations.filter((op) => !op.deprecated);

  // ── Table of contents ──
  if (activeOps.length > 0) {
    lines.push(`## Operations`, ``);

    const hasTags = activeOps.some((op) => op.tags.length > 0);
    if (hasTags) {
      const tagOrder: string[] = [];
      const tagOps = new Map<string, OperationInfo[]>();
      for (const op of activeOps) {
        const tag = op.tags[0] || 'Other';
        if (!tagOps.has(tag)) {
          tagOrder.push(tag);
          tagOps.set(tag, []);
        }
        tagOps.get(tag)!.push(op);
      }
      for (const tag of tagOrder) {
        lines.push(`**${tag}**`);
        for (const op of tagOps.get(tag)!) {
          const anchor = op.operationId.toLowerCase();
          lines.push(`- [\`${op.operationId}\`](#${anchor}) — ${op.summary || `${op.method} ${op.path}`}`);
        }
        lines.push(``);
      }
    } else {
      for (const op of activeOps) {
        const anchor = op.operationId.toLowerCase();
        lines.push(`- [\`${op.operationId}\`](#${anchor}) — ${op.summary || `${op.method} ${op.path}`}`);
      }
      lines.push(``);
    }

    // ── Per-operation sections ──
    for (const op of activeOps) {
      lines.push(...generateOperationDoc(kebabName, op));
    }
  }

  // ── Deprecated ──
  const deprecatedOps = operations.filter((op) => op.deprecated);
  if (deprecatedOps.length > 0) {
    lines.push(`## Deprecated Operations`, ``);
    for (const op of deprecatedOps) {
      lines.push(`- ~~\`${op.operationId}\`~~ ${op.method} \`${op.path}\``);
    }
    lines.push(``);
  }

  return lines.join('\n');
};

const generateOperationDoc = (kebabName: string, op: OperationInfo): string[] => {
  const lines: string[] = [];

  // ── Heading & description ──
  lines.push(`### \`${op.operationId}\``);
  lines.push(``);
  if (op.summary) lines.push(op.summary, ``);
  lines.push(`\`${op.method} ${op.path}\``);
  lines.push(``);

  // ── Parameters table ──
  if (op.params.length > 0) {
    lines.push(`**Parameters**`);
    lines.push(``);
    lines.push(`| Name | In | Type | Required | Description |`);
    lines.push(`| ---- | -- | ---- | -------- | ----------- |`);
    for (const p of op.params) {
      lines.push(`| \`${p.name}\` | ${p.in} | ${p.type} | ${p.required ? 'Yes' : 'No'} | ${p.description} |`);
    }
    lines.push(``);
  }

  if (op.requestBodySchema) {
    lines.push(`**Request Body**${op.requestBodyRequired ? ' (required)' : ''}`, ``);
  }

  // ── Flags ──
  lines.push(`**Flags**`);
  lines.push(``);
  lines.push(`| Flag | Description |`);
  lines.push(`| ---- | ----------- |`);
  lines.push(`| \`-p key=value\` | Set a named parameter |`);
  lines.push(`| \`-d '{...}'\` | Request body JSON |`);
  lines.push(`| \`-H 'Key: Value'\` | Custom header |`);
  lines.push(`| \`-t, --token <token>\` | Bearer token for authentication |`);
  lines.push(`| \`--profile <name>\` | Use a named profile |`);
  lines.push(`| \`-s, --server <url>\` | Override server base URL |`);
  lines.push(`| \`-i, --include\` | Include response headers in output |`);
  lines.push(`| \`--json\` | Output raw JSON (no formatting) |`);
  lines.push(`| \`-v, --verbose\` | Verbose output (show request details) |`);
  lines.push(`| \`--jsonata <expr>\` | JSONata expression to transform response |`);
  lines.push(`| \`--definition <file>\` | Override OpenAPI spec file/URL |`);
  lines.push(`| \`--no-interactive\` | Disable interactive prompts |`);
  lines.push(``);

  // ── Sample call ──
  lines.push(`**Sample Call**`);
  lines.push(``);

  const paramFlags = op.params
    .filter((p) => p.required || p.in === 'path')
    .map((p) => `-p ${p.name}=${sampleParamValue(p)}`);

  const bodyJson = op.requestBodySchema ? mockCliBody(op.requestBodySchema) : null;
  const isCompactBody = bodyJson && !bodyJson.includes('\n');

  // ─ Primary form: all flags on one line
  lines.push('```bash');
  {
    const parts = [`epilot ${kebabName} ${op.operationId}`];
    for (const pf of paramFlags) parts.push(pf);
    if (bodyJson && isCompactBody) {
      parts.push(`-d '${bodyJson}'`);
    }
    lines.push(parts.join(' \\\n  '));
  }
  lines.push('```');
  lines.push(``);

  // ─ If body is multi-line, show it separately with heredoc style
  if (bodyJson && !isCompactBody) {
    lines.push(`With request body:`);
    lines.push(``);
    lines.push('```bash');
    {
      const parts = [`epilot ${kebabName} ${op.operationId}`];
      for (const pf of paramFlags) parts.push(pf);
      parts.push(`-d '${bodyJson}'`);
      lines.push(parts.join(' \\\n  '));
    }
    lines.push('```');
    lines.push(``);
  }

  // ─ Positional params shorthand (only when path params)
  const pathParams = op.params.filter((p) => p.in === 'path');
  if (pathParams.length > 0) {
    const positionalVals = pathParams.map((p) => sampleParamValue(p));
    const positionalStr = positionalVals.join(' ');
    lines.push(`Using positional args for path parameters:`);
    lines.push(``);
    lines.push('```bash');
    lines.push(`epilot ${kebabName} ${op.operationId} ${positionalStr}`);
    lines.push('```');
    lines.push(``);
  }

  // ─ Piping example for body operations
  if (op.requestBodySchema) {
    lines.push(`Using stdin pipe:`);
    lines.push(``);
    lines.push('```bash');
    const pFlags = paramFlags.length > 0 ? ` ${paramFlags.join(' ')}` : '';
    lines.push(`cat body.json | epilot ${kebabName} ${op.operationId}${pFlags}`);
    lines.push('```');
    lines.push(``);
  }

  // ─ JSONata example
  lines.push(`With JSONata filter:`);
  lines.push(``);
  lines.push('```bash');
  {
    const pFlags = paramFlags.length > 0 ? ` ${paramFlags.join(' ')}` : '';
    const jsonataExpr = guessJsonataExpr(op);
    lines.push(`epilot ${kebabName} ${op.operationId}${pFlags} --jsonata '${jsonataExpr}'`);
  }
  lines.push('```');
  lines.push(``);

  // ── Sample response ──
  if (op.responseSchema) {
    const responseJson = mockJsonExample(op.responseSchema);
    if (responseJson) {
      lines.push(`<details>`);
      lines.push(`<summary>Sample Response</summary>`);
      lines.push(``);
      lines.push('```json');
      lines.push(responseJson);
      lines.push('```');
      lines.push(``);
      lines.push(`</details>`);
      lines.push(``);
    }
  }

  lines.push(`---`);
  lines.push(``);

  return lines;
};

/**
 * Guess a useful JSONata expression for an operation.
 */
const guessJsonataExpr = (op: OperationInfo): string => {
  if (!op.responseSchema) return '$';

  const props = op.responseSchema.properties as Record<string, Schema> | undefined;
  if (!props) return '$';

  // Common patterns
  if (props.results) return 'results[0]';
  if (props.data) return 'data';
  if (props.items) return 'items[0]';
  if (props.hits) return 'hits[0]';
  if (props.entity) return 'entity._title';
  if (props.id) return 'id';
  if (props.email) return 'email';

  // First key
  const keys = Object.keys(props);
  if (keys.length > 0) return keys[0];

  return '$';
};

// ─── Docs entry point ──────────────────────────────────────────────────────────

const generateDocs = (clients: ClientInfo[]) => {
  const docsDir = resolve(CLI_DIR, 'docs');
  mkdirSync(docsDir, { recursive: true });

  const validClients = clients.filter((c) => c.hasDefinition);

  // ── Per-API doc ──
  for (const client of validClients) {
    const content = generateClientDoc(client);
    writeFileSync(resolve(docsDir, `${client.kebabName}.md`), content);
  }

  // ── Index doc ──
  const indexLines = [
    `# epilot CLI — API Reference`,
    ``,
    `All ${validClients.length} epilot APIs available via the CLI.`,
    ``,
    `## Setup`,
    ``,
    '```bash',
    `npx epilot auth login`,
    '```',
    ``,
    `## APIs`,
    ``,
    `| API | Command | Operations | Docs |`,
    `| --- | ------- | ---------- | ---- |`,
  ];
  for (const c of validClients) {
    indexLines.push(
      `| ${c.title} | \`epilot ${c.kebabName}\` | ${c.operations.length} | [${c.kebabName}.md](./${c.kebabName}.md) |`,
    );
  }
  indexLines.push(``);
  indexLines.push(`## Global Flags`);
  indexLines.push(``);
  indexLines.push(`| Flag | Alias | Description |`);
  indexLines.push(`| ---- | ----- | ----------- |`);
  indexLines.push(`| \`--token <token>\` | \`-t\` | Bearer token |`);
  indexLines.push(`| \`--profile <name>\` | | Use a named profile (or \`EPILOT_PROFILE\` env) |`);
  indexLines.push(`| \`--server <url>\` | \`-s\` | Override server base URL |`);
  indexLines.push(`| \`--json\` | | Output raw JSON (no colors) |`);
  indexLines.push(`| \`--verbose\` | \`-v\` | Show full request details |`);
  indexLines.push(`| \`--include\` | \`-i\` | Include response headers |`);
  indexLines.push(`| \`--jsonata <expr>\` | | Transform response with JSONata |`);
  indexLines.push(`| \`--no-interactive\` | | Disable interactive prompts |`);
  indexLines.push(`| \`--definition <file\\|url>\` | | Override OpenAPI spec |`);
  indexLines.push(``);
  indexLines.push(`## Per-Operation Flags`);
  indexLines.push(``);
  indexLines.push(`| Flag | Alias | Description |`);
  indexLines.push(`| ---- | ----- | ----------- |`);
  indexLines.push(`| \`-p key=value\` | \`--param\` | Set a parameter (repeatable) |`);
  indexLines.push(`| \`-d '<json>'\` | \`--data\` | Request body JSON |`);
  indexLines.push(`| \`-H 'Key: Value'\` | \`--header\` | Custom header (repeatable) |`);
  indexLines.push(``);
  indexLines.push(`## Profiles`);
  indexLines.push(``);
  indexLines.push('```bash');
  indexLines.push(`# Create profiles for different environments`);
  indexLines.push(`epilot profile create dev --server https://entity.dev.sls.epilot.io --token <dev-token>`);
  indexLines.push(
    `epilot profile create staging --server https://entity.staging.sls.epilot.io --token <staging-token>`,
  );
  indexLines.push(``);
  indexLines.push(`# Switch between profiles`);
  indexLines.push(`epilot profile use dev`);
  indexLines.push(``);
  indexLines.push(`# Or use per-command`);
  indexLines.push(`epilot entity listSchemas --profile staging`);
  indexLines.push(``);
  indexLines.push(`# Or via env var`);
  indexLines.push(`EPILOT_PROFILE=dev epilot entity listSchemas`);
  indexLines.push('```');
  indexLines.push(``);

  writeFileSync(resolve(docsDir, 'index.md'), indexLines.join('\n'));

  return validClients.length;
};

const updateReadme = (clients: ClientInfo[]): void => {
  const readmePath = resolve(CLI_DIR, 'README.md');
  if (!existsSync(readmePath)) return;

  let readme = readFileSync(readmePath, 'utf-8');
  const validClients = clients.filter((c) => c.hasDefinition);

  // Generate help output (matches custom help in bin/epilot.ts)
  const maxName = Math.max(...validClients.map((c) => c.kebabName.length));
  const apiLines = validClients.map((c) => `  ${c.kebabName.padEnd(maxName + 2)}${c.title}`);

  const helpBlock = [
    '<!-- usage-help -->',
    '```',
    `epilot v${CLI_VERSION} — CLI for epilot APIs`,
    '',
    'USAGE',
    '  epilot <api> <operationId> [params...] [flags]',
    '  epilot <api>                List operations for an API',
    '  epilot <api> <op> --help    Show operation details',
    '',
    'FLAGS',
    '  -t, --token <token>     Bearer token for authentication',
    '  --profile <name>        Use a named profile (or EPILOT_PROFILE)',
    '  -s, --server <url>      Override server base URL',
    '  --json                  Output raw JSON (no formatting)',
    '  -v, --verbose           Verbose output (show request details)',
    '  --jsonata <expr>        JSONata expression to transform response',
    '  --no-interactive        Disable interactive prompts',
    '',
    'PARAMETER FLAGS',
    '  -p key=value             Set a named parameter',
    "  -d '{...}'               Request body JSON",
    "  -H 'Key: Value'          Custom header",
    '  -i, --include            Include response headers in output',
    '',
    'COMMANDS',
    '  auth login              Authenticate with epilot (browser)',
    '  auth token              Store an API token directly',
    '  auth status             Show authentication status',
    '  auth logout             Remove stored credentials',
    '  profile                 Manage named profiles',
    '  completion              Generate shell completion scripts',
    '',
    'APIs',
    ...apiLines,
    '',
    'EXAMPLES',
    '  $ epilot auth login',
    '  $ epilot user getMeV2',
    '  $ epilot entity getEntity contact abc123',
    '  $ epilot entity searchEntities -d \'{"q":"*"}\'',
    "  $ epilot entity searchEntities --jsonata 'results[0]._title'",
    '  $ echo \'{"q":"*"}\' | epilot entity searchEntities',
    '',
    'Run epilot <api> to list available operations.',
    'Run epilot <api> <operationId> --help for operation details.',
    '```',
    '<!-- /usage-help -->',
  ].join('\n');

  readme = readme.replace(/<!-- usage-help -->[\s\S]*?<!-- \/usage-help -->/, helpBlock);

  // Generate API reference table
  const tableRows = validClients.map(
    (c) => `| ${c.title} | \`epilot ${c.kebabName}\` | [docs](./docs/${c.kebabName}.md) |`,
  );
  const apiTable = [
    '<!-- api-reference-table -->',
    '| API | Command | Docs |',
    '| --- | ------- | ---- |',
    ...tableRows,
    '<!-- /api-reference-table -->',
  ].join('\n');

  readme = readme.replace(/<!-- api-reference-table -->[\s\S]*?<!-- \/api-reference-table -->/, apiTable);

  writeFileSync(readmePath, readme);
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const main = () => {
  console.log('Discovering clients...');
  const clients = discoverClients();
  const validClients = clients.filter((c) => c.hasDefinition);
  console.log(`Found ${clients.length} clients, ${validClients.length} with definitions`);

  console.log('Copying OpenAPI definitions...');
  copyDefinitions(clients);

  console.log('Generating api-list.ts...');
  mkdirSync(GENERATED_DIR, { recursive: true });
  writeFileSync(resolve(GENERATED_DIR, 'api-list.ts'), generateApiList(clients));

  console.log('Generating per-API command files...');
  mkdirSync(APIS_CMD_DIR, { recursive: true });
  for (const client of validClients) {
    writeFileSync(resolve(APIS_CMD_DIR, `${client.kebabName}.ts`), generateApiCommand(client));
  }

  console.log('Generating index.ts...');
  writeFileSync(resolve(CLI_DIR, 'src', 'index.ts'), generateIndexFile(clients));

  console.log('Generating docs...');
  const docCount = generateDocs(clients);

  console.log('Updating README...');
  updateReadme(clients);

  console.log(`\nGenerated:`);
  console.log(`  - ${validClients.length} definition files`);
  console.log(`  - ${validClients.length} API command files`);
  console.log(`  - ${docCount} API doc files + index`);
  console.log(`  - 1 api-list.ts`);
  console.log(`  - 1 index.ts`);
  const totalOps = validClients.reduce((sum, c) => sum + c.operations.length, 0);
  console.log(`  - ${totalOps} total operations across all APIs`);
  console.log(`\nAPI names: ${validClients.map((c) => c.apiName).join(', ')}`);

  // Format generated files with biome
  try {
    execSync('npx biome check --write src/generated/ src/index.ts src/commands/apis/', { cwd: CLI_DIR, stdio: 'pipe' });
  } catch {
    // biome may exit non-zero for unfixable issues; that's ok
  }
};

main();
