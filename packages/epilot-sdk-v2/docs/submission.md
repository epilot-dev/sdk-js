# Submission API

- **Base URL:** `https://submission.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/submission](https://docs.epilot.io/api/submission)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.submission.createSubmission(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/submission'

const submissionClient = getClient()
authorize(submissionClient, () => '<token>')
const { data } = await submissionClient.createSubmission(...)
```

## Operations

**Submissions**
- [`createSubmission`](#createsubmission)
- [`getNonce`](#getnonce)

**Schemas**
- [`SubmissionDuplicateResponse`](#submissionduplicateresponse)
- [`JourneyContextOffline`](#journeycontextoffline)
- [`ErrorResponse`](#errorresponse)
- [`SubmissionNonce`](#submissionnonce)
- [`SubmissionNonceCheckResult`](#submissionnoncecheckresult)
- [`SubmissionPayload`](#submissionpayload)
- [`SubmissionEntity`](#submissionentity)
- [`OptIn`](#optin)
- [`S3Reference`](#s3reference)

### `createSubmission`

Creates a submission from a public-facing Journey or other external source.

`POST /v1/submission/submissions`

```ts
const { data } = await client.createSubmission(
  null,
  {
    organization_id: '123',
    journey_submit_id: '5b0d3c1e-6a3e-4d2c-9d7e-0f1a2b3c4d5e',
    source_type: 'journey',
    source_id: 'ce99875f-fba9-4fe2-a8f9-afaf52059051',
    opt_ins: [
      {
        topic: 'EMAIL_MARKETING',
        identifier: 'jane.doe@example.com',
        meta: {}
      }
    ],
    entities: [
      {
        _schema: 'submission',
        description: 'Customer enquiry about EV charging',
        contact_first_name: 'Jane',
        contact_last_name: 'Doe',
        contact_email: 'jane.doe@example.com',
        request: 'I would like to know more about home EV charging options',
        files: [
          {
            s3ref: {
              bucket: 'epilot-user-content',
              key: 'temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf'
            },
            filename: 'document.pdf'
          }
        ]
      }
    ],
    _ivy_opportunity_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "duplicate": true,
  "submission_id": "string"
}
```

</details>

---

### `getNonce`

Check whether a submission nonce has already been consumed (i.e. exists in storage).

`GET /v1/submission/nonce/{nonce_id}`

```ts
const { data } = await client.getNonce({
  nonce_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "exists": true,
  "nonce": "nonce-a1b2c3d4e5f6"
}
```

</details>

---

## Schemas

### `SubmissionDuplicateResponse`

```ts
type SubmissionDuplicateResponse = {
  duplicate: true
  submission_id?: string
}
```

### `JourneyContextOffline`

Set by the journey app when the submission was recorded offline and replayed later.
The known keys are typed; unknown keys are accepted (newer app versions may add more).


```ts
type JourneyContextOffline = {
  queued_at?: string // date-time
  synced_at?: string // date-time
  device_id?: string
  pack_revision_id?: string
  pack_published_revision_id?: string
}
```

### `ErrorResponse`

```ts
type ErrorResponse = {
  status?: number
  error?: string
  message?: string
}
```

### `SubmissionNonce`

```ts
type SubmissionNonce = {
  nonce: string
  submission_id: string
  organization_id: string
  ttl?: number
}
```

### `SubmissionNonceCheckResult`

```ts
type SubmissionNonceCheckResult = {
  exists: boolean
  nonce?: string
}
```

### `SubmissionPayload`

Holds content and meta information for a Journey submission

```ts
type SubmissionPayload = {
  organization_id?: string
  journey_submit_id?: string
  source_type: string
  source_id: string
  opt_ins?: Array<{
    topic?: string
    identifier?: string
    meta?: Record<string, unknown>
  }>
  entities: Array<{
    _schema: "submission"
    description?: string
    journey_context?: {
      journey_revision_id?: { ... }
      offline?: { ... }
    }
    files?: Array<{
      s3ref: { ... }
      filename?: { ... }
      _tags?: { ... }
      relation_tags?: { ... }
    }>
  }>
  _ivy_opportunity_ids?: string[]
}
```

### `SubmissionEntity`

An epilot entity to create as part of the submission

```ts
type SubmissionEntity = {
  _schema: "submission"
  description?: string
  journey_context?: {
    journey_revision_id?: unknown
    offline?: {
      queued_at?: { ... }
      synced_at?: { ... }
      device_id?: { ... }
      pack_revision_id?: { ... }
      pack_published_revision_id?: { ... }
    }
  }
  files?: Array<{
    s3ref: {
      bucket: { ... }
      key: { ... }
    }
    filename?: string
    _tags?: string[]
    relation_tags?: string[]
  }>
}
```

### `OptIn`

A consent opt-in record captured during the submission

```ts
type OptIn = {
  topic?: string
  identifier?: string
  meta?: Record<string, unknown>
}
```

### `S3Reference`

An S3 object reference returned by the epilot File API after a successful upload

```ts
type S3Reference = {
  bucket: string
  key: string
}
```
