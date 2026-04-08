import { describe, expect, it } from 'vitest';
import { parseTerraformFile } from '../src/hcl-parser.js';

describe('parseTerraformFile', () => {
  it('parses a simple resource block', () => {
    const content = `
resource "epilot_journey" "sample_journey_abc123" {
  name = "My Journey"
  access_mode = "PUBLIC"
}`;
    const result = parseTerraformFile('main.tf', content);

    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].type).toBe('epilot_journey');
    expect(result.resources[0].name).toBe('sample_journey_abc123');
    expect(result.resources[0].address).toBe('epilot_journey.sample_journey_abc123');
    expect(result.resources[0].attributes.name).toBe('My Journey');
    expect(result.resources[0].attributes.access_mode).toBe('PUBLIC');
  });

  it('parses multiple resource blocks', () => {
    const content = `
resource "epilot_journey" "journey_1" {
  name = "Journey 1"
}

resource "epilot_automation" "auto_1" {
  name = "Automation 1"
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources).toHaveLength(2);
    expect(result.resources[0].type).toBe('epilot_journey');
    expect(result.resources[1].type).toBe('epilot_automation');
  });

  it('parses depends_on arrays', () => {
    const content = `
resource "epilot_automation" "auto_1" {
  name = "Automation"
  depends_on = [epilot_journey.journey_1, epilot_schema.contact]
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources[0].dependsOn).toEqual([
      'epilot_journey.journey_1',
      'epilot_schema.contact',
    ]);
  });

  it('parses nested blocks', () => {
    const content = `
resource "epilot_automation" "auto_1" {
  trigger {
    type = "journey_submission"
    journey_id = "abc-123"
  }
  name = "Automation"
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources[0].attributes.trigger).toBeDefined();
    expect(result.resources[0].attributes.name).toBe('Automation');
  });

  it('parses boolean and null values', () => {
    const content = `
resource "epilot_journey" "j1" {
  is_active = true
  is_deleted = false
  description = null
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources[0].attributes.is_active).toBe(true);
    expect(result.resources[0].attributes.is_deleted).toBe(false);
    expect(result.resources[0].attributes.description).toBe(null);
  });

  it('preserves terraform references as strings', () => {
    const content = `
resource "epilot_automation" "auto_1" {
  journey_id = epilot_journey.sample.journey_id
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources[0].attributes.journey_id).toBe(
      'epilot_journey.sample.journey_id',
    );
  });

  it('parses variables', () => {
    const content = `
variable "manifest_id" {
  type = string
}

variable "target_org_id" {
  type = string
}

resource "epilot_journey" "j1" {
  name = "test"
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.variables).toHaveProperty('manifest_id');
    expect(result.variables).toHaveProperty('target_org_id');
  });

  it('tracks line numbers', () => {
    const content = `
resource "epilot_journey" "j1" {
  name = "test"
}

resource "epilot_automation" "a1" {
  name = "auto"
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources[0].lineStart).toBe(2);
    expect(result.resources[1].lineStart).toBe(6);
  });

  it('handles lifecycle blocks', () => {
    const content = `
resource "epilot-taxonomy_taxonomy_classification" "tax_abc123" {
  lifecycle {
    prevent_destroy = true
  }
  manifest = distinct([var.manifest_id])
  name = "Test Classification"
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].attributes.name).toBe('Test Classification');
  });

  it('handles jsonencode function calls', () => {
    const content = `
resource "epilot_journey" "j1" {
  journey = jsonencode({"steps": [{"name": "step1"}]})
  name = "test"
}`;
    const result = parseTerraformFile('main.tf', content);
    expect(result.resources[0].attributes.journey).toContain('jsonencode');
  });
});
