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
        export interface CategoryResult {
            /**
             * example:
             * contact
             */
            category?: string;
            /**
             * example:
             * Contact
             */
            description?: string;
        }
        export interface CustomVariable {
            /**
             * ID
             * example:
             * rbse777b-3cf8-4bff-bb0c-253fd1123250
             */
            id?: string;
            /**
             * Custom variable type
             * example:
             * rbse777b-3cf8-4bff-bb0c-253fd1123250
             */
            type?: "order_table" | "custom";
            /**
             * Custom variable name
             * example:
             * My Custom table
             */
            name?: string;
            /**
             * The key which is used for Handlebar variable syntax {{key}}
             * example:
             * my_custom_table
             */
            key?: string;
            /**
             * The tags of custom variable
             */
            _tags?: string[];
            /**
             * The helper function parameter's names
             * example:
             * [
             *   "param1",
             *   "param2"
             * ]
             */
            helper_params?: string[];
            /**
             * The helper function logic
             * example:
             * return param1 * param2;
             */
            helper_logic?: string;
            /**
             * Variable configuration
             * example:
             * {
             *   "$ref": "#/components/examples/TableConfig/value"
             * }
             */
            config?: {
                [key: string]: any;
            };
            /**
             * Handlebar template that used to generate the variable content
             * example:
             * <table style="table-layout: fixed;width: 100%;max-width: 1000px;border-collapse: collapse;">
             *   <thead>
             *     <tr style="height: 48px;border-bottom: 1px solid #D5E1ED;">
             *       {{#each table_config.header.columns as |column|}}
             *         {{#if column.enable}}
             *           <th style="{{makeStyle @root.table_config.header.style}};{{makeStyle column.style}};">{{column._label}}</th>
             *         {{/if}}
             *       {{/each}}
             *     </tr>
             *   </thead>
             *   <tbody style="vertical-align: baseline  !important;font-weight: 400;font-size: 12px;position: relative;">
             *     <!-- Start rendering products -->
             *     {{#each order.products as |product|}}
             *       {{#if @last}}
             *         <tr style="height: 48px;;font-size:14px;border-bottom: 1px solid #D5E1ED;">
             *       {{else}}
             *         <tr style="height: 48px;;font-size:14px;">
             *       {{/if}}
             *         {{#each @root.table_config.header.columns as |column|}}
             *           {{#if column.enable}}
             *             {{#if (eq column.id 'item')}}
             *               <!-- Item -->
             *               <td style="{{makeStyle @root.table_config.body.product_name.style}}">
             *                 {{#if @root.table_config.body.product_name.enable}}
             *                   {{product.name}}
             *                 {{/if}}
             *                 {{#if @root.table_config.body.price_description.enable}}
             *                   <br>
             *                   <span style="{{makeStyle @root.table_config.body.price_description.style}}">{{product.price.description}}</span>
             *                 {{/if}}
             *                 {{#if @root.table_config.body.product_description.enable}}
             *                   <br>
             *                   <span style="{{makeStyle @root.table_config.body.product_description.style}}">{{product.description}}</span>
             *                 {{/if}}
             *               </td>
             *             {{/if}}
             *             {{#if (eq column.id 'quantity')}}
             *               <!-- Quantity -->
             *               <td style="{{makeStyle @root.table_config.body.quantity.style}}">{{product.price.quantity}}
             *               </td>
             *             {{/if}}
             *             {{#if (eq column.id 'tax')}}
             *               <!-- Tax -->
             *               <td style="{{makeStyle @root.table_config.body.tax.style}}">
             *                 {{product.price.tax_rate}}
             *               </td>
             *             {{/if}}
             *             {{#if (eq column.id 'unit_amount')}}
             *               <!-- Unit amount -->
             *               <td style="{{makeStyle @root.table_config.body.unit_amount.style}}">
             *                 {{product.price.unit_amount_net}}
             *               </td>
             *             {{/if}}
             *             {{#if (eq column.id 'net_total')}}
             *               <!-- Amount Subtotal -->
             *               <td style="{{makeStyle @root.table_config.body.net_total.style}}">
             *                 {{product.price.amount_subtotal}}
             *               </td>
             *             {{/if}}
             *             {{#if (eq column.id 'amount_tax')}}
             *               <!-- Tax amount-->
             *               <td style="{{makeStyle @root.table_config.body.amount_tax.style}}">
             *                 {{product.price.amount_tax}}
             *               </td>
             *             {{/if}}
             *             {{#if (eq column.id 'gross_total')}}
             *               <!-- Gross total -->
             *               <td style="{{makeStyle @root.table_config.body.gross_total.style}}">
             *                 {{product.price.amount_total}}
             *                 {{#if @root.table_config.body.payment_type.enable}}
             *                   {{#if (eq product.price.type 'recurring')}}
             *                     <br>
             *                     <span style="{{makeStyle @root.table_config.body.payment_type.style}}">{{product.price.billing_period}}</span>
             *                   {{/if}}
             *                 {{/if}}
             *               </td>
             *             {{/if}}
             *           {{/if}}
             *         {{/each}}
             *         </tr>
             *     {{/each}}
             *     <!-- Finish rendering products -->
             *     {{#if table_config.footer.gross_total.enable}}
             *       {{#each order.total_details.recurrences as |item|}}
             *         <tr style="height: 48px;font-size: 14px;">
             *           <td style="padding-top: 16px; padding-bottom: 8px; border: none !important; vertical-align: top;" colspan="{{calculate_colspan @root.table_config}}"></td>
             *           {{#if @root.table_config.footer.payment_type.enable}}
             *             <td style="{{makeStyle @root.table_config.footer.payment_type.style}}" colspan="2">{{item.billing_period}}</td>
             *           {{/if}}
             *           {{#if (isColumnEnabled @root.table_config 'net_total')}}
             *             {{#if @root.table_config.footer.net_total.enable}}
             *               <td style="{{makeStyle @root.table_config.footer.net_total.style}}">{{item.amount_subtotal}}</td>
             *             {{/if}}
             *           {{/if}}
             *           <td style="{{makeStyle @root.table_config.footer.gross_total.style}}">{{item.amount_total}}
             *             {{#if @root.table_config.footer.amount_tax.enable}}
             *               <br>
             *               <span style="{{makeStyle @root.table_config.footer.amount_tax.style}}">{{item.full_amount_tax}}</span>
             *             {{/if}}
             *           </td>
             *         </tr>
             *       {{/each}}
             *     {{/if}}
             *     <tr style="height:16px !important;"></tr>
             *   </tbody>
             * </table>
             *
             */
            template?: string;
            /**
             * Creation time
             * example:
             * 2022-04-19T12:41:43.662Z
             */
            created_at?: string;
            /**
             * Created by
             * example:
             * 100042
             */
            created_by?: string;
            /**
             * Last update time
             * example:
             * 2022-04-20T12:41:43.662Z
             */
            updated_at?: string;
            /**
             * Updated by
             * example:
             * 100042
             */
            updated_by?: string;
        }
        export interface CustomVariablesSearchParams {
            /**
             * Variable type
             */
            type?: "order_table" | "custom";
            /**
             * The tags of custom variable
             */
            tags?: string[];
            /**
             * Search string
             * example:
             * logo
             */
            query?: string;
            from?: number;
            size?: number;
            /**
             * Sort by field
             * example:
             * [
             *   "created_at",
             *   "created_at:desc",
             *   "name",
             *   "name:desc",
             *   "key"
             * ]
             */
            sort_by?: string;
            /**
             * Fields to return
             */
            fields?: string[];
        }
        export interface ExternalCustomVariable {
            /**
             * example:
             * {{craftsmen.invitation_link}}
             */
            variable?: string;
            /**
             * example:
             * https://partner.epilot.cloud/activate-account?user_name=htny.pct%2Btet%40gmail.com&confirmation_code=EdXPRW19
             */
            value?: string;
        }
        /**
         * 2-letter language code (ISO 639-1)
         */
        export type Language = string;
        export type TemplateType = "email" | "document";
        export interface VariableContext {
            /**
             * example:
             * https://consent.sls.epilot.io/v1/unsubscribe?token=abc123
             */
            unsubscribe_url?: string;
            /**
             * example:
             * {
             *   "$ref": "#/components/examples/ExampleMain/value"
             * }
             */
            main?: {
                [name: string]: any;
            };
            /**
             * example:
             * {
             *   "$ref": "#/components/examples/ExampleContactEntity/value"
             * }
             */
            contact?: {
                [name: string]: any;
            };
            /**
             * example:
             * {
             *   "$ref": "#/components/examples/ExampleBrand/value"
             * }
             */
            brand?: {
                [name: string]: any;
            };
        }
        export interface VariableParameters {
            template_type: TemplateType;
            language?: /* 2-letter language code (ISO 639-1) */ Language;
            /**
             * The main entity ID. Use main entity in order to use the variable without schema slug prefix - or just pass directly to other object ID.
             * example:
             * 63753437-c9e2-4e83-82bb-b1c666514561
             */
            main_entity_id?: string; // uuid
            /**
             * Brand ID
             * example:
             * 123451
             */
            brand_id?: number | null;
            /**
             * User ID
             * example:
             * 50001
             */
            user_id?: string | null;
            /**
             * Organization ID of the user
             * example:
             * 729224
             */
            user_org_id?: string | null;
            /**
             * Custom variables with specified values form other services.
             */
            custom_variables?: ExternalCustomVariable[];
            /**
             * If context data is avaialble, this data will be used for variable replace.
             */
            context_data?: {
                [key: string]: any;
            };
            /**
             * The name of email template
             */
            template_name?: string;
            /**
             * The tags of email template
             */
            template_tags?: string[];
            /**
             * The version of the variables syntax supported. Default is 1.0
             * example:
             * 2
             */
            variables_version?: string;
        }
        export interface VariableResult {
            type?: "simple" | "partial";
            /**
             * Payload for the QR data
             */
            qrdata?: string;
            /**
             * Variable group
             */
            group?: string;
            /**
             * The value which is used to insert to template
             */
            insert?: string;
            /**
             * Variable description
             */
            description?: string;
        }
        export type VariableType = "simple" | "partial";
    }
}
declare namespace Paths {
    namespace CreateCustomVariable {
        export type RequestBody = Components.Schemas.CustomVariable;
        namespace Responses {
            export interface $201 {
            }
            export interface $403 {
            }
        }
    }
    namespace DeleteCustomVariable {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetBluePrintTableConfig {
        namespace Responses {
            export type $200 = Components.Schemas.CustomVariable;
            export interface $403 {
            }
        }
    }
    namespace GetCategories {
        namespace Parameters {
            export type Lang = /* 2-letter language code (ISO 639-1) */ Components.Schemas.Language;
        }
        export interface QueryParameters {
            lang?: Parameters.Lang;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CategoryResult[];
        }
    }
    namespace GetCustomVariable {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CustomVariable;
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetCustomVariables {
        namespace Responses {
            export type $200 = Components.Schemas.CustomVariable[];
            export interface $403 {
            }
        }
    }
    namespace GetVariableContext {
        export interface RequestBody {
            parameters?: Components.Schemas.VariableParameters;
        }
        namespace Responses {
            export type $200 = Components.Schemas.VariableContext;
        }
    }
    namespace ReplaceTemplates {
        export interface RequestBody {
            inputs?: string[];
            parameters?: Components.Schemas.VariableParameters;
        }
        namespace Responses {
            export interface $200 {
                /**
                 * example:
                 * "[Brand Name GmbH] Order confirmation",
                 * "Hello Customer Name
                 *
                 * <span color="#ccc">Brand Name GmbH</span>
                 * <img src="https://logobucket.s3.amazonaws.com/brandlogo.png" alt="Brand Name"/>
                 * <a href="https://company.com/imprint">imprint</a>
                 * "]
                 *
                 */
                outputs?: string[];
            }
        }
    }
    namespace SearchCustomVariables {
        export type RequestBody = Components.Schemas.CustomVariablesSearchParams;
        namespace Responses {
            export interface $200 {
                results?: Components.Schemas.CustomVariable[];
                /**
                 * Total number of results
                 * example:
                 * 100
                 */
                hits?: number;
            }
            export interface $403 {
            }
        }
    }
    namespace SearchVariables {
        export interface RequestBody {
            template_type: Components.Schemas.TemplateType;
            /**
             * Search string
             * example:
             * logo
             */
            query: string;
            from?: number;
            size?: number;
            lang?: /* 2-letter language code (ISO 639-1) */ Components.Schemas.Language;
            entity_schemas?: string[];
        }
        namespace Responses {
            export type $200 = Components.Schemas.VariableResult[];
        }
    }
    namespace UpdateCustomVariable {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.CustomVariable;
        namespace Responses {
            export interface $200 {
            }
            export interface $403 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * getCategories - getCategories
   * 
   * Get all template variable categories
   */
  'getCategories'(
    parameters?: Parameters<Paths.GetCategories.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCategories.Responses.$200>
  /**
   * searchVariables - searchVariables
   * 
   * Search variables
   */
  'searchVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchVariables.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchVariables.Responses.$200>
  /**
   * getVariableContext - getVariableContext
   * 
   * Get full variable context
   * 
   * Calls Entity API, User API, Brand API and others to construct full context object used for template variable replace
   * 
   */
  'getVariableContext'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GetVariableContext.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetVariableContext.Responses.$200>
  /**
   * replaceTemplates - replaceTemplates
   * 
   * Replace variables in handlebars templates
   * 
   * Takes in an array of input templates and outputs the output text with replaced variables
   * 
   */
  'replaceTemplates'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ReplaceTemplates.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ReplaceTemplates.Responses.$200>
  /**
   * getCustomVariables - Get custom variables
   * 
   * Get all custom variables of organization
   */
  'getCustomVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomVariables.Responses.$200>
  /**
   * createCustomVariable - Create custom variable
   * 
   * Create custom variable
   */
  'createCustomVariable'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateCustomVariable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateCustomVariable.Responses.$201>
  /**
   * searchCustomVariables - searchCustomVariables
   * 
   * Search custom variables
   */
  'searchCustomVariables'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SearchCustomVariables.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SearchCustomVariables.Responses.$200>
  /**
   * getCustomVariable - Get custom variable
   * 
   * Get custom variable
   */
  'getCustomVariable'(
    parameters?: Parameters<Paths.GetCustomVariable.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetCustomVariable.Responses.$200>
  /**
   * updateCustomVariable - Update custom variable
   * 
   * Update custom variable
   */
  'updateCustomVariable'(
    parameters?: Parameters<Paths.UpdateCustomVariable.PathParameters> | null,
    data?: Paths.UpdateCustomVariable.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateCustomVariable.Responses.$200>
  /**
   * deleteCustomVariable - Delete custom variable
   * 
   * Immediately and permanently deletes a custom variable
   */
  'deleteCustomVariable'(
    parameters?: Parameters<Paths.DeleteCustomVariable.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteCustomVariable.Responses.$204>
  /**
   * getBluePrintTableConfig - Get default table config
   * 
   * Get default table config
   */
  'getBluePrintTableConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetBluePrintTableConfig.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/template-variables/categories']: {
    /**
     * getCategories - getCategories
     * 
     * Get all template variable categories
     */
    'get'(
      parameters?: Parameters<Paths.GetCategories.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCategories.Responses.$200>
  }
  ['/v1/template-variables:search']: {
    /**
     * searchVariables - searchVariables
     * 
     * Search variables
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchVariables.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchVariables.Responses.$200>
  }
  ['/v1/template-variables:context']: {
    /**
     * getVariableContext - getVariableContext
     * 
     * Get full variable context
     * 
     * Calls Entity API, User API, Brand API and others to construct full context object used for template variable replace
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GetVariableContext.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetVariableContext.Responses.$200>
  }
  ['/v1/template-variables:replace']: {
    /**
     * replaceTemplates - replaceTemplates
     * 
     * Replace variables in handlebars templates
     * 
     * Takes in an array of input templates and outputs the output text with replaced variables
     * 
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ReplaceTemplates.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ReplaceTemplates.Responses.$200>
  }
  ['/v1/custom-variables']: {
    /**
     * getCustomVariables - Get custom variables
     * 
     * Get all custom variables of organization
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomVariables.Responses.$200>
    /**
     * createCustomVariable - Create custom variable
     * 
     * Create custom variable
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateCustomVariable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateCustomVariable.Responses.$201>
  }
  ['/v1/custom-variables:search']: {
    /**
     * searchCustomVariables - searchCustomVariables
     * 
     * Search custom variables
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SearchCustomVariables.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SearchCustomVariables.Responses.$200>
  }
  ['/v1/custom-variables/{id}']: {
    /**
     * updateCustomVariable - Update custom variable
     * 
     * Update custom variable
     */
    'put'(
      parameters?: Parameters<Paths.UpdateCustomVariable.PathParameters> | null,
      data?: Paths.UpdateCustomVariable.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateCustomVariable.Responses.$200>
    /**
     * getCustomVariable - Get custom variable
     * 
     * Get custom variable
     */
    'get'(
      parameters?: Parameters<Paths.GetCustomVariable.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetCustomVariable.Responses.$200>
    /**
     * deleteCustomVariable - Delete custom variable
     * 
     * Immediately and permanently deletes a custom variable
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteCustomVariable.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteCustomVariable.Responses.$204>
  }
  ['/v1/custom-variables/order-table-blueprint']: {
    /**
     * getBluePrintTableConfig - Get default table config
     * 
     * Get default table config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetBluePrintTableConfig.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type CategoryResult = Components.Schemas.CategoryResult;
export type CustomVariable = Components.Schemas.CustomVariable;
export type CustomVariablesSearchParams = Components.Schemas.CustomVariablesSearchParams;
export type ExternalCustomVariable = Components.Schemas.ExternalCustomVariable;
export type Language = Components.Schemas.Language;
export type TemplateType = Components.Schemas.TemplateType;
export type VariableContext = Components.Schemas.VariableContext;
export type VariableParameters = Components.Schemas.VariableParameters;
export type VariableResult = Components.Schemas.VariableResult;
export type VariableType = Components.Schemas.VariableType;
