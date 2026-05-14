/**
 * Reorders CLI args so that global flags passed BEFORE the subcommand are
 * moved to AFTER the subcommand (and its operationId, when applicable).
 *
 * Motivation: citty dispatches subcommands using `rawArgs.slice(subCommandIdx + 1)`,
 * which drops any leading flags. That means `epilot --use-dev entity listTaxonomies`
 * never passes `--use-dev` to the `entity` subcommand. By hoisting those leading
 * flags to a position the subcommand will see, all of these become equivalent:
 *
 *   epilot --use-dev --json entity listTaxonomies
 *   epilot entity --use-dev --json listTaxonomies
 *   epilot entity listTaxonomies --use-dev --json
 *
 * The reorder is intentionally narrow: it only moves leading flags, preserves
 * relative order, and leaves the subcommand name and its positional args in place.
 */

/**
 * Global flags that take a value (consume the next token).
 * Used to decide whether a leading `--flag` should swallow the next arg.
 */
const VALUE_TAKING_FLAGS = new Set([
  // long
  '--token',
  '--profile',
  '--server',
  '--jsonata',
  '--definition',
  // short
  '-t',
  '-s',
]);

/**
 * Returns true if the token looks like a flag (starts with `-` but is not
 * just `-` or `--`).
 */
const isFlag = (token: string): boolean => {
  if (token === '-' || token === '--') return false;
  return token.startsWith('-');
};

/**
 * Given a flag token, returns true if it expects a separate value token.
 * Handles both `--server` and `--server=value` forms (the latter does NOT
 * consume a separate token).
 */
const consumesNextToken = (token: string): boolean => {
  if (token.includes('=')) return false;
  return VALUE_TAKING_FLAGS.has(token);
};

/**
 * Reorder argv so global flags appearing before the first positional (i.e.
 * the subcommand) are moved to immediately after that positional.
 *
 * Unknown subcommand names are still treated as "first positional"; citty
 * will handle the unknown-subcommand error itself.
 *
 * @param argv - argv WITHOUT the node+script prefix (i.e. `process.argv.slice(2)`)
 * @returns a new array; never mutates the input
 */
export const hoistFlagsAfterSubcommand = (argv: string[]): string[] => {
  // Find the first positional token, honoring value-taking flags so we don't
  // mistake a flag's argument for the subcommand name.
  let firstPositionalIdx = -1;
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (isFlag(token)) {
      if (consumesNextToken(token)) i += 1; // skip the value
      continue;
    }
    // `--` ends option parsing; anything after is positional but we treat it as a boundary
    if (token === '--') break;
    firstPositionalIdx = i;
    break;
  }

  // No positional found, or it's already at position 0 — nothing to reorder.
  if (firstPositionalIdx <= 0) return argv.slice();

  const leading = argv.slice(0, firstPositionalIdx);
  const subcommand = argv[firstPositionalIdx];
  const rest = argv.slice(firstPositionalIdx + 1);

  // Place the subcommand first, then any trailing tokens (which may contain
  // the operationId and its own flags), then the hoisted leading flags.
  // Placing hoisted flags at the end keeps the operationId in position 0 of
  // the subcommand's rawArgs, which is what the generated API commands and
  // downstream positional-arg extraction both expect.
  return [subcommand, ...rest, ...leading];
};
