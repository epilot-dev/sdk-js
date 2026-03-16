import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';
import { containsTerraformRef, isReferenceExpression, isVariableReference } from '../utils/terraform-refs.js';
import { extractUuids, isLocalUuid } from '../utils/uuid.js';

export const danglingUuidsRule: ValidationRule = {
  id: 'dangling-uuid',
  name: 'Dangling UUID Detection',
  description: 'Detects hardcoded UUIDs in attribute values that do not match any resource in the blueprint',
  severity: 'error',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const { resourceIndex, options, format } = context;
    const isTerraform = format === 'terraform';
    const safeUuids = new Set((options.knownSafeUuids ?? []).map((u) => u.toLowerCase()));

    for (const file of context.files) {
      for (const resource of file.resources) {
        scanAttributeValues(resource.attributes, '', (path, value) => {
          if (typeof value !== 'string') return;

          // For terraform format, skip properly referenced values
          if (isTerraform) {
            if (isReferenceExpression(value)) return;
            if (isVariableReference(value)) return;
            if (containsTerraformRef(value)) return;
          }

          const uuids = extractUuids(value);
          for (const uuid of uuids) {
            const lower = uuid.toLowerCase();

            // Safe: UUID belongs to a resource in this blueprint
            if (isLocalUuid(lower, resourceIndex.allUuidsInIdentifiers)) continue;
            // Safe: explicitly allowlisted
            if (safeUuids.has(lower)) continue;

            issues.push({
              ruleId: 'dangling-uuid',
              severity: 'error',
              message: `UUID "${uuid}" in attribute "${path}" does not match any resource in the blueprint. This likely references a resource in the source org that was not exported.`,
              file: resource.file,
              line: resource.lineStart,
              resourceAddress: resource.address,
              attributePath: path,
              value: uuid,
            });
          }
        });
      }
    }

    return issues;
  },
};

/** Recursively walk attribute values, calling callback for each leaf value */
function scanAttributeValues(
  attrs: Record<string, unknown>,
  prefix: string,
  callback: (path: string, value: unknown) => void,
): void {
  for (const [key, value] of Object.entries(attrs)) {
    const path = prefix ? `${prefix}.${key}` : key;

    // Skip lifecycle and depends_on — not user-facing attributes
    if (key === 'lifecycle' || key === 'depends_on') continue;

    if (typeof value === 'string') {
      callback(path, value);
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string') {
          callback(`${path}[${i}]`, value[i]);
        } else if (typeof value[i] === 'object' && value[i] !== null) {
          scanAttributeValues(value[i] as Record<string, unknown>, `${path}[${i}]`, callback);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      scanAttributeValues(value as Record<string, unknown>, path, callback);
    }
  }
}
