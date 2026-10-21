---
"@epilot/sdk": patch
---

file-client: add file attribute suggestion operations (`createFileAttributeSuggestionJob`, `getLatestFileAttributeSuggestions`, `getFileAttributeSuggestionJob`, `updateFileAttributeSuggestionStatus`) and the `FileAttributeSuggestion*` schemas. Auto-fill moves from genai-api to file-api. The spec refresh also picks up file-api changes already deployed: `keep_original` on `previewPublicFile`, extra 403/404 responses, and `skipped` in `FileValidation.status` (exhaustive `switch` statements over that enum need a case).
