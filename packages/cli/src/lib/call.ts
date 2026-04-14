import type { OpenAPIV3 } from 'openapi-client-axios';
import OpenAPIClientAxiosModule from 'openapi-client-axios';

// Handle CJS default export: the default import wraps the module
const OpenAPIClientAxios =
  (OpenAPIClientAxiosModule as unknown as { default: typeof OpenAPIClientAxiosModule }).default ??
  OpenAPIClientAxiosModule;

import { loadDefinition } from './definition-loader.js';
import { resolveToken } from './auth-store.js';
import { getResolvedProfile } from './profiles.js';
import { collectParams, getOperationParams, getMissingRequired } from './param-collector.js';
import { resolveBody, getRequestBodyInfo } from './body-handler.js';
import { formatResponse } from './response-formatter.js';
import { isInteractive, pickOperation, formatOperationsTable, promptParam } from './interactive.js';
import { BOLD, RESET, DIM, RED, YELLOW, GREEN, methodColor, pager, highlightJson } from './utils.js';
import type { OperationChoice } from './interactive.js';

export type CallArgs = {
  operation?: string;
  _args?: string[];
  param?: string | string[];
  data?: string;
  header?: string | string[];
  include?: boolean;
  definition?: string;
  server?: string;
  profile?: string;
  token?: string;
  json?: boolean;
  verbose?: boolean;
  interactive?: boolean;
  jsonata?: string;
  guided?: boolean;
  help?: boolean;
  _apihelp?: boolean;
};

/**
 * Extract all operations from an OpenAPI spec.
 */
const extractOperations = (spec: OpenAPIV3.Document): OperationChoice[] => {
  const operations: OperationChoice[] = [];

  for (const [path, methods] of Object.entries(spec.paths ?? {})) {
    if (!methods) continue;
    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const) {
      const op = (methods as Record<string, unknown>)[method] as OpenAPIV3.OperationObject | undefined;
      if (!op?.operationId) continue;
      operations.push({
        operationId: op.operationId,
        method: method.toUpperCase(),
        path,
        summary: (op.summary || '').substring(0, 120),
        description: (op.description || '').split('\n')[0].substring(0, 200),
      });
    }
  }

  return operations;
};

// ── Helpers for rich operation help ─────────────────────────────────────────

const sampleParamValue = (p: OpenAPIV3.ParameterObject): string => {
  const schema = p.schema as OpenAPIV3.SchemaObject | undefined;
  if (p.example !== undefined) return String(p.example);
  if (schema?.example !== undefined) return String(schema.example);
  if (schema?.type === 'boolean') return 'true';
  if (schema?.type === 'integer' || schema?.type === 'number') return '1';
  if (p.name === 'id' || p.name.endsWith('_id') || p.name.endsWith('Id')) return '123e4567-e89b-12d3-a456-426614174000';
  if (p.name === 'slug') return 'contact';
  if (p.name === 'email') return 'user@example.com';
  return 'example';
};

const MAX_BODY_LINES = 30;

const truncateJson = (obj: unknown, depth = 0, maxDepth = 3): unknown => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  if (depth >= maxDepth) return Array.isArray(obj) ? [] : {};
  if (Array.isArray(obj)) {
    return obj.slice(0, 2).map((item) => truncateJson(item, depth + 1, maxDepth));
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = truncateJson(value, depth + 1, maxDepth);
  }
  return result;
};

import { mock } from 'mock-json-schema';

const mockFromSchema = (schema: OpenAPIV3.SchemaObject): unknown => {
  return mock(schema);
};

// @ts-expect-error CJS default import
import dereferenceJsonSchema from 'dereference-json-schema';
const { dereferenceSync } = dereferenceJsonSchema as unknown as { dereferenceSync: (schema: unknown) => unknown };

/**
 * Extract the JSON body schema for an operation (if any).
 */
const getBodySchema = (spec: OpenAPIV3.Document, operationId: string): OpenAPIV3.SchemaObject | undefined => {
  const paths = spec.paths ?? {};
  for (const methods of Object.values(paths)) {
    if (!methods) continue;
    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const) {
      const op = (methods as Record<string, OpenAPIV3.OperationObject>)[method];
      if (!op || op.operationId !== operationId) continue;
      const reqBody = op.requestBody as OpenAPIV3.RequestBodyObject | undefined;
      if (!reqBody) return undefined;
      const content = reqBody.content?.['application/json'];
      return content?.schema as OpenAPIV3.SchemaObject | undefined;
    }
  }
  return undefined;
};

/**
 * Build rich operation help text — matching the generated docs quality.
 * Returns null if the operation is not found.
 */
const formatOperationHelp = (apiName: string, operationId: string, spec: OpenAPIV3.Document): string | null => {
  let out = '';
  const w = (text: string) => {
    out += text;
  };

  for (const [path, methods] of Object.entries(spec.paths ?? {})) {
    if (!methods) continue;
    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const) {
      const op = (methods as Record<string, unknown>)[method] as OpenAPIV3.OperationObject | undefined;
      if (!op || op.operationId !== operationId) continue;

      const color = methodColor(method);
      const descFirstLine = (op.description || '').split('\n')[0].trim();

      // ── Title ──
      w(`\n${BOLD}epilot ${apiName} ${operationId}${RESET}`);
      if (descFirstLine) w(` — ${descFirstLine}`);
      w(`\n\n`);
      w(`  ${color}${method.toUpperCase()}${RESET} ${path}\n`);
      w(`\n`);

      // ── Full description ──
      if (op.description) {
        const restOfDesc = op.description.split('\n').slice(1).join('\n').trim();
        if (restOfDesc) w(`  ${DIM}${restOfDesc}${RESET}\n\n`);
      }

      // ── Parameters ──
      const { params } = getOperationParams(spec, operationId);
      if (params.length > 0) {
        w(`${BOLD}PARAMETERS${RESET}\n\n`);

        const nameWidth = Math.max(...params.map((p) => p.name.length), 4) + 2;

        for (const p of params) {
          const schema = p.schema as OpenAPIV3.SchemaObject | undefined;
          const type = schema?.type || '';
          const format = schema?.format ? ` (${schema.format})` : '';
          const req = p.required ? `${YELLOW}required${RESET}` : `${DIM}optional${RESET}`;
          const desc = p.description ? `  ${DIM}${p.description}${RESET}` : '';

          w(`  ${BOLD}${p.name.padEnd(nameWidth)}${RESET} ${p.in.padEnd(6)}  ${type}${format}  ${req}${desc}\n`);
        }
        w(`\n`);
      }

      // ── Request body ──
      const reqBody = op.requestBody as OpenAPIV3.RequestBodyObject | undefined;
      if (reqBody) {
        w(`${BOLD}REQUEST BODY${RESET}${reqBody.required ? ` ${YELLOW}(required)${RESET}` : ''}\n`);
        if (reqBody.description) w(`  ${DIM}${reqBody.description}${RESET}\n`);

        // Show mock body
        const content = reqBody.content?.['application/json'];
        const bodySchema = content?.schema as OpenAPIV3.SchemaObject | undefined;
        if (bodySchema) {
          try {
            const mockBody = truncateJson(mockFromSchema(bodySchema));
            const bodyStr = highlightJson(JSON.stringify(mockBody, null, 2));
            const lines = bodyStr.split('\n');
            w(`\n`);
            if (lines.length <= MAX_BODY_LINES) {
              for (const line of lines) w(`  ${line}\n`);
            } else {
              for (const line of lines.slice(0, MAX_BODY_LINES)) w(`  ${line}\n`);
              w(`  ${DIM}  ...${RESET}\n`);
            }
          } catch {
            // skip mock on error
          }
        }
        w(`\n`);
      }

      // ── Flags ──
      w(`${BOLD}FLAGS${RESET}\n\n`);
      w(`  ${GREEN}-p${RESET} key=value             Set a named parameter\n`);
      w(`  ${GREEN}-d${RESET} '{...}'               Request body JSON\n`);
      w(`  ${GREEN}-H${RESET} 'Key: Value'          Custom header\n`);
      w(`  ${GREEN}-t, --token${RESET} <token>     Bearer token for authentication\n`);
      w(`  ${GREEN}--profile${RESET} <name>        Use a named profile\n`);
      w(`  ${GREEN}-s, --server${RESET} <url>      Override server base URL\n`);
      w(`  ${GREEN}-i, --include${RESET}           Include response headers in output\n`);
      w(`  ${GREEN}--json${RESET}                  Output raw JSON (no formatting)\n`);
      w(`  ${GREEN}-v, --verbose${RESET}           Verbose output (show request details)\n`);
      w(`  ${GREEN}--jsonata${RESET} <expr>        JSONata expression to transform response\n`);
      w(`  ${GREEN}--definition${RESET} <file>     Override OpenAPI spec file/URL\n`);
      w(`  ${GREEN}--guided${RESET}                Prompt for all parameters interactively\n`);
      w(`  ${GREEN}--no-interactive${RESET}        Disable interactive prompts\n`);
      w(`\n`);

      // ── Sample calls ──
      w(`${BOLD}EXAMPLES${RESET}\n\n`);

      const reqParams = params.filter((p) => p.required || p.in === 'path');
      const pathParams = params.filter((p) => p.in === 'path');
      const pFlags = reqParams.map((p) => `-p ${p.name}=${sampleParamValue(p)}`);

      // Primary: with -p flags
      {
        const parts = [`  ${GREEN}$${RESET} epilot ${apiName} ${operationId}`];
        for (const pf of pFlags) parts.push(pf);
        w(`${parts.join(' \\\n      ')}\n`);
      }
      w(`\n`);

      // Positional shorthand
      if (pathParams.length > 0) {
        const positionalVals = pathParams.map((p) => sampleParamValue(p));
        w(`  ${DIM}# positional args for path parameters${RESET}\n`);
        w(`  ${GREEN}$${RESET} epilot ${apiName} ${operationId} ${positionalVals.join(' ')}\n`);
        w(`\n`);
      }

      // With body
      if (reqBody) {
        const content = reqBody.content?.['application/json'];
        const bodySchema = content?.schema as OpenAPIV3.SchemaObject | undefined;
        if (bodySchema) {
          try {
            const mockBody = truncateJson(mockFromSchema(bodySchema));
            const compact = JSON.stringify(mockBody);
            if (compact.length <= 80) {
              w(`  ${DIM}# with request body${RESET}\n`);
              w(`  ${GREEN}$${RESET} epilot ${apiName} ${operationId}`);
              if (pFlags.length > 0) w(` ${pFlags.join(' ')}`);
              w(` -d '${compact}'\n`);
            } else {
              const pretty = JSON.stringify(mockBody, null, 2);
              w(`  ${DIM}# with request body${RESET}\n`);
              const parts = [`  ${GREEN}$${RESET} epilot ${apiName} ${operationId}`];
              if (pFlags.length > 0) for (const pf of pFlags) parts.push(pf);
              parts.push(`-d '${pretty}'`);
              w(`${parts.join(' \\\n      ')}\n`);
            }
            w(`\n`);
          } catch {
            // skip
          }
        }

        // Stdin pipe
        const pFlagsStr = pFlags.length > 0 ? ` ${pFlags.join(' ')}` : '';
        w(`  ${DIM}# pipe from file${RESET}\n`);
        w(`  ${GREEN}$${RESET} cat body.json | epilot ${apiName} ${operationId}${pFlagsStr}\n`);
        w(`\n`);
      }

      // JSONata
      {
        const pFlagsStr = pFlags.length > 0 ? ` ${pFlags.join(' ')}` : '';
        const jsonataExpr = guessJsonataExpr(op);
        w(`  ${DIM}# filter response with JSONata${RESET}\n`);
        w(`  ${GREEN}$${RESET} epilot ${apiName} ${operationId}${pFlagsStr} --jsonata '${jsonataExpr}'\n`);
        w(`\n`);
      }

      // Raw JSON for scripting
      {
        const pFlagsStr = pFlags.length > 0 ? ` ${pFlags.join(' ')}` : '';
        w(`  ${DIM}# raw JSON for scripting${RESET}\n`);
        w(`  ${GREEN}$${RESET} epilot ${apiName} ${operationId}${pFlagsStr} --json\n`);
        w(`\n`);
      }

      // ── Sample response ──
      const successResp = ((op.responses as Record<string, unknown>)?.['200'] ||
        (op.responses as Record<string, unknown>)?.['201']) as OpenAPIV3.ResponseObject | undefined;
      if (successResp) {
        const respContent = successResp.content?.['application/json'];
        const respSchema = respContent?.schema as OpenAPIV3.SchemaObject | undefined;
        if (respSchema) {
          try {
            const mockResp = truncateJson(mockFromSchema(respSchema));
            const respStr = JSON.stringify(mockResp, null, 2);
            const lines = respStr.split('\n');

            w(`${BOLD}SAMPLE RESPONSE${RESET}\n\n`);
            const limit = 40;
            const shown = lines.length <= limit ? lines : lines.slice(0, limit);
            const highlighted = highlightJson(shown.join('\n'));
            for (const hLine of highlighted.split('\n')) w(`  ${hLine}\n`);
            if (lines.length > limit) w(`  ${DIM}  ... (${lines.length - limit} more lines)${RESET}\n`);
            w(`\n`);
          } catch {
            // skip
          }
        }
      }

      return out;
    }
  }

  return null;
};

/**
 * Guess a useful JSONata expression for an operation.
 */
const guessJsonataExpr = (op: OpenAPIV3.OperationObject): string => {
  const successResp = ((op.responses as Record<string, unknown>)?.['200'] ||
    (op.responses as Record<string, unknown>)?.['201']) as OpenAPIV3.ResponseObject | undefined;
  if (!successResp) return '$';

  const respContent = successResp.content?.['application/json'];
  const schema = respContent?.schema as OpenAPIV3.SchemaObject | undefined;
  if (!schema?.properties) return '$';

  const props = schema.properties as Record<string, unknown>;
  if (props.results) return 'results[0]';
  if (props.data) return 'data';
  if (props.items) return 'items[0]';
  if (props.hits) return 'hits';
  if (props.entity) return 'entity._title';
  if (props.id) return 'id';
  if (props.email) return 'email';

  const keys = Object.keys(props);
  return keys.length > 0 ? keys[0] : '$';
};

/**
 * Core API call logic.
 */
export const callApi = async (apiName: string, args: CallArgs): Promise<void> => {
  // Load the OpenAPI definition and dereference all $ref pointers
  const rawSpec = await loadDefinition(apiName, args.definition);
  const spec = dereferenceSync(rawSpec) as Record<string, unknown>;
  const operations = extractOperations(spec as OpenAPIV3.Document);

  // No operation specified: list operations or interactive pick
  if (!args.operation) {
    const header =
      `\n${BOLD}epilot ${apiName}${RESET} - ${(spec as OpenAPIV3.Document).info?.title || apiName}\n\n` +
      `${BOLD}Available operations:${RESET}\n\n`;

    if (!args._apihelp && isInteractive({ interactive: args.interactive })) {
      process.stdout.write(header);
      const operationId = await pickOperation(operations);
      // Re-run with selected operation
      return callApi(apiName, { ...args, operation: operationId });
    }

    if (args.interactive === false) {
      process.stdout.write(header + formatOperationsTable(apiName, operations));
    } else {
      pager(header + formatOperationsTable(apiName, operations));
    }
    return;
  }

  const operationId = args.operation;

  // --help on specific operation
  if (args.help) {
    const helpText = formatOperationHelp(apiName, operationId, spec as OpenAPIV3.Document);
    if (helpText) {
      if (args.interactive === false) {
        process.stdout.write(helpText);
      } else {
        pager(helpText);
      }
    } else {
      process.stderr.write(`${RED}Operation "${operationId}" not found.${RESET}\n`);
      process.exit(1);
    }
    return;
  }

  // Validate operation exists
  const opExists = operations.some((op) => op.operationId === operationId);
  if (!opExists) {
    process.stderr.write(`${RED}Unknown operation "${operationId}" for ${apiName}.${RESET}\n\n`);
    process.stderr.write(`Available: ${operations.map((op) => op.operationId).join(', ')}\n`);
    process.exit(1);
  }

  // Resolve auth (--token > EPILOT_TOKEN > profile > credentials.json > interactive prompt)
  let token = resolveToken(args.token, args.profile);
  if (!token) {
    if (isInteractive({ interactive: args.interactive })) {
      const { promptToken } = await import('./interactive.js');
      token = await promptToken();
    }
    if (!token) {
      process.stderr.write(`${RED}No authentication token found.${RESET}\n`);
      process.stderr.write(`Run 'epilot auth login' or pass --token <token>\n`);
      process.exit(1);
    }
  }

  // Collect parameters
  const { params: opParams, pathTemplate } = getOperationParams(spec as OpenAPIV3.Document, operationId);
  const positionalArgs = args._args ?? [];
  const collected = collectParams(opParams, args.param, positionalArgs, pathTemplate);

  // Guided mode: prompt for ALL params; otherwise prompt only for missing required
  if (args.guided && isInteractive({ interactive: args.interactive })) {
    for (const param of opParams) {
      if (!(param.name in collected)) {
        const value = await promptParam(param.name, param);
        if (value) collected[param.name] = value;
      }
    }
  } else {
    const missing = getMissingRequired(opParams, collected);
    if (missing.length > 0 && isInteractive({ interactive: args.interactive })) {
      for (const param of opParams) {
        if (param.required && !(param.name in collected)) {
          const value = await promptParam(param.name, param);
          if (value) collected[param.name] = value;
        }
      }
    }
  }

  // Validate required params
  const stillMissing = getMissingRequired(opParams, collected);
  if (stillMissing.length > 0) {
    process.stderr.write(`${RED}Missing required parameters: ${stillMissing.join(', ')}${RESET}\n`);
    process.exit(1);
  }

  // Resolve request body
  const { hasBody, isRequired } = getRequestBodyInfo(spec as Record<string, unknown>, operationId);
  const forceBodyPrompt = args.guided && hasBody;
  let bodyTemplate: unknown | undefined;
  if (hasBody && (forceBodyPrompt || isInteractive({ interactive: args.interactive }))) {
    const bodySchema = getBodySchema(spec as OpenAPIV3.Document, operationId);
    if (bodySchema) {
      try {
        bodyTemplate = mockFromSchema(bodySchema);
      } catch {
        // skip template on error
      }
    }
  }
  const body = await resolveBody({
    dataFlag: args.data,
    hasRequestBody: hasBody,
    isRequired,
    interactive: isInteractive({ interactive: args.interactive }),
    defaultTemplate: bodyTemplate,
    cacheKey: `${apiName}/${operationId}`,
  });

  // Parse custom headers
  const customHeaders: Record<string, string> = {};
  if (args.header) {
    const headers = Array.isArray(args.header) ? args.header : [args.header];
    for (const h of headers) {
      const idx = h.indexOf(':');
      if (idx > 0) {
        customHeaders[h.substring(0, idx).trim()] = h.substring(idx + 1).trim();
      }
    }
  }

  // Resolve server URL override: --server flag > profile > spec default
  const serverOverride = args.server || getResolvedProfile(args.profile)?.server;
  if (serverOverride) {
    const specDoc = spec as OpenAPIV3.Document;
    specDoc.servers = [{ url: serverOverride }];
  }

  // Init OpenAPI client
  const api = new OpenAPIClientAxios({
    definition: spec,
    quick: true,
  });
  const client = await api.init();

  // Set auth
  client.defaults.headers.common.authorization = `Bearer ${token}`;

  // Set custom headers
  for (const [key, value] of Object.entries(customHeaders)) {
    client.defaults.headers.common[key] = value;
  }

  // Execute the call
  const operationFn = (client as Record<string, unknown>)[operationId];
  if (typeof operationFn !== 'function') {
    process.stderr.write(`${RED}Operation "${operationId}" not found on client.${RESET}\n`);
    process.exit(1);
  }

  try {
    const response = await (operationFn as Function)(Object.keys(collected).length > 0 ? collected : null, body, {
      validateStatus: () => true,
    });

    await formatResponse(response, {
      json: args.json,
      include: args.include,
      verbose: args.verbose,
      jsonata: args.jsonata,
      interactive: args.interactive,
      operationId,
    });

    // Exit with non-zero for error responses
    if (response.status >= 400) {
      process.exit(1);
    }
  } catch (err) {
    process.stderr.write(`${RED}Request failed: ${err instanceof Error ? err.message : String(err)}${RESET}\n`);
    process.exit(1);
  }
};
