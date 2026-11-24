/* Auto-copied from snapshot-client */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

export declare namespace Components {
    namespace Responses {
        export type BadRequest = Schemas.Error;
        export type Forbidden = Schemas.Error;
        export type NotFound = Schemas.Error;
        export interface RestoreConflict {
            status: 409;
            error: string;
            /**
             * Snapshot targeted by the active restore lease.
             */
            snapshot_id?: string;
            /**
             * Operation index reserved by the active restore lease.
             */
            restore_index?: number;
        }
        export type Unauthorized = Schemas.Error;
    }
    namespace Schemas {
        /**
         * Present when an agent made the call with a token carrying an `actor`
         * claim (e.g. the epilot Admin MCP via a login-as token). `user_id`/`name`
         * on the enclosing CallerIdentity are then the agent's token identity;
         * `on_behalf_of` is the user the agent acted for.
         *
         */
        export interface CallerActor {
            type: "agent";
            agent_id?: string;
            agent_name?: string;
            on_behalf_of?: {
                user_id: string;
            };
        }
        export interface CallerIdentity {
            name: string;
            user_id?: string;
            token_id?: string;
            actor?: /**
             * Present when an agent made the call with a token carrying an `actor`
             * claim (e.g. the epilot Admin MCP via a login-as token). `user_id`/`name`
             * on the enclosing CallerIdentity are then the agent's token identity;
             * `on_behalf_of` is the user the agent acted for.
             *
             */
            CallerActor;
        }
        /**
         * Request body for `captureOrgSnapshot`. All fields optional — an empty body
         * snapshots the whole org with a default name and the 90-day default TTL.
         *
         */
        export interface CreateOrgSnapshotRequest {
            /**
             * Snapshot name. Defaults to "Org snapshot — <ISO timestamp>".
             */
            name?: string;
            /**
             * Retention window. Converted to an absolute `expires_at` at creation
             * time. Omit for the default 90-day TTL.
             *
             */
            retention?: {
                value: number;
                unit: "days" | "weeks" | "months";
            };
            /**
             * Resource types to exclude from the capture, in addition to the
             * always-excluded sensitive types (`access_token`,
             * `environment_variable`).
             *
             */
            excluded_types?: string[];
        }
        export interface CreateSnapshotRequest {
            name: string;
            description?: string;
            /**
             * What initiated this snapshot. `scheduled` is used for automatic
             * nightly backups triggered by an org's EventBridge schedule
             * (RFC — Scheduled org snapshots).
             *
             */
            trigger?: "manual" | "sync" | "blueprint_install" | "scheduled";
            /**
             * Required iff `trigger === 'blueprint_install'`; forbidden otherwise.
             * Identifies the destination blueprint instance whose install this
             * snapshot covers. Used at restore time as the join key for the
             * lineage-driven delete sweep.
             *
             */
            blueprint_instance_id?: string;
            /**
             * List of resources to capture. Required non-empty for
             * `trigger === 'manual'` or `'sync'`. May be empty when
             * `trigger === 'blueprint_install'` — an install with no
             * resources to overwrite still needs a snapshot row so the
             * blueprint-manifest-api restore endpoint can find it.
             *
             */
            resources: ResourceRef[];
        }
        export interface CreateSnapshotResponse {
            id: string;
            name: string;
            status: "creating";
            created_at: string; // date-time
        }
        export interface Error {
            status: number;
            error: string;
        }
        export interface Operation {
            type: "create" | "restore";
            started_at: string; // date-time
            completed_at?: string; // date-time
            /**
             * For org creation, `partial` means at least one resource was captured
             * and at least one was skipped or failed. A nonempty inventory with
             * zero captured resources is `failed`; an empty inventory is `completed`.
             * Blueprint-install captures continue to fail on any fetch failure.
             * Restore status is the worse of engine status and outcome-derived status
             * (failed > partial > completed). Unreported resources count as failed,
             * except explicit pre-apply exclusions. Failed resources mixed with created, updated, or unchanged
             * resources produce partial; failures without successful resources produce
             * failed. Missing archived content also produces partial unless failed.
             * Explicit caller/type exclusions alone do not make a restore partial.
             *
             */
            status: "in_progress" | "completed" | "partial" | "failed";
            error?: string;
            summary?: /* One outcome per captured manifest resource, including exclusions. */ RestoreSummary;
            /**
             * Restore outcomes artifact key. Read outcomes through getRestore; this is not a download URL.
             */
            outcomes_s3_key?: string;
            triggered_by: CallerIdentity;
            /**
             * Restore only. How many target ids the caller selected with
             * `include_target_ids`. Absent on a full restore.
             *
             */
            selected_target_count?: number;
        }
        /**
         * Enrollment record for a scheduled org snapshot. One row per org.
         * This table — not EventBridge — is the source of truth; the EventBridge
         * schedule entry is the materialization of this row (reconciled on write
         * by Task 6).
         *
         */
        export interface OrgSnapshotSchedule {
            org_id: string;
            enabled: boolean;
            /**
             * Validated 6-field EventBridge cron. Default `cron(0 2 * * ? *)`.
             * example:
             * cron(0 2 * * ? *)
             */
            cron_expression: string;
            /**
             * IANA timezone. Default `Europe/Berlin`.
             */
            timezone: string;
            retention: /**
             * Flat retention window for a scheduled snapshot.
             * Converted to a `ttl` epoch at capture time. Capped at ~24 months.
             *
             */
            RetentionConfig;
            excluded_types?: string[];
            /**
             * Name of the EventBridge Scheduler entry this row owns.
             * Set at enrollment time as `org-snapshot-{orgId}`.
             *
             */
            schedule_name: string;
            last_started_at?: string; // date-time
            last_completed_at?: string; // date-time
            last_status?: "completed" | "partial" | "failed" | "skipped";
            /**
             * When the last completed or partial scheduled snapshot finished.
             */
            last_succeeded_at?: string; // date-time
            /**
             * Why the last run ended as it did. With `skipped`: a restore held the org
             * (`restore_in_progress`), and the run is retried. With `failed`: the schedule
             * day ended without a capture, because every attempt failed
             * (`attempts_exhausted`), a restore held the org until the day's window
             * closed (`restore_in_progress`), or the window closed before an attempt
             * could succeed (`window_closed`).
             *
             */
            last_status_reason?: "restore_in_progress" | "attempts_exhausted" | "window_closed";
            /**
             * `auto` when the org was enrolled automatically as a paying customer or
             * a sandbox of one; absent when a person enrolled it.
             *
             */
            enrolled_by?: "auto";
            /**
             * When the org was opted out (DELETE). Present while the enrollment is
             * disabled by an opt-out; cleared when it is enabled again.
             *
             */
            opted_out_at?: string; // date-time
            /**
             * The user who opted the org out.
             */
            opted_out_by?: string;
            /**
             * The user who enrolled the org, or `system:auto-enroll` for an
             * automatic enrollment.
             *
             */
            created_by: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            blocked?: /**
             * No scheduled capture starts for the org until this is resolved. The admitted
             * execution cannot be verified; epilot resolves it.
             *
             */
            ScheduleBlocked;
            /**
             * Present when no completed or partial scheduled snapshot followed an owed
             * schedule slot for longer than the stale threshold (48 hours by default):
             * the time of that slot. Absent while the `run-daily-snapshots` flag is off
             * for the org.
             *
             */
            stale_since?: string; // date-time
        }
        /**
         * Body for `putOrgSnapshotSchedule`. All fields optional; unset fields
         * receive defaults on first create and are left unchanged on updates
         * (except `updated_at`).
         *
         */
        export interface PutOrgSnapshotScheduleRequest {
            /**
             * Whether the schedule is active.
             */
            enabled?: boolean;
            /**
             * 6-field EventBridge cron expression, e.g. `cron(0 2 * * ? *)`.
             * Validated server-side: minute + hour must be concrete single integers
             * (no `*`, lists, ranges, or steps) to cap cadence at ≤ once/day.
             * Exactly one of day-of-month / day-of-week must be `?`.
             *
             * example:
             * cron(0 2 * * ? *)
             */
            cron_expression?: string;
            /**
             * IANA timezone string passed to EventBridge `ScheduleExpressionTimezone`,
             * e.g. `Europe/Berlin`. AWS handles DST natively.
             *
             * example:
             * Europe/Berlin
             */
            timezone?: string;
            retention?: /**
             * Flat retention window for a scheduled snapshot.
             * Converted to a `ttl` epoch at capture time. Capped at ~24 months.
             *
             */
            RetentionConfig;
            /**
             * Resource types to exclude from the scheduled capture, in addition
             * to the always-excluded sensitive types (`access_token`,
             * `environment_variable`).
             *
             */
            excluded_types?: string[];
        }
        export interface ResourceRef {
            /**
             * Resource type (e.g., custom_variable, journey, automation_flow)
             */
            type: string;
            id: string;
        }
        export interface RestoreOutcome {
            type: string;
            /**
             * Engine result identity when available, otherwise captured identity. Re-created resources may have a new id.
             */
            id: string;
            /**
             * The id the resource was captured under. Absent on outcomes written before this field existed.
             */
            captured_id?: string;
            lineage_id?: string;
            /**
             * unchanged maps the engine no-op impact. Engine 0.5.3 does not distinguish
             * unchanged payloads from every internal skip; reason engine_no_op preserves
             * that limitation. Explicit pre-apply exclusions are skipped.
             *
             */
            action: "created" | "updated" | "unchanged" | "failed" | "skipped";
            reason?: string;
            error?: string;
        }
        /**
         * Live progress of a running restore (present only while the operation is
         * in_progress), read from config-engine's operation log. A resource is
         * "matched" once found or created, "applied" once its full payload is written.
         *
         */
        export interface RestoreProgress {
            started: number;
            matched: number;
            applied: number;
            failed: number;
            phase: "preparing" | "matching" | "applying";
            by_type: {
                type: string;
                started: number;
                applied: number;
                failed: number;
            }[];
            /**
             * Latest activity first, at most 20.
             */
            recent: RestoreResourceProgress[];
            /**
             * Every resource started so far, when there are at most 500.
             */
            resources?: RestoreResourceProgress[];
            updated_at?: string; // date-time
        }
        export interface RestoreResourceProgress {
            type: string;
            /**
             * The captured id.
             */
            id: string;
            target_id?: string;
            state: "working" | "matched" | "applied" | "failed";
            error?: string;
            at?: string; // date-time
        }
        /**
         * Apply a captured snapshot to its source org. snapshot-api applies the
         * manifest verbatim minus any target ids the caller pre-decided to skip.
         * Drift detection (skip modified-since-install) is the caller's
         * responsibility — blueprint-manifest-api owns that logic for blueprint
         * restores; Config Hub's manual restore just omits the field.
         *
         */
        export interface RestoreSnapshotRequest {
            /**
             * Target ids the caller has decided not to restore. snapshot-api
             * applies the manifest minus these ids. Drops are silent — the
             * caller supplied the list and already knows.
             *
             */
            exclude_target_ids?: string[];
            /**
             * Restore only these target ids. Every other captured resource is
             * skipped with reason `not_selected` and left as it is now. Omit to
             * restore the whole snapshot. Applied before `exclude_target_ids`.
             * Must hold at least one id, and at least one id must match a
             * captured resource's target id (not its lineage id), otherwise the
             * request is rejected with 400 and no restore is recorded. Ids that
             * match nothing in the snapshot are ignored and not counted in
             * `selected_target_count`. There is no upper bound beyond the
             * request body size: the list reaches the worker through S3.
             *
             */
            include_target_ids?: string[];
            /**
             * The blueprint instance being reverted. Required when the caller
             * restores with `blueprint:install` instead of
             * `configuration_hub:snapshot:restore`, and must match the snapshot's
             * own `blueprint_instance_id`.
             *
             */
            blueprint_instance_id?: string;
        }
        export interface RestoreSnapshotResponse {
            /**
             * Index of the created restore operation in the snapshot restores array.
             */
            restore_index: number;
            id: string;
            status: "restoring";
        }
        /**
         * One outcome per captured manifest resource, including exclusions.
         */
        export interface RestoreSummary {
            total: number;
            created: number;
            updated: number;
            unchanged: number;
            failed: number;
            skipped: number;
        }
        /**
         * Flat retention window for a scheduled snapshot.
         * Converted to a `ttl` epoch at capture time. Capped at ~24 months.
         *
         */
        export interface RetentionConfig {
            /**
             * Numeric quantity of retention (e.g. 90 for "90 days").
             */
            value: number;
            unit: "days" | "weeks" | "months";
        }
        /**
         * No scheduled capture starts for the org until this is resolved. The admitted
         * execution cannot be verified; epilot resolves it.
         *
         */
        export interface ScheduleBlocked {
            since: string; // date-time
            reason: "execution_unverifiable";
            execution_arn?: string;
        }
        export interface Snapshot {
            id: string;
            org_id: string;
            name: string;
            description?: string;
            trigger: "manual" | "sync" | "blueprint_install" | "scheduled" | "analytics";
            /**
             * Set iff `trigger === 'blueprint_install'`. The destination blueprint
             * instance this snapshot covers.
             *
             */
            blueprint_instance_id?: string;
            /**
             * Resource type → count of resources of that type in the snapshot.
             */
            resource_counts: {
                [name: string]: number;
            };
            create: Operation;
            restores: Operation[];
            /**
             * Number of `resource` filter pairs from the request that are
             * contained in this snapshot. Present only on `listSnapshots`
             * responses where the caller passed at least one `resource`
             * filter — absent on `getSnapshot` and on unfiltered list calls.
             * Drives the coverage badge in Config Hub's snapshot picker.
             *
             */
            matched_count?: number;
            /**
             * Capture scope. `selection` (default for manual/sync/blueprint_install)
             * means only the explicitly listed resources were snapshotted.
             * `org` means a full org inventory was discovered and captured
             * (scheduled snapshots set this automatically).
             *
             */
            scope?: "selection" | "org";
            /**
             * ISO-8601 timestamp after which this snapshot will be deleted.
             * Derived from the org's retention setting at capture time for
             * scheduled snapshots; not set for manual snapshots (which use
             * a hardcoded 90-day TTL written directly as a DynamoDB `ttl` epoch).
             *
             */
            expires_at?: string; // date-time
            /**
             * Per-snapshot coverage report set by the capture worker on completion.
             * Records how many resources were attempted, captured, skipped
             * (not found, not archivable, or a user-scoped resource the capturing
             * identity is not permitted to read), and failed. A blueprint_install capture
             * fails if any resource fetch throws. Org captures are partial when resources
             * were skipped or failed, and failed when a nonempty inventory captured nothing.
             * Excluded, sensitive, or unsupported types do not count as resource skips.
             *
             */
            capture_summary?: {
                /**
                 * Total resources in the inventory that were attempted.
                 */
                total: number;
                /**
                 * Resources successfully fetched and written to the manifest.
                 */
                captured: number;
                /**
                 * Resources not found, not archivable, or (for user-scoped types such as
                 * kanban, dashboard and insight) not readable by the capturing identity,
                 * excluding thrown fetch errors.
                 *
                 */
                skipped: number;
                /**
                 * Resources where the fetch call returned an error.
                 */
                failed: number;
            };
            /**
             * Bounded sample of skipped identities (at most 20 entries and 2 KiB of JSON).
             * Complete identities are retained in internal S3 capture artifacts.
             * Present on finalized captures; absent on older snapshots.
             *
             */
            skipped_resources?: [
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    /**
                     * Why the resource is not in the snapshot. `not found` when it no longer
                     * resolves; `permission_denied` when a user-scoped resource (kanban,
                     * dashboard, insight) is owned by another user and the capturing identity
                     * cannot read it, which also means it cannot be changed by that identity,
                     * or when a manual org snapshot's user is not allowed to read the resource;
                     * `owned_by_other_org` when the inventory lists a resource owned by another
                     * organization (a partner role or shared resource), which is not this
                     * organization's configuration; otherwise the content-archive reason.
                     *
                     */
                    reason: string;
                }?
            ];
            /**
             * True when skipped_resources contains fewer identities than capture_summary.skipped.
             */
            skipped_resources_truncated?: boolean;
            /**
             * Bounded sample of identities whose fetch threw (at most 20 entries and 2 KiB of JSON),
             * each with the error message as `reason`. Complete identities are retained in internal
             * S3 capture artifacts. Present on finalized captures; absent on older snapshots.
             *
             */
            failed_resources?: [
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?,
                {
                    type: string;
                    id: string;
                    reason: string;
                }?
            ];
            /**
             * True when failed_resources contains fewer identities than capture_summary.failed.
             */
            failed_resources_truncated?: boolean;
        }
        /**
         * A single captured resource with its full payload. The identity fields
         * match `SnapshotResourceSummary`; the `captured` payload is the
         * pre-install state at snapshot time.
         *
         */
        export interface SnapshotResourceDetail {
            lineage_id: string;
            target_id: string;
            type: string;
            name?: string | null;
            /**
             * Full captured payload of the resource at snapshot time.
             */
            captured: {
                [name: string]: any;
            };
        }
        export interface SnapshotResourceList {
            resources: /**
             * Lightweight identity for a captured resource. Returned by
             * `listSnapshotResources`; the full payload is fetched separately via
             * `getSnapshotResource` when needed.
             *
             */
            SnapshotResourceSummary[];
        }
        /**
         * Lightweight identity for a captured resource. Returned by
         * `listSnapshotResources`; the full payload is fetched separately via
         * `getSnapshotResource` when needed.
         *
         */
        export interface SnapshotResourceSummary {
            /**
             * Deprecated alias of `target_id`. Always equals `target_id` (the
             * implementation never distinguished them). Use `target_id`.
             *
             */
            lineage_id: string;
            /**
             * Identifier the resource was captured by (passed in via `ResourceRef.id` on createSnapshot).
             */
            target_id: string;
            type: string;
            /**
             * Best-effort display name extracted from the captured payload
             * (`name` / `title` / `label` / `key` in that order). Null when
             * none of those fields are present.
             *
             */
            name?: string | null;
        }
    }
}
export declare namespace Paths {
    namespace CaptureOrgSnapshot {
        export type RequestBody = /**
         * Request body for `captureOrgSnapshot`. All fields optional — an empty body
         * snapshots the whole org with a default name and the 90-day default TTL.
         *
         */
        Components.Schemas.CreateOrgSnapshotRequest;
        namespace Responses {
            export type $202 = Components.Schemas.CreateSnapshotResponse;
            export type $401 = Components.Responses.Unauthorized;
            export type $409 = Components.Responses.RestoreConflict;
        }
    }
    namespace CreateSnapshot {
        export type RequestBody = Components.Schemas.CreateSnapshotRequest;
        namespace Responses {
            export type $202 = Components.Schemas.CreateSnapshotResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $409 = Components.Responses.RestoreConflict;
        }
    }
    namespace DeleteOrgSnapshotSchedule {
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export interface $502 {
            }
        }
    }
    namespace DeleteSnapshot {
        namespace Responses {
            export interface $204 {
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.RestoreConflict;
        }
    }
    namespace GetOrgSnapshotSchedule {
        namespace Responses {
            export type $200 = /**
             * Enrollment record for a scheduled org snapshot. One row per org.
             * This table — not EventBridge — is the source of truth; the EventBridge
             * schedule entry is the materialization of this row (reconciled on write
             * by Task 6).
             *
             */
            Components.Schemas.OrgSnapshotSchedule;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetRestore {
        namespace Parameters {
            export type Action = string;
            export type Id = string;
            export type Index = number;
            export type Limit = number;
            export type Offset = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
            index: Parameters.Index;
        }
        export interface QueryParameters {
            offset?: Parameters.Offset;
            limit?: Parameters.Limit;
            action?: Parameters.Action;
        }
        namespace Responses {
            export interface $200 {
                operation: Components.Schemas.Operation;
                outcomes: Components.Schemas.RestoreOutcome[];
                outcomes_available: boolean;
                /**
                 * Resources the restore covers — the selection, or everything captured.
                 */
                total?: number;
                progress?: /**
                 * Live progress of a running restore (present only while the operation is
                 * in_progress), read from config-engine's operation log. A resource is
                 * "matched" once found or created, "applied" once its full payload is written.
                 *
                 */
                Components.Schemas.RestoreProgress;
                /**
                 * Omitted on the last page.
                 */
                next_offset?: number;
            }
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetSnapshot {
        namespace Responses {
            export type $200 = Components.Schemas.Snapshot;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace GetSnapshotResource {
        namespace Responses {
            export type $200 = /**
             * A single captured resource with its full payload. The identity fields
             * match `SnapshotResourceSummary`; the `captured` payload is the
             * pre-install state at snapshot time.
             *
             */
            Components.Schemas.SnapshotResourceDetail;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListDependencies {
        export interface RequestBody {
            resources: Components.Schemas.ResourceRef[];
        }
        namespace Responses {
            export interface $200 {
                dependencies: Components.Schemas.ResourceRef[];
            }
            export type $401 = Components.Responses.Unauthorized;
            export type $501 = Components.Schemas.Error;
        }
    }
    namespace ListSnapshotResources {
        namespace Responses {
            export type $200 = Components.Schemas.SnapshotResourceList;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
        }
    }
    namespace ListSnapshots {
        namespace Parameters {
            export type Cursor = string;
            export type Resource = string /* ^[^:]+:.+$ */[];
            export type Size = number;
            export type Trigger = "manual" | "sync" | "blueprint_install" | "scheduled" | "analytics";
        }
        export interface QueryParameters {
            cursor?: Parameters.Cursor;
            size?: Parameters.Size;
            resource?: Parameters.Resource;
            trigger?: Parameters.Trigger;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Number of items in this page (not the total across all pages).
                 */
                page_size: number;
                /**
                 * Pagination cursor; pass to the next request to get the next page.
                 */
                cursor?: string;
                results: Components.Schemas.Snapshot[];
            }
            export type $401 = Components.Responses.Unauthorized;
        }
    }
    namespace PutOrgSnapshotSchedule {
        export type RequestBody = /**
         * Body for `putOrgSnapshotSchedule`. All fields optional; unset fields
         * receive defaults on first create and are left unchanged on updates
         * (except `updated_at`).
         *
         */
        Components.Schemas.PutOrgSnapshotScheduleRequest;
        namespace Responses {
            export type $200 = /**
             * Enrollment record for a scheduled org snapshot. One row per org.
             * This table — not EventBridge — is the source of truth; the EventBridge
             * schedule entry is the materialization of this row (reconciled on write
             * by Task 6).
             *
             */
            Components.Schemas.OrgSnapshotSchedule;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export interface $502 {
            }
        }
    }
    namespace RestoreSnapshot {
        export type RequestBody = /**
         * Apply a captured snapshot to its source org. snapshot-api applies the
         * manifest verbatim minus any target ids the caller pre-decided to skip.
         * Drift detection (skip modified-since-install) is the caller's
         * responsibility — blueprint-manifest-api owns that logic for blueprint
         * restores; Config Hub's manual restore just omits the field.
         *
         */
        Components.Schemas.RestoreSnapshotRequest;
        namespace Responses {
            export type $202 = Components.Schemas.RestoreSnapshotResponse;
            export type $400 = Components.Responses.BadRequest;
            export type $401 = Components.Responses.Unauthorized;
            export type $404 = Components.Responses.NotFound;
            export type $409 = Components.Responses.RestoreConflict;
        }
    }
    namespace V1Snapshots$Id {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
    namespace V1Snapshots$IdResources {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
    namespace V1Snapshots$IdResources$LineageId {
        namespace Parameters {
            export type Id = string;
            export type LineageId = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
            lineage_id: Parameters.LineageId;
        }
    }
    namespace V1Snapshots$IdRestore {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
}


export interface OperationMethods {
  /**
   * listSnapshots - listSnapshots
   * 
   * List snapshots for the caller's organization, newest first.
   * 
   * Pass `resource=<type>:<id>` one or more times to filter to snapshots
   * containing **any** of the listed resources (OR semantics). Each returned
   * snapshot includes a `matched_count` indicating how many of the filter
   * pairs are present in it. Hard cap of 50 filter pairs per request. When
   * filtered, pagination is not applied — the result set is bounded.
   * 
   */
  'listSnapshots'(
    parameters?: Parameters<Paths.ListSnapshots.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSnapshots.Responses.$200>
  /**
   * createSnapshot - createSnapshot
   * 
   * Create a new snapshot of the given resources. Async — returns immediately
   * with a snapshot ID; client polls `getSnapshot` until `create.status`
   * moves from `in_progress` to `completed` or `failed`.
   * 
   * Sensitive types and types with no engine adapter are dropped before
   * capture. A `blueprint_install` snapshot instead rejects a type with no
   * engine adapter (400), so an install never runs with resources it cannot
   * roll back.
   * 
   */
  'createSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateSnapshot.Responses.$202>
  /**
   * captureOrgSnapshot - captureOrgSnapshot
   * 
   * Snapshot the caller's whole organization now. Creates a `scope: "org"`
   * snapshot row and starts a chunked capture Step Function, then returns
   * immediately. The capture asynchronously fetches a fresh inventory of the
   * org's configuration resources from configuration-hub-api, persists it as
   * an inventory artifact, and captures each resource. Client polls
   * `getSnapshot` and watches `capture_summary` fill in until `create.status`
   * moves from `in_progress` to `completed`, `partial`, or `failed`. An empty
   * inventory finalizes as a completed 0-resource snapshot. A nonempty
   * inventory with zero captured resources fails.
   * 
   * Sensitive types (`access_token`, `environment_variable`), types with no
   * engine adapter, and any `excluded_types` are dropped from the capture and
   * recorded in the snapshot's coverage report.
   * 
   */
  'captureOrgSnapshot'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CaptureOrgSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CaptureOrgSnapshot.Responses.$202>
  /**
   * getSnapshot - getSnapshot
   * 
   * Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.
   */
  'getSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSnapshot.Responses.$200>
  /**
   * deleteSnapshot - deleteSnapshot
   * 
   * Delete a snapshot's metadata and S3 manifest. Refused with 409 while the
   * snapshot is still being created, while one of its restores is in progress,
   * or while the organization holds a restore lease.
   * 
   */
  'deleteSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSnapshot.Responses.$204>
  /**
   * getRestore - getRestore
   * 
   * Fetch a restore operation and a page of per-resource outcomes in manifest order.
   * Pagination bounds response size for org snapshots; the compressed artifact is
   * read in full for each page. Outcomes are immutable once published. Historical,
   * in-progress, or early-failed operations may have no artifact: outcomes_available
   * is false and outcomes is empty. A published but missing artifact returns 404.
   * 
   */
  'getRestore'(
    parameters?: Parameters<Paths.GetRestore.QueryParameters & Paths.GetRestore.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetRestore.Responses.$200>
  /**
   * restoreSnapshot - restoreSnapshot
   * 
   * Restore a snapshot to the org. Async — returns immediately; client polls
   * `getSnapshot` until `restores[restore_index]` (using the index returned by this POST) moves from
   * `in_progress` to one of `completed | partial | failed`.
   * 
   * Completed captures and partial org captures can be restored. A partial
   * org capture restores only the resources that were captured.
   * 
   * Pass `include_target_ids` to restore only the chosen resources; every
   * other captured resource is left as it is now. A selection that names
   * no captured resource is rejected with 400 before a restore is started.
   * 
   */
  'restoreSnapshot'(
    parameters?: Parameters<Paths.V1Snapshots$IdRestore.PathParameters> | null,
    data?: Paths.RestoreSnapshot.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RestoreSnapshot.Responses.$202>
  /**
   * listSnapshotResources - listSnapshotResources
   * 
   * List the resources captured in this snapshot. Returns lightweight
   * identity fields per resource — payloads are fetched via the
   * single-resource endpoint when needed.
   * 
   * Used by Config Hub UI to render snapshot contents, and by
   * blueprint-manifest-api to partition lineage rows during a restore
   * sweep (resources in this list are touched; others are net-new).
   * 
   */
  'listSnapshotResources'(
    parameters?: Parameters<Paths.V1Snapshots$IdResources.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListSnapshotResources.Responses.$200>
  /**
   * getSnapshotResource - getSnapshotResource
   * 
   * Fetch one captured resource with its full payload. For UI views
   * that diff the captured state against the current destination.
   * 
   */
  'getSnapshotResource'(
    parameters?: Parameters<Paths.V1Snapshots$IdResources$LineageId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSnapshotResource.Responses.$200>
  /**
   * getOrgSnapshotSchedule - getOrgSnapshotSchedule
   * 
   * Return the scheduled-snapshot enrollment config for the caller's org,
   * with `blocked` while no scheduled capture can start and `stale_since`
   * while scheduled captures have stopped succeeding.
   * Returns 404 when the org has never been enrolled; an org that opted
   * out returns its disabled enrollment with `opted_out_at`.
   * 
   */
  'getOrgSnapshotSchedule'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetOrgSnapshotSchedule.Responses.$200>
  /**
   * putOrgSnapshotSchedule - putOrgSnapshotSchedule
   * 
   * Create or update the scheduled-snapshot enrollment config for the
   * caller's org (upsert). The cron expression, timezone and retention
   * window are validated server-side; invalid values are rejected with 400.
   * 
   * Defaults applied when a field is omitted on first create:
   *   - `cron_expression`: `cron(0 2 * * ? *)` (daily at 02:00)
   *   - `timezone`: `Europe/Berlin`
   *   - `retention`: `{ value: 90, unit: "days" }`
   *   - `enabled`: `true`
   * 
   * The EventBridge schedule is created, updated or (when `enabled` is
   * false) removed first; the row is persisted only after that succeeds.
   * A Scheduler failure returns 502 and leaves the stored config unchanged.
   * A daily reconcile repairs any remaining drift between rows and schedules.
   * 
   */
  'putOrgSnapshotSchedule'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PutOrgSnapshotSchedule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutOrgSnapshotSchedule.Responses.$200>
  /**
   * deleteOrgSnapshotSchedule - deleteOrgSnapshotSchedule
   * 
   * Opt the caller's org out of scheduled snapshots. The EventBridge
   * schedule is removed and the enrollment is kept, disabled, with
   * `opted_out_at` and `opted_out_by`, so no scheduled snapshot is taken
   * and automatic enrollment never enrolls the org again. A PUT with
   * `enabled: true` enrolls it again and clears the opt-out.
   * Returns 404 when the org has no enrollment.
   * The EventBridge schedule is removed first; the row is disabled only
   * after that succeeds. A Scheduler failure returns 502 and leaves the
   * enrollment unchanged so the call can be retried.
   * 
   */
  'deleteOrgSnapshotSchedule'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteOrgSnapshotSchedule.Responses.$204>
  /**
   * listDependencies - listDependencies
   * 
   * Walk the dependency tree for a set of resources and return the full
   * transitive closure, topologically sorted.
   * 
   * **Not implemented in v1.** Returns 501. Callers should pass an explicit
   * resource list to `createSnapshot`. See RFC Phase 5.
   * 
   */
  'listDependencies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ListDependencies.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDependencies.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/snapshots']: {
    /**
     * createSnapshot - createSnapshot
     * 
     * Create a new snapshot of the given resources. Async — returns immediately
     * with a snapshot ID; client polls `getSnapshot` until `create.status`
     * moves from `in_progress` to `completed` or `failed`.
     * 
     * Sensitive types and types with no engine adapter are dropped before
     * capture. A `blueprint_install` snapshot instead rejects a type with no
     * engine adapter (400), so an install never runs with resources it cannot
     * roll back.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateSnapshot.Responses.$202>
    /**
     * listSnapshots - listSnapshots
     * 
     * List snapshots for the caller's organization, newest first.
     * 
     * Pass `resource=<type>:<id>` one or more times to filter to snapshots
     * containing **any** of the listed resources (OR semantics). Each returned
     * snapshot includes a `matched_count` indicating how many of the filter
     * pairs are present in it. Hard cap of 50 filter pairs per request. When
     * filtered, pagination is not applied — the result set is bounded.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListSnapshots.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSnapshots.Responses.$200>
  }
  ['/v1/snapshots:capture-org']: {
    /**
     * captureOrgSnapshot - captureOrgSnapshot
     * 
     * Snapshot the caller's whole organization now. Creates a `scope: "org"`
     * snapshot row and starts a chunked capture Step Function, then returns
     * immediately. The capture asynchronously fetches a fresh inventory of the
     * org's configuration resources from configuration-hub-api, persists it as
     * an inventory artifact, and captures each resource. Client polls
     * `getSnapshot` and watches `capture_summary` fill in until `create.status`
     * moves from `in_progress` to `completed`, `partial`, or `failed`. An empty
     * inventory finalizes as a completed 0-resource snapshot. A nonempty
     * inventory with zero captured resources fails.
     * 
     * Sensitive types (`access_token`, `environment_variable`), types with no
     * engine adapter, and any `excluded_types` are dropped from the capture and
     * recorded in the snapshot's coverage report.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CaptureOrgSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CaptureOrgSnapshot.Responses.$202>
  }
  ['/v1/snapshots/{id}']: {
    /**
     * getSnapshot - getSnapshot
     * 
     * Fetch a snapshot's metadata. Poll this endpoint to track create/restore progress.
     */
    'get'(
      parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSnapshot.Responses.$200>
    /**
     * deleteSnapshot - deleteSnapshot
     * 
     * Delete a snapshot's metadata and S3 manifest. Refused with 409 while the
     * snapshot is still being created, while one of its restores is in progress,
     * or while the organization holds a restore lease.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1Snapshots$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSnapshot.Responses.$204>
  }
  ['/v1/snapshots/{id}/restores/{index}']: {
    /**
     * getRestore - getRestore
     * 
     * Fetch a restore operation and a page of per-resource outcomes in manifest order.
     * Pagination bounds response size for org snapshots; the compressed artifact is
     * read in full for each page. Outcomes are immutable once published. Historical,
     * in-progress, or early-failed operations may have no artifact: outcomes_available
     * is false and outcomes is empty. A published but missing artifact returns 404.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetRestore.QueryParameters & Paths.GetRestore.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetRestore.Responses.$200>
  }
  ['/v1/snapshots/{id}:restore']: {
    /**
     * restoreSnapshot - restoreSnapshot
     * 
     * Restore a snapshot to the org. Async — returns immediately; client polls
     * `getSnapshot` until `restores[restore_index]` (using the index returned by this POST) moves from
     * `in_progress` to one of `completed | partial | failed`.
     * 
     * Completed captures and partial org captures can be restored. A partial
     * org capture restores only the resources that were captured.
     * 
     * Pass `include_target_ids` to restore only the chosen resources; every
     * other captured resource is left as it is now. A selection that names
     * no captured resource is rejected with 400 before a restore is started.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.V1Snapshots$IdRestore.PathParameters> | null,
      data?: Paths.RestoreSnapshot.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RestoreSnapshot.Responses.$202>
  }
  ['/v1/snapshots/{id}/resources']: {
    /**
     * listSnapshotResources - listSnapshotResources
     * 
     * List the resources captured in this snapshot. Returns lightweight
     * identity fields per resource — payloads are fetched via the
     * single-resource endpoint when needed.
     * 
     * Used by Config Hub UI to render snapshot contents, and by
     * blueprint-manifest-api to partition lineage rows during a restore
     * sweep (resources in this list are touched; others are net-new).
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1Snapshots$IdResources.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListSnapshotResources.Responses.$200>
  }
  ['/v1/snapshots/{id}/resources/{lineage_id}']: {
    /**
     * getSnapshotResource - getSnapshotResource
     * 
     * Fetch one captured resource with its full payload. For UI views
     * that diff the captured state against the current destination.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.V1Snapshots$IdResources$LineageId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSnapshotResource.Responses.$200>
  }
  ['/v1/org-snapshot-schedule']: {
    /**
     * getOrgSnapshotSchedule - getOrgSnapshotSchedule
     * 
     * Return the scheduled-snapshot enrollment config for the caller's org,
     * with `blocked` while no scheduled capture can start and `stale_since`
     * while scheduled captures have stopped succeeding.
     * Returns 404 when the org has never been enrolled; an org that opted
     * out returns its disabled enrollment with `opted_out_at`.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetOrgSnapshotSchedule.Responses.$200>
    /**
     * putOrgSnapshotSchedule - putOrgSnapshotSchedule
     * 
     * Create or update the scheduled-snapshot enrollment config for the
     * caller's org (upsert). The cron expression, timezone and retention
     * window are validated server-side; invalid values are rejected with 400.
     * 
     * Defaults applied when a field is omitted on first create:
     *   - `cron_expression`: `cron(0 2 * * ? *)` (daily at 02:00)
     *   - `timezone`: `Europe/Berlin`
     *   - `retention`: `{ value: 90, unit: "days" }`
     *   - `enabled`: `true`
     * 
     * The EventBridge schedule is created, updated or (when `enabled` is
     * false) removed first; the row is persisted only after that succeeds.
     * A Scheduler failure returns 502 and leaves the stored config unchanged.
     * A daily reconcile repairs any remaining drift between rows and schedules.
     * 
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PutOrgSnapshotSchedule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutOrgSnapshotSchedule.Responses.$200>
    /**
     * deleteOrgSnapshotSchedule - deleteOrgSnapshotSchedule
     * 
     * Opt the caller's org out of scheduled snapshots. The EventBridge
     * schedule is removed and the enrollment is kept, disabled, with
     * `opted_out_at` and `opted_out_by`, so no scheduled snapshot is taken
     * and automatic enrollment never enrolls the org again. A PUT with
     * `enabled: true` enrolls it again and clears the opt-out.
     * Returns 404 when the org has no enrollment.
     * The EventBridge schedule is removed first; the row is disabled only
     * after that succeeds. A Scheduler failure returns 502 and leaves the
     * enrollment unchanged so the call can be retried.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteOrgSnapshotSchedule.Responses.$204>
  }
  ['/v1/snapshots:list-dependencies']: {
    /**
     * listDependencies - listDependencies
     * 
     * Walk the dependency tree for a set of resources and return the full
     * transitive closure, topologically sorted.
     * 
     * **Not implemented in v1.** Returns 501. Callers should pass an explicit
     * resource list to `createSnapshot`. See RFC Phase 5.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ListDependencies.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDependencies.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type CallerActor = Components.Schemas.CallerActor;
export type CallerIdentity = Components.Schemas.CallerIdentity;
export type CreateOrgSnapshotRequest = Components.Schemas.CreateOrgSnapshotRequest;
export type CreateSnapshotRequest = Components.Schemas.CreateSnapshotRequest;
export type CreateSnapshotResponse = Components.Schemas.CreateSnapshotResponse;
export type Error = Components.Schemas.Error;
export type Operation = Components.Schemas.Operation;
export type OrgSnapshotSchedule = Components.Schemas.OrgSnapshotSchedule;
export type PutOrgSnapshotScheduleRequest = Components.Schemas.PutOrgSnapshotScheduleRequest;
export type ResourceRef = Components.Schemas.ResourceRef;
export type RestoreOutcome = Components.Schemas.RestoreOutcome;
export type RestoreProgress = Components.Schemas.RestoreProgress;
export type RestoreResourceProgress = Components.Schemas.RestoreResourceProgress;
export type RestoreSnapshotRequest = Components.Schemas.RestoreSnapshotRequest;
export type RestoreSnapshotResponse = Components.Schemas.RestoreSnapshotResponse;
export type RestoreSummary = Components.Schemas.RestoreSummary;
export type RetentionConfig = Components.Schemas.RetentionConfig;
export type ScheduleBlocked = Components.Schemas.ScheduleBlocked;
export type Snapshot = Components.Schemas.Snapshot;
export type SnapshotResourceDetail = Components.Schemas.SnapshotResourceDetail;
export type SnapshotResourceList = Components.Schemas.SnapshotResourceList;
export type SnapshotResourceSummary = Components.Schemas.SnapshotResourceSummary;
