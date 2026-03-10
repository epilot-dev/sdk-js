# Template Variables API

**API Name:** `template-variables`
**Base URL:** `https://template-variables-api.sls.epilot.io`

This API provides dynamic template processing and variable management, seamless Handlebars template compilation, custom 

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getCategories` | GET | `/v1/template-variables/categories` | getCategories |
| `searchVariables` | POST | `/v1/template-variables:search` | searchVariables |
| `getVariableContext` | POST | `/v1/template-variables:context` | getVariableContext |
| `replaceTemplates` | POST | `/v1/template-variables:replace` | replaceTemplates |
| `replaceTemplatesV2` | POST | `/v2/template:replace` | Replace variables in templates (V2) |
| `getCustomVariables` | GET | `/v1/custom-variables` | Get custom variables |
| `createCustomVariable` | POST | `/v1/custom-variables` | Create custom variable |
| `searchCustomVariables` | POST | `/v1/custom-variables:search` | searchCustomVariables |
| `getCustomVariable` | GET | `/v1/custom-variables/{id}` | Get custom variable |
| `updateCustomVariable` | PUT | `/v1/custom-variables/{id}` | Update custom variable |
| `deleteCustomVariable` | DELETE | `/v1/custom-variables/{id}` | Delete custom variable |
| `getBluePrintTableConfig` | GET | `/v1/custom-variables/order-table-blueprint` | Get default table config |

## Usage

```bash
epilot template-variables getCategories
```
