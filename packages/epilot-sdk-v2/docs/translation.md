# Translation API

- **Base URL:** `https://translation.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/translation](https://docs.epilot.io/api/translation)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.translation.translateTexts(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/translation'

const translationClient = getClient()
authorize(translationClient, () => '<token>')
const { data } = await translationClient.translateTexts(...)
```

## Operations

**Translation**
- [`translateTexts`](#translatetexts)

**Schemas**
- [`LanguageCode`](#languagecode)
- [`TranslateTextsRequest`](#translatetextsrequest)
- [`TranslateTextsResponse`](#translatetextsresponse)
- [`Translation`](#translation)
- [`Error`](#error)

### `translateTexts`

Translates a batch of texts into `target_language`, returning one
translation per input, in the same order.

`POST /v1/translation:translate`

```ts
const { data } = await client.translateTexts(
  null,
  {
    texts: ['string'],
    target_language: 'en',
    source_language: 'en'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "translations": [
    {
      "text": "string",
      "source_language": "de"
    }
  ]
}
```

</details>

---

## Schemas

### `LanguageCode`

ISO 639-1 language code, optionally with a region (e.g. `en`, `pt-BR`)

```ts
type LanguageCode = string
```

### `TranslateTextsRequest`

```ts
type TranslateTextsRequest = {
  texts: string[]
  target_language: string
  source_language?: string
}
```

### `TranslateTextsResponse`

```ts
type TranslateTextsResponse = {
  translations: Array<{
    text: string
    source_language: string
  }>
}
```

### `Translation`

```ts
type Translation = {
  text: string
  source_language: string
}
```

### `Error`

```ts
type Error = {
  status: number
  error: string
}
```
