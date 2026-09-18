# Document API

- **Base URL:** `https://document.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/document](https://docs.epilot.io/api/document)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.document.getTemplateMeta(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/document'

const documentClient = getClient()
authorize(documentClient, () => '<token>')
const { data } = await documentClient.getTemplateMeta(...)
```

## Operations

**Documents**
- [`getTemplateMeta`](#gettemplatemeta)
- [`generateDocumentV2`](#generatedocumentv2)
- [`convertDocument`](#convertdocument)
- [`validateTemplate`](#validatetemplate)

**Schemas**
- [`S3Reference`](#s3reference)
- [`ErrorOutput`](#erroroutput)
- [`InvalidCustomVariableErrorDetails`](#invalidcustomvariableerrordetails)
- [`InvalidCustomVariableErrorDetail`](#invalidcustomvariableerrordetail)
- [`InternalErrorDetails`](#internalerrordetails)
- [`InternalErrorDetail`](#internalerrordetail)
- [`DocxTemplaterErrorDetails`](#docxtemplatererrordetails)
- [`DocxTemplaterErrorDetail`](#docxtemplatererrordetail)
- [`ErrorCode`](#errorcode)
- [`TemplateValidationRequest`](#templatevalidationrequest)
- [`TemplateValidationResponse`](#templatevalidationresponse)
- [`TemplateIssue`](#templateissue)
- [`TemplateSettings`](#templatesettings)
- [`DocumentMetaRequest`](#documentmetarequest)
- [`DocumentMetaResponse`](#documentmetaresponse)
- [`DocumentGenerationV2Request`](#documentgenerationv2request)
- [`DocumentGenerationV2Response`](#documentgenerationv2response)
- [`ConvertDocumentRequest`](#convertdocumentrequest)
- [`ConvertDocumentResponse`](#convertdocumentresponse)

### `getTemplateMeta`

Get metadata for a document template

`POST /v2/documents:meta`

```ts
const { data } = await client.getTemplateMeta(
  null,
  {
    template_document: {
      s3ref: {
        bucket: 'document-api-prod',
        key: 'uploads/my-template.pdf'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.generateDocumentV2(
  {
    job_id: 'example',
    mode: 'example',
    preview_mode: 'example',
  },
  {
    template_document: {
      filename: 'my-template-{{order.order_number}}.docx',
      s3ref: {
        bucket: 'document-api-prod',
        key: 'uploads/my-template.pdf'
      }
    },
    context_entity_id: 'bcd0aab9-b544-42b0-8bfb-6d449d02eacc',
    user_id: '100321',
    language: 'de',
    variable_payload: {
      additionalProperties: 'string'
    },
    context_data: {
      additionalProperties: 'string'
    },
    template_settings: {
      custom_margins: {
        top: 2.54,
        bottom: 2.54
      },
      suggested_margins: {
        top: 2.54,
        bottom: 2.54
      },
      display_margin_guidelines: true,
      enable_data_table_margin_autofix: false,
      template_with_datatable: false,
      enabled_template_settings_persistence: false,
      misconfigured_margins: false,
      file_entity_id: '123e4567-e89b-12d3-a456-426614174000'
    }
  },
)
```

<details>
<summary>Response</summary>

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
    "file_entity_id": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

</details>

---

### `convertDocument`

Converts a document to a different format.

`POST /v2/documents:convert`

```ts
const { data } = await client.convertDocument(
  null,
  {
    language: 'de',
    input_document: {
      s3ref: {
        bucket: 'document-api-prod',
        key: 'uploads/my-template.pdf'
      }
    },
    output_format: 'pdf',
    output_filename: 'converted.pdf'
  },
)
```

<details>
<summary>Response</summary>

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

### `validateTemplate`

Validates a document template's variable syntax and, optionally, proposes a hotfixed copy of it.

`POST /v2/templates:validate`

```ts
const { data } = await client.validateTemplate(
  null,
  {
    template_document: {
      filename: 'Umzugsmeldung.xlsx',
      s3ref: {
        bucket: 'document-api-prod',
        key: 'uploads/my-template.pdf'
      }
    },
    fix: true,
    fix_level: 'safe'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "valid": false,
  "fixed": true,
  "issues": [
    {
      "id": "unopened_tag",
      "file": "xl/sharedStrings.xml",
      "location": "Tabelle1!N4",
      "context": "…Datum: {system.date}} Unterschrift…",
      "explanation": "The tag is missing an opening brace.",
      "fixable": true,
      "confidence": "high",
      "rule": "balance_opening_delimiter",
      "before": "{system.date}}",
      "after": "{{system.date}}"
    }
  ],
  "unresolved_errors": [
    {
      "id": "string",
      "context": "string",
      "explanation": "string"
    }
  ],
  "fixed_document": {
    "s3ref": {
      "bucket": "document-api-prod",
      "key": "uploads/my-template.pdf"
    },
    "filename": "Umzugsmeldung (fixed).xlsx",
    "preview_url": "https://example.com/path"
  }
}
```

</details>

---

## Schemas

### `S3Reference`

```ts
type S3Reference = {
  bucket: string
  key: string
}
```

### `ErrorOutput`

```ts
type ErrorOutput = {
  error_message?: string
  error_code?: "PARSE_ERROR" | "DOC_TO_PDF_CONVERT_ERROR" | "INTERNAL_ERROR" | "INVALID_TEMPLATE_FORMAT" | "TEMPLATE_NOT_FOUND"
  error_details?: Array<{
    explanation?: string
    context?: {
      invalid_variables?: { ... }
    }
  }> | Array<{
    items?: {
      name?: { ... }
      message?: { ... }
      stack?: { ... }
      cause?: { ... }
    }
  }> | Array<{
    id?: string
    context?: string
    explanation?: string
  }>
}
```

### `InvalidCustomVariableErrorDetails`

Error details for invalid custom variables. This error will appear under 'PARSE_ERROR' error code.

```ts
type InvalidCustomVariableErrorDetails = Array<{
  explanation?: string
  context?: {
    invalid_variables?: Array<{
      variable?: { ... }
      error?: { ... }
    }>
  }
}>
```

### `InvalidCustomVariableErrorDetail`

```ts
type InvalidCustomVariableErrorDetail = {
  explanation?: string
  context?: {
    invalid_variables?: Array<{
      variable?: { ... }
      error?: { ... }
    }>
  }
}
```

### `InternalErrorDetails`

Error details for internal error. This error will appear under 'INTERNAL_ERROR' error code.

```ts
type InternalErrorDetails = Array<{
  items?: {
    name?: string
    message?: string
    stack?: string
    cause?: string
  }
}>
```

### `InternalErrorDetail`

Internal error detail

```ts
type InternalErrorDetail = {
  name?: string
  message?: string
  stack?: string
  cause?: string
}
```

### `DocxTemplaterErrorDetails`

Error details for DocxTemplater error. This error will appear under 'PARSE_ERROR' error code.
See https://docxtemplater.com/docs/errors/#error-schema for more details.


```ts
type DocxTemplaterErrorDetails = Array<{
  id?: string
  context?: string
  explanation?: string
}>
```

### `DocxTemplaterErrorDetail`

DocxTemplater error detail

```ts
type DocxTemplaterErrorDetail = {
  id?: string
  context?: string
  explanation?: string
}
```

### `ErrorCode`

Error codes for document generation:
- PARSE_ERROR - Error while parsing the document. Normally related with a bad template using the wrong DocxTemplater syntax.
- DOC_TO_PDF_CONVERT_ERROR - Error while converting the document to PDF. Normally related with a ConvertAPI failure.
- INTERNAL_ERROR - In

```ts
type ErrorCode = "PARSE_ERROR" | "DOC_TO_PDF_CONVERT_ERROR" | "INTERNAL_ERROR" | "INVALID_TEMPLATE_FORMAT" | "TEMPLATE_NOT_FOUND"
```

### `TemplateValidationRequest`

```ts
type TemplateValidationRequest = {
  template_document: {
    filename?: string
    s3ref: {
      bucket: { ... }
      key: { ... }
    }
  }
  fix?: boolean
  fix_level?: "safe" | "aggressive"
}
```

### `TemplateValidationResponse`

```ts
type TemplateValidationResponse = {
  valid?: boolean
  fixed?: boolean
  issues?: Array<{
    id?: string
    file?: string
    location?: string
    context?: string
    explanation?: string
    fixable?: boolean
    confidence?: "high" | "medium" | "low"
    rule?: string
    before?: string
    after?: string
  }>
  unresolved_errors?: Array<{
    id?: string
    context?: string
    explanation?: string
  }>
  fixed_document?: {
    s3ref?: {
      bucket: { ... }
      key: { ... }
    }
    filename?: string
    preview_url?: string // uri
  }
}
```

### `TemplateIssue`

A single template syntax problem, and the repair proposed for it

```ts
type TemplateIssue = {
  id?: string
  file?: string
  location?: string
  context?: string
  explanation?: string
  fixable?: boolean
  confidence?: "high" | "medium" | "low"
  rule?: string
  before?: string
  after?: string
}
```

### `TemplateSettings`

Template Settings for document generation

```ts
type TemplateSettings = {
  custom_margins?: {
    top?: number
    bottom?: number
  }
  suggested_margins?: {
    top?: number
    bottom?: number
  }
  display_margin_guidelines?: boolean
  enable_data_table_margin_autofix?: boolean
  template_with_datatable?: boolean
  enabled_template_settings_persistence?: boolean
  misconfigured_margins?: boolean
  file_entity_id?: string // uuid
}
```

### `DocumentMetaRequest`

```ts
type DocumentMetaRequest = {
  template_document?: {
    s3ref?: {
      bucket: { ... }
      key: { ... }
    }
  }
}
```

### `DocumentMetaResponse`

```ts
type DocumentMetaResponse = {
  page_margins?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
    header?: number
    footer?: number
  }
  variables?: string[]
}
```

### `DocumentGenerationV2Request`

```ts
type DocumentGenerationV2Request = {
  template_document: {
    filename?: string
    s3ref?: {
      bucket: { ... }
      key: { ... }
    }
  }
  context_entity_id?: string // uuid
  user_id?: string
  language?: string
  variable_payload?: {
    additionalProperties?: string
  }
  context_data?: {
    additionalProperties?: string
  }
  template_settings?: {
    custom_margins?: {
      top?: { ... }
      bottom?: { ... }
    }
    suggested_margins?: {
      top?: { ... }
      bottom?: { ... }
    }
    display_margin_guidelines?: boolean
    enable_data_table_margin_autofix?: boolean
    template_with_datatable?: boolean
    enabled_template_settings_persistence?: boolean
    misconfigured_margins?: boolean
    file_entity_id?: string // uuid
  }
}
```

### `DocumentGenerationV2Response`

```ts
type DocumentGenerationV2Response = {
  job_id?: string // uuid
  job_status?: "STARTED" | "PROCESSING" | "SUCCESS" | "FAILED"
  message?: string
  ics_output?: {
    output_document?: {
      filename?: { ... }
      s3ref?: { ... }
    }
  }
  pdf_output?: {
    preview_url?: string
    output_document?: {
      filename?: { ... }
      s3ref?: { ... }
    }
  }
  docx_output?: {
    preview_url?: string
    output_document?: {
      filename?: { ... }
      s3ref?: { ... }
    }
  }
  xlsx_output?: {
    preview_url?: string
    output_document?: {
      filename?: { ... }
      s3ref?: { ... }
    }
  }
  error_output?: {
    error_message?: string
    error_code?: "PARSE_ERROR" | "DOC_TO_PDF_CONVERT_ERROR" | "INTERNAL_ERROR" | "INVALID_TEMPLATE_FORMAT" | "TEMPLATE_NOT_FOUND"
    error_details?: Array<{
      explanation?: { ... }
      context?: { ... }
    }> | Array<{
      items?: { ... }
    }> | Array<{
      id?: { ... }
      context?: { ... }
      explanation?: { ... }
    }>
  }
  variable_payload?: {
    additionalProperties?: string
  }
  template_settings?: {
    custom_margins?: {
      top?: { ... }
      bottom?: { ... }
    }
    suggested_margins?: {
      top?: { ... }
      bottom?: { ... }
    }
    display_margin_guidelines?: boolean
    enable_data_table_margin_autofix?: boolean
    template_with_datatable?: boolean
    enabled_template_settings_persistence?: boolean
    misconfigured_margins?: boolean
    file_entity_id?: string // uuid
  }
}
```

### `ConvertDocumentRequest`

```ts
type ConvertDocumentRequest = {
  language?: string
  input_document: {
    s3ref: {
      bucket: { ... }
      key: { ... }
    }
  }
  output_format: "pdf"
  output_filename?: string
}
```

### `ConvertDocumentResponse`

```ts
type ConvertDocumentResponse = {
  output_document?: {
    preview_url?: string
    s3ref?: {
      bucket: { ... }
      key: { ... }
    }
  }
}
```
