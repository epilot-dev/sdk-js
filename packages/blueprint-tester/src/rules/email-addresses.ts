import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/** Email patterns that are safe/expected in blueprint files */
const SAFE_PATTERNS = [
  /^noreply@/i,
  /^no-reply@/i,
  /^manifest@epilot/i,
  /^support@epilot/i,
  /^\{\{.*\}\}$/, // Template variables like {{email}}
];

export const emailAddressesRule: ValidationRule = {
  id: 'email-address',
  name: 'Hardcoded Email Address Detection',
  description: 'Flags literal email addresses in templates and configs that may be source-org specific',
  severity: 'info',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    for (const file of context.files) {
      for (const resource of file.resources) {
        const content = resource.rawContent ?? resource.rawHcl;
        EMAIL_REGEX.lastIndex = 0;
        const matches = [...content.matchAll(EMAIL_REGEX)];

        for (const match of matches) {
          const email = match[0];

          // Skip safe patterns
          if (SAFE_PATTERNS.some((p) => p.test(email))) continue;

          issues.push({
            ruleId: 'email-address',
            severity: 'info',
            message: `Found email address "${email}". This may be specific to the source org and need updating after install.`,
            file: resource.file,
            line: resource.lineStart,
            resourceAddress: resource.address,
            value: email,
          });
        }
      }
    }

    return issues;
  },
};
