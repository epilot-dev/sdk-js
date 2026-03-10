# File API

**API Name:** `file`
**Base URL:** `https://file.sls.epilot.io`

The File API enables you to upload, store, manage, and share files within the epilot platform.

## Key Features
- **Uplo

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `uploadFileV2` | POST | `/v2/files/upload` | uploadFileV2 |
| `saveFileV2` | POST | `/v2/files` | saveFileV2 |
| `uploadFile` | POST | `/v1/files/upload` | uploadFile |
| `saveFile` | POST | `/v1/files` | saveFile |
| `getFile` | GET | `/v2/files/{id}` | getFile |
| `deleteFile` | DELETE | `/v2/files/{id}` | deleteFile |
| `downloadFile` | GET | `/v1/files/{id}/download` | downloadFile |
| `downloadS3File` | POST | `/v1/files:downloadS3` | downloadS3File |
| `downloadFiles` | POST | `/v1/files:downloadFiles` | downloadFiles |
| `previewFile` | GET | `/v1/files/{id}/preview` | previewFile |
| `previewS3FileGet` | GET | `/v1/files:previewS3` | previewS3FileGet |
| `previewS3File` | POST | `/v1/files:previewS3` | previewS3File |
| `previewPublicFile` | GET | `/v1/files/public/{id}/preview` | previewPublicFile |
| `getSession` | GET | `/v1/files/session` | getSession |
| `deleteSession` | DELETE | `/v1/files/session` | deleteSession |
| `listPublicLinksForFile` | GET | `/v1/files/{id}/public/links` | listPublicLinksForFile |
| `generatePublicLink` | POST | `/v1/files/{id}/public/links` | generatePublicLink |
| `accessPublicLink` | GET | `/v1/files/public/links/{id}/{filename}` | accessPublicLink |
| `revokePublicLink` | DELETE | `/v1/files/public/links/{id}` | revokePublicLink |
| `verifyCustomDownloadUrl` | POST | `/v1/files/download:verify` | verifyCustomDownloadUrl |
| `uploadFilePublic` | POST | `/v1/files/public/upload` | uploadFilePublic |
| `getUserSchemaFileCollections` | GET | `/v1/{slug}/collections` | getUserSchemaFileCollections |
| `createUserSchemaFileCollection` | POST | `/v1/{slug}/collections` | createUserSchemaFileCollection |
| `updateUserSchemaFileCollection` | PUT | `/v1/{slug}/collections/{collectionSlug}` | updateUserSchemaFileCollection |
| `deleteUserSchemaFileCollection` | DELETE | `/v1/{slug}/collections/{collectionSlug}` | deleteUserSchemaFileCollection |
| `getFilesInCollection` | GET | `/v1/entity/{id}/collections/{collectionSlug}/files` | getFilesInCollection |
| `getGlobalFileCollections` | GET | `/v1/collections/{schemaSlug}` | getGlobalFileCollections |

## Usage

```bash
epilot file uploadFileV2
```
