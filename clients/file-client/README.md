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
import fs from 'fs';
import { getClient } from '@epilot/file-client';
const fileClient = getClient();

// get upload params
const uploadFileRes = await fileClient.uploadFile(null, { filename: 'document.pdf', mime_type: 'application/pdf' });
const uploadParams = uploadFileRes.data;

// upload file to S3
const file = fs.readFileSync('./document.pdf')
const uploadRes = await fileClient.put(
  uploadParams.upload_url,
  file, 
  { headers: { 'content-type': 'application/json' }}
);

// save file as an entity
const uploadParams = await fileClient.saveFile(
  null,
  { s3ref: uploadParams.s3ref, access_control: 'private' },
);
```

## Documentation

https://docs.epilot.io/docs/files/file-api
