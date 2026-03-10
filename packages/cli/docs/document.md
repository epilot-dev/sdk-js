# Document API

- **Base URL:** `https://document.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/document](https://docs.epilot.io/api/document)

A document generation API that allows you to generate documents from templates with variables.

## Quick Start

```bash
# List available operations
epilot document

# Call an operation
epilot document getTemplateMeta
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

**Documents**
- [`getTemplateMeta`](#gettemplatemeta) — Get metadata for a document template
- [`generateDocumentV2`](#generatedocumentv2) — Generates documents from templates with variables.
- [`convertDocument`](#convertdocument) — Converts a document to a different format.

### `getTemplateMeta`

Get metadata for a document template

`POST /v2/documents:meta`

**Request Body**

**Sample Call**

```bash
epilot document getTemplateMeta \
  -d '{"template_document":{"s3ref":{"bucket":"document-api-prod","key":"uploads/my-template.pdf"}}}'
```

Using stdin pipe:

```bash
cat body.json | epilot document getTemplateMeta
```

With JSONata filter:

```bash
epilot document getTemplateMeta --jsonata 'page_margins'
```

<details>
<summary>Sample Response</summary>

```json
{
  "page_margins": {
    "top": 2.54,
    "bottom": 2.54,
    "left": 2.54,
    "right": 2.54,
    "header": 2.54,
    "footer": 2.54
  },
  "variables": ["order.billing_contact.0.salutation", "order.billing_contact.0.title", "order_table", "stayHardStatic", "opportunity[attribute_name]", "opportunity[\"attribute_name\"]", "opportunity.[attribute_name]", "attribute_name", "opportunities.0.attribute_name", "opportunities[0].attribute_name", "contact.opportunities[0].attribute_name", "opportunities[Primary].attribute_name"]
}
```

</details>

---

### `generateDocumentV2`

Generates documents from templates with variables.

`POST /v2/documents:generate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | query | string | No | Job ID for tracking the status of document generation action |
| `mode` | query | "partial_generation" \| "full_generation" | No | Type of mode used for document generation flow:
- partial_generation will have a intermediate step for users to validate and replace the variable values before generating the final document.
- full_ge |
| `preview_mode` | query | "open" \| "download" | No | Type of mode used for document generation preview:
- open - preview_url provides a link to open the file in a browser
- download - preview_url provides a link to download the file
 |

**Request Body**

**Sample Call**

```bash
epilot document generateDocumentV2
```

With request body:

```bash
epilot document generateDocumentV2 \
  -d '{
  "template_document": {
    "filename": "my-template-{{order.order_number}}.docx",
    "s3ref": {
      "bucket": "document-api-prod",
      "key": "uploads/my-template.pdf"
    }
  },
  "context_entity_id": "bcd0aab9-b544-42b0-8bfb-6d449d02eacc",
  "user_id": 100321,
  "language": "de",
  "variable_payload": {
    "additionalProperties": "string"
  },
  "context_data": {
    "additionalProperties": "string"
  },
  "template_settings": {
    "custom_margins": {
      "top": 2.54,
      "bottom": 2.54
    },
    "suggested_margins": {
      "top": 2.54,
      "bottom": 2.54
    },
    "display_margin_guidelines": true,
    "enable_data_table_margin_autofix": false,
    "template_with_datatable": false,
    "enabled_template_settings_persistence": false,
    "misconfigured_margins": false,
    "file_entity_id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p"
  }
}'
```

Using stdin pipe:

```bash
cat body.json | epilot document generateDocumentV2
```

With JSONata filter:

```bash
epilot document generateDocumentV2 --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "job_status": "STARTED",
  "message": "string",
  "ics_output": {
    "output_document": {
      "s3ref": {
        "bucket": "document-api-preview-prod",
        "key": "preview/my-appointment.ics"
      }
    }
  },
  "pdf_output": {
    "preview_url": "https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.pdf",
    "output_document": {
      "s3ref": {
        "bucket": "document-api-preview-prod",
        "key": "preview/my-template.pdf"
      }
    }
  },
  "docx_output": {
    "preview_url": "https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.docx",
    "output_document": {
      "s3ref": {
        "bucket": "document-api-preview-prod",
        "key": "preview/my-template.docx"
      }
    }
  },
  "xlsx_output": {
    "preview_url": "https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/my-template-OR-001.xlsx",
    "output_document": {
      "s3ref": {
        "bucket": "document-api-preview-prod",
        "key": "preview/my-template.xlsx"
      }
    }
  },
  "error_output": {
    "error_message": "string",
    "error_code": "PARSE_ERROR",
    "error_details": [
      {
        "explanation": "string",
        "context": {
          "invalid_variables": [
            {
              "variable": "string",
              "error": "string"
            }
          ]
        }
      }
    ]
  },
  "variable_payload": {
    "additionalProperties": "string"
  },
  "template_settings": {
    "custom_margins": {
      "top": 2.54,
      "bottom": 2.54
    },
    "suggested_margins": {
      "top": 2.54,
      "bottom": 2.54
    },
    "display_margin_guidelines": true,
    "enable_data_table_margin_autofix": false,
    "template_with_datatable": false,
    "enabled_template_settings_persistence": false,
    "misconfigured_margins": false,
    "file_entity_id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p"
  }
}
```

</details>

---

### `convertDocument`

Converts a document to a different format.

`POST /v2/documents:convert`

**Request Body**

**Sample Call**

```bash
epilot document convertDocument
```

With request body:

```bash
epilot document convertDocument \
  -d '{
  "language": "de",
  "input_document": {
    "s3ref": {
      "bucket": "document-api-prod",
      "key": "uploads/my-template.pdf"
    }
  },
  "output_format": "pdf",
  "output_filename": "converted.pdf"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot document convertDocument
```

With JSONata filter:

```bash
epilot document convertDocument --jsonata 'output_document'
```

<details>
<summary>Sample Response</summary>

```json
{
  "output_document": {
    "preview_url": "https://document-api-prod.s3.eu-central-1.amazonaws.com/preview/converted.pdf",
    "s3ref": {
      "bucket": "document-api-prod",
      "key": "uploads/my-template.pdf"
    }
  }
}
```

</details>

---
