import type { TerraformResource, ValidationContext, ValidationIssue, ValidationRule } from '../types.js';
import { isReferenceExpression, isVariableReference } from '../utils/terraform-refs.js';

const WEBHOOK_TYPES = new Set([
  'epilot_webhook',
  'epilot-webhooks_webhook',
]);

export const incompleteWebhooksRule: ValidationRule = {
  id: 'incomplete-webhook',
  name: 'Incomplete Webhook Detection',
  description: 'Flags webhooks with hardcoded URLs or embedded auth credentials that will break in the target org',
  severity: 'warning',

  validate(context: ValidationContext): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const isTerraform = context.format === 'terraform';

    for (const file of context.files) {
      for (const resource of file.resources) {
        if (!WEBHOOK_TYPES.has(resource.type)) continue;

        checkForHardcodedUrl(resource, issues, isTerraform);
        checkForEmbeddedAuth(resource, issues);
      }
    }

    // Also check automation resources that contain webhook actions
    for (const file of context.files) {
      for (const resource of file.resources) {
        if (!resource.type.includes('automation')) continue;
        checkAutomationWebhookActions(resource, issues);
      }
    }

    return issues;
  },
};

function checkForHardcodedUrl(resource: TerraformResource, issues: ValidationIssue[], isTerraform: boolean): void {
  for (const [key, value] of Object.entries(resource.attributes)) {
    if (key !== 'url' && key !== 'webhook_url' && key !== 'endpoint') continue;
    if (typeof value !== 'string') continue;
    if (isTerraform) {
      if (isReferenceExpression(value)) continue;
      if (isVariableReference(value)) continue;
    }

    if (value.startsWith('http://') || value.startsWith('https://')) {
      issues.push({
        ruleId: 'incomplete-webhook',
        severity: 'warning',
        message: `Webhook has hardcoded URL "${truncateUrl(value)}". This URL is specific to the source org and will likely need to be updated after install.`,
        file: resource.file,
        line: resource.lineStart,
        resourceAddress: resource.address,
        attributePath: key,
        value: truncateUrl(value),
      });
    }
  }
}

function checkForEmbeddedAuth(resource: TerraformResource, issues: ValidationIssue[]): void {
  const rawContent = resource.rawContent ?? resource.rawHcl;
  const authPatterns = [
    /oauth_secret["'\s]*[:=]["'\s]*["'][^"']+["']/i,
    /auth_token["'\s]*[:=]["'\s]*["'][^"']+["']/i,
    /api_key["'\s]*[:=]["'\s]*["'][^"']+["']/i,
  ];

  for (const pattern of authPatterns) {
    if (pattern.test(rawContent)) {
      issues.push({
        ruleId: 'incomplete-webhook',
        severity: 'warning',
        message: 'Webhook contains embedded authentication credentials. These should be configured manually after install or use environment variables.',
        file: resource.file,
        line: resource.lineStart,
        resourceAddress: resource.address,
      });
      break;
    }
  }
}

function checkAutomationWebhookActions(resource: TerraformResource, issues: ValidationIssue[]): void {
  const rawContent = resource.rawContent ?? resource.rawHcl;
  const webhookUrlInAction = rawContent.match(/(?:webhook_url|url)["'\s]*[:=]["'\s]*["'](https?:\/\/[^"']+)["']/g);
  if (webhookUrlInAction) {
    for (const match of webhookUrlInAction) {
      const urlMatch = match.match(/(https?:\/\/[^"']+)/);
      if (urlMatch) {
        issues.push({
          ruleId: 'incomplete-webhook',
          severity: 'warning',
          message: `Automation contains hardcoded webhook URL "${truncateUrl(urlMatch[1])}". This may need to be updated for the target org.`,
          file: resource.file,
          line: resource.lineStart,
          resourceAddress: resource.address,
          value: truncateUrl(urlMatch[1]),
        });
      }
    }
  }
}

function truncateUrl(url: string): string {
  return url.length > 60 ? `${url.slice(0, 57)}...` : url;
}
