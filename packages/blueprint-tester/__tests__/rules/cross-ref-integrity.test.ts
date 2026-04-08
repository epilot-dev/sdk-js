import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { crossRefIntegrityRule } from '../../src/rules/cross-ref-integrity.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return crossRefIntegrityRule.validate({ files, resourceIndex, options: {}, format: 'terraform' });
}

describe('cross-ref-integrity rule', () => {
  it('flags depends_on referencing non-existent resource', () => {
    const tf = `
resource "epilot_automation" "auto_1" {
  name = "Automation"
  depends_on = [epilot_journey.missing_journey]
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(1);
    expect(issues[0].ruleId).toBe('cross-ref-integrity');
    expect(issues[0].attributePath).toBe('depends_on');
    expect(issues[0].value).toBe('epilot_journey.missing_journey');
  });

  it('does NOT flag depends_on referencing existing resource', () => {
    const tf = `
resource "epilot_journey" "journey_1" {
  name = "Journey"
}

resource "epilot_automation" "auto_1" {
  name = "Automation"
  depends_on = [epilot_journey.journey_1]
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('flags terraform reference to non-existent resource', () => {
    const tf = `
resource "epilot_automation" "auto_1" {
  journey_id = "\${epilot_journey.missing.journey_id}"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(1);
    expect(issues[0].value).toBe('epilot_journey.missing');
  });

  it('does NOT flag terraform reference to existing resource', () => {
    const tf = `
resource "epilot_journey" "sample" {
  name = "Journey"
}

resource "epilot_automation" "auto_1" {
  journey_id = "\${epilot_journey.sample.journey_id}"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag variable references', () => {
    const tf = `
resource "epilot_journey" "j1" {
  manifest = "\${var.manifest_id}"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
