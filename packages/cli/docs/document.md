# Document API

**API Name:** `document`
**Base URL:** `https://document.sls.epilot.io`

A document generation API that allows you to generate documents from templates with variables.

[Feature Documentation](

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `getTemplateMeta` | POST | `/v2/documents:meta` | getTemplateMeta |
| `generateDocumentV2` | POST | `/v2/documents:generate` | generateDocumentV2 |
| `convertDocument` | POST | `/v2/documents:convert` | convertDocument |

## Usage

```bash
epilot document getTemplateMeta
```
