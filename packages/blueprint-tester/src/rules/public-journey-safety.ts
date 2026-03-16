import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';
import { isReferenceExpression, isVariableReference } from '../utils/terraform-refs.js';
import { extractUuids } from '../utils/uuid.js';

const JOURNEY_TYPES = new Set([
  'epilot_journey',
  'epilot-journey_journey',
]);

/** Attribute keys in journey resources that reference other resources and must be terraform refs */
const CRITICAL_REF_KEYS = new Set([
  'mappings_automation_id',
  'design_id',
  'automation_id',
]);

export const publicJourneySafetyRule: ValidationRule = {
  id: 'public-journey-safety',
  name: 'Public Journey Safety',
  description: 'Checks that public journeys have all critical references properly terraformed to prevent wrong-org submissions',
  severity: 'warning',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    for (const file of context.files) {
      for (const resource of file.resources) {
        if (!JOURNEY_TYPES.has(resource.type)) continue;

        const isPublic = isPublicJourney(resource.attributes, resource.rawHcl);
        if (!isPublic) continue;

        // Check critical reference attributes
        checkCriticalRefs(resource, issues);

        // Check for hardcoded organization_id in the journey body
        checkOrgIdInJourney(resource, issues);
      }
    }

    return issues;
  },
};

function isPublicJourney(attrs: Record<string, unknown>, rawHcl: string): boolean {
  if (attrs.access_mode === 'PUBLIC') return true;
  // Also check in raw HCL for nested access_mode within jsonencode
  if (/access_mode["'\s]*[:=]["'\s]*["']?PUBLIC/i.test(rawHcl)) return true;
  return false;
}

function checkCriticalRefs(resource: import('../types.js').TerraformResource, issues: ValidationIssue[]): void {
  for (const [key, value] of Object.entries(resource.attributes)) {
    if (!CRITICAL_REF_KEYS.has(key)) continue;
    if (typeof value !== 'string') continue;
    if (isReferenceExpression(value)) continue;
    if (isVariableReference(value)) continue;

    const uuids = extractUuids(value);
    if (uuids.length > 0) {
      issues.push({
        ruleId: 'public-journey-safety',
        severity: 'warning',
        message: `Public journey has hardcoded "${key}" = "${value}". This should be a Terraform reference to prevent submissions routing to the source org.`,
        file: resource.file,
        line: resource.lineStart,
        resourceAddress: resource.address,
        attributePath: key,
        value,
      });
    }
  }
}

function checkOrgIdInJourney(resource: import('../types.js').TerraformResource, issues: ValidationIssue[]): void {
  const orgIdMatch = resource.rawHcl.match(/organization_id["'\s]*[:=]["'\s]*["']?(\d{4,10})/);
  if (orgIdMatch) {
    issues.push({
      ruleId: 'public-journey-safety',
      severity: 'warning',
      message: `Public journey contains hardcoded organization_id "${orgIdMatch[1]}". Submissions may be routed to the source org instead of the target.`,
      file: resource.file,
      line: resource.lineStart,
      resourceAddress: resource.address,
      attributePath: 'organization_id',
      value: orgIdMatch[1],
    });
  }
}
