---
"@epilot/identity-client": minor
"@epilot/sdk": minor
---

Regenerate from the current Identity API definition:

- `created_by` / `updated_by` on partner clients and organization enablements, and `recorded_by` on authorization policies, now carry the admin-portal operator's email instead of their Cognito identity.
- `partner_account` is removed from `OrgEnablementCreate`, `OrgEnablementUpdate` and `OrgEnablement`: partners map an organization to their tenant by `org_id`, so the reference had no consumer.
- Adds the operator read `getUserSubject` (`GET /v1/identity/operator/clients/{client_id}/organizations/{org_id}/users/{user_id}:subject`), returning the pairwise `sub` a client receives for one organization member.
- Every operation declares `x-epilot-permissions`.
