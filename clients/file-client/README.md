# @epilot/file-client

[![CI](https://github.com/epilot-dev/sdk-js/workflows/CI/badge.svg)](https://github.com/epilot-dev/sdk-js/actions?query=workflow%3ACI)
[![npm version](https://img.shields.io/npm/v/@epilot/file-client.svg)](https://www.npmjs.com/package/@epilot/file-client)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@epilot/file-client?label=gzip%20bundle)](https://bundlephobia.com/package/@epilot/file-client)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/epilot-dev/sdk-js/blob/main/LICENSE)

Client library for epilot [File API](https://docs.epilot.io/api/file)

Uses [`openapi-client-axios`](https://github.com/anttiviljami/openapi-client-axios)

## Installation

```bash
npm install --save @epilot/file-client
```

## Usage

```typescript
import fileClient from '@epilot/file-client';

// get upload params
const uploadParams = await client.uploadFile(null, { filename: 'my-document.pdf', mime_type: 'application/pdf' });

// upload file as multipart/form-data
const form = new FormData();
formData.append('file', fileToUpload);
const uploadRes = await fileClient.put(uploadParams.data.upload_url, form, { headers: form.getHeaders() });
```

## Documentation

https://docs.epilot.io/docs/files/file-api
