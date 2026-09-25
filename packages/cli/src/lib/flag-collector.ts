/**
 * Collects every occurrence of a repeatable string flag (e.g. `-p a=1 -p b=2`)
 * directly from rawArgs.
 *
 * Motivation: citty parses args with `node:util.parseArgs` under the hood
 * (see citty's `parseRawArgs`), which never sets `multiple: true` for any
 * arg — citty's ArgDef type has no array/repeatable string kind at all. With
 * `strict: false`, `parseArgs` silently keeps only the LAST occurrence of a
 * repeated string option instead of erroring or collecting them, so
 * `args.param` only ever reflects the final `-p` flag. Any operation needing
 * more than one `-p key=value` (the common case for required params) would
 * lose all but the last, get reported as "missing", and be re-prompted for
 * interactively even though the user supplied it on the command line.
 *
 * This walks rawArgs itself to recover every occurrence, bypassing citty's
 * lossy parsing entirely.
 */
export const collectRepeatedFlag = (rawArgs: string[], names: string[]): string[] => {
  const values: string[] = [];
  const prefixes = names.map((name) => (name.length === 1 ? `-${name}` : `--${name}`));

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === '--') break;

    for (const prefix of prefixes) {
      if (arg === prefix) {
        const next = rawArgs[i + 1];
        if (next !== undefined) {
          values.push(next);
          i++;
        }
        break;
      }
      if (arg.startsWith(`${prefix}=`)) {
        values.push(arg.slice(prefix.length + 1));
        break;
      }
    }
  }

  return values;
};
