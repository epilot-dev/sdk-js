# Configuration Hub API

- **Base URL:** `https://configuration-hub.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/configuration-hub](https://docs.epilot.io/api/configuration-hub)

Lightweight index API for exploring epilot organization configurations.

## Quick Start

```bash
# List available operations
epilot configuration-hub

# Call an operation
epilot configuration-hub listConfigTypes
```

## Common Flags

| Flag | Description |
| ---- | ----------- |
| `-p key=value` | Set a named parameter |
| `-d '{...}'` | Request body JSON |
| `-H 'Key: Value'` | Custom header |
| `-t, --token <token>` | Bearer token for authentication |
| `--profile <name>` | Use a named profile |
| `-s, --server <url>` | Override server base URL |
| `-i, --include` | Include response headers in output |
| `--json` | Output raw JSON (no formatting) |
| `-v, --verbose` | Verbose output (show request details) |
| `--jsonata <expr>` | JSONata expression to transform response |
| `--definition <file>` | Override OpenAPI spec file/URL |
| `--guided` | Prompt for all parameters interactively |
| `--no-interactive` | Disable interactive prompts |

## Operations

**Configs**
- [`listConfigTypes`](#listconfigtypes) — Returns the static list of available configuration types with display metadata.
- [`listConfigs`](#listconfigs) — List configs of a given type with pagination. Returns summary metadata only
- [`getConfigDependencies`](#getconfigdependencies) — Get configs that are referenced by the given config.
- [`getConfigUsedBy`](#getconfigusedby) — Get configs that reference the given config (reverse dependencies).
- [`getIndex`](#getindex) — Return the current index build state for the caller's organization.
- [`rebuildIndex`](#rebuildindex) — Rebuild the configuration index for the caller's organization.
- [`getConfigInventory`](#getconfiginventory) — Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,

**Health**
- [`startHealthScan`](#starthealthscan) — Start an asynchronous org health scan — fire-and-forget, mirrors
- [`getHealthReport`](#gethealthreport) — Return the caller org's current health report: scan status, summary
- [`requestHealthCoverage`](#requesthealthcoverage) — Send a request for configuration the health check does not cover yet.
- [`startHealthCleanup`](#starthealthcleanup) — Remove references that are already inert: dangling `$relation` entries
- [`setHealthFindingsIgnored`](#sethealthfindingsignored) — Acknowledge findings as intentional (or undo that). An ignored

**Compare**
- [`compareConfigs`](#compareconfigs) — Compare the caller org's configs of a single type against another
- [`suggestMatches`](#suggestmatches) — Run the sync-grade heuristic match (`lookupByHeuristic` — name / slug /
- [`confirmLineage`](#confirmlineage) — Persist a lineage entry pairing a source-org config with a config in
- [`breakLineage`](#breaklineage) — Delete a lineage entry from the caller org's partition (caller as sync

**Sync**
- [`listSyncJobs`](#listsyncjobs) — List sync jobs scoped to the caller's organization, paginated with an opaque
- [`createSyncJob`](#createsyncjob) — Create a new cross-org sync job. The job is enqueued for asynchronous execution
- [`getSyncJob`](#getsyncjob) — Fetch a single sync job by ID. Returns the job header, counts summary,
- [`getSyncJobHealth`](#getsyncjobhealth) — Targeted health check of an applied (non-dry-run) sync job. When the job
- [`runSyncJobHealth`](#runsyncjobhealth) — Start the targeted health check of a finished, applied sync job again:
- [`retrySyncJob`](#retrysyncjob) — Retry the unresolved resources from a prior sync job: `failed` rows, plus
- [`planSyncJobRetry`](#plansyncjobretry) — Preview what `retrySyncJob` would re-run for the same `resources`,
- [`cancelSyncJob`](#cancelsyncjob) — Cancel a running sync job. Marks the job `cancelled` with a `finished_at`
- [`listSyncJobEvents`](#listsyncjobevents) — Full activity log of a sync job, latest first: one event per resource
- [`listSyncJobResources`](#listsyncjobresources) — List the per-resource rows for a sync job. Supports filtering by status
- [`getSyncPlan`](#getsyncplan) — Summary of a plan: a dry-run sync job (`createSyncJob` with
- [`listSyncPlanDiffs`](#listsyncplandiffs) — Field-level diffs of a plan, one per planned resource: what the target
- [`getSyncPlanDiff`](#getsyncplandiff) — Field-level diff of one planned resource. See `listSyncPlanDiffs`.
- [`applySyncPlan`](#applysyncplan) — Run a finished plan for real. Creates a new sync job (it carries
- [`replanSyncPlan`](#replansyncplan) — Plan some rows of a plan again, in place, e.g. after fixing a

**Delete**
- [`listDeleteJobs`](#listdeletejobs) — List bulk-delete jobs scoped to the caller's organization, paginated
- [`createDeleteJob`](#createdeletejob) — Create a bulk-delete job for the caller's organization. The selected
- [`getDeleteJob`](#getdeletejob) — Fetch a single bulk-delete job by ID. Returns the job header and counts
- [`listDeleteJobResources`](#listdeletejobresources) — List the per-resource rows for a delete job, cursor-paginated. Used by

**Previews**
- [`listPreviews`](#listpreviews) — Lists the previews requested from the caller's current org, newest first (max 50).
- [`createPreview`](#createpreview) — Starts a preview of the caller's current org (internal callers: the org in `x-ivy-org-id`,
- [`getPreview`](#getpreview) — Returns a preview requested from the caller's current org, with its progress.

### `listConfigTypes`

Returns the static list of available configuration types with display metadata.

`GET /v1/configs/types`

**Sample Call**

```bash
epilot configuration-hub listConfigTypes
```

With JSONata filter:

```bash
epilot configuration-hub listConfigTypes --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "type": "journey",
      "label": "Journeys",
      "icon": "Route",
      "source_api": "https://journey.sls.epilot.io",
      "sdk_client": "@epilot/sdk/journey",
      "deletable": true
    }
  ]
}
```

</details>

---

### `listConfigs`

List configs of a given type with pagination. Returns summary metadata only

`GET /v1/configs/{type}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "datasource" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" \| "email_signature" \| "shared_inbox" \| "org_setting" | Yes | Configuration resource type |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |
| `q` | query | string | No | Search query to filter configs by name/title |
| `updated_after` | query | string (date-time) | No | Filter configs updated after this date (ISO 8601) |
| `updated_before` | query | string (date-time) | No | Filter configs updated before this date (ISO 8601) |
| `purposes` | query | string | No | Filter by purpose classification IDs (comma-separated) |
| `blueprint_ids` | query | string | No | Filter by installed-blueprint IDs (comma-separated). Only configs installed by one of the listed blueprints are returned. |
| `sort` | query | "updated_at" \| "usage" \| "name" | No | Sort order. `updated_at` (default) sorts by most recently modified.
`usage` sorts by the type-specific usage metric descending
(submissions for journeys, executions for automations, entities for schem |
| `active_only` | query | boolean | No | If true, filter out configs that are explicitly inactive (active=false).
Configs with no `active` field are always included.
 |

**Sample Call**

```bash
epilot configuration-hub listConfigs \
  -p type=example
```

Using positional args for path parameters:

```bash
epilot configuration-hub listConfigs example
```

With JSONata filter:

```bash
epilot configuration-hub listConfigs -p type=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "label": "string",
  "icon": "string",
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "aliases": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path",
      "active": true,
      "blueprints": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "metadata": {}
    }
  ]
}
```

</details>

---

### `getConfigDependencies`

Get configs that are referenced by the given config.

`GET /v1/configs/{type}/{id}/dependencies`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "datasource" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" \| "email_signature" \| "shared_inbox" \| "org_setting" | Yes | Configuration resource type |
| `id` | path | string | Yes | Configuration resource ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub getConfigDependencies \
  -p type=example \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getConfigDependencies example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getConfigDependencies -p type=example -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "aliases": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path",
      "active": true,
      "blueprints": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "metadata": {}
    }
  ]
}
```

</details>

---

### `getConfigUsedBy`

Get configs that reference the given config (reverse dependencies).

`GET /v1/configs/{type}/{id}/used_by`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | path | "journey" \| "datasource" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" \| "email_signature" \| "shared_inbox" \| "org_setting" | Yes | Configuration resource type |
| `id` | path | string | Yes | Configuration resource ID |

**Sample Call**

```bash
epilot configuration-hub getConfigUsedBy \
  -p type=example \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getConfigUsedBy example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getConfigUsedBy -p type=example -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 0,
  "next_cursor": "string",
  "results": [
    {
      "type": "journey",
      "id": "string",
      "title": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "updated_by": "string",
      "tags": ["string"],
      "aliases": ["string"],
      "purposes": ["string"],
      "link": "https://example.com/path",
      "active": true,
      "blueprints": [
        {
          "id": "string",
          "title": "string"
        }
      ],
      "metadata": {}
    }
  ]
}
```

</details>

---

### `getIndex`

Return the current index build state for the caller's organization.

`GET /v1/configs/index`

**Sample Call**

```bash
epilot configuration-hub getIndex
```

With JSONata filter:

```bash
epilot configuration-hub getIndex --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "missing",
  "org_id": "string",
  "last_built_at": "1970-01-01T00:00:00.000Z",
  "total_items": 0,
  "build_duration_ms": 0
}
```

</details>

---

### `startHealthScan`

Start an asynchronous org health scan — fire-and-forget, mirrors

`POST /v1/configs/health:scan`

**Sample Call**

```bash
epilot configuration-hub startHealthScan
```

With JSONata filter:

```bash
epilot configuration-hub startHealthScan --jsonata '$'
```

---

### `getHealthReport`

Return the caller org's current health report: scan status, summary

`GET /v1/configs/health`

**Sample Call**

```bash
epilot configuration-hub getHealthReport
```

With JSONata filter:

```bash
epilot configuration-hub getHealthReport --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "missing",
  "last_scanned_at": "1970-01-01T00:00:00.000Z",
  "scan_duration_ms": 0,
  "scanned_configs": 0,
  "scanned_by_type": {},
  "counts": {
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "new_since_previous": 0,
  "resolved_since_previous": 0,
  "last_cleanup_at": "1970-01-01T00:00:00.000Z",
  "cleaned_count": 0,
  "history": [
    {
      "scanned_at": "1970-01-01T00:00:00.000Z",
      "clean": 0,
      "total": 0
    }
  ],
  "error": "string",
  "findings": [
    {
      "id": "string",
      "code": "broken_reference",
      "severity": "error",
      "source_type": "string",
      "source_id": "string",
      "source_title": "string",
      "message": "string",
      "message_key": "string",
      "message_params": {},
      "ref_type": "string",
      "ref_id": "string",
      "ref_title": "string",
      "source_link": "string",
      "ref_link": "string",
      "owner_type": "string",
      "owner_id": "string",
      "owner_title": "string",
      "owner_link": "string",
      "path": "string",
      "cleanable": true,
      "ignored": true,
      "ignored_at": "1970-01-01T00:00:00.000Z",
      "ignored_by": "string",
      "ignored_reason": "string",
      "first_seen": "1970-01-01T00:00:00.000Z",
      "last_seen": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `requestHealthCoverage`

Send a request for configuration the health check does not cover yet.

`POST /v1/configs/health:coverage-request`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub requestHealthCoverage \
  -d '{"message":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub requestHealthCoverage
```

With JSONata filter:

```bash
epilot configuration-hub requestHealthCoverage --jsonata '$'
```

---

### `startHealthCleanup`

Remove references that are already inert: dangling `$relation` entries

`POST /v1/configs/health:cleanup`

**Request Body**

**Sample Call**

```bash
epilot configuration-hub startHealthCleanup \
  -d '{"finding_ids":["string"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub startHealthCleanup
```

With JSONata filter:

```bash
epilot configuration-hub startHealthCleanup --jsonata '$'
```

---

### `setHealthFindingsIgnored`

Acknowledge findings as intentional (or undo that). An ignored

`POST /v1/configs/health:ignore`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub setHealthFindingsIgnored \
  -d '{"finding_ids":["string"],"ignored":true,"reason":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub setHealthFindingsIgnored
```

With JSONata filter:

```bash
epilot configuration-hub setHealthFindingsIgnored --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "ok",
  "count": 0
}
```

</details>

---

### `compareConfigs`

Compare the caller org's configs of a single type against another

`POST /v1/configs/compare`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub compareConfigs \
  -d '{"source_org_id":"string","source_auth_token":"string","type":"journey"}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub compareConfigs
```

With JSONata filter:

```bash
epilot configuration-hub compareConfigs --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "label": "string",
  "icon": "string",
  "rows": [
    {
      "match_status": "matched",
      "current": {
        "type": "journey",
        "id": "string",
        "title": "string",
        "updated_at": "1970-01-01T00:00:00.000Z",
        "updated_by": "string",
        "tags": ["string"],
        "aliases": ["string"],
        "purposes": ["string"],
        "link": "https://example.com/path",
        "active": true,
        "blueprints": [
          {
            "id": "string",
            "title": "string"
          }
        ],
        "metadata": {}
      },
      "source": {
        "type": "journey",
        "id": "string",
        "title": "string",
        "updated_at": "1970-01-01T00:00:00.000Z",
        "updated_by": "string",
        "tags": ["string"],
        "aliases": ["string"],
        "purposes": ["string"],
        "link": "https://example.com/path",
        "active": true,
        "blueprints": [
          {
            "id": "string",
            "title": "string"
          }
        ],
        "metadata": {}
      },
      "lineage": {
        "direction": "pull",
        "last_synced_at": "1970-01-01T00:00:00.000Z",
        "last_sync_job_id": "string",
        "origin": "string"
      }
    }
  ],
  "counts": {
    "matched": 0,
    "only_current": 0,
    "only_source": 0
  }
}
```

</details>

---

### `suggestMatches`

Run the sync-grade heuristic match (`lookupByHeuristic` — name / slug /

`POST /v1/configs/compare/suggestions`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub suggestMatches \
  -d '{"source_org_id":"string","source_auth_token":"string","type":"journey","source_ids":["string"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub suggestMatches
```

With JSONata filter:

```bash
epilot configuration-hub suggestMatches --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "suggestions": [
    {
      "source_id": "string",
      "candidate": {
        "id": "string",
        "title": "string"
      }
    }
  ]
}
```

</details>

---

### `confirmLineage`

Persist a lineage entry pairing a source-org config with a config in

`POST /v1/configs/lineage`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub confirmLineage \
  -d '{"type":"journey","source_org_id":"string","source_id":"string","target_id":"string"}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub confirmLineage
```

With JSONata filter:

```bash
epilot configuration-hub confirmLineage --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "journey",
  "target_org_id": "string",
  "source_org_id": "string",
  "source_id": "string",
  "target_id": "string",
  "last_synced_at": "1970-01-01T00:00:00.000Z",
  "origin": "string"
}
```

</details>

---

### `breakLineage`

Delete a lineage entry from the caller org's partition (caller as sync

`DELETE /v1/configs/lineage`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `type` | query | "journey" \| "datasource" \| "automation_flow" \| "workflow_definition" \| "closing_reason" \| "flow_template" \| "schema" \| "emailtemplate" \| "product" \| "price" \| "tax" \| "coupon" \| "file" \| "document_template" \| "webhook" \| "saved_view" \| "dashboard" \| "kanban" \| "role" \| "usergroup" \| "validation_rule" \| "integration" \| "app" \| "designbuilder" \| "notification_template" \| "custom_variable" \| "environment_variable" \| "taxonomy" \| "taxonomy_classification" \| "entity_mapping" \| "portal_config" \| "target" \| "product_recommendation" \| "access_token" \| "email_signature" \| "shared_inbox" \| "org_setting" | Yes | Configuration resource type of the lineage entry |
| `source_id` | query | string | Yes | Source-org config id the lineage entry is keyed by |

**Sample Call**

```bash
epilot configuration-hub breakLineage \
  -p type=example \
  -p source_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub breakLineage -p type=example -p source_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'deleted'
```

<details>
<summary>Sample Response</summary>

```json
{
  "deleted": true
}
```

</details>

---

### `listSyncJobs`

List sync jobs scoped to the caller's organization, paginated with an opaque

`GET /v1/configs/sync-jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |
| `status` | query | "pending" \| "in_progress" \| "succeeded" \| "partial" \| "failed" \| "cancelled" | No | Filter jobs by status |

**Sample Call**

```bash
epilot configuration-hub listSyncJobs
```

With JSONata filter:

```bash
epilot configuration-hub listSyncJobs --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "id": "string",
      "name": "string",
      "status": "pending",
      "direction": "push",
      "source_org_id": "string",
      "target_org_id": "string",
      "dry_run": true,
      "counts": {},
      "current_phase": "phase_0",
      "current_batch": {},
      "started_at": "1970-01-01T00:00:00.000Z",
      "finished_at": "1970-01-01T00:00:00.000Z",
      "health_check": {},
      "events": [],
      "created_by": "string",
      "retry_of": "string",
      "retried_by": ["string"],
      "plan_only": true,
      "plan_summary": {},
      "planned_at": "1970-01-01T00:00:00.000Z",
      "expires_at": "1970-01-01T00:00:00.000Z",
      "applied_from_plan": "string",
      "applied_by": ["string"],
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z",
      "approvals": [],
      "errors_sample": []
    }
  ]
}
```

</details>

---

### `createSyncJob`

Create a new cross-org sync job. The job is enqueued for asynchronous execution

`POST /v1/configs/sync-jobs`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub createSyncJob
```

With request body:

```bash
epilot configuration-hub createSyncJob \
  -d '{
  "source_org_id": "string",
  "target_org_id": "string",
  "target_auth_token": "string",
  "name": "string",
  "dry_run": false,
  "include_dependencies": true,
  "sync_portal_widgets": true,
  "resources": [
    {
      "type": "string",
      "id": "string"
    }
  ]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub createSyncJob
```

With JSONata filter:

```bash
epilot configuration-hub createSyncJob --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {}
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `getSyncJob`

Fetch a single sync job by ID. Returns the job header, counts summary,

`GET /v1/configs/sync-jobs/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub getSyncJob \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getSyncJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getSyncJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {}
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `getSyncJobHealth`

Targeted health check of an applied (non-dry-run) sync job. When the job

`GET /v1/configs/sync-jobs/{id}/health`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub getSyncJobHealth \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getSyncJobHealth 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getSyncJobHealth -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "pending",
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "scanned": 0,
  "counts": {
    "error": 0,
    "warning": 0,
    "info": 0
  },
  "error": "string",
  "findings": [
    {
      "id": "string",
      "code": "broken_reference",
      "severity": "error",
      "source_type": "string",
      "source_id": "string",
      "source_title": "string",
      "message": "string",
      "message_key": "string",
      "message_params": {},
      "ref_type": "string",
      "ref_id": "string",
      "ref_title": "string",
      "source_link": "string",
      "ref_link": "string",
      "owner_type": "string",
      "owner_id": "string",
      "owner_title": "string",
      "owner_link": "string",
      "path": "string",
      "cleanable": true,
      "ignored": true,
      "ignored_at": "1970-01-01T00:00:00.000Z",
      "ignored_by": "string",
      "ignored_reason": "string",
      "first_seen": "1970-01-01T00:00:00.000Z",
      "last_seen": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `runSyncJobHealth`

Start the targeted health check of a finished, applied sync job again:

`POST /v1/configs/sync-jobs/{id}/health:run`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub runSyncJobHealth \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub runSyncJobHealth 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub runSyncJobHealth -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `retrySyncJob`

Retry the unresolved resources from a prior sync job: `failed` rows, plus

`POST /v1/configs/sync-jobs/{id}/retry`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Request Body**

**Sample Call**

```bash
epilot configuration-hub retrySyncJob \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"target_auth_token":"string","resources":[{"type":"string","source_id":"string"}],"payload_overrides":{}}'
```

Using positional args for path parameters:

```bash
epilot configuration-hub retrySyncJob 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub retrySyncJob -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub retrySyncJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {}
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `planSyncJobRetry`

Preview what `retrySyncJob` would re-run for the same `resources`,

`POST /v1/configs/sync-jobs/{id}/retry-plan`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Request Body**

**Sample Call**

```bash
epilot configuration-hub planSyncJobRetry \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"resources":[{"type":"string","source_id":"string"}]}'
```

Using positional args for path parameters:

```bash
epilot configuration-hub planSyncJobRetry 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub planSyncJobRetry -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub planSyncJobRetry -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'selected'
```

<details>
<summary>Sample Response</summary>

```json
{
  "selected": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "required_by": {
        "type": "string",
        "source_id": "string",
        "title": "string",
        "reason": "typed_reference"
      },
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "source_link": "string",
      "target_link": "string",
      "plan": {
        "action": "create",
        "match": "lineage",
        "diff_status": "computed",
        "change_count": 0,
        "changed_paths": ["string"],
        "note": "string",
        "depends_on": [
          {
            "type": "string",
            "source_id": "string"
          }
        ]
      },
      "excluded_from_apply": "unchanged"
    }
  ],
  "added_dependencies": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "required_by": {
        "type": "string",
        "source_id": "string",
        "title": "string",
        "reason": "typed_reference"
      },
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "source_link": "string",
      "target_link": "string",
      "plan": {
        "action": "create",
        "match": "lineage",
        "diff_status": "computed",
        "change_count": 0,
        "changed_paths": ["string"],
        "note": "string",
        "depends_on": [
          {
            "type": "string",
            "source_id": "string"
          }
        ]
      },
      "excluded_from_apply": "unchanged"
    }
  ],
  "dependency_resolution": "exact"
}
```

</details>

---

### `cancelSyncJob`

Cancel a running sync job. Marks the job `cancelled` with a `finished_at`

`POST /v1/configs/sync-jobs/{id}/cancel`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub cancelSyncJob \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub cancelSyncJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub cancelSyncJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {}
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `listSyncJobEvents`

Full activity log of a sync job, latest first: one event per resource

`GET /v1/configs/sync-jobs/{id}/events`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of events per page |
| `after` | query | string | No | Only return events strictly newer than this event id (max 500,
latest first). `truncated: true` means more new events existed than
were returned — reload from the first page.
 |
| `kind` | query | string | No | Comma-separated event kinds to return (`resource`, `dependency`,
`step`), e.g. `dependency,step`. Omit for every kind. Applies to
pages, `after` polling and `total`.
 |

**Sample Call**

```bash
epilot configuration-hub listSyncJobEvents \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub listSyncJobEvents 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub listSyncJobEvents -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {
        "outcome": "added",
        "reason": "typed_reference",
        "required_by": {
          "type": "string",
          "source_id": "string",
          "title": "string"
        },
        "depth": 0
      }
    }
  ],
  "next_cursor": "string",
  "total": 0,
  "truncated": true,
  "source": "events"
}
```

</details>

---

### `listSyncJobResources`

List the per-resource rows for a sync job. Supports filtering by status

`GET /v1/configs/sync-jobs/{id}/resources`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |
| `status` | query | "pending" \| "in_progress" \| "created" \| "patched" \| "skipped" \| "would_create" \| "would_patch" \| "would_skip_unchanged" \| "would_match_heuristic" \| "failed" | No | Filter resources by status |
| `type` | query | string | No | Filter resources by resource type |
| `plan_action` | query | "create" \| "update" \| "no_change" \| "skip" | No | Filter resources by plan action (`plan.action`). Only rows of plan
jobs and of jobs applying a plan carry one.
 |

**Sample Call**

```bash
epilot configuration-hub listSyncJobResources \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub listSyncJobResources 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub listSyncJobResources -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "required_by": {
        "type": "string",
        "source_id": "string",
        "title": "string",
        "reason": "typed_reference"
      },
      "status": "pending",
      "phase": "phase_0",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "source_link": "string",
      "target_link": "string",
      "plan": {
        "action": "create",
        "match": "lineage",
        "diff_status": "computed",
        "change_count": 0,
        "changed_paths": ["string"],
        "note": "string",
        "depends_on": [
          {
            "type": "string",
            "source_id": "string"
          }
        ]
      },
      "excluded_from_apply": "unchanged"
    }
  ]
}
```

</details>

---

### `getSyncPlan`

Summary of a plan: a dry-run sync job (`createSyncJob` with

`GET /v1/configs/sync-jobs/{id}/plan`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Sample Call**

```bash
epilot configuration-hub getSyncPlan \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getSyncPlan 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getSyncPlan -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "string",
  "status": "pending",
  "ready": true,
  "applicable": true,
  "expires_at": "1970-01-01T00:00:00.000Z",
  "planned_at": "1970-01-01T00:00:00.000Z",
  "replanned_at": "1970-01-01T00:00:00.000Z",
  "source_org_id": "string",
  "target_org_id": "string",
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "by_type": [
    {
      "total": 0,
      "create": 0,
      "update": 0,
      "no_change": 0,
      "skip": 0,
      "failed": 0,
      "not_compared": 0,
      "type": "string"
    }
  ],
  "applied_by": ["string"]
}
```

</details>

---

### `listSyncPlanDiffs`

Field-level diffs of a plan, one per planned resource: what the target

`GET /v1/configs/sync-jobs/{id}/plan/diffs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of diffs per page |
| `type` | query | string | No | Only diffs of this resource type |
| `action` | query | "create" \| "update" \| "no_change" \| "skip" | No | Only diffs with this plan action |

**Sample Call**

```bash
epilot configuration-hub listSyncPlanDiffs \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub listSyncPlanDiffs 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub listSyncPlanDiffs -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "action": "create",
      "match": "lineage",
      "diff_status": "computed",
      "change_count": 0,
      "changes": [
        {
          "path": "string",
          "kind": "added",
          "before": {},
          "after": {}
        }
      ],
      "truncated": true,
      "note": "string",
      "planned_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getSyncPlanDiff`

Field-level diff of one planned resource. See `listSyncPlanDiffs`.

`GET /v1/configs/sync-jobs/{id}/plan/diffs/{type}/{source_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |
| `type` | path | string | Yes | Resource type |
| `source_id` | path | string | Yes | Source-org resource id |

**Sample Call**

```bash
epilot configuration-hub getSyncPlanDiff \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p type=example \
  -p source_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getSyncPlanDiff 123e4567-e89b-12d3-a456-426614174000 example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getSyncPlanDiff -p id=123e4567-e89b-12d3-a456-426614174000 -p type=example -p source_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'type'
```

<details>
<summary>Sample Response</summary>

```json
{
  "type": "string",
  "source_id": "string",
  "target_id": "string",
  "title": "string",
  "action": "create",
  "match": "lineage",
  "diff_status": "computed",
  "change_count": 0,
  "changes": [
    {
      "path": "string",
      "kind": "added",
      "before": {},
      "after": {}
    }
  ],
  "truncated": true,
  "note": "string",
  "planned_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `applySyncPlan`

Run a finished plan for real. Creates a new sync job (it carries

`POST /v1/configs/sync-jobs/{id}/plan/apply`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub applySyncPlan \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot configuration-hub applySyncPlan \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "target_auth_token": "string",
  "name": "string",
  "resources": [
    {
      "type": "string",
      "source_id": "string"
    }
  ],
  "exclude": [
    {
      "type": "string",
      "source_id": "string"
    }
  ],
  "allow_missing_dependencies": false
}'
```

Using positional args for path parameters:

```bash
epilot configuration-hub applySyncPlan 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub applySyncPlan -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub applySyncPlan -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "direction": "push",
  "source_org_id": "string",
  "target_org_id": "string",
  "dry_run": true,
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "succeeded": 0,
    "failed": 0,
    "skipped_unchanged": 0
  },
  "current_phase": "phase_0",
  "current_batch": {
    "index": 0,
    "of": 0,
    "level": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "health_check": {
    "status": "pending",
    "counts": {
      "error": 0,
      "warning": 0,
      "info": 0
    }
  },
  "events": [
    {
      "id": "string",
      "kind": "resource",
      "seq": 0,
      "ts": "1970-01-01T00:00:00.000Z",
      "phase": "phase_0",
      "type": "string",
      "source_id": "string",
      "target_id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "message": "string",
      "error": "string",
      "dependency": {}
    }
  ],
  "created_by": "string",
  "retry_of": "string",
  "retried_by": ["string"],
  "plan_only": true,
  "plan_summary": {
    "total": 0,
    "create": 0,
    "update": 0,
    "no_change": 0,
    "skip": 0,
    "failed": 0,
    "not_compared": 0
  },
  "planned_at": "1970-01-01T00:00:00.000Z",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "applied_from_plan": "string",
  "applied_by": ["string"],
  "approved_by": "string",
  "approved_at": "1970-01-01T00:00:00.000Z",
  "approvals": [
    {
      "job_id": "string",
      "approved_by": "string",
      "approved_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "errors_sample": [
    {
      "type": "string",
      "source_id": "string",
      "error": "string"
    }
  ]
}
```

</details>

---

### `replanSyncPlan`

Plan some rows of a plan again, in place, e.g. after fixing a

`POST /v1/configs/sync-jobs/{id}/plan/replan`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Sync job ID |

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub replanSyncPlan \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"target_auth_token":"string","resources":[{"type":"string","source_id":"string"}]}'
```

Using positional args for path parameters:

```bash
epilot configuration-hub replanSyncPlan 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub replanSyncPlan -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub replanSyncPlan -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listDeleteJobs`

List bulk-delete jobs scoped to the caller's organization, paginated

`GET /v1/configs/delete-jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub listDeleteJobs
```

With JSONata filter:

```bash
epilot configuration-hub listDeleteJobs --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "id": "string",
      "name": "string",
      "status": "pending",
      "org_id": "string",
      "counts": {
        "total": 0,
        "pending": 0,
        "in_progress": 0,
        "deleted": 0,
        "skipped": 0,
        "failed": 0
      },
      "started_at": "1970-01-01T00:00:00.000Z",
      "finished_at": "1970-01-01T00:00:00.000Z",
      "rebuild_triggered": true
    }
  ]
}
```

</details>

---

### `createDeleteJob`

Create a bulk-delete job for the caller's organization. The selected

`POST /v1/configs/delete-jobs`

**Request Body** (required)

**Sample Call**

```bash
epilot configuration-hub createDeleteJob \
  -d '{"name":"string","resources":[{"type":"string","id":"string","title":"string"}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub createDeleteJob
```

With JSONata filter:

```bash
epilot configuration-hub createDeleteJob --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "org_id": "string",
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "deleted": 0,
    "skipped": 0,
    "failed": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "rebuild_triggered": true
}
```

</details>

---

### `getDeleteJob`

Fetch a single bulk-delete job by ID. Returns the job header and counts

`GET /v1/configs/delete-jobs/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Delete job ID |

**Sample Call**

```bash
epilot configuration-hub getDeleteJob \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getDeleteJob 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getDeleteJob -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "pending",
  "org_id": "string",
  "counts": {
    "total": 0,
    "pending": 0,
    "in_progress": 0,
    "deleted": 0,
    "skipped": 0,
    "failed": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "finished_at": "1970-01-01T00:00:00.000Z",
  "rebuild_triggered": true
}
```

</details>

---

### `listDeleteJobResources`

List the per-resource rows for a delete job, cursor-paginated. Used by

`GET /v1/configs/delete-jobs/{id}/resources`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes | Delete job ID |
| `cursor` | query | string | No | Opaque cursor for fetching the next page. Omit for the first page. |
| `size` | query | number | No | Number of items per page |

**Sample Call**

```bash
epilot configuration-hub listDeleteJobResources \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub listDeleteJobResources 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub listDeleteJobResources -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "next_cursor": "string",
  "results": [
    {
      "type": "string",
      "id": "string",
      "title": "string",
      "status": "pending",
      "attempt": 0,
      "error": "string",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `rebuildIndex`

Rebuild the configuration index for the caller's organization.

`POST /v1/configs/index:rebuild`

**Sample Call**

```bash
epilot configuration-hub rebuildIndex
```

With JSONata filter:

```bash
epilot configuration-hub rebuildIndex --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "ready",
  "last_built_at": "1970-01-01T00:00:00.000Z",
  "total_items": 0,
  "build_duration_ms": 0,
  "failed_types": ["string"]
}
```

</details>

---

### `getConfigInventory`

Returns a fresh inventory of an org's configuration resources — `{ type, id }` identities only,

`GET /v1/configs/inventory`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `include_dependency_only` | query | boolean | No | When true (default), include dependency-only types (e.g. `entity_mapping`)
in the inventory in addition to the top-level registered types.
 |

**Sample Call**

```bash
epilot configuration-hub getConfigInventory
```

With JSONata filter:

```bash
epilot configuration-hub getConfigInventory --jsonata 'inventory_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "inventory_id": "string",
  "org_id": "string",
  "indexed_at": "1970-01-01T00:00:00.000Z",
  "resources_count": 0,
  "resources": [
    {
      "type": "journey",
      "id": "string"
    }
  ],
  "skipped_types": [
    {
      "type": "string",
      "reason": "string"
    }
  ]
}
```

</details>

---

### `listPreviews`

Lists the previews requested from the caller's current org, newest first (max 50).

`GET /v1/previews`

**Sample Call**

```bash
epilot configuration-hub listPreviews
```

With JSONata filter:

```bash
epilot configuration-hub listPreviews --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "string",
      "name": "string",
      "status": "creating_org",
      "source_org_id": "string",
      "preview_org_id": "string",
      "sync_job_id": "string",
      "sync_status": "string",
      "requested_by": {
        "user_id": "string",
        "email": "string"
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "error": "string"
    }
  ]
}
```

</details>

---

### `createPreview`

Starts a preview of the caller's current org (internal callers: the org in `x-ivy-org-id`,

`POST /v1/previews`

**Request Body**

**Sample Call**

```bash
epilot configuration-hub createPreview \
  -d '{"name":"string","requester":{"user_id":"string","email":"user@example.com","display_name":"string","language":"de"}}'
```

Using stdin pipe:

```bash
cat body.json | epilot configuration-hub createPreview
```

With JSONata filter:

```bash
epilot configuration-hub createPreview --jsonata '$'
```

---

### `getPreview`

Returns a preview requested from the caller's current org, with its progress.

`GET /v1/previews/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string | Yes |  |

**Sample Call**

```bash
epilot configuration-hub getPreview \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot configuration-hub getPreview 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot configuration-hub getPreview -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "string",
  "name": "string",
  "status": "creating_org",
  "source_org_id": "string",
  "preview_org_id": "string",
  "sync_job_id": "string",
  "sync_status": "string",
  "requested_by": {
    "user_id": "string",
    "email": "string"
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "error": "string"
}
```

</details>

---
