import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type AccessibleTo = string;
        export type CreatedAfter = string; // date-time
        export type CreatedBefore = string; // date-time
        export type CreatedBy = string;
        export type Favorite = boolean;
        export type FavoritesFirst = boolean;
        export type Limit = number;
        export type Offset = number;
        export type Order = "asc" | "desc";
        export type Owner = string[];
        export type Search = string;
        export type SharedWith = string[];
        export type Sort = "created_at" | "updated_at" | "name" | "title";
        export type TagsFilter = string[];
        export type TagsMatch = "any" | "all";
        export type UpdatedAfter = string; // date-time
        export type UpdatedBefore = string; // date-time
        export type VisualisationIdFilter = /**
         * Unique identifier for a Visualisation
         * example:
         * timechart
         */
        Schemas.VisualisationId[];
    }
    export interface QueryParameters {
        Search?: Parameters.Search;
        VisualisationIdFilter?: Parameters.VisualisationIdFilter;
        TagsFilter?: Parameters.TagsFilter;
        TagsMatch?: Parameters.TagsMatch;
        CreatedBy?: Parameters.CreatedBy;
        CreatedAfter?: Parameters.CreatedAfter /* date-time */;
        CreatedBefore?: Parameters.CreatedBefore /* date-time */;
        UpdatedAfter?: Parameters.UpdatedAfter /* date-time */;
        UpdatedBefore?: Parameters.UpdatedBefore /* date-time */;
        SharedWith?: Parameters.SharedWith;
        Owner?: Parameters.Owner;
        AccessibleTo?: Parameters.AccessibleTo;
        Favorite?: Parameters.Favorite;
        FavoritesFirst?: Parameters.FavoritesFirst;
        Sort?: Parameters.Sort;
        Order?: Parameters.Order;
        Limit?: Parameters.Limit;
        Offset?: Parameters.Offset;
    }
    namespace Schemas {
        /**
         * Ownership and sharing metadata common to dashboards and insights. `created_*`/`updated_*`
         * fields are managed by the server. `owners`, `shared_with` and `org_access` describe who
         * may access the resource. New resources are private to their creator until shared.
         *
         */
        export interface AccessControl {
            /**
             * Id of the user who created the resource
             * example:
             * 10598
             */
            created_by?: string;
            created_at?: string; // date-time
            /**
             * Id of the user who last updated the resource
             * example:
             * 10598
             */
            updated_by?: string;
            updated_at?: string; // date-time
            /**
             * Id of the organisation that owns the resource. Set at creation time and immutable.
             * example:
             * 739224
             */
            owner_org_id?: string;
            /**
             * User ids with full control over the resource (view, edit, delete and manage sharing).
             * The creator is always an owner. There must always be at least one owner.
             *
             * example:
             * [
             *   "10598"
             * ]
             */
            owners?: string[];
            /**
             * Per-user sharing grants
             */
            shared_with?: /* Grants a single user a permission level on a resource */ ShareGrant[];
            org_access?: /**
             * Optional organization-wide grant. When set, every user in the resource's organization
             * is granted this permission level. `null` (or omitted) means the resource is not shared
             * org-wide.
             *
             * example:
             * view
             */
            OrgAccess;
        }
        /**
         * Sharing fields that can be mutated via PATCH (owners only). `owners` and `shared_with` are
         * full replacements of their arrays, not merges — omit a field to leave it unchanged.
         *
         */
        export interface AccessControlUpdate {
            /**
             * Replaces the entire list of owner user ids. Must keep at least one owner (else 400).
             * Omit to leave owners unchanged.
             *
             */
            owners?: string[];
            /**
             * Replaces the entire list of per-user grants — any existing grant not included is removed.
             * Omit to leave sharing unchanged; send an empty array to revoke all per-user grants.
             *
             */
            shared_with?: /* Grants a single user a permission level on a resource */ ShareGrant[];
            org_access?: /**
             * Optional organization-wide grant. When set, every user in the resource's organization
             * is granted this permission level. `null` (or omitted) means the resource is not shared
             * org-wide.
             *
             * example:
             * view
             */
            OrgAccess;
        }
        /**
         * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
         * position insights (saved charts). Tiles may reference an insight by `insight_id`
         * or, for backwards compatibility, embed a visualisation inline.
         *
         */
        export interface Dashboard {
            /**
             * Id of the user who created the resource
             * example:
             * 10598
             */
            created_by?: string;
            created_at?: string; // date-time
            /**
             * Id of the user who last updated the resource
             * example:
             * 10598
             */
            updated_by?: string;
            updated_at?: string; // date-time
            /**
             * Id of the organisation that owns the resource. Set at creation time and immutable.
             * example:
             * 739224
             */
            owner_org_id?: string;
            /**
             * User ids with full control over the resource (view, edit, delete and manage sharing).
             * The creator is always an owner. There must always be at least one owner.
             *
             * example:
             * [
             *   "10598"
             * ]
             */
            owners?: string[];
            /**
             * Per-user sharing grants
             */
            shared_with?: /* Grants a single user a permission level on a resource */ ShareGrant[];
            org_access?: /**
             * Optional organization-wide grant. When set, every user in the resource's organization
             * is granted this permission level. `null` (or omitted) means the resource is not shared
             * org-wide.
             *
             * example:
             * view
             */
            OrgAccess;
            id?: /**
             * Unique identifier for dashboard
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            DashboardID /* uuid */;
            /**
             * example:
             * Employee Dashboard
             */
            title: string;
            /**
             * example:
             * [
             *   {
             *     "id": "e4af1297-1fd6-440f-9846-f475f580d40f",
             *     "coordinates": {},
             *     "insight_id": "8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e"
             *   }
             * ]
             */
            tiles: /**
             * A positioned tile on a dashboard canvas. A tile references a saved insight via
             * `insight_id`. Inline `visualisation_id`/`visualisation_config` remain supported for
             * backwards compatibility (ad-hoc tiles that are not backed by a shared insight).
             *
             */
            DashboardTile[];
            /**
             * Whether the requesting user has favorited this dashboard.
             * example:
             * false
             */
            favorited?: boolean;
        }
        /**
         * Unique identifier for dashboard
         * example:
         * 3fa85f64-5717-4562-b3fc-2c963f66afa6
         */
        export type DashboardID = string; // uuid
        /**
         * Fields that can be partially updated on a dashboard
         */
        export interface DashboardPatch {
            /**
             * Replaces the entire list of owner user ids. Must keep at least one owner (else 400).
             * Omit to leave owners unchanged.
             *
             */
            owners?: string[];
            /**
             * Replaces the entire list of per-user grants — any existing grant not included is removed.
             * Omit to leave sharing unchanged; send an empty array to revoke all per-user grants.
             *
             */
            shared_with?: /* Grants a single user a permission level on a resource */ ShareGrant[];
            org_access?: /**
             * Optional organization-wide grant. When set, every user in the resource's organization
             * is granted this permission level. `null` (or omitted) means the resource is not shared
             * org-wide.
             *
             * example:
             * view
             */
            OrgAccess;
            /**
             * example:
             * Employee Dashboard
             */
            title?: string;
            tiles?: /**
             * A positioned tile on a dashboard canvas. A tile references a saved insight via
             * `insight_id`. Inline `visualisation_id`/`visualisation_config` remain supported for
             * backwards compatibility (ad-hoc tiles that are not backed by a shared insight).
             *
             */
            DashboardTile[];
        }
        /**
         * A positioned tile on a dashboard canvas. A tile references a saved insight via
         * `insight_id`. Inline `visualisation_id`/`visualisation_config` remain supported for
         * backwards compatibility (ad-hoc tiles that are not backed by a shared insight).
         *
         */
        export interface DashboardTile {
            id?: /**
             * Unique identifier for a tile in a dashboard
             * example:
             * e4af1297-1fd6-440f-9846-f475f580d40f
             */
            DashboardTileID /* uuid */;
            coordinates?: {
                [key: string]: any;
            };
            /**
             * example:
             * Number of opportunities created by journeys every month
             */
            title?: string;
            /**
             * Reference to a saved insight rendered by this tile
             */
            insight_id?: /**
             * Unique identifier for an insight (a saved chart / visualisation)
             * example:
             * 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
             */
            InsightID /* uuid */;
            visualisation_id?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            visualisation_config?: VisualisationConfig;
        }
        /**
         * Unique identifier for a tile in a dashboard
         * example:
         * e4af1297-1fd6-440f-9846-f475f580d40f
         */
        export type DashboardTileID = string; // uuid
        export interface DatalakeQuery {
            [name: string]: any;
            /**
             * example:
             * entity_operations
             */
            dataset?: string;
            /**
             * example:
             * count_operations
             */
            measure?: string;
            dimensions?: {
                [name: string]: any;
            }[];
            filters?: {
                [name: string]: any;
            }[];
        }
        export interface Example {
            id?: /**
             * Unique identifier for a visualisation examples for tiles in a dashboard
             * example:
             * e4af1297-1fd6-440f-9846-f475f580d40f
             */
            ExampleID /* uuid */;
            /**
             * example:
             * Number of opportunities created by journeys every month
             */
            title?: string;
            visualisation?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            query?: DatalakeQuery;
        }
        /**
         * Unique identifier for a visualisation examples for tiles in a dashboard
         * example:
         * e4af1297-1fd6-440f-9846-f475f580d40f
         */
        export type ExampleID = string; // uuid
        /**
         * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
         * Insights exist independently of dashboards: they can be created, shared and edited on their
         * own, and referenced by one or more dashboard tiles via `insight_id`.
         *
         */
        export interface Insight {
            /**
             * Id of the user who created the resource
             * example:
             * 10598
             */
            created_by?: string;
            created_at?: string; // date-time
            /**
             * Id of the user who last updated the resource
             * example:
             * 10598
             */
            updated_by?: string;
            updated_at?: string; // date-time
            /**
             * Id of the organisation that owns the resource. Set at creation time and immutable.
             * example:
             * 739224
             */
            owner_org_id?: string;
            /**
             * User ids with full control over the resource (view, edit, delete and manage sharing).
             * The creator is always an owner. There must always be at least one owner.
             *
             * example:
             * [
             *   "10598"
             * ]
             */
            owners?: string[];
            /**
             * Per-user sharing grants
             */
            shared_with?: /* Grants a single user a permission level on a resource */ ShareGrant[];
            org_access?: /**
             * Optional organization-wide grant. When set, every user in the resource's organization
             * is granted this permission level. `null` (or omitted) means the resource is not shared
             * org-wide.
             *
             * example:
             * view
             */
            OrgAccess;
            id?: /**
             * Unique identifier for an insight (a saved chart / visualisation)
             * example:
             * 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
             */
            InsightID /* uuid */;
            /**
             * Human readable name of the insight
             * example:
             * Opportunities created by journeys every month
             */
            name: string;
            /**
             * example:
             * Monthly count of opportunities grouped by source journey
             */
            description?: string;
            visualisation_id: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            visualisation_config?: VisualisationConfig;
            tags?: /**
             * Free-form labels for grouping and filtering insights
             * example:
             * [
             *   "revenue",
             *   "marketing"
             * ]
             */
            Tags;
        }
        /**
         * Unique identifier for an insight (a saved chart / visualisation)
         * example:
         * 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
         */
        export type InsightID = string; // uuid
        /**
         * Fields that can be partially updated on an insight
         */
        export interface InsightPatch {
            /**
             * Replaces the entire list of owner user ids. Must keep at least one owner (else 400).
             * Omit to leave owners unchanged.
             *
             */
            owners?: string[];
            /**
             * Replaces the entire list of per-user grants — any existing grant not included is removed.
             * Omit to leave sharing unchanged; send an empty array to revoke all per-user grants.
             *
             */
            shared_with?: /* Grants a single user a permission level on a resource */ ShareGrant[];
            org_access?: /**
             * Optional organization-wide grant. When set, every user in the resource's organization
             * is granted this permission level. `null` (or omitted) means the resource is not shared
             * org-wide.
             *
             * example:
             * view
             */
            OrgAccess;
            name?: string;
            description?: string;
            visualisation_id?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            visualisation_config?: VisualisationConfig;
            tags?: /**
             * Free-form labels for grouping and filtering insights
             * example:
             * [
             *   "revenue",
             *   "marketing"
             * ]
             */
            Tags;
        }
        /**
         * Optional organization-wide grant. When set, every user in the resource's organization
         * is granted this permission level. `null` (or omitted) means the resource is not shared
         * org-wide.
         *
         * example:
         * view
         */
        export type OrgAccess = /**
         * Optional organization-wide grant. When set, every user in the resource's organization
         * is granted this permission level. `null` (or omitted) means the resource is not shared
         * org-wide.
         *
         * example:
         * view
         */
        ("view" | "edit") | (null);
        /**
         * Offset-based pagination metadata for list responses
         */
        export interface Pagination {
            /**
             * Total number of results matching the query (ignoring limit/offset)
             */
            total: number;
            /**
             * Page size used for this response
             */
            limit: number;
            /**
             * Number of results skipped before this page
             */
            offset: number;
            /**
             * Whether more results exist beyond this page
             */
            has_more: boolean;
        }
        /**
         * Grants a single user a permission level on a resource
         */
        export interface ShareGrant {
            /**
             * The id of the user the resource is shared with
             * example:
             * 10598
             */
            user_id: string;
            permission: /**
             * Permission level granted to a user (or the whole organization) on a shared resource.
             * `view` allows read-only access; `edit` additionally allows updating the content.
             * Full control (delete and managing sharing) is reserved for owners.
             *
             * example:
             * view
             */
            SharePermission;
        }
        /**
         * Permission level granted to a user (or the whole organization) on a shared resource.
         * `view` allows read-only access; `edit` additionally allows updating the content.
         * Full control (delete and managing sharing) is reserved for owners.
         *
         * example:
         * view
         */
        export type SharePermission = "view" | "edit";
        /**
         * Free-form labels for grouping and filtering insights
         * example:
         * [
         *   "revenue",
         *   "marketing"
         * ]
         */
        export type Tags = string[];
        export interface TimechartVisualisationConfig {
            query?: DatalakeQuery;
            /**
             * example:
             * {
             *   "type": "bar"
             * }
             */
            options?: {
                [name: string]: any;
            };
        }
        /**
         * A Visualisation that can be used to configure tiles in dashboards
         */
        export interface Visualisation {
            visualisation?: /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            VisualisationId;
            /**
             * example:
             * Time Series Visualisation
             */
            title?: string;
            description?: string;
            /**
             * Package name of the Visualisation MFE bundle to import
             * example:
             * @epilot360/highcharts
             */
            package_name?: string;
            /**
             * URL to Visualisation MFE bundle to import
             * example:
             * https://epilot-dashboard-visualisations.epilot.io/epilot360-datalake-visualisation/bundle.js?version=1650592827
             */
            import_url?: string; // uri
        }
        export type VisualisationConfig = TimechartVisualisationConfig;
        /**
         * Unique identifier for a Visualisation
         * example:
         * timechart
         */
        export type VisualisationId = "kpi" | "funnel" | "toplist" | "timechart" | "pie" | "bar" | "entity_list" | "markdown" | "news_feed" | "workflow";
    }
}
declare namespace Paths {
    namespace CreateDashboard {
        export type RequestBody = /**
         * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
         * position insights (saved charts). Tiles may reference an insight by `insight_id`
         * or, for backwards compatibility, embed a visualisation inline.
         *
         */
        Components.Schemas.Dashboard;
        namespace Responses {
            export type $201 = /**
             * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
             * position insights (saved charts). Tiles may reference an insight by `insight_id`
             * or, for backwards compatibility, embed a visualisation inline.
             *
             */
            Components.Schemas.Dashboard;
        }
    }
    namespace CreateInsight {
        export type RequestBody = /**
         * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
         * Insights exist independently of dashboards: they can be created, shared and edited on their
         * own, and referenced by one or more dashboard tiles via `insight_id`.
         *
         */
        Components.Schemas.Insight;
        namespace Responses {
            export type $201 = /**
             * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
             * Insights exist independently of dashboards: they can be created, shared and edited on their
             * own, and referenced by one or more dashboard tiles via `insight_id`.
             *
             */
            Components.Schemas.Insight;
        }
    }
    namespace DeleteDashboard {
        namespace Responses {
            export type $200 = /**
             * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
             * position insights (saved charts). Tiles may reference an insight by `insight_id`
             * or, for backwards compatibility, embed a visualisation inline.
             *
             */
            Components.Schemas.Dashboard;
        }
    }
    namespace DeleteInsight {
        namespace Responses {
            export type $200 = /**
             * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
             * Insights exist independently of dashboards: they can be created, shared and edited on their
             * own, and referenced by one or more dashboard tiles via `insight_id`.
             *
             */
            Components.Schemas.Insight;
        }
    }
    namespace FavoriteDashboard {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace GetDashboard {
        namespace Responses {
            export type $200 = /**
             * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
             * position insights (saved charts). Tiles may reference an insight by `insight_id`
             * or, for backwards compatibility, embed a visualisation inline.
             *
             */
            Components.Schemas.Dashboard;
        }
    }
    namespace GetInsight {
        namespace Responses {
            export type $200 = /**
             * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
             * Insights exist independently of dashboards: they can be created, shared and edited on their
             * own, and referenced by one or more dashboard tiles via `insight_id`.
             *
             */
            Components.Schemas.Insight;
        }
    }
    namespace ListAvailableExamples {
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.Example[];
            }
        }
    }
    namespace ListAvailableVisualisations {
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * [
                 *   {
                 *     "visualisation": "timechart",
                 *     "title": "Time Series Visualisation",
                 *     "description": "Visualise your metrics with respect to time series",
                 *     "package_name": "@epilot360/highcharts"
                 *   },
                 *   {
                 *     "visualisation": "kpi",
                 *     "title": "KPI Visualisation",
                 *     "description": "Visualise your key performance indicators",
                 *     "package_name": "@epilot360/kpi"
                 *   }
                 * ]
                 */
                results?: /* A Visualisation that can be used to configure tiles in dashboards */ Components.Schemas.Visualisation[];
            }
        }
    }
    namespace ListDashboards {
        namespace Parameters {
            export type AccessibleTo = string;
            export type CreatedAfter = string; // date-time
            export type CreatedBefore = string; // date-time
            export type CreatedBy = string;
            export type Favorite = boolean;
            export type FavoritesFirst = boolean;
            export type Limit = number;
            export type Offset = number;
            export type Order = "asc" | "desc";
            export type Owner = string[];
            export type Q = string;
            export type SharedWith = string[];
            export type Sort = "created_at" | "updated_at" | "name" | "title";
            export type UpdatedAfter = string; // date-time
            export type UpdatedBefore = string; // date-time
        }
        export interface QueryParameters {
            q?: Parameters.Q;
            created_by?: Parameters.CreatedBy;
            created_after?: Parameters.CreatedAfter /* date-time */;
            created_before?: Parameters.CreatedBefore /* date-time */;
            updated_after?: Parameters.UpdatedAfter /* date-time */;
            updated_before?: Parameters.UpdatedBefore /* date-time */;
            shared_with?: Parameters.SharedWith;
            owner?: Parameters.Owner;
            accessible_to?: Parameters.AccessibleTo;
            favorite?: Parameters.Favorite;
            favorites_first?: Parameters.FavoritesFirst;
            sort?: Parameters.Sort;
            order?: Parameters.Order;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                results: /**
                 * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
                 * position insights (saved charts). Tiles may reference an insight by `insight_id`
                 * or, for backwards compatibility, embed a visualisation inline.
                 *
                 */
                Components.Schemas.Dashboard[];
                pagination: /* Offset-based pagination metadata for list responses */ Components.Schemas.Pagination;
            }
        }
    }
    namespace ListFavoriteDashboardIds {
        namespace Responses {
            export interface $200 {
                dashboard_ids: /**
                 * Unique identifier for dashboard
                 * example:
                 * 3fa85f64-5717-4562-b3fc-2c963f66afa6
                 */
                Components.Schemas.DashboardID /* uuid */[];
                total: number;
            }
        }
    }
    namespace ListInsightTags {
        namespace Responses {
            export interface $200 {
                results?: string[];
            }
        }
    }
    namespace ListInsights {
        namespace Parameters {
            export type AccessibleTo = string;
            export type CreatedAfter = string; // date-time
            export type CreatedBefore = string; // date-time
            export type CreatedBy = string;
            export type Limit = number;
            export type Offset = number;
            export type Order = "asc" | "desc";
            export type Owner = string[];
            export type Q = string;
            export type SharedWith = string[];
            export type Sort = "created_at" | "updated_at" | "name" | "title";
            export type Tags = string[];
            export type TagsMatch = "any" | "all";
            export type UpdatedAfter = string; // date-time
            export type UpdatedBefore = string; // date-time
            export type VisualisationId = /**
             * Unique identifier for a Visualisation
             * example:
             * timechart
             */
            Components.Schemas.VisualisationId[];
        }
        export interface QueryParameters {
            q?: Parameters.Q;
            visualisation_id?: Parameters.VisualisationId;
            tags?: Parameters.Tags;
            tags_match?: Parameters.TagsMatch;
            created_by?: Parameters.CreatedBy;
            created_after?: Parameters.CreatedAfter /* date-time */;
            created_before?: Parameters.CreatedBefore /* date-time */;
            updated_after?: Parameters.UpdatedAfter /* date-time */;
            updated_before?: Parameters.UpdatedBefore /* date-time */;
            shared_with?: Parameters.SharedWith;
            owner?: Parameters.Owner;
            accessible_to?: Parameters.AccessibleTo;
            sort?: Parameters.Sort;
            order?: Parameters.Order;
            limit?: Parameters.Limit;
            offset?: Parameters.Offset;
        }
        namespace Responses {
            export interface $200 {
                results: /**
                 * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
                 * Insights exist independently of dashboards: they can be created, shared and edited on their
                 * own, and referenced by one or more dashboard tiles via `insight_id`.
                 *
                 */
                Components.Schemas.Insight[];
                pagination: /* Offset-based pagination metadata for list responses */ Components.Schemas.Pagination;
            }
        }
    }
    namespace PatchDashboard {
        export type RequestBody = /* Fields that can be partially updated on a dashboard */ Components.Schemas.DashboardPatch;
        namespace Responses {
            export type $200 = /**
             * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
             * position insights (saved charts). Tiles may reference an insight by `insight_id`
             * or, for backwards compatibility, embed a visualisation inline.
             *
             */
            Components.Schemas.Dashboard;
        }
    }
    namespace PatchInsight {
        export type RequestBody = /* Fields that can be partially updated on an insight */ Components.Schemas.InsightPatch;
        namespace Responses {
            export type $200 = /**
             * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
             * Insights exist independently of dashboards: they can be created, shared and edited on their
             * own, and referenced by one or more dashboard tiles via `insight_id`.
             *
             */
            Components.Schemas.Insight;
        }
    }
    namespace PutDashboard {
        export type RequestBody = /**
         * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
         * position insights (saved charts). Tiles may reference an insight by `insight_id`
         * or, for backwards compatibility, embed a visualisation inline.
         *
         */
        Components.Schemas.Dashboard;
        namespace Responses {
            export type $200 = /**
             * A dashboard configuration. A dashboard is a canvas whose tiles arrange and
             * position insights (saved charts). Tiles may reference an insight by `insight_id`
             * or, for backwards compatibility, embed a visualisation inline.
             *
             */
            Components.Schemas.Dashboard;
        }
    }
    namespace PutInsight {
        export type RequestBody = /**
         * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
         * Insights exist independently of dashboards: they can be created, shared and edited on their
         * own, and referenced by one or more dashboard tiles via `insight_id`.
         *
         */
        Components.Schemas.Insight;
        namespace Responses {
            export type $200 = /**
             * An insight is a saved, reusable chart definition (a visualisation plus its query/options).
             * Insights exist independently of dashboards: they can be created, shared and edited on their
             * own, and referenced by one or more dashboard tiles via `insight_id`.
             *
             */
            Components.Schemas.Insight;
        }
    }
    namespace UnfavoriteDashboard {
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace V1DashboardDashboards$Id {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for dashboard
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            Components.Schemas.DashboardID /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
    namespace V1DashboardDashboards$IdFavorite {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for dashboard
             * example:
             * 3fa85f64-5717-4562-b3fc-2c963f66afa6
             */
            Components.Schemas.DashboardID /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
    namespace V1DashboardInsights$Id {
        namespace Parameters {
            export type Id = /**
             * Unique identifier for an insight (a saved chart / visualisation)
             * example:
             * 8d2e1c7a-3b4f-4a2e-9c1d-2f3a4b5c6d7e
             */
            Components.Schemas.InsightID /* uuid */;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
    }
}


export interface OperationMethods {
  /**
   * listDashboards - listDashboards
   * 
   * List dashboards available to the user
   */
  'listDashboards'(
    parameters?: Parameters<Paths.ListDashboards.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListDashboards.Responses.$200>
  /**
   * createDashboard - createDashboard
   * 
   * Create new dashboard
   */
  'createDashboard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateDashboard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateDashboard.Responses.$201>
  /**
   * listFavoriteDashboardIds - listFavoriteDashboardIds
   * 
   * Returns the current user's favorited dashboard ids, with no dashboard metadata. Lets a
   * client decide whether to default to a favorites-only view without first fetching the full
   * dashboards list.
   * 
   */
  'listFavoriteDashboardIds'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListFavoriteDashboardIds.Responses.$200>
  /**
   * favoriteDashboard - favoriteDashboard
   * 
   * Marks the dashboard as favorited by the current user. Idempotent — favoriting an
   * already-favorited dashboard is not an error. Requires only view-level access to the
   * dashboard (unlike the edit-level check on `PATCH .../dashboards/{id}`).
   * 
   */
  'favoriteDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$IdFavorite.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FavoriteDashboard.Responses.$204>
  /**
   * unfavoriteDashboard - unfavoriteDashboard
   * 
   * Removes the current user's favorite for the dashboard. Idempotent — unfavoriting a
   * dashboard that was not favorited is not an error, and neither is unfavoriting one that no
   * longer exists or is no longer shared with you. Requires no access to the dashboard, so that
   * a stale favorite always remains removable.
   * 
   */
  'unfavoriteDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$IdFavorite.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UnfavoriteDashboard.Responses.$204>
  /**
   * getDashboard - getDashboard
   * 
   * Get dashboard by ID
   */
  'getDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDashboard.Responses.$200>
  /**
   * putDashboard - putDashboard
   * 
   * Update a dashboard by ID
   */
  'putDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: Paths.PutDashboard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutDashboard.Responses.$200>
  /**
   * patchDashboard - patchDashboard
   * 
   * Partially update a dashboard by ID. Update content (title/tiles) and/or manage sharing
   * (owners, shared_with, org_access) — only owners may change sharing.
   * `owners` and `shared_with` replace the whole array (send the complete list); omit them to leave
   * sharing unchanged, or send `shared_with: []` to revoke all per-user grants.
   * 
   */
  'patchDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: Paths.PatchDashboard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchDashboard.Responses.$200>
  /**
   * deleteDashboard - deleteDashboard
   * 
   * Delete a dashboard by ID
   */
  'deleteDashboard'(
    parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDashboard.Responses.$200>
  /**
   * listInsights - listInsights
   * 
   * List insights (saved charts) available to the user
   */
  'listInsights'(
    parameters?: Parameters<Paths.ListInsights.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInsights.Responses.$200>
  /**
   * createInsight - createInsight
   * 
   * Create a new insight (saved chart). The caller becomes the owner.
   */
  'createInsight'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateInsight.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateInsight.Responses.$201>
  /**
   * listInsightTags - listInsightTags
   * 
   * List the distinct tags used by insights in the organization (for filter facets)
   */
  'listInsightTags'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListInsightTags.Responses.$200>
  /**
   * getInsight - getInsight
   * 
   * Get insight by ID
   */
  'getInsight'(
    parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetInsight.Responses.$200>
  /**
   * putInsight - putInsight
   * 
   * Replace an insight's content by ID. Sharing is managed via patchInsight.
   */
  'putInsight'(
    parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
    data?: Paths.PutInsight.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PutInsight.Responses.$200>
  /**
   * patchInsight - patchInsight
   * 
   * Partially update an insight by ID. Update content (name/description/visualisation/tags) and/or
   * manage sharing (owners, shared_with, org_access) — only owners may change sharing.
   * `owners` and `shared_with` replace the whole array (send the complete list); omit them to leave
   * sharing unchanged, or send `shared_with: []` to revoke all per-user grants.
   * 
   */
  'patchInsight'(
    parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
    data?: Paths.PatchInsight.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchInsight.Responses.$200>
  /**
   * deleteInsight - deleteInsight
   * 
   * Delete an insight by ID. Only owners may delete.
   */
  'deleteInsight'(
    parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteInsight.Responses.$200>
  /**
   * listAvailableVisualisations - listAvailableVisualisations
   * 
   * Returns list of available Visualisations to configure new dashboard tiles
   */
  'listAvailableVisualisations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAvailableVisualisations.Responses.$200>
  /**
   * listAvailableExamples - listAvailableExamples
   * 
   * Returns list of available exampless for visualisations to configure new dashboard tiles
   */
  'listAvailableExamples'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListAvailableExamples.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/dashboard/dashboards']: {
    /**
     * listDashboards - listDashboards
     * 
     * List dashboards available to the user
     */
    'get'(
      parameters?: Parameters<Paths.ListDashboards.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListDashboards.Responses.$200>
    /**
     * createDashboard - createDashboard
     * 
     * Create new dashboard
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateDashboard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateDashboard.Responses.$201>
  }
  ['/v1/dashboard/dashboards/favorites']: {
    /**
     * listFavoriteDashboardIds - listFavoriteDashboardIds
     * 
     * Returns the current user's favorited dashboard ids, with no dashboard metadata. Lets a
     * client decide whether to default to a favorites-only view without first fetching the full
     * dashboards list.
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListFavoriteDashboardIds.Responses.$200>
  }
  ['/v1/dashboard/dashboards/{id}/favorite']: {
    /**
     * favoriteDashboard - favoriteDashboard
     * 
     * Marks the dashboard as favorited by the current user. Idempotent — favoriting an
     * already-favorited dashboard is not an error. Requires only view-level access to the
     * dashboard (unlike the edit-level check on `PATCH .../dashboards/{id}`).
     * 
     */
    'put'(
      parameters?: Parameters<Paths.V1DashboardDashboards$IdFavorite.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FavoriteDashboard.Responses.$204>
    /**
     * unfavoriteDashboard - unfavoriteDashboard
     * 
     * Removes the current user's favorite for the dashboard. Idempotent — unfavoriting a
     * dashboard that was not favorited is not an error, and neither is unfavoriting one that no
     * longer exists or is no longer shared with you. Requires no access to the dashboard, so that
     * a stale favorite always remains removable.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.V1DashboardDashboards$IdFavorite.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UnfavoriteDashboard.Responses.$204>
  }
  ['/v1/dashboard/dashboards/{id}']: {
    /**
     * getDashboard - getDashboard
     * 
     * Get dashboard by ID
     */
    'get'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDashboard.Responses.$200>
    /**
     * putDashboard - putDashboard
     * 
     * Update a dashboard by ID
     */
    'put'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: Paths.PutDashboard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutDashboard.Responses.$200>
    /**
     * patchDashboard - patchDashboard
     * 
     * Partially update a dashboard by ID. Update content (title/tiles) and/or manage sharing
     * (owners, shared_with, org_access) — only owners may change sharing.
     * `owners` and `shared_with` replace the whole array (send the complete list); omit them to leave
     * sharing unchanged, or send `shared_with: []` to revoke all per-user grants.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: Paths.PatchDashboard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchDashboard.Responses.$200>
    /**
     * deleteDashboard - deleteDashboard
     * 
     * Delete a dashboard by ID
     */
    'delete'(
      parameters?: Parameters<Paths.V1DashboardDashboards$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDashboard.Responses.$200>
  }
  ['/v1/dashboard/insights']: {
    /**
     * listInsights - listInsights
     * 
     * List insights (saved charts) available to the user
     */
    'get'(
      parameters?: Parameters<Paths.ListInsights.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInsights.Responses.$200>
    /**
     * createInsight - createInsight
     * 
     * Create a new insight (saved chart). The caller becomes the owner.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateInsight.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateInsight.Responses.$201>
  }
  ['/v1/dashboard/insights/tags']: {
    /**
     * listInsightTags - listInsightTags
     * 
     * List the distinct tags used by insights in the organization (for filter facets)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListInsightTags.Responses.$200>
  }
  ['/v1/dashboard/insights/{id}']: {
    /**
     * getInsight - getInsight
     * 
     * Get insight by ID
     */
    'get'(
      parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetInsight.Responses.$200>
    /**
     * putInsight - putInsight
     * 
     * Replace an insight's content by ID. Sharing is managed via patchInsight.
     */
    'put'(
      parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
      data?: Paths.PutInsight.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PutInsight.Responses.$200>
    /**
     * patchInsight - patchInsight
     * 
     * Partially update an insight by ID. Update content (name/description/visualisation/tags) and/or
     * manage sharing (owners, shared_with, org_access) — only owners may change sharing.
     * `owners` and `shared_with` replace the whole array (send the complete list); omit them to leave
     * sharing unchanged, or send `shared_with: []` to revoke all per-user grants.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
      data?: Paths.PatchInsight.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchInsight.Responses.$200>
    /**
     * deleteInsight - deleteInsight
     * 
     * Delete an insight by ID. Only owners may delete.
     */
    'delete'(
      parameters?: Parameters<Paths.V1DashboardInsights$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteInsight.Responses.$200>
  }
  ['/v1/dashboard/visualisations']: {
    /**
     * listAvailableVisualisations - listAvailableVisualisations
     * 
     * Returns list of available Visualisations to configure new dashboard tiles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAvailableVisualisations.Responses.$200>
  }
  ['/v1/dashboard/examples']: {
    /**
     * listAvailableExamples - listAvailableExamples
     * 
     * Returns list of available exampless for visualisations to configure new dashboard tiles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListAvailableExamples.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AccessControl = Components.Schemas.AccessControl;
export type AccessControlUpdate = Components.Schemas.AccessControlUpdate;
export type Dashboard = Components.Schemas.Dashboard;
export type DashboardID = Components.Schemas.DashboardID;
export type DashboardPatch = Components.Schemas.DashboardPatch;
export type DashboardTile = Components.Schemas.DashboardTile;
export type DashboardTileID = Components.Schemas.DashboardTileID;
export type DatalakeQuery = Components.Schemas.DatalakeQuery;
export type Example = Components.Schemas.Example;
export type ExampleID = Components.Schemas.ExampleID;
export type Insight = Components.Schemas.Insight;
export type InsightID = Components.Schemas.InsightID;
export type InsightPatch = Components.Schemas.InsightPatch;
export type OrgAccess = Components.Schemas.OrgAccess;
export type Pagination = Components.Schemas.Pagination;
export type ShareGrant = Components.Schemas.ShareGrant;
export type SharePermission = Components.Schemas.SharePermission;
export type Tags = Components.Schemas.Tags;
export type timechartVisualisationConfig = Components.Schemas.TimechartVisualisationConfig;
export type Visualisation = Components.Schemas.Visualisation;
export type VisualisationConfig = Components.Schemas.VisualisationConfig;
export type VisualisationId = Components.Schemas.VisualisationId;
