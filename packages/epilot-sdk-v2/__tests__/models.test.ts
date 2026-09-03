import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { CLIENTS_DIR, SRC_DIR, clientsWith } from './helpers/clients';
import { DynamicTariffModeValues, PricingModelValues } from '../src/apis/pricing';
import { RELATION_ATTRIBUTE_TYPES, RELATION_ATTRIBUTE_TYPE_LIST, RelationAffinityMode } from '../src/apis/entity';
import { OVERRIDABLE_ATTRIBUTE_TYPES, OVERRIDABLE_ATTRIBUTE_TYPE_LIST } from '../src/apis/pricing';

const MODELS_DIR = resolve(SRC_DIR, 'models');

const readSpec = (dirName: string) => {
  const specPath = ['src/openapi.json', 'src/openapi-runtime.json']
    .map((rel) => resolve(CLIENTS_DIR, dirName, rel))
    .find(existsSync);

  return specPath ? JSON.parse(readFileSync(specPath, 'utf-8')) : undefined;
};

/**
 * A client's `schema-model.ts` carries runtime values, not just types. It must be
 * copied as a real `.ts` and re-exported with `export *` — copied as a `.d.ts` (the
 * treatment `additional-types.ts` gets) every one of these would type-check and then
 * be `undefined` for SDK consumers. See scripts/generate-sdk-v2.ts `copyModels`.
 */
describe('runtime models are exposed by the SDK', () => {
  const clientsWithModels = clientsWith('schema-model.ts');

  it('finds at least one client with a schema model', () => {
    // Guards against the generator silently skipping every client, which is
    // otherwise a green build that quietly exports nothing.
    expect(clientsWithModels.length).toBeGreaterThan(0);
  });

  it.each(clientsWithModels)('$dirName model is copied into the SDK', ({ kebabName }) => {
    const copied = resolve(MODELS_DIR, `${kebabName}-model.ts`);
    expect(existsSync(copied), `${copied} is missing — run pnpm generate-sdk`).toBe(true);

    // The copied file must not keep pointing at the client's own './openapi'.
    expect(readFileSync(copied, 'utf-8')).not.toMatch(/from '\.\/openapi'/);
  });

  it.each(clientsWithModels)('$dirName model values survive to runtime', async ({ dirName, kebabName }) => {
    const source = readFileSync(resolve(CLIENTS_DIR, dirName, 'src/schema-model.ts'), 'utf-8');
    const exported = [...source.matchAll(/^export (?:const|enum) (\w+)/gm)].map(([, name]) => name);
    expect(exported.length).toBeGreaterThan(0);

    const api = await import(`../src/apis/${kebabName}`);
    for (const name of exported) {
      expect(api[name], `${name} is not a runtime value in @epilot/sdk/${kebabName}`).toBeDefined();
    }
  });

  // The `<SpecType>Values` naming convention is what ties a hand-written map back to
  // the schema it mirrors, in both directions: a spec member gained or lost fails here.
  it.each(clientsWithModels)('$dirName `<SpecType>Values` maps match their spec enum', async ({
    dirName,
    kebabName,
  }) => {
    const schemas = readSpec(dirName)?.components?.schemas ?? {};
    const api = await import(`../src/apis/${kebabName}`);

    for (const name of Object.keys(api).filter((key) => key.endsWith('Values'))) {
      const specName = name.replace(/Values$/, '');
      const specEnum = schemas[specName]?.enum;

      // A map whose name resolves to no spec enum is silently unchecked, which is
      // the drift this test exists to catch — the suffix is the whole tie.
      expect(specEnum, `${name} matches no components.schemas.${specName}.enum — check the name`).toBeDefined();
      expect(Object.values(api[name]).sort(), `${name} has drifted from the spec`).toEqual([...specEnum].sort());
    }
  });

  // Both lists hold entity attribute types. The pricing one has no compile-time
  // anchor, so this is its only drift guard.
  it('attribute-type allowlists only contain types the entity spec declares', () => {
    type Schema = { allOf?: Schema[]; properties?: { type?: { enum?: string[] } } };

    const schemas: Record<string, Schema> = readSpec('entity-client').components.schemas;
    const variants = (schemas.Attribute as unknown as { anyOf: { $ref: string }[] }).anyOf;
    const declared = new Set(
      variants
        .map(({ $ref }) => schemas[$ref.split('/').pop() as string])
        // A variant may declare `type` directly or behind an allOf composition.
        .flatMap((variant) => (variant.allOf ?? [variant]).flatMap((part) => part.properties?.type?.enum ?? [])),
    );
    expect(declared.size).toBeGreaterThan(0);

    for (const list of [RELATION_ATTRIBUTE_TYPE_LIST, OVERRIDABLE_ATTRIBUTE_TYPE_LIST]) {
      expect(list.length).toBeGreaterThan(0);
      for (const type of list) {
        expect(declared.has(type), `"${type}" is not a type any Attribute variant declares`).toBe(true);
      }
    }
  });

  it('allowlist sets are usable for lookup with an unnarrowed string', () => {
    expect(RELATION_ATTRIBUTE_TYPES.has('relation_payment_method')).toBe(true);
    expect(RELATION_ATTRIBUTE_TYPES.has('string')).toBe(false);
    expect(OVERRIDABLE_ATTRIBUTE_TYPES.has('currency')).toBe(true);
    // `ordered_list` ships in the stock product schema and must stay non-overridable.
    expect(OVERRIDABLE_ATTRIBUTE_TYPES.has('ordered_list')).toBe(false);
  });

  it('every relation type is overridable — a variant swaps the whole $relation list', () => {
    for (const type of RELATION_ATTRIBUTE_TYPE_LIST) {
      expect(OVERRIDABLE_ATTRIBUTE_TYPES.has(type), `"${type}" should be overridable`).toBe(true);
    }
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
