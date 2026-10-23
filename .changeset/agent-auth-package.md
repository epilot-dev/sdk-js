---
"@epilot/agent-auth": minor
---

New package `@epilot/agent-auth`: Agent Auth Protocol (AAP) client with Ed25519 key generation, RFC 7638 thumbprints, host/agent JWT signing, discovery caching, agent registration, capability requests, status polling (`waitForApproval`), capability execution, revoke/reactivate/rotate, plus epilot helpers (`listEpilotOrganizations`, `issueEpilotAccessToken`, `organizationAccessCapability`, `organizationGrants`, `epilotAgentAuthIssuer`) and access profiles (`ACCESS_PROFILES`, `ACCESS_PROFILE_INFO`, `access_profile` constraint, `requestOrganizationAccess` with client-side `reason_required` checks; `anonymize` is only accepted with read profiles).
