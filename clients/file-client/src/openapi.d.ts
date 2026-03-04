/* eslint-disable */

import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Parameters {
        export type ActivityIdQueryParam = /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        Schemas.ActivityId /* ulid */;
        export type AsyncOperationQueryParam = boolean;
        export type DeleteTempFileQueryParam = boolean;
        export type EntityIdPathParam = /**
         * example:
         * ef7d985c-2385-44f4-9c71-ae06a52264f8
         */
        Schemas.EntityId;
        export type FillActivityQueryParam = boolean;
        export type StrictQueryParam = boolean;
        export type VersionOnlyQueryParam = boolean;
    }
    export interface PathParameters {
        EntityIdPathParam?: Parameters.EntityIdPathParam;
    }
    export interface QueryParameters {
        StrictQueryParam?: Parameters.StrictQueryParam;
        ActivityIdQueryParam?: Parameters.ActivityIdQueryParam;
        FillActivityQueryParam?: Parameters.FillActivityQueryParam;
        AsyncOperationQueryParam?: Parameters.AsyncOperationQueryParam;
        DeleteTempFileQueryParam?: Parameters.DeleteTempFileQueryParam;
        VersionOnlyQueryParam?: Parameters.VersionOnlyQueryParam;
    }
    namespace Responses {
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 400,
         *   "error": "Bad Request: filename is required"
         * }
         */
        export interface BadRequestError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 403,
         *   "error": "Forbidden: You do not have permission to access this file"
         * }
         */
        export interface ForbiddenError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 500,
         *   "error": "Internal Server Error"
         * }
         */
        export interface InternalServerError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 404,
         *   "error": "Not Found: File entity not found"
         * }
         */
        export interface NotFoundError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 401,
         *   "error": "Unauthorized: Invalid or expired token"
         * }
         */
        export interface UnauthorizedError {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
    }
    namespace Schemas {
        /**
         * See https://github.com/ulid/spec
         * example:
         * 01F130Q52Q6MWSNS8N2AVXV4JN
         */
        export type ActivityId = string; // ulid
        /**
         * Access control list (ACL) for an entity. Defines sharing access to external orgs or users.
         */
        export interface BaseEntityAcl {
            view?: string[];
            edit?: string[];
            delete?: string[];
        }
        /**
         * The user / organization owning this entity.
         *
         * Note: Owner implicitly has access to the entity regardless of ACLs.
         *
         */
        export interface BaseEntityOwner {
            /**
             * example:
             * 123
             */
            org_id: string;
            /**
             * example:
             * 123
             */
            user_id?: string;
        }
        /**
         * Payload for batch version save. Only s3ref payloads are supported.
         */
        export interface BatchSaveFileVersionPayload {
            /**
             * Target file entity to add version to
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            _id?: /**
             * Target file entity to add version to
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            string | string /* uuid */;
            /**
             * Deprecated, use _id instead
             */
            file_entity_id?: string;
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            /**
             * example:
             * application/pdf
             */
            mime_type?: string;
            access_control?: "private" | "public-read";
            s3ref: S3Ref;
        }
        export interface CommonSaveFilePayload {
            [name: string]: any;
            /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            _id?: /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            string | string /* uuid */;
            /**
             * Deprecated, use _id instead
             */
            file_entity_id?: string;
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
        }
        /**
         * Custom external download url used for the file
         * example:
         * https://some-api-url.com/download?file_id=123
         */
        export type CustomDownloadUrl = string; // uri
        export type DownloadFilesPayload = {
            id: /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            FileEntityId;
            /**
             * File version
             * example:
             * 0
             */
            version?: number;
        }[];
        /**
         * example:
         * ef7d985c-2385-44f4-9c71-ae06a52264f8
         */
        export type EntityId = string;
        /**
         * URL-friendly identifier for the entity schema
         * example:
         * contact
         */
        export type EntitySlug = string;
        /**
         * A generic error returned by the API
         */
        export interface ErrorObject {
            /**
             * The HTTP status code of the error
             * example:
             * 400
             */
            status?: number;
            /**
             * The error message
             * example:
             * Bad Request
             */
            error?: string;
        }
        export interface FileAttributes {
            /**
             * example:
             * [
             *   "tag1",
             *   "tag2"
             * ]
             */
            _tags?: string[];
            /**
             * example:
             * [
             *   "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
             *   "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            type?: FileType;
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * File size in bytes
             * example:
             * 1234
             */
            size_bytes?: number;
            /**
             * Human readable file size
             * example:
             * 1.2 MB
             */
            readable_size?: string;
            access_control?: "private" | "public-read";
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            custom_download_url?: /**
             * Custom external download url used for the file
             * example:
             * https://some-api-url.com/download?file_id=123
             */
            CustomDownloadUrl /* uri */;
        }
        export interface FileCollectionAttributes {
            /**
             * Name of the collection
             */
            name?: string;
            /**
             * Array of parent collection slugs, empty array if top-level collection
             */
            parents?: string[];
            /**
             * Whether the collection is starred / favorited
             */
            starred?: boolean;
            /**
             * List of location slugs where the collection is enabled. If empty, enabled for all.
             */
            enabled_locations?: string[];
            /**
             * List of purpose IDs where the collection is enabled. If empty, enabled for all.
             */
            enabled_purposes?: string[];
        }
        /**
         * Request body for creating a file collection
         */
        export interface FileCollectionCreateRequest {
            /**
             * Name of the collection
             */
            name: string;
            /**
             * Array of parent collection slugs, empty array if top-level collection
             */
            parents?: string[];
            /**
             * Whether the collection is starred / favorited
             */
            starred?: boolean;
            /**
             * List of location slugs where the collection is enabled. If empty, enabled for all.
             */
            enabled_locations?: string[];
            /**
             * List of purpose IDs where the collection is enabled. If empty, enabled for all.
             */
            enabled_purposes?: string[];
        }
        /**
         * Generated uuid for a file collection
         */
        export type FileCollectionId = string; // uuid
        /**
         * A file collection with identifiers and timestamps
         */
        export interface FileCollectionItem {
            /**
             * Full slug for the collection. Format depends on collection type:
             * - User collection: `_system_files_collection_{entity_uuid}_{user_id}:{collection_name}`
             *   Example: `_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234:documents`
             * - Global collection: `_system_files_collection_schema_{schema_slug}:{collection_name}`
             *   Example: `_system_files_collection_schema_opportunity:templates`
             *
             * example:
             * _system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234:documents
             */
            slug?: string;
            /**
             * Display name of the collection
             * example:
             * Documents
             */
            name: string;
            id?: /* Generated uuid for a file collection */ FileCollectionId /* uuid */;
            /**
             * Array of parent collection slugs, empty array if top-level collection. Format depends on collection type:
             * - User collection: `_system_files_collection_{entity_uuid}_{user_id}`
             *   Example: `["_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234"]`
             * - Global collection: `_system_files_collection_schema_{schema_slug}`
             *   Example: `["_system_files_collection_schema_opportunity"]`
             *
             * example:
             * [
             *   "_system_files_collection_3fa85f64-5717-4562-b3fc-2c963f66afa6_10234"
             * ]
             */
            parents?: string[];
            /**
             * Whether the collection is starred / favorited
             * example:
             * false
             */
            starred?: boolean;
            /**
             * Display order for the collection
             * example:
             * 0
             */
            order?: number;
            /**
             * List of location slugs where the collection is enabled. If empty, enabled for all.
             */
            enabled_locations?: string[];
            /**
             * List of purpose slugs where the collection is enabled. If empty, enabled for all.
             * example:
             * [
             *   "9eefcb98-93cf-4c5b-a040-f1d26d57c177",
             *   "5c544c09-a691-43ed-a7fa-0a8b44b5b161"
             * ]
             */
            enabled_purposes?: string[];
            /**
             * Timestamp when the collection was created
             * example:
             * 2024-01-01T12:00:00Z
             */
            created_at?: string; // date-time
            /**
             * Timestamp when the collection was last updated
             * example:
             * 2024-01-02T12:00:00Z
             */
            updated_at?: string; // date-time
        }
        export interface FileEntity {
            /**
             * example:
             * document.pdf
             */
            _title: string;
            _schema: "file";
            /**
             * example:
             * 123
             */
            _org: string;
            _id: /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            FileEntityId;
            /**
             * example:
             * [
             *   "tag1",
             *   "tag2"
             * ]
             */
            _tags?: string[];
            /**
             * example:
             * [
             *   "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
             *   "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * example:
             * document.pdf
             */
            filename: string;
            type: FileType;
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * File size in bytes
             * example:
             * 1234
             */
            size_bytes?: number;
            /**
             * Human readable file size
             * example:
             * 1.2 MB
             */
            readable_size?: string;
            access_control: "private" | "public-read";
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            custom_download_url?: /**
             * Custom external download url used for the file
             * example:
             * https://some-api-url.com/download?file_id=123
             */
            CustomDownloadUrl /* uri */;
            /**
             * Source URL for the file. Included if the entity was created from source_url, or when ?source_url=true
             * example:
             * https://productengineer-content.s3.eu-west-1.amazonaws.com/product-engineer-checklist.pdf
             */
            source_url?: string;
            s3ref?: S3Reference;
            versions: FileItem[];
            _updated_at?: string; // date-time
            _created_at?: string; // date-time
            _acl?: /* Access control list (ACL) for an entity. Defines sharing access to external orgs or users. */ BaseEntityAcl;
            _owners?: /**
             * The user / organization owning this entity.
             *
             * Note: Owner implicitly has access to the entity regardless of ACLs.
             *
             */
            BaseEntityOwner[];
            /**
             * Additional fields that are not part of the schema
             */
            __additional?: {
                [name: string]: any;
            } | null;
        }
        /**
         * example:
         * ef7d985c-2385-44f4-9c71-ae06a52264f8
         */
        export type FileEntityId = /**
         * example:
         * ef7d985c-2385-44f4-9c71-ae06a52264f8
         */
        string | string /* uuid */;
        export interface FileItem {
            s3ref?: S3Ref;
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            /**
             * example:
             * 1234
             */
            size_bytes?: number;
            /**
             * example:
             * 1.2 MB
             */
            readable_size?: string;
            /**
             * example:
             * image/jpeg
             */
            mime_type?: string;
        }
        export interface FileRelationItem {
            entity_id: /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            EntityId;
            _schema?: /**
             * URL-friendly identifier for the entity schema
             * example:
             * contact
             */
            EntitySlug;
            _tags?: string[];
        }
        export type FileType = "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
        export interface FileUpload {
            s3ref?: S3Reference;
            /**
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
             */
            upload_url?: string; // url
            /**
             * Returned only if file is permanent i.e. file_entity_id is passed
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
        }
        export interface PublicLink {
            /**
             * ID of the public link
             * example:
             * 3ef5c6d9-818d-45e6-8efb-b1de59079a1c
             */
            id?: string;
            /**
             * Public link of the file
             * example:
             * https://file.sls.epilot.io/v1/files/public/links/3ef5c6d9-818d-45e6-8efb-b1de59079a1c
             */
            link?: string;
            /**
             * The most recent timestamp when the file was accessed
             */
            last_accessed_at?: string;
        }
        export type S3Ref = S3Reference;
        export interface S3Reference {
            /**
             * example:
             * epilot-prod-user-content
             */
            bucket: string;
            /**
             * example:
             * 123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            key: string;
        }
        export interface SaveCustomFilePayload {
            [name: string]: any;
            /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            _id?: /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            string | string /* uuid */;
            /**
             * Deprecated, use _id instead
             */
            file_entity_id?: string;
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
            /**
             * example:
             * [
             *   "tag1",
             *   "tag2"
             * ]
             */
            _tags?: string[];
            /**
             * example:
             * [
             *   "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
             *   "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            type?: FileType;
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * File size in bytes
             * example:
             * 1234
             */
            size_bytes?: number;
            /**
             * Human readable file size
             * example:
             * 1.2 MB
             */
            readable_size?: string;
            access_control?: "private" | "public-read";
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            custom_download_url?: /**
             * Custom external download url used for the file
             * example:
             * https://some-api-url.com/download?file_id=123
             */
            CustomDownloadUrl /* uri */;
        }
        export interface SaveFileFromSourceURLPayload {
            [name: string]: any;
            /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            _id?: /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            string | string /* uuid */;
            /**
             * Deprecated, use _id instead
             */
            file_entity_id?: string;
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
            /**
             * example:
             * [
             *   "tag1",
             *   "tag2"
             * ]
             */
            _tags?: string[];
            /**
             * example:
             * [
             *   "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
             *   "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            type?: FileType;
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * File size in bytes
             * example:
             * 1234
             */
            size_bytes?: number;
            /**
             * Human readable file size
             * example:
             * 1.2 MB
             */
            readable_size?: string;
            access_control?: "private" | "public-read";
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            custom_download_url?: /**
             * Custom external download url used for the file
             * example:
             * https://some-api-url.com/download?file_id=123
             */
            CustomDownloadUrl /* uri */;
            source_url?: /**
             * Custom external download url used for the file
             * example:
             * https://some-api-url.com/download?file_id=123
             */
            CustomDownloadUrl /* uri */;
        }
        export type SaveFilePayload = SaveS3FilePayload | SaveFileFromSourceURLPayload | SaveCustomFilePayload;
        export type SaveFilePayloadV2 = SaveS3FilePayload | SaveFileFromSourceURLPayload | SaveCustomFilePayload;
        export interface SaveS3FilePayload {
            [name: string]: any;
            /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            _id?: /**
             * if passed, adds a new version to existing file entity
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            string | string /* uuid */;
            /**
             * Deprecated, use _id instead
             */
            file_entity_id?: string;
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
            /**
             * example:
             * [
             *   "tag1",
             *   "tag2"
             * ]
             */
            _tags?: string[];
            /**
             * example:
             * [
             *   "8d396871-95a0-4c9d-bb4d-9eda9c35776c",
             *   "da7cdf9a-01be-40c9-a29c-9a8f9f0de6f8"
             * ]
             */
            _purpose?: string[];
            /**
             * Manifest ID used to create/update the entity
             */
            _manifest?: string /* uuid */[];
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            type?: FileType;
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * File size in bytes
             * example:
             * 1234
             */
            size_bytes?: number;
            /**
             * Human readable file size
             * example:
             * 1.2 MB
             */
            readable_size?: string;
            access_control?: "private" | "public-read";
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            custom_download_url?: /**
             * Custom external download url used for the file
             * example:
             * https://some-api-url.com/download?file_id=123
             */
            CustomDownloadUrl /* uri */;
            s3ref?: S3Ref;
        }
        export interface UploadFilePayload {
            /**
             * example:
             * document.pdf
             */
            filename: string;
            /**
             * MIME type of file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * Used to index the file at the storage layer, which helps when browsing for this file
             * example:
             * 2f6a377c8e78
             */
            index_tag?: string;
            /**
             * Allows passing in custom metadata for the file, expects key-value pairs of string type
             * example:
             * {
             *   "color": "blue"
             * }
             */
            metadata?: {
                [name: string]: string;
            };
        }
        export interface VerifyCustomDownloadUrlPayload {
            /**
             * Custom external download url with signature and expiration time
             * example:
             * https://some-api-url.com?file_id=123&expires_at=1699273500029&signature=abcdefg
             */
            custom_download_url: string;
        }
    }
}
declare namespace Paths {
    namespace AccessPublicLink {
        namespace Parameters {
            export type Filename = string;
            export type Hash = string;
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
            filename: Parameters.Filename;
        }
        export interface QueryParameters {
            hash?: Parameters.Hash;
        }
        namespace Responses {
            export interface $302 {
            }
            export type $404 = /* A generic error returned by the API */ Components.Schemas.ErrorObject;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace CreateUserSchemaFileCollection {
        namespace Parameters {
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        export type RequestBody = /* Request body for creating a file collection */ Components.Schemas.FileCollectionCreateRequest;
        namespace Responses {
            export type $201 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem;
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace DeleteFile {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
            /**
             * Provide `true` to permanently delete the file from storage, otherwise it will be soft-deleted
             */
            export type Purge = boolean;
            export type Strict = boolean;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            purge?: /* Provide `true` to permanently delete the file from storage, otherwise it will be soft-deleted */ Parameters.Purge;
            activity_id?: Parameters.ActivityId;
            strict?: Parameters.Strict;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FileEntity;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $403 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden: You do not have permission to access this file"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace DeleteSession {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteUserSchemaFileCollection {
        namespace Parameters {
            export type CollectionSlug = string;
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            collectionSlug: Parameters.CollectionSlug;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace DownloadFile {
        namespace Parameters {
            export type Attachment = boolean;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
            export type Version = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            version?: Parameters.Version;
            attachment?: Parameters.Attachment;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Pre-signed S3 URL valid for downloading the file
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                download_url?: string; // uri
            }
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $403 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden: You do not have permission to access this file"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace DownloadFiles {
        export type RequestBody = Components.Schemas.DownloadFilesPayload;
        namespace Responses {
            export type $200 = {
                /**
                 * Pre-signed S3 URL for downloading the file
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                download_url?: string; // uri
                /**
                 * The file entity ID (matches the requested ID)
                 */
                file_entity_id?: string; // uuid
            }[];
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace DownloadS3File {
        namespace Parameters {
            export type Attachment = boolean;
            export type S3Bucket = string;
            export type S3Key = string;
        }
        export interface QueryParameters {
            s3_key: Parameters.S3Key;
            s3_bucket: Parameters.S3Bucket;
            attachment?: Parameters.Attachment;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * Pre-signed S3 URL valid for downloading the file
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                download_url?: string; // uri
            }
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace GeneratePublicLink {
        namespace Parameters {
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            /**
             * The public URL that can be shared externally
             */
            export type $201 = string;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $403 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden: You do not have permission to access this file"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace GetFile {
        namespace Parameters {
            export type Async = boolean;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
            /**
             * Generate a source_url for the file entity, if it doesn't have one
             */
            export type SourceUrl = boolean;
            export type Strict = boolean;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            source_url?: /* Generate a source_url for the file entity, if it doesn't have one */ Parameters.SourceUrl;
            strict?: Parameters.Strict;
            async?: Parameters.Async;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FileEntity;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $403 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 403,
             *   "error": "Forbidden: You do not have permission to access this file"
             * }
             */
            Components.Responses.ForbiddenError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace GetFilesInCollection {
        namespace Parameters {
            export type CollectionSlug = string;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.EntityId;
        }
        export interface PathParameters {
            id: Parameters.Id;
            collectionSlug: Parameters.CollectionSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FileEntity[];
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $403 = /* A generic error returned by the API */ Components.Schemas.ErrorObject;
            export type $404 = /* A generic error returned by the API */ Components.Schemas.ErrorObject;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace GetGlobalFileCollections {
        namespace Parameters {
            export type SchemaSlug = string;
        }
        export interface PathParameters {
            schemaSlug: Parameters.SchemaSlug;
        }
        namespace Responses {
            export type $200 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem[];
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace GetSession {
        namespace Responses {
            export interface $200 {
            }
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
        }
    }
    namespace GetUserSchemaFileCollections {
        namespace Parameters {
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
        }
        namespace Responses {
            export type $200 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem[];
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace ListPublicLinksForFile {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.PublicLink[];
            }
            export type $501 = /* A generic error returned by the API */ Components.Schemas.ErrorObject;
        }
    }
    namespace PreviewFile {
        namespace Parameters {
            export type H = number;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
            export type Version = number;
            export type W = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            version?: Parameters.Version;
            w?: Parameters.W;
            h?: Parameters.H;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace PreviewPublicFile {
        namespace Parameters {
            export type H = number;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
            export type OrgId = string;
            export type Version = number;
            export type W = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export interface QueryParameters {
            version?: Parameters.Version;
            w?: Parameters.W;
            h?: Parameters.H;
            org_id?: Parameters.OrgId;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $403 = /* A generic error returned by the API */ Components.Schemas.ErrorObject;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace PreviewS3File {
        namespace Parameters {
            export type H = number;
            export type W = number;
        }
        export interface QueryParameters {
            w?: Parameters.W;
            h?: Parameters.H;
        }
        export type RequestBody = Components.Schemas.S3Ref;
        namespace Responses {
            export type $200 = string; // binary
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace PreviewS3FileGet {
        namespace Parameters {
            export type Bucket = string;
            export type H = number;
            export type Key = string;
            export type W = number;
        }
        export interface QueryParameters {
            key: Parameters.Key;
            bucket: Parameters.Bucket;
            w?: Parameters.W;
            h?: Parameters.H;
        }
        namespace Responses {
            export type $200 = string; // binary
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace RevokePublicLink {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $501 = /* A generic error returned by the API */ Components.Schemas.ErrorObject;
        }
    }
    namespace SaveFile {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type VersionOnly = boolean;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            async?: Parameters.Async;
            version_only?: Parameters.VersionOnly;
        }
        export type RequestBody = Components.Schemas.SaveFilePayload;
        namespace Responses {
            export type $201 = Components.Schemas.FileEntity;
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace SaveFileV2 {
        namespace Parameters {
            export type ActivityId = /**
             * See https://github.com/ulid/spec
             * example:
             * 01F130Q52Q6MWSNS8N2AVXV4JN
             */
            Components.Schemas.ActivityId /* ulid */;
            export type Async = boolean;
            export type DeleteTempFile = boolean;
            export type FillActivity = boolean;
            export type Strict = boolean;
            export type VersionOnly = boolean;
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            fill_activity?: Parameters.FillActivity;
            strict?: Parameters.Strict;
            async?: Parameters.Async;
            delete_temp_file?: Parameters.DeleteTempFile;
            version_only?: Parameters.VersionOnly;
        }
        export type RequestBody = Components.Schemas.SaveFilePayloadV2 | [
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?,
            /* Payload for batch version save. Only s3ref payloads are supported. */ Components.Schemas.BatchSaveFileVersionPayload?
        ];
        namespace Responses {
            export type $200 = Components.Schemas.FileEntity;
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace UpdateUserSchemaFileCollection {
        namespace Parameters {
            export type CollectionSlug = string;
            export type Slug = string;
        }
        export interface PathParameters {
            slug: Parameters.Slug;
            collectionSlug: Parameters.CollectionSlug;
        }
        export type RequestBody = Components.Schemas.FileCollectionAttributes;
        namespace Responses {
            export type $200 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem;
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found: File entity not found"
             * }
             */
            Components.Responses.NotFoundError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace UploadFile {
        namespace Parameters {
            export type FileEntityId = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
        }
        export interface QueryParameters {
            file_entity_id?: Parameters.FileEntityId;
        }
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $201 {
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                upload_url?: string; // url
                /**
                 * Returned only if file is permanent i.e. file_entity_id is passed
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                 */
                public_url?: string; // url
            }
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace UploadFilePublic {
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $201 {
                s3ref?: Components.Schemas.S3Reference;
                /**
                 * Pre-signed URL for uploading the file via PUT request
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                upload_url?: string; // url
                /**
                 * Error message if the upload preparation failed
                 * example:
                 * File entity not found
                 */
                error?: string;
            }
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace UploadFileV2 {
        namespace Parameters {
            export type FileEntityId = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.FileEntityId;
        }
        export interface QueryParameters {
            file_entity_id?: Parameters.FileEntityId;
        }
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export type $201 = Components.Schemas.FileUpload;
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
    namespace VerifyCustomDownloadUrl {
        export type RequestBody = Components.Schemas.VerifyCustomDownloadUrlPayload;
        namespace Responses {
            export interface $200 {
                /**
                 * Whether the URL is valid and not expired
                 */
                valid?: boolean;
            }
            export type $400 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 400,
             *   "error": "Bad Request: filename is required"
             * }
             */
            Components.Responses.BadRequestError;
            export type $401 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 401,
             *   "error": "Unauthorized: Invalid or expired token"
             * }
             */
            Components.Responses.UnauthorizedError;
            export type $500 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 500,
             *   "error": "Internal Server Error"
             * }
             */
            Components.Responses.InternalServerError;
        }
    }
}


export interface OperationMethods {
  /**
   * uploadFileV2 - uploadFileV2
   * 
   * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
   * 
   * Use the saveFileV2 operation to store file file permanently.
   * 
   */
  'uploadFileV2'(
    parameters?: Parameters<Paths.UploadFileV2.QueryParameters> | null,
    data?: Paths.UploadFileV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadFileV2.Responses.$201>
  /**
   * saveFileV2 - saveFileV2
   * 
   * Saves a permanent file entity. Updates an existing file entity when `_id` is passed.
   * 
   * Saves metadata to file entity and stores a version when `s3ref` or `source_url` is passed.
   * 
   */
  'saveFileV2'(
    parameters?: Parameters<Paths.SaveFileV2.QueryParameters> | null,
    data?: Paths.SaveFileV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveFileV2.Responses.$200>
  /**
   * uploadFile - uploadFile
   * 
   * **DEPRECATED** - Will be removed on **2025-06-30**. Use `POST /v2/files/upload` instead.
   * 
   * ## Migration Guide
   * Replace calls to this endpoint with `uploadFileV2`:
   * 
   * | v1 Parameter | v2 Parameter | Notes |
   * |--------------|--------------|-------|
   * | `file_entity_id` | `file_entity_id` | No change |
   * 
   * The v2 response includes the same fields with improved structure.
   * 
   * ---
   * 
   * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
   * 
   * Use the saveFile operation to store file file permanently.
   * 
   */
  'uploadFile'(
    parameters?: Parameters<Paths.UploadFile.QueryParameters> | null,
    data?: Paths.UploadFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadFile.Responses.$201>
  /**
   * saveFile - saveFile
   * 
   * **DEPRECATED** - Will be removed on **2025-06-30**. Use `POST /v2/files` instead.
   * 
   * ## Migration Guide
   * Replace calls to this endpoint with `saveFileV2`:
   * 
   * | v1 Feature | v2 Feature | Notes |
   * |------------|------------|-------|
   * | `activity_id` param | `activity_id` param | No change |
   * | `async` param | `async` param | No change |
   * | - | `fill_activity` param | New in v2 |
   * | - | `strict` param | New in v2 |
   * | - | `delete_temp_file` param | New in v2, defaults to true |
   * 
   * The v2 endpoint supports additional parameters for better control over file saving behavior.
   * 
   * ---
   * 
   * Create / Update a permanent File entity.
   * 
   * Makes file object permanent and saves metadata to file entity.
   * 
   */
  'saveFile'(
    parameters?: Parameters<Paths.SaveFile.QueryParameters> | null,
    data?: Paths.SaveFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveFile.Responses.$201>
  /**
   * getFile - getFile
   * 
   * Get a file entity by id
   */
  'getFile'(
    parameters?: Parameters<Paths.GetFile.QueryParameters & Paths.GetFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFile.Responses.$200>
  /**
   * deleteFile - deleteFile
   * 
   * Delete a file entity by id
   */
  'deleteFile'(
    parameters?: Parameters<Paths.DeleteFile.QueryParameters & Paths.DeleteFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteFile.Responses.$200>
  /**
   * downloadFile - downloadFile
   * 
   * Generate a pre-signed download URL for a file.
   * 
   * The returned URL is valid for a limited time (typically 15 minutes) and can be used to download the file directly.
   * 
   */
  'downloadFile'(
    parameters?: Parameters<Paths.DownloadFile.QueryParameters & Paths.DownloadFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadFile.Responses.$200>
  /**
   * downloadS3File - downloadS3File
   * 
   * Generate a pre-signed download URL for a file using its S3 reference.
   * 
   * Use this endpoint when you have the S3 bucket and key but not the file entity ID.
   * 
   */
  'downloadS3File'(
    parameters?: Parameters<Paths.DownloadS3File.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadS3File.Responses.$200>
  /**
   * downloadFiles - downloadFiles
   * 
   * Bulk generate pre-signed download URLs for multiple files in a single request.
   * 
   * This is more efficient than calling `downloadFile` multiple times when you need to download several files.
   * 
   */
  'downloadFiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DownloadFiles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadFiles.Responses.$200>
  /**
   * previewFile - previewFile
   * 
   * Generate a thumbnail preview for a file entity.
   * 
   * Supported file types include images (PNG, JPEG, GIF, WebP), PDFs, and common document formats.
   * The preview is returned as an image (PNG or JPEG).
   * 
   * **Tip:** Use with CookieAuth to embed previews directly in `<img>` tags.
   * 
   */
  'previewFile'(
    parameters?: Parameters<Paths.PreviewFile.QueryParameters & Paths.PreviewFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewFile.Responses.$200>
  /**
   * previewS3FileGet - previewS3FileGet
   * 
   * Get a thumbnail preview from an S3 reference using query parameters.
   * 
   * This GET variant is useful for embedding previews directly in `<img>` tags.
   * 
   */
  'previewS3FileGet'(
    parameters?: Parameters<Paths.PreviewS3FileGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewS3FileGet.Responses.$200>
  /**
   * previewS3File - previewS3File
   * 
   * Generate a thumbnail preview from an S3 reference.
   * 
   * Use this endpoint when you have the S3 bucket and key but not the file entity ID.
   * 
   */
  'previewS3File'(
    parameters?: Parameters<Paths.PreviewS3File.QueryParameters> | null,
    data?: Paths.PreviewS3File.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewS3File.Responses.$200>
  /**
   * previewPublicFile - previewPublicFile
   * 
   * Generate a thumbnail preview for a public file entity.
   * 
   * **No authentication required.** This endpoint only works for files with `access_control: public-read`.
   * 
   */
  'previewPublicFile'(
    parameters?: Parameters<Paths.PreviewPublicFile.QueryParameters & Paths.PreviewPublicFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PreviewPublicFile.Responses.$200>
  /**
   * getSession - getSession
   * 
   * Start a browser session by converting a Bearer token into a server-side cookie.
   * 
   * **Use case:** After calling this endpoint, you can use preview URLs directly in `<img>` tags
   * without needing to set the Authorization header manually.
   * 
   * **Example flow:**
   * 1. Call this endpoint with your Bearer token: `GET /v1/files/session` with `Authorization: Bearer <token>`
   * 2. The server sets an HTTP-only cookie named `token`
   * 3. Use preview URLs directly: `<img src="https://file.sls.epilot.io/v1/files/{id}/preview" />`
   * 
   */
  'getSession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetSession.Responses.$200>
  /**
   * deleteSession - deleteSession
   * 
   * End a browser session by deleting the token cookie.
   * 
   * Call this endpoint to log out and clear the session cookie.
   * 
   */
  'deleteSession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSession.Responses.$200>
  /**
   * listPublicLinksForFile - listPublicLinksForFile
   * 
   * **Not yet implemented.**
   * 
   * This endpoint will fetch all public links previously generated for a file.
   * 
   */
  'listPublicLinksForFile'(
    parameters?: Parameters<Paths.ListPublicLinksForFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPublicLinksForFile.Responses.$200>
  /**
   * generatePublicLink - generatePublicLink
   * 
   * Generate a public link to share a private file externally.
   * 
   * The generated link:
   * - Is permanent until explicitly revoked
   * - Includes the filename for user-friendly URLs
   * - Does not require authentication to access
   * - Redirects to a signed download URL when accessed
   * 
   * **Use case:** Share invoices, contracts, or documents with external parties who don't have epilot accounts.
   * 
   */
  'generatePublicLink'(
    parameters?: Parameters<Paths.GeneratePublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneratePublicLink.Responses.$201>
  /**
   * accessPublicLink - accessPublicLink
   * 
   * Access a file via its public link.
   * 
   * **No authentication required.** This endpoint redirects to a signed S3 URL for downloading the file.
   * 
   * The filename in the URL is for user-friendliness and SEO; the actual file is identified by the link ID.
   * 
   */
  'accessPublicLink'(
    parameters?: Parameters<Paths.AccessPublicLink.QueryParameters & Paths.AccessPublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * revokePublicLink - revokePublicLink
   * 
   * **Not yet implemented.**
   * 
   * This endpoint will revoke a public link, making the file inaccessible via that link.
   * 
   */
  'revokePublicLink'(
    parameters?: Parameters<Paths.RevokePublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokePublicLink.Responses.$204>
  /**
   * verifyCustomDownloadUrl - verifyCustomDownloadUrl
   * 
   * Verify that a custom download URL is valid and has not expired.
   * 
   * Use this endpoint to validate custom download URLs before redirecting users.
   * Custom download URLs include a signature and expiration time for security.
   * 
   */
  'verifyCustomDownloadUrl'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyCustomDownloadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyCustomDownloadUrl.Responses.$200>
  /**
   * uploadFilePublic - uploadFilePublic
   * 
   * Create a pre-signed S3 URL for uploading a file without authentication.
   * 
   * **No authentication required.** This endpoint is intended for public-facing forms and journeys
   * where end-users need to upload files without logging in.
   * 
   * The uploaded file is stored temporarily (one week). Use `saveFileV2` with proper authentication
   * to store the file permanently.
   * 
   * **Security note:** Files uploaded via this endpoint are temporary and require authenticated
   * access to be saved permanently.
   * 
   */
  'uploadFilePublic'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadFilePublic.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadFilePublic.Responses.$201>
  /**
   * getUserSchemaFileCollections - getUserSchemaFileCollections
   * 
   * Get all file collections for the current user within a specific schema.
   * 
   * Collections help organize files into logical groups (e.g., "Contracts", "Invoices").
   * User collections are private to the creating user.
   * 
   */
  'getUserSchemaFileCollections'(
    parameters?: Parameters<Paths.GetUserSchemaFileCollections.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserSchemaFileCollections.Responses.$200>
  /**
   * createUserSchemaFileCollection - createUserSchemaFileCollection
   * 
   * Create a new file collection for the current user within a specific schema.
   * 
   * The collection will be private to the creating user and associated with the specified schema.
   * 
   */
  'createUserSchemaFileCollection'(
    parameters?: Parameters<Paths.CreateUserSchemaFileCollection.PathParameters> | null,
    data?: Paths.CreateUserSchemaFileCollection.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUserSchemaFileCollection.Responses.$201>
  /**
   * updateUserSchemaFileCollection - updateUserSchemaFileCollection
   * 
   * Update an existing file collection.
   * 
   * You can update the name, parent relationships, starred status, and enabled locations/purposes.
   * 
   */
  'updateUserSchemaFileCollection'(
    parameters?: Parameters<Paths.UpdateUserSchemaFileCollection.PathParameters> | null,
    data?: Paths.UpdateUserSchemaFileCollection.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserSchemaFileCollection.Responses.$200>
  /**
   * deleteUserSchemaFileCollection - deleteUserSchemaFileCollection
   * 
   * Delete a file collection.
   * 
   * **Note:** Deleting a collection does not delete the files within it.
   * Files will remain but will no longer be associated with this collection.
   * 
   */
  'deleteUserSchemaFileCollection'(
    parameters?: Parameters<Paths.DeleteUserSchemaFileCollection.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserSchemaFileCollection.Responses.$200>
  /**
   * getFilesInCollection - getFilesInCollection
   * 
   * Get all files within a specific collection for an entity.
   * 
   * The schema is automatically derived from the entity. This endpoint requires
   * view permission on the parent entity to access its files.
   * 
   */
  'getFilesInCollection'(
    parameters?: Parameters<Paths.GetFilesInCollection.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFilesInCollection.Responses.$200>
  /**
   * getGlobalFileCollections - getGlobalFileCollections
   * 
   * Get all global file collections for a specific schema.
   * 
   * Global collections are shared across all users in the organization for the specified schema.
   * Unlike user collections, these are visible to everyone with access to entities of that schema.
   * 
   */
  'getGlobalFileCollections'(
    parameters?: Parameters<Paths.GetGlobalFileCollections.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetGlobalFileCollections.Responses.$200>
}

export interface PathsDictionary {
  ['/v2/files/upload']: {
    /**
     * uploadFileV2 - uploadFileV2
     * 
     * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
     * 
     * Use the saveFileV2 operation to store file file permanently.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.UploadFileV2.QueryParameters> | null,
      data?: Paths.UploadFileV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadFileV2.Responses.$201>
  }
  ['/v2/files']: {
    /**
     * saveFileV2 - saveFileV2
     * 
     * Saves a permanent file entity. Updates an existing file entity when `_id` is passed.
     * 
     * Saves metadata to file entity and stores a version when `s3ref` or `source_url` is passed.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SaveFileV2.QueryParameters> | null,
      data?: Paths.SaveFileV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveFileV2.Responses.$200>
  }
  ['/v1/files/upload']: {
    /**
     * uploadFile - uploadFile
     * 
     * **DEPRECATED** - Will be removed on **2025-06-30**. Use `POST /v2/files/upload` instead.
     * 
     * ## Migration Guide
     * Replace calls to this endpoint with `uploadFileV2`:
     * 
     * | v1 Parameter | v2 Parameter | Notes |
     * |--------------|--------------|-------|
     * | `file_entity_id` | `file_entity_id` | No change |
     * 
     * The v2 response includes the same fields with improved structure.
     * 
     * ---
     * 
     * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
     * 
     * Use the saveFile operation to store file file permanently.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.UploadFile.QueryParameters> | null,
      data?: Paths.UploadFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadFile.Responses.$201>
  }
  ['/v1/files']: {
    /**
     * saveFile - saveFile
     * 
     * **DEPRECATED** - Will be removed on **2025-06-30**. Use `POST /v2/files` instead.
     * 
     * ## Migration Guide
     * Replace calls to this endpoint with `saveFileV2`:
     * 
     * | v1 Feature | v2 Feature | Notes |
     * |------------|------------|-------|
     * | `activity_id` param | `activity_id` param | No change |
     * | `async` param | `async` param | No change |
     * | - | `fill_activity` param | New in v2 |
     * | - | `strict` param | New in v2 |
     * | - | `delete_temp_file` param | New in v2, defaults to true |
     * 
     * The v2 endpoint supports additional parameters for better control over file saving behavior.
     * 
     * ---
     * 
     * Create / Update a permanent File entity.
     * 
     * Makes file object permanent and saves metadata to file entity.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.SaveFile.QueryParameters> | null,
      data?: Paths.SaveFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveFile.Responses.$201>
  }
  ['/v2/files/{id}']: {
    /**
     * getFile - getFile
     * 
     * Get a file entity by id
     */
    'get'(
      parameters?: Parameters<Paths.GetFile.QueryParameters & Paths.GetFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFile.Responses.$200>
    /**
     * deleteFile - deleteFile
     * 
     * Delete a file entity by id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteFile.QueryParameters & Paths.DeleteFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteFile.Responses.$200>
  }
  ['/v1/files/{id}/download']: {
    /**
     * downloadFile - downloadFile
     * 
     * Generate a pre-signed download URL for a file.
     * 
     * The returned URL is valid for a limited time (typically 15 minutes) and can be used to download the file directly.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.DownloadFile.QueryParameters & Paths.DownloadFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DownloadFile.Responses.$200>
  }
  ['/v1/files:downloadS3']: {
    /**
     * downloadS3File - downloadS3File
     * 
     * Generate a pre-signed download URL for a file using its S3 reference.
     * 
     * Use this endpoint when you have the S3 bucket and key but not the file entity ID.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.DownloadS3File.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DownloadS3File.Responses.$200>
  }
  ['/v1/files:downloadFiles']: {
    /**
     * downloadFiles - downloadFiles
     * 
     * Bulk generate pre-signed download URLs for multiple files in a single request.
     * 
     * This is more efficient than calling `downloadFile` multiple times when you need to download several files.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DownloadFiles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DownloadFiles.Responses.$200>
  }
  ['/v1/files/{id}/preview']: {
    /**
     * previewFile - previewFile
     * 
     * Generate a thumbnail preview for a file entity.
     * 
     * Supported file types include images (PNG, JPEG, GIF, WebP), PDFs, and common document formats.
     * The preview is returned as an image (PNG or JPEG).
     * 
     * **Tip:** Use with CookieAuth to embed previews directly in `<img>` tags.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.PreviewFile.QueryParameters & Paths.PreviewFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewFile.Responses.$200>
  }
  ['/v1/files:previewS3']: {
    /**
     * previewS3File - previewS3File
     * 
     * Generate a thumbnail preview from an S3 reference.
     * 
     * Use this endpoint when you have the S3 bucket and key but not the file entity ID.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.PreviewS3File.QueryParameters> | null,
      data?: Paths.PreviewS3File.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewS3File.Responses.$200>
    /**
     * previewS3FileGet - previewS3FileGet
     * 
     * Get a thumbnail preview from an S3 reference using query parameters.
     * 
     * This GET variant is useful for embedding previews directly in `<img>` tags.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.PreviewS3FileGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewS3FileGet.Responses.$200>
  }
  ['/v1/files/public/{id}/preview']: {
    /**
     * previewPublicFile - previewPublicFile
     * 
     * Generate a thumbnail preview for a public file entity.
     * 
     * **No authentication required.** This endpoint only works for files with `access_control: public-read`.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.PreviewPublicFile.QueryParameters & Paths.PreviewPublicFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PreviewPublicFile.Responses.$200>
  }
  ['/v1/files/session']: {
    /**
     * getSession - getSession
     * 
     * Start a browser session by converting a Bearer token into a server-side cookie.
     * 
     * **Use case:** After calling this endpoint, you can use preview URLs directly in `<img>` tags
     * without needing to set the Authorization header manually.
     * 
     * **Example flow:**
     * 1. Call this endpoint with your Bearer token: `GET /v1/files/session` with `Authorization: Bearer <token>`
     * 2. The server sets an HTTP-only cookie named `token`
     * 3. Use preview URLs directly: `<img src="https://file.sls.epilot.io/v1/files/{id}/preview" />`
     * 
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetSession.Responses.$200>
    /**
     * deleteSession - deleteSession
     * 
     * End a browser session by deleting the token cookie.
     * 
     * Call this endpoint to log out and clear the session cookie.
     * 
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteSession.Responses.$200>
  }
  ['/v1/files/{id}/public/links']: {
    /**
     * generatePublicLink - generatePublicLink
     * 
     * Generate a public link to share a private file externally.
     * 
     * The generated link:
     * - Is permanent until explicitly revoked
     * - Includes the filename for user-friendly URLs
     * - Does not require authentication to access
     * - Redirects to a signed download URL when accessed
     * 
     * **Use case:** Share invoices, contracts, or documents with external parties who don't have epilot accounts.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.GeneratePublicLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneratePublicLink.Responses.$201>
    /**
     * listPublicLinksForFile - listPublicLinksForFile
     * 
     * **Not yet implemented.**
     * 
     * This endpoint will fetch all public links previously generated for a file.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.ListPublicLinksForFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ListPublicLinksForFile.Responses.$200>
  }
  ['/v1/files/public/links/{id}/{filename}']: {
    /**
     * accessPublicLink - accessPublicLink
     * 
     * Access a file via its public link.
     * 
     * **No authentication required.** This endpoint redirects to a signed S3 URL for downloading the file.
     * 
     * The filename in the URL is for user-friendliness and SEO; the actual file is identified by the link ID.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.AccessPublicLink.QueryParameters & Paths.AccessPublicLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/files/public/links/{id}']: {
    /**
     * revokePublicLink - revokePublicLink
     * 
     * **Not yet implemented.**
     * 
     * This endpoint will revoke a public link, making the file inaccessible via that link.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.RevokePublicLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokePublicLink.Responses.$204>
  }
  ['/v1/files/download:verify']: {
    /**
     * verifyCustomDownloadUrl - verifyCustomDownloadUrl
     * 
     * Verify that a custom download URL is valid and has not expired.
     * 
     * Use this endpoint to validate custom download URLs before redirecting users.
     * Custom download URLs include a signature and expiration time for security.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VerifyCustomDownloadUrl.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VerifyCustomDownloadUrl.Responses.$200>
  }
  ['/v1/files/public/upload']: {
    /**
     * uploadFilePublic - uploadFilePublic
     * 
     * Create a pre-signed S3 URL for uploading a file without authentication.
     * 
     * **No authentication required.** This endpoint is intended for public-facing forms and journeys
     * where end-users need to upload files without logging in.
     * 
     * The uploaded file is stored temporarily (one week). Use `saveFileV2` with proper authentication
     * to store the file permanently.
     * 
     * **Security note:** Files uploaded via this endpoint are temporary and require authenticated
     * access to be saved permanently.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadFilePublic.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadFilePublic.Responses.$201>
  }
  ['/v1/{slug}/collections']: {
    /**
     * getUserSchemaFileCollections - getUserSchemaFileCollections
     * 
     * Get all file collections for the current user within a specific schema.
     * 
     * Collections help organize files into logical groups (e.g., "Contracts", "Invoices").
     * User collections are private to the creating user.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetUserSchemaFileCollections.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserSchemaFileCollections.Responses.$200>
    /**
     * createUserSchemaFileCollection - createUserSchemaFileCollection
     * 
     * Create a new file collection for the current user within a specific schema.
     * 
     * The collection will be private to the creating user and associated with the specified schema.
     * 
     */
    'post'(
      parameters?: Parameters<Paths.CreateUserSchemaFileCollection.PathParameters> | null,
      data?: Paths.CreateUserSchemaFileCollection.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateUserSchemaFileCollection.Responses.$201>
  }
  ['/v1/{slug}/collections/{collectionSlug}']: {
    /**
     * updateUserSchemaFileCollection - updateUserSchemaFileCollection
     * 
     * Update an existing file collection.
     * 
     * You can update the name, parent relationships, starred status, and enabled locations/purposes.
     * 
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUserSchemaFileCollection.PathParameters> | null,
      data?: Paths.UpdateUserSchemaFileCollection.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserSchemaFileCollection.Responses.$200>
    /**
     * deleteUserSchemaFileCollection - deleteUserSchemaFileCollection
     * 
     * Delete a file collection.
     * 
     * **Note:** Deleting a collection does not delete the files within it.
     * Files will remain but will no longer be associated with this collection.
     * 
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteUserSchemaFileCollection.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteUserSchemaFileCollection.Responses.$200>
  }
  ['/v1/entity/{id}/collections/{collectionSlug}/files']: {
    /**
     * getFilesInCollection - getFilesInCollection
     * 
     * Get all files within a specific collection for an entity.
     * 
     * The schema is automatically derived from the entity. This endpoint requires
     * view permission on the parent entity to access its files.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetFilesInCollection.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFilesInCollection.Responses.$200>
  }
  ['/v1/collections/{schemaSlug}']: {
    /**
     * getGlobalFileCollections - getGlobalFileCollections
     * 
     * Get all global file collections for a specific schema.
     * 
     * Global collections are shared across all users in the organization for the specified schema.
     * Unlike user collections, these are visible to everyone with access to entities of that schema.
     * 
     */
    'get'(
      parameters?: Parameters<Paths.GetGlobalFileCollections.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetGlobalFileCollections.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ActivityId = Components.Schemas.ActivityId;
export type BaseEntityAcl = Components.Schemas.BaseEntityAcl;
export type BaseEntityOwner = Components.Schemas.BaseEntityOwner;
export type BatchSaveFileVersionPayload = Components.Schemas.BatchSaveFileVersionPayload;
export type CommonSaveFilePayload = Components.Schemas.CommonSaveFilePayload;
export type CustomDownloadUrl = Components.Schemas.CustomDownloadUrl;
export type DownloadFilesPayload = Components.Schemas.DownloadFilesPayload;
export type EntityId = Components.Schemas.EntityId;
export type EntitySlug = Components.Schemas.EntitySlug;
export type ErrorObject = Components.Schemas.ErrorObject;
export type FileAttributes = Components.Schemas.FileAttributes;
export type FileCollectionAttributes = Components.Schemas.FileCollectionAttributes;
export type FileCollectionCreateRequest = Components.Schemas.FileCollectionCreateRequest;
export type FileCollectionId = Components.Schemas.FileCollectionId;
export type FileCollectionItem = Components.Schemas.FileCollectionItem;
export type FileEntity = Components.Schemas.FileEntity;
export type FileEntityId = Components.Schemas.FileEntityId;
export type FileItem = Components.Schemas.FileItem;
export type FileRelationItem = Components.Schemas.FileRelationItem;
export type FileType = Components.Schemas.FileType;
export type FileUpload = Components.Schemas.FileUpload;
export type PublicLink = Components.Schemas.PublicLink;
export type S3Ref = Components.Schemas.S3Ref;
export type S3Reference = Components.Schemas.S3Reference;
export type SaveCustomFilePayload = Components.Schemas.SaveCustomFilePayload;
export type SaveFileFromSourceURLPayload = Components.Schemas.SaveFileFromSourceURLPayload;
export type SaveFilePayload = Components.Schemas.SaveFilePayload;
export type SaveFilePayloadV2 = Components.Schemas.SaveFilePayloadV2;
export type SaveS3FilePayload = Components.Schemas.SaveS3FilePayload;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
export type VerifyCustomDownloadUrlPayload = Components.Schemas.VerifyCustomDownloadUrlPayload;
