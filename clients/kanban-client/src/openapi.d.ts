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
            id?: string; // uuid
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
            updated_by?: string;
            config: {
                /**
                 * example:
                 * workflow_tasks_overview
                 */
                dataset?: string;
                swimlanes?: Swimlane[];
                board_filters?: BoardFilter[];
                sorting?: Sorting;
            };
        }
        export interface BoardFilter {
            /**
             * example:
             * status
             */
            filter_field: string;
            filter_values: string[];
        }
        export interface BoardSummary {
            id?: string; // uuid
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
            updated_by?: string;
        }
        export interface Sorting {
            /**
             * example:
             * createdAt
             */
            field: string;
            direction?: "asc" | "desc";
        }
        export interface Swimlane {
            /**
             * example:
             * status
             */
            filter_field: string;
            filter_values: string[];
            id?: string; // uuid
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
            /**
             * example:
             * success
             */
            title_chip_variant?: string;
        }
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
            export type BoardId = string; // uuid
        }
        export interface PathParameters {
            boardId: Parameters.BoardId /* uuid */;
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
    namespace GetKanbanBoard {
        namespace Parameters {
            export type BoardId = string; // uuid
        }
        export interface PathParameters {
            boardId: Parameters.BoardId /* uuid */;
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
    namespace UpdateKanbanBoard {
        namespace Parameters {
            export type BoardId = string; // uuid
        }
        export interface PathParameters {
            boardId: Parameters.BoardId /* uuid */;
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
    parameters?: Parameters<UnknownParamsObject> | null,
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
   * deleteKanbanBoard - Delete a Kanban board
   * 
   * Delete a Kanban board
   */
  'deleteKanbanBoard'(
    parameters?: Parameters<Paths.DeleteKanbanBoard.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteKanbanBoard.Responses.$200>
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
      parameters?: Parameters<UnknownParamsObject> | null,
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type Board = Components.Schemas.Board;
export type BoardFilter = Components.Schemas.BoardFilter;
export type BoardSummary = Components.Schemas.BoardSummary;
export type Sorting = Components.Schemas.Sorting;
export type Swimlane = Components.Schemas.Swimlane;
