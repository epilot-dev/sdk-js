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
        export type ContextType = "workflow_execution" | "workflow_task" | "entity";
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
        export type EntitySlug = "account" | "billing_event" | "contact" | "contract" | "coupon" | "email_template" | "file" | "journey" | "meter" | "meter_counter" | "opportunity";
        /**
         * A note Entity object cotaining Entity metadata and content. Relational attributes are not hydrated in place.
         */
        export interface NonHydratedNoteEntity {
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
            /**
             * The Note's parent Note
             */
            attachments?: {
                $relation?: {
                    entity_id: string;
                }[];
            };
            comments?: /* A note Entity object cotaining Entity metadata and content. Relational attributes are not hydrated in place. */ NonHydratedNoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            contexts?: {
                type: ContextType;
                id: string;
            }[];
            /**
             * The timestamp of when this Note was pinned
             */
            pinned_at?: string; // date-time
        }
        /**
         * A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place.
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
            context_entities?: /* Base Entity schema */ Entity[];
            parent?: /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ NoteEntity[];
            attachments?: /* Base Entity schema */ Entity[];
            comments?: /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ NoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            contexts?: {
                type: ContextType;
                id: string;
            }[];
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
            context_entities?: /* Base Entity schema */ Entity[];
            parent?: /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ NoteEntity[];
            attachments?: /* Base Entity schema */ Entity[];
            comments?: /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ NoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            contexts?: {
                type: ContextType;
                id: string;
            }[];
            /**
             * The timestamp of when this Note was pinned
             */
            pinned_at?: string; // date-time
        }
        export interface NotePatchRequestBody {
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * The Note's parent Note
             */
            attachments?: {
                $relation?: {
                    entity_id: string;
                }[];
            };
            comments?: /* A note Entity object cotaining Entity metadata and content. Relational attributes are not hydrated in place. */ NonHydratedNoteEntity[];
            /**
             * The content of the Note
             */
            content?: string;
            contexts?: {
                type: ContextType;
                id: string;
            }[];
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
             * The Entity ID of the Entity this Note will be related to
             */
            entity_id: string;
            /**
             * The Entity ID of the Note's parent Note. If supplied, the Note will be a comment to the parent Note. Be aware that Notes can only have comments one level deep
             */
            parent_id?: string;
            additional_contexts?: {
                type: EntitySlug | ContextType;
                id: string;
            }[];
            /**
             * The content of the Note
             */
            content?: string;
            /**
             * List of File Entity IDs attached to the Note
             */
            attachments?: string[];
        }
        export interface NotePutRequestBody {
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
            /**
             * The Note's parent Note
             */
            attachments?: {
                $relation?: {
                    entity_id: string;
                }[];
            };
            /**
             * The content of the Note
             */
            content?: string;
            contexts?: {
                type: ContextType;
                id: string;
            }[];
            /**
             * The timestamp of when this Note was pinned
             */
            pinned_at?: string; // date-time
        }
        export interface NotesGetRequestResponse {
            /**
             * The number of Note entries returned in this query
             */
            hits?: number;
            /**
             * The Note entries returned in this query
             */
            results: /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ NoteEntity[];
        }
        /**
         * Base metadata for a Workflow Execution. This is a lightweight representation of a Workflow Execution, and does not contain all it's data
         */
        export interface WorkflowExecution {
            id: string;
            definitionId: string;
            orgId: string;
            name: string;
        }
    }
}
declare namespace Paths {
    namespace CreateNote {
        export type RequestBody = Components.Schemas.NotePostRequestBody;
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ Components.Schemas.NoteEntity;
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
    namespace GetNoteContexts {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to get contexts for
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to get contexts for */ Parameters.Id;
        }
        namespace Responses {
            export type $200 = {
                type: Components.Schemas.ContextType;
                context: /* Base Entity schema */ Components.Schemas.Entity | /* Base metadata for a Workflow Execution. This is a lightweight representation of a Workflow Execution, and does not contain all it's data */ Components.Schemas.WorkflowExecution;
            }[];
        }
    }
    namespace GetNotesByContext {
        namespace Parameters {
            export type Contexts = {
                type: Components.Schemas.ContextType;
                id: string;
            }[];
            /**
             * The ID of the Contextual Entity from where to retrieve Notes
             */
            export type EntityId = string;
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
            entity_id: /* The ID of the Contextual Entity from where to retrieve Notes */ Parameters.EntityId;
        }
        export interface QueryParameters {
            contexts?: Parameters.Contexts;
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
            export type $200 = /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ Components.Schemas.NoteEntity;
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
    namespace UpdateNote {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to update
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to update */ Parameters.Id;
        }
        export type RequestBody = Components.Schemas.NotePutRequestBody;
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ Components.Schemas.NoteEntity;
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
   * updateNote - updateNote
   * 
   * Updates an existing Note entry
   */
  'updateNote'(
    parameters?: Parameters<Paths.UpdateNote.PathParameters> | null,
    data?: Paths.UpdateNote.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateNote.Responses.$200>
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
   * getNotesByContext - getNotesByContext
   * 
   * Given a `context_type`, returns a list of Notes that belong to that context within the specified `id`
   */
  'getNotesByContext'(
    parameters?: Parameters<Paths.GetNotesByContext.QueryParameters & Paths.GetNotesByContext.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNotesByContext.Responses.$200>
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
   * getNoteContexts - getNoteContexts
   * 
   * Gets all the Entity and non-Entity records the Note is contextually attached to
   */
  'getNoteContexts'(
    parameters?: Parameters<Paths.GetNoteContexts.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetNoteContexts.Responses.$200>
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
     * updateNote - updateNote
     * 
     * Updates an existing Note entry
     */
    'put'(
      parameters?: Parameters<Paths.UpdateNote.PathParameters> | null,
      data?: Paths.UpdateNote.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateNote.Responses.$200>
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
  ['/v1/notes/{entity_id}']: {
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
  ['/v1/note/{id}/pin']: {
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
  ['/v1/note/{id}/context']: {
    /**
     * getNoteContexts - getNoteContexts
     * 
     * Gets all the Entity and non-Entity records the Note is contextually attached to
     */
    'get'(
      parameters?: Parameters<Paths.GetNoteContexts.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNoteContexts.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type ContextType = Components.Schemas.ContextType;
export type Entity = Components.Schemas.Entity;
export type EntitySlug = Components.Schemas.EntitySlug;
export type NonHydratedNoteEntity = Components.Schemas.NonHydratedNoteEntity;
export type NoteEntity = Components.Schemas.NoteEntity;
export type NoteEntityParent = Components.Schemas.NoteEntityParent;
export type NoteGetRequestResponse = Components.Schemas.NoteGetRequestResponse;
export type NotePatchRequestBody = Components.Schemas.NotePatchRequestBody;
export type NotePostRequestBody = Components.Schemas.NotePostRequestBody;
export type NotePutRequestBody = Components.Schemas.NotePutRequestBody;
export type NotesGetRequestResponse = Components.Schemas.NotesGetRequestResponse;
export type WorkflowExecution = Components.Schemas.WorkflowExecution;
