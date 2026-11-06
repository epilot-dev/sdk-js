---
'@epilot/integration-toolkit-client': patch
---

Update the `RELATION_REF_ITEM_NOT_FOUND` monitoring code description: a relation_ref whose item is missing on an existing target is now appended and retried, so the warning only fires for an invalid mapped value or when the item still doesn't match after its value was written.
