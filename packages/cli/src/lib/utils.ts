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

export const RESET = '\x1b[0m';
export const BOLD = '\x1b[1m';
export const DIM = '\x1b[2m';
export const GREEN = '\x1b[32m';
export const RED = '\x1b[31m';
export const YELLOW = '\x1b[33m';
export const CYAN = '\x1b[36m';
export const WHITE = '\x1b[37m';
export const BG_GREEN = '\x1b[42m';
export const BG_RED = '\x1b[41m';
export const BG_YELLOW = '\x1b[43m';
export const MAGENTA = '\x1b[35m';
export const BLUE = '\x1b[34m';

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
