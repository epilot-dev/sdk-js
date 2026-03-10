import type { OpenAPIV3 } from 'openapi-client-axios';
import { parseKeyValue, parseParamValue } from './utils.js';

export type CollectedParams = Record<string, unknown>;

type ParameterObject = OpenAPIV3.ParameterObject;

/**
 * Extract parameters for an operation from the OpenAPI spec.
 */
export const getOperationParams = (
  spec: OpenAPIV3.Document,
  operationId: string,
): ParameterObject[] => {
  for (const [_path, methods] of Object.entries(spec.paths ?? {})) {
    if (!methods) continue;

    // Get path-level params
    const pathParams = ((methods as Record<string, unknown>).parameters || []) as ParameterObject[];

    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const) {
      const op = (methods as Record<string, unknown>)[method] as OpenAPIV3.OperationObject | undefined;
      if (!op || op.operationId !== operationId) continue;

      const opParams = (op.parameters || []) as ParameterObject[];
      // Merge: operation params override path params
      const merged = [...pathParams];
      for (const p of opParams) {
        const idx = merged.findIndex((pp) => pp.name === p.name && pp.in === p.in);
        if (idx >= 0) merged[idx] = p;
        else merged.push(p);
      }
      return merged;
    }
  }
  return [];
};

/**
 * Collect parameters from -p flags and positional args.
 *
 * Positional args are mapped to path parameters in declaration order.
 */
export const collectParams = (
  params: ParameterObject[],
  paramFlags: string | string[] | undefined,
  positionalArgs: string[],
): CollectedParams => {
  const result: CollectedParams = {};

  // Map positional args to path parameters in order
  const pathParams = params.filter((p) => p.in === 'path');
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
export const getMissingRequired = (
  params: ParameterObject[],
  collected: CollectedParams,
): string[] => {
  return params
    .filter((p) => p.required && !(p.name in collected))
    .map((p) => `${p.name} (${p.in})`);
};
