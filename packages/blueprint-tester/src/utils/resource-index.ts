import type { ParsedTerraformFile, ResourceIndex, TerraformResource } from '../types.js';
import { extractUuidFromResourceName } from './uuid.js';

/** Build a searchable index of all resources across all parsed .tf files */
export function buildResourceIndex(files: ParsedTerraformFile[]): ResourceIndex {
  const byAddress = new Map<string, TerraformResource>();
  const byType = new Map<string, TerraformResource[]>();
  const allAddresses = new Set<string>();
  const allUuidsInIdentifiers = new Set<string>();

  for (const file of files) {
    for (const resource of file.resources) {
      byAddress.set(resource.address, resource);
      allAddresses.add(resource.address);

      const existing = byType.get(resource.type) ?? [];
      existing.push(resource);
      byType.set(resource.type, existing);

      // Extract UUID from the resource name (e.g., "journey_abc123def456...")
      const uuid = extractUuidFromResourceName(resource.name);
      if (uuid) {
        allUuidsInIdentifiers.add(uuid.toLowerCase());
      }
    }
  }

  return { byAddress, byType, allAddresses, allUuidsInIdentifiers };
}
