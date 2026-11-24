---
"@epilot/configuration-hub-client": minor
"@epilot/organization-client": minor
"@epilot/sdk": minor
"@epilot/cli": minor
---

Refresh the Configuration Hub and Organization API contracts from the published specs.

- Configuration Hub: preview orgs (`createPreview`, `listPreviews`, `getPreview`) and sync job health (`getSyncJobHealth`, `runSyncJobHealth`).
- Organization: announcements (`getActiveAnnouncement`, `acknowledgeAnnouncement`), `notifySettingsValueUpdated`, and the `Preview` organization use. Internal-only schemas (e.g. `InternalOrganization`, `CreateOrganizationRequest`, `OrganizationToCleanup`) are no longer part of the public client; use `@epilot/organization-client-internal`.
