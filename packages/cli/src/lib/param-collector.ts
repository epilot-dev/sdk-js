import type { OpenAPIV3 } from 'openapi-client-axios';
import { parseKeyValue, parseParamValue } from './utils.js';

export type CollectedParams = Record<string, unknown>;

type ParameterObject = OpenAPIV3.ParameterObject;

export type OperationParamsResult = {
  params: ParameterObject[];
  pathTemplate: string;
};

/**
 * Extract parameters for an operation from the OpenAPI spec.
 * Expects a dereferenced spec (no $ref pointers in parameters).
 * Returns both the params and the URL path template.
 */
export const getOperationParams = (spec: OpenAPIV3.Document, operationId: string): OperationParamsResult => {
  for (const [path, methods] of Object.entries(spec.paths ?? {})) {
    if (!methods) continue;

    // Get path-level params
    const pathParams = ((methods as Record<string, unknown>).parameters || []) as ParameterObject[];

    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const) {
      const op = (methods as Record<string, unknown>)[method] as OpenAPIV3.OperationObject | undefined;
      if (!op || op.operationId !== operationId) continue;

      const opParams = (op.parameters || []) as ParameterObject[];
      // Merge: operation params override path params
      const merged = [...pathParams.filter((p) => p.name)];
      for (const p of opParams) {
        if (!p.name) continue; // skip unresolved refs
        const idx = merged.findIndex((pp) => pp.name === p.name && pp.in === p.in);
        if (idx >= 0) merged[idx] = p;
        else merged.push(p);
      }
      return { params: merged, pathTemplate: path };
    }
  }
  return { params: [], pathTemplate: '' };
};

/**
 * Collect parameters from -p flags and positional args.
 *
 * Positional args are mapped to path parameters in URL template order
 * (e.g. /v1/entity/{slug}/{id} → slug first, then id).
 */
export const collectParams = (
  params: ParameterObject[],
  paramFlags: string | string[] | undefined,
  positionalArgs: string[],
  pathTemplate?: string,
): CollectedParams => {
  const result: CollectedParams = {};

  // Map positional args to path parameters in URL template order
  let pathParams = params.filter((p) => p.in === 'path');
  if (pathTemplate) {
    // Extract param names from URL template in order: /v1/{slug}/{id} → ['slug', 'id']
    const templateOrder = [...pathTemplate.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
    pathParams = templateOrder
      .map((name) => pathParams.find((p) => p.name === name))
      .filter((p): p is ParameterObject => !!p);
  }
  for (let i = 0; i < positionalArgs.length && i < pathParams.length; i++) {
    result[pathParams[i].name] = parseParamValue(positionalArgs[i]);
  }

  // Parse -p key=value flags (overrides positional)
  if (paramFlags) {
    const flags = Array.isArray(paramFlags) ? paramFlags : [paramFlags];
    for (const flag of flags) {
      const [key, value] = parseKeyValue(flag);
      result[key] = parseParamValue(value);
    }
  }

  return result;
};

/**
 * Validate that all required parameters are provided.
 * Returns list of missing required param names.
 */
export const getMissingRequired = (params: ParameterObject[], collected: CollectedParams): string[] => {
  return params.filter((p) => p.required && !(p.name in collected)).map((p) => `${p.name} (${p.in})`);
};
