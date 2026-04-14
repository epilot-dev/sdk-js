# Email template API

- **Base URL:** `https://email-template.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/email-template](https://docs.epilot.io/api/email-template)

Email template API service

## Quick Start

```bash
# List available operations
epilot email-template

# Call an operation
epilot email-template saveTemplate
```

## Common Flags

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

## Operations

**Email templates**
- [`saveTemplate`](#savetemplate) — Create or update a template. If `id` is provided, it will update the template.
- [`getTemplateDetail`](#gettemplatedetail) — Get email template by ID
- [`updateTemplateDetail`](#updatetemplatedetail) — Update email template by ID
- [`bulkSendMessage`](#bulksendmessage) — Send emails to multiple recipients using a template
- [`revertToOriginalTemplate`](#reverttooriginaltemplate) — Revert to the original system generated email template

**Variables**
- [`replaceVariablesAsync`](#replacevariablesasync) — This endpoint allows to initiate an asynchronous process in replacing the template details & generating the documents.

### `saveTemplate`

Create or update a template. If `id` is provided, it will update the template.

`POST /v1/email-template/templates`

**Request Body**

**Sample Call**

```bash
epilot email-template saveTemplate
```

With request body:

```bash
epilot email-template saveTemplate \
  -d '{
  "_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed",
  "_tags": ["template"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_purpose": ["a0ec23ac-12f8-4d89-9a63-91cba3787f2a", "310cd388-2f15-4b5b-8f98-ca14c1e03304"],
  "name": "Order confirmation",
  "brand_id": 0,
  "from": {
    "name": "epilot",
    "email": "no-reply@epilot.cloud"
  },
  "to": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "cc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "bcc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "subject": "We have received your order!",
  "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
  "attachments": [
    {
      "cid": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
      "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
      "size": 451349,
      "content_type": "application/pdf",
      "url": "https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "bucket": "893487340562-message-attachment",
      "object_key": "attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "inline": false,
      "send_as_link": false,
      "type": "Document template",
      "copy_to_message": true
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "system_template": false,
  "created_by": 1234,
  "updated_by": 1234,
  "json_template": "string"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-template saveTemplate
```

With JSONata filter:

```bash
epilot email-template saveTemplate --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["automatic email template"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_purpose": ["a0ec23ac-12f8-4d89-9a63-91cba3787f2a", "310cd388-2f15-4b5b-8f98-ca14c1e03304"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "name": "Order confirmation",
  "brand_id": 0,
  "from": {
    "name": "epilot",
    "email": "no-reply@epilot.cloud"
  },
  "to": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "cc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "bcc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "subject": "We have received your order!",
  "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
  "attachments": [
    {
      "cid": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
      "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
      "size": 451349,
      "content_type": "application/pdf",
      "url": "https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "bucket": "893487340562-message-attachment",
      "object_key": "attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "inline": false,
      "send_as_link": false,
      "type": "Document template",
      "copy_to_message": true
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "created_by": 1234,
  "updated_by": 1234,
  "json_template": "string",
  "system_template": false
}
```

</details>

---

### `getTemplateDetail`

Get email template by ID

`GET /v1/email-template/templates/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Template entity ID |

**Sample Call**

```bash
epilot email-template getTemplateDetail \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot email-template getTemplateDetail 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-template getTemplateDetail -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "_title": "string",
    "_org": "206801",
    "_schema": "message",
    "_tags": ["automatic email template"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-10T09:14:31.990Z",
    "_purpose": ["a0ec23ac-12f8-4d89-9a63-91cba3787f2a", "310cd388-2f15-4b5b-8f98-ca14c1e03304"],
    "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
    "name": "Order confirmation",
    "brand_id": 0,
    "from": {
      "name": "epilot",
      "email": "no-reply@epilot.cloud"
    },
    "to": [
      {
        "name": "Ny Huynh",
        "email": "ny.huynh@axonactive.com"
      }
    ],
    "cc": [
      {
        "name": "Ny Huynh",
        "email": "ny.huynh@axonactive.com"
      }
    ],
    "bcc": [
      {
        "name": "Ny Huynh",
        "email": "ny.huynh@axonactive.com"
      }
    ],
    "subject": "We have received your order!",
    "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
    "attachments": [
      {
        "cid": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
        "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
        "size": 451349,
        "content_type": "application/pdf",
        "url": "https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
        "bucket": "893487340562-message-attachment",
        "object_key": "attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
        "inline": false,
        "send_as_link": false,
        "type": "Document template",
        "copy_to_message": true
      }
    ],
    "file": {
      "$relation": [
        {}
      ]
    },
    "created_by": 1234,
    "updated_by": 1234,
    "json_template": "string",
    "system_template": false
  },
  "relations": [
    {}
  ]
}
```

</details>

---

### `updateTemplateDetail`

Update email template by ID

`PUT /v1/email-template/templates/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Template entity ID |

**Request Body**

**Sample Call**

```bash
epilot email-template updateTemplateDetail \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot email-template updateTemplateDetail \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed",
  "_tags": ["template"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "_purpose": ["a0ec23ac-12f8-4d89-9a63-91cba3787f2a", "310cd388-2f15-4b5b-8f98-ca14c1e03304"],
  "name": "Order confirmation",
  "brand_id": 0,
  "from": {
    "name": "epilot",
    "email": "no-reply@epilot.cloud"
  },
  "to": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "cc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "bcc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "subject": "We have received your order!",
  "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
  "attachments": [
    {
      "cid": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
      "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
      "size": 451349,
      "content_type": "application/pdf",
      "url": "https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "bucket": "893487340562-message-attachment",
      "object_key": "attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "inline": false,
      "send_as_link": false,
      "type": "Document template",
      "copy_to_message": true
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "system_template": false,
  "created_by": 1234,
  "updated_by": 1234,
  "json_template": "string"
}'
```

Using positional args for path parameters:

```bash
epilot email-template updateTemplateDetail 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot email-template updateTemplateDetail -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot email-template updateTemplateDetail -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_title": "string",
  "_org": "206801",
  "_schema": "message",
  "_tags": ["automatic email template"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_purpose": ["a0ec23ac-12f8-4d89-9a63-91cba3787f2a", "310cd388-2f15-4b5b-8f98-ca14c1e03304"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "name": "Order confirmation",
  "brand_id": 0,
  "from": {
    "name": "epilot",
    "email": "no-reply@epilot.cloud"
  },
  "to": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "cc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "bcc": [
    {
      "name": "Ny Huynh",
      "email": "ny.huynh@axonactive.com"
    }
  ],
  "subject": "We have received your order!",
  "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
  "attachments": [
    {
      "cid": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
      "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
      "size": 451349,
      "content_type": "application/pdf",
      "url": "https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "bucket": "893487340562-message-attachment",
      "object_key": "attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
      "inline": false,
      "send_as_link": false,
      "type": "Document template",
      "copy_to_message": true
    }
  ],
  "file": {
    "$relation": [
      {}
    ]
  },
  "created_by": 1234,
  "updated_by": 1234,
  "json_template": "string",
  "system_template": false
}
```

</details>

---

### `replaceVariablesAsync`

This endpoint allows to initiate an asynchronous process in replacing the template details & generating the documents.

`POST /v1/email-template/templates:replaceAsync`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | query | string | No | Job ID for tracking the status of document generation action |

**Request Body**

**Sample Call**

```bash
epilot email-template replaceVariablesAsync
```

With request body:

```bash
epilot email-template replaceVariablesAsync \
  -d '{
  "email_template_id": "511ceb90-f738-47aa-8b1e-915ace0ae13c",
  "variable_parameters": {
    "template_type": "email",
    "language": "en",
    "main_entity_id": "63753437-c9e2-4e83-82bb-b1c666514561",
    "user_id": "123452",
    "custom_variables": [
      {
        "variable": "{{abc.xyz}}",
        "value": "ReplacedValue"
      }
    ]
  },
  "must_include_unsubscribe_link": false,
  "skip_document_generation": false
}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-template replaceVariablesAsync
```

With JSONata filter:

```bash
epilot email-template replaceVariablesAsync --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "status": "STARTED",
  "message": "string",
  "doc_progress_count": {
    "total": 10,
    "completed": 5
  },
  "result": {
    "entity": {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_title": "string",
      "_org": "206801",
      "_schema": "message",
      "_tags": ["automatic email template"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "_purpose": ["a0ec23ac-12f8-4d89-9a63-91cba3787f2a", "310cd388-2f15-4b5b-8f98-ca14c1e03304"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "name": "Order confirmation",
      "brand_id": 0,
      "from": {
        "name": "epilot",
        "email": "no-reply@epilot.cloud"
      },
      "to": [
        {
          "name": "Ny Huynh",
          "email": "ny.huynh@axonactive.com"
        }
      ],
      "cc": [
        {
          "name": "Ny Huynh",
          "email": "ny.huynh@axonactive.com"
        }
      ],
      "bcc": [
        {
          "name": "Ny Huynh",
          "email": "ny.huynh@axonactive.com"
        }
      ],
      "subject": "We have received your order!",
      "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
      "attachments": [
        {
          "cid": "f820ce3b-07b0-45ae-bcc6-babb2f53f79f",
          "filename": "Produktinformationen_epilot360_Double_Opt_in.pdf",
          "size": 451349,
          "content_type": "application/pdf",
          "url": "https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
          "bucket": "893487340562-message-attachment",
          "object_key": "attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf",
          "inline": false,
          "send_as_link": false,
          "type": "Document template",
          "copy_to_message": true
        }
      ],
      "file": {
        "$relation": [
          {}
        ]
      },
      "created_by": 1234,
      "updated_by": 1234,
      "json_template": "string",
      "system_template": false
    },
    "relations": [
      {}
    ]
  }
}
```

</details>

---

### `bulkSendMessage`

Send emails to multiple recipients using a template

`POST /v1/email-template/templates:bulkSendMessage`

**Request Body**

**Sample Call**

```bash
epilot email-template bulkSendMessage
```

With request body:

```bash
epilot email-template bulkSendMessage \
  -d '{
  "skip_creating_entities": true,
  "complete_thread": false,
  "email_template_id": "511ceb90-f738-47aa-8b1e-915ace0ae13c",
  "must_include_unsubscribe_link": false,
  "recipient_query": "_schema:contact AND consent_email_marketing:active",
  "custom_variables": [
    {
      "variable": "{{abc.xyz}}",
      "value": "ReplacedValue"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-template bulkSendMessage
```

With JSONata filter:

```bash
epilot email-template bulkSendMessage --jsonata 'org_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "org_id": "206801",
  "job_id": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "skip_creating_entities": true,
  "complete_thread": false,
  "status": "PROCESSING",
  "request": {
    "skip_creating_entities": true,
    "complete_thread": false,
    "email_template_id": "511ceb90-f738-47aa-8b1e-915ace0ae13c",
    "must_include_unsubscribe_link": false,
    "recipient_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa7", "3fa85f64-5717-4562-b3fc-2c963f66afa8"],
    "custom_variables": [
      {
        "variable": "{{abc.xyz}}",
        "value": "ReplacedValue"
      }
    ]
  },
  "created_by": "1234",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approve_action": "APPROVE_WITH_CONSENT",
  "task_token": "8c086140-f33e-4bb7-a993-50c0f2402c7b",
  "total_queued": 100,
  "queued": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email_to": ["recipient@example.com"],
      "email_with_consent": ["recipient@example.com"]
    }
  ],
  "sent": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "message_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email_to": ["recipient@example.com"]
    }
  ],
  "failed": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "error": "string",
      "email_to": ["recipient@example.com"]
    }
  ]
}
```

</details>

---

### `revertToOriginalTemplate`

Revert to the original system generated email template

`POST /v1/email-template/templates:revert`

**Request Body**

**Sample Call**

```bash
epilot email-template revertToOriginalTemplate \
  -d '{"email_template_id":"511ceb90-f738-47aa-8b1e-915ace0ae13c"}'
```

Using stdin pipe:

```bash
cat body.json | epilot email-template revertToOriginalTemplate
```

With JSONata filter:

```bash
epilot email-template revertToOriginalTemplate --jsonata '$'
```

---
