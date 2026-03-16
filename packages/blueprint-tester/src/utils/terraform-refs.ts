/**
 * Terraform reference patterns in HCL.
 *
 * In the parsed JSON from hcl2json, terraform references appear as:
 * - "${epilot_journey.name.attr}" (interpolation in strings)
 * - "epilot_journey.name.attr" (bare references in certain contexts)
 *
 * After HCL-to-JSON conversion, references appear as string expressions
 * like "${epilot_type.name.attribute}".
 */

/** Matches terraform interpolation expressions like ${resource.name.attr} */
const TF_INTERPOLATION_REGEX = /\$\{([^}]+)\}/g;

/** Matches a terraform resource reference like epilot_journey.sample.journey_id */
const TF_RESOURCE_REF_REGEX = /^[a-zA-Z_][a-zA-Z0-9_-]*\.[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*$/;

/** Check if a value contains terraform reference expressions */
export function containsTerraformRef(value: string): boolean {
  return TF_INTERPOLATION_REGEX.test(value) || TF_RESOURCE_REF_REGEX.test(value);
}

/** Extract terraform resource addresses from a value's references */
export function extractReferencedAddresses(value: string): string[] {
  const addresses: string[] = [];

  // Check interpolations: ${type.name.attr}
  for (const match of value.matchAll(TF_INTERPOLATION_REGEX)) {
    const expr = match[1].trim();
    const parts = expr.split('.');
    if (parts.length >= 2) {
      addresses.push(`${parts[0]}.${parts[1]}`);
    }
  }

  // Check bare reference
  if (TF_RESOURCE_REF_REGEX.test(value.trim())) {
    const parts = value.trim().split('.');
    addresses.push(`${parts[0]}.${parts[1]}`);
  }

  return [...new Set(addresses)];
}

/** Check if a string value is purely a terraform reference (not a literal) */
export function isReferenceExpression(value: string): boolean {
  const trimmed = value.trim();
  // Bare reference
  if (TF_RESOURCE_REF_REGEX.test(trimmed)) return true;
  // Pure interpolation: "${resource.name.attr}"
  if (/^\$\{[^}]+\}$/.test(trimmed)) return true;
  return false;
}

/** Check if value references a terraform variable like var.manifest_id */
export function isVariableReference(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.startsWith('var.') || trimmed.includes('${var.');
}
