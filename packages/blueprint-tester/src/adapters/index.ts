import { readFileSync } from 'node:fs';
import type { BlueprintData, BlueprintManifest } from '../types.js';
import { fromManifestJson, fromResourceArray } from './json-adapter.js';
import { fromTerraformZip } from './terraform-adapter.js';

export { fromTerraformZip } from './terraform-adapter.js';
export { fromManifestJson, fromResourceArray } from './json-adapter.js';

export type BlueprintInput =
  | Buffer // ZIP file buffer
  | string // file path (ZIP or JSON)
  | BlueprintManifest // API response
  | BlueprintData; // Already normalized

/** Auto-detect input format and normalize to BlueprintData */
export function normalizeBlueprintInput(input: BlueprintInput): BlueprintData {
  // Already normalized
  if (isBlueprintData(input)) {
    return input;
  }

  // Buffer — treat as ZIP
  if (Buffer.isBuffer(input)) {
    return fromTerraformZip(input);
  }

  // String — file path
  if (typeof input === 'string') {
    return fromFilePath(input);
  }

  // Object — check if it's a manifest or resource array
  if (typeof input === 'object' && input !== null) {
    if ('blueprint_id' in input) {
      return fromManifestJson(input as BlueprintManifest);
    }
    if ('resources' in input && Array.isArray((input as Record<string, unknown>).resources)) {
      return fromResourceArray((input as Record<string, unknown>).resources as never[]);
    }
  }

  throw new Error('Unsupported blueprint input format. Expected ZIP buffer, file path, blueprint manifest, or BlueprintData.');
}

function fromFilePath(filePath: string): BlueprintData {
  const content = readFileSync(filePath);

  if (filePath.endsWith('.json')) {
    const json = JSON.parse(content.toString('utf-8'));
    if (json.blueprint_id) {
      return fromManifestJson(json);
    }
    if (json.resources && Array.isArray(json.resources)) {
      return fromResourceArray(json.resources, { blueprintId: json.blueprint_id });
    }
    throw new Error(`JSON file does not contain a recognized blueprint format: ${filePath}`);
  }

  // Default: treat as ZIP
  return fromTerraformZip(content);
}

function isBlueprintData(input: unknown): input is BlueprintData {
  return (
    typeof input === 'object' &&
    input !== null &&
    'resources' in input &&
    'format' in input &&
    'sourceFiles' in input &&
    Array.isArray((input as BlueprintData).resources)
  );
}
