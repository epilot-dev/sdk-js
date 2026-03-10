# Entity API

**API Name:** `entity`
**Base URL:** `https://entity.sls.epilot.io`

Flexible data layer for epilot Entities.

Use this API configure and access your business objects like Contacts, Opportu

## Operations

| Operation | Method | Path | Summary |
| --------- | ------ | ---- | ------- |
| `listSchemas` | GET | `/v1/entity/schemas` | listSchemas |
| `getSchema` | GET | `/v1/entity/schemas/{slug}` | getSchema |
| `putSchema` | PUT | `/v1/entity/schemas/{slug}` | putSchema |
| `deleteSchema` | DELETE | `/v1/entity/schemas/{slug}` | deleteSchema |
| `getJsonSchema` | GET | `/v1/entity/schemas/{slug}/json/schema` | getJsonSchema |
| `getSchemaExample` | GET | `/v1/entity/schemas/{slug}/json/example` | getSchemaExample |
| `getSchemaVersions` | GET | `/v1/entity/schemas/{slug}/versions` | getSchemaVersions |
| `listAvailableCapabilities` | GET | `/v1/entity/schemas/{slug}/capabilities/available` | listAvailableCapabilities |
| `listSchemaBlueprints` | GET | `/v1/entity/schemas/blueprints` | listSchemaBlueprints |
| `searchEntities` | POST | `/v1/entity:search` | searchEntities |
| `listEntities` | POST | `/v1/entity:list` | listEntities |
| `queryEntityGraph` | POST | `/v1/entity:graph` | queryEntityGraph |
| `createEntity` | POST | `/v1/entity/{slug}` | createEntity |
| `validateEntity` | POST | `/v1/entity/{slug}:validate` | validateEntity |
| `validateEntityV2` | POST | `/v2/entity/{slug}:validate` | validateEntityV2 |
| `upsertEntity` | PATCH | `/v1/entity/{slug}:upsert` | upsertEntity |
| `getEntityV2` | GET | `/v2/entity/{slug}/{id}` | getEntityV2 |
| `restoreEntity` | PATCH | `/v1/entity/{slug}/{id}:restore` | restoreEntity |
| `reindexEntity` | POST | `/v1/entity/{slug}/{id}:reindex` | reindexEntity |
| `getEntity` | GET | `/v1/entity/{slug}/{id}` | getEntity |
| `updateEntity` | PUT | `/v1/entity/{slug}/{id}` | updateEntity |
| `patchEntity` | PATCH | `/v1/entity/{slug}/{id}` | patchEntity |
| `deleteEntity` | DELETE | `/v1/entity/{slug}/{id}` | deleteEntity |
| `autocomplete` | GET | `/v1/entity:autocomplete` | autocomplete |
| `wipeAllEntities` | POST | `/v1/entity:wipeAllEntities` | wipeAllEntities |
| `createActivity` | POST | `/v1/entity/activity` | createActivity |
| `getActivity` | GET | `/v1/entity/activity/{id}` | getActivity |
| `attachActivity` | POST | `/v1/entity/activity/{id}:attach` | attachActivity |
| `getEntityActivityFeed` | GET | `/v1/entity/{slug}/{id}/activity` | getEntityActivityFeed |
| `getRelations` | GET | `/v1/entity/{slug}/{id}/relations` | getRelations |
| `addRelations` | POST | `/v1/entity/{slug}/{id}/relations` | addRelations |
| `removeRelations` | DELETE | `/v1/entity/{slug}/{id}/relations` | removeRelations |
| `getRelationsV2` | GET | `/v2/entity/{slug}/{id}/relations` | getRelationsV2 |
| `getRelationsV3` | GET | `/v3/entity/{slug}/{id}/relations` | getRelationsV3 |
| `getRelatedEntitiesCount` | GET | `/v2/entity/{slug}/{id}/relations/count` | getRelatedEntitiesCount |
| `updateRelation` | PUT | `/v1/entity/{slug}/{id}/relations/{attribute}/{entity_id}` | updateRelation |
| `deleteRelation` | DELETE | `/v1/entity/{slug}/{id}/relations/{attribute}/{entity_id}` | deleteRelation |
| `exportEntities` | POST | `/v1/entity:export` | exportEntities |
| `importEntities` | POST | `/v1/entity:import` | Import Entities |
| `listSavedViews` | GET | `/v1/entity/views` | listSavedViews |
| `createSavedView` | POST | `/v1/entity/view` | createSavedView |
| `getSavedView` | GET | `/v1/entity/view/{id}` | getSavedView |
| `updateSavedView` | PUT | `/v1/entity/view/{id}` | updateSavedView |
| `patchSavedView` | PATCH | `/v1/entity/view/{id}` | patchSavedView |
| `deleteSavedView` | DELETE | `/v1/entity/view/{id}` | deleteSavedView |
| `listFavoriteViewsForUser` | GET | `/v1/entity/views/favorites` | listFavoriteViewsForUser |
| `listTaxonomies` | GET | `/v1/entity/taxonomies` | listTaxonomies |
| `createTaxonomy` | POST | `/v1/entity/taxonomies` | createTaxonomy |
| `getTaxonomy` | GET | `/v1/entity/taxonomies/{taxonomySlug}` | getTaxonomy |
| `updateTaxonomy` | PUT | `/v1/entity/taxonomies/{taxonomySlug}` | updateTaxonomy |
| `deleteTaxonomy` | DELETE | `/v1/entity/taxonomies/{taxonomySlug}` | deleteTaxonomy |
| `updateClassificationsForTaxonomy` | POST | `/v1/entity/taxonomies/{taxonomySlug}/classifications` | updateClassificationsForTaxonomy |
| `createTaxonomyClassification` | POST | `/v2/entity/taxonomies/classifications` | createTaxonomyClassification |
| `getTaxonomyClassification` | GET | `/v2/entity/taxonomies/classifications/{classificationSlug}` | getTaxonomyClassification |
| `updateTaxonomyClassification` | PUT | `/v2/entity/taxonomies/classifications/{classificationSlug}` | updateTaxonomyClassification |
| `deleteTaxonomyClassification` | DELETE | `/v2/entity/taxonomies/classifications/{classificationSlug}` | deleteTaxonomyClassification |
| `taxonomyAutocomplete` | GET | `/v1/entity/taxonomies/{taxonomySlug}:autocomplete` | taxonomyAutocomplete |
| `taxonomiesClassificationsSearch` | POST | `/v1/entity/taxonomies/classifications:search` | taxonomiesClassificationsSearch |
| `listTaxonomyClassificationsForSchema` | GET | `/v1/entity/schemas/{slug}/taxonomy/{taxonomySlug}` | listTaxonomyClassificationsForSchema |
| `getTaxonomyBulkActionJobs` | GET | `/v1/entity/taxonomies/bulk-jobs` | getTaxonomyBulkActionJobs |
| `getTaxonomyBulkActionJobById` | GET | `/v1/entity/taxonomies/bulk-jobs/{job_id}` | getTaxonomyBulkActionJobById |
| `cancelBulkAction` | POST | `/v1/entity/taxonomies/bulk-jobs/{job_id}/cancel` | cancelBulkAction |
| `bulkMoveClassifications` | POST | `/v1/entity/taxonomies/classifications:move` | bulkMoveClassifications |
| `bulkMergeClassifications` | POST | `/v1/entity/taxonomies/classifications:merge` | bulkMergeClassifications |
| `bulkDeleteClassifications` | POST | `/v1/entity/taxonomies/classifications:delete` | bulkDeleteClassifications |
| `createSchemaAttribute` | POST | `/v1/entity/schemas/attributes` | createSchemaAttribute |
| `getSchemaAttribute` | GET | `/v1/entity/schemas/attributes/{composite_id}` | getSchemaAttribute |
| `putSchemaAttribute` | PUT | `/v1/entity/schemas/attributes/{composite_id}` | putSchemaAttribute |
| `deleteSchemaAttribute` | DELETE | `/v1/entity/schemas/attributes/{composite_id}` | deleteSchemaAttribute |
| `createSchemaCapability` | POST | `/v1/entity/schemas/capabilities` | createSchemaCapability |
| `getSchemaCapability` | GET | `/v1/entity/schemas/capabilities/{composite_id}` | getSchemaCapability |
| `putSchemaCapability` | PUT | `/v1/entity/schemas/capabilities/{composite_id}` | putSchemaCapability |
| `deleteSchemaCapability` | DELETE | `/v1/entity/schemas/capabilities/{composite_id}` | deleteSchemaCapability |
| `createSchemaGroup` | POST | `/v1/entity/schemas/group` | createSchemaGroup |
| `getSchemaGroup` | GET | `/v1/entity/schemas/group/{composite_id}` | getSchemaGroup |
| `putSchemaGroup` | PUT | `/v1/entity/schemas/group/{composite_id}` | putSchemaGroup |
| `deleteSchemaGroup` | DELETE | `/v1/entity/schemas/group/{composite_id}` | deleteSchemaGroup |
| `createSchemaGroupHeadline` | POST | `/v1/entity/schemas/headline` | createSchemaGroupHeadline |
| `getSchemaGroupHeadline` | GET | `/v1/entity/schemas/headline/{composite_id}` | getSchemaGroupHeadline |
| `putSchemaGroupHeadline` | PUT | `/v1/entity/schemas/headline/{composite_id}` | putSchemaGroupHeadline |
| `deleteSchemaGroupHeadline` | DELETE | `/v1/entity/schemas/headline/{composite_id}` | deleteSchemaGroupHeadline |

## Usage

```bash
epilot entity listSchemas
```
