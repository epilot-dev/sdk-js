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
        export interface SaveFilePayload {
            [name: string]: any;
            s3ref: S3Reference;
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
        }
    }
}
declare namespace Paths {
    namespace DeleteFile {
        export type RequestBody = Components.Schemas.DeleteFilePayload;
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
    namespace SaveFile {
        export type RequestBody = Components.Schemas.SaveFilePayload;
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
    parameters?: Parameters<Paths.DownloadFile.PathParameters & Paths.DownloadFile.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DownloadFile.Responses.$200>
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
    parameters?: Parameters<Paths.PreviewFile.PathParameters & Paths.PreviewFile.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * previewPublicFile - previewPublicFile
   * 
   * Generate thumbnail preview for a public file entity
   */
  'previewPublicFile'(
    parameters?: Parameters<Paths.PreviewPublicFile.PathParameters & Paths.PreviewPublicFile.QueryParameters> | null,
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
      parameters?: Parameters<Paths.DownloadFile.PathParameters & Paths.DownloadFile.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DownloadFile.Responses.$200>
  }
  ['/v1/files/download']: {
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
      parameters?: Parameters<Paths.PreviewFile.PathParameters & Paths.PreviewFile.QueryParameters> | null,
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
      parameters?: Parameters<Paths.PreviewPublicFile.PathParameters & Paths.PreviewPublicFile.QueryParameters> | null,
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
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
