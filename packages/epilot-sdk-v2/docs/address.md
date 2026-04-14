# Address API

- **Base URL:** `https://address.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/address](https://docs.epilot.io/api/address)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.address.getAddressSuggestions(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/address'

const addressClient = getClient()
authorize(addressClient, () => '<token>')
const { data } = await addressClient.getAddressSuggestions(...)
```

## Operations

**Address Suggestion**
- [`getAddressSuggestions`](#getaddresssuggestions)

**Availability**
- [`availabilityCheck`](#availabilitycheck)
- [`validateAvailabilityFile`](#validateavailabilityfile)

**Schemas**
- [`AvailabilityCheckParams`](#availabilitycheckparams)
- [`AvailabilityFilters`](#availabilityfilters)
- [`AvailabilityDate`](#availabilitydate)
- [`AvailabilityLocation`](#availabilitylocation)
- [`AvailabilityResult`](#availabilityresult)
- [`ValidateAvailabilityFileResult`](#validateavailabilityfileresult)
- [`ValidateAvailabilityFileError`](#validateavailabilityfileerror)
- [`AddressSuggestion`](#addresssuggestion)
- [`AddressSuggestions`](#addresssuggestions)
- [`ErrorResponse`](#errorresponse)

### `getAddressSuggestions`

Get address suggestions for the given Availability File

`GET /v1/public/suggestions`

```ts
const { data } = await client.getAddressSuggestions({
  fileRef: 'example',
  countryCodeSearchTerm: 'example',
  postalCodeSearchTerm: 'example',
  streetSearchTerm: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "country": "st",
    "postal_code": "string",
    "city": "string",
    "street": "string",
    "street_number": "string"
  }
]
```

</details>

---

### `availabilityCheck`

Check for Entities that contain a matching availability range in related availability files.

`POST /v1/public/availability`

```ts
const { data } = await client.availabilityCheck(
  null,
  {},
)
```

<details>
<summary>Response</summary>

```json
{
  "available_entities": [],
  "check_results": [
    {
      "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe36",
      "matching_hits": 0
    },
    {
      "entity_id": "72c803b2-2e5d-4bd6-bffc-fad998bbbe37",
      "matching_hits": 0
    }
  ]
}
```

</details>

---

### `validateAvailabilityFile`

Validates an already uploaded availability file, it returns an array of errors if any errors are found in the file.

`GET /v1/availability/{id}/validate`

```ts
const { data } = await client.validateAvailabilityFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "status": "success",
  "rules_parsed_count": 0,
  "errors": [
    {
      "line": 0,
      "message": "string",
      "data": "string"
    }
  ]
}
```

</details>

---

## Schemas

### `AvailabilityCheckParams`

```ts
type AvailabilityCheckParams = {
  entities: string // uuid[]
  schemas?: string[]
  filters: {
    location: {
      street?: { ... }
      street_number?: { ... }
      postal_code?: { ... }
      city?: { ... }
      country?: { ... }
    }
    available_date?: string // date
  }
}
```

### `AvailabilityFilters`

Availability filters dimensions

```ts
type AvailabilityFilters = {
  location: {
    street?: string
    street_number?: string
    postal_code?: string
    city?: string
    country?: string
  }
  available_date?: string // date
}
```

### `AvailabilityDate`

A value to be matched against the availability window (start & end date)

```ts
type AvailabilityDate = string // date
```

### `AvailabilityLocation`

```ts
type AvailabilityLocation = {
  street?: string
  street_number?: string
  postal_code?: string
  city?: string
  country?: string
}
```

### `AvailabilityResult`

The availability check result payload

```ts
type AvailabilityResult = {
  available_entities: string[]
  check_results: Array<{
    entity_id: string // uuid
    matching_hits: number
    matching_error?: object
  }>
}
```

### `ValidateAvailabilityFileResult`

The availability map file result payload

```ts
type ValidateAvailabilityFileResult = {
  status: "success" | "error"
  rules_parsed_count: number
  errors: Array<{
    line?: number
    message: string
    data?: string
  }>
}
```

### `ValidateAvailabilityFileError`

The availability rule error

```ts
type ValidateAvailabilityFileError = {
  line?: number
  message: string
  data?: string
}
```

### `AddressSuggestion`

The address suggestions entity

```ts
type AddressSuggestion = {
  country?: string
  postal_code?: string // postal-code
  city?: string // city
  street?: string // street-address
  street_number?: string // street-number
}
```

### `AddressSuggestions`

The address suggestions entity array

```ts
type AddressSuggestions = Array<{
  country?: string
  postal_code?: string // postal-code
  city?: string // city
  street?: string // street-address
  street_number?: string // street-number
}>
```

### `ErrorResponse`

```ts
type ErrorResponse = {
  error: string
}
```
