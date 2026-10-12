/**
 * citty keeps only the last value of a repeated `type: 'string'` flag, so
 * `-p slug=contact -p id=123` would arrive as just `id=123`. Read every
 * occurrence straight from rawArgs instead.
 *
 * Supports `-p value`, `--param value` and `--param=value` / `-p=value`.
 */
export const collectRepeatedFlag = (params: { rawArgs: string[]; names: string[] }): string[] => {
  const { rawArgs, names } = params;
  const values: string[] = [];

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === '--') break;

    const inlineName = names.find((name) => arg.startsWith(`${name}=`));
    if (inlineName) {
      values.push(arg.substring(inlineName.length + 1));
      continue;
    }

    if (names.includes(arg) && i + 1 < rawArgs.length) {
      values.push(rawArgs[i + 1]);
      i++;
    }
  }

  return values;
};

/**
 * Prefer every occurrence from rawArgs; fall back to citty's parsed value when
 * rawArgs has none (e.g. programmatic calls).
 */
export const resolveRepeatedFlag = (params: {
  rawArgs: string[] | undefined;
  names: string[];
  parsed: string | string[] | undefined;
}): string | string[] | undefined => {
  const { rawArgs, names, parsed } = params;
  const collected = rawArgs ? collectRepeatedFlag({ rawArgs, names }) : [];

  return collected.length > 0 ? collected : parsed;
};
