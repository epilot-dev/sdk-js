# Email template API

- **Base URL:** `https://email-template.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/email-template](https://docs.epilot.io/api/email-template)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.emailTemplate.saveTemplate(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/email-template'

const emailTemplateClient = getClient()
authorize(emailTemplateClient, () => '<token>')
const { data } = await emailTemplateClient.saveTemplate(...)
```

## Operations

**Email templates**
- [`saveTemplate`](#savetemplate)
- [`getTemplateDetail`](#gettemplatedetail)
- [`updateTemplateDetail`](#updatetemplatedetail)
- [`migrateAutomationsForTemplate`](#migrateautomationsfortemplate)
- [`getTemplateReferences`](#gettemplatereferences)
- [`bulkSendMessage`](#bulksendmessage)
- [`revertToOriginalTemplate`](#reverttooriginaltemplate)
- [`convertToBuilder`](#converttobuilder)

**Variables**
- [`replaceVariablesAsync`](#replacevariablesasync)

**Schemas**
- [`BaseEntity`](#baseentity)
- [`TemplateReferenceItem`](#templatereferenceitem)
- [`TemplateReferencesResponse`](#templatereferencesresponse)
- [`MigrateAutomationsResponse`](#migrateautomationsresponse)
- [`EmailTemplateRequest`](#emailtemplaterequest)
- [`EmailTemplateEntity`](#emailtemplateentity)
- [`Attachment`](#attachment)
- [`DesignId`](#designid)
- [`From`](#from)
- [`To`](#to)
- [`PresignedRequest`](#presignedrequest)
- [`PresignedResponse`](#presignedresponse)
- [`AttachmentResponse`](#attachmentresponse)
- [`UserResponse`](#userresponse)
- [`VariableParameters`](#variableparameters)
- [`TemplateType`](#templatetype)
- [`EmailTemplateResponse`](#emailtemplateresponse)
- [`AsyncEmailTemplateResponse`](#asyncemailtemplateresponse)
- [`SkipCreatingEntities`](#skipcreatingentities)
- [`CompleteThread`](#completethread)
- [`BulkSendMessageRequest`](#bulksendmessagerequest)
- [`BulkSendMessageRequestWithQuery`](#bulksendmessagerequestwithquery)
- [`CustomVariables`](#customvariables)
- [`BulkSendMessageJob`](#bulksendmessagejob)
- [`CreateSystemTemplatesReq`](#createsystemtemplatesreq)
- [`CreateSystemTemplatesResp`](#createsystemtemplatesresp)
- [`OrgId`](#orgid)
- [`CreatedBy`](#createdby)
- [`CreatedAt`](#createdat)
- [`UpdatedAt`](#updatedat)
- [`ApprovedAt`](#approvedat)
- [`ApproveAction`](#approveaction)
- [`TaskToken`](#tasktoken)
- [`JourneyContextUsagesRequest`](#journeycontextusagesrequest)
- [`JourneyContextUsagesResponse`](#journeycontextusagesresponse)
- [`JourneyContextUsageItem`](#journeycontextusageitem)

### `saveTemplate`

Create or update a template. If `id` is provided, it will update the template.

`POST /v1/email-template/templates`

```ts
const { data } = await client.saveTemplate(
  null,
  {
    _id: 'cd7809ba-a111-4dd9-8d15-18eb4de0faed',
    _tags: ['template'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    _purpose: ['a0ec23ac-12f8-4d89-9a63-91cba3787f2a', '310cd388-2f15-4b5b-8f98-ca14c1e03304'],
    name: 'Order confirmation',
    brand_id: 0,
    template_type: 'partial',
    design_id: '7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b',
    from: {
      name: 'epilot',
      email: 'service@stadtwerke-example.de'
    },
    to: [
      {
        name: 'Ny Huynh',
        email: 'ny.huynh@axonactive.com'
      }
    ],
    cc: [
      {
        name: 'Ny Huynh',
        email: 'ny.huynh@axonactive.com'
      }
    ],
    bcc: [
      {
        name: 'Ny Huynh',
        email: 'ny.huynh@axonactive.com'
      }
    ],
    subject: 'We have received your order!',
    body: 'Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly',
    attachments: [
      {
        cid: 'f820ce3b-07b0-45ae-bcc6-babb2f53f79f',
        filename: 'Produktinformationen_epilot360_Double_Opt_in.pdf',
        size: 451349,
        content_type: 'application/pdf',
        url: 'https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf',
        bucket: '893487340562-message-attachment',
        object_key: 'attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf',
        inline: false,
        send_as_link: false,
        type: 'Document template',
        copy_to_message: true
      }
    ],
    file: {
      $relation: [
        {}
      ]
    },
    system_template: false,
    protected: false,
    created_by: 1234,
    updated_by: 1234,
    json_template: 'string',
    original_template_id: 'cd7809ba-a111-4dd9-8d15-18eb4de0faed',
    backup: {
      body: 'string',
      backed_up_at: '2026-05-13T10:00:00.000Z'
    },
    converted_to_new_editor: false
  },
)
```

<details>
<summary>Response</summary>

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
  "design_id": "7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b",
  "from": {
    "name": "epilot",
    "email": "service@stadtwerke-example.de"
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
  "backup": {
    "body": "string",
    "backed_up_at": "2026-05-13T10:00:00.000Z"
  },
  "converted_to_new_editor": false,
  "system_template": false,
  "protected": false,
  "original_template_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed"
}
```

</details>

---

### `getTemplateDetail`

Get email template by ID

`GET /v1/email-template/templates/{id}`

```ts
const { data } = await client.getTemplateDetail({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
    "design_id": "7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b",
    "from": {
      "name": "epilot",
      "email": "service@stadtwerke-example.de"
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
    "backup": {
      "body": "string",
      "backed_up_at": "2026-05-13T10:00:00.000Z"
    },
    "converted_to_new_editor": false,
    "system_template": false,
    "protected": false,
    "original_template_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed"
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

```ts
const { data } = await client.updateTemplateDetail(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    _id: 'cd7809ba-a111-4dd9-8d15-18eb4de0faed',
    _tags: ['template'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    _purpose: ['a0ec23ac-12f8-4d89-9a63-91cba3787f2a', '310cd388-2f15-4b5b-8f98-ca14c1e03304'],
    name: 'Order confirmation',
    brand_id: 0,
    template_type: 'partial',
    design_id: '7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b',
    from: {
      name: 'epilot',
      email: 'service@stadtwerke-example.de'
    },
    to: [
      {
        name: 'Ny Huynh',
        email: 'ny.huynh@axonactive.com'
      }
    ],
    cc: [
      {
        name: 'Ny Huynh',
        email: 'ny.huynh@axonactive.com'
      }
    ],
    bcc: [
      {
        name: 'Ny Huynh',
        email: 'ny.huynh@axonactive.com'
      }
    ],
    subject: 'We have received your order!',
    body: 'Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly',
    attachments: [
      {
        cid: 'f820ce3b-07b0-45ae-bcc6-babb2f53f79f',
        filename: 'Produktinformationen_epilot360_Double_Opt_in.pdf',
        size: 451349,
        content_type: 'application/pdf',
        url: 'https://go.epilot.cloud/attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf',
        bucket: '893487340562-message-attachment',
        object_key: 'attachments/3e7c616a-3e89-4f92-b4c5-ea5ab140e3dd/Produktinformationen_epilot360_Double_Opt_in.pdf',
        inline: false,
        send_as_link: false,
        type: 'Document template',
        copy_to_message: true
      }
    ],
    file: {
      $relation: [
        {}
      ]
    },
    system_template: false,
    protected: false,
    created_by: 1234,
    updated_by: 1234,
    json_template: 'string',
    original_template_id: 'cd7809ba-a111-4dd9-8d15-18eb4de0faed',
    backup: {
      body: 'string',
      backed_up_at: '2026-05-13T10:00:00.000Z'
    },
    converted_to_new_editor: false
  },
)
```

<details>
<summary>Response</summary>

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
  "design_id": "7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b",
  "from": {
    "name": "epilot",
    "email": "service@stadtwerke-example.de"
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
  "backup": {
    "body": "string",
    "backed_up_at": "2026-05-13T10:00:00.000Z"
  },
  "converted_to_new_editor": false,
  "system_template": false,
  "protected": false,
  "original_template_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed"
}
```

</details>

---

### `migrateAutomationsForTemplate`

Find all automation flows in the org that contain a `send-email` or `reply-email`
action referencing `old_template_id` and rewrite those actions to point at the
new template id (`{id}` path param). In

`POST /v1/email-template/templates/{id}:migrate-automations`

```ts
const { data } = await client.migrateAutomationsForTemplate(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    old_template_id: '511ceb90-f738-47aa-8b1e-915ace0ae13c'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "migrated_flow_count": 3,
  "migrated_flow_ids": ["string"],
  "migrated_workflow_count": 2,
  "migrated_workflow_ids": ["string"],
  "migrated_portal_count": 1,
  "migrated_portal_ids": ["string"],
  "failed_flow_ids": ["string"],
  "failed_portal_ids": ["string"],
  "portal_migration_errored": false
}
```

</details>

---

### `getTemplateReferences`

List the automation flows, workflows and customer portals that currently
reference this template, without modifying anything. Powers the template
settings "used by" view and the pre-migrate preview, a

`GET /v1/email-template/templates/{id}:references`

```ts
const { data } = await client.getTemplateReferences({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "flows": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "workflows": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "portals": [
    {
      "id": "string",
      "name": "string"
    }
  ],
  "portal_lookup_errored": true
}
```

</details>

---

### `replaceVariablesAsync`

This endpoint allows to initiate an asynchronous process in replacing the template details & generating the documents.
On initial request, a jobId and STARTED status are returned. Subsequent requests 

`POST /v1/email-template/templates:replaceAsync`

```ts
const { data } = await client.replaceVariablesAsync(
  {
    job_id: 'example',
  },
  {
    email_template_id: '511ceb90-f738-47aa-8b1e-915ace0ae13c',
    variable_parameters: {
      template_type: 'email',
      language: 'de',
      main_entity_id: '63753437-c9e2-4e83-82bb-b1c666514561',
      user_id: '123452',
      custom_variables: [
        {
          variable: '{{abc.xyz}}',
          value: 'ReplacedValue'
        }
      ],
      partials_only: true,
      portal_id: 'string'
    },
    must_include_unsubscribe_link: false,
    skip_document_generation: false
  },
)
```

<details>
<summary>Response</summary>

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
      "design_id": "7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b",
      "from": {
        "name": "epilot",
        "email": "service@stadtwerke-example.de"
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
      "backup": {
        "body": "string",
        "backed_up_at": "2026-05-13T10:00:00.000Z"
      },
      "converted_to_new_editor": false,
      "system_template": false,
      "protected": false,
      "original_template_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed"
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

```ts
const { data } = await client.bulkSendMessage(
  null,
  {
    skip_creating_entities: true,
    complete_thread: false,
    email_template_id: '511ceb90-f738-47aa-8b1e-915ace0ae13c',
    must_include_unsubscribe_link: false,
    recipient_query: '_schema:contact AND consent_email_marketing:active',
    custom_variables: [
      {
        variable: '{{abc.xyz}}',
        value: 'ReplacedValue'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.revertToOriginalTemplate(
  null,
  {
    email_template_id: '511ceb90-f738-47aa-8b1e-915ace0ae13c'
  },
)
```

---

### `convertToBuilder`

Converts a legacy HTML email template into the email-builder block format.
Stores the new `json_template` (stringified block graph), re-renders `body`
from the resulting blocks, and stashes the origin

`POST /v1/email-template/templates/{id}:convertToBuilder`

```ts
const { data } = await client.convertToBuilder(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    dryRun: false,
    force: false,
    as_copy: false,
    name: 'Copy of Welcome email (Visual)'
  },
)
```

<details>
<summary>Response</summary>

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
  "design_id": "7a0a1a2b-3c4d-4e5f-8a9b-0c1d2e3f4a5b",
  "from": {
    "name": "epilot",
    "email": "service@stadtwerke-example.de"
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
  "backup": {
    "body": "string",
    "backed_up_at": "2026-05-13T10:00:00.000Z"
  },
  "converted_to_new_editor": false,
  "system_template": false,
  "protected": false,
  "original_template_id": "cd7809ba-a111-4dd9-8d15-18eb4de0faed"
}
```

</details>

---

## Schemas

### `BaseEntity`

```ts
type BaseEntity = {
  _id: string
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _purpose?: string[]
  _manifest?: string // uuid[]
}
```

### `TemplateReferenceItem`

```ts
type TemplateReferenceItem = {
  id: string
  name?: string
}
```

### `TemplateReferencesResponse`

```ts
type TemplateReferencesResponse = {
  flows: Array<{
    id: string
    name?: string
  }>
  workflows: Array<{
    id: string
    name?: string
  }>
  portals: Array<{
    id: string
    name?: string
  }>
  portal_lookup_errored: boolean
}
```

### `MigrateAutomationsResponse`

```ts
type MigrateAutomationsResponse = {
  migrated_flow_count: number
  migrated_flow_ids: string[]
  migrated_workflow_count: number
  migrated_workflow_ids: string[]
  migrated_portal_count: number
  migrated_portal_ids: string[]
  failed_flow_ids: string[]
  failed_portal_ids: string[]
  portal_migration_errored: boolean
}
```

### `EmailTemplateRequest`

```ts
type EmailTemplateRequest = {
  _id?: string
  _tags?: string[]
  _manifest?: string // uuid[]
  _purpose?: string[]
  name: string
  brand_id?: number
  template_type?: "partial"
  design_id?: string
  from?: {
    name?: string
    email: string
  }
  to?: Array<{
    name?: string
    email: string
  }>
  cc?: Array<{
    name?: string
    email: string
  }>
  bcc?: Array<{
    name?: string
    email: string
  }>
  subject?: string
  body?: string
  attachments?: Array<{
    cid?: string
    filename: string
    size: number
    content_type: string
    url?: string
    bucket: string
    object_key: string
    inline?: boolean
    send_as_link?: boolean
    type?: string
    copy_to_message?: boolean
  }>
  file?: {
    $relation?: object[]
  }
  system_template?: boolean
  protected?: boolean
  created_by?: string
  updated_by?: string
  json_template?: string
  original_template_id?: string
  backup?: {
    body?: string
    backed_up_at?: string
  }
  converted_to_new_editor?: boolean
}
```

### `EmailTemplateEntity`

```ts
type EmailTemplateEntity = {
  _id: string
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _purpose?: string[]
  _manifest?: string // uuid[]
  name: string
  brand_id?: number
  design_id?: string
  from?: {
    name?: string
    email: string
  }
  to?: Array<{
    name?: string
    email: string
  }>
  cc?: Array<{
    name?: string
    email: string
  }>
  bcc?: Array<{
    name?: string
    email: string
  }>
  subject?: string
  body?: string
  attachments?: Array<{
    cid?: string
    filename: string
    size: number
    content_type: string
    url?: string
    bucket: string
    object_key: string
    inline?: boolean
    send_as_link?: boolean
    type?: string
    copy_to_message?: boolean
  }>
  file?: {
    $relation?: object[]
  }
  created_by?: string
  updated_by?: string
  json_template?: string
  backup?: {
    body?: string
    backed_up_at?: string
  }
  converted_to_new_editor?: boolean
  system_template?: boolean
  protected?: boolean
  original_template_id?: string
}
```

### `Attachment`

```ts
type Attachment = {
  cid?: string
  filename: string
  size: number
  content_type: string
  url?: string
  bucket: string
  object_key: string
  inline?: boolean
  send_as_link?: boolean
  type?: string
  copy_to_message?: boolean
}
```

### `DesignId`

Design Builder design linked to this template. When set, `{{design.*}}` placeholders
(e.g. `{{design.assets.logo.url}}`, `{{design.colors.primary}}`) are replaced with the design's
current values at templating time.


```ts
type DesignId = string
```

### `From`

```ts
type From = {
  name?: string
  email: string
}
```

### `To`

```ts
type To = {
  name?: string
  email: string
}
```

### `PresignedRequest`

```ts
type PresignedRequest = {
  id: string
  filename: string
  content_type: string
}
```

### `PresignedResponse`

```ts
type PresignedResponse = {
  download_url: string
  upload_url: {
    url: number
    fields: object
  }
}
```

### `AttachmentResponse`

```ts
type AttachmentResponse = {
  total?: number
  attachments?: Array<{
    filename?: string
    bucket?: string
    object_key?: string
    url?: string
    document_type?: number
  }>
}
```

### `UserResponse`

```ts
type UserResponse = {
  id?: string
  organization_id?: string
  display_name?: string
  email?: string // email
  phone?: string
  preferred_language?: string
  image_uri?: {
    original?: string // uri
    thumbnail_32?: string // uri
  }
  properties?: Array<{
    name: string
    value: string
  }>
}
```

### `VariableParameters`

```ts
type VariableParameters = {
  template_type: "email" | "document"
  language?: string
  main_entity_id?: string
  user_id?: string
  custom_variables?: Array<{
    variable?: string
    value?: string
  }>
  partials_only?: boolean
  portal_id?: string
}
```

### `TemplateType`

```ts
type TemplateType = "email" | "document"
```

### `EmailTemplateResponse`

```ts
type EmailTemplateResponse = {
  entity?: {
    _id: string
    _title: string
    _org: string
    _schema: string
    _tags?: string[]
    _created_at: string // date-time
    _updated_at: string // date-time
    _purpose?: string[]
    _manifest?: string // uuid[]
    name: string
    brand_id?: number
    design_id?: string
    from?: {
      name?: { ... }
      email: { ... }
    }
    to?: Array<{
      name?: { ... }
      email: { ... }
    }>
    cc?: Array<{
      name?: { ... }
      email: { ... }
    }>
    bcc?: Array<{
      name?: { ... }
      email: { ... }
    }>
    subject?: string
    body?: string
    attachments?: Array<{
      cid?: { ... }
      filename: { ... }
      size: { ... }
      content_type: { ... }
      url?: { ... }
      bucket: { ... }
      object_key: { ... }
      inline?: { ... }
      send_as_link?: { ... }
      type?: { ... }
      copy_to_message?: { ... }
    }>
    file?: {
      $relation?: { ... }
    }
    created_by?: string
    updated_by?: string
    json_template?: string
    backup?: {
      body?: { ... }
      backed_up_at?: { ... }
    }
    converted_to_new_editor?: boolean
    system_template?: boolean
    protected?: boolean
    original_template_id?: string
  }
  relations?: object[]
}
```

### `AsyncEmailTemplateResponse`

```ts
type AsyncEmailTemplateResponse = {
  job_id: string
  status: "STARTED" | "PROCESSING" | "SUCCESS" | "FAILED"
  message?: string
  doc_progress_count?: {
    total: number
    completed: number
  }
  result?: {
    entity?: {
      _id: { ... }
      _title: { ... }
      _org: { ... }
      _schema: { ... }
      _tags?: { ... }
      _created_at: { ... }
      _updated_at: { ... }
      _purpose?: { ... }
      _manifest?: { ... }
      name: { ... }
      brand_id?: { ... }
      design_id?: { ... }
      from?: { ... }
      to?: { ... }
      cc?: { ... }
      bcc?: { ... }
      subject?: { ... }
      body?: { ... }
      attachments?: { ... }
      file?: { ... }
      created_by?: { ... }
      updated_by?: { ... }
      json_template?: { ... }
      backup?: { ... }
      converted_to_new_editor?: { ... }
      system_template?: { ... }
      protected?: { ... }
      original_template_id?: { ... }
    }
    relations?: object[]
  }
}
```

### `SkipCreatingEntities`

When true, it lets to send only the email by skip creating the thread & message entities.

```ts
type SkipCreatingEntities = boolean
```

### `CompleteThread`

Whether the thread is marked as Done immediately after sending the message

```ts
type CompleteThread = boolean
```

### `BulkSendMessageRequest`

It takes a list of entity ids, treating each as a separate mainEntity to construct individual messages.
For e.g; if there some opportunityIds are provided, then each opportunityId is treated as a separate mainEntity to construct individual messages.


```ts
type BulkSendMessageRequest = {
  skip_creating_entities?: boolean
  complete_thread?: boolean
  email_template_id: string
  must_include_unsubscribe_link?: boolean
  recipient_ids: string[]
  custom_variables?: Array<{
    variable?: string
    value?: string
  }>
}
```

### `BulkSendMessageRequestWithQuery`

It takes an entity query to derive recipient_ids, treating each as a separate mainEntity to construct individual messages.
For e.g; if the query is provided as `_schema:opportunity AND status:PENDING`,
  then all the opportunity Ids with status PENDING are treated as separate mainEntity to construct

```ts
type BulkSendMessageRequestWithQuery = {
  skip_creating_entities?: boolean
  complete_thread?: boolean
  email_template_id: string
  must_include_unsubscribe_link?: boolean
  recipient_query: string
  custom_variables?: Array<{
    variable?: string
    value?: string
  }>
}
```

### `CustomVariables`

Custom variables to be replaced in the email template

```ts
type CustomVariables = Array<{
  variable?: string
  value?: string
}>
```

### `BulkSendMessageJob`

```ts
type BulkSendMessageJob = {
  org_id?: string
  job_id: string
  skip_creating_entities?: boolean
  complete_thread?: boolean
  status: "PROCESSING" | "QUEUEING" | "APPROVAL" | "SENDING" | "SUCCESS" | "FAILED" | "CANCELLED"
  request: {
    skip_creating_entities?: boolean
    complete_thread?: boolean
    email_template_id: string
    must_include_unsubscribe_link?: boolean
    recipient_ids: string[]
    custom_variables?: Array<{
      variable?: { ... }
      value?: { ... }
    }>
  } | {
    skip_creating_entities?: boolean
    complete_thread?: boolean
    email_template_id: string
    must_include_unsubscribe_link?: boolean
    recipient_query: string
    custom_variables?: Array<{
      variable?: { ... }
      value?: { ... }
    }>
  }
  created_by?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  approved_at?: string // date-time
  approve_action?: "APPROVE_WITH_CONSENT" | "APPROVE_ALL"
  task_token?: string
  total_queued?: number
  queued?: Array<{
    entity_id: string
    email_to: string[]
    email_with_consent: string[]
  }>
  sent?: Array<{
    entity_id: string
    message_id: string
    email_to?: string[]
  }>
  failed?: Array<{
    entity_id: string
    error: string
    email_to?: string[]
  }>
}
```

### `CreateSystemTemplatesReq`

```ts
type CreateSystemTemplatesReq = {
  template_names: string[]
}
```

### `CreateSystemTemplatesResp`

```ts
type CreateSystemTemplatesResp = Array<{
  _id: string
  _title: string
  _org: string
  _schema: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _purpose?: string[]
  _manifest?: string // uuid[]
}>
```

### `OrgId`

Organization ID

```ts
type OrgId = string
```

### `CreatedBy`

User ID who created the bulk message action

```ts
type CreatedBy = string
```

### `CreatedAt`

Time when the bulk message action was created

```ts
type CreatedAt = string // date-time
```

### `UpdatedAt`

Time when the bulk message action was last updated

```ts
type UpdatedAt = string // date-time
```

### `ApprovedAt`

Time when the bulk message action was last approved

```ts
type ApprovedAt = string // date-time
```

### `ApproveAction`

Type of approval action for the bulk message request.
* APPROVE_WITH_CONSENT: Approve the bulk message request and send emails to queued recipients with consent
* APPROVE_ALL: Approve the bulk message request and send emails to all queued recipients, including those without consent


```ts
type ApproveAction = "APPROVE_WITH_CONSENT" | "APPROVE_ALL"
```

### `TaskToken`

Task token to approve or cancel the bulk message action

```ts
type TaskToken = string
```

### `JourneyContextUsagesRequest`

Shared request shape across journey-api's eight context-usage
adapters. `journey_id` is required for parity with the other seven,
but this adapter does not use it: email templates reference context
parameters by name and carry no journey id at all, so it cannot
narrow the search here.


```ts
type JourneyContextUsagesRequest = {
  journey_id: string
  param_keys: string[]
  param_ids?: string[]
}
```

### `JourneyContextUsagesResponse`

```ts
type JourneyContextUsagesResponse = {
  usages: Array<{
    kind: "email-template-body"
    resource: {
      type: { ... }
      id: { ... }
      name?: { ... }
    }
    location: {
      field: { ... }
    }
    matched_as: {
      dialect: { ... }
      token: { ... }
      at: { ... }
    }
    link_hint: {
      route: { ... }
      params: { ... }
    }
  }>
  status: "ok" | "partial"
  scanned: number
}
```

### `JourneyContextUsageItem`

```ts
type JourneyContextUsageItem = {
  kind: "email-template-body"
  resource: {
    type: "email_template"
    id: string
    name?: string
  }
  location: {
    field: "subject" | "body" | "to" | "cc" | "bcc" | "json_template" | "backup.body"
  }
  matched_as: {
    dialect: "name"
    token: string
    at: string
  }
  link_hint: {
    route: "email-template"
    params: {
      id: { ... }
    }
  }
}
```
