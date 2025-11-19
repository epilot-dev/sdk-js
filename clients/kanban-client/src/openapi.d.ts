/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
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
            config: {
                /**
                 * example:
                 * workflow_tasks_overview
                 */
                dataset?: string;
                swimlanes?: Swimlane[];
                card_config?: {
                    fields?: string[];
                };
                board_filter?: BoardFilter;
                sorting?: Sorting;
                /**
                 * example:
                 * task 1
                 */
                search_query?: string;
            };
        }
        export interface BoardFilter {
            items: (FilterItem | FilterGroup)[];
            /**
             * example:
             * OR
             */
            combination: "AND" | "OR";
        }
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
        }
        /**
         * Dynamic date keywords that resolve to actual dates at runtime
         */
        export type DynamicDateValue = "TODAY" | "TOMORROW" | "YESTERDAY" | "IN_THE_FUTURE" | "IN_THE_PAST" | "THIS_WEEK" | "NEXT_WEEK" | "LAST_WEEK" | "THIS_MONTH" | "NEXT_MONTH" | "LAST_MONTH";
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
        export interface FlowsQueryRequest {
            filters?: BoardFilter;
            sorting?: Sorting;
            from?: number;
            size?: number;
        }
        export interface FlowsQueryResult {
            [name: string]: any;
            results?: {
                [name: string]: any;
            }[];
            hits?: number;
            page_number?: number;
            page_size?: number;
            total_pages?: number;
        }
        export interface Sorting {
            /**
             * example:
             * created_at
             */
            field: string;
            direction?: "asc" | "desc";
        }
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
            filter?: BoardFilter;
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
    namespace CreateKanbanBoard {
        export type RequestBody = Components.Schemas.Board;
        namespace Responses {
            export type $200 = Components.Schemas.Board;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
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
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace ExecuteFlowsQuery {
        export type RequestBody = Components.Schemas.FlowsQueryRequest;
        namespace Responses {
            export type $200 = Components.Schemas.FlowsQueryResult;
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
            export type $200 = Components.Schemas.Board;
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
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
            export type $200 = Components.Schemas.BoardSummary[];
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $500 {
            }
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
            shared_with?: string[];
            shared_with_org?: boolean;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Board;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
    namespace UpdateKanbanBoard {
        namespace Parameters {
            export type BoardId = string;
        }
        export interface PathParameters {
            boardId: Parameters.BoardId;
        }
        export type RequestBody = Components.Schemas.Board;
        namespace Responses {
            export type $200 = Components.Schemas.Board;
            export interface $400 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
            export interface $500 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * createKanbanBoard - Create a Kanban board
   * 
   * Create a Kanban board
   */
  'createKanbanBoard'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateKanbanBoard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateKanbanBoard.Responses.$200>
  /**
   * getKanbanBoards - Get all Kanban boards
   * 
   * Get all Kanban boards
   */
  'getKanbanBoards'(
    parameters?: Parameters<Paths.GetKanbanBoards.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetKanbanBoards.Responses.$200>
  /**
   * getKanbanBoard - Get a Kanban board
   * 
   * Get a Kanban board
   */
  'getKanbanBoard'(
    parameters?: Parameters<Paths.GetKanbanBoard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetKanbanBoard.Responses.$200>
  /**
   * updateKanbanBoard - Update a Kanban board
   * 
   * Update a Kanban board
   */
  'updateKanbanBoard'(
    parameters?: Parameters<Paths.UpdateKanbanBoard.PathParameters> | null,
    data?: Paths.UpdateKanbanBoard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateKanbanBoard.Responses.$200>
  /**
   * patchKanbanBoard - Patch a Kanban board
   * 
   * Patch a Kanban board
   */
  'patchKanbanBoard'(
    parameters?: Parameters<Paths.PatchKanbanBoard.PathParameters> | null,
    data?: Paths.PatchKanbanBoard.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchKanbanBoard.Responses.$200>
  /**
   * deleteKanbanBoard - Delete a Kanban board
   * 
   * Delete a Kanban board
   */
  'deleteKanbanBoard'(
    parameters?: Parameters<Paths.DeleteKanbanBoard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteKanbanBoard.Responses.$200>
  /**
   * flowsAutocomplete - flowsAutocomplete
   * 
   * Autocomplete flows data
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
   * Query Flows Data for Kanban View.
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
     * createKanbanBoard - Create a Kanban board
     * 
     * Create a Kanban board
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateKanbanBoard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateKanbanBoard.Responses.$200>
  }
  ['/v1/kanban/boards']: {
    /**
     * getKanbanBoards - Get all Kanban boards
     * 
     * Get all Kanban boards
     */
    'get'(
      parameters?: Parameters<Paths.GetKanbanBoards.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetKanbanBoards.Responses.$200>
  }
  ['/v1/kanban/board/{boardId}']: {
    /**
     * getKanbanBoard - Get a Kanban board
     * 
     * Get a Kanban board
     */
    'get'(
      parameters?: Parameters<Paths.GetKanbanBoard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetKanbanBoard.Responses.$200>
    /**
     * updateKanbanBoard - Update a Kanban board
     * 
     * Update a Kanban board
     */
    'put'(
      parameters?: Parameters<Paths.UpdateKanbanBoard.PathParameters> | null,
      data?: Paths.UpdateKanbanBoard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateKanbanBoard.Responses.$200>
    /**
     * patchKanbanBoard - Patch a Kanban board
     * 
     * Patch a Kanban board
     */
    'patch'(
      parameters?: Parameters<Paths.PatchKanbanBoard.PathParameters> | null,
      data?: Paths.PatchKanbanBoard.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchKanbanBoard.Responses.$200>
    /**
     * deleteKanbanBoard - Delete a Kanban board
     * 
     * Delete a Kanban board
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteKanbanBoard.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteKanbanBoard.Responses.$200>
  }
  ['/v1/kanban/query/flows:autocomplete']: {
    /**
     * flowsAutocomplete - flowsAutocomplete
     * 
     * Autocomplete flows data
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
     * Query Flows Data for Kanban View.
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
export type FilterGroup = Components.Schemas.FilterGroup;
export type FilterItem = Components.Schemas.FilterItem;
export type FilterOperator = Components.Schemas.FilterOperator;
export type FlowsQueryRequest = Components.Schemas.FlowsQueryRequest;
export type FlowsQueryResult = Components.Schemas.FlowsQueryResult;
export type Sorting = Components.Schemas.Sorting;
export type Swimlane = Components.Schemas.Swimlane;
export type ValueType = Components.Schemas.ValueType;
