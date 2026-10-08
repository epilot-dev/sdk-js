# Phone Integration API

- **Base URL:** `https://phone-integration-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/phone-integration](https://docs.epilot.io/api/phone-integration)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.phoneIntegration.batchSearchCustomers(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/phone-integration'

const phoneIntegrationClient = getClient()
authorize(phoneIntegrationClient, () => '<token>')
const { data } = await phoneIntegrationClient.batchSearchCustomers(...)
```

## Operations

**phone-integration**
- [`batchSearchCustomers`](#batchsearchcustomers)

**Schemas**
- [`CustomerBatchSearchResult`](#customerbatchsearchresult)
- [`CustomerSearchResult`](#customersearchresult)
- [`CustomerIdentifier`](#customeridentifier)
- [`CustomerSummary`](#customersummary)
- [`ErrorResponse`](#errorresponse)

### `batchSearchCustomers`

Resolves up to 50 identifiers to epilot customers (Contacts) in one
request — for example every number in an agent's call history.

`GET /v1/customer:batchSearch`

```ts
const { data } = await client.batchSearchCustomers({
  id: ['...'],
  customer_number: ['...'],
  external_id: ['...'],
  phone_number: ['...'],
  email: ['...'],
  x-trace-id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "identifier": {
        "type": "id",
        "value": "+4917012345678"
      },
      "status": "found",
      "customer": {
        "id": "dba8e5f9-8b3f-4608-b887-cd0798fce624",
        "name": "Max Mustermann",
        "customer_number": "4711"
      }
    }
  ]
}
```

</details>

---

## Schemas

### `CustomerBatchSearchResult`

```ts
type CustomerBatchSearchResult = {
  results: Array<{
    identifier: {
      type: { ... }
      value: { ... }
    }
    status: "found" | "not_found" | "ambiguous" | "invalid" | "error"
    customer?: {
      id: { ... }
      name: { ... }
      customer_number?: { ... }
    }
  }>
}
```

### `CustomerSearchResult`

```ts
type CustomerSearchResult = {
  identifier: {
    type: "id" | "customer_number" | "external_id" | "phone_number" | "email"
    value: string
  }
  status: "found" | "not_found" | "ambiguous" | "invalid" | "error"
  customer?: {
    id: string
    name: string
    customer_number?: string
  }
}
```

### `CustomerIdentifier`

```ts
type CustomerIdentifier = {
  type: "id" | "customer_number" | "external_id" | "phone_number" | "email"
  value: string
}
```

### `CustomerSummary`

Present when `status` is `found`

```ts
type CustomerSummary = {
  id: string
  name: string
  customer_number?: string
}
```

### `ErrorResponse`

```ts
type ErrorResponse = {
  status: number
  error: string
  code?: string
}
```
