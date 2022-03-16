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
        export interface HelloWorldObject {
            /**
             * example:
             * world
             */
            hello: string;
            /**
             * example:
             * test
             */
            test?: string;
        }
    }
}
declare namespace Paths {
    namespace DebugPrivateGet {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DebugPrivatePost {
        export interface RequestBody {
            [name: string]: any;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DebugPublicGet {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace DebugPublicPost {
        export interface RequestBody {
            [name: string]: any;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace MockOperation {
        namespace Responses {
            export type $200 = Components.Schemas.HelloWorldObject;
        }
    }
    namespace TestApigateway {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestAuth {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestDynamoDB {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestEventBridge {
        export interface RequestBody {
            [name: string]: any;
        }
        namespace Responses {
            export interface $201 {
            }
        }
    }
    namespace TestFeature {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestHasura {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestPermission {
        /**
         * example:
         * {
         *   "action": "entity:view",
         *   "resource": "*"
         * }
         */
        export interface RequestBody {
            action: string;
            resource?: string;
            org_id?: string;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestPermissions {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestS3 {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace TestSQS {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ValidateOperation {
        export interface RequestBody {
            requiredEmail?: string; // email
            requiredString: string;
            requiredPositiveInteger: number;
        }
    }
}

export interface OperationMethods {
  /**
   * debugPublicGet - debugPublicGet
   * 
   * Public endpoint, returns the OpenAPI context
   */
  'debugPublicGet'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DebugPublicGet.Responses.$200>
  /**
   * debugPublicPost - debugPublicPost
   * 
   * Public endpoint, returns the OpenAPI context
   */
  'debugPublicPost'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DebugPublicPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DebugPublicPost.Responses.$200>
  /**
   * debugPrivateGet - debugPrivateGet
   * 
   * Private endpoint, returns the OpenAPI context
   */
  'debugPrivateGet'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DebugPrivateGet.Responses.$200>
  /**
   * debugPrivatePost - debugPrivatePost
   * 
   * Private endpoint, returns the OpenAPI context
   */
  'debugPrivatePost'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DebugPrivatePost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DebugPrivatePost.Responses.$200>
  /**
   * mockOperation - mockOperation
   * 
   * Mock response from OAS definition
   */
  'mockOperation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.MockOperation.Responses.$200>
  /**
   * validateOperation - validateOperation
   * 
   * Validate inputs with OAS definition
   */
  'validateOperation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ValidateOperation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * testAuth - testAuth
   * 
   * Return auth context
   */
  'testAuth'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestAuth.Responses.$200>
  /**
   * testDynamoDB - testDynamoDB
   * 
   * Query DynamoDB Table
   */
  'testDynamoDB'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestDynamoDB.Responses.$200>
  /**
   * testS3 - testS3
   * 
   * Fetch object from S3 bucket
   */
  'testS3'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestS3.Responses.$200>
  /**
   * testEventBridge - testEventBridge
   * 
   * Put event to EventBridge Event Bus
   */
  'testEventBridge'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TestEventBridge.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestEventBridge.Responses.$201>
  /**
   * testSQS - testSQS
   * 
   * Consume SQS queue (written to by EventBridge rule)
   */
  'testSQS'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestSQS.Responses.$200>
  /**
   * testApigateway - testApigateway
   * 
   * Call another internal API via API gateway
   */
  'testApigateway'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestApigateway.Responses.$200>
  /**
   * testHasura - testHasura
   * 
   * Query Hasura
   */
  'testHasura'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestHasura.Responses.$200>
  /**
   * testFeature - testFeature
   * 
   * Query Feature Flag Service
   */
  'testFeature'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestFeature.Responses.$200>
  /**
   * testPermissions - testPermissions
   * 
   * Test Permissions
   */
  'testPermissions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestPermissions.Responses.$200>
  /**
   * testPermission - testPermission
   * 
   * Test a single permission
   */
  'testPermission'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.TestPermission.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.TestPermission.Responses.$200>
}

export interface PathsDictionary {
  ['/v1/ts-sam/public/debug']: {
    /**
     * debugPublicGet - debugPublicGet
     * 
     * Public endpoint, returns the OpenAPI context
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DebugPublicGet.Responses.$200>
    /**
     * debugPublicPost - debugPublicPost
     * 
     * Public endpoint, returns the OpenAPI context
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DebugPublicPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DebugPublicPost.Responses.$200>
  }
  ['/v1/ts-sam/debug']: {
    /**
     * debugPrivateGet - debugPrivateGet
     * 
     * Private endpoint, returns the OpenAPI context
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DebugPrivateGet.Responses.$200>
    /**
     * debugPrivatePost - debugPrivatePost
     * 
     * Private endpoint, returns the OpenAPI context
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DebugPrivatePost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DebugPrivatePost.Responses.$200>
  }
  ['/v1/ts-sam/mock/hello-world']: {
    /**
     * mockOperation - mockOperation
     * 
     * Mock response from OAS definition
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.MockOperation.Responses.$200>
  }
  ['/v1/ts-sam/mock/validate']: {
    /**
     * validateOperation - validateOperation
     * 
     * Validate inputs with OAS definition
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ValidateOperation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/v1/ts-sam/auth']: {
    /**
     * testAuth - testAuth
     * 
     * Return auth context
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestAuth.Responses.$200>
  }
  ['/v1/ts-sam/dynamodb']: {
    /**
     * testDynamoDB - testDynamoDB
     * 
     * Query DynamoDB Table
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestDynamoDB.Responses.$200>
  }
  ['/v1/ts-sam/s3']: {
    /**
     * testS3 - testS3
     * 
     * Fetch object from S3 bucket
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestS3.Responses.$200>
  }
  ['/v1/ts-sam/eventbridge']: {
    /**
     * testEventBridge - testEventBridge
     * 
     * Put event to EventBridge Event Bus
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TestEventBridge.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestEventBridge.Responses.$201>
  }
  ['/v1/ts-sam/sqs']: {
    /**
     * testSQS - testSQS
     * 
     * Consume SQS queue (written to by EventBridge rule)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestSQS.Responses.$200>
  }
  ['/v1/ts-sam/apigateway']: {
    /**
     * testApigateway - testApigateway
     * 
     * Call another internal API via API gateway
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestApigateway.Responses.$200>
  }
  ['/v1/ts-sam/hasura']: {
    /**
     * testHasura - testHasura
     * 
     * Query Hasura
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestHasura.Responses.$200>
  }
  ['/v1/ts-sam/feature']: {
    /**
     * testFeature - testFeature
     * 
     * Query Feature Flag Service
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestFeature.Responses.$200>
  }
  ['/v1/ts-sam/permissions']: {
    /**
     * testPermissions - testPermissions
     * 
     * Test Permissions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestPermissions.Responses.$200>
    /**
     * testPermission - testPermission
     * 
     * Test a single permission
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.TestPermission.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.TestPermission.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
