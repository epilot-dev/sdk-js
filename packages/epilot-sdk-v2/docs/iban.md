# Iban API

- **Base URL:** `https://iban-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/iban](https://docs.epilot.io/api/iban)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.iban.validateIban(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/iban'

const ibanClient = await getClient()
authorize(ibanClient, () => '<token>')
const { data } = await ibanClient.validateIban(...)
```

## Operations

**Ibans**
- [`validateIban`](#validateiban)

**Schemas**
- [`Error`](#error)

### `validateIban`

Validate an Iban

`POST /v1/public/iban:validate`

```ts
const { data } = await client.validateIban(
  null,
  {
    iban: 'string'
  },
)
```

---

## Schemas

### `Error`

Error

```ts
type Error = {
  status?: string
  error?: string
}
```
