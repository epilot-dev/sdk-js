import type { AxiosResponse } from 'axios';
import { BOLD, RESET, GREEN, RED, YELLOW, DIM } from './utils.js';

export type FormatOptions = {
  json?: boolean;
  include?: boolean;
  verbose?: boolean;
  jsonata?: string;
};

/**
 * Format and output an API response.
 *
 * - Status badge goes to stderr (so it doesn't interfere with piping)
 * - Response body goes to stdout
 */
export const formatResponse = async (response: AxiosResponse, options: FormatOptions): Promise<void> => {
  const { json, include, verbose, jsonata } = options;

  // Verbose: show request details on stderr
  if (verbose) {
    const req = response.config;
    process.stderr.write(`${DIM}${req.method?.toUpperCase()} ${req.url}${RESET}\n`);
    if (req.headers) {
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string' && key.toLowerCase() !== 'authorization') {
          process.stderr.write(`${DIM}> ${key}: ${value}${RESET}\n`);
        } else if (key.toLowerCase() === 'authorization') {
          process.stderr.write(`${DIM}> ${key}: Bearer ***${RESET}\n`);
        }
      }
    }
    process.stderr.write('\n');
  }

  // Status badge to stderr (only when both stdout and stderr are TTY — not piped)
  if (!json && process.stdout.isTTY && process.stderr.isTTY) {
    const statusColor = response.status >= 200 && response.status < 300 ? GREEN : response.status >= 400 ? RED : YELLOW;
    process.stderr.write(
      `${statusColor}${BOLD}${response.status}${RESET} ${statusColor}${response.statusText}${RESET}\n`,
    );
  }

  // Include: show response headers
  if (include) {
    process.stderr.write(`${DIM}HTTP/${response.status} ${response.statusText}${RESET}\n`);
    for (const [key, value] of Object.entries(response.headers)) {
      process.stderr.write(`${DIM}${key}: ${value}${RESET}\n`);
    }
    process.stderr.write('\n');
  }

  // Process response data
  let data = response.data;

  // Apply JSONata transformation
  if (jsonata && data) {
    try {
      const jsonataModule = await import('jsonata');
      const expression = jsonataModule.default(jsonata);
      data = await expression.evaluate(data);
    } catch (err) {
      process.stderr.write(`${RED}JSONata error: ${err instanceof Error ? err.message : String(err)}${RESET}\n`);
      process.exit(1);
    }
  }

  // Output body to stdout
  if (data !== undefined && data !== null) {
    if (typeof data === 'string') {
      process.stdout.write(`${data}\n`);
    } else {
      const indent = json ? 0 : 2;
      process.stdout.write(`${JSON.stringify(data, null, indent)}\n`);
    }
  }
};
