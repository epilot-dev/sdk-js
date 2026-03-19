/**
 * Lazy-loaded OpenAPI spec — returns the full OpenAPI JSON document for an API.
 * Each spec is loaded via dynamic import() so only the requested spec affects bundle size.
 */

import type { Document } from 'openapi-client-axios';

const kebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Get the full OpenAPI specification for an API.
 *
 * @example
 * await openapi('entity')   // full entity OpenAPI spec
 */
export const openapi = async (apiName: string): Promise<Document> => {
  const mod = await import(`./definitions/${kebabCase(apiName)}.json`);
  return (mod.default ?? mod) as Document;
};
