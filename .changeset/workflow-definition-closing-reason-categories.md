---
"@epilot/workflow-definition-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Add closing reason categories to the Workflow Definition API: `getAllClosingReasonCategories`, `createClosingReasonCategory`, `getClosingReasonCategory`, `updateClosingReasonCategory` and `deleteClosingReasonCategory` (`/v1/workflows/closing-reason-categories`), plus `categoryId` and the read-only resolved `category` on `ClosingReason`
