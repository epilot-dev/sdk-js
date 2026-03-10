# Pricing Tier API

- **API Docs:** [https://docs.epilot.io/api/pricing-tier](https://docs.epilot.io/api/pricing-tier)

Pricing Tier API

## Quick Start

```bash
# List available operations
epilot pricing-tier

# Call an operation
epilot pricing-tier getCurrentPricingTier
```

## Operations

**Pricing Tier**
- [`getCurrentPricingTier`](#getcurrentpricingtier) — Get current pricing tier of logged in user

### `getCurrentPricingTier`

Get current pricing tier of logged in user

`GET /v2/pricing-tiers/me`

**Sample Call**

```bash
epilot pricing-tier getCurrentPricingTier
```

With JSONata filter:

```bash
epilot pricing-tier getCurrentPricingTier --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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
