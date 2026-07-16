# File API

- **Base URL:** `https://file.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/file](https://docs.epilot.io/api/file)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.file.uploadFileV2(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/file'

const fileClient = getClient()
authorize(fileClient, () => '<token>')
const { data } = await fileClient.uploadFileV2(...)
```

## Operations

**File**
- [`uploadFileV2`](#uploadfilev2)
- [`saveFileV2`](#savefilev2)
- [`getFile`](#getfile)
- [`deleteFile`](#deletefile)
- [`downloadFile`](#downloadfile)
- [`downloadS3File`](#downloads3file)
- [`downloadFiles`](#downloadfiles)
- [`createZipJob`](#createzipjob)
- [`getZipJob`](#getzipjob)
- [`getFileSummary`](#getfilesummary)
- [`createFileSummaryJob`](#createfilesummaryjob)
- [`getCurrentFileSummaryJob`](#getcurrentfilesummaryjob)
- [`getFileSummaryJob`](#getfilesummaryjob)
- [`generateFileSummary`](#generatefilesummary)
- [`getFileText`](#getfiletext)
- [`verifyCustomDownloadUrl`](#verifycustomdownloadurl)
- [`uploadFilePublic`](#uploadfilepublic)

**Preview**
- [`previewFile`](#previewfile)
- [`previewS3File`](#previews3file)
- [`previewS3FileGet`](#previews3fileget)
- [`previewPublicFile`](#previewpublicfile)

**Session**
- [`getSession`](#getsession)
- [`deleteSession`](#deletesession)

**Public Links**
- [`generatePublicLink`](#generatepubliclink)
- [`listPublicLinksForFile`](#listpubliclinksforfile)
- [`accessPublicLink`](#accesspubliclink)
- [`revokePublicLink`](#revokepubliclink)

**File Collections**
- [`getUserSchemaFileCollections`](#getuserschemafilecollections)
- [`createUserSchemaFileCollection`](#createuserschemafilecollection)
- [`updateUserSchemaFileCollection`](#updateuserschemafilecollection)
- [`deleteUserSchemaFileCollection`](#deleteuserschemafilecollection)
- [`getFilesInCollection`](#getfilesincollection)
- [`getGlobalFileCollections`](#getglobalfilecollections)

**Schemas**
- [`EntityId`](#entityid)
- [`EntitySlug`](#entityslug)
- [`ActivityId`](#activityid)
- [`FileEntityId`](#fileentityid)
- [`FileAttributes`](#fileattributes)
- [`FileType`](#filetype)
- [`FileSummaryJobStatus`](#filesummaryjobstatus)
- [`FileSummaryJob`](#filesummaryjob)
- [`FileSummary`](#filesummary)
- [`FileTextStatus`](#filetextstatus)
- [`FileText`](#filetext)
- [`FileTextReady`](#filetextready)
- [`FileTextNotReady`](#filetextnotready)
- [`FileTextUnsupported`](#filetextunsupported)
- [`CustomDownloadUrl`](#customdownloadurl)
- [`CustomDownloadUrlAuth`](#customdownloadurlauth)
- [`FileEntity`](#fileentity)
- [`CommonSaveFilePayload`](#commonsavefilepayload)
- [`SaveS3FilePayload`](#saves3filepayload)
- [`SaveFileFromSourceURLPayload`](#savefilefromsourceurlpayload)
- [`SaveCustomFilePayload`](#savecustomfilepayload)
- [`SaveFilePayload`](#savefilepayload)
- [`SaveFilePayloadV2`](#savefilepayloadv2)
- [`BatchSaveFileVersionPayload`](#batchsavefileversionpayload)
- [`UploadFilePayload`](#uploadfilepayload)
- [`FileUpload`](#fileupload)
- [`DownloadFilesPayload`](#downloadfilespayload)
- [`CreateZipJobPayload`](#createzipjobpayload)
- [`ZipJob`](#zipjob)
- [`VerifyCustomDownloadUrlPayload`](#verifycustomdownloadurlpayload)
- [`S3Reference`](#s3reference)
- [`S3Ref`](#s3ref)
- [`FileItem`](#fileitem)
- [`FileRelationItem`](#filerelationitem)
- [`PublicLink`](#publiclink)
- [`BaseEntityOwner`](#baseentityowner)
- [`BaseEntityAcl`](#baseentityacl)
- [`ErrorObject`](#errorobject)
- [`FileCollectionId`](#filecollectionid)
- [`FileCollectionItem`](#filecollectionitem)
- [`FileCollectionAttributes`](#filecollectionattributes)
- [`FileCollectionCreateRequest`](#filecollectioncreaterequest)

### `uploadFileV2`

Create pre-signed S3 URL to upload a file to keep temporarily (one week).

`POST /v2/files/upload`

```ts
const { data } = await client.uploadFileV2(
  {
    file_entity_id: 'example',
  },
  {
    filename: 'document.pdf',
    mime_type: 'application/pdf',
    index_tag: '2f6a377c8e78',
    metadata: {
      color: 'blue'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "s3ref": {
    "bucket": "epilot-prod-user-content",
    "key": "123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
  },
  "upload_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
}
```

</details>

---

### `saveFileV2`

Saves a permanent file entity. Updates an existing file entity when `_id` is passed.

`POST /v2/files`

```ts
const { data } = await client.saveFileV2(
  {
    activity_id: 'example',
    fill_activity: true,
    strict: true,
    async: true,
    delete_temp_file: true,
    version_only: true,
  },
  {
    _id: 'ef7d985c-2385-44f4-9c71-ae06a52264f8',
    file_entity_id: 'string',
    relations: [
      {
        entity_id: 'ef7d985c-2385-44f4-9c71-ae06a52264f8',
        _schema: 'contact',
        _tags: ['string']
      }
    ],
    _tags: ['tag1', 'tag2'],
    _purpose: ['8d396871-95a0-4c9d-bb4d-9eda9c35776c', 'da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    filename: 'document.pdf',
    type: 'document',
    mime_type: 'application/pdf',
    size_bytes: 1234,
    readable_size: '1.2 MB',
    etag: '9bb58f26192e4ba00f01e2e7b136bbd8',
    access_control: 'private',
    public_url: 'https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf',
    custom_download_url: 'https://some-api-url.com/download?file_id=123',
    custom_download_url_auth: 'token',
    preview_summary_de: 'string',
    short_summary_de: 'string',
    preview_summary_en: 'string',
    short_summary_en: 'string',
    s3ref: {}
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "_title": "document.pdf",
  "_schema": "file",
  "_org": "123",
  "_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "_tags": ["tag1", "tag2"],
  "_purpose": ["8d396871-95a0-4c9d-bb4d-9eda9c35776c", "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "filename": "document.pdf",
  "type": "document",
  "mime_type": "application/pdf",
  "size_bytes": 1234,
  "readable_size": "1.2 MB",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8",
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "custom_download_url_auth": "token",
  "preview_summary_de": "string",
  "short_summary_de": "string",
  "preview_summary_en": "string",
  "short_summary_en": "string",
  "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
  "s3ref": {},
  "versions": [
    {
      "s3ref": {},
      "filename": "document.pdf",
      "size_bytes": 1234,
      "readable_size": "1.2 MB",
      "mime_type": "image/jpeg",
      "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
    }
  ],
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "__additional": {}
}
```

</details>

---

### `getFile`

Get a file entity by id

`GET /v2/files/{id}`

```ts
const { data } = await client.getFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
  source_url: true,
  strict: true,
  async: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "_title": "document.pdf",
  "_schema": "file",
  "_org": "123",
  "_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "_tags": ["tag1", "tag2"],
  "_purpose": ["8d396871-95a0-4c9d-bb4d-9eda9c35776c", "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "filename": "document.pdf",
  "type": "document",
  "mime_type": "application/pdf",
  "size_bytes": 1234,
  "readable_size": "1.2 MB",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8",
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "custom_download_url_auth": "token",
  "preview_summary_de": "string",
  "short_summary_de": "string",
  "preview_summary_en": "string",
  "short_summary_en": "string",
  "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
  "s3ref": {},
  "versions": [
    {
      "s3ref": {},
      "filename": "document.pdf",
      "size_bytes": 1234,
      "readable_size": "1.2 MB",
      "mime_type": "image/jpeg",
      "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
    }
  ],
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "__additional": {}
}
```

</details>

---

### `deleteFile`

Delete a file entity by id

`DELETE /v2/files/{id}`

```ts
const { data } = await client.deleteFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
  purge: true,
  activity_id: 'example',
  strict: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "_title": "document.pdf",
  "_schema": "file",
  "_org": "123",
  "_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "_tags": ["tag1", "tag2"],
  "_purpose": ["8d396871-95a0-4c9d-bb4d-9eda9c35776c", "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "filename": "document.pdf",
  "type": "document",
  "mime_type": "application/pdf",
  "size_bytes": 1234,
  "readable_size": "1.2 MB",
  "etag": "9bb58f26192e4ba00f01e2e7b136bbd8",
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "custom_download_url_auth": "token",
  "preview_summary_de": "string",
  "short_summary_de": "string",
  "preview_summary_en": "string",
  "short_summary_en": "string",
  "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
  "s3ref": {},
  "versions": [
    {
      "s3ref": {},
      "filename": "document.pdf",
      "size_bytes": 1234,
      "readable_size": "1.2 MB",
      "mime_type": "image/jpeg",
      "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
    }
  ],
  "_updated_at": "1970-01-01T00:00:00.000Z",
  "_created_at": "1970-01-01T00:00:00.000Z",
  "_acl": {
    "view": ["org:456"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "__additional": {}
}
```

</details>

---

### `downloadFile`

Generate a pre-signed download URL for a file.

`GET /v1/files/{id}/download`

```ts
const { data } = await client.downloadFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
  version: 1,
  attachment: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "download_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123"
}
```

</details>

---

### `downloadS3File`

Generate a pre-signed download URL for a file using its S3 reference.

`POST /v1/files:downloadS3`

```ts
const { data } = await client.downloadS3File({
  s3_key: 'example',
  s3_bucket: 'example',
  attachment: true,
})
```

<details>
<summary>Response</summary>

```json
{
  "download_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123"
}
```

</details>

---

### `downloadFiles`

Bulk generate pre-signed download URLs for multiple files in a single request.

`POST /v1/files:downloadFiles`

```ts
const { data } = await client.downloadFiles(
  null,
  [
    {
      id: 'ef7d985c-2385-44f4-9c71-ae06a52264f8',
      version: 0
    }
  ],
)
```

<details>
<summary>Response</summary>

```json
[
  {
    "download_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123",
    "file_entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
```

</details>

---

### `createZipJob`

Create a background job to ZIP multiple files and send a download link via email.

`POST /v1/files:zipJob`

```ts
const { data } = await client.createZipJob(
  null,
  {},
)
```

---

### `getZipJob`

Get the status of a ZIP job

`GET /v1/files:zipJob/{job_id}`

```ts
const { data } = await client.getZipJob({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "completed",
  "progress": {
    "total_files": 100,
    "downloaded_files": 75,
    "failed_files": 2
  },
  "result": {
    "file_entity_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
    "download_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/files.zip?X-Amz-...",
    "expires_at": "2024-01-02T12:00:00Z",
    "zip_size_bytes": 104857600
  },
  "error": "Failed to download file: access denied",
  "created_at": "2024-01-01T12:00:00Z",
  "created_by": "10234",
  "org_id": "123",
  "updated_at": "2024-01-01T12:05:00Z"
}
```

</details>

---

### `getFileSummary`

Get summary text for a file entity together with the current summary job status when available.

`GET /v1/files/{id}/summary`

```ts
const { data } = await client.getFileSummary({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "status": "queued",
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "preview_summary_de": "string",
  "short_summary_de": "string",
  "preview_summary_en": "string",
  "short_summary_en": "string"
}
```

</details>

---

### `createFileSummaryJob`

Create or return the current AI summary job for a file entity.

`POST /v1/files/{id}/summary-jobs`

```ts
const { data } = await client.createFileSummaryJob({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getCurrentFileSummaryJob`

Get the latest AI summary job for the file entity's current source.

`GET /v1/files/{id}/summary-jobs/current`

```ts
const { data } = await client.getCurrentFileSummaryJob({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "file_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "status": "queued",
  "error": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `getFileSummaryJob`

Get an AI summary job by id.

`GET /v1/files/{id}/summary-jobs/{job_id}`

```ts
const { data } = await client.getFileSummaryJob({
  id: '123e4567-e89b-12d3-a456-426614174000',
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "file_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "status": "queued",
  "error": "string",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `generateFileSummary`

Compatibility alias for creating or returning the current AI summary job for a file entity.

`POST /v1/files/{id}/summary:generate`

```ts
const { data } = await client.generateFileSummary({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `getFileText`

Get the plain-text representation of a file entity. Returns status `not_ready` while text is being prepared and `unsupported` when text is unavailable for the file or organization.

`GET /v1/files/{id}/text`

```ts
const { data } = await client.getFileText({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "status": "ready",
  "text": "string",
  "truncated": true,
  "total_chars": 0
}
```

</details>

---

### `previewFile`

Generate a thumbnail preview for a file entity.

`GET /v1/files/{id}/preview`

```ts
const { data } = await client.previewFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
  version: 1,
  w: 1,
  h: 1,
})
```

---

### `previewS3File`

Generate a thumbnail preview from an S3 reference.

`POST /v1/files:previewS3`

```ts
const { data } = await client.previewS3File(
  {
    w: 1,
    h: 1,
  },
  {},
)
```

---

### `previewS3FileGet`

Get a thumbnail preview from an S3 reference using query parameters.

`GET /v1/files:previewS3`

```ts
const { data } = await client.previewS3FileGet({
  key: 'example',
  bucket: 'example',
  w: 1,
  h: 1,
})
```

---

### `previewPublicFile`

Generate a thumbnail preview for a public file entity.

`GET /v1/files/public/{id}/preview`

```ts
const { data } = await client.previewPublicFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
  version: 1,
  w: 1,
  h: 1,
  org_id: 'example',
})
```

---

### `getSession`

Start a browser session by converting a Bearer token into a server-side cookie.

`GET /v1/files/session`

```ts
const { data } = await client.getSession()
```

---

### `deleteSession`

End a browser session by deleting the token cookie.

`DELETE /v1/files/session`

```ts
const { data } = await client.deleteSession()
```

---

### `generatePublicLink`

Generate a public link to share a private file externally.

`POST /v1/files/{id}/public/links`

```ts
const { data } = await client.generatePublicLink({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
"string"
```

</details>

---

### `listPublicLinksForFile`

Fetches all public links previously generated for a file

`GET /v1/files/{id}/public/links`

```ts
const { data } = await client.listPublicLinksForFile({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "3ef5c6d9-818d-45e6-8efb-b1de59079a1c",
      "link": "https://file.sls.epilot.io/v1/files/public/links/3ef5c6d9-818d-45e6-8efb-b1de59079a1c",
      "last_accessed_at": "string"
    }
  ]
}
```

</details>

---

### `accessPublicLink`

Access a file via its public link.

`GET /v1/files/public/links/{id}/{filename}`

```ts
const { data } = await client.accessPublicLink({
  id: '123e4567-e89b-12d3-a456-426614174000',
  filename: 'example',
  hash: 'example',
})
```

---

### `revokePublicLink`

Revokes a given public link by ID

`DELETE /v1/files/public/links/{id}`

```ts
const { data } = await client.revokePublicLink({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `verifyCustomDownloadUrl`

Verify that a custom download URL is valid and has not expired.

`POST /v1/files/download:verify`

```ts
const { data } = await client.verifyCustomDownloadUrl(
  null,
  {
    custom_download_url: 'https://some-api-url.com?file_id=123&expires_at=1699273500029&signature=abcdefg'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "valid": true
}
```

</details>

---

### `uploadFilePublic`

Create a pre-signed S3 URL for uploading a file without authentication.

`POST /v1/files/public/upload`

```ts
const { data } = await client.uploadFilePublic(
  null,
  {
    filename: 'document.pdf',
    mime_type: 'application/pdf',
    index_tag: '2f6a377c8e78',
    metadata: {
      color: 'blue'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "s3ref": {
    "bucket": "epilot-prod-user-content",
    "key": "123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
  },
  "upload_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123",
  "error": "File entity not found"
}
```

</details>

---

### `getUserSchemaFileCollections`

Get all file collections for the current user within a specific schema.

`GET /v1/{slug}/collections`

```ts
const { data } = await client.getUserSchemaFileCollections({
  slug: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "slug": "_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234:documents",
    "name": "Documents",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "parents": ["_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234"],
    "starred": false,
    "order": 0,
    "enabled_locations": ["string"],
    "enabled_purposes": ["9eefcb98-93cf-4c5b-a040-f1d26d57c177", "5c544c09-a691-43ed-a7fa-0a8b44b5b161"],
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-02T12:00:00Z"
  }
]
```

</details>

---

### `createUserSchemaFileCollection`

Create a new file collection for the current user within a specific schema.

`POST /v1/{slug}/collections`

```ts
const { data } = await client.createUserSchemaFileCollection(
  {
    slug: 'example',
  },
  {
    name: 'string',
    parents: ['string'],
    starred: false,
    enabled_locations: ['string'],
    enabled_purposes: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "slug": "_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234:documents",
  "name": "Documents",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parents": ["_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234"],
  "starred": false,
  "order": 0,
  "enabled_locations": ["string"],
  "enabled_purposes": ["9eefcb98-93cf-4c5b-a040-f1d26d57c177", "5c544c09-a691-43ed-a7fa-0a8b44b5b161"],
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-02T12:00:00Z"
}
```

</details>

---

### `updateUserSchemaFileCollection`

Update an existing file collection.

`PUT /v1/{slug}/collections/{collectionSlug}`

```ts
const { data } = await client.updateUserSchemaFileCollection(
  {
    slug: 'example',
    collectionSlug: 'example',
  },
  {
    name: 'string',
    parents: ['string'],
    starred: false,
    enabled_locations: ['string'],
    enabled_purposes: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "slug": "_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234:documents",
  "name": "Documents",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "parents": ["_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234"],
  "starred": false,
  "order": 0,
  "enabled_locations": ["string"],
  "enabled_purposes": ["9eefcb98-93cf-4c5b-a040-f1d26d57c177", "5c544c09-a691-43ed-a7fa-0a8b44b5b161"],
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-02T12:00:00Z"
}
```

</details>

---

### `deleteUserSchemaFileCollection`

Delete a file collection.

`DELETE /v1/{slug}/collections/{collectionSlug}`

```ts
const { data } = await client.deleteUserSchemaFileCollection({
  slug: 'example',
  collectionSlug: 'example',
})
```

---

### `getFilesInCollection`

Get all files within a specific collection for an entity.

`GET /v1/entity/{id}/collections/{collectionSlug}/files`

```ts
const { data } = await client.getFilesInCollection({
  id: '123e4567-e89b-12d3-a456-426614174000',
  collectionSlug: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "_title": "document.pdf",
    "_schema": "file",
    "_org": "123",
    "_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
    "_tags": ["tag1", "tag2"],
    "_purpose": ["8d396871-95a0-4c9d-bb4d-9eda9c35776c", "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"],
    "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
    "filename": "document.pdf",
    "type": "document",
    "mime_type": "application/pdf",
    "size_bytes": 1234,
    "readable_size": "1.2 MB",
    "etag": "9bb58f26192e4ba00f01e2e7b136bbd8",
    "access_control": "private",
    "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
    "custom_download_url": "https://some-api-url.com/download?file_id=123",
    "custom_download_url_auth": "token",
    "preview_summary_de": "string",
    "short_summary_de": "string",
    "preview_summary_en": "string",
    "short_summary_en": "string",
    "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
    "s3ref": {},
    "versions": [
      {
        "s3ref": {},
        "filename": "document.pdf",
        "size_bytes": 1234,
        "readable_size": "1.2 MB",
        "mime_type": "image/jpeg",
        "etag": "9bb58f26192e4ba00f01e2e7b136bbd8"
      }
    ],
    "_updated_at": "1970-01-01T00:00:00.000Z",
    "_created_at": "1970-01-01T00:00:00.000Z",
    "_acl": {
      "view": ["org:456"],
      "edit": ["org:456"],
      "delete": ["org:456"]
    },
    "_owners": [
      {
        "org_id": "123",
        "user_id": "123"
      }
    ],
    "__additional": {}
  }
]
```

</details>

---

### `getGlobalFileCollections`

Get all global file collections for a specific schema.

`GET /v1/collections/{schemaSlug}`

```ts
const { data } = await client.getGlobalFileCollections({
  schemaSlug: 'example',
})
```

<details>
<summary>Response</summary>

```json
[
  {
    "slug": "_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234:documents",
    "name": "Documents",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "parents": ["_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234"],
    "starred": false,
    "order": 0,
    "enabled_locations": ["string"],
    "enabled_purposes": ["9eefcb98-93cf-4c5b-a040-f1d26d57c177", "5c544c09-a691-43ed-a7fa-0a8b44b5b161"],
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-02T12:00:00Z"
  }
]
```

</details>

---

## Schemas

### `EntityId`

```ts
type EntityId = string
```

### `EntitySlug`

URL-friendly identifier for the entity schema

```ts
type EntitySlug = string
```

### `ActivityId`

See https://github.com/ulid/spec

```ts
type ActivityId = string // ulid
```

### `FileEntityId`

```ts
type FileEntityId = string | string // uuid
```

### `FileAttributes`

```ts
type FileAttributes = {
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
}
```

### `FileType`

```ts
type FileType = "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
```

### `FileSummaryJobStatus`

Current state of a file summary job.

```ts
type FileSummaryJobStatus = "queued" | "waiting_for_extraction" | "processing" | "completed" | "failed" | "unsupported" | "stale"
```

### `FileSummaryJob`

```ts
type FileSummaryJob = {
  job_id: string // uuid
  file_id: string | string // uuid
  status: "queued" | "waiting_for_extraction" | "processing" | "completed" | "failed" | "unsupported" | "stale"
  error?: string
  created_at: string // date-time
  updated_at: string // date-time
  completed_at?: string // date-time
}
```

### `FileSummary`

```ts
type FileSummary = {
  status?: "queued" | "waiting_for_extraction" | "processing" | "completed" | "failed" | "unsupported" | "stale"
  job_id?: string // uuid
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
}
```

### `FileTextStatus`

Availability of the plain-text representation for a file entity.

```ts
type FileTextStatus = "ready" | "not_ready" | "unsupported"
```

### `FileText`

```ts
type FileText = {
  status: "ready"
  text: string
  truncated: boolean
  total_chars: number
} | {
  status: "not_ready"
} | {
  status: "unsupported"
}
```

### `FileTextReady`

```ts
type FileTextReady = {
  status: "ready"
  text: string
  truncated: boolean
  total_chars: number
}
```

### `FileTextNotReady`

```ts
type FileTextNotReady = {
  status: "not_ready"
}
```

### `FileTextUnsupported`

```ts
type FileTextUnsupported = {
  status: "unsupported"
}
```

### `CustomDownloadUrl`

Custom external download url used for the file

```ts
type CustomDownloadUrl = string // uri
```

### `CustomDownloadUrlAuth`

Authorization mode for the custom_download_url. `presigned` (the default) uses an HMAC-signed URL; `token` authorizes the download via the caller's bearer token, matched against the exact stored custom_download_url. In token mode the File API returns the unsigned custom_download_url (no expires_at/s

```ts
type CustomDownloadUrlAuth = "presigned" | "token"
```

### `FileEntity`

```ts
type FileEntity = {
  _title: string
  _schema: "file"
  _org: string
  _id: string | string // uuid
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename: string
  type: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  source_url?: string
  s3ref?: object
  versions: Array<{
    s3ref?: unknown
    filename?: string
    size_bytes?: number
    readable_size?: string
    mime_type?: string
    etag?: string
  }>
  _updated_at?: string // date-time
  _created_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  __additional?: Record<string, unknown>
}
```

### `CommonSaveFilePayload`

```ts
type CommonSaveFilePayload = {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
}
```

### `SaveS3FilePayload`

```ts
type SaveS3FilePayload = {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  s3ref?: unknown
}
```

### `SaveFileFromSourceURLPayload`

```ts
type SaveFileFromSourceURLPayload = {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  source_url?: string // uri
}
```

### `SaveCustomFilePayload`

```ts
type SaveCustomFilePayload = {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
}
```

### `SaveFilePayload`

```ts
type SaveFilePayload = {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  s3ref?: unknown
} | {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  source_url?: string // uri
} | {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
}
```

### `SaveFilePayloadV2`

```ts
type SaveFilePayloadV2 = {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  s3ref?: unknown
} | {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
  source_url?: string // uri
} | {
  _id?: object
  file_entity_id?: string
  relations?: Array<{
    entity_id: string
    _schema?: string
    _tags?: string[]
  }>
  _tags?: string[]
  _purpose?: string[]
  _manifest?: string // uuid[]
  filename?: string
  type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown"
  mime_type?: string
  size_bytes?: number
  readable_size?: string
  etag?: string
  access_control?: "private" | "public-read"
  public_url?: string // url
  custom_download_url?: string // uri
  custom_download_url_auth?: "presigned" | "token"
  preview_summary_de?: string
  short_summary_de?: string
  preview_summary_en?: string
  short_summary_en?: string
}
```

### `BatchSaveFileVersionPayload`

Payload for batch version save. Only s3ref payloads are supported.

```ts
type BatchSaveFileVersionPayload = {
  _id?: object
  file_entity_id?: string
  filename?: string
  mime_type?: string
  access_control?: "private" | "public-read"
  s3ref: unknown
}
```

### `UploadFilePayload`

```ts
type UploadFilePayload = {
  filename: string
  mime_type?: string
  index_tag?: string
  metadata?: Record<string, string>
}
```

### `FileUpload`

```ts
type FileUpload = {
  s3ref?: object
  upload_url?: string // url
  public_url?: string // url
}
```

### `DownloadFilesPayload`

```ts
type DownloadFilesPayload = Array<{
  id: string | string // uuid
  version?: number
}>
```

### `CreateZipJobPayload`

Request payload to create a ZIP job for bulk file download.
Provide either an explicit list of `file_entity_ids` (up to 1000) or an
`entity_query` that resolves to file entities (up to 10000).


```ts
type CreateZipJobPayload = unknown | unknown
```

### `ZipJob`

ZIP job status and result

```ts
type ZipJob = {
  job_id?: string // uuid
  status?: "queued" | "downloading" | "zipping" | "uploading" | "sending_notification" | "completed" | "failed"
  progress?: {
    total_files?: number
    downloaded_files?: number
    failed_files?: number
  }
  result?: {
    file_entity_id?: string // uuid
    download_url?: string // uri
    expires_at?: string // date-time
    zip_size_bytes?: number
  }
  error?: string
  created_at?: string // date-time
  created_by?: string
  org_id?: string
  updated_at?: string // date-time
}
```

### `VerifyCustomDownloadUrlPayload`

```ts
type VerifyCustomDownloadUrlPayload = {
  custom_download_url: string
}
```

### `S3Reference`

```ts
type S3Reference = {
  bucket: string
  key: string
}
```

### `S3Ref`

```ts
type S3Ref = {
  bucket: string
  key: string
}
```

### `FileItem`

```ts
type FileItem = {
  s3ref?: unknown
  filename?: string
  size_bytes?: number
  readable_size?: string
  mime_type?: string
  etag?: string
}
```

### `FileRelationItem`

```ts
type FileRelationItem = {
  entity_id: string
  _schema?: string
  _tags?: string[]
}
```

### `PublicLink`

```ts
type PublicLink = {
  id?: string
  link?: string
  last_accessed_at?: string
}
```

### `BaseEntityOwner`

The user / organization owning this entity.

Note: Owner implicitly has access to the entity regardless of ACLs.


```ts
type BaseEntityOwner = {
  org_id: string
  user_id?: string
}
```

### `BaseEntityAcl`

Access control list (ACL) for an entity. Defines sharing access to external orgs or users.

```ts
type BaseEntityAcl = {
  view?: string[]
  edit?: string[]
  delete?: string[]
}
```

### `ErrorObject`

A generic error returned by the API

```ts
type ErrorObject = {
  status?: number
  error?: string
}
```

### `FileCollectionId`

Generated uuid for a file collection

```ts
type FileCollectionId = string // uuid
```

### `FileCollectionItem`

A file collection with identifiers and timestamps

```ts
type FileCollectionItem = {
  slug?: string
  name: string
  id?: string // uuid
  parents?: string[]
  starred?: boolean
  order?: number
  enabled_locations?: string[]
  enabled_purposes?: string[]
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `FileCollectionAttributes`

```ts
type FileCollectionAttributes = {
  name?: string
  parents?: string[]
  starred?: boolean
  enabled_locations?: string[]
  enabled_purposes?: string[]
}
```

### `FileCollectionCreateRequest`

Request body for creating a file collection

```ts
type FileCollectionCreateRequest = {
  name: string
  parents?: string[]
  starred?: boolean
  enabled_locations?: string[]
  enabled_purposes?: string[]
}
```
