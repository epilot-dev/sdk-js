# Submission API

**API Name:** `submission`
**Base URL:** `https://submission.sls.epilot.io`

Use this API to handle submissions entities from external sources e.g. journeys and frontends


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `createSubmission` | POST | `/v1/submission/submissions` | createSubmission |
| `getNonce` | GET | `/v1/submission/nonce/{nonce_id}` | Check if a nonce was already used (aka exists in storage) |

## Usage

```bash
epilot submission createSubmission
```
