import type { ValidationContext, ValidationIssue, ValidationRule } from '../types.js';

interface TokenPattern {
  name: string;
  regex: RegExp;
}

const TOKEN_PATTERNS: TokenPattern[] = [
  { name: 'API key (api_ prefix)', regex: /api_[A-Za-z0-9]{15,}/g },
  { name: 'Stripe secret key', regex: /sk_live_[A-Za-z0-9]+/g },
  { name: 'Stripe publishable key', regex: /pk_live_[A-Za-z0-9]+/g },
  { name: 'Bearer token', regex: /Bearer\s+[A-Za-z0-9\-._~+/]{20,}=*/g },
  { name: 'OAuth client secret', regex: /client_secret["'\s:=]+["']?[A-Za-z0-9\-._~+/]{15,}/g },
  { name: 'Authorization header value', regex: /[Aa]uthorization["'\s:=]+["']?(?:Bearer|Basic|Token)\s+[A-Za-z0-9\-._~+/]{10,}/g },
  { name: 'Token in URL query param', regex: /[?&](?:token|key|api_key|access_token|secret)=[A-Za-z0-9\-._~+/]{10,}/g },
  { name: 'AWS access key', regex: /AKIA[A-Z0-9]{16}/g },
  { name: 'Generic secret assignment', regex: /(?:secret|password|passwd|api_key|apikey)["'\s]*[:=]["'\s]*["'][^"']{8,}["']/gi },
];

export const tokenDetectionRule: ValidationRule = {
  id: 'token-detection',
  name: 'Token/Secret Detection',
  description: 'Scans for API keys, bearer tokens, OAuth secrets, and other credentials that should not be in blueprints',
  severity: 'warning',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    for (const file of context.files) {
      for (const resource of file.resources) {
        const content = resource.rawContent ?? resource.rawHcl;
        for (const pattern of TOKEN_PATTERNS) {
          // Reset regex state
          pattern.regex.lastIndex = 0;
          const matches = [...content.matchAll(pattern.regex)];

          for (const match of matches) {
            const rawValue = match[0];
            // Truncate for safety: show first 8 chars + ***
            const truncated = rawValue.length > 12 ? `${rawValue.slice(0, 12)}***` : rawValue;

            issues.push({
              ruleId: 'token-detection',
              severity: 'warning',
              message: `Possible ${pattern.name} detected: "${truncated}". Credentials should not be included in blueprints.`,
              file: resource.file,
              line: resource.lineStart,
              resourceAddress: resource.address,
              value: truncated,
            });
          }
        }
      }
    }

    return issues;
  },
};
