import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { environmentUrlsRule } from '../../src/rules/environment-urls.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return environmentUrlsRule.validate({ files, resourceIndex, options: {} });
}

describe('environment-urls rule', () => {
  it('detects sandbox URLs', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  url = "https://sandbox-api.epilot.cloud/webhook"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(issues[0].ruleId).toBe('environment-url');
    expect(issues[0].severity).toBe('info');
  });

  it('detects localhost URLs', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  url = "http://localhost:3000/api"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });

  it('detects internal service URLs', () => {
    const tf = `
resource "epilot_webhook" "wh1" {
  url = "https://entity-api.sls.epilot.io/v1/entities"
}`;
    const issues = runRule(tf);
    expect(issues.length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT flag normal production URLs', () => {
    const tf = `
resource "epilot_journey" "j1" {
  name = "test"
  slug = "my-journey"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
