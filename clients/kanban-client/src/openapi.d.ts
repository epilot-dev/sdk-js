import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        /**
         * Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options.
         */
        export interface Board {
            id?: string;
            /**
             * example:
             * Board 1
             */
            title: string;
            /**
             * example:
             * Board description
             */
            description?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: string;
            org_id?: string;
            updated_by?: string;
            shared_with?: string[];
            shared_with_org?: boolean;
            /**
             * Array of user IDs who have full ownership rights for this board (view, edit, delete)
             */
            owners?: string[];
            config: {
                /**
                 * example:
                 * workflow_tasks_overview
                 */
                dataset?: string;
                swimlanes?: /* A vertical column in a Kanban board that groups workflow tasks or entities matching its filter criteria. Each swimlane has an independent filter and a display position. */ Swimlane[];
                card_config?: {
                    fields?: string[];
                };
                board_filter?: /* A filter group containing one or more filter items or nested filter groups. Items are combined using the specified logical operator (AND/OR). */ BoardFilter;
                sorting?: /* Defines how query results should be sorted. Specify a field name and sort direction. */ Sorting;
                group_by?: /* Defines how tasks should be grouped within each swimlane. Tasks with the same group value are returned adjacently in the result set. */ GroupBy;
                /**
                 * example:
                 * task 1
                 */
                search_query?: string;
            };
        }
        /**
         * A filter group containing one or more filter items or nested filter groups. Items are combined using the specified logical operator (AND/OR).
         */
        export interface BoardFilter {
            items: (FilterItem | FilterGroup)[];
            /**
             * example:
             * OR
             */
            combination: "AND" | "OR";
        }
        /**
         * Summary representation of a Kanban board, returned in list responses. Does not include swimlane and filter configuration details.
         */
        export interface BoardSummary {
            id?: string;
            /**
             * example:
             * Board 1
             */
            title?: string;
            /**
             * example:
             * Board description
             */
            description?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            created_by?: string;
            org_id?: string;
            updated_by?: string;
            shared_with?: string[];
            shared_with_org?: boolean;
            /**
             * Array of user IDs who have full ownership rights for this board (view, edit, delete)
             */
            owners?: string[];
        }
        /**
         * Dynamic date keywords that resolve to actual dates at runtime
         */
        export type DynamicDateValue = "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH" | "TODAY_OR_EARLIER";
        /**
         * Standard error response
         */
        export interface Error {
            /**
             * Human-readable error message
             * example:
             * Board not found
             */
            message?: string;
            /**
             * HTTP status code
             * example:
             * 404
             */
            status?: number;
        }
        export interface FilterGroup {
            items: FilterItem[];
            /**
             * example:
             * AND
             */
            combination: "AND" | "OR";
        }
        export interface FilterItem {
            /**
             * The field key to filter on
             * example:
             * assignee
             */
            key: string;
            operator: /**
             * The comparison operator for filtering
             * example:
             * EQUALS
             */
            FilterOperator;
            value?: /* The value to compare against - can be a single value (string, number, boolean, or dynamic date) or an array of values */ ValueType;
            /**
             * The data type of the field
             * example:
             * string
             */
            data_type?: "string" | "number" | "boolean" | "date";
        }
        /**
         * The comparison operator for filtering
         * example:
         * EQUALS
         */
        export type FilterOperator = "EQUALS" | "NOT_EQUALS" | "EMPTY" | "NOT_EMPTY" | "CONTAINS" | "NOT_CONTAINS" | "IS_ONE_OF" | "IS_NONE_OF" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
        /**
         * Request payload for executing a query against the Flows dataset. Supports filter conditions, sorting, grouping, and offset-based pagination.
         */
        export interface FlowsQueryRequest {
            /**
             * Optional filter conditions to narrow the result set using AND/OR logic.
             */
            filters?: /* A filter group containing one or more filter items or nested filter groups. Items are combined using the specified logical operator (AND/OR). */ BoardFilter;
            /**
             * Sort the results by a specific field and direction.
             */
            sorting?: /* Defines how query results should be sorted. Specify a field name and sort direction. */ Sorting;
            /**
             * Group tasks by a shared property within each swimlane. Grouped tasks are returned adjacently in the result set.
             */
            group_by?: /* Defines how tasks should be grouped within each swimlane. Tasks with the same group value are returned adjacently in the result set. */ GroupBy;
            /**
             * Zero-based offset for pagination. Use with `size` to paginate through results.
             * example:
             * 0
             */
            from?: number;
            /**
             * Number of results to return per page.
             * example:
             * 10
             */
            size?: number;
        }
        /**
         * Paginated result set returned from a Flows query. Each item in `results` is a workflow task record with dynamic fields depending on the dataset configuration.
         */
        export interface FlowsQueryResult {
            [name: string]: any;
            /**
             * Array of matching workflow task records. Fields vary based on the dataset and card configuration.
             */
            results?: {
                [name: string]: any;
            }[];
            /**
             * Total number of records matching the query (across all pages).
             * example:
             * 42
             */
            hits?: number;
            /**
             * Current page number (1-based).
             * example:
             * 1
             */
            page_number?: number;
            /**
             * Number of results per page (matches the `size` request parameter).
             * example:
             * 10
             */
            page_size?: number;
            /**
             * Total number of available pages based on `hits` and `page_size`.
             * example:
             * 5
             */
            total_pages?: number;
        }
        /**
         * Defines how tasks should be grouped within each swimlane. Tasks with the same group value are returned adjacently in the result set.
         */
        export interface GroupBy {
            /**
             * Property to group tasks by within each swimlane
             */
            field: "context_entity" | "phase";
        }
        /**
         * Defines how query results should be sorted. Specify a field name and sort direction.
         */
        export interface Sorting {
            /**
             * example:
             * created_at
             */
            field: string;
            direction?: "asc" | "desc";
        }
        /**
         * A vertical column in a Kanban board that groups workflow tasks or entities matching its filter criteria. Each swimlane has an independent filter and a display position.
         */
        export interface Swimlane {
            id?: string;
            /**
             * example:
             * Swimlane 1
             */
            title?: string;
            /**
             * example:
             * 1
             */
            position?: number;
            filter?: /* A filter group containing one or more filter items or nested filter groups. Items are combined using the specified logical operator (AND/OR). */ BoardFilter;
            /**
             * example:
             * success
             */
            title_chip_variant?: string;
        }
        /**
         * The value to compare against - can be a single value (string, number, boolean, or dynamic date) or an array of values
         */
        export type ValueType = /* The value to compare against - can be a single value (string, number, boolean, or dynamic date) or an array of values */ string | /* Dynamic date keywords that resolve to actual dates at runtime */ DynamicDateValue | number | boolean | (string | /* Dynamic date keywords that resolve to actual dates at runtime */ DynamicDateValue | number | boolean)[];
    }
}
declare namespace Paths {
    namespace ClearDefaultKanbanBoard {
        namespace Responses {
            export interface $200 {
                message?: string;
                default_board_id?: string | null;
            }
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace CreateKanbanBoard {
        export type RequestBody = /* Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options. */ Components.Schemas.Board;
        namespace Responses {
            export type $200 = /* Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options. */ Components.Schemas.Board;
            export type $400 = /* Standard error response */ Components.Schemas.Error;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace DeleteKanbanBoard {
        namespace Parameters {
            export type BoardId = string;
        }
        export interface PathParameters {
            boardId: Parameters.BoardId;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $404 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace ExecuteFlowsQuery {
        export type RequestBody = /* Request payload for executing a query against the Flows dataset. Supports filter conditions, sorting, grouping, and offset-based pagination. */ Components.Schemas.FlowsQueryRequest;
        namespace Responses {
            export type $200 = /* Paginated result set returned from a Flows query. Each item in `results` is a workflow task record with dynamic fields depending on the dataset configuration. */ Components.Schemas.FlowsQueryResult;
            export type $400 = /* Standard error response */ Components.Schemas.Error;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace FlowsAutocomplete {
        namespace Parameters {
            /**
             * example:
             * name
             */
            export type Attribute = string;
            export type From = number;
            export type Input = string;
            export type Size = number;
        }
        export interface QueryParameters {
            input?: Parameters.Input;
            attribute: /**
             * example:
             * name
             */
            Parameters.Attribute;
            size?: Parameters.Size;
            from?: Parameters.From;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * [
                 *   "value"
                 * ]
                 */
                results: (string | boolean | {
                    [name: string]: any;
                })[];
                /**
                 * Total number of matching items available
                 * example:
                 * 42
                 */
                hits: number;
            }
            export type $400 = /* Standard error response */ Components.Schemas.Error;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace GetKanbanBoard {
        namespace Parameters {
            export type BoardId = string;
        }
        export interface PathParameters {
            boardId: Parameters.BoardId;
        }
        namespace Responses {
            export type $200 = /* Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options. */ Components.Schemas.Board;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $404 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace GetKanbanBoards {
        namespace Parameters {
            export type Filter = "owned" | "shared";
        }
        export interface QueryParameters {
            filter?: Parameters.Filter;
        }
        namespace Responses {
            export type $200 = /* Summary representation of a Kanban board, returned in list responses. Does not include swimlane and filter configuration details. */ Components.Schemas.BoardSummary[];
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace PatchKanbanBoard {
        namespace Parameters {
            export type BoardId = string;
        }
        export interface PathParameters {
            boardId: Parameters.BoardId;
        }
        export interface RequestBody {
            /**
             * example:
             * Board 1
             */
            title?: string;
            /**
             * example:
             * Board description
             */
            description?: string;
            /**
             * Array of user IDs to share the board with
             */
            shared_with?: string[];
            /**
             * Whether the board is shared with the entire organization
             */
            shared_with_org?: boolean;
            /**
             * Array of user IDs who have full ownership rights for this board (view, edit, delete)
             */
            owners?: string[];
        }
        namespace Responses {
            export type $200 = /* Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options. */ Components.Schemas.Board;
            export type $400 = /* Standard error response */ Components.Schemas.Error;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $404 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace SetDefaultKanbanBoard {
        namespace Parameters {
            export type BoardId = string;
        }
        export interface QueryParameters {
            boardId: Parameters.BoardId;
        }
        namespace Responses {
            export interface $200 {
                message?: string;
                default_board_id?: string;
            }
            export type $400 = /* Standard error response */ Components.Schemas.Error;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $404 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
    namespace UpdateKanbanBoard {
        namespace Parameters {
            export type BoardId = string;
        }
        export interface PathParameters {
            boardId: Parameters.BoardId;
        }
        export type RequestBody = /* Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options. */ Components.Schemas.Board;
        namespace Responses {
            export type $200 = /* Full representation of a Kanban board, including swimlane layout, filter configuration, card display fields, and sorting options. */ Components.Schemas.Board;
            export type $400 = /* Standard error response */ Components.Schemas.Error;
            export type $401 = /* Standard error response */ Components.Schemas.Error;
            export type $403 = /* Standard error response */ Components.Schemas.Error;
            export type $404 = /* Standard error response */ Components.Schemas.Error;
            export type $500 = /* Standard error response */ Components.Schemas.Error;
        }
    }
}


export interface OperationMethods {
  /**
   * createKanbanBoard - createKanbanBoard
   * 
   * Creates a new Kanban board with the provided configuration.
   * 
   * A board must have a title and a config containing at least one dataset. Swimlanes and filters can be configured to display specific subsets of workflow tasks or entities.
   * 
   */
  'createKanbanBoard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateKanbanBoard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateKanbanBoard.Responses.$200>
  /**
   * getKanbanBoards - getKanbanBoards
   * 
   * Returns a list of all Kanban boards accessible to the authenticated user.
   * 
   * Use the `filter` query parameter to narrow results to boards the user owns (`owned`) or boards shared with them (`shared`). When omitted, all accessible boards are returned.
   * 
   */
  'getKanbanBoards'(
    parameters?: Parameters<Paths.GetKanbanBoards.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetKanbanBoards.Responses.$200>
  /**
   * getKanbanBoard - getKanbanBoard
   * 
   * Retrieves a Kanban board by ID, including its full configuration (swimlanes, filters, sorting, card fields).
   * 
   * Use `"default"` as the `boardId` to retrieve the organization's currently configured default board.
   * 
   */
  'getKanbanBoard'(
    parameters?: Parameters<Paths.GetKanbanBoard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetKanbanBoard.Responses.$200>
  /**
   * updateKanbanBoard - updateKanbanBoard
   * 
   * Fully replaces the configuration of an existing Kanban board by ID.
   * 
   * All board fields (title, config, swimlanes, filters) must be provided. Use PATCH for partial updates.
   * 
   */
  'updateKanbanBoard'(
    parameters?: Parameters<Paths.UpdateKanbanBoard.PathParameters> | null,
    data?: Paths.UpdateKanbanBoard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateKanbanBoard.Responses.$200>
  /**
   * patchKanbanBoard - patchKanbanBoard
   * 
   * Partially updates fields of an existing Kanban board by ID.
   * 
   * Only the fields provided in the request body will be updated. Useful for updating sharing settings, ownership, or title without replacing the full board configuration.
   * 
   */
  'patchKanbanBoard'(
    parameters?: Parameters<Paths.PatchKanbanBoard.PathParameters> | null,
    data?: Paths.PatchKanbanBoard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchKanbanBoard.Responses.$200>
  /**
   * deleteKanbanBoard - deleteKanbanBoard
   * 
   * Permanently deletes a Kanban board by ID. This action is irreversible.
   */
  'deleteKanbanBoard'(
    parameters?: Parameters<Paths.DeleteKanbanBoard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteKanbanBoard.Responses.$200>
  /**
   * setDefaultKanbanBoard - setDefaultKanbanBoard
   * 
   * Sets a Kanban board as the default board for the organization.
   * 
   * The default board is shown to users who access the Kanban view without specifying a specific board ID.
   * Pass `boardId` as a query parameter to identify the board to set as default.
   * 
   */
  'setDefaultKanbanBoard'(
    parameters?: Parameters<Paths.SetDefaultKanbanBoard.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SetDefaultKanbanBoard.Responses.$200>
  /**
   * clearDefaultKanbanBoard - clearDefaultKanbanBoard
   * 
   * Removes the default board configuration for the organization.
   * 
   * After calling this endpoint, `getKanbanBoard` with `boardId=default` will return a 404 until a new default is set.
   * 
   */
  'clearDefaultKanbanBoard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ClearDefaultKanbanBoard.Responses.$200>
  /**
   * flowsAutocomplete - flowsAutocomplete
   * 
   * Returns autocomplete suggestions for a given attribute in the Flows dataset.
   * 
   * Use this endpoint to power filter dropdowns and search inputs in the Kanban board configuration UI.
   * The `attribute` parameter specifies which field to autocomplete (e.g. `name`, `assignee`, `status`).
   * The optional `input` parameter filters results to those matching the typed prefix.
   * 
   */
  'flowsAutocomplete'(
    parameters?: Parameters<Paths.FlowsAutocomplete.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FlowsAutocomplete.Responses.$200>
  /**
   * executeFlowsQuery - executeFlowsQuery
   * 
   * Executes a query against the Flows dataset and returns paginated results for use in Kanban card rendering.
   * 
   * Supports filtering with complex AND/OR logic, sorting, and offset-based pagination.
   * Results are used to populate Kanban swimlane cards with real-time workflow task data.
   * 
   */
  'executeFlowsQuery'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExecuteFlowsQuery.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExecuteFlowsQuery.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/kanban/board']: {
    /**
     * createKanbanBoard - createKanbanBoard
     * 
     * Creates a new Kanban board with the provided configuration.
     * 
     * A board must have a title and a config containing at least one dataset. Swimlanes and filters can be configured to display specific subsets of workflow tasks or entities.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateKanbanBoard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateKanbanBoard.Responses.$200>
  }
  ['/v1/kanban/boards']: {
    /**
     * getKanbanBoards - getKanbanBoards
     * 
     * Returns a list of all Kanban boards accessible to the authenticated user.
     * 
     * Use the `filter` query parameter to narrow results to boards the user owns (`owned`) or boards shared with them (`shared`). When omitted, all accessible boards are returned.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetKanbanBoards.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetKanbanBoards.Responses.$200>
  }
  ['/v1/kanban/board/{boardId}']: {
    /**
     * getKanbanBoard - getKanbanBoard
     * 
     * Retrieves a Kanban board by ID, including its full configuration (swimlanes, filters, sorting, card fields).
     * 
     * Use `"default"` as the `boardId` to retrieve the organization's currently configured default board.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetKanbanBoard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetKanbanBoard.Responses.$200>
    /**
     * updateKanbanBoard - updateKanbanBoard
     * 
     * Fully replaces the configuration of an existing Kanban board by ID.
     * 
     * All board fields (title, config, swimlanes, filters) must be provided. Use PATCH for partial updates.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateKanbanBoard.PathParameters> | null,
      data?: Paths.UpdateKanbanBoard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateKanbanBoard.Responses.$200>
    /**
     * patchKanbanBoard - patchKanbanBoard
     * 
     * Partially updates fields of an existing Kanban board by ID.
     * 
     * Only the fields provided in the request body will be updated. Useful for updating sharing settings, ownership, or title without replacing the full board configuration.
     * 
     */
    'patch'(
      parameters?: Parameters<Paths.PatchKanbanBoard.PathParameters> | null,
      data?: Paths.PatchKanbanBoard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchKanbanBoard.Responses.$200>
    /**
     * deleteKanbanBoard - deleteKanbanBoard
     * 
     * Permanently deletes a Kanban board by ID. This action is irreversible.
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteKanbanBoard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteKanbanBoard.Responses.$200>
  }
  ['/v1/kanban/org/default-board']: {
    /**
     * setDefaultKanbanBoard - setDefaultKanbanBoard
     * 
     * Sets a Kanban board as the default board for the organization.
     * 
     * The default board is shown to users who access the Kanban view without specifying a specific board ID.
     * Pass `boardId` as a query parameter to identify the board to set as default.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.SetDefaultKanbanBoard.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SetDefaultKanbanBoard.Responses.$200>
    /**
     * clearDefaultKanbanBoard - clearDefaultKanbanBoard
     * 
     * Removes the default board configuration for the organization.
     * 
     * After calling this endpoint, `getKanbanBoard` with `boardId=default` will return a 404 until a new default is set.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ClearDefaultKanbanBoard.Responses.$200>
  }
  ['/v1/kanban/query/flows:autocomplete']: {
    /**
     * flowsAutocomplete - flowsAutocomplete
     * 
     * Returns autocomplete suggestions for a given attribute in the Flows dataset.
     * 
     * Use this endpoint to power filter dropdowns and search inputs in the Kanban board configuration UI.
     * The `attribute` parameter specifies which field to autocomplete (e.g. `name`, `assignee`, `status`).
     * The optional `input` parameter filters results to those matching the typed prefix.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.FlowsAutocomplete.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FlowsAutocomplete.Responses.$200>
  }
  ['/v1/kanban/query/flows:execute']: {
    /**
     * executeFlowsQuery - executeFlowsQuery
     * 
     * Executes a query against the Flows dataset and returns paginated results for use in Kanban card rendering.
     * 
     * Supports filtering with complex AND/OR logic, sorting, and offset-based pagination.
     * Results are used to populate Kanban swimlane cards with real-time workflow task data.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExecuteFlowsQuery.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExecuteFlowsQuery.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type Board = Components.Schemas.Board;
export type BoardFilter = Components.Schemas.BoardFilter;
export type BoardSummary = Components.Schemas.BoardSummary;
export type DynamicDateValue = Components.Schemas.DynamicDateValue;
export type Error = Components.Schemas.Error;
export type FilterGroup = Components.Schemas.FilterGroup;
export type FilterItem = Components.Schemas.FilterItem;
export type FilterOperator = Components.Schemas.FilterOperator;
export type FlowsQueryRequest = Components.Schemas.FlowsQueryRequest;
export type FlowsQueryResult = Components.Schemas.FlowsQueryResult;
export type GroupBy = Components.Schemas.GroupBy;
export type Sorting = Components.Schemas.Sorting;
export type Swimlane = Components.Schemas.Swimlane;
export type ValueType = Components.Schemas.ValueType;
