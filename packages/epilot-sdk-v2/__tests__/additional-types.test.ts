import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { SRC_DIR, clientsWith } from './helpers/clients';
import type { AvailabilityDate, Cart, PriceTierEnhanced } from '../src/apis/pricing';

const TYPES_DIR = resolve(SRC_DIR, 'types');
const APIS_DIR = resolve(SRC_DIR, 'apis');

/**
 * Types that are hand-written in a client's `additional-types.ts` (i.e. not part
 * of the OpenAPI specification) must stay reachable through the SDK, otherwise
 * consumers migrating from `@epilot/<x>-client` to `@epilot/sdk/<x>` have to
 * re-declare them. See clients/pricing-client/src/additional-types.ts.
 */
describe('additional types are exposed by the SDK', () => {
  const clientsWithAdditionalTypes = clientsWith('additional-types.ts');

  it('finds at least one client with additional types', () => {
    expect(clientsWithAdditionalTypes.length).toBeGreaterThan(0);
  });

  it.each(clientsWithAdditionalTypes)('$dirName additional types are copied and re-exported', ({ kebabName }) => {
    const copied = resolve(TYPES_DIR, `${kebabName}-additional.d.ts`);
    expect(existsSync(copied), `${copied} is missing — run pnpm generate-sdk`).toBe(true);

    // The copied file must not keep pointing at the client's own './openapi'.
    expect(readFileSync(copied, 'utf-8')).not.toMatch(/from '\.\/openapi'/);

    const apiFile = readFileSync(resolve(APIS_DIR, `${kebabName}.ts`), 'utf-8');
    expect(apiFile).toContain(`export type * from '../types/${kebabName}-additional'`);
  });

  it('exposes the pricing additional types through @epilot/sdk/pricing', () => {
    const tier: PriceTierEnhanced = { unit_amount_gross: 119, unit_amount_gross_decimal: '119.00' };
    const availability: AvailabilityDate = { available_start_date: '2017-07-21' };
    const cart: Cart = { id: 'cart-1', status: 'draft' };

    expect(tier.unit_amount_gross).toBe(119);
    expect(availability.available_start_date).toBe('2017-07-21');
    expect(cart.id).toBe('cart-1');
  });
});
