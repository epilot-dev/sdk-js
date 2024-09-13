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
         * Base Entity with additional, non-relational attributes that are exclusive to Notes schema
         */
        export interface BaseNoteEntity {
            /**
             * Entity ID of the Note entry
             */
            _id: string;
            /**
             * ID of the Organization that owns this Note
             */
            _org: string;
            /**
             * The Entity schema of this Note
             */
            _schema: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at: string; // date-time
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
            content: LexicalNode | string;
        }
        export type ContextType = "opportunity" | "workflows";
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
            _org: string;
            /**
             * The Entity schema of this Note
             */
            _schema: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at: string; // date-time
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
        }
        export interface LexicalNode {
            /**
             * Metadata information about the direction of the Node instance
             */
            direction?: "ltr" | "rtl" | null;
            /**
             * The identation level of this node in relation to it's parent node.
             */
            indent: number;
            /**
             * Version of the editor client that created this Node instance.
             */
            version: number;
            /**
             * Any combination of bold, italic, underline, strikethrough, code, subscript and superscript
             */
            format?: /* Any combination of bold, italic, underline, strikethrough, code, subscript and superscript */ number | string;
            /**
             * Controls how the node behaves when being edited.
             */
            mode?: "normal" | "token" | "segmented" | null;
            /**
             * Allows the injection of custom styles for the node.
             */
            style?: string;
            /**
             * The text content of the node.
             */
            text?: string;
            children?: LexicalNode[];
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
            _org: string;
            /**
             * The Entity schema of this Note
             */
            _schema: string;
            /**
             * The timestamp of when this Note was created
             */
            _created_at: string; // date-time
            /**
             * The timestamp of when this Note was last updated
             */
            _updated_at: string; // date-time
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
            content: LexicalNode | string;
            /**
             * Standard `$relation` attribute for a Note's relationship with the Entity it belongs to
             */
            context_entity: /* Base Entity schema */ Entity[];
            /**
             * Standard `$relation` attribute for a Note's parent Note, intended to be used by Notes comments to reference their parent Note
             */
            parent?: /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ NoteEntity[];
        }
        export interface NotesResponse {
            /**
             * The number of Note entries returned in this query
             */
            hits: number;
            /**
             * The Note entries returned in this query
             */
            results: /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ NoteEntity[];
        }
    }
}
declare namespace Paths {
    namespace CreateNote {
        export interface RequestBody {
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
            content: Components.Schemas.LexicalNode | string;
            entity_id: string;
        }
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
            export type $200 = /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ Components.Schemas.NoteEntity;
        }
    }
    namespace GetNote {
        namespace Parameters {
            /**
             * The Entity ID of the Note entry to retrieve
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /* The Entity ID of the Note entry to retrieve */ Parameters.Id;
        }
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ Components.Schemas.NoteEntity;
        }
    }
    namespace GetNotesByContext {
        namespace Parameters {
            /**
             * ID of the context to from which to retrive Notes. This is the Entity ID when `context_type=entity` and the Workflow definition ID when `context_type=workflows`
             */
            export type ContextId = string;
            /**
             * Type of context to retrieve Notes within the targeted Entity
             */
            export type ContextType = /* Type of context to retrieve Notes within the targeted Entity */ string | Components.Schemas.ContextType;
            /**
             * The index of the first Note to return in this query
             */
            export type From = number;
            /**
             * The number of Note entries to return in this query
             */
            export type Size = number;
            /**
             * The sort order of the returned Notes, expressed as a Lucene query
             */
            export type Sort = string;
        }
        export interface PathParameters {
            context_id: /* ID of the context to from which to retrive Notes. This is the Entity ID when `context_type=entity` and the Workflow definition ID when `context_type=workflows` */ Parameters.ContextId;
        }
        export interface QueryParameters {
            context_type: /* Type of context to retrieve Notes within the targeted Entity */ Parameters.ContextType;
            sort?: /* The sort order of the returned Notes, expressed as a Lucene query */ Parameters.Sort;
            from?: /* The index of the first Note to return in this query */ Parameters.From;
            size?: /* The number of Note entries to return in this query */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = Components.Schemas.NotesResponse;
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
        export interface RequestBody {
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
            content: Components.Schemas.LexicalNode | string;
            entity_id: string;
        }
        namespace Responses {
            export type $200 = /* A note Entity object cotaining Entity metadata and content in a LexicalNode format */ Components.Schemas.NoteEntity;
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
    parameters?: Parameters<Paths.GetNote.PathParameters> | null,
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
      parameters?: Parameters<Paths.GetNote.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetNote.Responses.$200>
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

export type BaseNoteEntity = Components.Schemas.BaseNoteEntity;
export type ContextType = Components.Schemas.ContextType;
export type Entity = Components.Schemas.Entity;
export type LexicalNode = Components.Schemas.LexicalNode;
export type NoteEntity = Components.Schemas.NoteEntity;
export type NotesResponse = Components.Schemas.NotesResponse;
