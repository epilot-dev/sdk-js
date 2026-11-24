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

const consentClient = getClient()
authorize(consentClient, () => '<token>')
const { data } = await consentClient.publishConsentEvent(...)
```

## Operations

**consent**
- [`publishConsentEvent`](#publishconsentevent)
- [`listConsentEvents`](#listconsentevents)
- [`handleOptInWithToken`](#handleoptinwithtoken)
- [`handleOptOutWithTokenConfirmation`](#handleoptoutwithtokenconfirmation)
- [`handleOptOutWithToken`](#handleoptoutwithtoken)

**consent_definitions**
- [`createConsentDefinition`](#createconsentdefinition)
- [`listConsentDefinitions`](#listconsentdefinitions)
- [`getConsentDefinition`](#getconsentdefinition)
- [`updateConsentDefinition`](#updateconsentdefinition)
- [`deleteConsentDefinition`](#deleteconsentdefinition)
- [`publishConsentDefinition`](#publishconsentdefinition)
- [`archiveConsentDefinition`](#archiveconsentdefinition)
- [`unarchiveConsentDefinition`](#unarchiveconsentdefinition)

**Schemas**
- [`ConsentIdentifier`](#consentidentifier)
- [`ConsentTopic`](#consenttopic)
- [`ConsentSource`](#consentsource)
- [`ConsentMeta`](#consentmeta)
- [`ConsentEventRequestBody`](#consenteventrequestbody)
- [`ConsentEvent`](#consentevent)
- [`ConsentEventListResponse`](#consenteventlistresponse)
- [`OrganizationId`](#organizationid)
- [`ConsentChannel`](#consentchannel)
- [`ConsentDefinitionStatus`](#consentdefinitionstatus)
- [`ConsentDefinitionTopic`](#consentdefinitiontopic)
- [`ConsentDefinitionName`](#consentdefinitionname)
- [`ConsentDefinitionLegalText`](#consentdefinitionlegaltext)
- [`ConsentDefinitionEmailTemplateId`](#consentdefinitionemailtemplateid)
- [`ConsentDefinition`](#consentdefinition)
- [`ConsentDefinitionCreateRequest`](#consentdefinitioncreaterequest)
- [`ConsentDefinitionUpdateRequest`](#consentdefinitionupdaterequest)
- [`ConsentDefinitionListResponse`](#consentdefinitionlistresponse)
- [`HttpError`](#httperror)
- [`ConsentDefinitionConflictError`](#consentdefinitionconflicterror)
- [`ConsentDefinitionNotPublishableError`](#consentdefinitionnotpublishableerror)
- [`ConsentDefinitionResolveEvent`](#consentdefinitionresolveevent)
- [`ResolvedConsentDefinition`](#resolvedconsentdefinition)
- [`UnresolvedConsentDefinition`](#unresolvedconsentdefinition)
- [`ConsentDefinitionResolveResult`](#consentdefinitionresolveresult)
- [`ConsentDefinitionResolveResponse`](#consentdefinitionresolveresponse)
- [`ErrorResponse`](#errorresponse)

### `publishConsentEvent`

Publishes a consent event (opt-in or opt-out) to the event bus, which appends
the event to the immutable consent store. This endpoint is used to record
customer consent decisions from various sources 

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
    },
    created_at: '2022-01-01T00:00:00Z'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "type": "OPT_IN",
  "created_at": "2024-01-15T10:30:00Z",
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

Retrieves the complete consent history for a customer identified by their
email address or phone number. Returns all opt-in and opt-out events in
chronological order, providing a full audit trail for 

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
      "created_at": "2024-01-15T10:30:00Z",
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

### `createConsentDefinition`

Creates a consent definition: one topic on one channel, for example "PV newsletter" by email.

`POST /v1/consent/definitions`

```ts
const { data } = await client.createConsentDefinition(
  null,
  {
    topic: 'PV newsletter',
    channel: 'email',
    name: 'PV newsletter',
    legal_text: '<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>',
    double_opt_in: false,
    confirmation_email_template_id: '8d396871-95a0-4c9d-bb4d-9eda9c35776c',
    reminder_email_template_id: '8d396871-95a0-4c9d-bb4d-9eda9c35776c'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listConsentDefinitions`

Lists the organization's consent definitions, sorted by topic.

`GET /v1/consent/definitions`

```ts
const { data } = await client.listConsentDefinitions({
  topic: 'example',
  status: 'example',
  include_archived: true,
  from: 1,
  size: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
      "topic": "PV newsletter",
      "name": "PV newsletter",
      "channel": "email",
      "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
      "double_opt_in": true,
      "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
      "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
      "attribute": "consent_pv_newsletter_email",
      "status": "draft",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "hits": 2
}
```

</details>

---

### `getConsentDefinition`

Reads one consent definition by id.

`GET /v1/consent/definitions/{definition_id}`

```ts
const { data } = await client.getConsentDefinition({
  definition_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `updateConsentDefinition`

Updates a consent definition's name, legal text and double opt-in settings. Only the fields sent
are changed; send `null` to clear an email template.

`PATCH /v1/consent/definitions/{definition_id}`

```ts
const { data } = await client.updateConsentDefinition(
  {
    definition_id: 'example',
  },
  {
    name: 'PV newsletter',
    legal_text: '<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>',
    double_opt_in: true,
    confirmation_email_template_id: '8d396871-95a0-4c9d-bb4d-9eda9c35776c',
    reminder_email_template_id: '8d396871-95a0-4c9d-bb4d-9eda9c35776c',
    topic: 'string',
    channel: 'email',
    attribute: 'string',
    status: 'draft',
    id: 'string',
    created_at: 'string',
    updated_at: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteConsentDefinition`

Deletes a draft consent definition for good. A draft has collected no consents, so nothing is kept:
the entity is purged (it does not go to the trash) and its topic and channel can be used again by a 

`DELETE /v1/consent/definitions/{definition_id}`

```ts
const { data } = await client.deleteConsentDefinition({
  definition_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `publishConsentDefinition`

Publishes a draft consent definition, so journeys can use it. Its current name, legal text and
double opt-in settings are what customers see from then on.

`POST /v1/consent/definitions/{definition_id}/publish`

```ts
const { data } = await client.publishConsentDefinition({
  definition_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `archiveConsentDefinition`

Archives a published consent definition that is no longer in use. It is left out of lists and pickers
by default but can still be read by id. Its contact attribute, the consents stored on contacts and

`POST /v1/consent/definitions/{definition_id}/archive`

```ts
const { data } = await client.archiveConsentDefinition({
  definition_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `unarchiveConsentDefinition`

Brings an archived consent definition back into use: its status becomes `published` again.

`POST /v1/consent/definitions/{definition_id}/unarchive`

```ts
const { data } = await client.unarchiveConsentDefinition({
  definition_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "5c1f0a46-4fb4-4e0e-9e9f-3b3f2c1d7a10",
  "topic": "PV newsletter",
  "name": "PV newsletter",
  "channel": "email",
  "legal_text": "<p>I agree that {{env.company_name}} may send me the PV newsletter by email.</p>",
  "double_opt_in": true,
  "confirmation_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "reminder_email_template_id": "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
  "attribute": "consent_pv_newsletter_email",
  "status": "draft",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `handleOptInWithToken`

Public endpoint for customers to confirm their opt-in by clicking a
verification link sent via email (double opt-in flow). This endpoint
validates the token and records a `DOUBLE_OPT_IN` event if vali

`GET /v1/opt-in/{token}`

```ts
const { data } = await client.handleOptInWithToken({
  token: 'example',
  lang: 'example',
})
```

---

### `handleOptOutWithTokenConfirmation`

Public endpoint for customers to confirm their opt-out request. This is
typically called when a customer submits an unsubscribe confirmation form.

`POST /v1/opt-out/{token}`

```ts
const { data } = await client.handleOptOutWithTokenConfirmation({
  token: 'example',
  lang: 'example',
})
```

---

### `handleOptOutWithToken`

Public endpoint that displays the opt-out confirmation page when a customer
clicks an unsubscribe link in an email. The page allows the customer to
confirm their decision to opt-out.

`GET /v1/opt-out/{token}`

```ts
const { data } = await client.handleOptOutWithToken({
  token: 'example',
  lang: 'example',
})
```

---

## Schemas

### `ConsentIdentifier`

Unique identifier for the customer whose consent is being managed.
Typically an email address or phone number that matches how the customer
is identified in marketing communications.


```ts
type ConsentIdentifier = string
```

### `ConsentTopic`

The specific type of marketing communication the customer is consenting to
or revoking consent for. Common topics include:
- `EMAIL_MARKETING` - Marketing emails and newsletters
- `SMS_MARKETING` - Marketing SMS/text messages
- `PHONE_CALL_MARKETING` - Marketing phone calls

Custom topics can be def

```ts
type ConsentTopic = string
```

### `ConsentSource`

Origin of the consent event, indicating where/how the consent was collected.
Examples include:
- Journey URLs (e.g., `frontend.epilot.cloud`)
- Portal identifiers
- Manual entry indicators (e.g., `customer service`)
- Unsubscribe sources (e.g., `unsubscribe via email`)


```ts
type ConsentSource = string
```

### `ConsentMeta`

Additional metadata associated with the consent event. This flexible object
can store any relevant context about how and where consent was collected.

**Common fields:**
- `double_opt_in` (boolean): When `true`, triggers a double opt-in email
  to verify the customer's consent
- `source_type` (strin

```ts
type ConsentMeta = Record<string, unknown>
```

### `ConsentEventRequestBody`

Request body for publishing a new consent event

```ts
type ConsentEventRequestBody = {
  type: "OPT_IN" | "OPT_OUT"
  topic: string
  source?: string
  identifier: string
  meta?: Record<string, unknown>
  created_at?: string // date-time
}
```

### `ConsentEvent`

A recorded consent event representing a change in customer consent status.
Events are immutable once created and form an audit trail of all consent changes.


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

### `ConsentEventListResponse`

Paginated list of consent events for a customer

```ts
type ConsentEventListResponse = {
  events?: Array<{
    type: "OPT_IN" | "OPT_OUT" | "DOUBLE_OPT_IN_REQUESTED" | "DOUBLE_OPT_IN"
    created_at?: string // date-time
    topic: string
    source?: string
    organization_id?: string
    identifier: string
    meta?: Record<string, unknown>
  }>
  total?: number
}
```

### `OrganizationId`

The epilot organization ID that owns this consent record

```ts
type OrganizationId = string
```

### `ConsentChannel`

The channel a consent covers. The list is fixed by epilot.

```ts
type ConsentChannel = "email" | "sms" | "phone" | "print"
```

### `ConsentDefinitionStatus`

- `draft`: editable and deletable, and not usable in journeys yet
- `published`: usable in journeys; stays editable, never goes back to `draft` and is never deleted
- `archived`: a published definition taken out of use, hidden from lists and pickers by default and
  keeps its text until it is unarch

```ts
type ConsentDefinitionStatus = "draft" | "published" | "archived"
```

### `ConsentDefinitionTopic`

What the customer agrees to, for example "PV newsletter". Definitions of the same topic are shown
together. It names the contact attribute, so it cannot change after creation: lowercased, with
ä/ö/ü/ß written as ae/oe/ue/ss and every other run of characters outside a-z and 0-9 turned into `_`,
it ma

```ts
type ConsentDefinitionTopic = string
```

### `ConsentDefinitionName`

The label customers see. Defaults to the topic, also when created blank. An update cannot make it blank (`400` with `missing_fields`).

```ts
type ConsentDefinitionName = string
```

### `ConsentDefinitionLegalText`

The consent text customers agree to, as rich text (HTML). May contain environment variables such as
`{{env.company_name}}`, which are filled in when the text is shown.


```ts
type ConsentDefinitionLegalText = string
```

### `ConsentDefinitionEmailTemplateId`

Id of an email template

```ts
type ConsentDefinitionEmailTemplateId = string
```

### `ConsentDefinition`

A consent the organization collects, for one topic on one channel

```ts
type ConsentDefinition = {
  id: string // uuid
  topic: string
  name: string
  channel: "email" | "sms" | "phone" | "print"
  legal_text?: string
  double_opt_in: boolean
  confirmation_email_template_id?: string
  reminder_email_template_id?: string
  attribute: string
  status: "draft" | "published" | "archived"
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `ConsentDefinitionCreateRequest`

```ts
type ConsentDefinitionCreateRequest = {
  topic: string
  channel: "email" | "sms" | "phone" | "print"
  name?: string
  legal_text?: string
  double_opt_in?: boolean
  confirmation_email_template_id?: string
  reminder_email_template_id?: string
}
```

### `ConsentDefinitionUpdateRequest`

```ts
type ConsentDefinitionUpdateRequest = {
  name?: string
  legal_text?: string
  double_opt_in?: boolean
  confirmation_email_template_id?: string
  reminder_email_template_id?: string
  topic?: string
  channel?: "email" | "sms" | "phone" | "print"
  attribute?: string
  status?: "draft" | "published" | "archived"
  id?: string
  created_at?: string
  updated_at?: string
}
```

### `ConsentDefinitionListResponse`

```ts
type ConsentDefinitionListResponse = {
  results: Array<{
    id: string // uuid
    topic: string
    name: string
    channel: "email" | "sms" | "phone" | "print"
    legal_text?: string
    double_opt_in: boolean
    confirmation_email_template_id?: string
    reminder_email_template_id?: string
    attribute: string
    status: "draft" | "published" | "archived"
    created_at?: string // date-time
    updated_at?: string // date-time
  }>
  hits: number
}
```

### `HttpError`

Error returned by the consent definition operations

```ts
type HttpError = {
  status: number
  error: string
}
```

### `ConsentDefinitionConflictError`

```ts
type ConsentDefinitionConflictError = {
  status: number
  error: string
  existing_definition_id?: string
  attribute?: string
}
```

### `ConsentDefinitionNotPublishableError`

```ts
type ConsentDefinitionNotPublishableError = {
  status: number
  error: string
  missing_fields?: "name" | "legal_text" | "confirmation_email_template_id" | "reminder_email_template_id"[]
}
```

### `ConsentDefinitionResolveEvent`

Not an HTTP request body: the payload a service sends when it invokes the consent definition resolver
Lambda directly. There is no token: only services allowed by IAM to invoke the function can call it, and
they vouch for `orgId`.


```ts
type ConsentDefinitionResolveEvent = {
  orgId: string
  ids: string[]
  language?: string
}
```

### `ResolvedConsentDefinition`

A published definition with its current text. Holds only what a journey needs to show and store the consent, since journeys are served to anonymous visitors.

```ts
type ResolvedConsentDefinition = {
  id: string
  name: string
  topic: string
  channel: "email" | "sms" | "phone" | "print"
  legal_text: string
  double_opt_in: boolean
  attribute: string
  status: "published"
}
```

### `UnresolvedConsentDefinition`

An id that does not resolve. Nothing else about the definition is given.

```ts
type UnresolvedConsentDefinition = {
  id: string
  reason: "not_found" | "draft" | "archived"
}
```

### `ConsentDefinitionResolveResult`

The resolved definitions and the ids that did not resolve, each id in one of the two lists

```ts
type ConsentDefinitionResolveResult = {
  items: Array<{
    id: string
    name: string
    topic: string
    channel: "email" | "sms" | "phone" | "print"
    legal_text: string
    double_opt_in: boolean
    attribute: string
    status: "published"
  }>
  errors: Array<{
    id: string
    reason: "not_found" | "draft" | "archived"
  }>
}
```

### `ConsentDefinitionResolveResponse`

Not an HTTP response: what the consent definition resolver Lambda returns as its payload. `200` with `body`;
`400` when the event is invalid (no `orgId` or one that is not an org id, `ids` not a list of strings, more
than 50 ids); `500` when the definitions could not be read. On `400` and `500`, `er

```ts
type ConsentDefinitionResolveResponse = {
  statusCode: 200 | 400 | 500
  body?: {
    items: Array<{
      id: { ... }
      name: { ... }
      topic: { ... }
      channel: { ... }
      legal_text: { ... }
      double_opt_in: { ... }
      attribute: { ... }
      status: { ... }
    }>
    errors: Array<{
      id: { ... }
      reason: { ... }
    }>
  }
  error?: string
}
```

### `ErrorResponse`

Standard error response returned when a request fails

```ts
type ErrorResponse = {
  message: string
}
```
