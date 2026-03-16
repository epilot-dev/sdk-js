import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';
import { extractReferencedAddresses } from '../utils/terraform-refs.js';

export const crossRefIntegrityRule: ValidationRule = {
  id: 'cross-ref-integrity',
  name: 'Cross-Reference Integrity',
  description: 'Ensures all depends_on and resource references point to resources that exist in the blueprint',
  severity: 'error',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const { resourceIndex } = context;

    for (const file of context.files) {
      for (const resource of file.resources) {
        // Check depends_on references
        for (const dep of resource.dependsOn) {
          if (!resourceIndex.allAddresses.has(dep)) {
            issues.push({
              ruleId: 'cross-ref-integrity',
              severity: 'error',
              message: `depends_on references "${dep}" which does not exist in the blueprint. The dependency was likely not exported.`,
              file: resource.file,
              line: resource.lineStart,
              resourceAddress: resource.address,
              attributePath: 'depends_on',
              value: dep,
            });
          }
        }

        // Check terraform references in attribute values
        scanForReferences(resource.attributes, '', (path, value) => {
          if (typeof value !== 'string') return;

          const addresses = extractReferencedAddresses(value);
          for (const addr of addresses) {
            // Skip variable references (var.xxx)
            if (addr.startsWith('var.')) continue;
            // Skip data source references (data.xxx)
            if (addr.startsWith('data.')) continue;

            if (!resourceIndex.allAddresses.has(addr)) {
              issues.push({
                ruleId: 'cross-ref-integrity',
                severity: 'error',
                message: `References resource "${addr}" which does not exist in the blueprint. The referenced resource was likely not exported.`,
                file: resource.file,
                line: resource.lineStart,
                resourceAddress: resource.address,
                attributePath: path,
                value: addr,
              });
            }
          }
        });
      }
    }

    return issues;
  },
};

function scanForReferences(
  attrs: Record<string, unknown>,
  prefix: string,
  callback: (path: string, value: unknown) => void,
): void {
  for (const [key, value] of Object.entries(attrs)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (key === 'lifecycle' || key === 'depends_on') continue;

    if (typeof value === 'string') {
      callback(path, value);
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'string') {
          callback(`${path}[${i}]`, value[i]);
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      scanForReferences(value as Record<string, unknown>, path, callback);
    }
  }
}
