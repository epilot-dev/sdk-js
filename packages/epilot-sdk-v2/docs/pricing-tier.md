# Pricing Tier API

- **Full API Docs:** [https://docs.epilot.io/api/pricing-tier](https://docs.epilot.io/api/pricing-tier)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.pricingTier.getCurrentPricingTier(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/pricing-tier'

const pricingTierClient = await getClient()
authorize(pricingTierClient, () => '<token>')
const { data } = await pricingTierClient.getCurrentPricingTier(...)
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

<details>
<summary>Response</summary>

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

</details>

---

<details>
<summary>Schemas</summary>

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

</details>