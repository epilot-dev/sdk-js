import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { sourceOrgRefsRule } from '../../src/rules/source-org-refs.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string, sourceOrgId?: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return sourceOrgRefsRule.validate({ files, resourceIndex, options: { sourceOrgId } });
}

describe('source-org-refs rule', () => {
  it('flags hardcoded org_id', () => {
    const tf = `
resource "epilot_journey" "j1" {
  org_id = "911690"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues[0].ruleId).toBe('source-org-ref');
    expect(issues[0].severity).toBe('error');
  });

  it('flags hardcoded organization_id', () => {
    const tf = `
resource "epilot_journey" "j1" {
  organization_id = "739224"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });

  it('identifies source org match', () => {
    const tf = `
resource "epilot_journey" "j1" {
  org_id = "911690"
}`;
    const issues = runRule(tf, '911690');
    expect(issues.some((i) => i.message.includes('matches source org'))).toBe(true);
  });

  it('does NOT flag terraform variable references', () => {
    const tf = `
resource "epilot_journey" "j1" {
  org_id = var.target_org_id
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('flags org_id in jsonencode blocks', () => {
    const tf = `
resource "epilot_journey" "j1" {
  journey = jsonencode({"organization_id": "911690", "name": "test"})
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });
});
