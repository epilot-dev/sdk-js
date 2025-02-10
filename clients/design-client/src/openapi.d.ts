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
        export interface AddConsumerReq {
            consumer_id: string;
            consumer_name: string;
            should_delete?: string;
        }
        export interface AddDesignReq {
            design: {
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                custom_theme?: string;
                use_custom_theme?: boolean;
                design_tokens?: {
                    custom_css?: string;
                };
            };
        }
        export interface AddDesignRes {
            design?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                custom_theme?: string;
                use_custom_theme?: boolean;
                design_tokens?: {
                    custom_css?: string;
                };
            };
        }
        export interface BrandItem {
            id: string;
            name: string;
            created_by?: string;
            created_date?: string;
            main_brand?: string;
            organization_id?: string;
            updated_date?: string;
            updated_by?: string;
            status?: string;
        }
        export interface ConsumerData {
            widgets: (WidgetData)[];
            customer_portals: (CustomerPortalData)[];
        }
        export interface CustomStyle {
            custom_theme?: string;
            use_custom_theme?: boolean;
        }
        export interface CustomerPortalData {
            id: string;
            name: string;
        }
        export interface DesignItem {
            brand_id?: string;
            brand_name?: string;
            user?: {
                emailaddress?: string;
                fullname?: string;
                name?: string;
                userid?: string;
            };
            style_name: string;
            style: {
                logo?: LogoData;
                palette: PaletteData;
                typography: TypographyData;
                shape?: ShapeData;
                consumer: ConsumerData;
            };
            is_default?: boolean;
        }
        export interface ErrorResp {
            message?: string;
        }
        export interface FileData {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT";
            s3_object_key: string;
            url: string;
        }
        export interface FontData {
            font_id: string;
            font_name: string;
            font_family?: string;
            font_weight_regular?: string;
            font_weight_medium?: string;
            font_weight_bold?: string;
            urls: (FontResponseUrl)[];
        }
        export interface FontResponseUrl {
            type?: "WOFF2" | "WOFF" | "TTF" | "EOT";
            url?: string;
        }
        export interface GetAllDesignsRes {
            designs?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                custom_theme?: string;
                use_custom_theme?: boolean;
                design_tokens?: {
                    custom_css?: string;
                };
            }[];
        }
        export interface GetBrandsRes {
            brands?: {
                id: string;
                name: string;
                created_by?: string;
                created_date?: string;
                main_brand?: string;
                organization_id?: string;
                updated_date?: string;
                updated_by?: string;
                status?: string;
            }[];
        }
        export interface GetDesignRes {
            design?: {
                id?: string;
                /**
                 * Creation date and time
                 * example:
                 * 2021-01-30T08:30:00Z
                 */
                created_at?: string;
                created_by?: string;
                edited: boolean;
                last_modified_at?: string;
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                custom_theme?: string;
                use_custom_theme?: boolean;
                design_tokens?: {
                    custom_css?: string;
                };
            };
        }
        export type GetFilesRes = {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT";
            s3_object_key: string;
            url: string;
        }[];
        export interface ItemMetada {
            id?: string;
            /**
             * Creation date and time
             * example:
             * 2021-01-30T08:30:00Z
             */
            created_at?: string;
            created_by?: string;
            edited?: boolean;
            last_modified_at?: string;
        }
        export interface Journey {
            design_tokens?: {
                custom_css?: string;
            };
        }
        export interface LogoData {
            main?: FileData;
        }
        export interface PaletteData {
            primary: string;
            secondary: string;
            error: string;
            background: string;
            paper: string;
            navbar: string;
            portal_login_background?: string;
            /**
             * Background color for cashback coupon badge
             */
            coupon_cashback?: string;
            /**
             * Background color for discount coupon badge
             */
            coupon_discount?: string;
        }
        export interface ShapeData {
            border_radius?: number;
        }
        export interface TypographyData {
            font: FontData;
            primary: string;
            secondary: string;
        }
        export interface UpdateDesignReq {
            design: {
                brand_id?: string;
                brand_name?: string;
                user?: {
                    emailaddress?: string;
                    fullname?: string;
                    name?: string;
                    userid?: string;
                };
                style_name: string;
                style: {
                    logo?: LogoData;
                    palette: PaletteData;
                    typography: TypographyData;
                    shape?: ShapeData;
                    consumer: ConsumerData;
                };
                is_default?: boolean;
                custom_theme?: string;
                use_custom_theme?: boolean;
                design_tokens?: {
                    custom_css?: string;
                };
            };
        }
        export interface UploadFileReq {
            file_type: "LOGO" | "FONT";
            file_data: string; // base64
            display_name?: string;
            file_name: string;
        }
        export interface UploadFileRes {
            name: string;
            display_name?: string;
            file_type?: "LOGO" | "FONT";
            s3_object_key: string;
            url: string;
        }
        export interface WidgetData {
            id: string;
            name: string;
        }
        export interface WidgetPortalData {
            id: string;
            name: string;
        }
    }
}
declare namespace Paths {
    namespace AddConsumer {
        namespace Parameters {
            export type Application = string;
            export type DesignId = string;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
            application: Parameters.Application;
        }
        export type RequestBody = Components.Schemas.AddConsumerReq;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace AddDesign {
        export type RequestBody = Components.Schemas.AddDesignReq;
        namespace Responses {
            export type $201 = Components.Schemas.AddDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace DeleteDesign {
        namespace Parameters {
            export type DesignId = string;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetAllDesigns {
        namespace Responses {
            export type $200 = Components.Schemas.GetAllDesignsRes[];
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetBrands {
        namespace Responses {
            export type $200 = Components.Schemas.GetBrandsRes[];
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetConsumerDesign {
        namespace Parameters {
            export type Application = string;
            export type ConsumerId = string;
        }
        export interface PathParameters {
            consumerId: Parameters.ConsumerId;
            application: Parameters.Application;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetDesign {
        namespace Parameters {
            export type DesignId = string;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetDesignRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetFiles {
        namespace Parameters {
            export type Type = "LOGO" | "FONT";
        }
        export interface QueryParameters {
            type?: Parameters.Type;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetFilesRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetLimit {
        namespace Responses {
            export type $200 = number;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace GetThemeFromDesign {
        namespace Parameters {
            export type DesignId = string;
            export type OrgId = string;
            export type Theme = "NEW" | "OLD";
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        export interface QueryParameters {
            orgId?: Parameters.OrgId;
            theme: Parameters.Theme;
        }
        namespace Responses {
            export interface $200 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace RemoveConsumer {
        namespace Parameters {
            export type Application = string;
            export type DesignId = string;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
            application: Parameters.Application;
        }
        export type RequestBody = Components.Schemas.AddConsumerReq;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace UpdateDesign {
        namespace Parameters {
            export type DesignId = string;
        }
        export interface PathParameters {
            designId: Parameters.DesignId;
        }
        export type RequestBody = Components.Schemas.UpdateDesignReq;
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export interface $404 {
            }
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
    namespace UploadFile {
        export type RequestBody = Components.Schemas.UploadFileReq;
        namespace Responses {
            export type $201 = Components.Schemas.UploadFileRes;
            export type $400 = Components.Schemas.ErrorResp;
            export type $401 = Components.Schemas.ErrorResp;
            export type $500 = Components.Schemas.ErrorResp;
        }
    }
}

export interface OperationMethods {
  /**
   * getAllDesigns - getAllDesigns
   * 
   * Scan all designs linked to a organization, based in orgId attribute from JWT auth token
   */
  'getAllDesigns'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllDesigns.Responses.$200>
  /**
   * addDesign - addDesign
   * 
   * Create a brand new design linked to a organization, based in orgId attribute from JWT auth token
   */
  'addDesign'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AddDesign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddDesign.Responses.$201>
  /**
   * getDesign - getDesign
   * 
   * Search for a especific design owned by user organization
   */
  'getDesign'(
    parameters?: Parameters<Paths.GetDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetDesign.Responses.$200>
  /**
   * updateDesign - updateDesign
   * 
   * Update a especific design owned by user organization
   */
  'updateDesign'(
    parameters?: Parameters<Paths.UpdateDesign.PathParameters> | null,
    data?: Paths.UpdateDesign.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateDesign.Responses.$204>
  /**
   * deleteDesign - deleteDesign
   * 
   * Search and delete for a especific design owned by user organization
   */
  'deleteDesign'(
    parameters?: Parameters<Paths.DeleteDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteDesign.Responses.$204>
  /**
   * getThemeFromDesign - getThemeFromDesign
   * 
   * Search for a especific design owned by user organization and parse them to a new or old theme
   */
  'getThemeFromDesign'(
    parameters?: Parameters<Paths.GetThemeFromDesign.QueryParameters & Paths.GetThemeFromDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetThemeFromDesign.Responses.$200>
  /**
   * getFiles - getFiles
   * 
   * List all files for the user organization bucket
   */
  'getFiles'(
    parameters?: Parameters<Paths.GetFiles.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetFiles.Responses.$200>
  /**
   * uploadFile - uploadFile
   * 
   * Upload a new file for the user organization bucket
   */
  'uploadFile'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadFile.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UploadFile.Responses.$201>
  /**
   * getLimit - getLimit
   * 
   * Gets designs number limit from database per organization
   */
  'getLimit'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetLimit.Responses.$200>
  /**
   * getBrands - getBrands
   * 
   * Scan all brands linked to a organization, based in orgId attribute from JWT auth token
   */
  'getBrands'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBrands.Responses.$200>
  /**
   * getConsumerDesign - getConsumerDesign
   * 
   * Search for a especific design owned by user organization
   */
  'getConsumerDesign'(
    parameters?: Parameters<Paths.GetConsumerDesign.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetConsumerDesign.Responses.$200>
  /**
   * addConsumer - addConsumer
   * 
   * Add a consumer that uses a specific design
   */
  'addConsumer'(
    parameters?: Parameters<Paths.AddConsumer.PathParameters> | null,
    data?: Paths.AddConsumer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AddConsumer.Responses.$204>
  /**
   * removeConsumer - removeConsumer
   * 
   * Remove a consumer that uses a specific design
   */
  'removeConsumer'(
    parameters?: Parameters<Paths.RemoveConsumer.PathParameters> | null,
    data?: Paths.RemoveConsumer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RemoveConsumer.Responses.$204>
}

export interface PathsDictionary {
  ['/v1/designs']: {
    /**
     * getAllDesigns - getAllDesigns
     * 
     * Scan all designs linked to a organization, based in orgId attribute from JWT auth token
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllDesigns.Responses.$200>
    /**
     * addDesign - addDesign
     * 
     * Create a brand new design linked to a organization, based in orgId attribute from JWT auth token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AddDesign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddDesign.Responses.$201>
  }
  ['/v1/designs/{designId}']: {
    /**
     * getDesign - getDesign
     * 
     * Search for a especific design owned by user organization
     */
    'get'(
      parameters?: Parameters<Paths.GetDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetDesign.Responses.$200>
    /**
     * deleteDesign - deleteDesign
     * 
     * Search and delete for a especific design owned by user organization
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteDesign.Responses.$204>
    /**
     * updateDesign - updateDesign
     * 
     * Update a especific design owned by user organization
     */
    'put'(
      parameters?: Parameters<Paths.UpdateDesign.PathParameters> | null,
      data?: Paths.UpdateDesign.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateDesign.Responses.$204>
  }
  ['/v1/designs/{designId}/parse']: {
    /**
     * getThemeFromDesign - getThemeFromDesign
     * 
     * Search for a especific design owned by user organization and parse them to a new or old theme
     */
    'get'(
      parameters?: Parameters<Paths.GetThemeFromDesign.QueryParameters & Paths.GetThemeFromDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetThemeFromDesign.Responses.$200>
  }
  ['/v1/designs/files']: {
    /**
     * uploadFile - uploadFile
     * 
     * Upload a new file for the user organization bucket
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadFile.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UploadFile.Responses.$201>
    /**
     * getFiles - getFiles
     * 
     * List all files for the user organization bucket
     */
    'get'(
      parameters?: Parameters<Paths.GetFiles.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetFiles.Responses.$200>
  }
  ['/v1/designs/limit']: {
    /**
     * getLimit - getLimit
     * 
     * Gets designs number limit from database per organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetLimit.Responses.$200>
  }
  ['/v1/brands']: {
    /**
     * getBrands - getBrands
     * 
     * Scan all brands linked to a organization, based in orgId attribute from JWT auth token
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBrands.Responses.$200>
  }
  ['/v1/designs/consumer/{application}/{consumerId}']: {
    /**
     * getConsumerDesign - getConsumerDesign
     * 
     * Search for a especific design owned by user organization
     */
    'get'(
      parameters?: Parameters<Paths.GetConsumerDesign.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetConsumerDesign.Responses.$200>
  }
  ['/v1/designs/addConsumer/{application}/{designId}']: {
    /**
     * addConsumer - addConsumer
     * 
     * Add a consumer that uses a specific design
     */
    'put'(
      parameters?: Parameters<Paths.AddConsumer.PathParameters> | null,
      data?: Paths.AddConsumer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AddConsumer.Responses.$204>
  }
  ['/v1/designs/removeConsumer/{application}/{designId}']: {
    /**
     * removeConsumer - removeConsumer
     * 
     * Remove a consumer that uses a specific design
     */
    'put'(
      parameters?: Parameters<Paths.RemoveConsumer.PathParameters> | null,
      data?: Paths.RemoveConsumer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RemoveConsumer.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AddConsumerReq = Components.Schemas.AddConsumerReq;
export type AddDesignReq = Components.Schemas.AddDesignReq;
export type AddDesignRes = Components.Schemas.AddDesignRes;
export type BrandItem = Components.Schemas.BrandItem;
export type ConsumerData = Components.Schemas.ConsumerData;
export type Custom_Style = Components.Schemas.CustomStyle;
export type CustomerPortalData = Components.Schemas.CustomerPortalData;
export type DesignItem = Components.Schemas.DesignItem;
export type ErrorResp = Components.Schemas.ErrorResp;
export type FileData = Components.Schemas.FileData;
export type FontData = Components.Schemas.FontData;
export type FontResponseUrl = Components.Schemas.FontResponseUrl;
export type GetAllDesignsRes = Components.Schemas.GetAllDesignsRes;
export type GetBrandsRes = Components.Schemas.GetBrandsRes;
export type GetDesignRes = Components.Schemas.GetDesignRes;
export type GetFilesRes = Components.Schemas.GetFilesRes;
export type ItemMetada = Components.Schemas.ItemMetada;
export type Journey = Components.Schemas.Journey;
export type LogoData = Components.Schemas.LogoData;
export type PaletteData = Components.Schemas.PaletteData;
export type ShapeData = Components.Schemas.ShapeData;
export type TypographyData = Components.Schemas.TypographyData;
export type UpdateDesignReq = Components.Schemas.UpdateDesignReq;
export type UploadFileReq = Components.Schemas.UploadFileReq;
export type UploadFileRes = Components.Schemas.UploadFileRes;
export type WidgetData = Components.Schemas.WidgetData;
export type WidgetPortalData = Components.Schemas.WidgetPortalData;
