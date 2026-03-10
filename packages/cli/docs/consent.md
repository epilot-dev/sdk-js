# Consent API

- **Base URL:** `https://consent.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/consent](https://docs.epilot.io/api/consent)

Consent Management for epilot customer entities

## Quick Start

```bash
# List available operations
epilot consent

# Call an operation
epilot consent publishConsentEvent
```

## Operations

**consent**
- [`publishConsentEvent`](#publishconsentevent) — Publishes consent event on event bus, which appends to consent store
- [`listConsentEvents`](#listconsentevents) — List opt-ins and opt-outs by customer identifier
- [`handleOptInWithToken`](#handleoptinwithtoken) — Endpoint to handle opt-in links

### `publishConsentEvent`

Publishes consent event on event bus, which appends to consent store

`POST /v1/consent/publish`

**Request Body**

**Sample Call**

```bash
epilot consent publishConsentEvent
```

With request body:

```bash
epilot consent publishConsentEvent \
  -d '{
  "type": "OPT_IN",
  "topic": "EMAIL_MARKETING",
  "source": "www.frontend.epilot.cloud",
  "identifier": "exampleuser@epilot.cloud",
  "meta": {
    "double_opt_in": true,
    "source_type": "journey",
    "source_id": "0e4f2a26-14f0-4ada-9294-a7d7a0b9b214",
    "ip_address": "1.1.1.1",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot consent publishConsentEvent
```

With JSONata filter:

```bash
epilot consent publishConsentEvent --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `identifier` | path | string | Yes |  |
| `topic` | query | string | No |  |
| `limit` | query | number | No |  |
| `from` | query | number | No |  |

**Sample Call**

```bash
epilot consent listConsentEvents \
  -p identifier=exampleuser@epilot.cloud
```

Using positional args for path parameters:

```bash
epilot consent listConsentEvents exampleuser@epilot.cloud
```

With JSONata filter:

```bash
epilot consent listConsentEvents -p identifier=exampleuser@epilot.cloud --jsonata 'events'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `token` | path | string | Yes |  |
| `lang` | query | string | No |  |

**Sample Call**

```bash
epilot consent handleOptInWithToken \
  -p token=example
```

Using positional args for path parameters:

```bash
epilot consent handleOptInWithToken example
```

With JSONata filter:

```bash
epilot consent handleOptInWithToken -p token=example --jsonata '$'
```

---
