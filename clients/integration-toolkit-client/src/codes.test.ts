import { describe, expect, it } from 'vitest';

import { HTTP_STATUS_CODE_FAMILY, MONITORING_CODES, describeMonitoringCode } from './codes';
import openapi from './openapi.json';

/**
 * The catalog is generated from erp-integration-api's snapshot, while the code union
 * comes from the spec's `MonitoringCode` enum. They are refreshed by two different
 * commands (`codes:local` and `openapi:local`), so running only one of them is the
 * realistic way this package ships an inconsistent pair. These tests catch that.
 */
describe('monitoring code catalog', () => {
  const specCodes: string[] = (
    openapi as never as {
      components: { schemas: { MonitoringCode: { enum: string[] } } };
    }
  ).components.schemas.MonitoringCode.enum;

  it('covers exactly the codes in the spec enum', () => {
    expect(Object.keys(MONITORING_CODES).sort()).toEqual([...specCodes].sort());
  });

  it('gives every code a level and a non-empty description', () => {
    for (const [code, meta] of Object.entries(MONITORING_CODES)) {
      expect(meta.level, code).toMatch(/^(success|error|warning|info)$/);
      expect(meta.description.trim(), code).not.toBe('');
    }
  });

  it('describes a known code', () => {
    expect(describeMonitoringCode('ENTITY_CREATED')?.level).toBe('success');
    expect(describeMonitoringCode('ACK_TIMEOUT')?.level).toBe('warning');
  });

  it('describes the HTTP_{status} family, which is not in the enum', () => {
    expect(specCodes).not.toContain('HTTP_502');
    expect(describeMonitoringCode('HTTP_502')).toEqual({
      level: HTTP_STATUS_CODE_FAMILY.level,
      description: HTTP_STATUS_CODE_FAMILY.description,
    });
  });

  it('returns undefined for a code it cannot place, so callers can fall back', () => {
    expect(describeMonitoringCode('SOMETHING_FROM_THE_FUTURE')).toBeUndefined();
    expect(describeMonitoringCode('HTTP_50')).toBeUndefined();
  });
});
