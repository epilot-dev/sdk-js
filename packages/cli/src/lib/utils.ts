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
    case 'GET': return '\x1b[32m'; // green
    case 'POST': return '\x1b[33m'; // yellow
    case 'PUT': return '\x1b[34m'; // blue
    case 'PATCH': return '\x1b[36m'; // cyan
    case 'DELETE': return '\x1b[31m'; // red
    default: return '\x1b[37m'; // white
  }
};

export const RESET = '\x1b[0m';
export const BOLD = '\x1b[1m';
export const DIM = '\x1b[2m';
export const GREEN = '\x1b[32m';
export const RED = '\x1b[31m';
export const YELLOW = '\x1b[33m';
export const CYAN = '\x1b[36m';
