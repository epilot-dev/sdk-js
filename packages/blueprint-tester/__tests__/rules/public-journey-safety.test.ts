import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { publicJourneySafetyRule } from '../../src/rules/public-journey-safety.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return publicJourneySafetyRule.validate({ files, resourceIndex, options: {}, format: 'terraform' });
}

describe('public-journey-safety rule', () => {
  it('flags public journey with hardcoded mappings_automation_id', () => {
    const tf = `
resource "epilot_journey" "j1" {
  access_mode = "PUBLIC"
  mappings_automation_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues[0].ruleId).toBe('public-journey-safety');
    expect(issues[0].attributePath).toBe('mappings_automation_id');
  });

  it('does NOT flag private journey with hardcoded ID', () => {
    const tf = `
resource "epilot_journey" "j1" {
  access_mode = "PRIVATE"
  mappings_automation_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag public journey with terraform ref', () => {
    const tf = `
resource "epilot_journey" "j1" {
  access_mode = "PUBLIC"
  mappings_automation_id = epilot_automation.auto_1.id
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('flags public journey with hardcoded organization_id in body', () => {
    const tf = `
resource "epilot_journey" "j1" {
  access_mode = "PUBLIC"
  journey = jsonencode({"organization_id": "911690", "name": "test"})
}`;
    const issues = runRule(tf);
    expect(issues.some((i) => i.message.includes('organization_id'))).toBe(true);
  });

  it('does NOT flag non-journey resources', () => {
    const tf = `
resource "epilot_automation" "a1" {
  access_mode = "PUBLIC"
  mappings_automation_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
