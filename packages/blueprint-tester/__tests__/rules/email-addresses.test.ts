import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { emailAddressesRule } from '../../src/rules/email-addresses.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return emailAddressesRule.validate({ files, resourceIndex, options: {} });
}

describe('email-addresses rule', () => {
  it('detects hardcoded email addresses', () => {
    const tf = `
resource "epilot_emailtemplate" "template1" {
  to = "john.doe@company.com"
  subject = "Welcome"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues[0].ruleId).toBe('email-address');
    expect(issues[0].value).toBe('john.doe@company.com');
  });

  it('does NOT flag noreply addresses', () => {
    const tf = `
resource "epilot_emailtemplate" "template1" {
  from = "noreply@epilot.cloud"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag no-reply addresses', () => {
    const tf = `
resource "epilot_emailtemplate" "template1" {
  from = "no-reply@company.com"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag resources without emails', () => {
    const tf = `
resource "epilot_journey" "j1" {
  name = "My Journey"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
