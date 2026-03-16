/** Matches UUID v4 format (case-insensitive) */
const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;

/** Matches UUID without dashes (as used in terraform resource names) */
const UUID_NO_DASH_REGEX = /[0-9a-f]{32}/gi;

/** Extract all UUIDs from a string */
export function extractUuids(text: string): string[] {
  return [...text.matchAll(UUID_REGEX)].map((m) => m[0].toLowerCase());
}

/** Extract UUID suffix from a terraform resource name like "journey_abc12345def..." */
export function extractUuidFromResourceName(name: string): string | null {
  const noDashMatches = [...name.matchAll(UUID_NO_DASH_REGEX)];
  if (noDashMatches.length === 0) return null;

  // Take the last match (resource names typically end with the UUID)
  const hex = noDashMatches[noDashMatches.length - 1][0];
  // Convert to dashed format for comparison
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Check if a UUID appears in any resource identifier across the blueprint */
export function isLocalUuid(uuid: string, identifierUuids: Set<string>): boolean {
  return identifierUuids.has(uuid.toLowerCase());
}
