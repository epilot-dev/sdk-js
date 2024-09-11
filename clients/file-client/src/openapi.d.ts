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
        export interface CommonSaveFilePayload {
            [name: string]: any;
            /**
             * if passed, adds a new version to existing file entity
             */
            file_entity_id?: string;
            document_type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            _tags?: string[];
            access_control?: "private" | "public-read";
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
        }
        export interface DeleteFilePayload {
            s3ref: S3Reference;
        }
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
        export interface FileEntity {
            _id?: /**
             * example:
             * ef7d985c-2385-44f4-9c71-ae06a52264f8
             */
            FileEntityId;
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            access_control?: "private" | "public-read";
            /**
             * Direct URL for file (public only if file access control is public-read)
             * example:
             * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            public_url?: string; // url
            /**
             * Human readable type for file
             */
            type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
            /**
             * MIME type of the file
             * example:
             * application/pdf
             */
            mime_type?: string;
            /**
             * File size in bytes
             */
            size_bytes?: number;
            versions?: {
                s3ref?: S3Reference;
            }[];
        }
        /**
         * example:
         * ef7d985c-2385-44f4-9c71-ae06a52264f8
         */
        export type FileEntityId = string;
        export interface FileItem {
            /**
             * example:
             * epilot-files-prod
             */
            bucket: string;
            /**
             * example:
             * 123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
             */
            key: string;
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
        export interface FileUpload {
            /**
             * example:
             * {
             *   "bucket": "epilot-files-prod",
             *   "key": "123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
             * }
             */
            s3ref?: {
                /**
                 * example:
                 * epilot-files-prod
                 */
                bucket: string;
                /**
                 * example:
                 * 123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                 */
                key: string;
            };
            /**
             * example:
             * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
             */
            upload_url?: string; // url
            /**
             * Returned only if file is permanent i.e. file_entity_id is passed
             * example:
             * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
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
        export interface S3Reference {
            /**
             * example:
             * epilot-files-prod
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
             */
            file_entity_id?: string;
            document_type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            _tags?: string[];
            access_control?: "private" | "public-read";
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
            /**
             * Custom external download url used for the file
             */
            custom_download_url: string; // uri
        }
        export type SaveFilePayload = SaveS3FilePayload | SaveCustomFilePayload;
        export interface SaveFilePayloadV2 {
            [name: string]: any;
            s3ref: {
                /**
                 * example:
                 * epilot-files-prod
                 */
                bucket: string;
                /**
                 * example:
                 * 123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                 */
                key: string;
            };
            /**
             * example:
             * document.pdf
             */
            filename: string;
            /**
             * if passed, adds a new version to existing file entity
             */
            file_entity_id?: string;
            document_type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
            _tags?: string[];
            access_control?: "private" | "public-read";
            /**
             * Custom external download url used for the file
             */
            custom_download_url?: string; // uri
        }
        export interface SaveS3FilePayload {
            [name: string]: any;
            /**
             * if passed, adds a new version to existing file entity
             */
            file_entity_id?: string;
            document_type?: "document" | "document_template" | "text" | "image" | "video" | "audio" | "spreadsheet" | "presentation" | "font" | "archive" | "application" | "unknown";
            /**
             * example:
             * document.pdf
             */
            filename?: string;
            _tags?: string[];
            access_control?: "private" | "public-read";
            /**
             * List of entities to relate the file to
             */
            relations?: FileRelationItem[];
            s3ref: S3Reference;
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
            custom_download_url: string; // uri
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
        namespace Responses {
            export interface $302 {
            }
        }
    }
    namespace DeleteFile {
        export type RequestBody = Components.Schemas.DeleteFilePayload;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DeleteSession {
        namespace Responses {
            export interface $200 {
            }
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
                 * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
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
                 * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
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
                 * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
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
    namespace GetAllPublicLinksForFile {
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
    namespace GetSession {
        namespace Responses {
            export interface $200 {
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
        export type RequestBody = Components.Schemas.S3Reference;
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
        export type RequestBody = Components.Schemas.SaveFilePayload;
        namespace Responses {
            export type $201 = Components.Schemas.FileEntity;
        }
    }
    namespace SaveFileV2 {
        export type RequestBody = Components.Schemas.SaveFilePayloadV2;
        namespace Responses {
            export type $201 = Components.Schemas.FileEntity;
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
                /**
                 * example:
                 * {
                 *   "bucket": "epilot-files-prod",
                 *   "key": "123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 * }
                 */
                s3ref?: {
                    /**
                     * example:
                     * epilot-files-prod
                     */
                    bucket: string;
                    /**
                     * example:
                     * 123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                     */
                    key: string;
                };
                /**
                 * example:
                 * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                upload_url?: string; // url
                /**
                 * Returned only if file is permanent i.e. file_entity_id is passed
                 * example:
                 * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                 */
                public_url?: string; // url
            }
        }
    }
    namespace UploadFilePublic {
        export type RequestBody = Components.Schemas.UploadFilePayload;
        namespace Responses {
            export interface $201 {
                /**
                 * example:
                 * {
                 *   "bucket": "epilot-files-prod",
                 *   "key": "123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf"
                 * }
                 */
                s3ref?: {
                    /**
                     * example:
                     * epilot-files-prod
                     */
                    bucket: string;
                    /**
                     * example:
                     * 123/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf
                     */
                    key: string;
                };
                /**
                 * example:
                 * https://epilot-files-prod.s3.eu-central-1.amazonaws.com/123/temp/4d689aeb-1497-4410-a9fe-b36ca9ac4389/document.pdf?AWSParams=123
                 */
                upload_url?: string; // url
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
   * uploadFilePublic - uploadFilePublic
   * 
   * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
   * 
   * Use the createFile operation to store file file permanently.
   * 
   */
  'uploadFilePublic'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadFilePublic.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadFilePublic.Responses.$201>
  /**
   * uploadFile - uploadFile
   * 
   * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
   * 
   * Use the createFile operation to store file file permanently.
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
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SaveFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveFile.Responses.$201>
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
   * downloadFiles - downloadFiles
   * 
   * Generate pre-signed download S3 urls for multiple files
   */
  'downloadFiles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DownloadFiles.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadFiles.Responses.$200>
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
   * deleteFile - deleteFile
   * 
   * Delete file entity
   */
  'deleteFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DeleteFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteFile.Responses.$200>
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
   * getAllPublicLinksForFile - getAllPublicLinksForFile
   * 
   * Not yet implemented; This API would fetches all the public links that are previously generated for a file
   */
  'getAllPublicLinksForFile'(
    parameters?: Parameters<Paths.GetAllPublicLinksForFile.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllPublicLinksForFile.Responses.$200>
  /**
   * generatePublicLink - generatePublicLink
   * 
   * Generates a public link to access the private files
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
    parameters?: Parameters<Paths.AccessPublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * revokePublicLink - revokePublicLink
   * 
   * Not yet implemented; This operation would revokes a given public link by ID
   */
  'revokePublicLink'(
    parameters?: Parameters<Paths.RevokePublicLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RevokePublicLink.Responses.$204>
  /**
   * uploadFileV2 - uploadFileV2
   * 
   * Create pre-signed S3 URL to upload a file to keep temporarily (one week). - v2
   * 
   * Use the createFile operation to store file file permanently.
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
   * Create / Update a permanent File entity
   * 
   * Makes file object permanent
   * 
   * Saves metadata to file entity
   * 
   */
  'saveFileV2'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SaveFileV2.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SaveFileV2.Responses.$201>
}

export interface PathsDictionary {
  ['/v1/files/public/upload']: {
    /**
     * uploadFilePublic - uploadFilePublic
     * 
     * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
     * 
     * Use the createFile operation to store file file permanently.
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadFilePublic.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadFilePublic.Responses.$201>
  }
  ['/v1/files/upload']: {
    /**
     * uploadFile - uploadFile
     * 
     * Create pre-signed S3 URL to upload a file to keep temporarily (one week).
     * 
     * Use the createFile operation to store file file permanently.
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
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SaveFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveFile.Responses.$201>
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
  ['/v1/files:downloadFiles']: {
    /**
     * downloadFiles - downloadFiles
     * 
     * Generate pre-signed download S3 urls for multiple files
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DownloadFiles.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DownloadFiles.Responses.$200>
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
  ['/v1/files:previewS3']: {
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
  }
  ['/v1/files/delete']: {
    /**
     * deleteFile - deleteFile
     * 
     * Delete file entity
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DeleteFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteFile.Responses.$200>
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
     * Generates a public link to access the private files
     * 
     */
    'post'(
      parameters?: Parameters<Paths.GeneratePublicLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneratePublicLink.Responses.$201>
    /**
     * getAllPublicLinksForFile - getAllPublicLinksForFile
     * 
     * Not yet implemented; This API would fetches all the public links that are previously generated for a file
     */
    'get'(
      parameters?: Parameters<Paths.GetAllPublicLinksForFile.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllPublicLinksForFile.Responses.$200>
  }
  ['/v1/files/public/links/{id}/{filename}']: {
    /**
     * accessPublicLink - accessPublicLink
     * 
     * Redirects to a accessible signed url for the respective file associated to the public link
     */
    'get'(
      parameters?: Parameters<Paths.AccessPublicLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/files/public/links/{id}']: {
    /**
     * revokePublicLink - revokePublicLink
     * 
     * Not yet implemented; This operation would revokes a given public link by ID
     */
    'delete'(
      parameters?: Parameters<Paths.RevokePublicLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RevokePublicLink.Responses.$204>
  }
  ['/v2/files/upload']: {
    /**
     * uploadFileV2 - uploadFileV2
     * 
     * Create pre-signed S3 URL to upload a file to keep temporarily (one week). - v2
     * 
     * Use the createFile operation to store file file permanently.
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
     * Create / Update a permanent File entity
     * 
     * Makes file object permanent
     * 
     * Saves metadata to file entity
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SaveFileV2.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SaveFileV2.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type CommonSaveFilePayload = Components.Schemas.CommonSaveFilePayload;
export type DeleteFilePayload = Components.Schemas.DeleteFilePayload;
export type DownloadFilesPayload = Components.Schemas.DownloadFilesPayload;
export type EntityId = Components.Schemas.EntityId;
export type EntitySlug = Components.Schemas.EntitySlug;
export type FileEntity = Components.Schemas.FileEntity;
export type FileEntityId = Components.Schemas.FileEntityId;
export type FileItem = Components.Schemas.FileItem;
export type FileRelationItem = Components.Schemas.FileRelationItem;
export type FileUpload = Components.Schemas.FileUpload;
export type PublicLink = Components.Schemas.PublicLink;
export type S3Reference = Components.Schemas.S3Reference;
export type SaveCustomFilePayload = Components.Schemas.SaveCustomFilePayload;
export type SaveFilePayload = Components.Schemas.SaveFilePayload;
export type SaveFilePayloadV2 = Components.Schemas.SaveFilePayloadV2;
export type SaveS3FilePayload = Components.Schemas.SaveS3FilePayload;
export type UploadFilePayload = Components.Schemas.UploadFilePayload;
export type VerifyCustomDownloadUrlPayload = Components.Schemas.VerifyCustomDownloadUrlPayload;
