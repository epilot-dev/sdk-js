import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { incompleteWebhooksRule } from '../../src/rules/incomplete-webhooks.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return incompleteWebhooksRule.validate({ files, resourceIndex, options: {}, format: 'terraform' });
}

describe('incomplete-webhooks rule', () => {
  it('flags webhook with hardcoded URL', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  url = "https://api.sandbox.example.com/webhook"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues[0].ruleId).toBe('incomplete-webhook');
    expect(issues[0].attributePath).toBe('url');
  });

  it('flags webhook with embedded auth', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  url = "https://example.com/webhook"
  oauth_secret = "my-secret-value"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT flag webhook with variable URL', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  url = var.webhook_url
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag non-webhook resources', () => {
    const tf = `
resource "epilot_journey" "j1" {
  url = "https://example.com/journey"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
