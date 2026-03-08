# Address Suggestions API

- **Base URL:** `https://address-suggestions-api.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/address-suggestions](https://docs.epilot.io/api/address-suggestions)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.addressSuggestions.getAddresses(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/address-suggestions'

const addressSuggestionsClient = await getClient()
authorize(addressSuggestionsClient, () => '<token>')
const { data } = await addressSuggestionsClient.getAddresses(...)
```

## Operations

**Addresses API**
- [`getAddresses`](#getaddresses)
- [`checkAvailability`](#checkavailability)
- [`validateAddressesFile`](#validateaddressesfile)

### `getAddresses`

get addresses from file

`GET /v1/public/suggestions`

```ts
const { data } = await client.getAddresses({
  X-Epilot-Org-ID: 'example',
  s3FileUrl: 'example',
  fileId: 'example',
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
    "country": "string",
    "postal_code": "string",
    "city": "string",
    "street": "string",
    "street_number": "string"
  }
]
```

</details>

---

### `checkAvailability`

Check address availability

`GET /v1/public/availability:check`

```ts
const { data } = await client.checkAvailability({
  X-Epilot-Org-ID: 'example',
  files: 'example',
  countryCode: 'example',
  postalCode: 'example',
  street: 'example',
  streetNumber: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "fileId": "4e7b7d95-ced6-4f5f-9326-0c61f30dcadb"
}
```

</details>

---

### `validateAddressesFile`

validate addresses file

`GET /v1/addresses-files:validate`

```ts
const { data } = await client.validateAddressesFile({
  fileId: 'example',
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
      "msg": "string",
      "data": "string"
    }
  ]
}
```

</details>

---

<details>
<summary>Schemas</summary>

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

```ts
type AvailabilityResult = {
  fileId?: string
}
```

### `Error`

```ts
type Error = {
  message: string
  status?: number
  cause?: string
}
```

### `AddressSuggestion`

The address suggestions entity

```ts
type AddressSuggestion = {
  country?: string
  postal_code?: string
  city?: string
  street?: string
  street_number?: string
}
```

### `AddressSuggestions`

The address suggestions entity array

```ts
type AddressSuggestions = Array<{
  country?: string
  postal_code?: string
  city?: string
  street?: string
  street_number?: string
}>
```

### `ValidateAddressSuggestionsFileResult`

The availability map file result payload

```ts
type ValidateAddressSuggestionsFileResult = {
  status?: "success" | "error"
  rules_parsed_count?: number
  errors?: Array<{
    line?: number
    msg: string
    data?: string
  }>
}
```

### `ValidateAddressFileResult`

The address file validation result payload

```ts
type ValidateAddressFileResult = {
  status?: "success" | "error"
  rules_parsed_count?: number
  errors?: Array<{
    line?: number
    msg: string
    data?: string
  }>
}
```

### `AddressSuggestionError`

The availability rule error

```ts
type AddressSuggestionError = {
  line?: number
  msg: string
  data?: string
}
```

### `ValidateAddressFileError`

The address rule error

```ts
type ValidateAddressFileError = {
  line?: number
  msg: string
  data?: string
}
```

</details>