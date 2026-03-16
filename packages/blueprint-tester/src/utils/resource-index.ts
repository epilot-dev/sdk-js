import type { BlueprintData, BlueprintResource, ParsedTerraformFile, ResourceIndex } from '../types.js';
import { extractUuidFromResourceName } from './uuid.js';

/** Build a searchable index from BlueprintData */
export function buildResourceIndexFromData(data: BlueprintData): ResourceIndex {
  const byAddress = new Map<string, BlueprintResource>();
  const byType = new Map<string, BlueprintResource[]>();
  const allAddresses = new Set<string>();
  const allUuidsInIdentifiers = new Set<string>();

  for (const resource of data.resources) {
    byAddress.set(resource.address, resource);
    allAddresses.add(resource.address);

    const existing = byType.get(resource.type) ?? [];
    existing.push(resource);
    byType.set(resource.type, existing);

    const uuid = extractUuidFromResourceName(resource.name);
    if (uuid) {
      allUuidsInIdentifiers.add(uuid.toLowerCase());
    }
  }

  return { byAddress, byType, allAddresses, allUuidsInIdentifiers };
}

/** Build a searchable index of all resources across all parsed .tf files */
export function buildResourceIndex(files: ParsedTerraformFile[]): ResourceIndex {
  const byAddress = new Map<string, BlueprintResource>();
  const byType = new Map<string, BlueprintResource[]>();
  const allAddresses = new Set<string>();
  const allUuidsInIdentifiers = new Set<string>();

  for (const file of files) {
    for (const resource of file.resources) {
      const blueprintResource: BlueprintResource = {
        type: resource.type,
        name: resource.name,
        address: resource.address,
        attributes: resource.attributes,
        dependsOn: resource.dependsOn,
        rawContent: resource.rawContent ?? resource.rawHcl,
        source: resource.file,
        lineStart: resource.lineStart,
      };

      byAddress.set(resource.address, blueprintResource);
      allAddresses.add(resource.address);

      const existing = byType.get(resource.type) ?? [];
      existing.push(blueprintResource);
      byType.set(resource.type, existing);

      const uuid = extractUuidFromResourceName(resource.name);
      if (uuid) {
        allUuidsInIdentifiers.add(uuid.toLowerCase());
      }
    }
  }

  return { byAddress, byType, allAddresses, allUuidsInIdentifiers };
}
