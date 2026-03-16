import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';

interface UrlPattern {
  name: string;
  regex: RegExp;
}

const ENV_URL_PATTERNS: UrlPattern[] = [
  { name: 'sandbox URL', regex: /sandbox[.\-_][a-z]+\.epilot\.cloud/gi },
  { name: 'staging URL', regex: /staging[.\-_][a-z]+\.epilot\.cloud/gi },
  { name: 'dev URL', regex: /dev[.\-_][a-z]+\.epilot\.cloud/gi },
  { name: 'localhost URL', regex: /(?:localhost|127\.0\.0\.1)(?::\d+)?/g },
  { name: 'org-specific S3 path', regex: /(?:s3:\/\/|amazonaws\.com\/)[^\s"']*\d{5,}[^\s"']*/g },
  { name: 'internal service URL', regex: /https?:\/\/[a-z-]+\.sls\.epilot\.io/g },
];

export const environmentUrlsRule: ValidationRule = {
  id: 'environment-url',
  name: 'Environment-Specific URL Detection',
  description: 'Detects sandbox, staging, dev URLs, and org-specific S3 paths that should not transfer between orgs',
  severity: 'info',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    for (const file of context.files) {
      for (const resource of file.resources) {
        for (const pattern of ENV_URL_PATTERNS) {
          pattern.regex.lastIndex = 0;
          const matches = [...resource.rawHcl.matchAll(pattern.regex)];

          for (const match of matches) {
            issues.push({
              ruleId: 'environment-url',
              severity: 'info',
              message: `Found ${pattern.name}: "${match[0]}". This may be environment-specific and could need updating in the target org.`,
              file: resource.file,
              line: resource.lineStart,
              resourceAddress: resource.address,
              value: match[0],
            });
          }
        }
      }
    }

    return issues;
  },
};
