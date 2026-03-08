# Entity API

- **Base URL:** `https://entity.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/entity](https://docs.epilot.io/api/entity)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.entity.listSchemas(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/entity'

const entityClient = getClient()
authorize(entityClient, () => '<token>')
const { data } = await entityClient.listSchemas(...)
```

## Operations

**Schemas**
- [`listSchemas`](#listschemas)
- [`getSchema`](#getschema)
- [`putSchema`](#putschema)
- [`deleteSchema`](#deleteschema)
- [`getJsonSchema`](#getjsonschema)
- [`getSchemaExample`](#getschemaexample)
- [`getSchemaVersions`](#getschemaversions)
- [`listAvailableCapabilities`](#listavailablecapabilities)
- [`listSchemaBlueprints`](#listschemablueprints)
- [`listTaxonomyClassificationsForSchema`](#listtaxonomyclassificationsforschema)
- [`createSchemaAttribute`](#createschemaattribute)
- [`getSchemaAttribute`](#getschemaattribute)
- [`putSchemaAttribute`](#putschemaattribute)
- [`deleteSchemaAttribute`](#deleteschemaattribute)
- [`createSchemaCapability`](#createschemacapability)
- [`getSchemaCapability`](#getschemacapability)
- [`putSchemaCapability`](#putschemacapability)
- [`deleteSchemaCapability`](#deleteschemacapability)
- [`createSchemaGroup`](#createschemagroup)
- [`getSchemaGroup`](#getschemagroup)
- [`putSchemaGroup`](#putschemagroup)
- [`deleteSchemaGroup`](#deleteschemagroup)
- [`createSchemaGroupHeadline`](#createschemagroupheadline)
- [`getSchemaGroupHeadline`](#getschemagroupheadline)
- [`putSchemaGroupHeadline`](#putschemagroupheadline)
- [`deleteSchemaGroupHeadline`](#deleteschemagroupheadline)

**Entities**
- [`searchEntities`](#searchentities)
- [`listEntities`](#listentities)
- [`queryEntityGraph`](#queryentitygraph)
- [`createEntity`](#createentity)
- [`validateEntity`](#validateentity)
- [`validateEntityV2`](#validateentityv2)
- [`upsertEntity`](#upsertentity)
- [`getEntityV2`](#getentityv2)
- [`restoreEntity`](#restoreentity)
- [`reindexEntity`](#reindexentity)
- [`getEntity`](#getentity)
- [`updateEntity`](#updateentity)
- [`patchEntity`](#patchentity)
- [`deleteEntity`](#deleteentity)
- [`autocomplete`](#autocomplete)
- [`wipeAllEntities`](#wipeallentities)

**Activity**
- [`createActivity`](#createactivity)
- [`getActivity`](#getactivity)
- [`attachActivity`](#attachactivity)
- [`getEntityActivityFeed`](#getentityactivityfeed)

**Relations**
- [`getRelations`](#getrelations)
- [`addRelations`](#addrelations)
- [`removeRelations`](#removerelations)
- [`getRelationsV2`](#getrelationsv2)
- [`getRelationsV3`](#getrelationsv3)
- [`getRelatedEntitiesCount`](#getrelatedentitiescount)
- [`updateRelation`](#updaterelation)
- [`deleteRelation`](#deleterelation)

**Import-Export**
- [`exportEntities`](#exportentities)
- [`importEntities`](#importentities)

**Saved Views**
- [`listSavedViews`](#listsavedviews)
- [`createSavedView`](#createsavedview)
- [`getSavedView`](#getsavedview)
- [`updateSavedView`](#updatesavedview)
- [`patchSavedView`](#patchsavedview)
- [`deleteSavedView`](#deletesavedview)
- [`listFavoriteViewsForUser`](#listfavoriteviewsforuser)

**Taxonomy**
- [`listTaxonomies`](#listtaxonomies)
- [`createTaxonomy`](#createtaxonomy)
- [`getTaxonomy`](#gettaxonomy)
- [`updateTaxonomy`](#updatetaxonomy)
- [`deleteTaxonomy`](#deletetaxonomy)
- [`updateClassificationsForTaxonomy`](#updateclassificationsfortaxonomy)
- [`createTaxonomyClassification`](#createtaxonomyclassification)
- [`getTaxonomyClassification`](#gettaxonomyclassification)
- [`updateTaxonomyClassification`](#updatetaxonomyclassification)
- [`deleteTaxonomyClassification`](#deletetaxonomyclassification)
- [`taxonomyAutocomplete`](#taxonomyautocomplete)
- [`taxonomiesClassificationsSearch`](#taxonomiesclassificationssearch)
- [`getTaxonomyBulkActionJobs`](#gettaxonomybulkactionjobs)
- [`getTaxonomyBulkActionJobById`](#gettaxonomybulkactionjobbyid)
- [`cancelBulkAction`](#cancelbulkaction)
- [`bulkMoveClassifications`](#bulkmoveclassifications)
- [`bulkMergeClassifications`](#bulkmergeclassifications)
- [`bulkDeleteClassifications`](#bulkdeleteclassifications)

**Schemas**
- [`ExportJobId`](#exportjobid)
- [`Language`](#language)
- [`IsTemplate`](#istemplate)
- [`SchemaId`](#schemaid)
- [`EntitySchema`](#entityschema)
- [`EntitySchemaItem`](#entityschemaitem)
- [`GenerateEntityTableAIFiltersRequest`](#generateentitytableaifiltersrequest)
- [`GenerateEntityTableAIFiltersResponse`](#generateentitytableaifiltersresponse)
- [`EntityTableFilterSearch`](#entitytablefiltersearch)
- [`EntityTableFilterOption`](#entitytablefilteroption)
- [`EntitySchemaGroup`](#entityschemagroup)
- [`EntitySchemaGroupWithCompositeID`](#entityschemagroupwithcompositeid)
- [`Attribute`](#attribute)
- [`AttributeWithCompositeID`](#attributewithcompositeid)
- [`BaseAttribute`](#baseattribute)
- [`TextAttribute`](#textattribute)
- [`LinkAttribute`](#linkattribute)
- [`InternalAttribute`](#internalattribute)
- [`BooleanAttribute`](#booleanattribute)
- [`DateAttribute`](#dateattribute)
- [`CountryAttribute`](#countryattribute)
- [`SelectAttribute`](#selectattribute)
- [`MultiSelectAttribute`](#multiselectattribute)
- [`StatusAttribute`](#statusattribute)
- [`SequenceAttribute`](#sequenceattribute)
- [`FileAttribute`](#fileattribute)
- [`CurrencyAttribute`](#currencyattribute)
- [`SummaryField`](#summaryfield)
- [`EntityAction`](#entityaction)
- [`RelationAttribute`](#relationattribute)
- [`UserRelationAttribute`](#userrelationattribute)
- [`PartnerOrganisationAttribute`](#partnerorganisationattribute)
- [`PortalAccessAttribute`](#portalaccessattribute)
- [`DefaultAddressFields`](#defaultaddressfields)
- [`AddressAttribute`](#addressattribute)
- [`AddressRelationAttribute`](#addressrelationattribute)
- [`PaymentMethodRelationAttribute`](#paymentmethodrelationattribute)
- [`InvitationEmailAttribute`](#invitationemailattribute)
- [`AutomationAttribute`](#automationattribute)
- [`InternalUserAttribute`](#internaluserattribute)
- [`PurposeAttribute`](#purposeattribute)
- [`RepeatableAttribute`](#repeatableattribute)
- [`TagsAttribute`](#tagsattribute)
- [`MessageEmailAddressAttribute`](#messageemailaddressattribute)
- [`NumberAttribute`](#numberattribute)
- [`ConsentAttribute`](#consentattribute)
- [`OrderedListAttribute`](#orderedlistattribute)
- [`EmailAttribute`](#emailattribute)
- [`PhoneAttribute`](#phoneattribute)
- [`PaymentAttribute`](#paymentattribute)
- [`PriceComponentAttribute`](#pricecomponentattribute)
- [`ComputedAttribute`](#computedattribute)
- [`PartnerStatusAttribute`](#partnerstatusattribute)
- [`SummaryAttribute`](#summaryattribute)
- [`GroupHeadline`](#groupheadline)
- [`GroupHeadlineWithCompositeID`](#groupheadlinewithcompositeid)
- [`EntitySlug`](#entityslug)
- [`EntityCapability`](#entitycapability)
- [`EntityCapabilityWithCompositeID`](#entitycapabilitywithcompositeid)
- [`EntityViewDisabled`](#entityviewdisabled)
- [`EntityDefaultTable`](#entitydefaulttable)
- [`EntityDefaultCreate`](#entitydefaultcreate)
- [`EntityDefaultEdit`](#entitydefaultedit)
- [`RedirectEntityView`](#redirectentityview)
- [`EntityId`](#entityid)
- [`BaseEntity`](#baseentity)
- [`Entity`](#entity)
- [`NullableEntity`](#nullableentity)
- [`EntityOwner`](#entityowner)
- [`EntityAcl`](#entityacl)
- [`HydratedEntity`](#hydratedentity)
- [`EntityItem`](#entityitem)
- [`EntityValidationError`](#entityvalidationerror)
- [`EntityValidationResultSuccess`](#entityvalidationresultsuccess)
- [`EntityValidationResultError`](#entityvalidationresulterror)
- [`EntityValidationResult`](#entityvalidationresult)
- [`EntityValidationV2Error`](#entityvalidationv2error)
- [`EntityValidationV2ResultSuccess`](#entityvalidationv2resultsuccess)
- [`EntityValidationV2ResultError`](#entityvalidationv2resulterror)
- [`EntityValidationV2Result`](#entityvalidationv2result)
- [`HydratedEntityItem`](#hydratedentityitem)
- [`GetRelationsResp`](#getrelationsresp)
- [`GetRelationsRespWithPagination`](#getrelationsrespwithpagination)
- [`GetRelatedEntitiesCount`](#getrelatedentitiescount)
- [`RelationEntity`](#relationentity)
- [`RelationItem`](#relationitem)
- [`EntitySearchIncludeDeletedParam`](#entitysearchincludedeletedparam)
- [`EntitySearchParams`](#entitysearchparams)
- [`EntityListParams`](#entitylistparams)
- [`SearchFilter`](#searchfilter)
- [`SearchFilterValue`](#searchfiltervalue)
- [`EntitySearchOptions`](#entitysearchoptions)
- [`FieldsParam`](#fieldsparam)
- [`EntityImportParams`](#entityimportparams)
- [`GraphQueryRequest`](#graphqueryrequest)
- [`GraphSeed`](#graphseed)
- [`GraphDefinition`](#graphdefinition)
- [`GraphNode`](#graphnode)
- [`GraphEdge`](#graphedge)
- [`GraphQueryResponse`](#graphqueryresponse)
- [`EntitySearchResults`](#entitysearchresults)
- [`SearchMappings`](#searchmappings)
- [`ActivityId`](#activityid)
- [`ActivityCallerContext`](#activitycallercontext)
- [`ActivityType`](#activitytype)
- [`Activity`](#activity)
- [`EntityOperation`](#entityoperation)
- [`BaseActivityItem`](#baseactivityitem)
- [`ActivityItem`](#activityitem)
- [`BlueprintEntityId`](#blueprintentityid)
- [`ListSavedViewsResults`](#listsavedviewsresults)
- [`SavedViewId`](#savedviewid)
- [`SavedViewItem`](#savedviewitem)
- [`SavedViewPartial`](#savedviewpartial)
- [`SavedView`](#savedview)
- [`Taxonomy`](#taxonomy)
- [`TaxonomyLocationId`](#taxonomylocationid)
- [`TaxonomySearchIncludeArchivedParam`](#taxonomysearchincludearchivedparam)
- [`TaxonomyClassification`](#taxonomyclassification)
- [`ClassificationId`](#classificationid)
- [`ClassificationIdOrPattern`](#classificationidorpattern)
- [`ClassificationSlug`](#classificationslug)
- [`TaxonomySlug`](#taxonomyslug)
- [`ClassificationsUpdate`](#classificationsupdate)
- [`TaxonomyBulkJobTriggerResponse`](#taxonomybulkjobtriggerresponse)
- [`TaxonomyBulkJobStatus`](#taxonomybulkjobstatus)
- [`TaxonomyBulkJobActionType`](#taxonomybulkjobactiontype)
- [`TaxonomyBulkJob`](#taxonomybulkjob)
- [`ESClusterAssignment`](#esclusterassignment)
- [`SettingFlag`](#settingflag)
- [`ErrorObject`](#errorobject)

### `listSchemas`

Get the latest versions of all schemas

`GET /v1/entity/schemas`

```ts
const { data } = await client.listSchemas({
  unpublished: true,
  exclude: ['...'],
})
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
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

By default gets the latest version of the Schema and to get the specific version of schema pass the id.

`GET /v1/entity/schemas/{slug}`

```ts
const { data } = await client.getSchema({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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
      "settings_flag": []
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

Create or update a schema with a new version

`PUT /v1/entity/schemas/{slug}`

```ts
const { data } = await client.putSchema(
  {
    slug: 'example',
    draft: true,
  },
  {
    slug: 'contact',
    version: 1,
    blueprint: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    feature_flag: 'FF_MY_FEATURE_FLAG',
    enable_setting: ['360_features'],
    name: 'Contact',
    plural: 'Contacts',
    description: 'Example description',
    docs_url: 'https://docs.epilot.io/docs/pricing/entities',
    category: 'customer_relations',
    published: false,
    draft: false,
    icon: 'person',
    title_template: '{{first_name}} {{last_name}}',
    ui_config: {
      table_view: {
        view_type: 'default',
        row_actions: ['string'],
        bulk_actions: ['string'],
        navbar_actions: [ /* ... */ ],
        enable_thumbnails: false
      },
      create_view: {
        view_type: 'default',
        search_params: {}
      },
      edit_view: {
        view_type: 'default',
        search_params: {},
        summary_attributes: ['email']
      },
      single_view: {
        view_type: 'default',
        search_params: {},
        summary_attributes: ['email']
      },
      list_item: {
        summary_attributes: [ /* ... */ ],
        quick_actions: [ /* ... */ ],
        ui_config: { /* ... */ }
      },
      sharing: {
        show_sharing_button: true
      }
    },
    capabilities: [
      {
        id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
        name: 'customer_messaging',
        title: 'Messaging',
        attributes: [ /* ... */ ],
        _purpose: ['taxonomy-slug:classification-slug'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
        app_id: '123e4567-e89b-12d3-a456-426614174000',
        ui_config: { /* ... */ },
        ui_hooks: [ /* ... */ ],
        feature_flag: 'FF_MY_FEATURE_FLAG',
        settings_flag: [ /* ... */ ]
      }
    ],
    group_settings: [
      {
        id: 'e18a532b-ae79-4d86-a6a5-e5dbfb579d14',
        label: 'Contact Details',
        expanded: true,
        order: 1
      },
      {
        id: 'e9a1ae28-27ba-4fa0-a79c-e279cc5c4a6e',
        label: 'Address Details',
        expanded: false,
        order: 2,
        info_tooltip_title: { /* ... */ }
      }
    ],
    layout_settings: {
      grid_gap: 'string',
      grid_template_columns: 'string'
    },
    dialog_config: {},
    attributes: [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true
      },
      {
        name: 'first_name',
        type: 'string',
        label: 'First Name'
      },
      /* ... 5 more */
    ],
    _purpose: ['string'],
    explicit_search_mappings: {
      image: {
        type: 'keyword',
        index: false
      }
    },
    group_headlines: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        label: 'string',
        layout: 'string',
        group: 'string',
        order: 0,
        type: 'headline',
        enable_divider: false,
        divider: 'top_divider',
        _purpose: ['taxonomy-slug:classification-slug'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000']
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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
      "settings_flag": []
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

```ts
const { data } = await client.deleteSchema({
  slug: 'example',
})
```

---

### `getJsonSchema`

Get formal JSON schema definition draft 2020-12 for the given epilot schema

`GET /v1/entity/schemas/{slug}/json/schema`

```ts
const { data } = await client.getJsonSchema({
  slug: 'example',
  dereference: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSchemaExample({
  slug: 'example',
})
```

<details>
<summary>Response</summary>

```json
{}
```

</details>

---

### `getSchemaVersions`

Get all versions of this schema ordered by the latest versions including drafts.

`GET /v1/entity/schemas/{slug}/versions`

```ts
const { data } = await client.getSchemaVersions({
  slug: 'example',
  versions_from: 1,
  versions_size: 1,
  drafts_from: 1,
  drafts_size: 1,
  fields: ['...'],
})
```

<details>
<summary>Response</summary>

```json
{
  "versions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
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
  "drafts_more": true
}
```

</details>

---

### `listAvailableCapabilities`

List available capabilities for schema

`GET /v1/entity/schemas/{slug}/capabilities/available`

```ts
const { data } = await client.listAvailableCapabilities({
  slug: 'example',
})
```

<details>
<summary>Response</summary>

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
      "settings_flag": []
    }
  ]
}
```

</details>

---

### `listSchemaBlueprints`

List canonical versions of all available schemas

`GET /v1/entity/schemas/blueprints`

```ts
const { data } = await client.listSchemaBlueprints()
```

<details>
<summary>Response</summary>

```json
{
  "results": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_at": "string",
      "updated_at": "string",
      "comment": "string",
      "source": {},
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

Search for entities. Supports ordering and pagination. [Lucene query syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax) supp

`POST /v1/entity:search`

```ts
const { data } = await client.searchEntities(
  null,
  {
    q: '_schema:contact AND status:active',
    include_scores: false,
    sort: 'string',
    from: 0,
    size: 10,
    hydrate: false,
    fields: ['_id', '_title', 'first_name', 'account', '!account.*._files', '**._product'],
    aggs: {
      'contact-count-per-tag': {
        terms: {
          field: '_tags.keyword'
        }
      }
    },
    include_deleted: 'false',
    highlight: {},
    stable_for: 0,
    stable_query_id: 'string',
    search_after: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listEntities(
  null,
  {
    query: {
      query_string: {
        query: 'status:active',
        fields: ['_title', '_tags', 'status'],
        default_operator: 'OR',
        lenient: true
      }
    },
    filter: [
      {
        term: {
          _schema: 'contact'
        }
      },
      {
        terms: {
          status: ['active']
        }
      }
    ],
    allow_targeting_all_schemas: false,
    sort: 'string',
    from: 0,
    size: 10,
    hydrate: false,
    fields: ['_id', '_title', 'first_name', 'account', '!account.*._files', '**._product'],
    aggs: {
      'contact-count-per-tag': {
        terms: {
          field: '_tags.keyword'
        }
      }
    },
    include_deleted: 'false',
    include_scores: false,
    highlight: {},
    stable_for: 0,
    stable_query_id: 'string',
    search_after: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.queryEntityGraph(
  null,
  {
    seed: {
      entity_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      node_id: 'contact'
    },
    graph: {
      nodes: [
        {
          id: 'portal_user',
          schema: 'portal_user',
          cardinality: 'one'
        },
        {
          id: 'contact',
          schema: 'contact',
          cardinality: 'one'
        },
        /* ... 1 more */
      ],
      edges: [
        {
          from: 'portal_user',
          to: 'contact'
        },
        {
          from: 'contact',
          to: 'billing_accounts'
        }
      ]
    },
    hydrate: false
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createEntity(
  {
    slug: 'example',
    activity_id: 'example',
    fill_activity: true,
    async: true,
    validate: true,
  },
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    _org: '123',
    _owners: [
      {
        org_id: '123',
        user_id: '123'
      }
    ],
    _schema: 'contact',
    _tags: ['example', 'mock'],
    _created_at: '2021-02-09T12:41:43.662Z',
    _updated_at: '2021-02-09T12:41:43.662Z',
    _acl: {
      view: ['org:456', 'org:789'],
      edit: ['org:456'],
      delete: ['org:456']
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.validateEntity(
  {
    slug: 'example',
  },
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    _org: '123',
    _owners: [
      {
        org_id: '123',
        user_id: '123'
      }
    ],
    _schema: 'contact',
    _tags: ['example', 'mock'],
    _created_at: '2021-02-09T12:41:43.662Z',
    _updated_at: '2021-02-09T12:41:43.662Z',
    _acl: {
      view: ['org:456', 'org:789'],
      edit: ['org:456'],
      delete: ['org:456']
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.validateEntityV2(
  {
    slug: 'example',
  },
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    _org: '123',
    _owners: [
      {
        org_id: '123',
        user_id: '123'
      }
    ],
    _schema: 'contact',
    _tags: ['example', 'mock'],
    _created_at: '2021-02-09T12:41:43.662Z',
    _updated_at: '2021-02-09T12:41:43.662Z',
    _acl: {
      view: ['org:456', 'org:789'],
      edit: ['org:456'],
      delete: ['org:456']
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.upsertEntity(
  {
    slug: 'example',
    activity_id: 'example',
    fill_activity: true,
    dry_run: true,
    async: true,
    validate: true,
    strict: true,
  },
  {
    unique_key: ['_id'],
    entity: {
      _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      _org: '123',
      _owners: [
        {
          org_id: '123',
          user_id: '123'
        }
      ],
      _schema: 'contact',
      _tags: ['example', 'mock'],
      _created_at: '2021-02-09T12:41:43.662Z',
      _updated_at: '2021-02-09T12:41:43.662Z',
      _acl: {
        view: ['org:456', 'org:789'],
        edit: ['org:456'],
        delete: ['org:456']
      },
      _manifest: ['123e4567-e89b-12d3-a456-426614174000']
    }
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEntityV2({
  id: '123e4567-e89b-12d3-a456-426614174000',
  slug: 'example',
  hydrate: true,
  fields: ['...'],
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.restoreEntity(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    slug: 'example',
    activity_id: 'example',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.reindexEntity(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    slug: 'example',
  },
  {},
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEntity({
  id: '123e4567-e89b-12d3-a456-426614174000',
  slug: 'example',
  hydrate: true,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateEntity(
  {
    slug: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
    activity_id: 'example',
    fill_activity: true,
    async: true,
    validate: true,
  },
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    _org: '123',
    _owners: [
      {
        org_id: '123',
        user_id: '123'
      }
    ],
    _schema: 'contact',
    _tags: ['example', 'mock'],
    _created_at: '2021-02-09T12:41:43.662Z',
    _updated_at: '2021-02-09T12:41:43.662Z',
    _acl: {
      view: ['org:456', 'org:789'],
      edit: ['org:456'],
      delete: ['org:456']
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.patchEntity(
  {
    slug: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
    activity_id: 'example',
    fill_activity: true,
    dry_run: true,
    async: true,
    validate: true,
  },
  {
    _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    _org: '123',
    _owners: [
      {
        org_id: '123',
        user_id: '123'
      }
    ],
    _schema: 'contact',
    _tags: ['example', 'mock'],
    _created_at: '2021-02-09T12:41:43.662Z',
    _updated_at: '2021-02-09T12:41:43.662Z',
    _acl: {
      view: ['org:456', 'org:789'],
      edit: ['org:456'],
      delete: ['org:456']
    },
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteEntity({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  activity_id: 'example',
  purge: true,
})
```

---

### `autocomplete`

Autocomplete entity attributes

`GET /v1/entity:autocomplete`

```ts
const { data } = await client.autocomplete({
  input: 'example',
  attribute: 'example',
  slug: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "hits": 1,
  "results": ["value"]
}
```

</details>

---

### `wipeAllEntities`

Creates a request to queue the deletion of all entities in the system. This is a destructive operation and should only be used in sandbox environments.

`POST /v1/entity:wipeAllEntities`

```ts
const { data } = await client.wipeAllEntities(
  null,
  {
    schemas: ['contact']
  },
)
```

---

### `createActivity`

Create an activity that can be displayed in activity feeds.

`POST /v1/entity/activity`

```ts
const { data } = await client.createActivity(
  {
    entities: ['...'],
  },
  {
    type: 'string',
    title: 'My custom activity',
    message: '{{caller}} did something with {{entity payload.entity.id}}.',
    payload: {
      entity: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        schema: 'contact'
      }
    },
    pending: false
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getActivity({
  id: '123e4567-e89b-12d3-a456-426614174000',
  operations_size: 1,
  operations_from: 1,
})
```

<details>
<summary>Response</summary>

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
      "diff": {}
    }
  ]
}
```

</details>

---

### `attachActivity`

Attach existing activity to entity activity feeds

`POST /v1/entity/activity/{id}:attach`

```ts
const { data } = await client.attachActivity({
  id: '123e4567-e89b-12d3-a456-426614174000',
  entities: ['...'],
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getEntityActivityFeed({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  after: 'example',
  before: 'example',
  start_date: 'example',
  end_date: 'example',
  preset_range: 'example',
  from: 1,
  size: 1,
  type: ['...'],
  include_relations: true,
  exclude_activity_groups: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getRelations({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  hydrate: true,
  include_reverse: true,
  from: 1,
  size: 1,
  include_schemas: ['...'],
  exclude_schemas: ['...'],
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.addRelations(
  {
    slug: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
    async: true,
    activity_id: 'example',
  },
  [
    {
      entity_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      org_id: 'string',
      _schema: 'contact',
      attribute: 'string',
      _tags: ['string'],
      reverse: true
    }
  ],
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.removeRelations(
  {
    slug: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
    async: true,
    activity_id: 'example',
  },
  [
    {
      entity_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      org_id: 'string',
      _schema: 'contact',
      attribute: 'string',
      _tags: ['string'],
      reverse: true
    }
  ],
)
```

---

### `getRelationsV2`

Returns 1st level direct relations for an entity with pagination.

`GET /v2/entity/{slug}/{id}/relations`

```ts
const { data } = await client.getRelationsV2({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  hydrate: true,
  query: 'example',
  include_reverse: true,
  from: 1,
  size: 1,
  fields: ['...'],
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getRelationsV3({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  hydrate: true,
  include_reverse: true,
  from: 1,
  size: 1,
  include_schemas: ['...'],
  exclude_schemas: ['...'],
  mode: 'example',
  fields: ['...'],
  include_deleted: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getRelatedEntitiesCount({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  exclude_schemas: ['...'],
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateRelation(
  {
    slug: 'example',
    id: '123e4567-e89b-12d3-a456-426614174000',
    attribute: 'example',
    entity_id: 'example',
    async: true,
    activity_id: 'example',
  },
  {
    _tags: ['string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteRelation({
  slug: 'example',
  id: '123e4567-e89b-12d3-a456-426614174000',
  attribute: 'example',
  entity_id: 'example',
  async: true,
  activity_id: 'example',
})
```

---

### `exportEntities`

Export entity data in a CSV-format. The export will export data as close as possible to what is visible on Entity UI tables.
The values exported as in some cases, transformed to human-readable values.

`POST /v1/entity:export`

```ts
const { data } = await client.exportEntities(
  {
    job_id: 'example',
    is_template: true,
    language: 'example',
  },
  {
    q: '_schema:contact AND status:active',
    include_scores: false,
    sort: 'string',
    from: 0,
    size: 10,
    hydrate: false,
    fields: ['_id', '_title', 'first_name', 'account', '!account.*._files', '**._product'],
    aggs: {
      'contact-count-per-tag': {
        terms: {
          field: '_tags.keyword'
        }
      }
    },
    include_deleted: 'false',
    highlight: {},
    stable_for: 0,
    stable_query_id: 'string',
    search_after: ['string']
  },
)
```

---

### `importEntities`

Import Entities

`POST /v1/entity:import`

```ts
const { data } = await client.importEntities(
  {
    job_id: 'example',
  },
  {
    S3Reference: {
      bucket: 'my-bucket',
      key: 'imports/my-import.json'
    },
    schema: 'contact'
  },
)
```

---

### `listSavedViews`

Get the Saved Views based on the schema

`GET /v1/entity/views`

```ts
const { data } = await client.listSavedViews({
  slug: 'example',
  sort: 'example',
  from: 1,
  size: 1,
  fields: ['...'],
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createSavedView(
  null,
  {
    slug: ['contact'],
    name: 'View listing German',
    org: '66',
    shared: true,
    isFavoritedBy: ['11701'],
    created_by: {
      user_id: '10598'
    },
    ui_config: {
      filters: {
        customer_name: 'suresh test',
        _tags: '360'
      },
      table_layout: {
        opportunity: {
          page: 1,
          sort: '_created_at:desc',
          pageSize: 25,
          columnSettings: []
        }
      }
    },
    shared_with: ['112233']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSavedView({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateSavedView(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created_at: 'string',
    updated_at: 'string',
    slug: ['contact'],
    name: 'View listing German',
    org: '66',
    shared: true,
    isFavoritedBy: ['11701'],
    created_by: {
      user_id: '10598'
    },
    ui_config: {
      filters: {
        customer_name: 'suresh test',
        _tags: '360'
      },
      table_layout: {
        opportunity: {
          page: 1,
          sort: '_created_at:desc',
          pageSize: 25,
          columnSettings: []
        }
      }
    },
    shared_with: ['112233']
  },
)
```

<details>
<summary>Response</summary>

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

Partially updates a saved view with the provided payload. If an updated_at is passed and the server contains a newer version of the view a `409` error is returned

`PATCH /v1/entity/view/{id}`

```ts
const { data } = await client.patchSavedView(
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    slug: ['contact'],
    name: 'View listing German',
    org: '66',
    shared: true,
    isFavoritedBy: ['11701'],
    created_by: {
      user_id: '10598'
    },
    ui_config: {
      filters: {
        customer_name: 'suresh test',
        _tags: '360'
      },
      table_layout: {
        opportunity: {
          page: 1,
          sort: '_created_at:desc',
          pageSize: 25,
          columnSettings: []
        }
      }
    },
    shared_with: ['112233']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteSavedView({
  id: '123e4567-e89b-12d3-a456-426614174000',
})
```

---

### `listFavoriteViewsForUser`

Get the Favorite Saved Views for user based on the schema

`GET /v1/entity/views/favorites`

```ts
const { data } = await client.listFavoriteViewsForUser()
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listTaxonomies({
  include_disabled: true,
  type: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createTaxonomy(
  null,
  {
    slug: 'purpose',
    name: 'Purpose',
    plural: 'Purposes',
    kind: 'system',
    type: 'entity',
    icon: 'purpose',
    color: '#FF5733',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    deleted_at: '1970-01-01T00:00:00.000Z',
    created_by: '10598',
    enabled: true,
    order: 10,
    enabled_locations: ['account', 'string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getTaxonomy({
  taxonomySlug: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateTaxonomy(
  {
    taxonomySlug: 'example',
  },
  {
    slug: 'purpose',
    name: 'Purpose',
    plural: 'Purposes',
    kind: 'system',
    type: 'entity',
    icon: 'purpose',
    color: '#FF5733',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    deleted_at: '1970-01-01T00:00:00.000Z',
    created_by: '10598',
    enabled: true,
    order: 10,
    enabled_locations: ['account', 'string']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteTaxonomy({
  taxonomySlug: 'example',
  permanent: true,
})
```

---

### `updateClassificationsForTaxonomy`

Update the classifications for a taxonomy

`POST /v1/entity/taxonomies/{taxonomySlug}/classifications`

```ts
const { data } = await client.updateClassificationsForTaxonomy(
  {
    taxonomySlug: 'example',
  },
  {
    create: [
      {
        id: 'taxonomy-slug:classification-slug',
        slug: 'wallbox-pv',
        name: 'Wallbox PV',
        parents: ['taxonomy-slug:classification-slug'],
        color: '#FF5733',
        created_at: '1970-01-01T00:00:00.000Z',
        updated_at: '1970-01-01T00:00:00.000Z',
        archived: false,
        starred: false,
        enabled_locations: ['account', 'string'],
        enabled_purposes: ['string'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000']
      }
    ],
    update: [
      {
        id: 'taxonomy-slug:classification-slug',
        slug: 'wallbox-pv',
        name: 'Wallbox PV',
        parents: ['taxonomy-slug:classification-slug'],
        color: '#FF5733',
        created_at: '1970-01-01T00:00:00.000Z',
        updated_at: '1970-01-01T00:00:00.000Z',
        archived: false,
        starred: false,
        enabled_locations: ['account', 'string'],
        enabled_purposes: ['string'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000']
      }
    ],
    delete: ['taxonomy-slug:classification-slug', 'taxonomy-slug:classification-slug']
  },
)
```

<details>
<summary>Response</summary>

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
  "deleted": {}
}
```

</details>

---

### `createTaxonomyClassification`

Create a new classification for a taxonomy

`POST /v2/entity/taxonomies/classifications`

```ts
const { data } = await client.createTaxonomyClassification(
  null,
  {
    id: 'taxonomy-slug:classification-slug',
    slug: 'wallbox-pv',
    name: 'Wallbox PV',
    parents: ['taxonomy-slug:classification-slug'],
    color: '#FF5733',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    archived: false,
    starred: false,
    enabled_locations: ['account', 'string'],
    enabled_purposes: ['string'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getTaxonomyClassification({
  classificationSlug: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.updateTaxonomyClassification(
  {
    classificationSlug: 'example',
  },
  {
    id: 'taxonomy-slug:classification-slug',
    slug: 'wallbox-pv',
    name: 'Wallbox PV',
    parents: ['taxonomy-slug:classification-slug'],
    color: '#FF5733',
    created_at: '1970-01-01T00:00:00.000Z',
    updated_at: '1970-01-01T00:00:00.000Z',
    archived: false,
    starred: false,
    enabled_locations: ['account', 'string'],
    enabled_purposes: ['string'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteTaxonomyClassification({
  classificationSlug: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.taxonomyAutocomplete({
  taxonomySlug: 'example',
  query: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.taxonomiesClassificationsSearch(
  {
    taxonomySlug: ['...'],
    query: 'example',
    archived: true,
    include_archived: 'example',
  },
  {
    classificationIds: [
      'taxonomy-slug:classification-slug',
      {
        pattern: 'taxonomy-slug:*'
      }
    ]
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.listTaxonomyClassificationsForSchema({
  slug: 'example',
  taxonomySlug: 'example',
  query: 'example',
  size: 1,
})
```

<details>
<summary>Response</summary>

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
- ``<undefined>`` = all active jobs
- PENDING = all active jobs
- FAILED = all failed jobs
- COMPLETED = all completed jobs

`GET /v1/entity/taxonomies/bulk-jobs`

```ts
const { data } = await client.getTaxonomyBulkActionJobs({
  status: ['...'],
  size: 1,
  created_after: 'example',
  sort_pending_first: true,
  scope: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getTaxonomyBulkActionJobById({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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
and the job will be stopped.

`POST /v1/entity/taxonomies/bulk-jobs/{job_id}/cancel`

```ts
const { data } = await client.cancelBulkAction({
  job_id: 'example',
})
```

<details>
<summary>Response</summary>

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
also updates all references from the old classification to the new one under the target taxonomy.

`POST /v1/entity/taxonomies/classifications:move`

```ts
const { data } = await client.bulkMoveClassifications(
  null,
  {
    job_id: 'string',
    target_taxonomy: 'purpose',
    classification_ids: ['taxonomy-slug:classification-slug']
  },
)
```

<details>
<summary>Response</summary>

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
also updates all references from the old Classifications to the new one.

`POST /v1/entity/taxonomies/classifications:merge`

```ts
const { data } = await client.bulkMergeClassifications(
  null,
  {
    job_id: 'string',
    target_classification: 'purpose',
    classification_ids: ['taxonomy-slug:classification-slug']
  },
)
```

<details>
<summary>Response</summary>

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
async operation which also deletes all references of the deleted classifications from the entities
referenc

`POST /v1/entity/taxonomies/classifications:delete`

```ts
const { data } = await client.bulkDeleteClassifications(
  null,
  {
    job_id: 'string',
    classification_ids: ['taxonomy-slug:classification-slug']
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createSchemaAttribute(
  null,
  {
    id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
    name: 'string',
    label: 'string',
    placeholder: 'string',
    hidden: false,
    show_in_table: true,
    sortable: true,
    required: false,
    readonly: false,
    deprecated: false,
    default_value: {},
    group: 'string',
    order: 0,
    layout: 'full_width',
    hide_label: true,
    icon: 'string',
    render_condition: 'string',
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    constraints: {
      disablePast: true
    },
    feature_flag: 'FF_MY_FEATURE_FLAG',
    settings_flag: [
      {
        name: 'string',
        enabled: true
      }
    ],
    value_formatter: 'string',
    preview_value_formatter: 'string',
    entity_builder_disable_edit: false,
    protected: true,
    info_helpers: {
      hint_text: 'string',
      hint_text_key: 'string',
      hint_custom_component: 'string',
      hint_tooltip_placement: 'top'
    },
    explicit_searchable: false,
    exclude_from_search: false,
    repeatable: true,
    has_primary: true,
    type: 'string',
    multiline: true,
    rich_text: true,
    rows: 3
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSchemaAttribute({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putSchemaAttribute(
  {
    composite_id: 'example',
  },
  {
    id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
    name: 'string',
    label: 'string',
    placeholder: 'string',
    hidden: false,
    show_in_table: true,
    sortable: true,
    required: false,
    readonly: false,
    deprecated: false,
    default_value: {},
    group: 'string',
    order: 0,
    layout: 'full_width',
    hide_label: true,
    icon: 'string',
    render_condition: 'string',
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    constraints: {
      disablePast: true
    },
    feature_flag: 'FF_MY_FEATURE_FLAG',
    settings_flag: [
      {
        name: 'string',
        enabled: true
      }
    ],
    value_formatter: 'string',
    preview_value_formatter: 'string',
    entity_builder_disable_edit: false,
    protected: true,
    info_helpers: {
      hint_text: 'string',
      hint_text_key: 'string',
      hint_custom_component: 'string',
      hint_tooltip_placement: 'top'
    },
    explicit_searchable: false,
    exclude_from_search: false,
    repeatable: true,
    has_primary: true,
    type: 'string',
    multiline: true,
    rich_text: true,
    rows: 3
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteSchemaAttribute({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createSchemaCapability(
  null,
  {
    id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
    name: 'customer_messaging',
    title: 'Messaging',
    attributes: [
      {
        id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
        name: 'string',
        label: 'string',
        placeholder: 'string',
        hidden: false,
        show_in_table: true,
        sortable: true,
        required: false,
        readonly: false,
        deprecated: false,
        default_value: {},
        group: 'string',
        order: 0,
        layout: 'full_width',
        hide_label: true,
        icon: 'string',
        render_condition: 'string',
        _purpose: ['taxonomy-slug:classification-slug'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
        constraints: { /* ... */ },
        feature_flag: 'FF_MY_FEATURE_FLAG',
        settings_flag: [ /* ... */ ],
        value_formatter: 'string',
        preview_value_formatter: 'string',
        entity_builder_disable_edit: false,
        protected: true,
        info_helpers: { /* ... */ },
        explicit_searchable: false,
        exclude_from_search: false,
        repeatable: true,
        has_primary: true,
        type: 'string',
        multiline: true,
        rich_text: true,
        rows: 3
      },
      {
        id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
        name: 'string',
        label: 'string',
        placeholder: 'string',
        hidden: false,
        show_in_table: true,
        sortable: true,
        required: false,
        readonly: false,
        deprecated: false,
        default_value: {},
        group: 'string',
        order: 0,
        layout: 'full_width',
        hide_label: true,
        icon: 'string',
        render_condition: 'string',
        _purpose: ['taxonomy-slug:classification-slug'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
        constraints: { /* ... */ },
        feature_flag: 'FF_MY_FEATURE_FLAG',
        settings_flag: [ /* ... */ ],
        value_formatter: 'string',
        preview_value_formatter: 'string',
        entity_builder_disable_edit: false,
        protected: true,
        info_helpers: { /* ... */ },
        explicit_searchable: false,
        exclude_from_search: false,
        repeatable: true,
        has_primary: true,
        type: 'link'
      },
      /* ... 32 more */
    ],
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    app_id: '123e4567-e89b-12d3-a456-426614174000',
    ui_config: {
      is_filterable: true
    },
    ui_hooks: [
      {
        hook: 'EntityDetailsV2:Tab',
        render_condition: '_is_composite_price = "false"',
        order: 10,
        title: 'Notes',
        group_expanded: true,
        import: '@epilot360/notes',
        component: 'PricingItems',
        route: 'notes',
        icon: 'email',
        disabled: true,
        header: true,
        requiredPermission: { /* ... */ }
      }
    ],
    feature_flag: 'FF_MY_FEATURE_FLAG',
    settings_flag: [
      {
        name: 'string',
        enabled: true
      }
    ],
    composite_id: 'contact:97644baa-083f-4e49-9188-fcff2ecaad7d',
    schema: 'contact'
  },
)
```

<details>
<summary>Response</summary>

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
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `getSchemaCapability`

Get a schema capability from given capability ID

`GET /v1/entity/schemas/capabilities/{composite_id}`

```ts
const { data } = await client.getSchemaCapability({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `putSchemaCapability`

Adds or updates an capability in the schema

`PUT /v1/entity/schemas/capabilities/{composite_id}`

```ts
const { data } = await client.putSchemaCapability(
  {
    composite_id: 'example',
  },
  {
    id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
    name: 'customer_messaging',
    title: 'Messaging',
    attributes: [
      {
        id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
        name: 'string',
        label: 'string',
        placeholder: 'string',
        hidden: false,
        show_in_table: true,
        sortable: true,
        required: false,
        readonly: false,
        deprecated: false,
        default_value: {},
        group: 'string',
        order: 0,
        layout: 'full_width',
        hide_label: true,
        icon: 'string',
        render_condition: 'string',
        _purpose: ['taxonomy-slug:classification-slug'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
        constraints: { /* ... */ },
        feature_flag: 'FF_MY_FEATURE_FLAG',
        settings_flag: [ /* ... */ ],
        value_formatter: 'string',
        preview_value_formatter: 'string',
        entity_builder_disable_edit: false,
        protected: true,
        info_helpers: { /* ... */ },
        explicit_searchable: false,
        exclude_from_search: false,
        repeatable: true,
        has_primary: true,
        type: 'string',
        multiline: true,
        rich_text: true,
        rows: 3
      },
      {
        id: 'd5839b94-ba20-4225-a78e-76951d352bd6',
        name: 'string',
        label: 'string',
        placeholder: 'string',
        hidden: false,
        show_in_table: true,
        sortable: true,
        required: false,
        readonly: false,
        deprecated: false,
        default_value: {},
        group: 'string',
        order: 0,
        layout: 'full_width',
        hide_label: true,
        icon: 'string',
        render_condition: 'string',
        _purpose: ['taxonomy-slug:classification-slug'],
        _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
        constraints: { /* ... */ },
        feature_flag: 'FF_MY_FEATURE_FLAG',
        settings_flag: [ /* ... */ ],
        value_formatter: 'string',
        preview_value_formatter: 'string',
        entity_builder_disable_edit: false,
        protected: true,
        info_helpers: { /* ... */ },
        explicit_searchable: false,
        exclude_from_search: false,
        repeatable: true,
        has_primary: true,
        type: 'link'
      },
      /* ... 32 more */
    ],
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    app_id: '123e4567-e89b-12d3-a456-426614174000',
    ui_config: {
      is_filterable: true
    },
    ui_hooks: [
      {
        hook: 'EntityDetailsV2:Tab',
        render_condition: '_is_composite_price = "false"',
        order: 10,
        title: 'Notes',
        group_expanded: true,
        import: '@epilot360/notes',
        component: 'PricingItems',
        route: 'notes',
        icon: 'email',
        disabled: true,
        header: true,
        requiredPermission: { /* ... */ }
      }
    ],
    feature_flag: 'FF_MY_FEATURE_FLAG',
    settings_flag: [
      {
        name: 'string',
        enabled: true
      }
    ],
    composite_id: 'contact:97644baa-083f-4e49-9188-fcff2ecaad7d',
    schema: 'contact'
  },
)
```

<details>
<summary>Response</summary>

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
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `deleteSchemaCapability`

Deletes a Capability from a schema

`DELETE /v1/entity/schemas/capabilities/{composite_id}`

```ts
const { data } = await client.deleteSchemaCapability({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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
  "composite_id": "contact:97644baa-083f-4e49-9188-fcff2ecaad7d",
  "schema": "contact"
}
```

</details>

---

### `createSchemaGroup`

Create a schema group

`POST /v1/entity/schemas/group`

```ts
const { data } = await client.createSchemaGroup(
  null,
  {
    label: 'Contact Details',
    id: 'e18a532b-ae79-4d86-a6a5-e5dbfb579d14',
    order: 0,
    expanded: false,
    render_condition: '_is_composite_price = "false"',
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    feature_flag: 'FF_MY_FEATURE_FLAG',
    settings_flag: [
      {
        name: 'string',
        enabled: true
      }
    ],
    info_tooltip_title: {
      key: 'string',
      default: 'string'
    },
    composite_id: 'contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14',
    schema: 'contact'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSchemaGroup({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putSchemaGroup(
  {
    composite_id: 'example',
  },
  {
    label: 'Contact Details',
    id: 'e18a532b-ae79-4d86-a6a5-e5dbfb579d14',
    order: 0,
    expanded: false,
    render_condition: '_is_composite_price = "false"',
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    feature_flag: 'FF_MY_FEATURE_FLAG',
    settings_flag: [
      {
        name: 'string',
        enabled: true
      }
    ],
    info_tooltip_title: {
      key: 'string',
      default: 'string'
    },
    composite_id: 'contact:e18a532b-ae79-4d86-a6a5-e5dbfb579d14',
    schema: 'contact'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteSchemaGroup({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.createSchemaGroupHeadline(
  null,
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    label: 'string',
    layout: 'string',
    group: 'string',
    order: 0,
    type: 'headline',
    enable_divider: false,
    divider: 'top_divider',
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    composite_id: 'contact:97644baa-083f-4e49-9188-fcff2ecaad7d',
    schema: 'contact'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.getSchemaGroupHeadline({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.putSchemaGroupHeadline(
  {
    composite_id: 'example',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'string',
    label: 'string',
    layout: 'string',
    group: 'string',
    order: 0,
    type: 'headline',
    enable_divider: false,
    divider: 'top_divider',
    _purpose: ['taxonomy-slug:classification-slug'],
    _manifest: ['123e4567-e89b-12d3-a456-426614174000'],
    composite_id: 'contact:97644baa-083f-4e49-9188-fcff2ecaad7d',
    schema: 'contact'
  },
)
```

<details>
<summary>Response</summary>

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

```ts
const { data } = await client.deleteSchemaGroupHeadline({
  composite_id: 'example',
})
```

<details>
<summary>Response</summary>

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

## Schemas

### `ExportJobId`

The unique identifier of the import job.

```ts
type ExportJobId = string
```

### `Language`

Export headers translation Language

```ts
type Language = string
```

### `IsTemplate`

Pass 'true' to generate import template

```ts
type IsTemplate = boolean
```

### `SchemaId`

Generated uuid for schema

```ts
type SchemaId = string // uuid
```

### `EntitySchema`

The "type" of an Entity. Describes the shape. Includes Entity Attributes, Relations and Capabilities.

```ts
type EntitySchema = {
  slug: string
  version?: number
  blueprint?: string // uuid
  feature_flag?: string
  enable_setting?: string[]
  name: string
  plural: string
  description?: string
  docs_url?: string // uri
  category?: string
  published?: boolean
  draft?: boolean
  icon?: string
  title_template?: string
  ui_config?: {
    table_view?: {
      view_type?: { ... }
      row_actions?: { ... }
      bulk_actions?: { ... }
      navbar_actions?: { ... }
      enable_thumbnails?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    create_view?: {
      view_type?: { ... }
      search_params?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    edit_view?: {
      view_type?: { ... }
      search_params?: { ... }
      summary_attributes?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    single_view?: {
      view_type?: { ... }
      search_params?: { ... }
      summary_attributes?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    list_item?: {
      summary_attributes?: { ... }
      quick_actions?: { ... }
      ui_config?: { ... }
    }
    sharing?: {
      show_sharing_button?: { ... }
    }
  }
  capabilities: Array<{
    id?: string
    name: string
    title?: string
    attributes?: Array<{
      id?: { ... }
      name: { ... }
      label: { ... }
      placeholder?: { ... }
      hidden?: { ... }
      show_in_table?: { ... }
      sortable?: { ... }
      required?: { ... }
      readonly?: { ... }
      deprecated?: { ... }
      default_value?: { ... }
      group?: { ... }
      order?: { ... }
      layout?: { ... }
      hide_label?: { ... }
      icon?: { ... }
      render_condition?: { ... }
      _purpose?: { ... }
      _manifest?: { ... }
      constraints?: { ... }
      feature_flag?: { ... }
      settings_flag?: { ... }
      value_formatter?: { ... }
      preview_value_formatter?: { ... }
      entity_builder_disable_edit?: { ... }
      protected?: { ... }
      info_helpers?: { ... }
      explicit_searchable?: { ... }
      exclude_from_search?: { ... }
  // ...
}
```

### `EntitySchemaItem`

```ts
type EntitySchemaItem = {
  id?: string // uuid
  created_at?: string
  updated_at?: string
  comment?: string
  source?: {
    id?: string
    type?: string
  }
  slug: string
  version?: number
  blueprint?: string // uuid
  feature_flag?: string
  enable_setting?: string[]
  name: string
  plural: string
  description?: string
  docs_url?: string // uri
  category?: string
  published?: boolean
  draft?: boolean
  icon?: string
  title_template?: string
  ui_config?: {
    table_view?: {
      view_type?: { ... }
      row_actions?: { ... }
      bulk_actions?: { ... }
      navbar_actions?: { ... }
      enable_thumbnails?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    create_view?: {
      view_type?: { ... }
      search_params?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    edit_view?: {
      view_type?: { ... }
      search_params?: { ... }
      summary_attributes?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    single_view?: {
      view_type?: { ... }
      search_params?: { ... }
      summary_attributes?: { ... }
    } | {
      view_type?: { ... }
      route?: { ... }
    } | {
      view_type?: { ... }
    }
    list_item?: {
      summary_attributes?: { ... }
      quick_actions?: { ... }
      ui_config?: { ... }
    }
    sharing?: {
      show_sharing_button?: { ... }
    }
  }
  capabilities: Array<{
    id?: string
    name: string
    title?: string
    attributes?: Array<{
      id?: { ... }
      name: { ... }
      label: { ... }
      placeholder?: { ... }
      hidden?: { ... }
      show_in_table?: { ... }
      sortable?: { ... }
      required?: { ... }
      readonly?: { ... }
      deprecated?: { ... }
      default_value?: { ... }
      group?: { ... }
      order?: { ... }
      layout?: { ... }
      hide_label?: { ... }
      icon?: { ... }
      render_condition?: { ... }
      _purpose?: { ... }
      _manifest?: { ... }
      constraints?: { ... }
      feature_flag?: { ... }
  // ...
}
```

### `GenerateEntityTableAIFiltersRequest`

```ts
type GenerateEntityTableAIFiltersRequest = {
  prompt: string
  main_entity_slug: string
  filter_options: Array<{
    type?: "search" | "filter"
    label: string
    label_type?: string
    name?: string
    group?: string
    allowedSchemas?: string[]
    relatedOptions?: Array<{
      type?: { ... }
      label: { ... }
      label_type?: { ... }
      name?: { ... }
      group?: { ... }
      allowedSchemas?: { ... }
      relatedOptions?: { ... }
    }>
  }>
}
```

### `GenerateEntityTableAIFiltersResponse`

```ts
type GenerateEntityTableAIFiltersResponse = Array<{
  label: string
  type: string
  value: string
}>
```

### `EntityTableFilterSearch`

```ts
type EntityTableFilterSearch = {
  label: string
  type: string
  value: string
}
```

### `EntityTableFilterOption`

```ts
type EntityTableFilterOption = {
  type?: "search" | "filter"
  label: string
  label_type?: string
  name?: string
  group?: string
  allowedSchemas?: string[]
  relatedOptions?: Array<{
    type?: "search" | "filter"
    label: string
    label_type?: string
    name?: string
    group?: string
    allowedSchemas?: string[]
    relatedOptions?: Array<{
      type?: { ... }
      label: { ... }
      label_type?: { ... }
      name?: { ... }
      group?: { ... }
      allowedSchemas?: { ... }
      relatedOptions?: { ... }
    }>
  }>
}
```

### `EntitySchemaGroup`

```ts
type EntitySchemaGroup = {
  label: string
  id?: string
  order?: number
  expanded?: boolean
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  info_tooltip_title?: {
    key?: string
    default?: string
  }
}
```

### `EntitySchemaGroupWithCompositeID`

```ts
type EntitySchemaGroupWithCompositeID = {
  label: string
  id?: string
  order?: number
  expanded?: boolean
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  info_tooltip_title?: {
    key?: string
    default?: string
  }
  composite_id?: string
  schema?: string
}
```

### `Attribute`

```ts
type Attribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "string"
  multiline?: boolean
  rich_text?: boolean
  rows?: number | string
} | {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "link"
} | {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  // ...
}
```

### `AttributeWithCompositeID`

```ts
type AttributeWithCompositeID = {
  composite_id?: string
  schema?: string
}
```

### `BaseAttribute`

```ts
type BaseAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
}
```

### `TextAttribute`

```ts
type TextAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "string"
  multiline?: boolean
  rich_text?: boolean
  rows?: number | string
}
```

### `LinkAttribute`

```ts
type LinkAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "link"
}
```

### `InternalAttribute`

```ts
type InternalAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "internal"
}
```

### `BooleanAttribute`

```ts
type BooleanAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "boolean"
  display_type?: "switch" | "checkbox"
}
```

### `DateAttribute`

```ts
type DateAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "date" | "datetime"
}
```

### `CountryAttribute`

```ts
type CountryAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "country"
}
```

### `SelectAttribute`

```ts
type SelectAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "select" | "radio"
  options?: Array<{
    value: string
    title?: string
  } | string>
  allow_any?: boolean
}
```

### `MultiSelectAttribute`

```ts
type MultiSelectAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "multiselect" | "checkbox"
  disable_case_sensitive?: boolean
  allow_extra_options?: boolean
  options?: Array<string | {
    value: string
    title?: string
  }>
  allow_any?: boolean
}
```

### `StatusAttribute`

```ts
type StatusAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "status"
  options?: Array<string | {
    value: string
    title?: string
  }>
}
```

### `SequenceAttribute`

```ts
type SequenceAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "sequence"
  prefix?: string
  start_number?: number
}
```

### `FileAttribute`

```ts
type FileAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "image" | "file"
  multiple?: boolean
  allowed_extensions?: string[]
  display_images_landscaped?: boolean
  enable_description?: boolean
  default_access_control?: "public-read" | "private"
}
```

### `CurrencyAttribute`

```ts
type CurrencyAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "currency"
  currency_selector_only?: boolean
  currency: Array<{
    code: string
    description: string
    symbol: string
    flag?: string
  }>
}
```

### `SummaryField`

Summary Fields are displayed inside list view as a resume of the relation entity.

```ts
type SummaryField = {
  field?: string
  display_as?: string
}
```

### `EntityAction`

An entity action configured from the entity schema

```ts
type EntityAction = {
  action: string
  label: string
  icon?: string
  permission?: string
}
```

### `RelationAttribute`

```ts
type RelationAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "relation"
  relation_type?: "has_many" | "has_one"
  reverse_attributes?: Record<string, string>
  relation_affinity_mode?: "weak" | "strong"
  enable_relation_picker?: boolean
  edit_mode?: "list-view"
  details_view_mode_enabled?: boolean
  relation_picker_filter?: {
    q: string
  }
  actions?: Array<{
    action_type?: "add_existing" | "create_new" | "create_from_existing"
    label?: string
    default?: boolean
    feature_flag?: string
    settings_flag?: Array<{
      name?: { ... }
      enabled?: { ... }
    }>
    new_entity_item?: Record<string, unknown>
  }>
  drawer_size?: "small" | "medium" | "large"
  summary_fields?: Array<string | {
    field?: string
    display_as?: string
  }>
  allowedSchemas?: string[]
  enable_relation_tags?: boolean
  add_button_label?: string
  search_placeholder?: string
}
```

### `UserRelationAttribute`

```ts
type UserRelationAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "relation_user"
  multiple?: boolean
}
```

### `PartnerOrganisationAttribute`

```ts
type PartnerOrganisationAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "partner_organisation"
}
```

### `PortalAccessAttribute`

```ts
type PortalAccessAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "portal_access"
}
```

### `DefaultAddressFields`

Default fields visible on addresses

Valid values are:
  - postal_code (default)
  - city (default)
  - street (default)
  - street_number (default)
  - plot_area
  - plot_of_land
  - suburb
  - country
  - postbox
  - additional_info
  - coordinates
  - start_date
  - end_date
  - salutation
  - ti

```ts
type DefaultAddressFields = string[]
```

### `AddressAttribute`

```ts
type AddressAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "address"
  default_address_fields?: string[]
}
```

### `AddressRelationAttribute`

```ts
type AddressRelationAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "relation_address"
  default_address_fields?: string[]
}
```

### `PaymentMethodRelationAttribute`

```ts
type PaymentMethodRelationAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "relation_payment_method"
}
```

### `InvitationEmailAttribute`

```ts
type InvitationEmailAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "invitation_email"
}
```

### `AutomationAttribute`

```ts
type AutomationAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "automation"
}
```

### `InternalUserAttribute`

```ts
type InternalUserAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "internal_user"
}
```

### `PurposeAttribute`

```ts
type PurposeAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "purpose"
}
```

### `RepeatableAttribute`

```ts
type RepeatableAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
}
```

### `TagsAttribute`

```ts
type TagsAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "tags"
  options?: string[]
  suggestions?: string[]
}
```

### `MessageEmailAddressAttribute`

```ts
type MessageEmailAddressAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "message_email_address"
  address?: string
  send_status?: string
  email_type?: string
}
```

### `NumberAttribute`

```ts
type NumberAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "number"
  data_type?: "number" | "string"
  format?: string
  show_separator?: boolean
}
```

### `ConsentAttribute`

```ts
type ConsentAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "consent"
  topic: string
  identifiers?: string[]
}
```

### `OrderedListAttribute`

```ts
type OrderedListAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "ordered_list"
}
```

### `EmailAttribute`

```ts
type EmailAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "email"
}
```

### `PhoneAttribute`

```ts
type PhoneAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "phone"
}
```

### `PaymentAttribute`

```ts
type PaymentAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "payment"
}
```

### `PriceComponentAttribute`

```ts
type PriceComponentAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "price_component"
}
```

### `ComputedAttribute`

```ts
type ComputedAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "computed"
  computed?: boolean
  amount_field?: string
  currency_field?: string
}
```

### `PartnerStatusAttribute`

```ts
type PartnerStatusAttribute = {
  id?: string
  name: string
  label: string
  placeholder?: string
  hidden?: boolean
  show_in_table?: boolean
  sortable?: boolean
  required?: boolean
  readonly?: boolean
  deprecated?: boolean
  default_value?: unknown
  group?: string
  order?: number
  layout?: string
  hide_label?: boolean
  icon?: string
  render_condition?: string
  _purpose?: string[]
  _manifest?: string // uuid[]
  constraints?: object
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  value_formatter?: string
  preview_value_formatter?: string
  entity_builder_disable_edit?: boolean
  protected?: boolean
  info_helpers?: {
    hint_text?: string
    hint_text_key?: string
    hint_custom_component?: string
    hint_tooltip_placement?: string
  }
  explicit_searchable?: boolean
  exclude_from_search?: boolean
  repeatable?: boolean
  has_primary?: boolean
  type: "partner_status"
}
```

### `SummaryAttribute`

Represents an expanded version of an attribute to be displayed in the list item summary.
This configuration can be used in the following way:
```js
{
  "label": "Price components"
  "value": "{{item.prices.length}} price components"
  "show_as_tag": true
  "render_condition": "is_composite_price = "

```ts
type SummaryAttribute = {
  label: string
  value: string
  show_as_tag?: boolean
  tag_color?: string
  render_condition?: string
  feature_flag?: string
  settings_flag?: Array<{
    name?: string
    enabled?: boolean
  }>
  display_mode?: "inline" | "block"
  content_line_cap?: number
  content_wrap?: "normal" | "nowrap" | "pre" | "pre-wrap"
  hide_label?: boolean
  highlight_container?: boolean
}
```

### `GroupHeadline`

```ts
type GroupHeadline = {
  id?: string // uuid
  name: string
  label: string
  layout?: string
  group: string
  order?: number
  type: "headline"
  enable_divider?: boolean
  divider?: "top_divider" | "bottom_divider"
  _purpose?: string[]
  _manifest?: string // uuid[]
}
```

### `GroupHeadlineWithCompositeID`

```ts
type GroupHeadlineWithCompositeID = {
  id?: string // uuid
  name: string
  label: string
  layout?: string
  group: string
  order?: number
  type: "headline"
  enable_divider?: boolean
  divider?: "top_divider" | "bottom_divider"
  _purpose?: string[]
  _manifest?: string // uuid[]
  composite_id?: string
  schema?: string
}
```

### `EntitySlug`

URL-friendly identifier for the entity schema

```ts
type EntitySlug = string
```

### `EntityCapability`

Capabilities the Entity has. Turn features on/off for entities.

```ts
type EntityCapability = {
  id?: string
  name: string
  title?: string
  attributes?: Array<{
    id?: string
    name: string
    label: string
    placeholder?: string
    hidden?: boolean
    show_in_table?: boolean
    sortable?: boolean
    required?: boolean
    readonly?: boolean
    deprecated?: boolean
    default_value?: unknown
    group?: string
    order?: number
    layout?: string
    hide_label?: boolean
    icon?: string
    render_condition?: string
    _purpose?: string[]
    _manifest?: string // uuid[]
    constraints?: object
    feature_flag?: string
    settings_flag?: Array<{
      name?: { ... }
      enabled?: { ... }
    }>
    value_formatter?: string
    preview_value_formatter?: string
    entity_builder_disable_edit?: boolean
    protected?: boolean
    info_helpers?: {
      hint_text?: { ... }
      hint_text_key?: { ... }
      hint_custom_component?: { ... }
      hint_tooltip_placement?: { ... }
    }
    explicit_searchable?: boolean
    exclude_from_search?: boolean
    repeatable?: boolean
    has_primary?: boolean
    type: "string"
    multiline?: boolean
    rich_text?: boolean
    rows?: number | string
  } | {
    id?: string
    name: string
    label: string
    placeholder?: string
    hidden?: boolean
    show_in_table?: boolean
    sortable?: boolean
    required?: boolean
    readonly?: boolean
    deprecated?: boolean
    default_value?: unknown
    group?: string
    order?: number
    layout?: string
    hide_label?: boolean
    icon?: string
    render_condition?: string
    _purpose?: string[]
    _manifest?: string // uuid[]
    constraints?: object
    feature_flag?: string
    settings_flag?: Array<{
      name?: { ... }
      enabled?: { ... }
    }>
    value_formatter?: string
    preview_value_formatter?: string
    entity_builder_disable_edit?: boolean
    protected?: boolean
    info_helpers?: {
      hint_text?: { ... }
      hint_text_key?: { ... }
      hint_custom_component?: { ... }
      hint_tooltip_placement?: { ... }
    }
    explicit_searchable?: boolean
    exclude_from_search?: boolean
    repeatable?: boolean
    has_primary?: boolean
    type: "link"
  } | {
    id?: string
    name: string
    label: string
    placeholder?: string
    hidden?: boolean
    show_in_table?: boolean
    sortable?: boolean
    required?: boolean
    readonly?: boolean
    deprecated?: boolean
  // ...
}
```

### `EntityCapabilityWithCompositeID`

```ts
type EntityCapabilityWithCompositeID = {
  id?: string
  name: string
  title?: string
  attributes?: Array<{
    id?: string
    name: string
    label: string
    placeholder?: string
    hidden?: boolean
    show_in_table?: boolean
    sortable?: boolean
    required?: boolean
    readonly?: boolean
    deprecated?: boolean
    default_value?: unknown
    group?: string
    order?: number
    layout?: string
    hide_label?: boolean
    icon?: string
    render_condition?: string
    _purpose?: string[]
    _manifest?: string // uuid[]
    constraints?: object
    feature_flag?: string
    settings_flag?: Array<{
      name?: { ... }
      enabled?: { ... }
    }>
    value_formatter?: string
    preview_value_formatter?: string
    entity_builder_disable_edit?: boolean
    protected?: boolean
    info_helpers?: {
      hint_text?: { ... }
      hint_text_key?: { ... }
      hint_custom_component?: { ... }
      hint_tooltip_placement?: { ... }
    }
    explicit_searchable?: boolean
    exclude_from_search?: boolean
    repeatable?: boolean
    has_primary?: boolean
    type: "string"
    multiline?: boolean
    rich_text?: boolean
    rows?: number | string
  } | {
    id?: string
    name: string
    label: string
    placeholder?: string
    hidden?: boolean
    show_in_table?: boolean
    sortable?: boolean
    required?: boolean
    readonly?: boolean
    deprecated?: boolean
    default_value?: unknown
    group?: string
    order?: number
    layout?: string
    hide_label?: boolean
    icon?: string
    render_condition?: string
    _purpose?: string[]
    _manifest?: string // uuid[]
    constraints?: object
    feature_flag?: string
    settings_flag?: Array<{
      name?: { ... }
      enabled?: { ... }
    }>
    value_formatter?: string
    preview_value_formatter?: string
    entity_builder_disable_edit?: boolean
    protected?: boolean
    info_helpers?: {
      hint_text?: { ... }
      hint_text_key?: { ... }
      hint_custom_component?: { ... }
      hint_tooltip_placement?: { ... }
    }
    explicit_searchable?: boolean
    exclude_from_search?: boolean
    repeatable?: boolean
    has_primary?: boolean
    type: "link"
  } | {
    id?: string
    name: string
    label: string
    placeholder?: string
    hidden?: boolean
    show_in_table?: boolean
    sortable?: boolean
    required?: boolean
    readonly?: boolean
    deprecated?: boolean
  // ...
}
```

### `EntityViewDisabled`

```ts
type EntityViewDisabled = {
  view_type?: "disabled"
}
```

### `EntityDefaultTable`

```ts
type EntityDefaultTable = {
  view_type?: "default"
  row_actions?: Array<string | {
    action: string
    label: string
    icon?: string
    permission?: string
  }>
  bulk_actions?: Array<string | {
    action: string
    label: string
    icon?: string
    permission?: string
  }>
  navbar_actions?: Array<{
    type: string
    options?: Array<{
      label: { ... }
      params?: { ... }
    }>
  }>
  enable_thumbnails?: boolean
}
```

### `EntityDefaultCreate`

```ts
type EntityDefaultCreate = {
  view_type?: "default"
  search_params?: Record<string, string>
}
```

### `EntityDefaultEdit`

```ts
type EntityDefaultEdit = {
  view_type?: "default"
  search_params?: Record<string, string>
  summary_attributes?: string[]
}
```

### `RedirectEntityView`

```ts
type RedirectEntityView = {
  view_type?: "redirect"
  route?: string
}
```

### `EntityId`

```ts
type EntityId = string // uuid
```

### `BaseEntity`

```ts
type BaseEntity = {
  _id: object
  _org: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema: string
  _title: string
  _tags?: string[]
  _created_at: string // date-time
  _updated_at: string // date-time
  _deleted_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  _purpose?: string[]
  _purpose_name?: string[]
  _manifest?: string // uuid[]
}
```

### `Entity`

```ts
type Entity = {
  _id?: object
  _org?: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema?: string
  _title?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _deleted_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  _purpose?: string[]
  _purpose_name?: string[]
  _manifest?: string // uuid[]
}
```

### `NullableEntity`

```ts
type NullableEntity = {
  _id?: object
  _org?: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema?: string
  _title?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _deleted_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  _purpose?: string[]
  _purpose_name?: string[]
  _manifest?: string // uuid[]
}
```

### `EntityOwner`

The user / organization owning this entity.

Note: Owner implicitly has access to the entity regardless of ACLs.


```ts
type EntityOwner = {
  org_id: string
  user_id?: string
}
```

### `EntityAcl`

Access control list (ACL) for an entity. Defines sharing access to external orgs or users.

```ts
type EntityAcl = {
  view?: string[]
  edit?: string[]
  delete?: string[]
}
```

### `HydratedEntity`

Entity with relation data resolved into the attribute values

```ts
type HydratedEntity = {
  _relations: Array<{
    entity_id: string // uuid
  }>
}
```

### `EntityItem`

```ts
type EntityItem = {
  _id?: object
  _org?: string
  _owners?: Array<{
    org_id: string
    user_id?: string
  }>
  _schema?: string
  _title?: string
  _tags?: string[]
  _created_at?: string // date-time
  _updated_at?: string // date-time
  _deleted_at?: string // date-time
  _acl?: {
    view?: string[]
    edit?: string[]
    delete?: string[]
  }
  _purpose?: string[]
  _purpose_name?: string[]
  _manifest?: string // uuid[]
}
```

### `EntityValidationError`

Validation error for an entity attribute

```ts
type EntityValidationError = {
  code: string
  params: {
    type?: string
  }
  path: string[]
  message: string
}
```

### `EntityValidationResultSuccess`

Validation result for a successful validation

```ts
type EntityValidationResultSuccess = {
  status: "success"
  errors: Array<{
    code: string
    params: {
      type?: { ... }
    }
    path: string[]
    message: string
  }>
}
```

### `EntityValidationResultError`

Validation result for a failed validation

```ts
type EntityValidationResultError = {
  status: "error"
  errors: Array<{
    code: string
    params: {
      type?: { ... }
    }
    path: string[]
    message: string
  }>
}
```

### `EntityValidationResult`

```ts
type EntityValidationResult = {
  status: "success"
  errors: Array<{
    code: string
    params: {
      type?: { ... }
    }
    path: string[]
    message: string
  }>
} | {
  status: "error"
  errors: Array<{
    code: string
    params: {
      type?: { ... }
    }
    path: string[]
    message: string
  }>
}
```

### `EntityValidationV2Error`

```ts
type EntityValidationV2Error = {
  keyword: string
  instance_path: string
  schema_path: string
  params: Record<string, unknown>
  property_name?: string
  message?: string
  schema?: object
  parent_schema?: Record<string, unknown>
  data?: Record<string, unknown>
}
```

### `EntityValidationV2ResultSuccess`

Validation result for a successful validation

```ts
type EntityValidationV2ResultSuccess = {
  status: "success"
  errors: Array<{
    keyword: string
    instance_path: string
    schema_path: string
    params: Record<string, unknown>
    property_name?: string
    message?: string
    schema?: object
    parent_schema?: Record<string, unknown>
    data?: Record<string, unknown>
  }>
}
```

### `EntityValidationV2ResultError`

Validation result for a failed validation

```ts
type EntityValidationV2ResultError = {
  status: "error"
  errors: Array<{
    keyword: string
    instance_path: string
    schema_path: string
    params: Record<string, unknown>
    property_name?: string
    message?: string
    schema?: object
    parent_schema?: Record<string, unknown>
    data?: Record<string, unknown>
  }>
}
```

### `EntityValidationV2Result`

```ts
type EntityValidationV2Result = {
  status: "success"
  errors: Array<{
    keyword: string
    instance_path: string
    schema_path: string
    params: Record<string, unknown>
    property_name?: string
    message?: string
    schema?: object
    parent_schema?: Record<string, unknown>
    data?: Record<string, unknown>
  }>
} | {
  status: "error"
  errors: Array<{
    keyword: string
    instance_path: string
    schema_path: string
    params: Record<string, unknown>
    property_name?: string
    message?: string
    schema?: object
    parent_schema?: Record<string, unknown>
    data?: Record<string, unknown>
  }>
}
```

### `HydratedEntityItem`

```ts
type HydratedEntityItem = {
  _relations: Array<{
    entity_id: string // uuid
  }>
}
```

### `GetRelationsResp`

```ts
type GetRelationsResp = Array<{
  entity_id: string // uuid
  org_id?: string
  _schema?: string
  attribute: string
  _tags?: string[]
  reverse?: boolean
} | {
  $relation?: {
    entity_id: string // uuid
    org_id?: string
    _schema?: string
    attribute: string
    _tags?: string[]
    reverse?: boolean
  }
}>
```

### `GetRelationsRespWithPagination`

```ts
type GetRelationsRespWithPagination = {
  hits?: number
  relations?: Array<{
    entity_id: string // uuid
    org_id?: string
    _schema?: string
    attribute: string
    _tags?: string[]
    reverse?: boolean
  } | {
    $relation?: {
      entity_id: { ... }
      org_id?: { ... }
      _schema?: { ... }
      attribute: { ... }
      _tags?: { ... }
      reverse?: { ... }
    }
  }>
}
```

### `GetRelatedEntitiesCount`

```ts
type GetRelatedEntitiesCount = {
  hits?: number
}
```

### `RelationEntity`

```ts
type RelationEntity = {
  $relation?: {
    entity_id: string // uuid
    org_id?: string
    _schema?: string
    attribute: string
    _tags?: string[]
    reverse?: boolean
  }
}
```

### `RelationItem`

```ts
type RelationItem = {
  entity_id: string // uuid
  org_id?: string
  _schema?: string
  attribute: string
  _tags?: string[]
  reverse?: boolean
}
```

### `EntitySearchIncludeDeletedParam`

Whether to include deleted entities in the search results
- `true`: include deleted entities
- `false`: exclude deleted entities
- `only`: include only deleted entities

By default, no deleted entities are included in the search results.


```ts
type EntitySearchIncludeDeletedParam = "true" | "false" | "only"
```

### `EntitySearchParams`

```ts
type EntitySearchParams = {
  q: string
  include_scores?: boolean
  sort?: string | string[]
  from?: number
  size?: number
  hydrate?: boolean
  fields?: string[]
  aggs?: object
  include_deleted?: "true" | "false" | "only"
  highlight?: unknown
  stable_for?: number
  stable_query_id?: string
  search_after?: string | number[]
}
```

### `EntityListParams`

```ts
type EntityListParams = {
  query?: {
    query_string: {
      query: { ... }
      fields?: { ... }
      default_operator?: { ... }
      lenient?: { ... }
    }
  }
  filter: Array<{
    term?: Record<string, string | number | boolean>
    terms?: Record<string, string | number | boolean[]>
    ids?: {
      values?: { ... }
    }
    range?: Record<string, {
      gt?: { ... }
      gte?: { ... }
      lt?: { ... }
      lte?: { ... }
      format?: { ... }
      relation?: { ... }
      time_zone?: { ... }
    }>
    exists?: {
      field: { ... }
    }
    $and?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $or?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $not?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
  }>
  allow_targeting_all_schemas?: boolean
  sort?: string | string[]
  from?: number
  size?: number
  hydrate?: boolean
  fields?: string[]
  aggs?: object
  include_deleted?: "true" | "false" | "only"
  include_scores?: boolean
  highlight?: unknown
  stable_for?: number
  stable_query_id?: string
  search_after?: string | number[]
}
```

### `SearchFilter`

A subset of simplified Elasticsearch query clauses. The default operator is a logical AND. Use nested $and, $or, $not to combine filters using different logical operators.

```ts
type SearchFilter = Array<{
  term?: Record<string, string | number | boolean>
  terms?: Record<string, string | number | boolean[]>
  ids?: {
    values?: string[]
  }
  range?: Record<string, {
    gt?: string | number | boolean
    gte?: string | number | boolean
    lt?: string | number | boolean
    lte?: string | number | boolean
    format?: string
    relation?: "INTERSECTS" | "CONTAINS" | "WITHIN"
    time_zone?: string
  }>
  exists?: {
    field: string
  }
  $and?: Array<{
    term?: Record<string, string | number | boolean>
    terms?: Record<string, string | number | boolean[]>
    ids?: {
      values?: { ... }
    }
    range?: Record<string, {
      gt?: { ... }
      gte?: { ... }
      lt?: { ... }
      lte?: { ... }
      format?: { ... }
      relation?: { ... }
      time_zone?: { ... }
    }>
    exists?: {
      field: { ... }
    }
    $and?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $or?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $not?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
  }>
  $or?: Array<{
    term?: Record<string, string | number | boolean>
    terms?: Record<string, string | number | boolean[]>
    ids?: {
      values?: { ... }
    }
    range?: Record<string, {
      gt?: { ... }
      gte?: { ... }
      lt?: { ... }
      lte?: { ... }
      format?: { ... }
      relation?: { ... }
      time_zone?: { ... }
    }>
    exists?: {
      field: { ... }
    }
    $and?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
      exists?: { ... }
      $and?: { ... }
      $or?: { ... }
      $not?: { ... }
    }>
    $or?: Array<{
      term?: { ... }
      terms?: { ... }
      ids?: { ... }
      range?: { ... }
  // ...
}
```

### `SearchFilterValue`

A filter field value.

```ts
type SearchFilterValue = string | number | boolean
```

### `EntitySearchOptions`

```ts
type EntitySearchOptions = {
  sort?: string | string[]
  from?: number
  size?: number
  hydrate?: boolean
  fields?: string[]
  aggs?: object
  include_deleted?: "true" | "false" | "only"
  include_scores?: boolean
  stable_for?: number
  stable_query_id?: string
  search_after?: string | number[]
}
```

### `FieldsParam`

List of entity fields to include or exclude in the response

Use ! to exclude fields, e.g. `!_id` to exclude the `_id` field.

Globbing and globstart (**) is supported for nested fields.


```ts
type FieldsParam = string[]
```

### `EntityImportParams`

The parameters for importing entities.

```ts
type EntityImportParams = {
  S3Reference: {
    bucket: string
    key: string
  }
  schema: string
}
```

### `GraphQueryRequest`

```ts
type GraphQueryRequest = {
  seed: {
    entity_id: string // uuid
    node_id: string
  }
  graph: {
    nodes: Array<{
      id: { ... }
      schema: { ... }
      cardinality?: { ... }
      fields?: { ... }
    }>
    edges: Array<{
      from: { ... }
      to: { ... }
    }>
  }
  hydrate?: boolean
}
```

### `GraphSeed`

```ts
type GraphSeed = {
  entity_id: string // uuid
  node_id: string
}
```

### `GraphDefinition`

```ts
type GraphDefinition = {
  nodes: Array<{
    id: string
    schema: string
    cardinality?: "one" | "many"
    fields?: object
  }>
  edges: Array<{
    from: string
    to: string
  }>
}
```

### `GraphNode`

```ts
type GraphNode = {
  id: string
  schema: string
  cardinality?: "one" | "many"
  fields?: object
}
```

### `GraphEdge`

```ts
type GraphEdge = {
  from: string
  to: string
}
```

### `GraphQueryResponse`

```ts
type GraphQueryResponse = {
  nodes?: Record<string, string // uuid[]>
  entityNodes?: Record<string, {
    _id?: object
    _org?: string
    _owners?: Array<{
      org_id: { ... }
      user_id?: { ... }
    }>
    _schema?: string
    _title?: string
    _tags?: string[]
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _deleted_at?: string // date-time
    _acl?: {
      view?: { ... }
      edit?: { ... }
      delete?: { ... }
    }
    _purpose?: string[]
    _purpose_name?: string[]
    _manifest?: string // uuid[]
  } | Array<{
    _id?: object
    _org?: string
    _owners?: Array<{
      org_id: { ... }
      user_id?: { ... }
    }>
    _schema?: string
    _title?: string
    _tags?: string[]
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _deleted_at?: string // date-time
    _acl?: {
      view?: { ... }
      edit?: { ... }
      delete?: { ... }
    }
    _purpose?: string[]
    _purpose_name?: string[]
    _manifest?: string // uuid[]
  }>>
  edges: Array<{
    from: string
    to: string
  }>
}
```

### `EntitySearchResults`

```ts
type EntitySearchResults = {
  hits?: number
  results?: Array<{
    _id?: object
    _org?: string
    _owners?: Array<{
      org_id: { ... }
      user_id?: { ... }
    }>
    _schema?: string
    _title?: string
    _tags?: string[]
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _deleted_at?: string // date-time
    _acl?: {
      view?: { ... }
      edit?: { ... }
      delete?: { ... }
    }
    _purpose?: string[]
    _purpose_name?: string[]
    _manifest?: string // uuid[]
  }>
  aggregations?: object
  stable_query_id?: string
  sort_end?: string | number[]
}
```

### `SearchMappings`

Advanced: explicit Elasticsearch index mapping definitions for entity data


```ts
type SearchMappings = Record<string, {
  index?: boolean
  type?: "keyword" | "text" | "boolean" | "integer" | "long" | "float" | "date" | "flattened" | "nested"
  fields?: unknown
}>
```

### `ActivityId`

See https://github.com/ulid/spec

```ts
type ActivityId = string // ulid
```

### `ActivityCallerContext`

```ts
type ActivityCallerContext = {
  EpilotAuth?: {
    token?: {
      sub?: { ... }
      email?: { ... }
      cognito:username?: { ... }
      custom:ivy_user_id?: { ... }
    }
  }
}
```

### `ActivityType`

A type for the activity. Used to categorize activities in the activity feed and for event subscriptions.

Built-in entity activity types (custom activities can be defined as well):
- EntityCreated
- EntityUpdated
- EntityDeleted
- EntitySoftDeleted
- EntityRestored
- RelationsAdded
- RelationsRemove

```ts
type ActivityType = string
```

### `Activity`

```ts
type Activity = {
  type: string
  title: string
  message: string
  payload?: Record<string, unknown>
  pending?: boolean
}
```

### `EntityOperation`

```ts
type EntityOperation = {
  entity: string // uuid
  org: string
  activity_id?: string // ulid
  activity_type?: string
  operation: "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity" | "relationsAdded" | "relationsRemoved" | "relationsSoftDeleted" | "relationsRestored" | "relationsDeleted"
  params?: {
    id?: string // uuid
    slug?: string
  }
  payload?: {
    _id?: object
    _org?: string
    _owners?: Array<{
      org_id: { ... }
      user_id?: { ... }
    }>
    _schema?: string
    _title?: string
    _tags?: string[]
    _created_at?: string // date-time
    _updated_at?: string // date-time
    _deleted_at?: string // date-time
    _acl?: {
      view?: { ... }
      edit?: { ... }
      delete?: { ... }
    }
    _purpose?: string[]
    _purpose_name?: string[]
    _manifest?: string // uuid[]
  }
  diff?: {
    added?: {
      _id?: { ... }
      _org?: { ... }
      _owners?: { ... }
      _schema?: { ... }
      _title?: { ... }
      _tags?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      _deleted_at?: { ... }
      _acl?: { ... }
      _purpose?: { ... }
      _purpose_name?: { ... }
      _manifest?: { ... }
    }
    updated?: {
      _id?: { ... }
      _org?: { ... }
      _owners?: { ... }
      _schema?: { ... }
      _title?: { ... }
      _tags?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      _deleted_at?: { ... }
      _acl?: { ... }
      _purpose?: { ... }
      _purpose_name?: { ... }
      _manifest?: { ... }
    }
    deleted?: {
      _id?: { ... }
      _org?: { ... }
      _owners?: { ... }
      _schema?: { ... }
      _title?: { ... }
      _tags?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      _deleted_at?: { ... }
      _acl?: { ... }
      _purpose?: { ... }
      _purpose_name?: { ... }
      _manifest?: { ... }
    }
  }
}
```

### `BaseActivityItem`

```ts
type BaseActivityItem = {
  _id?: string // ulid
  timestamp?: string // date-time
  type: string
  title: string
  message: string
  payload?: Record<string, unknown>
  pending?: boolean
  caller?: {
    EpilotAuth?: {
      token?: { ... }
    }
  }
}
```

### `ActivityItem`

```ts
type ActivityItem = {
  operations_total?: number
  operations?: Array<{
    entity: string // uuid
    org: string
    activity_id?: string // ulid
    activity_type?: string
    operation: "createEntity" | "updateEntity" | "deleteEntity" | "softDeleteEntity" | "restoreEntity" | "relationsAdded" | "relationsRemoved" | "relationsSoftDeleted" | "relationsRestored" | "relationsDeleted"
    params?: {
      id?: { ... }
      slug?: { ... }
    }
    payload?: {
      _id?: { ... }
      _org?: { ... }
      _owners?: { ... }
      _schema?: { ... }
      _title?: { ... }
      _tags?: { ... }
      _created_at?: { ... }
      _updated_at?: { ... }
      _deleted_at?: { ... }
      _acl?: { ... }
      _purpose?: { ... }
      _purpose_name?: { ... }
      _manifest?: { ... }
    }
    diff?: {
      added?: { ... }
      updated?: { ... }
      deleted?: { ... }
    }
  }>
}
```

### `BlueprintEntityId`

Reference to blueprint

```ts
type BlueprintEntityId = string // uuid
```

### `ListSavedViewsResults`

```ts
type ListSavedViewsResults = {
  hits?: number
  results?: Array<{
    id?: string // uuid
    created_at?: string
    updated_at?: string
  }>
}
```

### `SavedViewId`

Generated uuid for a saved view

```ts
type SavedViewId = string // uuid
```

### `SavedViewItem`

```ts
type SavedViewItem = {
  id?: string // uuid
  created_at?: string
  updated_at?: string
}
```

### `SavedViewPartial`

A saved entity view

```ts
type SavedViewPartial = {
  slug?: string[]
  name?: string
  org?: string
  shared?: boolean
  isFavoritedBy?: string[]
  created_by?: {
    user_id?: string
  } | {
    source?: "SYSTEM" | "BLUEPRINT"
  }
  ui_config?: Record<string, unknown>
  shared_with?: string[]
}
```

### `SavedView`

A saved entity view

```ts
type SavedView = {
  slug: string[]
  name: string
  org?: string
  shared?: boolean
  isFavoritedBy?: string[]
  created_by?: {
    user_id?: string
  } | {
    source?: "SYSTEM" | "BLUEPRINT"
  }
  ui_config: Record<string, unknown>
  shared_with?: string[]
}
```

### `Taxonomy`

```ts
type Taxonomy = {
  slug?: string
  name?: string
  plural?: string
  kind?: "system" | "user_defined"
  type?: "entity" | "relation" | "system" | "file_collection"
  icon?: string
  color?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  deleted_at?: string // date-time
  created_by?: string
  enabled?: boolean
  order?: number
  enabled_locations?: "account" | "contact" | "contract" | "email_template" | "file" | "journey" | "meter_counter" | "meter" | "opportunity" | "order" | "partner" | "price" | "product" | "submission" | "tax" | "message" | "portal_user" | "request" | "comment" | string[]
}
```

### `TaxonomyLocationId`

```ts
type TaxonomyLocationId = "account" | "contact" | "contract" | "email_template" | "file" | "journey" | "meter_counter" | "meter" | "opportunity" | "order" | "partner" | "price" | "product" | "submission" | "tax" | "message" | "portal_user" | "request" | "comment"
```

### `TaxonomySearchIncludeArchivedParam`

Whether to include archived labels in the search results
- `true`: include archived labels
- `false`: exclude archived labels
- `only`: include only archived labels

By default, no archived labels are included in the search results.


```ts
type TaxonomySearchIncludeArchivedParam = "true" | "false" | "only"
```

### `TaxonomyClassification`

```ts
type TaxonomyClassification = {
  id?: string
  slug: string
  name: string
  parents?: string[]
  color?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  archived?: boolean
  starred?: boolean
  enabled_locations?: "account" | "contact" | "contract" | "email_template" | "file" | "journey" | "meter_counter" | "meter" | "opportunity" | "order" | "partner" | "price" | "product" | "submission" | "tax" | "message" | "portal_user" | "request" | "comment" | string[]
  enabled_purposes?: string[]
  _manifest?: string // uuid[]
}
```

### `ClassificationId`

```ts
type ClassificationId = string
```

### `ClassificationIdOrPattern`

```ts
type ClassificationIdOrPattern = string | {
  pattern: string
}
```

### `ClassificationSlug`

URL-friendly identifier for the classification

```ts
type ClassificationSlug = string
```

### `TaxonomySlug`

URL-friendly name for taxonomy

```ts
type TaxonomySlug = string
```

### `ClassificationsUpdate`

```ts
type ClassificationsUpdate = {
  create?: Array<{
    id?: string
    slug: string
    name: string
    parents?: string[]
    color?: string
    created_at?: string // date-time
    updated_at?: string // date-time
    archived?: boolean
    starred?: boolean
    enabled_locations?: "account" | "contact" | "contract" | "email_template" | "file" | "journey" | "meter_counter" | "meter" | "opportunity" | "order" | "partner" | "price" | "product" | "submission" | "tax" | "message" | "portal_user" | "request" | "comment" | string[]
    enabled_purposes?: string[]
    _manifest?: string // uuid[]
  }>
  update?: Array<{
    id?: string
    slug: string
    name: string
    parents?: string[]
    color?: string
    created_at?: string // date-time
    updated_at?: string // date-time
    archived?: boolean
    starred?: boolean
    enabled_locations?: "account" | "contact" | "contract" | "email_template" | "file" | "journey" | "meter_counter" | "meter" | "opportunity" | "order" | "partner" | "price" | "product" | "submission" | "tax" | "message" | "portal_user" | "request" | "comment" | string[]
    enabled_purposes?: string[]
    _manifest?: string // uuid[]
  }>
  delete?: string | string[]
}
```

### `TaxonomyBulkJobTriggerResponse`

```ts
type TaxonomyBulkJobTriggerResponse = {
  job_id?: string // uuid
  status?: "PENDING" | "FAILED" | "COMPLETED" | "CANCELLED"
}
```

### `TaxonomyBulkJobStatus`

The status of the bulk job

```ts
type TaxonomyBulkJobStatus = "PENDING" | "FAILED" | "COMPLETED" | "CANCELLED"
```

### `TaxonomyBulkJobActionType`

```ts
type TaxonomyBulkJobActionType = "MOVE_CLASSIFICATIONS" | "MERGE_CLASSIFICATIONS" | "DELETE_CLASSIFICATIONS"
```

### `TaxonomyBulkJob`

```ts
type TaxonomyBulkJob = {
  job_id?: string // uuid
  job_status?: "PENDING" | "FAILED" | "COMPLETED" | "CANCELLED"
  failure_reason?: string
  action_type?: "MOVE_CLASSIFICATIONS" | "MERGE_CLASSIFICATIONS" | "DELETE_CLASSIFICATIONS"
  request?: {
    target_taxonomy?: string
    target_classification?: string
    classification_ids?: string[]
  }
  output?: {
    target_entities_count?: number
    affected_entities_count?: number
    failures_count?: number
    failed_entities?: string // uuid[]
  }
  created_by?: string
  created_at?: string // date-time
  updated_at?: string // date-time
  org?: string
}
```

### `ESClusterAssignment`

```ts
type ESClusterAssignment = {
  orgId?: string
  cluster?: string
}
```

### `SettingFlag`

```ts
type SettingFlag = {
  name?: string
  enabled?: boolean
}
```

### `ErrorObject`

A generic error returned by the API

```ts
type ErrorObject = {
  status?: number
  error?: string
}
```
