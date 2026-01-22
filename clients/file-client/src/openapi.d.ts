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
    }
    namespace Responses {
        /**
         * A generic error returned by the API
         * example:
         * {
         *   "status": 404,
         *   "error": "Not Found"
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
             *   "purpose:9eefcb98-93cf-4c5b-a040-f1d26d57c177",
             *   "purpose:5c544c09-a691-43ed-a7fa-0a8b44b5b161"
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
            /**
             * Name of the file
             * example:
             * invoice-2023-12.pdf
             */
            export type Filename = string;
            /**
             * An optional cache-busting hash for the file
             */
            export type Hash = string;
            /**
             * Id of the publicly generated link
             * example:
             * 13d22918-36bd-4227-9ad4-2cb978788c8d
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * Id of the publicly generated link
             * example:
             * 13d22918-36bd-4227-9ad4-2cb978788c8d
             */
            Parameters.Id;
            filename: /**
             * Name of the file
             * example:
             * invoice-2023-12.pdf
             */
            Parameters.Filename;
        }
        export interface QueryParameters {
            hash?: /* An optional cache-busting hash for the file */ Parameters.Hash;
        }
        namespace Responses {
            export interface $302 {
            }
        }
    }
    namespace CreateUserSchemaFileCollection {
        namespace Parameters {
            /**
             * example:
             * opportunity
             */
            export type Slug = string;
        }
        export interface PathParameters {
            slug: /**
             * example:
             * opportunity
             */
            Parameters.Slug;
        }
        export type RequestBody = /* Request body for creating a file collection */ Components.Schemas.FileCollectionCreateRequest;
        namespace Responses {
            export type $201 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem;
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
            /**
             * example:
             * documents
             */
            export type CollectionSlug = string;
            /**
             * example:
             * opportunity
             */
            export type Slug = string;
        }
        export interface PathParameters {
            slug: /**
             * example:
             * opportunity
             */
            Parameters.Slug;
            collectionSlug: /**
             * example:
             * documents
             */
            Parameters.CollectionSlug;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                download_url?: string; // uri
            }
        }
    }
    namespace DownloadFiles {
        export type RequestBody = Components.Schemas.DownloadFilesPayload;
        namespace Responses {
            export type $200 = {
                /**
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                download_url?: string; // uri
                file_entity_id?: string; // uuid
            }[];
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
                 * example:
                 * https://epilot-prod-user-content.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                download_url?: string; // uri
            }
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
             * example:
             * https://file.sls.epilot.io/v1/files/public/links/3ef5c6d9-818d-45e6-8efb-b1de59079a1c/invoice-2023-12.pdf
             */
            export type $201 = string;
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
        }
    }
    namespace GetFilesInCollection {
        namespace Parameters {
            /**
             * example:
             * documents
             */
            export type CollectionSlug = string;
            export type Id = /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            Components.Schemas.EntityId;
        }
        export interface PathParameters {
            id: Parameters.Id;
            collectionSlug: /**
             * example:
             * documents
             */
            Parameters.CollectionSlug;
        }
        namespace Responses {
            export type $200 = Components.Schemas.FileEntity[];
            export interface $403 {
                /**
                 * example:
                 * User must have permission to view this entity to access its files
                 */
                error?: string;
            }
            export interface $404 {
                /**
                 * example:
                 * Entity not found
                 */
                error?: string;
            }
        }
    }
    namespace GetGlobalFileCollections {
        namespace Parameters {
            /**
             * example:
             * order
             */
            export type SchemaSlug = string;
        }
        export interface PathParameters {
            schemaSlug: /**
             * example:
             * order
             */
            Parameters.SchemaSlug;
        }
        namespace Responses {
            export type $200 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem[];
        }
    }
    namespace GetSession {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace GetUserSchemaFileCollections {
        namespace Parameters {
            /**
             * example:
             * opportunity
             */
            export type Slug = string;
        }
        export interface PathParameters {
            slug: /**
             * example:
             * opportunity
             */
            Parameters.Slug;
        }
        namespace Responses {
            export type $200 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem[];
        }
    }
    namespace ListPublicLinksForFile {
        namespace Parameters {
            /**
             * ID of the file entity
             * example:
             * 13d22918-36bd-4227-9ad4-2cb978788c8d
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * ID of the file entity
             * example:
             * 13d22918-36bd-4227-9ad4-2cb978788c8d
             */
            Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.PublicLink[];
            }
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
    }
    namespace RevokePublicLink {
        namespace Parameters {
            /**
             * Id of the publicly generated link
             * example:
             * 13d22918-36bd-4227-9ad4-2cb978788c8d
             */
            export type Id = string;
        }
        export interface PathParameters {
            id: /**
             * Id of the publicly generated link
             * example:
             * 13d22918-36bd-4227-9ad4-2cb978788c8d
             */
            Parameters.Id;
        }
        namespace Responses {
            /**
             * example:
             * https://file.sls.epilot.io/v1/files/public/links/3ef5c6d9-818d-45e6-8efb-b1de59079a1c
             */
            export type $204 = string;
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
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            async?: Parameters.Async;
        }
        export type RequestBody = Components.Schemas.SaveFilePayload;
        namespace Responses {
            export type $201 = Components.Schemas.FileEntity;
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
        }
        export interface QueryParameters {
            activity_id?: Parameters.ActivityId;
            fill_activity?: Parameters.FillActivity;
            strict?: Parameters.Strict;
            async?: Parameters.Async;
            delete_temp_file?: Parameters.DeleteTempFile;
        }
        export type RequestBody = Components.Schemas.SaveFilePayloadV2;
        namespace Responses {
            export type $200 = Components.Schemas.FileEntity;
        }
    }
    namespace UpdateUserSchemaFileCollection {
        namespace Parameters {
            /**
             * example:
             * documents
             */
            export type CollectionSlug = string;
            /**
             * example:
             * opportunity
             */
            export type Slug = string;
        }
        export interface PathParameters {
            slug: /**
             * example:
             * opportunity
             */
            Parameters.Slug;
            collectionSlug: /**
             * example:
             * documents
             */
            Parameters.CollectionSlug;
        }
        export type RequestBody = Components.Schemas.FileCollectionAttributes;
        namespace Responses {
            export type $200 = /* A file collection with identifiers and timestamps */ Components.Schemas.FileCollectionItem;
            export type $404 = /**
             * A generic error returned by the API
             * example:
             * {
             *   "status": 404,
             *   "error": "Not Found"
             * }
             */
            Components.Responses.NotFoundError;
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
        }
    }
    namespace UploadFilePublic {
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
                 * example:
                 * File entity not found
                 */
                error?: string;
            }
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
        }
    }
    namespace VerifyCustomDownloadUrl {
        export type RequestBody = Components.Schemas.VerifyCustomDownloadUrlPayload;
        namespace Responses {
            export interface $200 {
                valid?: boolean;
            }
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
   * Create / Update a permanent File entity
   * 
   * Makes file object permanent
   * 
   * Saves metadata to file entity
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
   * Generate pre-signed download S3 url for a file
   */
  'downloadFile'(
    parameters?: Parameters<Paths.DownloadFile.QueryParameters & Paths.DownloadFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadFile.Responses.$200>
  /**
   * downloadS3File - downloadS3File
   * 
   * Generate pre-signed download S3 url for a file
   */
  'downloadS3File'(
    parameters?: Parameters<Paths.DownloadS3File.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadS3File.Responses.$200>
  /**
   * downloadFiles - downloadFiles
   * 
   * Bulk generate pre-signed download S3 urls for multiple files
   */
  'downloadFiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DownloadFiles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadFiles.Responses.$200>
  /**
   * previewFile - previewFile
   * 
   * Generate thumbnail preview for a file entity
   */
  'previewFile'(
    parameters?: Parameters<Paths.PreviewFile.QueryParameters & Paths.PreviewFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * previewS3FileGet - previewS3FileGet
   * 
   * Get thumbnail preview from an s3 reference for a file entity
   */
  'previewS3FileGet'(
    parameters?: Parameters<Paths.PreviewS3FileGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * previewS3File - previewS3File
   * 
   * Generate thumbnail preview from an s3 reference for a file entity
   */
  'previewS3File'(
    parameters?: Parameters<Paths.PreviewS3File.QueryParameters> | null,
    data?: Paths.PreviewS3File.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * previewPublicFile - previewPublicFile
   * 
   * Generate thumbnail preview for a public file entity
   */
  'previewPublicFile'(
    parameters?: Parameters<Paths.PreviewPublicFile.QueryParameters & Paths.PreviewPublicFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * getSession - getSession
   * 
   * Start a browser session by setting passed Authorization token in a server side cookie.
   * 
   * Allows using preview urls directly in img src for private files using cookie authentication.
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
   * End browser session by deleting token cookie
   */
  'deleteSession'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteSession.Responses.$200>
  /**
   * listPublicLinksForFile - listPublicLinksForFile
   * 
   * Not yet implemented; This API would fetch all the public links that are previously generated for a file
   */
  'listPublicLinksForFile'(
    parameters?: Parameters<Paths.ListPublicLinksForFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ListPublicLinksForFile.Responses.$200>
  /**
   * generatePublicLink - generatePublicLink
   * 
   * Generates a public link to access a private file
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
   * Redirects to a accessible signed url for the respective file associated to the public link
   */
  'accessPublicLink'(
    parameters?: Parameters<Paths.AccessPublicLink.QueryParameters & Paths.AccessPublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * revokePublicLink - revokePublicLink
   * 
   * Not yet implemented; This operation would revoke a given public link by ID
   */
  'revokePublicLink'(
    parameters?: Parameters<Paths.RevokePublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokePublicLink.Responses.$204>
  /**
   * verifyCustomDownloadUrl - verifyCustomDownloadUrl
   * 
   * Verify a pre-signed custom download url for a file
   */
  'verifyCustomDownloadUrl'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VerifyCustomDownloadUrl.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VerifyCustomDownloadUrl.Responses.$200>
  /**
   * uploadFilePublic - uploadFilePublic
   * 
   * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
   * 
   * Use the saveFileV2 operation to store file file permanently.
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
   * Gets a list of file collections for the current user and schema
   */
  'getUserSchemaFileCollections'(
    parameters?: Parameters<Paths.GetUserSchemaFileCollections.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetUserSchemaFileCollections.Responses.$200>
  /**
   * createUserSchemaFileCollection - createUserSchemaFileCollection
   * 
   * Creates a new file collection for the current user and schema
   */
  'createUserSchemaFileCollection'(
    parameters?: Parameters<Paths.CreateUserSchemaFileCollection.PathParameters> | null,
    data?: Paths.CreateUserSchemaFileCollection.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateUserSchemaFileCollection.Responses.$201>
  /**
   * updateUserSchemaFileCollection - updateUserSchemaFileCollection
   * 
   * Updates a file collection for the current user and schema
   */
  'updateUserSchemaFileCollection'(
    parameters?: Parameters<Paths.UpdateUserSchemaFileCollection.PathParameters> | null,
    data?: Paths.UpdateUserSchemaFileCollection.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateUserSchemaFileCollection.Responses.$200>
  /**
   * deleteUserSchemaFileCollection - deleteUserSchemaFileCollection
   * 
   * Deletes a file collection for the current user and schema
   */
  'deleteUserSchemaFileCollection'(
    parameters?: Parameters<Paths.DeleteUserSchemaFileCollection.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteUserSchemaFileCollection.Responses.$200>
  /**
   * getFilesInCollection - getFilesInCollection
   * 
   * Gets all files within a specific collection for an entity (uses schema-based taxonomy derived from entity)
   */
  'getFilesInCollection'(
    parameters?: Parameters<Paths.GetFilesInCollection.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFilesInCollection.Responses.$200>
  /**
   * getGlobalFileCollections - getGlobalFileCollections
   * 
   * Gets all global file collections for a specific schema
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
     * Create / Update a permanent File entity
     * 
     * Makes file object permanent
     * 
     * Saves metadata to file entity
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
     * Generate pre-signed download S3 url for a file
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
     * Generate pre-signed download S3 url for a file
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
     * Bulk generate pre-signed download S3 urls for multiple files
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
     * Generate thumbnail preview for a file entity
     */
    'get'(
      parameters?: Parameters<Paths.PreviewFile.QueryParameters & Paths.PreviewFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/files:previewS3']: {
    /**
     * previewS3File - previewS3File
     * 
     * Generate thumbnail preview from an s3 reference for a file entity
     */
    'post'(
      parameters?: Parameters<Paths.PreviewS3File.QueryParameters> | null,
      data?: Paths.PreviewS3File.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * previewS3FileGet - previewS3FileGet
     * 
     * Get thumbnail preview from an s3 reference for a file entity
     */
    'get'(
      parameters?: Parameters<Paths.PreviewS3FileGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/files/public/{id}/preview']: {
    /**
     * previewPublicFile - previewPublicFile
     * 
     * Generate thumbnail preview for a public file entity
     */
    'get'(
      parameters?: Parameters<Paths.PreviewPublicFile.QueryParameters & Paths.PreviewPublicFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/files/session']: {
    /**
     * getSession - getSession
     * 
     * Start a browser session by setting passed Authorization token in a server side cookie.
     * 
     * Allows using preview urls directly in img src for private files using cookie authentication.
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
     * End browser session by deleting token cookie
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
     * Generates a public link to access a private file
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
     * Not yet implemented; This API would fetch all the public links that are previously generated for a file
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
     * Redirects to a accessible signed url for the respective file associated to the public link
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
     * Not yet implemented; This operation would revoke a given public link by ID
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
     * Verify a pre-signed custom download url for a file
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
     * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
     * 
     * Use the saveFileV2 operation to store file file permanently.
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
     * Gets a list of file collections for the current user and schema
     */
    'get'(
      parameters?: Parameters<Paths.GetUserSchemaFileCollections.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetUserSchemaFileCollections.Responses.$200>
    /**
     * createUserSchemaFileCollection - createUserSchemaFileCollection
     * 
     * Creates a new file collection for the current user and schema
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
     * Updates a file collection for the current user and schema
     */
    'put'(
      parameters?: Parameters<Paths.UpdateUserSchemaFileCollection.PathParameters> | null,
      data?: Paths.UpdateUserSchemaFileCollection.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateUserSchemaFileCollection.Responses.$200>
    /**
     * deleteUserSchemaFileCollection - deleteUserSchemaFileCollection
     * 
     * Deletes a file collection for the current user and schema
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
     * Gets all files within a specific collection for an entity (uses schema-based taxonomy derived from entity)
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
     * Gets all global file collections for a specific schema
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
