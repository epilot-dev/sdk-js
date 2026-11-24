import type { Document } from 'openapi-client-axios';

/** What a client's help() and openapi() resolve to. */
export type ApiDocs = {
  help: () => Promise<string>;
  openapi: () => Promise<Document>;
};

const unwrapDefault = <T>(mod: unknown): T => ((mod as { default?: T }).default ?? mod) as T;

/**
 * Builds a client's docs from loaders that import exactly that API's files.
 *
 * Each `@epilot/sdk/<api>` entry passes literal import() paths, so a bundler emits lazy chunks
 * for the APIs an app imports. Looking docs up by name instead (see help.ts and openapi.ts)
 * makes it emit a chunk for every API in the SDK.
 */
export const lazyApiDocs = (params: {
  apiName: string;
  help: () => Promise<unknown>;
  openapi?: () => Promise<unknown>;
}): ApiDocs => {
  const { apiName, help, openapi } = params;

  return {
    help: async () => unwrapDefault<string>(await help()),
    openapi: async () => {
      if (!openapi) {
        throw new Error(`No OpenAPI specification bundled for "${apiName}"`);
      }

      return unwrapDefault<Document>(await openapi());
    },
  };
};
