#!/usr/bin/env node
/**
 * Generates src/codes.ts — the monitoring code catalog — from the snapshot
 * erp-integration-api emits.
 *
 * The descriptions and levels are owned by the producer
 * (packages/erp-utils/src/monitoring/code-catalog.ts), where a code without a
 * description is a compile error and the snapshot is asserted in CI. This script
 * turns that artifact into a published module, so the integration hub and any other
 * consumer import the catalog instead of hand-copying it — which is what let a
 * frontend become the source of truth for a backend taxonomy in the first place.
 *
 * The code UNION type is not defined here: it comes from the OpenAPI spec as
 * `Components.Schemas.MonitoringCode` and is re-exported by src/codes.ts, so there is
 * exactly one definition of the list.
 *
 * The file is named schema-model.ts because that is the ONE hand-written module the
 * SDK generator copies into @epilot/sdk as real runtime values (additional-types.ts
 * lands as a .d.ts, which would leave every value undefined). It is also in the
 * auto-release trigger list, so the catalog reaches @epilot/sdk on merge without a
 * separate client release. See CONTRIBUTING.md.
 *
 * Usage: npm run codes:local
 * Assumes erp-integration-api is checked out at ../../../erp-integration-api.
 */

const fs = require('node:fs');
const path = require('node:path');

const SNAPSHOT = path.resolve(
  __dirname,
  '../../../../erp-integration-api/packages/erp-utils/src/monitoring/__snapshots__/monitoring-codes.json',
);
const OUT = path.resolve(__dirname, '../src/schema-model.ts');

const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8'));
const codes = [...snapshot.codes].sort((a, b) => a.code.localeCompare(b.code));
const family = snapshot.families[0];

const quote = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const entries = codes
  .map((c) => `  ${c.code}: { level: ${quote(c.level)}, description: ${quote(c.description)} },`)
  .join('\n');

const out = `/* eslint-disable */
/**
 * DO NOT MODIFY - GENERATED FROM erp-integration-api
 *
 * Monitoring code catalog: the level and operator-facing description for every code
 * the Integration Toolkit emits. Regenerate with \`npm run codes:local\`.
 */

import type { Components } from './openapi';

/**
 * Every monitoring code the toolkit itself emits.
 *
 * Local alias only — the public \`MonitoringCode\` type is exported from './openapi',
 * generated from the spec's enum. Re-exporting it here would collide with that.
 */
type MonitoringCode = Components.Schemas.MonitoringCode;

/** The level a code is always emitted at. */
export type MonitoringCodeLevel = 'success' | 'error' | 'warning' | 'info';

export interface MonitoringCodeMeta {
  level: MonitoringCodeLevel;
  description: string;
}

/**
 * Upstream HTTP statuses are emitted as a family rather than as taxonomy members,
 * because the status is unbounded. They are emitted at \`warning\`.
 */
export const HTTP_STATUS_CODE_FAMILY = {
  pattern: ${quote(family.pattern)},
  level: ${quote(family.level)} as MonitoringCodeLevel,
  description: ${quote(family.description)},
} as const;

const HTTP_STATUS_CODE_PATTERN = /^HTTP_\\d{3}$/;

/** Level and description per taxonomy code. */
export const MONITORING_CODES: Record<MonitoringCode, MonitoringCodeMeta> = {
${entries}
};

/**
 * Describes any code seen on a monitoring event, including the \`HTTP_{status}\`
 * family and codes this package predates. Returns \`undefined\` only for a code it
 * cannot place at all, so callers can render a sensible fallback.
 */
export function describeMonitoringCode(
  code: string,
): MonitoringCodeMeta | undefined {
  const known = (MONITORING_CODES as Record<string, MonitoringCodeMeta>)[code];
  if (known) return known;

  if (HTTP_STATUS_CODE_PATTERN.test(code)) {
    return {
      level: HTTP_STATUS_CODE_FAMILY.level,
      description: HTTP_STATUS_CODE_FAMILY.description,
    };
  }

  return undefined;
}
`;

fs.writeFileSync(OUT, out);

// Format the generated file with the repo's formatter, so `codes:local` always leaves
// the tree lint-clean and a regeneration never shows up as a formatting diff.
try {
  require('node:child_process').execFileSync('npx', ['biome', 'check', '--write', path.relative(process.cwd(), OUT)], {
    stdio: 'ignore',
  });
} catch {
  console.warn('biome formatting skipped (run `npm run lint` to check)');
}

console.log(`Wrote ${path.relative(process.cwd(), OUT)} — ${codes.length} codes + the ${family.pattern} family`);
