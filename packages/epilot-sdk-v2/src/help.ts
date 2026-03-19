/**
 * Lazy-loaded help system — returns markdown docs for SDK APIs.
 * Each doc is loaded via dynamic import() so only the requested doc affects bundle size.
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
