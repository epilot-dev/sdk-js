import { spawnSync } from 'node:child_process';

/**
 * Check if a string is valid JSON.
 */
export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Parse a "key=value" string into a [key, value] tuple.
 */
export const parseKeyValue = (str: string): [string, string] => {
  const idx = str.indexOf('=');
  if (idx === -1) return [str, ''];
  return [str.substring(0, idx), str.substring(idx + 1)];
};

/**
 * Parse header strings like "Content-Type: application/json".
 */
export const parseHeader = (str: string): [string, string] => {
  const idx = str.indexOf(':');
  if (idx === -1) return [str, ''];
  return [str.substring(0, idx).trim(), str.substring(idx + 1).trim()];
};

/**
 * Try to parse a value as JSON, otherwise return as string.
 */
export const parseParamValue = (value: string): unknown => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  if (/^\d+$/.test(value)) return Number(value);
  if (/^\d+\.\d+$/.test(value)) return Number(value);
  // Try JSON (arrays, objects)
  if (value.startsWith('{') || value.startsWith('[')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

/**
 * Colorize HTTP method for display.
 */
export const methodColor = (method: string): string => {
  const m = method.toUpperCase();
  switch (m) {
    case 'GET':
      return '\x1b[32m'; // green
    case 'POST':
      return '\x1b[33m'; // yellow
    case 'PUT':
      return '\x1b[34m'; // blue
    case 'PATCH':
      return '\x1b[36m'; // cyan
    case 'DELETE':
      return '\x1b[31m'; // red
    default:
      return '\x1b[37m'; // white
  }
};

/**
 * Page output through `less` if content is taller than the terminal.
 * Falls back to direct stdout write if `less` is unavailable or not a TTY.
 */
export const pager = (content: string): void => {
  if (!process.stdout.isTTY) {
    process.stdout.write(content);
    return;
  }

  const lines = content.split('\n').length;
  const rows = process.stdout.rows || 24;

  if (lines <= rows) {
    process.stdout.write(content);
    return;
  }

  try {
    const result = spawnSync('less', ['-R', '-F', '-X'], {
      input: content,
      stdio: ['pipe', 'inherit', 'inherit'],
    });
    if (result.status !== 0 && result.status !== null) {
      process.stdout.write(content);
    }
  } catch {
    process.stdout.write(content);
  }
};

type ColorStreams = { stdout: { isTTY?: boolean }; stderr: { isTTY?: boolean } };

/**
 * Whether the CLI writes ANSI colours. Same precedence as Node's own `util.inspect` colouring:
 * - `FORCE_COLOR` set: colour unless it is `0` / `false`
 * - `NO_COLOR` set and non-empty (https://no-color.org): no colour
 * - `TERM=dumb`: no colour
 * - otherwise only when both stdout and stderr are terminals, so piped or captured output (scripts, CI,
 *   AI agents parsing the output) never contains escape codes.
 */
export const colorEnabled = (
  env: NodeJS.ProcessEnv = process.env,
  streams: ColorStreams = { stdout: process.stdout, stderr: process.stderr },
): boolean => {
  const force = env.FORCE_COLOR;
  if (force !== undefined && force !== '') return force !== '0' && force.toLowerCase() !== 'false';
  if (env.NO_COLOR) return false;
  if (env.TERM === 'dumb') return false;
  return Boolean(streams.stdout.isTTY && streams.stderr.isTTY);
};

const COLOR = colorEnabled();
const sgr = (code: string) => (COLOR ? `\x1b[${code}m` : '');

export const RESET = sgr('0');
export const BOLD = sgr('1');
export const DIM = sgr('2');
export const GREEN = sgr('32');
export const RED = sgr('31');
export const YELLOW = sgr('33');
export const CYAN = sgr('36');
export const WHITE = sgr('37');
export const BG_GREEN = sgr('42');
export const BG_RED = sgr('41');
export const BG_YELLOW = sgr('43');
export const MAGENTA = sgr('35');
export const BLUE = sgr('34');

/**
 * Syntax-highlight a JSON string with ANSI colors.
 * Keys = cyan, strings = green, numbers = yellow, booleans/null = magenta.
 */
export const highlightJson = (jsonStr: string): string =>
  jsonStr.replace(
    /("(?:\\.|[^"\\])*")\s*(:)?|(\b(?:true|false|null)\b)|(-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)/g,
    (match, str, colon, bool, num) => {
      if (str && colon) return `${CYAN}${str}${RESET}${colon}`;
      if (str) return `${GREEN}${str}${RESET}`;
      if (bool) return `${MAGENTA}${bool}${RESET}`;
      if (num) return `${YELLOW}${num}${RESET}`;
      return match;
    },
  );
