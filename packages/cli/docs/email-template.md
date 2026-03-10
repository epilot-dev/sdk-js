# Email template API

**API Name:** `email-template`
**Base URL:** `https://email-template.sls.epilot.io`

Email template API service


## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `saveTemplate` | POST | `/v1/email-template/templates` | saveTemplate |
| `getTemplateDetail` | GET | `/v1/email-template/templates/{id}` | getTemplateDetail |
| `updateTemplateDetail` | PUT | `/v1/email-template/templates/{id}` | updateTemplateDetail |
| `replaceVariables` | POST | `/v1/email-template/templates:replace` | replaceVariables |
| `replaceVariablesAsync` | POST | `/v1/email-template/templates:replaceAsync` | replaceVariablesAsync |
| `bulkSendMessage` | POST | `/v1/email-template/templates:bulkSendMessage` | bulkSendMessage |
| `revertToOriginalTemplate` | POST | `/v1/email-template/templates:revert` | revertToOriginalTemplate |

## Usage

```bash
epilot email-template saveTemplate
```
