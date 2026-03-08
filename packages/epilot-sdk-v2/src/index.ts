export { authorize } from './authorize';
export type { TokenArg } from './authorize';
export { createSDK } from './sdk';
export type { EpilotSDK, InterceptorUse } from './sdk';
export type { ApiHandle, HeadersConfig, Interceptor, OverridesConfig } from './types';

import { createSDK } from './sdk';

export const epilot = createSDK();
