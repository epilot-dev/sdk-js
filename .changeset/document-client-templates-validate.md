---
"@epilot/document-client": minor
"@epilot/sdk": minor
---

Regenerate the document client from the Document API spec as deployed to production. New operation `validateTemplate` (`POST /v2/templates:validate`): checks a docx/xlsx/pptx template for tag and delimiter errors and, when asked, returns a corrected copy as a presigned download together with the list of issues (`TemplateIssue`: id, location such as `Tabelle1!N4`, before/after text, confidence, fixable). New types `TemplateValidationRequest` (`template_document`, `fix`, `fix_level: safe | aggressive`) and `TemplateValidationResponse` (`valid`, `fixed`, `issues`, `unresolved_errors`, `fixed_document`).
