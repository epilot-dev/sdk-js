import { resolve } from 'node:path';
import AdmZip from 'adm-zip';
import { describe, expect, it } from 'vitest';
import { validateBlueprint } from '../src/validator.js';

function createBlueprintZip(files: Record<string, string>): Buffer {
  const zip = new AdmZip();
  for (const [name, content] of Object.entries(files)) {
    zip.addFile(name, Buffer.from(content, 'utf-8'));
  }
  return zip.toBuffer();
}

describe('validateBlueprint', () => {
  it('returns clean report for a well-formed blueprint', async () => {
    const zip = createBlueprintZip({
      'main.tf': `
variable "manifest_id" {
  type = string
}

resource "epilot_journey" "journey_abc123def456abc123def456abc123de" {
  lifecycle {
    prevent_destroy = true
  }
  manifest = distinct([var.manifest_id])
  name = "My Journey"
  access_mode = "PRIVATE"
}

resource "epilot_automation" "auto_def456abc123def456abc123def456ab" {
  name = "My Automation"
  journey_id = epilot_journey.journey_abc123def456abc123def456abc123de.journey_id
  depends_on = [epilot_journey.journey_abc123def456abc123def456abc123de]
}`,
    });

    const report = await validateBlueprint(zip);
    expect(report.valid).toBe(true);
    expect(report.summary.errors).toBe(0);
    expect(report.summary.filesScanned).toBe(1);
    expect(report.summary.resourcesFound).toBe(2);
    expect(report.metadata.resourceTypes).toHaveProperty('epilot_journey');
    expect(report.metadata.resourceTypes).toHaveProperty('epilot_automation');
  });

  it('detects dangling UUIDs in a broken blueprint', async () => {
    const zip = createBlueprintZip({
      'main.tf': `
resource "epilot_automation" "auto_abc123def456abc123def456abc123de" {
  journey_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
}`,
    });

    const report = await validateBlueprint(zip);
    expect(report.valid).toBe(false);
    expect(report.summary.errors).toBeGreaterThanOrEqual(1);
    expect(report.issues.some((i) => i.ruleId === 'dangling-uuid')).toBe(true);
  });

  it('detects source org references', async () => {
    const zip = createBlueprintZip({
      'journey.tf': `
resource "epilot_journey" "j1" {
  org_id = "911690"
  name = "Journey"
}`,
    });

    const report = await validateBlueprint(zip, { sourceOrgId: '911690' });
    expect(report.valid).toBe(false);
    expect(report.issues.some((i) => i.ruleId === 'source-org-ref')).toBe(true);
    expect(report.issues.some((i) => i.message.includes('matches source org'))).toBe(true);
  });

  it('detects tokens and secrets', async () => {
    const zip = createBlueprintZip({
      'webhook.tf': `
resource "epilot_webhook" "wh1" {
  token_id = "api_5ZugdRXasLfWBypHi93Fk"
  url = "https://example.com/webhook"
}`,
    });

    const report = await validateBlueprint(zip);
    expect(report.issues.some((i) => i.ruleId === 'token-detection')).toBe(true);
  });

  it('respects rule filtering', async () => {
    const zip = createBlueprintZip({
      'main.tf': `
resource "epilot_automation" "auto_abc123def456abc123def456abc123de" {
  journey_id = "d11995ae-368e-4ad3-bf1c-51d6449f8afc"
  org_id = "911690"
}`,
    });

    // Only run dangling-uuid rule
    const report = await validateBlueprint(zip, { rules: ['dangling-uuid'] });
    expect(report.issues.every((i) => i.ruleId === 'dangling-uuid')).toBe(true);
  });

  it('respects severity filtering', async () => {
    const zip = createBlueprintZip({
      'main.tf': `
resource "epilot_webhook" "wh1" {
  url = "https://sandbox-api.epilot.cloud/webhook"
  secret = "my-secret-123456789"
}`,
    });

    // Only show errors (should filter out warnings and infos)
    const report = await validateBlueprint(zip, { severity: 'error' });
    expect(report.issues.every((i) => i.severity === 'error')).toBe(true);
  });

  it('handles empty ZIP gracefully', async () => {
    const zip = createBlueprintZip({});
    const report = await validateBlueprint(zip);
    expect(report.valid).toBe(true);
    expect(report.summary.filesScanned).toBe(0);
  });

  it('handles ZIP with no .tf files', async () => {
    const zip = createBlueprintZip({ 'readme.md': '# Blueprint' });
    const report = await validateBlueprint(zip);
    expect(report.valid).toBe(true);
    expect(report.summary.filesScanned).toBe(0);
  });
});
