import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { tokenDetectionRule } from '../../src/rules/token-detection.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return tokenDetectionRule.validate({ files, resourceIndex, options: {} });
}

describe('token-detection rule', () => {
  it('detects API key patterns', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  token_id = "api_5ZugdRXasLfWBypHi93Fk"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues[0].ruleId).toBe('token-detection');
    expect(issues[0].severity).toBe('warning');
    // Value should be truncated
    expect(issues[0].value).toContain('***');
  });

  it('detects Bearer tokens', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  auth_header = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.test"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });

  it('detects secrets in assignments', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  secret = "my-super-secret-value-123"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT flag normal attribute values', () => {
    const tf = `
resource "epilot_journey" "j1" {
  name = "My Journey"
  slug = "my-journey"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
