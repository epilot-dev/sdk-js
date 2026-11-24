/**
 * Lazy-loaded help system — returns markdown docs for SDK APIs, looked up by name.
 *
 * The import() below is a glob, so a bundler emits one lazy chunk per doc. Only the root entry
 * may reach this module; `@epilot/sdk/<api>` entries pass their own docs via lazyApiDocs().
 */

const kebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const resolveDoc = async (filename: string): Promise<string> => {
  try {
    const mod = await import(`./docs/${filename}`);
    return (mod.default ?? mod) as string;
  } catch {
    return `No documentation found for "${filename}". Run help() to see available APIs.`;
  }
};

/**
 * Get help for a specific API or general SDK help.
 *
 * @example
 * await help()           // general SDK docs
 * await help('entity')   // entity API docs
 */
export const help = async (apiName?: string): Promise<string> => {
  return resolveDoc(apiName ? `${kebabCase(apiName)}.json` : 'README.json');
};
