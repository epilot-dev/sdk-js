import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { DynamicTariffModeValues, PricingModelValues } from '../src/apis/pricing';
import { RelationAffinityMode } from '../src/apis/entity';

const CLIENTS_DIR = resolve(__dirname, '../../../clients');
const MODELS_DIR = resolve(__dirname, '../src/models');
const APIS_DIR = resolve(__dirname, '../src/apis');

/**
 * A client's `schema-model.ts` carries runtime values, not just types. It must be
 * copied as a real `.ts` and re-exported with `export *` — copied as a `.d.ts` (the
 * treatment `additional-types.ts` gets) every one of these would type-check and then
 * be `undefined` for SDK consumers. See scripts/generate-sdk-v2.ts `copyModels`.
 */
describe('runtime models are exposed by the SDK', () => {
  const clientsWithModels = readdirSync(CLIENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.endsWith('-client'))
    .filter((d) => existsSync(resolve(CLIENTS_DIR, d.name, 'src/schema-model.ts')))
    .map((d) => ({ dirName: d.name, kebabName: d.name.replace(/-client$/, '') }));

  it('finds at least one client with a schema model', () => {
    expect(clientsWithModels.length).toBeGreaterThan(0);
  });

  it.each(clientsWithModels)('$dirName model is copied and re-exported as values', ({ kebabName }) => {
    const copied = resolve(MODELS_DIR, `${kebabName}-model.ts`);
    expect(existsSync(copied), `${copied} is missing — run pnpm generate-sdk`).toBe(true);

    // A .d.ts alongside it would shadow the values away again.
    expect(existsSync(resolve(MODELS_DIR, `${kebabName}-model.d.ts`))).toBe(false);

    // The copied file must not keep pointing at the client's own './openapi'.
    expect(readFileSync(copied, 'utf-8')).not.toMatch(/from '\.\/openapi'/);

    const apiFile = readFileSync(resolve(APIS_DIR, `${kebabName}.ts`), 'utf-8');
    expect(apiFile).toContain(`export * from '../models/${kebabName}-model'`);
    expect(apiFile).not.toContain(`export type * from '../models/${kebabName}-model'`);
  });

  it('exposes the entity relation affinity enum through @epilot/sdk/entity', () => {
    expect(RelationAffinityMode.WEAK).toBe('weak');
    expect(RelationAffinityMode.STRONG).toBe('strong');
  });

  it('exposes the pricing enum values through @epilot/sdk/pricing', () => {
    expect(PricingModelValues.perUnit).toBe('per_unit');
    expect(Object.values(PricingModelValues)).toContain('external_getag');
    expect(DynamicTariffModeValues.manual).toBe('manual');
  });
});
