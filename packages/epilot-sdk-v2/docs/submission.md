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

const submissionClient = await getClient()
authorize(submissionClient, () => '<token>')
const { data } = await submissionClient.createSubmission(...)
```

## Operations

**Submissions**
- [`createSubmission`](#createsubmission)
- [`getNonce`](#getnonce)

**Schemas**
- [`SubmissionNonce`](#submissionnonce)
- [`SubmissionPayload`](#submissionpayload)
- [`SubmissionEntity`](#submissionentity)
- [`OptIn`](#optin)
- [`S3Reference`](#s3reference)

### `createSubmission`

Creates a submission from a public facing Journey

`POST /v1/submission/submissions`

```ts
const { data } = await client.createSubmission(
  null,
  {
    organization_id: '123',
    journey_submit_id: '123',
    source_type: 'journey',
    source_id: 'ce99875f-fba9-4fe2-a8f9-afaf52059051',
    opt_ins: [
      {
        topic: 'EMAIL_MARKETING',
        identifier: 'example@email.com',
        meta: {}
      }
    ],
    entities: [
      {
        _schema: 'submission',
        description: 'Submission created via API',
        contact_first_name: 'First',
        contact_last_name: 'Last',
        contact_email: 'example@submission.com',
        request: 'I would like to know more about electric vehicles',
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

---

### `getNonce`

Check if a nonce was already used (aka exists in storage)

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
  "nonce": "string",
  "submission_id": "string",
  "organization_id": "string",
  "ttl": 0,
  "exists": true
}
```

</details>

---

## Schemas

### `SubmissionNonce`

```ts
type SubmissionNonce = {
  nonce: string
  submission_id: string
  organization_id: string
  ttl?: number
}
```

### `SubmissionPayload`

Holds content and meta information

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

The submission entity to create

```ts
type SubmissionEntity = {
  _schema: "submission"
  description?: string
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

```ts
type OptIn = {
  topic?: string
  identifier?: string
  meta?: Record<string, unknown>
}
```

### `S3Reference`

S3 Reference from File API

```ts
type S3Reference = {
  bucket: string
  key: string
}
```
