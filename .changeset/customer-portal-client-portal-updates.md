---
"@epilot/customer-portal-client": minor
---

Regenerate types from the upcoming Portal API spec (customer-portal-api !1738 + !1741). Breaking: removes `updatePortalUser`, `updateOrder` and `updateOpportunity` (and the `NewDesignMigrationResult` schema of the retired new-design migration), narrows the `updateContact` / `updateContract` request bodies to the new `PortalContactUpdate` / `PortalContractUpdate` schemas, and drops `JuiceSettings.is_legacy_design` and `PortalFeatureSettings.new_design`. Also syncs the client with the currently deployed spec: adds passkey, notification-preference, copilot-access, page/block detach and revision-preview operations, and removes `deleteEntityFile` and the unmerged `wait_for_*` / `WaitForEntityRule` hook-selection fields.
