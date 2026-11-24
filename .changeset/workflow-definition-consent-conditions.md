---
"@epilot/workflow-definition-client": minor
"@epilot/sdk": minor
"@epilot/cli": patch
---

Add consent conditions to the Workflow Definition API: `consent` as an `EvaluationSource.attribute_type`, compared by consent status (`active`, `pending`, `declined`, `unknown`), and `linked_entity` as an `EvaluationSource.origin_type`, a statement on the entity a Contexts display rule the workflow uses (`attach_to_contexts`) finds by relation
