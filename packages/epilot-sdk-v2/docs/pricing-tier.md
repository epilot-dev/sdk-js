# Pricing Tier API

**Full API Docs:** [https://docs.epilot.io/api/pricing-tier](https://docs.epilot.io/api/pricing-tier)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')

// Call operations directly (lazy singleton under the hood)
const { data } = await epilot.pricingTier.getCurrentPricingTier(...)

// Or get the client explicitly
const pricingTierClient = await epilot.pricingTier.getClient()
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/pricing-tier'

const pricingTierClient = await getClient()
authorize(pricingTierClient, () => '<token>')
const { data } = await pricingTierClient.getCurrentPricingTier(...)

// Or create a fresh (non-singleton) client
import { createClient } from '@epilot/sdk/pricing-tier'
const fresh = await createClient()
authorize(fresh, () => '<token>')
```

## Operations

**Pricing Tier**
- [`getCurrentPricingTier`](#getcurrentpricingtier)

### `getCurrentPricingTier`

Get current pricing tier of logged in user

`GET /v2/pricing-tiers/me`

```ts
const { data } = await client.getCurrentPricingTier()
```

**Response**

```json
{
  "id": 22,
  "created_date": "string",
  "updated_date": "string",
  "organization_id": "string",
  "name": "string",
  "settings": {},
  "override_settings": {},
  "created_by": "string",
  "updated_by": "string",
  "is_pure_360": true
}
```

---

## Schemas

### `PricingTier`

```ts
type PricingTier = {
  id?: string
  created_date?: string
  updated_date?: string
  organization_id?: string
  name?: string
  settings?: Record<string, unknown>
  override_settings?: Record<string, unknown>
  created_by?: string
  updated_by?: string
  is_pure_360?: boolean
}
```
