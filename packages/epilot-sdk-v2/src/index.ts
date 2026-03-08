export type { TokenArg } from './authorize';
export { authorize } from './authorize';
export type { LargeResponseConfig } from './large-response';
export { applyLargeResponseInterceptor } from './large-response';
export type { RetryConfig } from './retry';
export { applyRetryInterceptor } from './retry';
export type { EpilotSDK, InterceptorUse } from './sdk';
export { createSDK } from './sdk';
export type { ApiHandle, HeadersConfig, Interceptor, OverridesConfig } from './types';

import { createSDK } from './sdk';

export const epilot = createSDK();
