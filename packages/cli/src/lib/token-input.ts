/** Token argument value that means "read the token from stdin" (`--token -`, `auth token -`). */
export const STDIN_TOKEN = '-';

/**
 * Read a token from stdin, trimmed. Piped input (`printf '%s' "$TOKEN" | epilot … -`) keeps the token out of
 * argv (`ps`) and shell history. On a TTY it prompts with masked input instead, so the token is never echoed.
 */
export const readTokenFromStdin = async (stdin: NodeJS.ReadStream = process.stdin): Promise<string> => {
  if (stdin.isTTY) {
    const { password } = await import('@inquirer/prompts');
    return (await password({ message: 'Paste your API token:' })).trim();
  }
  let data = '';
  stdin.setEncoding('utf-8');
  for await (const chunk of stdin) data += chunk;
  return data.trim();
};

/** The token argument as given, or read from stdin when it is `-`. */
export const resolveTokenArg = async (value: string | undefined): Promise<string | undefined> =>
  value === STDIN_TOKEN ? readTokenFromStdin() : value;
