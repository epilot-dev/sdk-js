import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../../src/hcl-parser.js';
import { danglingUuidsRule } from '../../src/rules/dangling-uuids.js';
import type { ValidatorOptions } from '../../src/types.js';
import { buildResourceIndex } from '../../src/utils/resource-index.js';

function runRule(tfContent: string, options: ValidatorOptions = {}) {
  const file = parseTerraformFile('main.tf', tfContent);
  const files = [file];
  const resourceIndex = buildResourceIndex(files);
  return danglingUuidsRule.validate({ files, resourceIndex, options, format: 'terraform' });
}

describe('dangling-uuids rule', () => {
  it('flags a hardcoded UUID in an attribute', () => {
    const tf = `
resource "epilot_automation" "auto_abc123def456abc123def456abc123de" {
  journey_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(1);
    expect(issues[0].ruleId).toBe('dangling-uuid');
    expect(issues[0].severity).toBe('error');
    expect(issues[0].attributePath).toBe('journey_id');
    expect(issues[0].value).toBe('d11995ae-368e-4ad3-bf1c-51d6449f8afc');
  });

  it('does NOT flag a terraform reference', () => {
    const tf = `
resource "epilot_automation" "auto_1" {
  journey_id = epilot_journey.sample.journey_id
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag a UUID that matches another resource identifier', () => {
    const tf = `
resource "epilot_journey" "journey_d11995ae368e4ad3bf1c51d6449f8afc" {
  name = "My Journey"
}

resource "epilot_automation" "auto_abc123def456abc123def456abc123de" {
  journey_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag UUIDs in knownSafeUuids', () => {
    const tf = `
resource "epilot_automation" "auto_abc123def456abc123def456abc123de" {
  some_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`;
    const issues = runRule(tf, {
      knownSafeUuids: ['d11995ae-368e-4ad3-bf1c-51d6449f8afc'],
    });
    expect(issues).toHaveLength(0);
  });

  it('does NOT flag variable references', () => {
    const tf = `
resource "epilot_journey" "j1" {
  manifest = "distinct([var.manifest_id])"
}`;
    // This is stored as a string that contains "var." — the rule checks containsTerraformRef
    // Actually the value would be stored as the raw function call string
    const issues = runRule(tf);
    // The UUID regex won't match "var.manifest_id" since it's not a UUID format
    expect(issues).toHaveLength(0);
  });

  it('flags multiple dangling UUIDs in the same resource', () => {
    const tf = `
resource "epilot_automation" "auto_abc123def456abc123def456abc123de" {
  journey_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
  mapping_id = "e22fb48b-479f-5be4-cf2d-62e7550a9bfd"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(2);
  });

  it('does NOT flag terraform interpolation expressions', () => {
    const tf = `
resource "epilot_automation" "auto_1" {
  journey_id = "\${epilot_journey.sample.journey_id}"
}`;
    const issues = runRule(tf);
    expect(issues).toHaveLength(0);
  });
});
