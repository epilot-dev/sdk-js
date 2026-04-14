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
        export type ContextType = "workflow_execution" | "workflow_task" | "workflow_configuration" | "journey_configuration" | "entity";
        export type CreatedByType = "user" | "group";
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
            /**
             * Entity ID of the Note entry
             */
            type?: string;
        }
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
            /**
             * Entity ID of the Note entry
             */
            type?: string;
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
            created_by?: {
                type: "user" | "group";
                user_id?: string;
                display_name?: string;
                org_id?: string;
                email?: string;
                phone?: string;
            };
            /**
             * List of user IDs who have read this note
             */
            read_by?: string[];
            /**
             * Reactions to the note, keyed by reaction type, with an array of user IDs for each type
             */
            reactions?: {
                [name: string]: string[];
            };
        }
        /**
         * List of resolved Entity and non-Entity contexts attached to a given Note.
         */
        export interface NoteContexts {
            type: ContextType;
            context: /* Base Entity schema */ Entity | /* Base metadata for a Workflow Execution. This is a lightweight representation of a Workflow Execution, and does not contain all it's data */ WorkflowExecution;
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
            /**
             * Entity ID of the Note entry
             */
            type?: string;
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
            /**
             * The timestamp of when this Note was last updated
             */
            edited_at?: string; // date-time
            created_by?: {
                type: CreatedByType;
                user_id?: string;
                display_name?: string;
                org_id?: string;
                email?: string;
                phone?: string;
            };
            /**
             * List of user IDs who have read this note
             */
            read_by?: string[];
            /**
             * Reactions to the note, keyed by reaction type, with an array of user IDs for each type
             */
            reactions?: {
                [name: string]: string[];
            };
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
            /**
             * Entity ID of the Note entry
             */
            type?: string;
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
            /**
             * The timestamp of when this Note was last updated
             */
            edited_at?: string; // date-time
            created_by?: {
                type: CreatedByType;
                user_id?: string;
                display_name?: string;
                org_id?: string;
                email?: string;
                phone?: string;
            };
            /**
             * List of user IDs who have read this note
             */
            read_by?: string[];
            /**
             * Reactions to the note, keyed by reaction type, with an array of user IDs for each type
             */
            reactions?: {
                [name: string]: string[];
            };
        }
        export interface NotePatchRequestBody {
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * Entity ID of the Note entry
             */
            type?: string;
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
            created_by?: {
                type: "user" | "group";
                user_id?: string;
                display_name?: string;
                org_id?: string;
                email?: string;
                phone?: string;
            };
            /**
             * List of user IDs who have read this note
             */
            read_by?: string[];
            /**
             * Reactions to the note, keyed by reaction type, with an array of user IDs for each type
             */
            reactions?: {
                [name: string]: string[];
            };
        }
        export interface NotePostRequestBody {
            /**
             * Tags associated with this Note
             */
            _tags?: string[];
            /**
             * Entity ID of the Note entry
             */
            type?: string;
            /**
             * The Entity ID of the Entity this Note will be related to. This option has been deprecated since 2.1.0. Please use `contexts` instead.
             */
            entity_id?: string;
            /**
             * The Entity ID of the Note's parent Note. If supplied, the Note will be a comment to the parent Note. Be aware that Notes can only have comments one level deep
             */
            parent_id?: string;
            /**
             * The contexts to which this Note will be related to
             */
            contexts?: {
                type: ContextType;
                id: string;
            }[];
            /**
             * Any additional non-entity contexts to which this Note will be related to. This option has been deprecated since 2.1.0. Please use `contexts` instead.
             */
            additional_contexts?: {
                type: ContextType;
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
            /**
             * List of user IDs who have read this note
             */
            read_by?: string[];
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
            /**
             * Entity ID of the Note entry
             */
            type?: string;
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
            created_by?: {
                type: "user" | "group";
                user_id?: string;
                display_name?: string;
                org_id?: string;
                email?: string;
                phone?: string;
            };
            /**
             * List of user IDs who have read this note
             */
            read_by?: string[];
            /**
             * Reactions to the note, keyed by reaction type, with an array of user IDs for each type
             */
            reactions?: {
                [name: string]: string[];
            };
        }
        export interface NoteSearchByContextRequestBody {
            contexts: {
                type: ContextType;
                id: string;
            }[];
            /**
             * The index of the first Note to return in this query
             */
            from?: number;
            /**
             * The number of Note entries to return in this query
             */
            size?: number;
        }
        export interface NotesSearchRequestResponse {
            /**
             * The number of Note entries returned in this query
             */
            hits?: number;
            /**
             * The Note entries returned in this query
             */
            results: /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ NoteEntity[];
        }
        export interface ReactionRequest {
            /**
             * The emoji identifier (e.g., 'thumbs-up', 'heart', 'thinking-face')
             * example:
             * thumbs-up
             */
            emoji: string;
        }
        export interface ToggleReactionsRequest {
            /**
             * Array of emoji identifiers to toggle (e.g., ['thumbs-up', 'heart', 'thinking-face'])
             * example:
             * [
             *   "thumbs-up",
             *   "heart"
             * ]
             */
            emojis: string[];
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
    namespace AddNoteReaction {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to add reaction to
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to add reaction to */ Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ReactionRequest;
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ Components.Schemas.NoteEntity;
        }
    }
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
            export type $200 = /* List of resolved Entity and non-Entity contexts attached to a given Note. */ Components.Schemas.NoteContexts[];
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
            export type $200 = Components.Schemas.NotesSearchRequestResponse;
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
    namespace RemoveNoteReaction {
        namespace Parameters {
            /**
             * The emoji to remove from the note
             */
            export type EmojiShortcode = string;
            /**
             * The Entity ID of the Note entry to remove reaction from
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to remove reaction from */ Parameters.Id;
            emoji_shortcode: /* The emoji to remove from the note */ Parameters.EmojiShortcode;
        }
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ Components.Schemas.NoteEntity;
        }
    }
    namespace SearchNotesByContext {
        export type RequestBody = Components.Schemas.NoteSearchByContextRequestBody;
        namespace Responses {
            export type $200 = Components.Schemas.NotesSearchRequestResponse;
        }
    }
    namespace ToggleNoteReactions {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to toggle reactions on
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to toggle reactions on */ Parameters.Id;
        }
        export type RequestBody = Components.Schemas.ToggleReactionsRequest;
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content. Relational attributes are hydrated in place. */ Components.Schemas.NoteEntity;
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
   * searchNotesByContext - searchNotesByContext
   * 
   * Search for a paginated list of Notes based on one or more contexts
   */
  'searchNotesByContext'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchNotesByContext.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchNotesByContext.Responses.$200>
  /**
   * getNotesByContext - getNotesByContext
   * 
   * Given a `context_type`, returns a list of Notes that belong to that context within the specified `id`. 
   * This endpoint is deprecated but will be kept for backwards compatibility. Please use the `searchNotesByContext` endpoint instead.
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
  /**
   * addNoteReaction - addNoteReaction
   * 
   * Adds an emoji reaction to a note
   */
  'addNoteReaction'(
    parameters?: Parameters<Paths.AddNoteReaction.PathParameters> | null,
    data?: Paths.AddNoteReaction.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddNoteReaction.Responses.$200>
  /**
   * removeNoteReaction - removeNoteReaction
   * 
   * Removes an emoji reaction from a note
   */
  'removeNoteReaction'(
    parameters?: Parameters<Paths.RemoveNoteReaction.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveNoteReaction.Responses.$200>
  /**
   * toggleNoteReactions - toggleNoteReactions
   * 
   * Toggles multiple emoji reactions on a note. If a user has already reacted with an emoji, it removes the reaction. If a user hasn't reacted with an emoji, it adds the reaction.
   */
  'toggleNoteReactions'(
    parameters?: Parameters<Paths.ToggleNoteReactions.PathParameters> | null,
    data?: Paths.ToggleNoteReactions.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ToggleNoteReactions.Responses.$200>
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
  ['/v1/notes:search']: {
    /**
     * searchNotesByContext - searchNotesByContext
     * 
     * Search for a paginated list of Notes based on one or more contexts
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchNotesByContext.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchNotesByContext.Responses.$200>
  }
  ['/v1/notes/{entity_id}']: {
    /**
     * getNotesByContext - getNotesByContext
     * 
     * Given a `context_type`, returns a list of Notes that belong to that context within the specified `id`. 
     * This endpoint is deprecated but will be kept for backwards compatibility. Please use the `searchNotesByContext` endpoint instead.
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
  ['/v1/note/{id}/reaction']: {
    /**
     * addNoteReaction - addNoteReaction
     * 
     * Adds an emoji reaction to a note
     */
    'post'(
      parameters?: Parameters<Paths.AddNoteReaction.PathParameters> | null,
      data?: Paths.AddNoteReaction.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddNoteReaction.Responses.$200>
  }
  ['/v1/note/{id}/reaction/{emoji_shortcode}']: {
    /**
     * removeNoteReaction - removeNoteReaction
     * 
     * Removes an emoji reaction from a note
     */
    'delete'(
      parameters?: Parameters<Paths.RemoveNoteReaction.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveNoteReaction.Responses.$200>
  }
  ['/v1/note/{id}/reactions/toggle']: {
    /**
     * toggleNoteReactions - toggleNoteReactions
     * 
     * Toggles multiple emoji reactions on a note. If a user has already reacted with an emoji, it removes the reaction. If a user hasn't reacted with an emoji, it adds the reaction.
     */
    'post'(
      parameters?: Parameters<Paths.ToggleNoteReactions.PathParameters> | null,
      data?: Paths.ToggleNoteReactions.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ToggleNoteReactions.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type ContextType = Components.Schemas.ContextType;
export type CreatedByType = Components.Schemas.CreatedByType;
export type Entity = Components.Schemas.Entity;
export type NonHydratedNoteEntity = Components.Schemas.NonHydratedNoteEntity;
export type NoteContexts = Components.Schemas.NoteContexts;
export type NoteEntity = Components.Schemas.NoteEntity;
export type NoteEntityParent = Components.Schemas.NoteEntityParent;
export type NoteGetRequestResponse = Components.Schemas.NoteGetRequestResponse;
export type NotePatchRequestBody = Components.Schemas.NotePatchRequestBody;
export type NotePostRequestBody = Components.Schemas.NotePostRequestBody;
export type NotePutRequestBody = Components.Schemas.NotePutRequestBody;
export type NoteSearchByContextRequestBody = Components.Schemas.NoteSearchByContextRequestBody;
export type NotesSearchRequestResponse = Components.Schemas.NotesSearchRequestResponse;
export type ReactionRequest = Components.Schemas.ReactionRequest;
export type ToggleReactionsRequest = Components.Schemas.ToggleReactionsRequest;
export type WorkflowExecution = Components.Schemas.WorkflowExecution;
