# Consent API

- **Base URL:** `https://consent.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/consent](https://docs.epilot.io/api/consent)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.consent.publishConsentEvent(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/consent'

const consentClient = await getClient()
authorize(consentClient, () => '<token>')
const { data } = await consentClient.publishConsentEvent(...)
```

## Operations

**consent**
- [`publishConsentEvent`](#publishconsentevent)
- [`listConsentEvents`](#listconsentevents)
- [`handleOptInWithToken`](#handleoptinwithtoken)

**Schemas**
- [`ConsentIdentifier`](#consentidentifier)
- [`ConsentTopic`](#consenttopic)
- [`ConsentSource`](#consentsource)
- [`ConsentMeta`](#consentmeta)
- [`ConsentEventRequestBody`](#consenteventrequestbody)
- [`ConsentEvent`](#consentevent)
- [`OrganizationId`](#organizationid)

### `publishConsentEvent`

Publishes consent event on event bus, which appends to consent store

`POST /v1/consent/publish`

```ts
const { data } = await client.publishConsentEvent(
  null,
  {
    type: 'OPT_IN',
    topic: 'EMAIL_MARKETING',
    source: 'www.frontend.epilot.cloud',
    identifier: 'exampleuser@epilot.cloud',
    meta: {
      double_opt_in: true,
      source_type: 'journey',
      source_id: '0e4f2a26-14f0-4ada-9294-a7d7a0b9b214',
      ip_address: '1.1.1.1',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "type": "OPT_IN",
  "created_at": "1970-01-01T00:00:00.000Z",
  "topic": "EMAIL_MARKETING",
  "source": "www.frontend.epilot.cloud",
  "organization_id": "123",
  "identifier": "exampleuser@epilot.cloud",
  "meta": {
    "double_opt_in": true,
    "source_type": "journey",
    "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
    "ip_address": "1.1.1.1",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
  }
}
```

</details>

---

### `listConsentEvents`

List opt-ins and opt-outs by customer identifier

`GET /v1/consent/{identifier}`

```ts
const { data } = await client.listConsentEvents({
  identifier: 'example',
  topic: 'example',
  limit: 1,
  from: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "events": [
    {
      "type": "OPT_IN",
      "created_at": "1970-01-01T00:00:00.000Z",
      "topic": "EMAIL_MARKETING",
      "source": "www.frontend.epilot.cloud",
      "organization_id": "123",
      "identifier": "exampleuser@epilot.cloud",
      "meta": {
        "double_opt_in": true,
        "source_type": "journey",
        "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
        "ip_address": "1.1.1.1",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
      }
    }
  ],
  "total": 1
}
```

</details>

---

### `handleOptInWithToken`

Endpoint to handle opt-in links

`GET /v1/opt-in/{token}`

```ts
const { data } = await client.handleOptInWithToken({
  token: 'example',
  lang: 'example',
})
```

---

## Schemas

### `ConsentIdentifier`

Unique identifier for consent source (e.g. customer email or phone)

```ts
type ConsentIdentifier = string
```

### `ConsentTopic`

Consent Topic (what the person is opting into)

```ts
type ConsentTopic = string
```

### `ConsentSource`

Consent Source (Origin of the Consent Event)

```ts
type ConsentSource = string
```

### `ConsentMeta`

```ts
type ConsentMeta = Record<string, unknown>
```

### `ConsentEventRequestBody`

```ts
type ConsentEventRequestBody = {
  type: "OPT_IN" | "OPT_OUT"
  topic: string
  source?: string
  identifier: string
  meta?: Record<string, unknown>
}
```

### `ConsentEvent`

```ts
type ConsentEvent = {
  type: "OPT_IN" | "OPT_OUT" | "DOUBLE_OPT_IN_REQUESTED" | "DOUBLE_OPT_IN"
  created_at?: string // date-time
  topic: string
  source?: string
  organization_id?: string
  identifier: string
  meta?: Record<string, unknown>
}
```

### `OrganizationId`

```ts
type OrganizationId = string
```
