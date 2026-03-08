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

const emailTemplateClient = await getClient()
authorize(emailTemplateClient, () => '<token>')
const { data } = await emailTemplateClient.saveTemplate(...)
```

## Operations

**Email templates**
- [`saveTemplate`](#savetemplate)
- [`getTemplateDetail`](#gettemplatedetail)
- [`updateTemplateDetail`](#updatetemplatedetail)
- [`bulkSendMessage`](#bulksendmessage)
- [`revertToOriginalTemplate`](#reverttooriginaltemplate)

**Variables**
- [`replaceVariablesAsync`](#replacevariablesasync)

**Schemas**
- [`BaseEntity`](#baseentity)
- [`EmailTemplateRequest`](#emailtemplaterequest)
- [`EmailTemplateEntity`](#emailtemplateentity)
- [`Attachment`](#attachment)
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

### `saveTemplate`

Create or update a template. If `id` is provided, it will update the template.

`POST /v1/email-template/templates`

```ts
const { data } = await client.saveTemplate(
  null,
  {
    _id: 'cd7809ba-a111-4dd9-8d15-18eb4de0faed',
    _tags: [
      'template'
    ],
    _manifest: [
      '123e4567-e89b-12d3-a456-426614174000'
    ],
    _purpose: [
      'a0ec23ac-12f8-4d89-9a63-91cba3787f2a',
      '310cd388-2f15-4b5b-8f98-ca14c1e03304'
    ],
    name: 'Order confirmation',
    brand_id: 0,
    from: {
      name: 'epilot',
      email: 'no-reply@epilot.cloud'
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
    created_by: 1234,
    updated_by: 1234
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
  "_tags": [
    "automatic email template"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_purpose": [
    "a0ec23ac-12f8-4d89-9a63-91cba3787f2a",
    "310cd388-2f15-4b5b-8f98-ca14c1e03304"
  ],
  "_manifest": [
    "123e4567-e89b-12d3-a456-426614174000"
  ],
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
  "system_template": false
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
    "_tags": [
      "automatic email template"
    ],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-10T09:14:31.990Z",
    "_purpose": [
      "a0ec23ac-12f8-4d89-9a63-91cba3787f2a",
      "310cd388-2f15-4b5b-8f98-ca14c1e03304"
    ],
    "_manifest": [
      "123e4567-e89b-12d3-a456-426614174000"
    ],
    "name": "Order confirmation",
    "brand_id": 0,
    "from": {
      "name": "epilot",
      "email": "no-reply@epilot.cloud"
    },
    "to": [
      {}
    ],
    "cc": [
      {}
    ],
    "bcc": [
      {}
    ],
    "subject": "We have received your order!",
    "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
    "attachments": [
      {}
    ],
    "file": {
      "$relation": []
    },
    "created_by": 1234,
    "updated_by": 1234,
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

```ts
const { data } = await client.updateTemplateDetail(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    _id: 'cd7809ba-a111-4dd9-8d15-18eb4de0faed',
    _tags: [
      'template'
    ],
    _manifest: [
      '123e4567-e89b-12d3-a456-426614174000'
    ],
    _purpose: [
      'a0ec23ac-12f8-4d89-9a63-91cba3787f2a',
      '310cd388-2f15-4b5b-8f98-ca14c1e03304'
    ],
    name: 'Order confirmation',
    brand_id: 0,
    from: {
      name: 'epilot',
      email: 'no-reply@epilot.cloud'
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
    created_by: 1234,
    updated_by: 1234
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
  "_tags": [
    "automatic email template"
  ],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-10T09:14:31.990Z",
  "_purpose": [
    "a0ec23ac-12f8-4d89-9a63-91cba3787f2a",
    "310cd388-2f15-4b5b-8f98-ca14c1e03304"
  ],
  "_manifest": [
    "123e4567-e89b-12d3-a456-426614174000"
  ],
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
  "system_template": false
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
      language: 'en',
      main_entity_id: '63753437-c9e2-4e83-82bb-b1c666514561',
      user_id: '123452',
      custom_variables: [
        { /* ... */ }
      ]
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
      "_tags": [],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-10T09:14:31.990Z",
      "_purpose": [],
      "_manifest": [],
      "name": "Order confirmation",
      "brand_id": 0,
      "from": {},
      "to": [],
      "cc": [],
      "bcc": [],
      "subject": "We have received your order!",
      "body": "Hi Ms Ny Huynh, </br> Thank you for your order. We will contact you shortly",
      "attachments": [],
      "file": {},
      "created_by": 1234,
      "updated_by": 1234,
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

```ts
const { data } = await client.bulkSendMessage(
  null,
  {
    skip_creating_entities: true,
    email_template_id: '511ceb90-f738-47aa-8b1e-915ace0ae13c',
    must_include_unsubscribe_link: true,
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
  "status": "PROCESSING",
  "request": {
    "skip_creating_entities": true,
    "email_template_id": "511ceb90-f738-47aa-8b1e-915ace0ae13c",
    "must_include_unsubscribe_link": true,
    "recipient_ids": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      "3fa85f64-5717-4562-b3fc-2c963f66afa8"
    ],
    "custom_variables": [
      {}
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
      "email_to": [],
      "email_with_consent": []
    }
  ],
  "sent": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "message_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email_to": []
    }
  ],
  "failed": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "error": "string",
      "email_to": []
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

### `EmailTemplateRequest`

```ts
type EmailTemplateRequest = {
  _id?: string
  _tags?: string[]
  _manifest?: string // uuid[]
  _purpose?: string[]
  name: string
  brand_id?: number
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
  subject: string
  body?: string
  attachments?: Array<{
    cid?: string
    filename: string
    size: number
    content_type: string
  // ...
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
  // ...
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
  language?: "en" | "de"
  main_entity_id?: string
  user_id?: string
  custom_variables?: Array<{
    variable?: string
    value?: string
  }>
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
  // ...
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
      from?: { ... }
      to?: { ... }
      cc?: { ... }
      bcc?: { ... }
      subject?: { ... }
      body?: { ... }
      attachments?: { ... }
      file?: { ... }
      created_by?: { ... }
  // ...
}
```

### `SkipCreatingEntities`

When true, it lets to send only the email by skip creating the thread & message entities.

```ts
type SkipCreatingEntities = boolean
```

### `BulkSendMessageRequest`

It takes a list of entity ids, treating each as a separate mainEntity to construct individual messages.
For e.g; if there some opportunityIds are provided, then each opportunityId is treated as a separate mainEntity to construct individual messages.


```ts
type BulkSendMessageRequest = {
  skip_creating_entities?: boolean
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
  status: "PROCESSING" | "QUEUEING" | "APPROVAL" | "SENDING" | "SUCCESS" | "FAILED" | "CANCELLED"
  request: {
    skip_creating_entities?: boolean
    email_template_id: string
    must_include_unsubscribe_link?: boolean
    recipient_ids: string[]
    custom_variables?: Array<{
      variable?: { ... }
      value?: { ... }
    }>
  } | {
    skip_creating_entities?: boolean
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
  // ...
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
