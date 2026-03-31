# Entity API

- **Base URL:** `https://entity.sls.epilot.io`
- **API Docs:** [https://docs.epilot.io/api/entity](https://docs.epilot.io/api/entity)

Flexible data layer for epilot Entities.

## Quick Start

```bash
# List available operations
epilot entity

# Call an operation
epilot entity listSchemas
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

**Schemas**
- [`listSchemas`](#listschemas) — Get the latest versions of all schemas
- [`listSchemasV2`](#listschemasv2) — Get the latest versions of all schemas.
- [`getSchema`](#getschema) — By default gets the current version of the Schema (frozen version if frozen, otherwise latest).
- [`putSchema`](#putschema) — Create or update a schema with a new version.
- [`deleteSchema`](#deleteschema) — Delete a schema, or a specific version of a schema
- [`getJsonSchema`](#getjsonschema) — Get formal JSON schema definition draft 2020-12 for the given epilot schema
- [`getSchemaExample`](#getschemaexample) — Get a full example entity for the given schema
- [`getSchemaVersions`](#getschemaversions) — Get all versions of this schema ordered by the latest versions including drafts.
- [`freezeSchema`](#freezeschema) — Freeze a schema at its current version, or at a specific version.
- [`unfreezeSchema`](#unfreezeschema) — Unfreeze a schema. Promotes the latest version to the current version for all users.
- [`listAvailableCapabilities`](#listavailablecapabilities) — List available capabilities for schema
- [`listSchemaBlueprints`](#listschemablueprints) — List canonical versions of all available schemas
- [`listTaxonomyClassificationsForSchema`](#listtaxonomyclassificationsforschema) — List taxonomy classifications for a given schema
- [`createSchemaAttribute`](#createschemaattribute) — Create a schema attribute
- [`getSchemaAttribute`](#getschemaattribute) — Get a schema attribute from given attribute ID
- [`putSchemaAttribute`](#putschemaattribute) — Updates an attribute in the schema
- [`deleteSchemaAttribute`](#deleteschemaattribute) — Deletes an attribute from a schema
- [`createSchemaCapability`](#createschemacapability) — Create a schema capability
- [`getSchemaCapability`](#getschemacapability) — Get a schema capability from given capability ID
- [`putSchemaCapability`](#putschemacapability) — Adds or updates an capability in the schema
- [`deleteSchemaCapability`](#deleteschemacapability) — Deletes a Capability from a schema
- [`createSchemaGroup`](#createschemagroup) — Create a schema group
- [`getSchemaGroup`](#getschemagroup) — Get a schema group from given group composite ID
- [`putSchemaGroup`](#putschemagroup) — Adds or updates an capability in the schema
- [`deleteSchemaGroup`](#deleteschemagroup) — Deletes a Capability from a schema
- [`createSchemaGroupHeadline`](#createschemagroupheadline) — Create a headline in a schema group
- [`getSchemaGroupHeadline`](#getschemagroupheadline) — Get a group headline from schema from given headline composite ID
- [`putSchemaGroupHeadline`](#putschemagroupheadline) — Adds or updates a group headline in the schema
- [`deleteSchemaGroupHeadline`](#deleteschemagroupheadline) — Deletes a group headline from a schema

**Entities**
- [`searchEntities`](#searchentities) — Search for entities. Supports ordering and pagination. [Lucene query syntax](https://www.elastic.co/guide/en/elasticsear
- [`listEntities`](#listentities) — List entities that meet the specified conditions.
- [`queryEntityGraph`](#queryentitygraph) — Traverse an entity relationship graph starting from a seed entity.
- [`createEntity`](#createentity) — Creates a new entity using a key.
- [`validateEntity`](#validateentity) — Validates an entity against the schema.
- [`validateEntityV2`](#validateentityv2) — Validates an entity against the schema.
- [`upsertEntity`](#upsertentity) — Create or update an entity using `unique_key`
- [`getEntityV2`](#getentityv2) — Gets Entity by id.
- [`restoreEntity`](#restoreentity) — Restores an entity by id
- [`reindexEntity`](#reindexentity) — Triggers a reindex for the Entity for search.
- [`getEntity`](#getentity) — Gets Entity and relations by id.
- [`updateEntity`](#updateentity) — Updates an Entity
- [`patchEntity`](#patchentity) — Partially updates an entity with the passed in entity data.
- [`deleteEntity`](#deleteentity) — Deletes an Entity
- [`autocomplete`](#autocomplete) — Autocomplete entity attributes
- [`wipeAllEntities`](#wipeallentities) — Creates a request to queue the deletion of all entities in the system. This is a destructive operation and should only b

**Activity**
- [`createActivity`](#createactivity) — Create an activity that can be displayed in activity feeds.
- [`getActivity`](#getactivity) — Get activity by id
- [`attachActivity`](#attachactivity) — Attach existing activity to entity activity feeds
- [`getEntityActivityFeed`](#getentityactivityfeed) — Get activity feed for an entity

**Relations**
- [`getRelations`](#getrelations) — Returns 1st level direct relations for an entity.
- [`addRelations`](#addrelations) — Relates one or more entities to parent entity by adding items to a relation attribute
- [`removeRelations`](#removerelations) — Disassociate one or more entities to parent entity by removing items to a relation attribute
- [`getRelationsV2`](#getrelationsv2) — Returns 1st level direct relations for an entity with pagination.
- [`getRelationsV3`](#getrelationsv3) — Returns 1st level direct relations for an entity with pagination.
- [`getRelatedEntitiesCount`](#getrelatedentitiescount) — Returns the amount of unique related entities for an entity - includes direct and reverse relations.
- [`updateRelation`](#updaterelation) — Updates an existing relation between two entities.
- [`deleteRelation`](#deleterelation) — Removes relation between two entities

**Import-Export**
- [`exportEntities`](#exportentities) — Export entity data in a CSV-format. The export will export data as close as possible to what is visible on Entity UI tab
- [`importEntities`](#importentities) — This endpoint enables the import of entities into the platform.

**Saved Views**
- [`listSavedViews`](#listsavedviews) — Get the Saved Views based on the schema
- [`createSavedView`](#createsavedview) — Creates a new saved view
- [`getSavedView`](#getsavedview) — Gets Saved View configuration by id.
- [`updateSavedView`](#updatesavedview) — Updates a saved view
- [`patchSavedView`](#patchsavedview) — Partially updates a saved view with the provided payload. If an updated_at is passed and the server contains a newer ver
- [`deleteSavedView`](#deletesavedview) — Deletes a saved view
- [`listFavoriteViewsForUser`](#listfavoriteviewsforuser) — Get the Favorite Saved Views for user based on the schema

**Taxonomy**
- [`listTaxonomies`](#listtaxonomies) — List taxonomies in an organization
- [`createTaxonomy`](#createtaxonomy) — Create a new taxonomy
- [`getTaxonomy`](#gettaxonomy) — Get taxonomy by slug
- [`updateTaxonomy`](#updatetaxonomy) — Update a taxonomy
- [`deleteTaxonomy`](#deletetaxonomy) — Delete a taxonomy
- [`updateClassificationsForTaxonomy`](#updateclassificationsfortaxonomy) — Update the classifications for a taxonomy
- [`createTaxonomyClassification`](#createtaxonomyclassification) — Create a new classification for a taxonomy
- [`getTaxonomyClassification`](#gettaxonomyclassification) — Get a classification for a taxonomy by slug
- [`updateTaxonomyClassification`](#updatetaxonomyclassification) — Update a classification for a taxonomy
- [`deleteTaxonomyClassification`](#deletetaxonomyclassification) — Delete a classification for a taxonomy
- [`taxonomyAutocomplete`](#taxonomyautocomplete) — Taxonomies autocomplete
- [`taxonomiesClassificationsSearch`](#taxonomiesclassificationssearch) — List taxonomy classifications in an organization based on taxonomy slug
- [`getTaxonomyBulkActionJobs`](#gettaxonomybulkactionjobs) — Gets bulk actions jobs by job status:
- [`getTaxonomyBulkActionJobById`](#gettaxonomybulkactionjobbyid) — Gets a bulk action job by job id
- [`cancelBulkAction`](#cancelbulkaction) — Cancels a running bulk action job. The job status will be updated to CANCELLED
- [`bulkMoveClassifications`](#bulkmoveclassifications) — Moves classifications from one taxonomy to another, through a bulk async operation which
- [`bulkMergeClassifications`](#bulkmergeclassifications) — Merges classifications from one taxonomy into one individual classification, through a bulk async operation which
- [`bulkDeleteClassifications`](#bulkdeleteclassifications) — Permanently deletes taxonomy classifications. The classifications are deleted through a bulk

### `listSchemas`

Get the latest versions of all schemas

`GET /v1/entity/schemas`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `unpublished` | query | boolean | No | Return unpublished draft schemas |
| `latest` | query | boolean | No | When true, return the latest version instead of the frozen version for frozen schemas. |
| `exclude` | query | string[] | No | List of schema slugs to exclude from the results. Accepts a comma-separated list of slugs to exclude from the results. |
| `include` | query | string[] | No | List of schema slugs to include in the results. When provided, only these schemas are returned. Accepts a comma-separated list of slugs. |

**Sample Call**

```bash
epilot entity listSchemas
```

With JSONata filter:

```bash
epilot entity listSchemas --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
      "frozen": true,
      "latest": true,
      "_summary": true,
      "slug": "contact",
      "version": 1,
      "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "enable_setting": ["360_features"],
      "name": "Contact",
      "plural": "Contacts",
      "description": "Example description",
      "docs_url": "https://docs.epilot.io/docs/pricing/entities",
      "category": "customer_relations",
      "published": false,
      "draft": false,
      "icon": "person",
      "title_template": "{{first_name}} {{last_name}}",
      "ui_config": {},
      "capabilities": [],
      "group_settings": [],
      "layout_settings": {},
      "dialog_config": {},
      "attributes": [],
      "_purpose": ["string"],
      "explicit_search_mappings": {},
      "group_headlines": []
    }
  ]
}
```

</details>

---

### `listSchemasV2`

Get the latest versions of all schemas.

`GET /v2/entity/schemas`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `full` | query | boolean | No | Return full schemas including all attributes and capabilities |
| `unpublished` | query | boolean | No | Return unpublished draft schemas |
| `latest` | query | boolean | No | When true, return the latest version instead of the frozen version for frozen schemas. |
| `exclude` | query | string[] | No | List of schema slugs to exclude from the results. Accepts a comma-separated list of slugs to exclude from the results. |
| `include` | query | string[] | No | List of schema slugs to include in the results. When provided, only these schemas are returned. Accepts a comma-separated list of slugs. |

**Sample Call**

```bash
epilot entity listSchemasV2
```

With JSONata filter:

```bash
epilot entity listSchemasV2 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
      "frozen": true,
      "latest": true,
      "_summary": true,
      "slug": "contact",
      "version": 1,
      "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "enable_setting": ["360_features"],
      "name": "Contact",
      "plural": "Contacts",
      "description": "Example description",
      "docs_url": "https://docs.epilot.io/docs/pricing/entities",
      "category": "customer_relations",
      "published": false,
      "draft": false,
      "icon": "person",
      "title_template": "{{first_name}} {{last_name}}",
      "ui_config": {},
      "capabilities": [],
      "group_settings": [],
      "layout_settings": {},
      "dialog_config": {},
      "attributes": [],
      "_purpose": ["string"],
      "explicit_search_mappings": {},
      "group_headlines": []
    }
  ]
}
```

</details>

---

### `getSchema`

By default gets the current version of the Schema (frozen version if frozen, otherwise latest).

`GET /v1/entity/schemas/{slug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | query | string (uuid) | No |  |
| `latest` | query | boolean | No | When true, return the latest version instead of the frozen version for frozen schemas. |

**Sample Call**

```bash
epilot entity getSchema \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity getSchema contact
```

With JSONata filter:

```bash
epilot entity getSchema -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "comment": "string",
  "source": {
    "id": "string",
    "type": "string"
  },
  "frozen": true,
  "latest": true,
  "_summary": true,
  "slug": "contact",
  "version": 1,
  "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "enable_setting": ["360_features"],
  "name": "Contact",
  "plural": "Contacts",
  "description": "Example description",
  "docs_url": "https://docs.epilot.io/docs/pricing/entities",
  "category": "customer_relations",
  "published": false,
  "draft": false,
  "icon": "person",
  "title_template": "{{first_name}} {{last_name}}",
  "ui_config": {
    "table_view": {
      "view_type": "default",
      "row_actions": ["string"],
      "bulk_actions": ["string"],
      "navbar_actions": [],
      "enable_thumbnails": false
    },
    "create_view": {
      "view_type": "default",
      "search_params": {}
    },
    "edit_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "single_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "list_item": {
      "summary_attributes": [],
      "quick_actions": [],
      "ui_config": {}
    },
    "sharing": {
      "show_sharing_button": true
    }
  },
  "capabilities": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "customer_messaging",
      "title": "Messaging",
      "attributes": [],
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "app_id": "123e4567-e89b-12d3-a456-426614174000",
      "ui_config": {},
      "ui_hooks": [],
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "schemas": []
    }
  ],
  "group_settings": [
    {
      "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
      "label": "Contact Details",
      "expanded": true,
      "order": 1
    },
    {
      "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
      "label": "Address Details",
      "expanded": false,
      "order": 2,
      "info_tooltip_title": {}
    }
  ],
  "layout_settings": {
    "grid_gap": "string",
    "grid_template_columns": "string"
  },
  "dialog_config": {},
  "attributes": [
    {
      "name": "email",
      "type": "email",
      "label": "Email",
      "required": true
    },
    {
      "name": "first_name",
      "type": "string",
      "label": "First Name"
    }
  ],
  "_purpose": ["string"],
  "explicit_search_mappings": {
    "image": {
      "type": "keyword",
      "index": false
    }
  },
  "group_headlines": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "label": "string",
      "layout": "string",
      "group": "string",
      "order": 0,
      "type": "headline",
      "enable_divider": false,
      "divider": "top_divider",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `putSchema`

Create or update a schema with a new version.

`PUT /v1/entity/schemas/{slug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `draft` | query | boolean | No |  |

**Request Body**

**Sample Call**

```bash
epilot entity putSchema \
  -p slug=contact
```

With request body:

```bash
epilot entity putSchema \
  -p slug=contact \
  -d '{
  "slug": "contact",
  "version": 1,
  "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "enable_setting": ["360_features"],
  "name": "Contact",
  "plural": "Contacts",
  "description": "Example description",
  "docs_url": "https://docs.epilot.io/docs/pricing/entities",
  "category": "customer_relations",
  "published": false,
  "draft": false,
  "icon": "person",
  "title_template": "{{first_name}} {{last_name}}",
  "ui_config": {
    "table_view": {
      "view_type": "default",
      "row_actions": ["string"],
      "bulk_actions": ["string"],
      "navbar_actions": [],
      "enable_thumbnails": false
    },
    "create_view": {
      "view_type": "default",
      "search_params": {}
    },
    "edit_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "single_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "list_item": {
      "summary_attributes": [],
      "quick_actions": [],
      "ui_config": {}
    },
    "sharing": {
      "show_sharing_button": true
    }
  },
  "capabilities": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "customer_messaging",
      "title": "Messaging",
      "attributes": [],
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "app_id": "123e4567-e89b-12d3-a456-426614174000",
      "ui_config": {},
      "ui_hooks": [],
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "schemas": []
    }
  ],
  "group_settings": [
    {
      "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
      "label": "Contact Details",
      "expanded": true,
      "order": 1
    },
    {
      "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
      "label": "Address Details",
      "expanded": false,
      "order": 2,
      "info_tooltip_title": {}
    }
  ],
  "layout_settings": {
    "grid_gap": "string",
    "grid_template_columns": "string"
  },
  "dialog_config": {},
  "attributes": [
    {
      "name": "email",
      "type": "email",
      "label": "Email",
      "required": true
    },
    {
      "name": "first_name",
      "type": "string",
      "label": "First Name"
    }
  ],
  "_purpose": ["string"],
  "explicit_search_mappings": {
    "image": {
      "type": "keyword",
      "index": false
    }
  },
  "group_headlines": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "label": "string",
      "layout": "string",
      "group": "string",
      "order": 0,
      "type": "headline",
      "enable_divider": false,
      "divider": "top_divider",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}'
```

Using positional args for path parameters:

```bash
epilot entity putSchema contact
```

Using stdin pipe:

```bash
cat body.json | epilot entity putSchema -p slug=contact
```

With JSONata filter:

```bash
epilot entity putSchema -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "comment": "string",
  "source": {
    "id": "string",
    "type": "string"
  },
  "frozen": true,
  "latest": true,
  "_summary": true,
  "slug": "contact",
  "version": 1,
  "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "enable_setting": ["360_features"],
  "name": "Contact",
  "plural": "Contacts",
  "description": "Example description",
  "docs_url": "https://docs.epilot.io/docs/pricing/entities",
  "category": "customer_relations",
  "published": false,
  "draft": false,
  "icon": "person",
  "title_template": "{{first_name}} {{last_name}}",
  "ui_config": {
    "table_view": {
      "view_type": "default",
      "row_actions": ["string"],
      "bulk_actions": ["string"],
      "navbar_actions": [],
      "enable_thumbnails": false
    },
    "create_view": {
      "view_type": "default",
      "search_params": {}
    },
    "edit_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "single_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "list_item": {
      "summary_attributes": [],
      "quick_actions": [],
      "ui_config": {}
    },
    "sharing": {
      "show_sharing_button": true
    }
  },
  "capabilities": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "customer_messaging",
      "title": "Messaging",
      "attributes": [],
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "app_id": "123e4567-e89b-12d3-a456-426614174000",
      "ui_config": {},
      "ui_hooks": [],
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "schemas": []
    }
  ],
  "group_settings": [
    {
      "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
      "label": "Contact Details",
      "expanded": true,
      "order": 1
    },
    {
      "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
      "label": "Address Details",
      "expanded": false,
      "order": 2,
      "info_tooltip_title": {}
    }
  ],
  "layout_settings": {
    "grid_gap": "string",
    "grid_template_columns": "string"
  },
  "dialog_config": {},
  "attributes": [
    {
      "name": "email",
      "type": "email",
      "label": "Email",
      "required": true
    },
    {
      "name": "first_name",
      "type": "string",
      "label": "First Name"
    }
  ],
  "_purpose": ["string"],
  "explicit_search_mappings": {
    "image": {
      "type": "keyword",
      "index": false
    }
  },
  "group_headlines": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "label": "string",
      "layout": "string",
      "group": "string",
      "order": 0,
      "type": "headline",
      "enable_divider": false,
      "divider": "top_divider",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `deleteSchema`

Delete a schema, or a specific version of a schema

`DELETE /v1/entity/schemas/{slug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |

**Sample Call**

```bash
epilot entity deleteSchema \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity deleteSchema contact
```

With JSONata filter:

```bash
epilot entity deleteSchema -p slug=contact --jsonata '$'
```

---

### `getJsonSchema`

Get formal JSON schema definition draft 2020-12 for the given epilot schema

`GET /v1/entity/schemas/{slug}/json/schema`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `dereference` | query | boolean | No |  |

**Sample Call**

```bash
epilot entity getJsonSchema \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity getJsonSchema contact
```

With JSONata filter:

```bash
epilot entity getJsonSchema -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "$schema": "http://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "format": "uuid",
      "example": "123e4567-e89b-12d3-a456-426614174000"
    },
    "_org": {
      "type": "string",
      "description": "Organization Id the entity belongs to",
      "readOnly": true
    },
    "_owners": {
      "type": "array",
      "readOnly": true,
      "items": {}
    },
    "_schema": {
      "readOnly": true,
      "type": "string"
    },
    "_title": {
      "readOnly": true,
      "type": "string"
    },
    "_tags": {
      "type": "array",
      "nullable": true,
      "items": {}
    },
    "_manifest": {
      "type": "array",
      "description": "Manifest ID used to create/update the entity",
      "items": {}
    },
    "_created_at": {
      "readOnly": true,
      "type": "string",
      "format": "date-time"
    },
    "_updated_at": {
      "readOnly": true,
      "type": "string",
      "format": "date-time"
    },
    "_acl": {
      "readOnly": true,
      "type": "object",
      "description": "Access control list (ACL) for an entity. Defines sharing access to external orgs or users.",
      "additionalProperties": true,
      "properties": {}
    },
    "title": {
      "type": "string",
      "nullable": true,
      "enum": ["Dr.", "Prof.", "Prof. Dr.", null]
    },
    "salutation": {
      "type": "string",
      "nullable": true,
      "enum": ["Mr.", "Ms. / Mrs.", "Company", "Contact Person", "Company/Contact Person", "Spouse", "Family", "Ownership", "Assembly", "Other", null]
    },
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "customer_number": {
      "type": "string",
      "nullable": true
    },
    "birthdate": {
      "type": "string",
      "format": "date",
      "nullable": true
    },
    "account": {
      "type": "object",
      "nullable": true,
      "properties": {},
      "additionalProperties": true
    },
    "address": {
      "type": "array",
      "nullable": true,
      "description": "Addresses as a list of object, the element with index 0 is treated as the primary one.\n",
      "items": {}
    },
    "email": {
      "type": "array",
      "nullable": true,
      "description": "Email addresses as a list of object, the element with index 0 is treated as the primary one.\n",
      "items": {}
    },
    "phone": {
      "type": "array",
      "description": "Phone numbers as a list of object, the element with index 0 is treated as the primary one.\n",
      "items": {}
    }
  },
  "required": ["first_name", "last_name", "_id", "_org", "_owners", "_schema", "_title", "_tags", "_created_at", "_updated_at", "_acl"]
}
```

</details>

---

### `getSchemaExample`

Get a full example entity for the given schema

`GET /v1/entity/schemas/{slug}/json/example`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |

**Sample Call**

```bash
epilot entity getSchemaExample \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity getSchemaExample contact
```

With JSONata filter:

```bash
epilot entity getSchemaExample -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{}
```

</details>

---

### `getSchemaVersions`

Get all versions of this schema ordered by the latest versions including drafts.

`GET /v1/entity/schemas/{slug}/versions`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `versions_from` | query | number | No |  |
| `versions_size` | query | number | No |  |
| `drafts_from` | query | number | No |  |
| `drafts_size` | query | number | No |  |
| `fields` | query | string[] | No |  |

**Sample Call**

```bash
epilot entity getSchemaVersions \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity getSchemaVersions contact
```

With JSONata filter:

```bash
epilot entity getSchemaVersions -p slug=contact --jsonata 'versions'
```

<details>
<summary>Sample Response</summary>

```json
{
  "versions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
      "frozen": true,
      "latest": true,
      "_summary": true,
      "slug": "contact",
      "version": 1,
      "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "enable_setting": ["360_features"],
      "name": "Contact",
      "plural": "Contacts",
      "description": "Example description",
      "docs_url": "https://docs.epilot.io/docs/pricing/entities",
      "category": "customer_relations",
      "published": false,
      "draft": false,
      "icon": "person",
      "title_template": "{{first_name}} {{last_name}}",
      "ui_config": {},
      "capabilities": [],
      "group_settings": [],
      "layout_settings": {},
      "dialog_config": {},
      "attributes": [],
      "_purpose": ["string"],
      "explicit_search_mappings": {},
      "group_headlines": []
    }
  ],
  "drafts": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
      "frozen": true,
      "latest": true,
      "_summary": true,
      "slug": "contact",
      "version": 1,
      "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "enable_setting": ["360_features"],
      "name": "Contact",
      "plural": "Contacts",
      "description": "Example description",
      "docs_url": "https://docs.epilot.io/docs/pricing/entities",
      "category": "customer_relations",
      "published": false,
      "draft": false,
      "icon": "person",
      "title_template": "{{first_name}} {{last_name}}",
      "ui_config": {},
      "capabilities": [],
      "group_settings": [],
      "layout_settings": {},
      "dialog_config": {},
      "attributes": [],
      "_purpose": ["string"],
      "explicit_search_mappings": {},
      "group_headlines": []
    }
  ],
  "versions_more": true,
  "drafts_more": true,
  "frozen_version": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `freezeSchema`

Freeze a schema at its current version, or at a specific version.

`POST /v1/entity/schemas/{slug}/freeze`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |

**Request Body**

**Sample Call**

```bash
epilot entity freezeSchema \
  -p slug=contact \
  -d '{"version_id":"3fa85f64-5717-4562-b3fc-2c963f66afa6"}'
```

Using positional args for path parameters:

```bash
epilot entity freezeSchema contact
```

Using stdin pipe:

```bash
cat body.json | epilot entity freezeSchema -p slug=contact
```

With JSONata filter:

```bash
epilot entity freezeSchema -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "comment": "string",
  "source": {
    "id": "string",
    "type": "string"
  },
  "frozen": true,
  "latest": true,
  "_summary": true,
  "slug": "contact",
  "version": 1,
  "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "enable_setting": ["360_features"],
  "name": "Contact",
  "plural": "Contacts",
  "description": "Example description",
  "docs_url": "https://docs.epilot.io/docs/pricing/entities",
  "category": "customer_relations",
  "published": false,
  "draft": false,
  "icon": "person",
  "title_template": "{{first_name}} {{last_name}}",
  "ui_config": {
    "table_view": {
      "view_type": "default",
      "row_actions": ["string"],
      "bulk_actions": ["string"],
      "navbar_actions": [],
      "enable_thumbnails": false
    },
    "create_view": {
      "view_type": "default",
      "search_params": {}
    },
    "edit_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "single_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "list_item": {
      "summary_attributes": [],
      "quick_actions": [],
      "ui_config": {}
    },
    "sharing": {
      "show_sharing_button": true
    }
  },
  "capabilities": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "customer_messaging",
      "title": "Messaging",
      "attributes": [],
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "app_id": "123e4567-e89b-12d3-a456-426614174000",
      "ui_config": {},
      "ui_hooks": [],
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "schemas": []
    }
  ],
  "group_settings": [
    {
      "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
      "label": "Contact Details",
      "expanded": true,
      "order": 1
    },
    {
      "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
      "label": "Address Details",
      "expanded": false,
      "order": 2,
      "info_tooltip_title": {}
    }
  ],
  "layout_settings": {
    "grid_gap": "string",
    "grid_template_columns": "string"
  },
  "dialog_config": {},
  "attributes": [
    {
      "name": "email",
      "type": "email",
      "label": "Email",
      "required": true
    },
    {
      "name": "first_name",
      "type": "string",
      "label": "First Name"
    }
  ],
  "_purpose": ["string"],
  "explicit_search_mappings": {
    "image": {
      "type": "keyword",
      "index": false
    }
  },
  "group_headlines": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "label": "string",
      "layout": "string",
      "group": "string",
      "order": 0,
      "type": "headline",
      "enable_divider": false,
      "divider": "top_divider",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `unfreezeSchema`

Unfreeze a schema. Promotes the latest version to the current version for all users.

`POST /v1/entity/schemas/{slug}/unfreeze`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |

**Sample Call**

```bash
epilot entity unfreezeSchema \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity unfreezeSchema contact
```

With JSONata filter:

```bash
epilot entity unfreezeSchema -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "comment": "string",
  "source": {
    "id": "string",
    "type": "string"
  },
  "frozen": true,
  "latest": true,
  "_summary": true,
  "slug": "contact",
  "version": 1,
  "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "enable_setting": ["360_features"],
  "name": "Contact",
  "plural": "Contacts",
  "description": "Example description",
  "docs_url": "https://docs.epilot.io/docs/pricing/entities",
  "category": "customer_relations",
  "published": false,
  "draft": false,
  "icon": "person",
  "title_template": "{{first_name}} {{last_name}}",
  "ui_config": {
    "table_view": {
      "view_type": "default",
      "row_actions": ["string"],
      "bulk_actions": ["string"],
      "navbar_actions": [],
      "enable_thumbnails": false
    },
    "create_view": {
      "view_type": "default",
      "search_params": {}
    },
    "edit_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "single_view": {
      "view_type": "default",
      "search_params": {},
      "summary_attributes": ["email"]
    },
    "list_item": {
      "summary_attributes": [],
      "quick_actions": [],
      "ui_config": {}
    },
    "sharing": {
      "show_sharing_button": true
    }
  },
  "capabilities": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "customer_messaging",
      "title": "Messaging",
      "attributes": [],
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "app_id": "123e4567-e89b-12d3-a456-426614174000",
      "ui_config": {},
      "ui_hooks": [],
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "schemas": []
    }
  ],
  "group_settings": [
    {
      "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
      "label": "Contact Details",
      "expanded": true,
      "order": 1
    },
    {
      "id": "e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e",
      "label": "Address Details",
      "expanded": false,
      "order": 2,
      "info_tooltip_title": {}
    }
  ],
  "layout_settings": {
    "grid_gap": "string",
    "grid_template_columns": "string"
  },
  "dialog_config": {},
  "attributes": [
    {
      "name": "email",
      "type": "email",
      "label": "Email",
      "required": true
    },
    {
      "name": "first_name",
      "type": "string",
      "label": "First Name"
    }
  ],
  "_purpose": ["string"],
  "explicit_search_mappings": {
    "image": {
      "type": "keyword",
      "index": false
    }
  },
  "group_headlines": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "label": "string",
      "layout": "string",
      "group": "string",
      "order": 0,
      "type": "headline",
      "enable_divider": false,
      "divider": "top_divider",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `listAvailableCapabilities`

List available capabilities for schema

`GET /v1/entity/schemas/{slug}/capabilities/available`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |

**Sample Call**

```bash
epilot entity listAvailableCapabilities \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity listAvailableCapabilities contact
```

With JSONata filter:

```bash
epilot entity listAvailableCapabilities -p slug=contact --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "customer_messaging",
      "title": "Messaging",
      "attributes": [],
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "app_id": "123e4567-e89b-12d3-a456-426614174000",
      "ui_config": {},
      "ui_hooks": [],
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "schemas": []
    }
  ]
}
```

</details>

---

### `listSchemaBlueprints`

List canonical versions of all available schemas

`GET /v1/entity/schemas/blueprints`

**Sample Call**

```bash
epilot entity listSchemaBlueprints
```

With JSONata filter:

```bash
epilot entity listSchemaBlueprints --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
      "frozen": true,
      "latest": true,
      "_summary": true,
      "slug": "contact",
      "version": 1,
      "blueprint": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "enable_setting": ["360_features"],
      "name": "Contact",
      "plural": "Contacts",
      "description": "Example description",
      "docs_url": "https://docs.epilot.io/docs/pricing/entities",
      "category": "customer_relations",
      "published": false,
      "draft": false,
      "icon": "person",
      "title_template": "{{first_name}} {{last_name}}",
      "ui_config": {},
      "capabilities": [],
      "group_settings": [],
      "layout_settings": {},
      "dialog_config": {},
      "attributes": [],
      "_purpose": ["string"],
      "explicit_search_mappings": {},
      "group_headlines": []
    }
  ]
}
```

</details>

---

### `searchEntities`

Search for entities. Supports ordering and pagination. [Lucene query syntax](https://www.elastic.co/guide/en/elasticsear

`POST /v1/entity:search`

**Request Body**

**Sample Call**

```bash
epilot entity searchEntities
```

With request body:

```bash
epilot entity searchEntities \
  -d '{
  "q": "_schema:contact AND status:active",
  "include_scores": false,
  "sort": "string",
  "from": 0,
  "size": 10,
  "hydrate": false,
  "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"],
  "aggs": {
    "contact-count-per-tag": {
      "terms": {
        "field": "_tags.keyword"
      }
    }
  },
  "include_deleted": "false",
  "highlight": {},
  "stable_for": 0,
  "stable_query_id": "string",
  "search_after": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity searchEntities
```

With JSONata filter:

```bash
epilot entity searchEntities --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_org": "123",
      "_owners": [
        {
          "org_id": "123",
          "user_id": "123"
        }
      ],
      "_schema": "contact",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_acl": {
        "view": ["org:456", "org:789"],
        "edit": ["org:456"],
        "delete": ["org:456"]
      },
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "aggregations": {
    "contact-count-per-tag": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 23,
      "buckets": [
        {
          "key": "automation",
          "doc_count": 108
        },
        {
          "key": "primary",
          "doc_count": 66
        }
      ]
    }
  },
  "stable_query_id": "string",
  "sort_end": [1747905443332, "0.000023312468"]
}
```

</details>

---

### `listEntities`

List entities that meet the specified conditions.

`POST /v1/entity:list`

**Request Body**

**Sample Call**

```bash
epilot entity listEntities
```

With request body:

```bash
epilot entity listEntities \
  -d '{
  "query": {
    "query_string": {
      "query": "status:active",
      "fields": ["_title", "_tags", "status"],
      "default_operator": "OR",
      "lenient": true
    }
  },
  "filter": [
    {
      "term": {
        "_schema": "contact"
      }
    },
    {
      "terms": {
        "status": ["active"]
      }
    }
  ],
  "allow_targeting_all_schemas": false,
  "sort": "string",
  "from": 0,
  "size": 10,
  "hydrate": false,
  "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"],
  "aggs": {
    "contact-count-per-tag": {
      "terms": {
        "field": "_tags.keyword"
      }
    }
  },
  "include_deleted": "false",
  "include_scores": false,
  "highlight": {},
  "stable_for": 0,
  "stable_query_id": "string",
  "search_after": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity listEntities
```

With JSONata filter:

```bash
epilot entity listEntities --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "results": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_org": "123",
      "_owners": [
        {
          "org_id": "123",
          "user_id": "123"
        }
      ],
      "_schema": "contact",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_acl": {
        "view": ["org:456", "org:789"],
        "edit": ["org:456"],
        "delete": ["org:456"]
      },
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "aggregations": {
    "contact-count-per-tag": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 23,
      "buckets": [
        {
          "key": "automation",
          "doc_count": 108
        },
        {
          "key": "primary",
          "doc_count": 66
        }
      ]
    }
  },
  "stable_query_id": "string",
  "sort_end": [1747905443332, "0.000023312468"]
}
```

</details>

---

### `queryEntityGraph`

Traverse an entity relationship graph starting from a seed entity.

`POST /v1/entity:graph`

**Request Body** (required)

**Sample Call**

```bash
epilot entity queryEntityGraph
```

With request body:

```bash
epilot entity queryEntityGraph \
  -d '{
  "seed": {
    "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "node_id": "contact"
  },
  "graph": {
    "nodes": [
      {
        "id": "portal_user",
        "schema": "portal_user",
        "cardinality": "one"
      },
      {
        "id": "contact",
        "schema": "contact",
        "cardinality": "one"
      }
    ],
    "edges": [
      {
        "from": "portal_user",
        "to": "contact"
      },
      {
        "from": "contact",
        "to": "billing_accounts"
      }
    ]
  },
  "hydrate": false
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity queryEntityGraph
```

With JSONata filter:

```bash
epilot entity queryEntityGraph --jsonata 'nodes'
```

<details>
<summary>Sample Response</summary>

```json
{
  "nodes": {
    "portal_user": ["550e8400-e29b-41d4-a716-446655440001"],
    "contact": ["550e8400-e29b-41d4-a716-446655440002"],
    "billing_accounts": ["550e8400-e29b-41d4-a716-446655440003", "550e8400-e29b-41d4-a716-446655440004"]
  },
  "entityNodes": {
    "portal_user": {
      "_id": "550e8400-e29b-41d4-a716-446655440001",
      "_schema": "portal_user"
    },
    "contact": {
      "_id": "550e8400-e29b-41d4-a716-446655440002",
      "_schema": "contact"
    },
    "billing_accounts": [
      {
        "_id": "550e8400-e29b-41d4-a716-446655440003",
        "_schema": "billing_account"
      },
      {
        "_id": "550e8400-e29b-41d4-a716-446655440004",
        "_schema": "billing_account"
      }
    ]
  },
  "edges": [
    {
      "from": "portal_user",
      "to": "contact"
    },
    {
      "from": "contact",
      "to": "billing_accounts"
    }
  ]
}
```

</details>

---

### `createEntity`

Creates a new entity using a key.

`POST /v1/entity/{slug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |
| `fill_activity` | query | boolean | No | Update the diff and entity for the custom activity included in the query.
Pending state on activity is automatically ended when activity is filled.
 |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `validate` | query | boolean | No | When true, enables entity validation against the entity schema. |

**Request Body**

**Sample Call**

```bash
epilot entity createEntity \
  -p slug=contact
```

With request body:

```bash
epilot entity createEntity \
  -p slug=contact \
  -d '{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot entity createEntity contact
```

Using stdin pipe:

```bash
cat body.json | epilot entity createEntity -p slug=contact
```

With JSONata filter:

```bash
epilot entity createEntity -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `validateEntity`

Validates an entity against the schema.

`POST /v1/entity/{slug}:validate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | unknown | Yes | Entity Type |

**Request Body**

**Sample Call**

```bash
epilot entity validateEntity \
  -p slug=price
```

With request body:

```bash
epilot entity validateEntity \
  -p slug=price \
  -d '{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot entity validateEntity price
```

Using stdin pipe:

```bash
cat body.json | epilot entity validateEntity -p slug=price
```

With JSONata filter:

```bash
epilot entity validateEntity -p slug=price --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "success",
  "errors": [
    {
      "code": "custom",
      "params": {
        "type": "missing_field"
      },
      "path": ["first_name"],
      "message": "Invalid input"
    }
  ]
}
```

</details>

---

### `validateEntityV2`

Validates an entity against the schema.

`POST /v2/entity/{slug}:validate`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | unknown | Yes | Entity Type |

**Request Body**

**Sample Call**

```bash
epilot entity validateEntityV2 \
  -p slug=price
```

With request body:

```bash
epilot entity validateEntityV2 \
  -p slug=price \
  -d '{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot entity validateEntityV2 price
```

Using stdin pipe:

```bash
cat body.json | epilot entity validateEntityV2 -p slug=price
```

With JSONata filter:

```bash
epilot entity validateEntityV2 -p slug=price --jsonata 'status'
```

<details>
<summary>Sample Response</summary>

```json
{
  "status": "success",
  "errors": [
    {
      "keyword": "string",
      "instance_path": "string",
      "schema_path": "string",
      "params": {},
      "property_name": "string",
      "message": "string",
      "schema": {},
      "parent_schema": {},
      "data": {}
    }
  ]
}
```

</details>

---

### `upsertEntity`

Create or update an entity using `unique_key`

`PATCH /v1/entity/{slug}:upsert`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |
| `fill_activity` | query | boolean | No | Update the diff and entity for the custom activity included in the query.
Pending state on activity is automatically ended when activity is filled.
 |
| `dry_run` | query | boolean | No | Dry Run mode = return results but does not perform the operation. |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `validate` | query | boolean | No | When true, enables entity validation against the entity schema. |
| `strict` | query | boolean | No | Strict mode = return 409 if more than one entity is matched |

**Request Body**

**Sample Call**

```bash
epilot entity upsertEntity \
  -p slug=contact
```

With request body:

```bash
epilot entity upsertEntity \
  -p slug=contact \
  -d '{
  "unique_key": ["_id"],
  "entity": {
    "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "_org": "123",
    "_owners": [
      {
        "org_id": "123",
        "user_id": "123"
      }
    ],
    "_schema": "contact",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_acl": {
      "view": ["org:456", "org:789"],
      "edit": ["org:456"],
      "delete": ["org:456"]
    },
    "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
  }
}'
```

Using positional args for path parameters:

```bash
epilot entity upsertEntity contact
```

Using stdin pipe:

```bash
cat body.json | epilot entity upsertEntity -p slug=contact
```

With JSONata filter:

```bash
epilot entity upsertEntity -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `getEntityV2`

Gets Entity by id.

`GET /v2/entity/{slug}/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Entity id |
| `slug` | path | string | Yes | Entity Type |
| `hydrate` | query | boolean | No | When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place. |
| `fields` | query | string[] | No | List of entity fields to include in results |

**Sample Call**

```bash
epilot entity getEntityV2 \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity getEntityV2 123e4567-e89b-12d3-a456-426614174000 contact
```

With JSONata filter:

```bash
epilot entity getEntityV2 -p id=123e4567-e89b-12d3-a456-426614174000 -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `restoreEntity`

Restores an entity by id

`PATCH /v1/entity/{slug}/{id}:restore`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Entity id |
| `slug` | path | string | Yes | Entity Type |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |

**Request Body**

**Sample Call**

```bash
epilot entity restoreEntity \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p slug=contact \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot entity restoreEntity 123e4567-e89b-12d3-a456-426614174000 contact
```

Using stdin pipe:

```bash
cat body.json | epilot entity restoreEntity -p id=123e4567-e89b-12d3-a456-426614174000 -p slug=contact
```

With JSONata filter:

```bash
epilot entity restoreEntity -p id=123e4567-e89b-12d3-a456-426614174000 -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `reindexEntity`

Triggers a reindex for the Entity for search.

`POST /v1/entity/{slug}/{id}:reindex`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Entity id |
| `slug` | path | string | Yes | Entity Type |

**Request Body**

**Sample Call**

```bash
epilot entity reindexEntity \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p slug=contact \
  -d '{}'
```

Using positional args for path parameters:

```bash
epilot entity reindexEntity 123e4567-e89b-12d3-a456-426614174000 contact
```

Using stdin pipe:

```bash
cat body.json | epilot entity reindexEntity -p id=123e4567-e89b-12d3-a456-426614174000 -p slug=contact
```

With JSONata filter:

```bash
epilot entity reindexEntity -p id=123e4567-e89b-12d3-a456-426614174000 -p slug=contact --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `getEntity`

Gets Entity and relations by id.

`GET /v1/entity/{slug}/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | Entity id |
| `slug` | path | string | Yes | Entity Type |
| `hydrate` | query | boolean | No | When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place. |

**Sample Call**

```bash
epilot entity getEntity \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p slug=contact
```

Using positional args for path parameters:

```bash
epilot entity getEntity 123e4567-e89b-12d3-a456-426614174000 contact
```

With JSONata filter:

```bash
epilot entity getEntity -p id=123e4567-e89b-12d3-a456-426614174000 -p slug=contact --jsonata 'entity._title'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity": {
    "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "_org": "123",
    "_owners": [
      {
        "org_id": "123",
        "user_id": "123"
      }
    ],
    "_schema": "contact",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_acl": {
      "view": ["org:456", "org:789"],
      "edit": ["org:456"],
      "delete": ["org:456"]
    },
    "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
  },
  "relations": [
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_org": "123",
      "_owners": [
        {
          "org_id": "123",
          "user_id": "123"
        }
      ],
      "_schema": "contact",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_acl": {
        "view": ["org:456", "org:789"],
        "edit": ["org:456"],
        "delete": ["org:456"]
      },
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `updateEntity`

Updates an Entity

`PUT /v1/entity/{slug}/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |
| `fill_activity` | query | boolean | No | Update the diff and entity for the custom activity included in the query.
Pending state on activity is automatically ended when activity is filled.
 |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `validate` | query | boolean | No | When true, enables entity validation against the entity schema. |

**Request Body**

**Sample Call**

```bash
epilot entity updateEntity \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot entity updateEntity \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot entity updateEntity contact 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity updateEntity -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity updateEntity -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `patchEntity`

Partially updates an entity with the passed in entity data.

`PATCH /v1/entity/{slug}/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |
| `fill_activity` | query | boolean | No | Update the diff and entity for the custom activity included in the query.
Pending state on activity is automatically ended when activity is filled.
 |
| `dry_run` | query | boolean | No | Dry Run mode = return results but does not perform the operation. |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `validate` | query | boolean | No | When true, enables entity validation against the entity schema. |

**Request Body** (required)

**Sample Call**

```bash
epilot entity patchEntity \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot entity patchEntity \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot entity patchEntity contact 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity patchEntity -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity patchEntity -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "_org": "123",
  "_owners": [
    {
      "org_id": "123",
      "user_id": "123"
    }
  ],
  "_schema": "contact",
  "_tags": ["example", "mock"],
  "_created_at": "2021-02-09T12:41:43.662Z",
  "_updated_at": "2021-02-09T12:41:43.662Z",
  "_acl": {
    "view": ["org:456", "org:789"],
    "edit": ["org:456"],
    "delete": ["org:456"]
  },
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `deleteEntity`

Deletes an Entity

`DELETE /v1/entity/{slug}/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |
| `purge` | query | boolean | No | Permanently deletes the entity when set to `true` |

**Sample Call**

```bash
epilot entity deleteEntity \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity deleteEntity contact 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity deleteEntity -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `autocomplete`

Autocomplete entity attributes

`GET /v1/entity:autocomplete`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `input` | query | string | No | Input to autocomplete |
| `attribute` | query | string | Yes | Autocomplete attribute |
| `slug` | query | string | No | Limit results to entity schema |
| `size` | query | number | No | Maximum number of results to return |

**Sample Call**

```bash
epilot entity autocomplete \
  -p attribute=_tags
```

With JSONata filter:

```bash
epilot entity autocomplete -p attribute=_tags --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "results": ["value"]
}
```

</details>

---

### `wipeAllEntities`

Creates a request to queue the deletion of all entities in the system. This is a destructive operation and should only b

`POST /v1/entity:wipeAllEntities`

**Request Body**

**Sample Call**

```bash
epilot entity wipeAllEntities \
  -d '{"schemas":["contact"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity wipeAllEntities
```

With JSONata filter:

```bash
epilot entity wipeAllEntities --jsonata '$'
```

---

### `createActivity`

Create an activity that can be displayed in activity feeds.

`POST /v1/entity/activity`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `entities` | query | string (uuid)[] | No | Comma-separated list of entities which the activity primarily concerns |

**Request Body**

**Sample Call**

```bash
epilot entity createActivity
```

With request body:

```bash
epilot entity createActivity \
  -d '{
  "type": "string",
  "title": "My custom activity",
  "message": "{{caller}} did something with {{entity payload.entity.id}}.",
  "payload": {
    "entity": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "schema": "contact"
    }
  },
  "pending": false
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createActivity
```

With JSONata filter:

```bash
epilot entity createActivity --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
  "timestamp": "1970-01-01T00:00:00.000Z",
  "type": "string",
  "title": "My custom activity",
  "message": "{{caller}} did something with {{entity payload.entity.id}}.",
  "payload": {
    "entity": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "schema": "contact"
    }
  },
  "pending": false,
  "caller": {
    "EpilotAuth": {
      "token": {
        "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
        "cognito:groups": ["Administrator"],
        "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
        "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
        "custom:ivy_org_id": "739224",
        "cognito:username": "n.ahmad@epilot.cloud",
        "custom:ivy_user_id": "10006129",
        "cognito:roles": ["arn:aws:iam::912468240823:role/base-administrator-role"],
        "aud": "6e0jbdnger7nmoktaaflarue1l",
        "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
        "token_use": "id",
        "auth_time": 1614333023,
        "exp": 1614336623,
        "iat": 1614333023,
        "email": "n.ahmad@epilot.cloud"
      }
    }
  }
}
```

</details>

---

### `getActivity`

Get activity by id

`GET /v1/entity/activity/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (ulid) | Yes | Activity Id |
| `operations_size` | query | number | No | Maximum number of operations to include in response (default: 10)
 |
| `operations_from` | query | number | No | Pagination offset for operations
 |

**Sample Call**

```bash
epilot entity getActivity \
  -p id=01F130Q52Q6MWSNS8N2AVXV4JN
```

Using positional args for path parameters:

```bash
epilot entity getActivity 01F130Q52Q6MWSNS8N2AVXV4JN
```

With JSONata filter:

```bash
epilot entity getActivity -p id=01F130Q52Q6MWSNS8N2AVXV4JN --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
  "timestamp": "1970-01-01T00:00:00.000Z",
  "type": "string",
  "title": "My custom activity",
  "message": "{{caller}} did something with {{entity payload.entity.id}}.",
  "payload": {
    "entity": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "schema": "contact"
    }
  },
  "pending": false,
  "caller": {
    "EpilotAuth": {
      "token": {}
    }
  },
  "operations_total": 1,
  "operations": [
    {
      "entity": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org": "123",
      "activity_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
      "activity_type": "string",
      "operation": "createEntity",
      "params": {},
      "payload": {},
      "diff": {},
      "_workflow_origin": {}
    }
  ]
}
```

</details>

---

### `attachActivity`

Attach existing activity to entity activity feeds

`POST /v1/entity/activity/{id}:attach`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (ulid) | Yes | Activity Id |
| `entities` | query | string (uuid)[] | No | Comma-separated list of entities which the activity primarily concerns |

**Sample Call**

```bash
epilot entity attachActivity \
  -p id=01F130Q52Q6MWSNS8N2AVXV4JN
```

Using positional args for path parameters:

```bash
epilot entity attachActivity 01F130Q52Q6MWSNS8N2AVXV4JN
```

With JSONata filter:

```bash
epilot entity attachActivity -p id=01F130Q52Q6MWSNS8N2AVXV4JN --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
  "timestamp": "1970-01-01T00:00:00.000Z",
  "type": "string",
  "title": "My custom activity",
  "message": "{{caller}} did something with {{entity payload.entity.id}}.",
  "payload": {
    "entity": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "schema": "contact"
    }
  },
  "pending": false,
  "caller": {
    "EpilotAuth": {
      "token": {
        "sub": "476e9b48-42f4-4234-a2b0-4668b34626ce",
        "cognito:groups": ["Administrator"],
        "cognito:preferred_role": "arn:aws:iam::912468240823:role/base-administrator-role",
        "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6lZSgmU6D",
        "custom:ivy_org_id": "739224",
        "cognito:username": "n.ahmad@epilot.cloud",
        "custom:ivy_user_id": "10006129",
        "cognito:roles": ["arn:aws:iam::912468240823:role/base-administrator-role"],
        "aud": "6e0jbdnger7nmoktaaflarue1l",
        "event_id": "cd5f5583-d90c-4db5-8e99-5f5dd29a4d75",
        "token_use": "id",
        "auth_time": 1614333023,
        "exp": 1614336623,
        "iat": 1614333023,
        "email": "n.ahmad@epilot.cloud"
      }
    }
  }
}
```

</details>

---

### `getEntityActivityFeed`

Get activity feed for an entity

`GET /v1/entity/{slug}/{id}/activity`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `after` | query | string (date-time) | No | Get activities strictly after this timestamp. Cannot be used with 'before', 'start_date', 'end_date', or 'preset_range'. |
| `before` | query | string (date-time) | No | Get activities strictly before this timestamp. Cannot be used with 'after', 'start_date', 'end_date', or 'preset_range'. |
| `start_date` | query | string (date-time) | No | The inclusive start timestamp for a date range filter. Requires 'end_date' to also be provided. Cannot be used with 'before', 'after', or 'preset_range'. |
| `end_date` | query | string (date-time) | No | The inclusive end timestamp for a date range filter. Requires 'start_date' to also be provided. Cannot be used with 'before', 'after', or 'preset_range'. |
| `preset_range` | query | "today" \| "this_week" \| "last_week" | No | Get activities within a predefined date range (e.g., 'today', 'last_week'). Cannot be used with 'before', 'after', 'start_date', or 'end_date'. |
| `from` | query | number | No | Starting page number |
| `size` | query | number | No | max number of results to return |
| `type` | query | string[] | No | Filter by activity type(s) |
| `include_relations` | query | boolean | No | Include activities from related entities |
| `exclude_activity_groups` | query | string | No | Exclude all activity types that are part of an activity group from results |

**Sample Call**

```bash
epilot entity getEntityActivityFeed \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getEntityActivityFeed contact 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getEntityActivityFeed -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "total": 1,
  "results": [
    {
      "_id": "01F130Q52Q6MWSNS8N2AVXV4JN",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "type": "string",
      "title": "My custom activity",
      "message": "{{caller}} did something with {{entity payload.entity.id}}.",
      "payload": {},
      "pending": false,
      "caller": {},
      "operations_total": 1,
      "operations": []
    }
  ]
}
```

</details>

---

### `getRelations`

Returns 1st level direct relations for an entity.

`GET /v1/entity/{slug}/{id}/relations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `hydrate` | query | boolean | No | When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place. |
| `include_reverse` | query | boolean | No | When true, includes reverse relations in response (other entities pointing to this entity) |
| `from` | query | number | No | Starting page number |
| `size` | query | number | No | Number of results to return per page |
| `include_schemas` | query | string[] | No | Filter results to only include schemas |
| `exclude_schemas` | query | string[] | No | Filter results to exclude schemas |

**Sample Call**

```bash
epilot entity getRelations \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getRelations contact 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getRelations -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "org_id": "string",
    "_schema": "contact",
    "attribute": "string",
    "_tags": ["string"],
    "reverse": true
  },
  {
    "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "_org": "123",
    "_owners": [
      {
        "org_id": "123",
        "user_id": "123"
      }
    ],
    "_schema": "contact",
    "_tags": ["example", "mock"],
    "_created_at": "2021-02-09T12:41:43.662Z",
    "_updated_at": "2021-02-09T12:41:43.662Z",
    "_acl": {
      "view": ["org:456", "org:789"],
      "edit": ["org:456"],
      "delete": ["org:456"]
    },
    "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
  }
]
```

</details>

---

### `addRelations`

Relates one or more entities to parent entity by adding items to a relation attribute

`POST /v1/entity/{slug}/{id}/relations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |

**Request Body**

**Sample Call**

```bash
epilot entity addRelations \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot entity addRelations \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '[
  {
    "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "org_id": "string",
    "_schema": "contact",
    "attribute": "string",
    "_tags": ["string"],
    "reverse": true
  }
]'
```

Using positional args for path parameters:

```bash
epilot entity addRelations contact 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity addRelations -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity addRelations -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "_schema": "contact",
  "attribute": "string",
  "_tags": ["string"],
  "reverse": true
}
```

</details>

---

### `removeRelations`

Disassociate one or more entities to parent entity by removing items to a relation attribute

`DELETE /v1/entity/{slug}/{id}/relations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |

**Request Body**

**Sample Call**

```bash
epilot entity removeRelations \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot entity removeRelations \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '[
  {
    "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "org_id": "string",
    "_schema": "contact",
    "attribute": "string",
    "_tags": ["string"],
    "reverse": true
  }
]'
```

Using positional args for path parameters:

```bash
epilot entity removeRelations contact 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity removeRelations -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity removeRelations -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `getRelationsV2`

Returns 1st level direct relations for an entity with pagination.

`GET /v2/entity/{slug}/{id}/relations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `hydrate` | query | boolean | No | When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place. |
| `query` | query | string | No | Input to filter search results |
| `include_reverse` | query | boolean | No | When true, includes reverse relations in response (other entities pointing to this entity) |
| `from` | query | number | No | Starting page number |
| `size` | query | number | No | Number of results to return per page |
| `fields` | query | string[] | No | List of entity fields to include in results |

**Sample Call**

```bash
epilot entity getRelationsV2 \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getRelationsV2 contact 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getRelationsV2 -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'hits[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "relations": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "_schema": "contact",
      "attribute": "string",
      "_tags": ["string"],
      "reverse": true
    },
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_org": "123",
      "_owners": [
        {
          "org_id": "123",
          "user_id": "123"
        }
      ],
      "_schema": "contact",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_acl": {
        "view": ["org:456", "org:789"],
        "edit": ["org:456"],
        "delete": ["org:456"]
      },
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `getRelationsV3`

Returns 1st level direct relations for an entity with pagination.

`GET /v3/entity/{slug}/{id}/relations`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `hydrate` | query | boolean | No | When true, enables entity hydration to resolve nested $relation & $relation_ref references in-place. |
| `include_reverse` | query | boolean | No | When true, includes reverse relations in response (other entities pointing to this entity)
*It gets overriden by mode query parameter.*
 |
| `from` | query | number | No | Starting page number |
| `size` | query | number | No | Number of results to return per page |
| `include_schemas` | query | string[] | No | Filter results to only include schemas |
| `exclude_schemas` | query | string[] | No | Filter results to exclude schemas |
| `mode` | query | "direct" \| "reverse" \| "both" | No | Options to determine how relations will be included in the result.
*It overrides the include_reverse query param.*
Explanation of possible options:
- direct: include relations to which the searched en |
| `fields` | query | string[] | No | List of entity fields to include in results |
| `include_deleted` | query | "true" \| "false" \| "only" | No | Whether to include relations to/from deleted entities
- `true`: include relations to/from deleted entities
- `false`: exclude relations to/from deleted entities (default)
- `only`: include only relati |

**Sample Call**

```bash
epilot entity getRelationsV3 \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getRelationsV3 contact 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getRelationsV3 -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'hits[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "relations": [
    {
      "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "org_id": "string",
      "_schema": "contact",
      "attribute": "string",
      "_tags": ["string"],
      "reverse": true
    },
    {
      "_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "_org": "123",
      "_owners": [
        {
          "org_id": "123",
          "user_id": "123"
        }
      ],
      "_schema": "contact",
      "_tags": ["example", "mock"],
      "_created_at": "2021-02-09T12:41:43.662Z",
      "_updated_at": "2021-02-09T12:41:43.662Z",
      "_acl": {
        "view": ["org:456", "org:789"],
        "edit": ["org:456"],
        "delete": ["org:456"]
      },
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `getRelatedEntitiesCount`

Returns the amount of unique related entities for an entity - includes direct and reverse relations.

`GET /v2/entity/{slug}/{id}/relations/count`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `exclude_schemas` | query | string[] | No | Filter results to exclude schemas |

**Sample Call**

```bash
epilot entity getRelatedEntitiesCount \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getRelatedEntitiesCount contact 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getRelatedEntitiesCount -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'hits[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1
}
```

</details>

---

### `updateRelation`

Updates an existing relation between two entities.

`PUT /v1/entity/{slug}/{id}/relations/{attribute}/{entity_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `attribute` | path | string | Yes | The attribute that express meaning |
| `entity_id` | path | string | Yes | The attribute that express meaning |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |

**Request Body**

**Sample Call**

```bash
epilot entity updateRelation \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p attribute=example \
  -p entity_id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{"_tags":["string"]}'
```

Using positional args for path parameters:

```bash
epilot entity updateRelation contact 123e4567-e89b-12d3-a456-426614174000 example 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity updateRelation -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 -p attribute=example -p entity_id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity updateRelation -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 -p attribute=example -p entity_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'entity_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "entity_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "org_id": "string",
  "_schema": "contact",
  "attribute": "string",
  "_tags": ["string"],
  "reverse": true
}
```

</details>

---

### `deleteRelation`

Removes relation between two entities

`DELETE /v1/entity/{slug}/{id}/relations/{attribute}/{entity_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `id` | path | string (uuid) | Yes | Entity id |
| `attribute` | path | string | Yes | The attribute that express meaning |
| `entity_id` | path | string | Yes | The attribute that express meaning |
| `async` | query | boolean | No | Don't wait for updated entity to become available in Search API. Useful for large migrations |
| `activity_id` | query | string (ulid) \| "" \| null | No | Activity to include in event feed |

**Sample Call**

```bash
epilot entity deleteRelation \
  -p slug=contact \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -p attribute=example \
  -p entity_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity deleteRelation contact 123e4567-e89b-12d3-a456-426614174000 example 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity deleteRelation -p slug=contact -p id=123e4567-e89b-12d3-a456-426614174000 -p attribute=example -p entity_id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `exportEntities`

Export entity data in a CSV-format. The export will export data as close as possible to what is visible on Entity UI tab

`POST /v1/entity:export`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | query | string | No | Export Job Id to get the result |
| `is_template` | query | boolean | No | Pass 'true' to generate import template |
| `language` | query | string | No | Export headers translation language |

**Request Body**

**Sample Call**

```bash
epilot entity exportEntities
```

With request body:

```bash
epilot entity exportEntities \
  -d '{
  "q": "_schema:contact AND status:active",
  "include_scores": false,
  "sort": "string",
  "from": 0,
  "size": 10,
  "hydrate": false,
  "fields": ["_id", "_title", "first_name", "account", "!account.*._files", "**._product"],
  "aggs": {
    "contact-count-per-tag": {
      "terms": {
        "field": "_tags.keyword"
      }
    }
  },
  "include_deleted": "false",
  "highlight": {},
  "stable_for": 0,
  "stable_query_id": "string",
  "search_after": ["string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity exportEntities
```

With JSONata filter:

```bash
epilot entity exportEntities --jsonata '$'
```

---

### `importEntities`

This endpoint enables the import of entities into the platform.

`POST /v1/entity:import`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | query | string | No | The ID of the import job. This ID is used to track the progress and fetch the result of the import operation. |

**Request Body**

**Sample Call**

```bash
epilot entity importEntities \
  -d '{"S3Reference":{"bucket":"my-bucket","key":"imports/my-import.json"},"schema":"contact"}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity importEntities
```

With JSONata filter:

```bash
epilot entity importEntities --jsonata '$'
```

---

### `listSavedViews`

Get the Saved Views based on the schema

`GET /v1/entity/views`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | query | string | No | Return views belonging to this schema |
| `sort` | query | string | No | The sort key to use if present |
| `from` | query | number | No |  |
| `size` | query | number | No | Number of saved views to return |
| `fields` | query | string[] | No |  |

**Sample Call**

```bash
epilot entity listSavedViews
```

With JSONata filter:

```bash
epilot entity listSavedViews --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "hits": 1,
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "slug": ["contact"],
      "name": "View listing German",
      "org": "66",
      "shared": true,
      "isFavoritedBy": ["11701"],
      "created_by": {
        "user_id": "10598"
      },
      "ui_config": {
        "filters": {
          "customer_name": "suresh test",
          "_tags": "360"
        },
        "table_layout": {
          "opportunity": {
            "page": 1,
            "sort": "_created_at:desc",
            "pageSize": 25,
            "columnSettings": []
          }
        }
      },
      "shared_with": ["112233"]
    }
  ]
}
```

</details>

---

### `createSavedView`

Creates a new saved view

`POST /v1/entity/view`

**Request Body**

**Sample Call**

```bash
epilot entity createSavedView
```

With request body:

```bash
epilot entity createSavedView \
  -d '{
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createSavedView
```

With JSONata filter:

```bash
epilot entity createSavedView --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}
```

</details>

---

### `getSavedView`

Gets Saved View configuration by id.

`GET /v1/entity/view/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | View id |

**Sample Call**

```bash
epilot entity getSavedView \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getSavedView 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getSavedView -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}
```

</details>

---

### `updateSavedView`

Updates a saved view

`PUT /v1/entity/view/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | View id |

**Request Body**

**Sample Call**

```bash
epilot entity updateSavedView \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot entity updateSavedView \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}'
```

Using positional args for path parameters:

```bash
epilot entity updateSavedView 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity updateSavedView -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity updateSavedView -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}
```

</details>

---

### `patchSavedView`

Partially updates a saved view with the provided payload. If an updated_at is passed and the server contains a newer ver

`PATCH /v1/entity/view/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | View id |

**Request Body**

**Sample Call**

```bash
epilot entity patchSavedView \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

With request body:

```bash
epilot entity patchSavedView \
  -p id=123e4567-e89b-12d3-a456-426614174000 \
  -d '{
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}'
```

Using positional args for path parameters:

```bash
epilot entity patchSavedView 123e4567-e89b-12d3-a456-426614174000
```

Using stdin pipe:

```bash
cat body.json | epilot entity patchSavedView -p id=123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity patchSavedView -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "created_at": "string",
  "updated_at": "string",
  "slug": ["contact"],
  "name": "View listing German",
  "org": "66",
  "shared": true,
  "isFavoritedBy": ["11701"],
  "created_by": {
    "user_id": "10598"
  },
  "ui_config": {
    "filters": {
      "customer_name": "suresh test",
      "_tags": "360"
    },
    "table_layout": {
      "opportunity": {
        "page": 1,
        "sort": "_created_at:desc",
        "pageSize": 25,
        "columnSettings": []
      }
    }
  },
  "shared_with": ["112233"]
}
```

</details>

---

### `deleteSavedView`

Deletes a saved view

`DELETE /v1/entity/view/{id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `id` | path | string (uuid) | Yes | View id |

**Sample Call**

```bash
epilot entity deleteSavedView \
  -p id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity deleteSavedView 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity deleteSavedView -p id=123e4567-e89b-12d3-a456-426614174000 --jsonata '$'
```

---

### `listFavoriteViewsForUser`

Get the Favorite Saved Views for user based on the schema

`GET /v1/entity/views/favorites`

**Sample Call**

```bash
epilot entity listFavoriteViewsForUser
```

With JSONata filter:

```bash
epilot entity listFavoriteViewsForUser --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "slug": ["contact"],
      "name": "View listing German",
      "org": "66",
      "shared": true,
      "isFavoritedBy": ["11701"],
      "created_by": {
        "user_id": "10598"
      },
      "ui_config": {
        "filters": {
          "customer_name": "suresh test",
          "_tags": "360"
        },
        "table_layout": {
          "opportunity": {
            "page": 1,
            "sort": "_created_at:desc",
            "pageSize": 25,
            "columnSettings": []
          }
        }
      },
      "shared_with": ["112233"]
    }
  ]
}
```

</details>

---

### `listTaxonomies`

List taxonomies in an organization

`GET /v1/entity/taxonomies`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `include_disabled` | query | boolean | No | Include disabled taxonomies |
| `type` | query | "entity" \| "relation" | No | Type of taxonomy to include |

**Sample Call**

```bash
epilot entity listTaxonomies
```

With JSONata filter:

```bash
epilot entity listTaxonomies --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "slug": "purpose",
      "name": "Purpose",
      "plural": "Purposes",
      "kind": "system",
      "type": "entity",
      "icon": "purpose",
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "deleted_at": "1970-01-01T00:00:00.000Z",
      "created_by": "10598",
      "enabled": true,
      "order": 10,
      "enabled_locations": ["account", "string"]
    }
  ]
}
```

</details>

---

### `createTaxonomy`

Create a new taxonomy

`POST /v1/entity/taxonomies`

**Request Body**

**Sample Call**

```bash
epilot entity createTaxonomy
```

With request body:

```bash
epilot entity createTaxonomy \
  -d '{
  "slug": "purpose",
  "name": "Purpose",
  "plural": "Purposes",
  "kind": "system",
  "type": "entity",
  "icon": "purpose",
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "created_by": "10598",
  "enabled": true,
  "order": 10,
  "enabled_locations": ["account", "string"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createTaxonomy
```

With JSONata filter:

```bash
epilot entity createTaxonomy --jsonata 'slug'
```

<details>
<summary>Sample Response</summary>

```json
{
  "slug": "purpose",
  "name": "Purpose",
  "plural": "Purposes",
  "kind": "system",
  "type": "entity",
  "icon": "purpose",
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "created_by": "10598",
  "enabled": true,
  "order": 10,
  "enabled_locations": ["account", "string"]
}
```

</details>

---

### `getTaxonomy`

Get taxonomy by slug

`GET /v1/entity/taxonomies/{taxonomySlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `taxonomySlug` | path | string | Yes | Taxonomy slug |

**Sample Call**

```bash
epilot entity getTaxonomy \
  -p taxonomySlug=example
```

Using positional args for path parameters:

```bash
epilot entity getTaxonomy example
```

With JSONata filter:

```bash
epilot entity getTaxonomy -p taxonomySlug=example --jsonata 'slug'
```

<details>
<summary>Sample Response</summary>

```json
{
  "slug": "purpose",
  "name": "Purpose",
  "plural": "Purposes",
  "kind": "system",
  "type": "entity",
  "icon": "purpose",
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "created_by": "10598",
  "enabled": true,
  "order": 10,
  "enabled_locations": ["account", "string"]
}
```

</details>

---

### `updateTaxonomy`

Update a taxonomy

`PUT /v1/entity/taxonomies/{taxonomySlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `taxonomySlug` | path | string | Yes | Taxonomy slug |

**Request Body**

**Sample Call**

```bash
epilot entity updateTaxonomy \
  -p taxonomySlug=example
```

With request body:

```bash
epilot entity updateTaxonomy \
  -p taxonomySlug=example \
  -d '{
  "slug": "purpose",
  "name": "Purpose",
  "plural": "Purposes",
  "kind": "system",
  "type": "entity",
  "icon": "purpose",
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "created_by": "10598",
  "enabled": true,
  "order": 10,
  "enabled_locations": ["account", "string"]
}'
```

Using positional args for path parameters:

```bash
epilot entity updateTaxonomy example
```

Using stdin pipe:

```bash
cat body.json | epilot entity updateTaxonomy -p taxonomySlug=example
```

With JSONata filter:

```bash
epilot entity updateTaxonomy -p taxonomySlug=example --jsonata 'slug'
```

<details>
<summary>Sample Response</summary>

```json
{
  "slug": "purpose",
  "name": "Purpose",
  "plural": "Purposes",
  "kind": "system",
  "type": "entity",
  "icon": "purpose",
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "deleted_at": "1970-01-01T00:00:00.000Z",
  "created_by": "10598",
  "enabled": true,
  "order": 10,
  "enabled_locations": ["account", "string"]
}
```

</details>

---

### `deleteTaxonomy`

Delete a taxonomy

`DELETE /v1/entity/taxonomies/{taxonomySlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `taxonomySlug` | path | string | Yes | Taxonomy slug |
| `permanent` | query | boolean | No | ⚠️ NOT IMPLEMENTED - If true, the taxonomy will be permanently deleted |

**Sample Call**

```bash
epilot entity deleteTaxonomy \
  -p taxonomySlug=example
```

Using positional args for path parameters:

```bash
epilot entity deleteTaxonomy example
```

With JSONata filter:

```bash
epilot entity deleteTaxonomy -p taxonomySlug=example --jsonata '$'
```

---

### `updateClassificationsForTaxonomy`

Update the classifications for a taxonomy

`POST /v1/entity/taxonomies/{taxonomySlug}/classifications`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `taxonomySlug` | path | string | Yes | Taxonomy slug |

**Request Body**

**Sample Call**

```bash
epilot entity updateClassificationsForTaxonomy \
  -p taxonomySlug=example
```

With request body:

```bash
epilot entity updateClassificationsForTaxonomy \
  -p taxonomySlug=example \
  -d '{
  "create": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "update": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "delete": ["taxonomy-slug:classification-slug", "taxonomy-slug:classification-slug"]
}'
```

Using positional args for path parameters:

```bash
epilot entity updateClassificationsForTaxonomy example
```

Using stdin pipe:

```bash
cat body.json | epilot entity updateClassificationsForTaxonomy -p taxonomySlug=example
```

With JSONata filter:

```bash
epilot entity updateClassificationsForTaxonomy -p taxonomySlug=example --jsonata 'created'
```

<details>
<summary>Sample Response</summary>

```json
{
  "created": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "updated": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "deleted": ["taxonomy-slug:classification-slug"]
}
```

</details>

---

### `createTaxonomyClassification`

Create a new classification for a taxonomy

`POST /v2/entity/taxonomies/classifications`

**Request Body**

**Sample Call**

```bash
epilot entity createTaxonomyClassification
```

With request body:

```bash
epilot entity createTaxonomyClassification \
  -d '{
  "id": "taxonomy-slug:classification-slug",
  "slug": "wallbox-pv",
  "name": "Wallbox PV",
  "parents": ["taxonomy-slug:classification-slug"],
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "archived": false,
  "starred": false,
  "enabled_locations": ["account", "string"],
  "enabled_purposes": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createTaxonomyClassification
```

With JSONata filter:

```bash
epilot entity createTaxonomyClassification --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "taxonomy-slug:classification-slug",
  "slug": "wallbox-pv",
  "name": "Wallbox PV",
  "parents": ["taxonomy-slug:classification-slug"],
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "archived": false,
  "starred": false,
  "enabled_locations": ["account", "string"],
  "enabled_purposes": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `getTaxonomyClassification`

Get a classification for a taxonomy by slug

`GET /v2/entity/taxonomies/classifications/{classificationSlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `classificationSlug` | path | string | Yes | Taxonomy Classification slug |

**Sample Call**

```bash
epilot entity getTaxonomyClassification \
  -p classificationSlug=purpose:<name>
```

Using positional args for path parameters:

```bash
epilot entity getTaxonomyClassification purpose:<name>
```

With JSONata filter:

```bash
epilot entity getTaxonomyClassification -p classificationSlug=purpose:<name> --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "taxonomy-slug:classification-slug",
  "slug": "wallbox-pv",
  "name": "Wallbox PV",
  "parents": ["taxonomy-slug:classification-slug"],
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "archived": false,
  "starred": false,
  "enabled_locations": ["account", "string"],
  "enabled_purposes": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `updateTaxonomyClassification`

Update a classification for a taxonomy

`PUT /v2/entity/taxonomies/classifications/{classificationSlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `classificationSlug` | path | string | Yes | Taxonomy Classification slug |

**Request Body**

**Sample Call**

```bash
epilot entity updateTaxonomyClassification \
  -p classificationSlug=purpose:<name>
```

With request body:

```bash
epilot entity updateTaxonomyClassification \
  -p classificationSlug=purpose:<name> \
  -d '{
  "id": "taxonomy-slug:classification-slug",
  "slug": "wallbox-pv",
  "name": "Wallbox PV",
  "parents": ["taxonomy-slug:classification-slug"],
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "archived": false,
  "starred": false,
  "enabled_locations": ["account", "string"],
  "enabled_purposes": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}'
```

Using positional args for path parameters:

```bash
epilot entity updateTaxonomyClassification purpose:<name>
```

Using stdin pipe:

```bash
cat body.json | epilot entity updateTaxonomyClassification -p classificationSlug=purpose:<name>
```

With JSONata filter:

```bash
epilot entity updateTaxonomyClassification -p classificationSlug=purpose:<name> --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "taxonomy-slug:classification-slug",
  "slug": "wallbox-pv",
  "name": "Wallbox PV",
  "parents": ["taxonomy-slug:classification-slug"],
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "archived": false,
  "starred": false,
  "enabled_locations": ["account", "string"],
  "enabled_purposes": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `deleteTaxonomyClassification`

Delete a classification for a taxonomy

`DELETE /v2/entity/taxonomies/classifications/{classificationSlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `classificationSlug` | path | string | Yes | Taxonomy Classification slug |

**Sample Call**

```bash
epilot entity deleteTaxonomyClassification \
  -p classificationSlug=purpose:<name>
```

Using positional args for path parameters:

```bash
epilot entity deleteTaxonomyClassification purpose:<name>
```

With JSONata filter:

```bash
epilot entity deleteTaxonomyClassification -p classificationSlug=purpose:<name> --jsonata 'id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "taxonomy-slug:classification-slug",
  "slug": "wallbox-pv",
  "name": "Wallbox PV",
  "parents": ["taxonomy-slug:classification-slug"],
  "color": "#FF5733",
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "archived": false,
  "starred": false,
  "enabled_locations": ["account", "string"],
  "enabled_purposes": ["string"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
}
```

</details>

---

### `taxonomyAutocomplete`

Taxonomies autocomplete

`GET /v1/entity/taxonomies/{taxonomySlug}:autocomplete`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `taxonomySlug` | path | string | Yes | Taxonomy slug |
| `query` | query | string | No | Input to autocomplete |
| `size` | query | number | No | Minimum number of results to return |

**Sample Call**

```bash
epilot entity taxonomyAutocomplete \
  -p taxonomySlug=example
```

Using positional args for path parameters:

```bash
epilot entity taxonomyAutocomplete example
```

With JSONata filter:

```bash
epilot entity taxonomyAutocomplete -p taxonomySlug=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `taxonomiesClassificationsSearch`

List taxonomy classifications in an organization based on taxonomy slug

`POST /v1/entity/taxonomies/classifications:search`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `taxonomySlug` | query | string \| string[] | No | The taxonomy slug(s) to search within. When provided with multiple taxonomy slugs, the search will be performed across all the provided taxonomies.
 |
| `query` | query | string | No | The label names to search for (lowercase insensitive) |
| `archived` | query | boolean | No | Filter by archived status. Deprecated. Use `include_archived` instead. |
| `include_archived` | query | "true" \| "false" \| "only" | No |  |

**Request Body**

**Sample Call**

```bash
epilot entity taxonomiesClassificationsSearch \
  -d '{"classificationIds":["taxonomy-slug:classification-slug",{"pattern":"taxonomy-slug:*"}]}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity taxonomiesClassificationsSearch
```

With JSONata filter:

```bash
epilot entity taxonomiesClassificationsSearch --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ],
  "hits": 10
}
```

</details>

---

### `listTaxonomyClassificationsForSchema`

List taxonomy classifications for a given schema

`GET /v1/entity/schemas/{slug}/taxonomy/{taxonomySlug}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `slug` | path | string | Yes | Entity Type |
| `taxonomySlug` | path | string | Yes | Taxonomy slug |
| `query` | query | string | No |  |
| `size` | query | number | No |  |

**Sample Call**

```bash
epilot entity listTaxonomyClassificationsForSchema \
  -p slug=contact \
  -p taxonomySlug=example
```

Using positional args for path parameters:

```bash
epilot entity listTaxonomyClassificationsForSchema contact example
```

With JSONata filter:

```bash
epilot entity listTaxonomyClassificationsForSchema -p slug=contact -p taxonomySlug=example --jsonata 'results[0]'
```

<details>
<summary>Sample Response</summary>

```json
{
  "results": [
    {
      "id": "taxonomy-slug:classification-slug",
      "slug": "wallbox-pv",
      "name": "Wallbox PV",
      "parents": ["taxonomy-slug:classification-slug"],
      "color": "#FF5733",
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "archived": false,
      "starred": false,
      "enabled_locations": ["account", "string"],
      "enabled_purposes": ["string"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"]
    }
  ]
}
```

</details>

---

### `getTaxonomyBulkActionJobs`

Gets bulk actions jobs by job status:

`GET /v1/entity/taxonomies/bulk-jobs`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `status` | query | string[] | No | The status of the jobs to return |
| `size` | query | number | No |  |
| `created_after` | query | string (date-time) | No |  |
| `sort_pending_first` | query | boolean | No |  |
| `scope` | query | "me" \| "all" | No |  |

**Sample Call**

```bash
epilot entity getTaxonomyBulkActionJobs
```

With JSONata filter:

```bash
epilot entity getTaxonomyBulkActionJobs --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
[
  {
    "job_id": "123e4567-e89b-12d3-a456-426614174000",
    "status": "PENDING",
    "action_type": "MOVE_CLASSIFICATIONS",
    "created_by": "10598",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "org": "66"
  }
]
```

</details>

---

### `getTaxonomyBulkActionJobById`

Gets a bulk action job by job id

`GET /v1/entity/taxonomies/bulk-jobs/{job_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes |  |

**Sample Call**

```bash
epilot entity getTaxonomyBulkActionJobById \
  -p job_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity getTaxonomyBulkActionJobById 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity getTaxonomyBulkActionJobById -p job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PENDING",
  "action_type": "MOVE_CLASSIFICATIONS",
  "created_by": "10598",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "org": "66"
}
```

</details>

---

### `cancelBulkAction`

Cancels a running bulk action job. The job status will be updated to CANCELLED

`POST /v1/entity/taxonomies/bulk-jobs/{job_id}/cancel`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `job_id` | path | string | Yes | Job ID of the bulk operation to cancel |

**Sample Call**

```bash
epilot entity cancelBulkAction \
  -p job_id=123e4567-e89b-12d3-a456-426614174000
```

Using positional args for path parameters:

```bash
epilot entity cancelBulkAction 123e4567-e89b-12d3-a456-426614174000
```

With JSONata filter:

```bash
epilot entity cancelBulkAction -p job_id=123e4567-e89b-12d3-a456-426614174000 --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "123e4567-e89b-12d3-a456-426614174000",
  "status": "PENDING",
  "action_type": "MOVE_CLASSIFICATIONS",
  "created_by": "10598",
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z",
  "org": "66"
}
```

</details>

---

### `bulkMoveClassifications`

Moves classifications from one taxonomy to another, through a bulk async operation which

`POST /v1/entity/taxonomies/classifications:move`

**Request Body**

**Sample Call**

```bash
epilot entity bulkMoveClassifications \
  -d '{"job_id":"string","target_taxonomy":"purpose","classification_ids":["taxonomy-slug:classification-slug"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity bulkMoveClassifications
```

With JSONata filter:

```bash
epilot entity bulkMoveClassifications --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "PENDING"
}
```

</details>

---

### `bulkMergeClassifications`

Merges classifications from one taxonomy into one individual classification, through a bulk async operation which

`POST /v1/entity/taxonomies/classifications:merge`

**Request Body**

**Sample Call**

```bash
epilot entity bulkMergeClassifications \
  -d '{"job_id":"string","target_classification":"purpose","classification_ids":["taxonomy-slug:classification-slug"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity bulkMergeClassifications
```

With JSONata filter:

```bash
epilot entity bulkMergeClassifications --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "PENDING"
}
```

</details>

---

### `bulkDeleteClassifications`

Permanently deletes taxonomy classifications. The classifications are deleted through a bulk

`POST /v1/entity/taxonomies/classifications:delete`

**Request Body**

**Sample Call**

```bash
epilot entity bulkDeleteClassifications \
  -d '{"job_id":"string","classification_ids":["taxonomy-slug:classification-slug"]}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity bulkDeleteClassifications
```

With JSONata filter:

```bash
epilot entity bulkDeleteClassifications --jsonata 'job_id'
```

<details>
<summary>Sample Response</summary>

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "PENDING"
}
```

</details>

---

### `createSchemaAttribute`

Create a schema attribute

`POST /v1/entity/schemas/attributes`

**Request Body**

**Sample Call**

```bash
epilot entity createSchemaAttribute
```

With request body:

```bash
epilot entity createSchemaAttribute \
  -d '{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "string",
  "label": "string",
  "placeholder": "string",
  "hidden": false,
  "show_in_table": true,
  "sortable": true,
  "required": false,
  "readonly": false,
  "deprecated": false,
  "default_value": {},
  "group": "string",
  "order": 0,
  "layout": "full_width",
  "hide_label": true,
  "icon": "string",
  "render_condition": "string",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "constraints": {
    "disablePast": true
  },
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "value_formatter": "string",
  "preview_value_formatter": "string",
  "entity_builder_disable_edit": false,
  "protected": true,
  "info_helpers": {
    "hint_text": "string",
    "hint_text_key": "string",
    "hint_custom_component": "string",
    "hint_tooltip_placement": "top"
  },
  "explicit_searchable": false,
  "exclude_from_search": false,
  "repeatable": true,
  "has_primary": true,
  "type": "string",
  "multiline": true,
  "rich_text": true,
  "rows": 3
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createSchemaAttribute
```

With JSONata filter:

```bash
epilot entity createSchemaAttribute --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "string",
  "label": "string",
  "placeholder": "string",
  "hidden": false,
  "show_in_table": true,
  "sortable": true,
  "required": false,
  "readonly": false,
  "deprecated": false,
  "default_value": {},
  "group": "string",
  "order": 0,
  "layout": "full_width",
  "hide_label": true,
  "icon": "string",
  "render_condition": "string",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "constraints": {
    "disablePast": true
  },
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "value_formatter": "string",
  "preview_value_formatter": "string",
  "entity_builder_disable_edit": false,
  "protected": true,
  "info_helpers": {
    "hint_text": "string",
    "hint_text_key": "string",
    "hint_custom_component": "string",
    "hint_tooltip_placement": "top"
  },
  "explicit_searchable": false,
  "exclude_from_search": false,
  "repeatable": true,
  "has_primary": true,
  "type": "string",
  "multiline": true,
  "rich_text": true,
  "rows": 3
}
```

</details>

---

### `getSchemaAttribute`

Get a schema attribute from given attribute ID

`GET /v1/entity/schemas/attributes/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Attribute ID |

**Sample Call**

```bash
epilot entity getSchemaAttribute \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity getSchemaAttribute contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity getSchemaAttribute -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "string",
  "label": "string",
  "placeholder": "string",
  "hidden": false,
  "show_in_table": true,
  "sortable": true,
  "required": false,
  "readonly": false,
  "deprecated": false,
  "default_value": {},
  "group": "string",
  "order": 0,
  "layout": "full_width",
  "hide_label": true,
  "icon": "string",
  "render_condition": "string",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "constraints": {
    "disablePast": true
  },
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "value_formatter": "string",
  "preview_value_formatter": "string",
  "entity_builder_disable_edit": false,
  "protected": true,
  "info_helpers": {
    "hint_text": "string",
    "hint_text_key": "string",
    "hint_custom_component": "string",
    "hint_tooltip_placement": "top"
  },
  "explicit_searchable": false,
  "exclude_from_search": false,
  "repeatable": true,
  "has_primary": true,
  "type": "string",
  "multiline": true,
  "rich_text": true,
  "rows": 3
}
```

</details>

---

### `putSchemaAttribute`

Updates an attribute in the schema

`PUT /v1/entity/schemas/attributes/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Attribute ID |

**Request Body**

**Sample Call**

```bash
epilot entity putSchemaAttribute \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With request body:

```bash
epilot entity putSchemaAttribute \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d \
  -d '{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "string",
  "label": "string",
  "placeholder": "string",
  "hidden": false,
  "show_in_table": true,
  "sortable": true,
  "required": false,
  "readonly": false,
  "deprecated": false,
  "default_value": {},
  "group": "string",
  "order": 0,
  "layout": "full_width",
  "hide_label": true,
  "icon": "string",
  "render_condition": "string",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "constraints": {
    "disablePast": true
  },
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "value_formatter": "string",
  "preview_value_formatter": "string",
  "entity_builder_disable_edit": false,
  "protected": true,
  "info_helpers": {
    "hint_text": "string",
    "hint_text_key": "string",
    "hint_custom_component": "string",
    "hint_tooltip_placement": "top"
  },
  "explicit_searchable": false,
  "exclude_from_search": false,
  "repeatable": true,
  "has_primary": true,
  "type": "string",
  "multiline": true,
  "rich_text": true,
  "rows": 3
}'
```

Using positional args for path parameters:

```bash
epilot entity putSchemaAttribute contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using stdin pipe:

```bash
cat body.json | epilot entity putSchemaAttribute -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity putSchemaAttribute -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "string",
  "label": "string",
  "placeholder": "string",
  "hidden": false,
  "show_in_table": true,
  "sortable": true,
  "required": false,
  "readonly": false,
  "deprecated": false,
  "default_value": {},
  "group": "string",
  "order": 0,
  "layout": "full_width",
  "hide_label": true,
  "icon": "string",
  "render_condition": "string",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "constraints": {
    "disablePast": true
  },
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "value_formatter": "string",
  "preview_value_formatter": "string",
  "entity_builder_disable_edit": false,
  "protected": true,
  "info_helpers": {
    "hint_text": "string",
    "hint_text_key": "string",
    "hint_custom_component": "string",
    "hint_tooltip_placement": "top"
  },
  "explicit_searchable": false,
  "exclude_from_search": false,
  "repeatable": true,
  "has_primary": true,
  "type": "string",
  "multiline": true,
  "rich_text": true,
  "rows": 3
}
```

</details>

---

### `deleteSchemaAttribute`

Deletes an attribute from a schema

`DELETE /v1/entity/schemas/attributes/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Attribute ID |

**Sample Call**

```bash
epilot entity deleteSchemaAttribute \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity deleteSchemaAttribute contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity deleteSchemaAttribute -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "string",
  "label": "string",
  "placeholder": "string",
  "hidden": false,
  "show_in_table": true,
  "sortable": true,
  "required": false,
  "readonly": false,
  "deprecated": false,
  "default_value": {},
  "group": "string",
  "order": 0,
  "layout": "full_width",
  "hide_label": true,
  "icon": "string",
  "render_condition": "string",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "constraints": {
    "disablePast": true
  },
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "value_formatter": "string",
  "preview_value_formatter": "string",
  "entity_builder_disable_edit": false,
  "protected": true,
  "info_helpers": {
    "hint_text": "string",
    "hint_text_key": "string",
    "hint_custom_component": "string",
    "hint_tooltip_placement": "top"
  },
  "explicit_searchable": false,
  "exclude_from_search": false,
  "repeatable": true,
  "has_primary": true,
  "type": "string",
  "multiline": true,
  "rich_text": true,
  "rows": 3
}
```

</details>

---

### `createSchemaCapability`

Create a schema capability

`POST /v1/entity/schemas/capabilities`

**Request Body**

**Sample Call**

```bash
epilot entity createSchemaCapability
```

With request body:

```bash
epilot entity createSchemaCapability \
  -d '{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "customer_messaging",
  "title": "Messaging",
  "attributes": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "string",
      "multiline": true,
      "rich_text": true,
      "rows": 3
    },
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "link"
    }
  ],
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "app_id": "123e4567-e89b-12d3-a456-426614174000",
  "ui_config": {
    "is_filterable": true
  },
  "ui_hooks": [
    {
      "hook": "EntityDetailsV2:Tab",
      "render_condition": "_is_composite_price = \"false\"",
      "order": 10,
      "title": "Notes",
      "group_expanded": true,
      "import": "@epilot360/notes",
      "component": "PricingItems",
      "route": "notes",
      "icon": "email",
      "disabled": true,
      "header": true,
      "requiredPermission": {}
    }
  ],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "schemas": [
    {
      "schema": "contact"
    }
  ],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createSchemaCapability
```

With JSONata filter:

```bash
epilot entity createSchemaCapability --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "customer_messaging",
  "title": "Messaging",
  "attributes": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "string",
      "multiline": true,
      "rich_text": true,
      "rows": 3
    },
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "link"
    }
  ],
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "app_id": "123e4567-e89b-12d3-a456-426614174000",
  "ui_config": {
    "is_filterable": true
  },
  "ui_hooks": [
    {
      "hook": "EntityDetailsV2:Tab",
      "render_condition": "_is_composite_price = \"false\"",
      "order": 10,
      "title": "Notes",
      "group_expanded": true,
      "import": "@epilot360/notes",
      "component": "PricingItems",
      "route": "notes",
      "icon": "email",
      "disabled": true,
      "header": true,
      "requiredPermission": {}
    }
  ],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "schemas": [
    {
      "schema": "contact"
    }
  ],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `getSchemaCapability`

Get a schema capability from given capability ID

`GET /v1/entity/schemas/capabilities/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Attribute ID |

**Sample Call**

```bash
epilot entity getSchemaCapability \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity getSchemaCapability contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity getSchemaCapability -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "customer_messaging",
  "title": "Messaging",
  "attributes": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "string",
      "multiline": true,
      "rich_text": true,
      "rows": 3
    },
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "link"
    }
  ],
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "app_id": "123e4567-e89b-12d3-a456-426614174000",
  "ui_config": {
    "is_filterable": true
  },
  "ui_hooks": [
    {
      "hook": "EntityDetailsV2:Tab",
      "render_condition": "_is_composite_price = \"false\"",
      "order": 10,
      "title": "Notes",
      "group_expanded": true,
      "import": "@epilot360/notes",
      "component": "PricingItems",
      "route": "notes",
      "icon": "email",
      "disabled": true,
      "header": true,
      "requiredPermission": {}
    }
  ],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "schemas": [
    {
      "schema": "contact"
    }
  ],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `putSchemaCapability`

Adds or updates an capability in the schema

`PUT /v1/entity/schemas/capabilities/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Attribute ID |

**Request Body**

**Sample Call**

```bash
epilot entity putSchemaCapability \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With request body:

```bash
epilot entity putSchemaCapability \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d \
  -d '{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "customer_messaging",
  "title": "Messaging",
  "attributes": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "string",
      "multiline": true,
      "rich_text": true,
      "rows": 3
    },
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "link"
    }
  ],
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "app_id": "123e4567-e89b-12d3-a456-426614174000",
  "ui_config": {
    "is_filterable": true
  },
  "ui_hooks": [
    {
      "hook": "EntityDetailsV2:Tab",
      "render_condition": "_is_composite_price = \"false\"",
      "order": 10,
      "title": "Notes",
      "group_expanded": true,
      "import": "@epilot360/notes",
      "component": "PricingItems",
      "route": "notes",
      "icon": "email",
      "disabled": true,
      "header": true,
      "requiredPermission": {}
    }
  ],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "schemas": [
    {
      "schema": "contact"
    }
  ],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}'
```

Using positional args for path parameters:

```bash
epilot entity putSchemaCapability contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using stdin pipe:

```bash
cat body.json | epilot entity putSchemaCapability -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity putSchemaCapability -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "customer_messaging",
  "title": "Messaging",
  "attributes": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "string",
      "multiline": true,
      "rich_text": true,
      "rows": 3
    },
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "link"
    }
  ],
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "app_id": "123e4567-e89b-12d3-a456-426614174000",
  "ui_config": {
    "is_filterable": true
  },
  "ui_hooks": [
    {
      "hook": "EntityDetailsV2:Tab",
      "render_condition": "_is_composite_price = \"false\"",
      "order": 10,
      "title": "Notes",
      "group_expanded": true,
      "import": "@epilot360/notes",
      "component": "PricingItems",
      "route": "notes",
      "icon": "email",
      "disabled": true,
      "header": true,
      "requiredPermission": {}
    }
  ],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "schemas": [
    {
      "schema": "contact"
    }
  ],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `deleteSchemaCapability`

Deletes a Capability from a schema

`DELETE /v1/entity/schemas/capabilities/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Attribute ID |

**Sample Call**

```bash
epilot entity deleteSchemaCapability \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity deleteSchemaCapability contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity deleteSchemaCapability -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
  "name": "customer_messaging",
  "title": "Messaging",
  "attributes": [
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "string",
      "multiline": true,
      "rich_text": true,
      "rows": 3
    },
    {
      "id": "d5839b94-ba20-4225-a78e-76951d352bd6",
      "name": "string",
      "label": "string",
      "placeholder": "string",
      "hidden": false,
      "show_in_table": true,
      "sortable": true,
      "required": false,
      "readonly": false,
      "deprecated": false,
      "default_value": {},
      "group": "string",
      "order": 0,
      "layout": "full_width",
      "hide_label": true,
      "icon": "string",
      "render_condition": "string",
      "_purpose": ["taxonomy-slug:classification-slug"],
      "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
      "constraints": {},
      "feature_flag": "FF_MY_FEATURE_FLAG",
      "settings_flag": [],
      "value_formatter": "string",
      "preview_value_formatter": "string",
      "entity_builder_disable_edit": false,
      "protected": true,
      "info_helpers": {},
      "explicit_searchable": false,
      "exclude_from_search": false,
      "repeatable": true,
      "has_primary": true,
      "type": "link"
    }
  ],
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "app_id": "123e4567-e89b-12d3-a456-426614174000",
  "ui_config": {
    "is_filterable": true
  },
  "ui_hooks": [
    {
      "hook": "EntityDetailsV2:Tab",
      "render_condition": "_is_composite_price = \"false\"",
      "order": 10,
      "title": "Notes",
      "group_expanded": true,
      "import": "@epilot360/notes",
      "component": "PricingItems",
      "route": "notes",
      "icon": "email",
      "disabled": true,
      "header": true,
      "requiredPermission": {}
    }
  ],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "schemas": [
    {
      "schema": "contact"
    }
  ],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `createSchemaGroup`

Create a schema group

`POST /v1/entity/schemas/group`

**Request Body**

**Sample Call**

```bash
epilot entity createSchemaGroup
```

With request body:

```bash
epilot entity createSchemaGroup \
  -d '{
  "label": "Contact Details",
  "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "order": 0,
  "expanded": false,
  "render_condition": "_is_composite_price = \"false\"",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "info_tooltip_title": {
    "key": "string",
    "default": "string"
  },
  "composite_id": "contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "schema": "contact"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createSchemaGroup
```

With JSONata filter:

```bash
epilot entity createSchemaGroup --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "label": "Contact Details",
  "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "order": 0,
  "expanded": false,
  "render_condition": "_is_composite_price = \"false\"",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "info_tooltip_title": {
    "key": "string",
    "default": "string"
  },
  "composite_id": "contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "schema": "contact"
}
```

</details>

---

### `getSchemaGroup`

Get a schema group from given group composite ID

`GET /v1/entity/schemas/group/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Group ID |

**Sample Call**

```bash
epilot entity getSchemaGroup \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity getSchemaGroup contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity getSchemaGroup -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "label": "Contact Details",
  "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "order": 0,
  "expanded": false,
  "render_condition": "_is_composite_price = \"false\"",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "info_tooltip_title": {
    "key": "string",
    "default": "string"
  },
  "composite_id": "contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "schema": "contact"
}
```

</details>

---

### `putSchemaGroup`

Adds or updates an capability in the schema

`PUT /v1/entity/schemas/group/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Group ID |

**Request Body**

**Sample Call**

```bash
epilot entity putSchemaGroup \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With request body:

```bash
epilot entity putSchemaGroup \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d \
  -d '{
  "label": "Contact Details",
  "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "order": 0,
  "expanded": false,
  "render_condition": "_is_composite_price = \"false\"",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "info_tooltip_title": {
    "key": "string",
    "default": "string"
  },
  "composite_id": "contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "schema": "contact"
}'
```

Using positional args for path parameters:

```bash
epilot entity putSchemaGroup contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using stdin pipe:

```bash
cat body.json | epilot entity putSchemaGroup -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity putSchemaGroup -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "label": "Contact Details",
  "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "order": 0,
  "expanded": false,
  "render_condition": "_is_composite_price = \"false\"",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "info_tooltip_title": {
    "key": "string",
    "default": "string"
  },
  "composite_id": "contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "schema": "contact"
}
```

</details>

---

### `deleteSchemaGroup`

Deletes a Capability from a schema

`DELETE /v1/entity/schemas/group/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Group ID |

**Sample Call**

```bash
epilot entity deleteSchemaGroup \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity deleteSchemaGroup contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity deleteSchemaGroup -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "label": "Contact Details",
  "id": "e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "order": 0,
  "expanded": false,
  "render_condition": "_is_composite_price = \"false\"",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "feature_flag": "FF_MY_FEATURE_FLAG",
  "settings_flag": [
    {
      "name": "string",
      "enabled": true
    }
  ],
  "info_tooltip_title": {
    "key": "string",
    "default": "string"
  },
  "composite_id": "contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14",
  "schema": "contact"
}
```

</details>

---

### `createSchemaGroupHeadline`

Create a headline in a schema group

`POST /v1/entity/schemas/headline`

**Request Body**

**Sample Call**

```bash
epilot entity createSchemaGroupHeadline
```

With request body:

```bash
epilot entity createSchemaGroupHeadline \
  -d '{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "label": "string",
  "layout": "string",
  "group": "string",
  "order": 0,
  "type": "headline",
  "enable_divider": false,
  "divider": "top_divider",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}'
```

Using stdin pipe:

```bash
cat body.json | epilot entity createSchemaGroupHeadline
```

With JSONata filter:

```bash
epilot entity createSchemaGroupHeadline --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "label": "string",
  "layout": "string",
  "group": "string",
  "order": 0,
  "type": "headline",
  "enable_divider": false,
  "divider": "top_divider",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `getSchemaGroupHeadline`

Get a group headline from schema from given headline composite ID

`GET /v1/entity/schemas/headline/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Schema Group ID |

**Sample Call**

```bash
epilot entity getSchemaGroupHeadline \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity getSchemaGroupHeadline contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity getSchemaGroupHeadline -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "label": "string",
  "layout": "string",
  "group": "string",
  "order": 0,
  "type": "headline",
  "enable_divider": false,
  "divider": "top_divider",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `putSchemaGroupHeadline`

Adds or updates a group headline in the schema

`PUT /v1/entity/schemas/headline/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Schema Group ID |

**Request Body**

**Sample Call**

```bash
epilot entity putSchemaGroupHeadline \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With request body:

```bash
epilot entity putSchemaGroupHeadline \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d \
  -d '{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "label": "string",
  "layout": "string",
  "group": "string",
  "order": 0,
  "type": "headline",
  "enable_divider": false,
  "divider": "top_divider",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}'
```

Using positional args for path parameters:

```bash
epilot entity putSchemaGroupHeadline contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using stdin pipe:

```bash
cat body.json | epilot entity putSchemaGroupHeadline -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity putSchemaGroupHeadline -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "label": "string",
  "layout": "string",
  "group": "string",
  "order": 0,
  "type": "headline",
  "enable_divider": false,
  "divider": "top_divider",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `deleteSchemaGroupHeadline`

Deletes a group headline from a schema

`DELETE /v1/entity/schemas/headline/{composite_id}`

**Parameters**

| Name | In | Type | Required | Description |
| ---- | -- | ---- | -------- | ----------- |
| `composite_id` | path | string | Yes | Schema Slug and the Schema Group ID |

**Sample Call**

```bash
epilot entity deleteSchemaGroupHeadline \
  -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

Using positional args for path parameters:

```bash
epilot entity deleteSchemaGroupHeadline contact:97644baa-083f-4e49-9188-fcff2ecaad7d
```

With JSONata filter:

```bash
epilot entity deleteSchemaGroupHeadline -p composite_id=contact:97644baa-083f-4e49-9188-fcff2ecaad7d --jsonata '$'
```

<details>
<summary>Sample Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "label": "string",
  "layout": "string",
  "group": "string",
  "order": 0,
  "type": "headline",
  "enable_divider": false,
  "divider": "top_divider",
  "_purpose": ["taxonomy-slug:classification-slug"],
  "_manifest": ["123e4567-e89b-12d3-a456-426614174000"],
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---
