# Submission API

- **Base URL:** `https://submission.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/submission](https://docs.epilot.io/api/submission)

Use this API to handle submissions entities from external sources e.g. journeys and frontends

## Quick Start

```bash
# List available operations
epilot submission

# Call an operation
epilot submission createSubmission
```

## Operations

**Submissions**
- [`createSubmission`](#createsubmission) — Creates a submission from a public facing Journey
- [`getNonce`](#getnonce) — Returns { exists: boolean } along some meta data

### `createSubmission`

Creates a submission from a public facing Journey

`POST /v1/submission/submissions`

**Request Body**

**Sample Call**

```bash
epilot submission createSubmission
```

With request body:

```bash
epilot submission createSubmission \
  -d '{
  "organization_id": "123",
  "journey_submit_id": "123",
  "source_type": "journey",
  "source_id": "ce99875f-fba9-4fe2-a8f9-afaf52059051",
  "opt_ins": [
    {
      "topic": "EMAIL_MARKETING",
      "identifier": "example@email.com",
      "meta": {}
    }
  ],
  "entities": [
    {
      "_schema": "submission",
      "description": "Submission created via API",
      "contact_first_name": "First",
      "contact_last_name": "Last",
      "contact_email": "example@submission.com",
      "request": "I would like to know more about electric vehicles",
      "files": [
        {
          "s3ref": {
            "bucket": "epilot-user-content",
            "key": "temp/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
          },
          "filename": "document.pdf"
        }
      ]
    }
  ],
  "_ivy_opportunity_ids": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot submission createSubmission
```

With JSONata filter:

```bash
epilot submission createSubmission --jsonata '$'
```

---

### `getNonce`

Returns { exists: boolean } along some meta data

`GET /v1/submission/nonce/{nonce_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `nonce_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot submission getNonce \
  -p nonce_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot submission getNonce 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot submission getNonce -p nonce_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
