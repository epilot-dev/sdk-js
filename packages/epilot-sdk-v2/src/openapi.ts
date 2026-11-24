/**
 * Lazy-loaded OpenAPI spec — returns the full OpenAPI JSON document for an API, looked up by name.
 *
 * The import() below is a glob, so a bundler emits one lazy chunk per spec. Only the root entry
 * may reach this module; `@epilot/sdk/<api>` entries pass their own spec via lazyApiDocs().
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
