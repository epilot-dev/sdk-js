import type { ParsedTerraformFile, TerraformResource } from './types.js';

/**
 * Lightweight HCL parser for epilot blueprint .tf files.
 *
 * Epilot blueprint .tf files follow predictable patterns from Speakeasy-generated
 * Terraform providers. This parser extracts resource blocks, their attributes,
 * and depends_on references without requiring a full HCL parser dependency.
 *
 * For each resource block, we extract:
 * - type and name from the resource declaration
 * - All attribute key-value pairs (including nested blocks as raw strings)
 * - depends_on arrays
 * - The raw HCL text and starting line number
 */

/** Parse a .tf file into structured TerraformResource objects */
export function parseTerraformFile(path: string, content: string): ParsedTerraformFile {
  const resources = extractResourceBlocks(content, path);
  const variables = extractVariables(content);

  return { path, resources, variables, rawContent: content };
}

/** Extract all `resource "type" "name" { ... }` blocks from HCL content */
function extractResourceBlocks(content: string, filePath: string): TerraformResource[] {
  const resources: TerraformResource[] = [];
  const lines = content.split('\n');

  // Match: resource "epilot_journey" "journey_abc123" {
  const resourceStartRegex = /^resource\s+"([^"]+)"\s+"([^"]+)"\s*\{/;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(resourceStartRegex);
    if (!match) continue;

    const type = match[1];
    const name = match[2];
    const lineStart = i + 1; // 1-indexed

    // Find the closing brace for this resource block
    const blockEnd = findClosingBrace(lines, i);
    const rawHcl = lines.slice(i, blockEnd + 1).join('\n');
    const blockContent = lines.slice(i + 1, blockEnd).join('\n');

    const attributes = parseAttributes(blockContent);
    const dependsOn = extractDependsOn(blockContent);

    resources.push({
      type,
      name,
      address: `${type}.${name}`,
      attributes,
      dependsOn,
      rawHcl,
      rawContent: rawHcl,
      file: filePath,
      lineStart,
    });
  }

  return resources;
}

/** Find the line index of the closing brace that matches the opening brace at startLine */
function findClosingBrace(lines: string[], startLine: number): number {
  let depth = 0;
  for (let i = startLine; i < lines.length; i++) {
    for (const char of lines[i]) {
      if (char === '{') depth++;
      else if (char === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return lines.length - 1;
}

/** Parse attribute key-value pairs from the body of a resource block */
function parseAttributes(blockContent: string): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};
  const lines = blockContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip comments, empty lines, lifecycle blocks, and closing braces
    if (!line || line.startsWith('#') || line.startsWith('//') || line === '}') continue;

    // Handle simple key = value assignments
    const kvMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const rawValue = kvMatch[2].trim();
      attrs[key] = parseValue(rawValue, lines, i);
      continue;
    }

    // Handle nested block: `blockname {` — store as raw string
    const blockMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\{/);
    if (blockMatch) {
      const key = blockMatch[1];
      const blockEnd = findClosingBraceInBlock(lines, i);
      const nested = lines.slice(i, blockEnd + 1).join('\n');
      // If key already exists (repeated blocks), convert to array
      if (key in attrs) {
        const existing = attrs[key];
        if (Array.isArray(existing)) {
          existing.push(nested);
        } else {
          attrs[key] = [existing, nested];
        }
      } else {
        attrs[key] = nested;
      }
      i = blockEnd;
    }
  }

  return attrs;
}

/** Parse a value string from HCL */
function parseValue(raw: string, _lines: string[], _lineIndex: number): unknown {
  // String value: "something"
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1);
  }
  // Boolean
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  // null
  if (raw === 'null') return null;
  // Number
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  // Array: [...]
  if (raw.startsWith('[') && raw.endsWith(']')) {
    return raw; // Keep as raw string for scanning
  }
  // Function calls like jsonencode(...), distinct(...)
  if (/^[a-zA-Z_]+\(/.test(raw)) {
    return raw;
  }
  // Terraform reference (bare): epilot_journey.name.attr
  return raw;
}

/** Find closing brace for a nested block starting at given index within block lines */
function findClosingBraceInBlock(lines: string[], startIndex: number): number {
  let depth = 0;
  for (let i = startIndex; i < lines.length; i++) {
    for (const char of lines[i]) {
      if (char === '{') depth++;
      else if (char === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return lines.length - 1;
}

/** Extract depends_on array from block content */
function extractDependsOn(blockContent: string): string[] {
  const match = blockContent.match(/depends_on\s*=\s*\[([^\]]*)\]/);
  if (!match) return [];

  return match[1]
    .split(',')
    .map((s) => s.trim().replace(/"/g, ''))
    .filter(Boolean);
}

/** Extract variable blocks from .tf content */
function extractVariables(content: string): Record<string, unknown> {
  const vars: Record<string, unknown> = {};
  const varRegex = /variable\s+"([^"]+)"\s*\{/g;

  for (const match of content.matchAll(varRegex)) {
    vars[match[1]] = true;
  }

  return vars;
}
