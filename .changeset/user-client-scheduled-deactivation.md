---
'@epilot/user-client': minor
---

Regenerate from the User API spec (user-api `master`).

- Scheduled deactivation: `scheduleUserDeactivation` (`PUT /v2/users/{id}/scheduled-deactivation`) and `cancelScheduledUserDeactivation` (`DELETE /v2/users/{id}/scheduled-deactivation`), with the `ScheduledDeactivationRequest` and `ScheduledDeactivationError` schemas.
- `UserV2`: new read-only `deactivated_via` (`schedule`), `scheduled_deactivation_date`, `scheduled_deactivation_by` and `scheduled_deactivation_created_at`.
- Organization entries of a user: new `deletion_scheduled`.

3.16.0 is also the first release with `passkeys_registered` on `LoginParameters` and `actor` on `UserV2`.
