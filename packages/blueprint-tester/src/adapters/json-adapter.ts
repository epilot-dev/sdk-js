import type { BlueprintData, BlueprintManifest, BlueprintResource, ManifestResource } from '../types.js';

/** Convert a blueprint manifest JSON (from getBlueprint API) to BlueprintData */
export function fromManifestJson(manifest: BlueprintManifest): BlueprintData {
  const resources: BlueprintResource[] = (manifest.resources ?? []).map(manifestResourceToBlueprint);

  return {
    resources,
    variables: {},
    sourceFiles: ['api'],
    format: 'json',
    metadata: {
      blueprintId: manifest.blueprint_id,
      sourceType: manifest.source_type,
    },
  };
}

/** Convert a raw array of resources (with configs) to BlueprintData */
export function fromResourceArray(
  resources: ManifestResource[],
  metadata?: { blueprintId?: string; sourceOrgId?: string },
): BlueprintData {
  return {
    resources: resources.map(manifestResourceToBlueprint),
    variables: {},
    sourceFiles: ['json'],
    format: 'json',
    metadata,
  };
}

function manifestResourceToBlueprint(res: ManifestResource): BlueprintResource {
  const config = res.config ?? {};
  const rawContent = JSON.stringify(config, null, 2);

  return {
    type: normalizeResourceType(res.type),
    name: res.name ?? res.id,
    address: res.address ?? `${normalizeResourceType(res.type)}.${res.id}`,
    attributes: flattenConfig(config),
    dependsOn: res.depends_on_addresses ?? [],
    rawContent,
    source: 'api',
    lineStart: undefined,
  };
}

/** Normalize resource type to match terraform resource types (e.g., "journey" → "epilot_journey") */
function normalizeResourceType(type: string): string {
  if (type.startsWith('epilot_') || type.startsWith('epilot-')) return type;
  return `epilot_${type}`;
}

/** Flatten nested config into a flat attribute map for rule scanning */
function flattenConfig(config: Record<string, unknown>): Record<string, unknown> {
  // Keep the original structure — rules handle nested scanning already
  return config;
}
