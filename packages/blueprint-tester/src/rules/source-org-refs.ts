import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';
import { isReferenceExpression, isVariableReference } from '../utils/terraform-refs.js';

/** Attribute keys that typically hold org IDs */
const ORG_ID_KEYS = new Set(['org_id', 'organization_id', 'source_org_id', 'target_org_id']);

/** Pattern for numeric org IDs (epilot org IDs are typically 5-10 digit numbers) */
const NUMERIC_ORG_ID_REGEX = /^\d{4,10}$/;

export const sourceOrgRefsRule: ValidationRule = {
  id: 'source-org-ref',
  name: 'Source Org Reference Detection',
  description: 'Detects hardcoded organization IDs that should be Terraform variables',
  severity: 'error',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const { options } = context;

    for (const file of context.files) {
      for (const resource of file.resources) {
        checkAttributes(resource.attributes, '', (path, key, value) => {
          if (typeof value !== 'string') return;
          if (isReferenceExpression(value)) return;
          if (isVariableReference(value)) return;

          // Check if the key is an org_id field with a hardcoded value
          if (ORG_ID_KEYS.has(key) && NUMERIC_ORG_ID_REGEX.test(value)) {
            const isSourceOrg = options.sourceOrgId && value === options.sourceOrgId;
            issues.push({
              ruleId: 'source-org-ref',
              severity: 'error',
              message: `Hardcoded organization ID "${value}" in "${path}"${isSourceOrg ? ' (matches source org)' : ''}. This should be a Terraform variable reference like var.target_org_id.`,
              file: resource.file,
              line: resource.lineStart,
              resourceAddress: resource.address,
              attributePath: path,
              value,
            });
          }
        });

        // Also scan raw HCL for org_id patterns in jsonencode blocks
        const orgIdInJson = resource.rawHcl.match(/"org(?:anization)?_id"\s*[:=]\s*"?(\d{4,10})"?/g);
        if (orgIdInJson) {
          for (const match of orgIdInJson) {
            const valueMatch = match.match(/(\d{4,10})/);
            if (valueMatch) {
              issues.push({
                ruleId: 'source-org-ref',
                severity: 'error',
                message: `Hardcoded organization ID "${valueMatch[1]}" found in resource body. This should not transfer between orgs.`,
                file: resource.file,
                line: resource.lineStart,
                resourceAddress: resource.address,
                value: valueMatch[1],
              });
            }
          }
        }
      }
    }

    return deduplicateIssues(issues);
  },
};

function checkAttributes(
  attrs: Record<string, unknown>,
  prefix: string,
  callback: (path: string, key: string, value: unknown) => void,
): void {
  for (const [key, value] of Object.entries(attrs)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      callback(path, key, value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      checkAttributes(value as Record<string, unknown>, path, callback);
    }
  }
}

function deduplicateIssues(issues: ValidationIssue[]): ValidationIssue[] {
  const seen = new Set<string>();
  return issues.filter((issue) => {
    const key = `${issue.resourceAddress}:${issue.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
