# File API

- **Base URL:** `https://file.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/file](https://docs.epilot.io/api/file)

The File API enables you to upload, store, manage, and share files within the epilot platform.

## Quick Start

```bash
# List available operations
epilot file

# Call an operation
epilot file uploadFileV2
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

**File**
- [`uploadFileV2`](#uploadfilev2) — Create pre-signed S3 URL to upload a file to keep temporarily (one week).
- [`saveFileV2`](#savefilev2) — Saves a permanent file entity. Updates an existing file entity when `_id` is passed.
- [`getFile`](#getfile) — Get a file entity by id
- [`deleteFile`](#deletefile) — Delete a file entity by id
- [`downloadFile`](#downloadfile) — Generate a pre-signed download URL for a file.
- [`downloadS3File`](#downloads3file) — Generate a pre-signed download URL for a file using its S3 reference.
- [`downloadFiles`](#downloadfiles) — Bulk generate pre-signed download URLs for multiple files in a single request.
- [`verifyCustomDownloadUrl`](#verifycustomdownloadurl) — Verify that a custom download URL is valid and has not expired.
- [`uploadFilePublic`](#uploadfilepublic) — Create a pre-signed S3 URL for uploading a file without authentication.

**Preview**
- [`previewFile`](#previewfile) — Generate a thumbnail preview for a file entity.
- [`previewS3FileGet`](#previews3fileget) — Get a thumbnail preview from an S3 reference using query parameters.
- [`previewS3File`](#previews3file) — Generate a thumbnail preview from an S3 reference.
- [`previewPublicFile`](#previewpublicfile) — Generate a thumbnail preview for a public file entity.

**Session**
- [`getSession`](#getsession) — Start a browser session by converting a Bearer token into a server-side cookie.
- [`deleteSession`](#deletesession) — End a browser session by deleting the token cookie.

**Public Links**
- [`listPublicLinksForFile`](#listpubliclinksforfile) — **Not yet implemented.**
- [`generatePublicLink`](#generatepubliclink) — Generate a public link to share a private file externally.
- [`accessPublicLink`](#accesspubliclink) — Access a file via its public link.
- [`revokePublicLink`](#revokepubliclink) — **Not yet implemented.**

**File Collections**
- [`getUserSchemaFileCollections`](#getuserschemafilecollections) — Get all file collections for the current user within a specific schema.
- [`createUserSchemaFileCollection`](#createuserschemafilecollection) — Create a new file collection for the current user within a specific schema.
- [`updateUserSchemaFileCollection`](#updateuserschemafilecollection) — Update an existing file collection.
- [`deleteUserSchemaFileCollection`](#deleteuserschemafilecollection) — Delete a file collection.
- [`getFilesInCollection`](#getfilesincollection) — Get all files within a specific collection for an entity.
- [`getGlobalFileCollections`](#getglobalfilecollections) — Get all global file collections for a specific schema.

### `uploadFileV2`

Create pre-signed S3 URL to upload a file to keep temporarily (one week).

`POST /v2/files/upload`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `file_entity_id` | query | string \| string (uuid) | No | Use this parameter when uploading a file directly to an existing file entity.

Note: still requires calling saveFileV2 to save the file permanently.
 |

**Request Body**

**Sample Call**

```bash
epilot file uploadFileV2 \
  -d '{"filename":"document.pdf","mime_type":"application/pdf","index_tag":"2f6a377c8e78","metadata":{"color":"blue"}}'
```

Using stdin pipe:

```bash
cat body.json | epilot file uploadFileV2
```

With JSONata filter:

```bash
epilot file uploadFileV2 --jsonata 's3ref'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `activity_id` | query | string (ulid) | No | Activity to include in event feed |
| `fill_activity` | query | boolean | No | Update the diff and entity for the custom activity included in the query.
Pending state on activity is automatically ended when activity is filled.
 |
| `strict` | query | boolean | No | When passed true, the response will contain only fields that match the schema, with non-matching fields included in `__additional` |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `delete_temp_file` | query | boolean | No | Delete the temp file from S3 after copying it permanently |
| `version_only` | query | boolean | No | When true, only adds a new file version and updates the entity's
s3ref to point to the new version, without overwriting the entity's
existing top-level metadata. The entity's filename, type, and other |

**Request Body**

**Sample Call**

```bash
epilot file saveFileV2
```

With request body:

```bash
epilot file saveFileV2 \
  -d '{
  "_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
  "file_entity_id": "string",
  "relations": [
    {
      "entity_id": "ef7d985c-2385-44f4-9c71-ae06a52264f8",
      "_schema": "contact",
      "_tags": ["string"]
    }
  ],
  "_tags": ["tag1", "tag2"],
  "_purpose": ["8d396871-95a0-4c9d-bb4d-9eda9c35776c", "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "filename": "document.pdf",
  "type": "document",
  "mime_type": "application/pdf",
  "size_bytes": 1234,
  "readable_size": "1.2 MB",
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "s3ref": {}
}'
```

Using stdin pipe:

```bash
cat body.json | epilot file saveFileV2
```

With JSONata filter:

```bash
epilot file saveFileV2 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
  "s3ref": {},
  "versions": [
    {
      "s3ref": {},
      "filename": "document.pdf",
      "size_bytes": 1234,
      "readable_size": "1.2 MB",
      "mime_type": "image/jpeg"
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string \| string (uuid) | Yes |  |
| `source_url` | query | boolean | No |  |
| `strict` | query | boolean | No | When passed true, the response will contain only fields that match the schema, with non-matching fields included in `__additional` |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |

**Sample Call**

```bash
epilot file getFile \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8
```

Using positional args for path parameters:

```bash
epilot file getFile ef7d985c-2385-44f4-9c71-ae06a52264f8
```

With JSONata filter:

```bash
epilot file getFile -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
  "s3ref": {},
  "versions": [
    {
      "s3ref": {},
      "filename": "document.pdf",
      "size_bytes": 1234,
      "readable_size": "1.2 MB",
      "mime_type": "image/jpeg"
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string \| string (uuid) | Yes |  |
| `purge` | query | boolean | No |  |
| `activity_id` | query | string (ulid) | No | Activity to include in event feed |
| `strict` | query | boolean | No | When passed true, the response will contain only fields that match the schema, with non-matching fields included in `__additional` |

**Sample Call**

```bash
epilot file deleteFile \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8
```

Using positional args for path parameters:

```bash
epilot file deleteFile ef7d985c-2385-44f4-9c71-ae06a52264f8
```

With JSONata filter:

```bash
epilot file deleteFile -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
  "access_control": "private",
  "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
  "custom_download_url": "https://some-api-url.com/download?file_id=123",
  "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
  "s3ref": {},
  "versions": [
    {
      "s3ref": {},
      "filename": "document.pdf",
      "size_bytes": 1234,
      "readable_size": "1.2 MB",
      "mime_type": "image/jpeg"
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string \| string (uuid) | Yes | The UUID of the file entity |
| `version` | query | number | No | Index of the file version to download (0 = latest) |
| `attachment` | query | boolean | No | Controls the Content-Disposition header. Set to `true` to trigger browser download dialog, `false` to display inline. |

**Sample Call**

```bash
epilot file downloadFile \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8
```

Using positional args for path parameters:

```bash
epilot file downloadFile ef7d985c-2385-44f4-9c71-ae06a52264f8
```

With JSONata filter:

```bash
epilot file downloadFile -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 --jsonata 'download_url'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `s3_key` | query | string | Yes | The S3 object key |
| `s3_bucket` | query | string | Yes | The S3 bucket name |
| `attachment` | query | boolean | No | Controls the Content-Disposition header. Set to `true` to trigger browser download dialog, `false` to display inline. |

**Sample Call**

```bash
epilot file downloadS3File \
  -p s3_key=123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf \
  -p s3_bucket=epilot-prod-user-content
```

With JSONata filter:

```bash
epilot file downloadS3File -p s3_key=123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf -p s3_bucket=epilot-prod-user-content --jsonata 'download_url'
```

<details>
<summary>Sample Response</summary>

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

**Request Body**

**Sample Call**

```bash
epilot file downloadFiles \
  -d '[{"id":"ef7d985c-2385-44f4-9c71-ae06a52264f8","version":0}]'
```

Using stdin pipe:

```bash
cat body.json | epilot file downloadFiles
```

With JSONata filter:

```bash
epilot file downloadFiles --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

### `previewFile`

Generate a thumbnail preview for a file entity.

`GET /v1/files/{id}/preview`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string \| string (uuid) | Yes | The UUID of the file entity |
| `version` | query | number | No | Index of the file version to preview (0 = latest) |
| `w` | query | number | No | Desired width in pixels (maintains aspect ratio if only width is specified) |
| `h` | query | number | No | Desired height in pixels (maintains aspect ratio if only height is specified) |

**Sample Call**

```bash
epilot file previewFile \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8
```

Using positional args for path parameters:

```bash
epilot file previewFile ef7d985c-2385-44f4-9c71-ae06a52264f8
```

With JSONata filter:

```bash
epilot file previewFile -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 --jsonata '$'
```

---

### `previewS3FileGet`

Get a thumbnail preview from an S3 reference using query parameters.

`GET /v1/files:previewS3`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `key` | query | string | Yes | The S3 object key |
| `bucket` | query | string | Yes | The S3 bucket name |
| `w` | query | number | No | Desired width in pixels |
| `h` | query | number | No | Desired height in pixels |

**Sample Call**

```bash
epilot file previewS3FileGet \
  -p key=123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/image.png \
  -p bucket=epilot-prod-user-content
```

With JSONata filter:

```bash
epilot file previewS3FileGet -p key=123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/image.png -p bucket=epilot-prod-user-content --jsonata '$'
```

---

### `previewS3File`

Generate a thumbnail preview from an S3 reference.

`POST /v1/files:previewS3`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `w` | query | number | No | Desired width in pixels |
| `h` | query | number | No | Desired height in pixels |

**Request Body**

**Sample Call**

```bash
epilot file previewS3File \
  -d '{}'
```

Using stdin pipe:

```bash
cat body.json | epilot file previewS3File
```

With JSONata filter:

```bash
epilot file previewS3File --jsonata '$'
```

---

### `previewPublicFile`

Generate a thumbnail preview for a public file entity.

`GET /v1/files/public/{id}/preview`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string \| string (uuid) | Yes | The UUID of the public file entity |
| `version` | query | number | No | Index of the file version to preview (0 = latest) |
| `w` | query | number | No | Desired width in pixels |
| `h` | query | number | No | Desired height in pixels |
| `org_id` | query | string | No | Organization ID that owns the file |

**Sample Call**

```bash
epilot file previewPublicFile \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8
```

Using positional args for path parameters:

```bash
epilot file previewPublicFile ef7d985c-2385-44f4-9c71-ae06a52264f8
```

With JSONata filter:

```bash
epilot file previewPublicFile -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 --jsonata '$'
```

---

### `getSession`

Start a browser session by converting a Bearer token into a server-side cookie.

`GET /v1/files/session`

**Sample Call**

```bash
epilot file getSession
```

With JSONata filter:

```bash
epilot file getSession --jsonata '$'
```

---

### `deleteSession`

End a browser session by deleting the token cookie.

`DELETE /v1/files/session`

**Sample Call**

```bash
epilot file deleteSession
```

With JSONata filter:

```bash
epilot file deleteSession --jsonata '$'
```

---

### `listPublicLinksForFile`

**Not yet implemented.**

`GET /v1/files/{id}/public/links`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The UUID of the file entity |

**Sample Call**

```bash
epilot file listPublicLinksForFile \
  -p id=13d22918-36bd-4227-9ad4-2cb978788c8d
```

Using positional args for path parameters:

```bash
epilot file listPublicLinksForFile 13d22918-36bd-4227-9ad4-2cb978788c8d
```

With JSONata filter:

```bash
epilot file listPublicLinksForFile -p id=13d22918-36bd-4227-9ad4-2cb978788c8d --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

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

### `generatePublicLink`

Generate a public link to share a private file externally.

`POST /v1/files/{id}/public/links`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string \| string (uuid) | Yes | The UUID of the file entity to share |

**Sample Call**

```bash
epilot file generatePublicLink \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8
```

Using positional args for path parameters:

```bash
epilot file generatePublicLink ef7d985c-2385-44f4-9c71-ae06a52264f8
```

With JSONata filter:

```bash
epilot file generatePublicLink -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
"string"
```

</details>

---

### `accessPublicLink`

Access a file via its public link.

`GET /v1/files/public/links/{id}/{filename}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The UUID of the public link (not the file entity ID) |
| `filename` | path | string | Yes | The filename (for user-friendly URLs) |
| `hash` | query | string | No | Optional cache-busting hash to force re-download |

**Sample Call**

```bash
epilot file accessPublicLink \
  -p id=13d22918-36bd-4227-9ad4-2cb978788c8d \
  -p filename=invoice-2023-12.pdf
```

Using positional args for path parameters:

```bash
epilot file accessPublicLink 13d22918-36bd-4227-9ad4-2cb978788c8d invoice-2023-12.pdf
```

With JSONata filter:

```bash
epilot file accessPublicLink -p id=13d22918-36bd-4227-9ad4-2cb978788c8d -p filename=invoice-2023-12.pdf --jsonata '$'
```

---

### `revokePublicLink`

**Not yet implemented.**

`DELETE /v1/files/public/links/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | The UUID of the public link to revoke |

**Sample Call**

```bash
epilot file revokePublicLink \
  -p id=13d22918-36bd-4227-9ad4-2cb978788c8d
```

Using positional args for path parameters:

```bash
epilot file revokePublicLink 13d22918-36bd-4227-9ad4-2cb978788c8d
```

With JSONata filter:

```bash
epilot file revokePublicLink -p id=13d22918-36bd-4227-9ad4-2cb978788c8d --jsonata '$'
```

---

### `verifyCustomDownloadUrl`

Verify that a custom download URL is valid and has not expired.

`POST /v1/files/download:verify`

**Request Body**

**Sample Call**

```bash
epilot file verifyCustomDownloadUrl \
  -d '{"custom_download_url":"https://some-api-url.com?file_id=123&expires_at=1699273500029&signature=abcdefg"}'
```

Using stdin pipe:

```bash
cat body.json | epilot file verifyCustomDownloadUrl
```

With JSONata filter:

```bash
epilot file verifyCustomDownloadUrl --jsonata 'valid'
```

<details>
<summary>Sample Response</summary>

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

**Request Body**

**Sample Call**

```bash
epilot file uploadFilePublic \
  -d '{"filename":"document.pdf","mime_type":"application/pdf","index_tag":"2f6a377c8e78","metadata":{"color":"blue"}}'
```

Using stdin pipe:

```bash
cat body.json | epilot file uploadFilePublic
```

With JSONata filter:

```bash
epilot file uploadFilePublic --jsonata 's3ref'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | The entity schema slug (e.g., order, opportunity, contact) |

**Sample Call**

```bash
epilot file getUserSchemaFileCollections \
  -p slug=opportunity
```

Using positional args for path parameters:

```bash
epilot file getUserSchemaFileCollections opportunity
```

With JSONata filter:

```bash
epilot file getUserSchemaFileCollections -p slug=opportunity --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | The entity schema slug (e.g., order, opportunity, contact) |

**Request Body** (required)

**Sample Call**

```bash
epilot file createUserSchemaFileCollection \
  -p slug=opportunity \
  -d '{"name":"string","parents":["string"],"starred":false,"enabled_locations":["string"],"enabled_purposes":["string"]}'
```

Using positional args for path parameters:

```bash
epilot file createUserSchemaFileCollection opportunity
```

Using stdin pipe:

```bash
cat body.json | epilot file createUserSchemaFileCollection -p slug=opportunity
```

With JSONata filter:

```bash
epilot file createUserSchemaFileCollection -p slug=opportunity --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | The entity schema slug (e.g., order, opportunity) |
| `collectionSlug` | path | string | Yes | The collection slug identifier |

**Request Body** (required)

**Sample Call**

```bash
epilot file updateUserSchemaFileCollection \
  -p slug=opportunity \
  -p collectionSlug=documents \
  -d '{"name":"string","parents":["string"],"starred":false,"enabled_locations":["string"],"enabled_purposes":["string"]}'
```

Using positional args for path parameters:

```bash
epilot file updateUserSchemaFileCollection opportunity documents
```

Using stdin pipe:

```bash
cat body.json | epilot file updateUserSchemaFileCollection -p slug=opportunity -p collectionSlug=documents
```

With JSONata filter:

```bash
epilot file updateUserSchemaFileCollection -p slug=opportunity -p collectionSlug=documents --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | The entity schema slug (e.g., order, opportunity) |
| `collectionSlug` | path | string | Yes | The collection slug identifier |

**Sample Call**

```bash
epilot file deleteUserSchemaFileCollection \
  -p slug=opportunity \
  -p collectionSlug=documents
```

Using positional args for path parameters:

```bash
epilot file deleteUserSchemaFileCollection opportunity documents
```

With JSONata filter:

```bash
epilot file deleteUserSchemaFileCollection -p slug=opportunity -p collectionSlug=documents --jsonata '$'
```

---

### `getFilesInCollection`

Get all files within a specific collection for an entity.

`GET /v1/entity/{id}/collections/{collectionSlug}/files`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Entity id |
| `collectionSlug` | path | string | Yes | The collection slug identifier |

**Sample Call**

```bash
epilot file getFilesInCollection \
  -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 \
  -p collectionSlug=documents
```

Using positional args for path parameters:

```bash
epilot file getFilesInCollection ef7d985c-2385-44f4-9c71-ae06a52264f8 documents
```

With JSONata filter:

```bash
epilot file getFilesInCollection -p id=ef7d985c-2385-44f4-9c71-ae06a52264f8 -p collectionSlug=documents --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
    "access_control": "private",
    "public_url": "https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf",
    "custom_download_url": "https://some-api-url.com/download?file_id=123",
    "source_url": "https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf",
    "s3ref": {},
    "versions": [
      {
        "s3ref": {},
        "filename": "document.pdf",
        "size_bytes": 1234,
        "readable_size": "1.2 MB",
        "mime_type": "image/jpeg"
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

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `schemaSlug` | path | string | Yes | The entity schema slug (e.g., order, opportunity, contact) |

**Sample Call**

```bash
epilot file getGlobalFileCollections \
  -p schemaSlug=order
```

Using positional args for path parameters:

```bash
epilot file getGlobalFileCollections order
```

With JSONata filter:

```bash
epilot file getGlobalFileCollections -p schemaSlug=order --jsonata '$'
```

<details>
<summary>Sample Response</summary>

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
