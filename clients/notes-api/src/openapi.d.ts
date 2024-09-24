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
        /**
         * Type of context to retrieve Notes within the targeted Entity
         */
        export type ContextType = "opportunity" | "workflow_tasks";
        /**
         * Base Entity schema
         */
        export interface Entity {
            /**
             * Entity ID of the Note entry
             */
            _id: string;
            /**
             * ID of the Organization that owns this Note
             */
            _org?: string;
            /**
             * The Entity schema of this Note
             */
            _schema?: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at?: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at?: string; // date-time
            /**
             * The Entity ID of the User that created this Note
             */
            _created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * The Entity ID of the User that created this Note
             */
            created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * Access Control List for this Note entry
             */
            _acl?: {
                [name: string]: string[];
            };
            _owners?: {
                org_id: string;
                user_id: string;
            }[];
        }
        /**
         * A note Entity object cotaining Entity metadata and content in a LexicalNode format
         */
        export interface NoteEntity {
            /**
             * Entity ID of the Note entry
             */
            _id: string;
            /**
             * ID of the Organization that owns this Note
             */
            _org?: string;
            /**
             * The Entity schema of this Note
             */
            _schema?: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at?: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at?: string; // date-time
            /**
             * The Entity ID of the User that created this Note
             */
            _created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * The Entity ID of the User that created this Note
             */
            created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * Access Control List for this Note entry
             */
            _acl?: {
                [name: string]: string[];
            };
            _owners?: {
                org_id: string;
                user_id: string;
            }[];
            context_entities: {
                $relation: {
                    entity_id: string;
                }[];
            };
            parent?: /* The Note's parent Note */ NoteEntityParent;
            comments?: /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ NoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            context_workflow_tasks?: string[];
            /**
             * The timestamp of when this Note was pinned
             */
            pinned_at?: string; // date-time
        }
        /**
         * The Note's parent Note
         */
        export interface NoteEntityParent {
            $relation?: {
                entity_id: string;
            }[];
        }
        /**
         * Base Entity schema
         */
        export interface NoteGetRequestResponse {
            /**
             * Entity ID of the Note entry
             */
            _id: string;
            /**
             * ID of the Organization that owns this Note
             */
            _org?: string;
            /**
             * The Entity schema of this Note
             */
            _schema?: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at?: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at?: string; // date-time
            /**
             * The Entity ID of the User that created this Note
             */
            _created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * The Entity ID of the User that created this Note
             */
            created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * Access Control List for this Note entry
             */
            _acl?: {
                [name: string]: string[];
            };
            _owners?: {
                org_id: string;
                user_id: string;
            }[];
            context_entities: {
                $relation: {
                    entity_id: string;
                }[];
            };
            parent?: /* The Note's parent Note */ NoteEntityParent;
            comments?: /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ NoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            context_workflow_tasks?: string[];
            /**
             * The timestamp of when this Note was pinned
             */
            pinned_at?: string; // date-time
        }
        export interface NotePatchRequestBody {
            /**
             * Entity ID of the Note entry
             */
            _id?: string;
            /**
             * ID of the Organization that owns this Note
             */
            _org?: string;
            /**
             * The Entity schema of this Note
             */
            _schema?: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at?: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at?: string; // date-time
            /**
             * The Entity ID of the User that created this Note
             */
            _created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * The Entity ID of the User that created this Note
             */
            created_by?: /* The Entity ID of the User that created this Note */ string | number;
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * Access Control List for this Note entry
             */
            _acl?: {
                [name: string]: string[];
            };
            _owners?: {
                org_id: string;
                user_id: string;
            }[];
            context_entities?: {
                $relation: {
                    entity_id: string;
                }[];
            };
            parent?: /* The Note's parent Note */ NoteEntityParent;
            comments?: /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ NoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            context_workflow_tasks?: string[];
            /**
             * The timestamp of when this Note was pinned
             */
            pinned_at?: string; // date-time
        }
        export interface NotePostRequestBody {
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * The Entity ID of the Entity this note will be contextually attached to
             */
            entity_id: string;
            /**
             * The Entity ID of the Note's parent Note. If supplied, the Note will be a comment to the parent Note. Be aware that Notes can only have comments one level deep
             */
            parent_id?: string;
            /**
             * The IDs of the Workflow Tasks that this Note should be attached to
             */
            context_workflow_tasks?: string[];
            /**
             * The content of the Note
             */
            content?: string;
        }
        export interface NotesGetRequestResponse {
            /**
             * The number of Note entries returned in this query
             */
            hits?: number;
            /**
             * The Note entries returned in this query
             */
            results: /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ NoteEntity[];
        }
    }
}
declare namespace Paths {
    namespace CreateNote {
        export type RequestBody = Components.Schemas.NotePostRequestBody;
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ Components.Schemas.NoteEntity;
        }
    }
    namespace DeleteNote {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to delete
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to delete */ Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetNote {
        namespace Parameters {
            /**
             * Whether to hydrate the Note's relation attributes
             */
            export type Hydrate = boolean;
            /**
             * The Entity ID of the Note entry to retrieve
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to retrieve */ Parameters.Id;
        }
        export interface QueryParameters {
            hydrate?: /* Whether to hydrate the Note's relation attributes */ Parameters.Hydrate;
        }
        namespace Responses {
            export type $200 = /* Base Entity schema */ Components.Schemas.NoteGetRequestResponse;
        }
    }
    namespace GetNotesByContext {
        namespace Parameters {
            /**
             * ID of the Entity from which to retrive Notes
             */
            export type ContextId = string;
            export type ContextType = /* Type of context to retrieve Notes within the targeted Entity */ Components.Schemas.ContextType;
            /**
             * The index of the first Note to return in this query
             */
            export type From = number;
            /**
             * The number of Note entries to return in this query
             */
            export type Size = number;
        }
        export interface PathParameters {
            context_id: /* ID of the Entity from which to retrive Notes */ Parameters.ContextId;
        }
        export interface QueryParameters {
            context_type: Parameters.ContextType;
            context_id?: /* ID of the Entity from which to retrive Notes */ Parameters.ContextId;
            from?: /* The index of the first Note to return in this query */ Parameters.From;
            size?: /* The number of Note entries to return in this query */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NotesGetRequestResponse;
        }
    }
    namespace PatchNote {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to update
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to update */ Parameters.Id;
        }
        export type RequestBody = Components.Schemas.NotePatchRequestBody;
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ Components.Schemas.NoteEntity;
        }
    }
    namespace PinNote {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to pin
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to pin */ Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * createNote - createNote
   * 
   * Creates a new Note entry
   */
  'createNote'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateNote.Responses.$200>
  /**
   * getNote - getNote
   * 
   * Retrieves a single Note entry based on it's Entity ID
   */
  'getNote'(
    parameters?: Parameters<Paths.GetNote.QueryParameters & Paths.GetNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNote.Responses.$200>
  /**
   * patchNote - patchNote
   * 
   * Updates an existing Note entry
   */
  'patchNote'(
    parameters?: Parameters<Paths.PatchNote.PathParameters> | null,
    data?: Paths.PatchNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PatchNote.Responses.$200>
  /**
   * deleteNote - deleteNote
   * 
   * Deletes a single Note entry based on it's Entity ID
   */
  'deleteNote'(
    parameters?: Parameters<Paths.DeleteNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteNote.Responses.$200>
  /**
   * pinNote - pinNote
   * 
   * Pins a single Note entry based on it's Entity ID
   */
  'pinNote'(
    parameters?: Parameters<Paths.PinNote.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PinNote.Responses.$200>
  /**
   * getNotesByContext - getNotesByContext
   * 
   * Given a `context_type`, returns a list of Notes that belong to that context within the specified `id`
   */
  'getNotesByContext'(
    parameters?: Parameters<Paths.GetNotesByContext.QueryParameters & Paths.GetNotesByContext.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNotesByContext.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/note']: {
    /**
     * createNote - createNote
     * 
     * Creates a new Note entry
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateNote.Responses.$200>
  }
  ['/v1/note/{id}']: {
    /**
     * getNote - getNote
     * 
     * Retrieves a single Note entry based on it's Entity ID
     */
    'get'(
      parameters?: Parameters<Paths.GetNote.QueryParameters & Paths.GetNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNote.Responses.$200>
    /**
     * patchNote - patchNote
     * 
     * Updates an existing Note entry
     */
    'patch'(
      parameters?: Parameters<Paths.PatchNote.PathParameters> | null,
      data?: Paths.PatchNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PatchNote.Responses.$200>
    /**
     * deleteNote - deleteNote
     * 
     * Deletes a single Note entry based on it's Entity ID
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteNote.Responses.$200>
  }
  ['/v1/note/{id}:pin']: {
    /**
     * pinNote - pinNote
     * 
     * Pins a single Note entry based on it's Entity ID
     */
    'post'(
      parameters?: Parameters<Paths.PinNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PinNote.Responses.$200>
  }
  ['/v1/notes/{context_id}']: {
    /**
     * getNotesByContext - getNotesByContext
     * 
     * Given a `context_type`, returns a list of Notes that belong to that context within the specified `id`
     */
    'get'(
      parameters?: Parameters<Paths.GetNotesByContext.QueryParameters & Paths.GetNotesByContext.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNotesByContext.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type ContextType = Components.Schemas.ContextType;
export type Entity = Components.Schemas.Entity;
export type NoteEntity = Components.Schemas.NoteEntity;
export type NoteEntityParent = Components.Schemas.NoteEntityParent;
export type NoteGetRequestResponse = Components.Schemas.NoteGetRequestResponse;
export type NotePatchRequestBody = Components.Schemas.NotePatchRequestBody;
export type NotePostRequestBody = Components.Schemas.NotePostRequestBody;
export type NotesGetRequestResponse = Components.Schemas.NotesGetRequestResponse;
