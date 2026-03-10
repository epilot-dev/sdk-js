import type { AxiosResponse } from 'axios';
import {
  BOLD,
  RESET,
  GREEN,
  RED,
  DIM,
  WHITE,
  BG_GREEN,
  BG_RED,
  methodColor,
  pager,
  highlightJson,
} from './utils.js';

export type FormatOptions = {
  json?: boolean;
  include?: boolean;
  verbose?: boolean;
  jsonata?: string;
  interactive?: boolean;
  operationId?: string;
};

/** Background color for HTTP status code */
const statusBg = (code: number): string => {
  if (code >= 400) return BG_RED;
  return BG_GREEN;
};

/**
 * Format and output an API response.
 *
 * Default mode: METHOD URL → status badge → highlighted JSON body
 * --verbose: REQUEST META → RESPONSE META → RESPONSE BODY
 * --include: RESPONSE META → RESPONSE BODY
 * --json: raw JSON to stdout (no colors, no metadata)
 */
export const formatResponse = async (response: AxiosResponse, options: FormatOptions): Promise<void> => {
  const { json, include, verbose, jsonata, interactive, operationId } = options;
  const isTTY = process.stdout.isTTY && process.stderr.isTTY;
  const usePager = !json && isTTY && interactive !== false;

  // When paging, buffer everything into one string for less.
  // When piped, write metadata to stderr and body to stdout as before.
  let buf = '';
  const meta = (text: string) => {
    if (usePager) {
      buf += text;
    } else {
      process.stderr.write(text);
    }
  };

  const req = response.config;
  const method = (req.method || 'GET').toUpperCase();
  const baseURL = req.baseURL || '';
  const reqUrl = req.url || '';
  const url = reqUrl.startsWith('http') ? reqUrl : `${baseURL.replace(/\/$/, '')}${reqUrl.startsWith('/') ? '' : '/'}${reqUrl}`;

  // Verbose: show full request meta as JSON (like openapicmd)
  if (verbose) {
    meta(`${DIM}REQUEST META:${RESET}\n`);

    const requestMeta: Record<string, unknown> = {
      operationId,
      method,
      url,
    };
    if (req.params && Object.keys(req.params).length > 0) {
      requestMeta.params = req.params;
    }
    if (req.headers) {
      const headers: Record<string, string> = {};
      for (const [key, value] of Object.entries(req.headers)) {
        if (key.toLowerCase() === 'authorization') {
          headers[key] = 'Bearer ***';
        } else if (typeof value === 'string') {
          headers[key] = value;
        }
      }
      requestMeta.headers = headers;
    }
    meta(`${DIM}${JSON.stringify(requestMeta, null, 2)}${RESET}\n\n`);
  }

  // Response meta: --verbose and --include both show it
  if (verbose || include) {
    meta(`${DIM}RESPONSE META:${RESET}\n`);
    const responseMeta: Record<string, unknown> = {
      code: response.status,
      status: response.statusText,
    };
    if (include) {
      responseMeta.headers = response.headers;
    }
    meta(`${DIM}${JSON.stringify(responseMeta, null, 2)}${RESET}\n\n`);
  } else if (!json && isTTY) {
    // Default mode: colored METHOD + URL, then status badge with background
    const mColor = methodColor(method);
    meta(`${mColor}${BOLD}${method}${RESET} ${url}\n`);

    const bg = statusBg(response.status);
    meta(`${bg}${WHITE}${BOLD} ${response.status} ${RESET} ${response.statusText}\n`);
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

  // Output body
  if (data !== undefined && data !== null) {
    if (verbose || include) {
      meta(`${DIM}RESPONSE BODY:${RESET}\n`);
    }

    let body: string;
    if (typeof data === 'string') {
      body = `${data}\n`;
    } else if (json) {
      body = `${JSON.stringify(data)}\n`;
    } else {
      const pretty = JSON.stringify(data, null, 2);
      body = isTTY ? `${highlightJson(pretty)}\n` : `${pretty}\n`;
    }

    if (usePager) {
      pager(buf + body);
    } else {
      process.stdout.write(body);
    }
  } else {
    meta(`${DIM}(empty response)${RESET}\n`);
    if (usePager && buf) {
      pager(buf);
    }
  }
};
