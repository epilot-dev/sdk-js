import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/user';

export type {
  Client,
  CognitoDetails,
  CreateGroupReq,
  DataPoint,
  DataPointsResponse,
  Group,
  GroupId,
  Hydrate,
  InviteToken,
  Limit,
  LoginParameters,
  Navigation,
  NavigationConfiguration,
  NavigationCreateRequest,
  NavigationGroupItem,
  NavigationId,
  NavigationItem,
  NavigationKeyItem,
  Offset,
  OperationMethods,
  Organization,
  OrganizationDetail,
  OrganizationId,
  PartnerInvitationToken,
  Passkey,
  PasskeyAuthenticationOptions,
  PasskeyRegistrationOptions,
  PasskeyRegistrationResponse,
  PathsDictionary,
  Query,
  SignupUserPayload,
  UpdateGroupReq,
  User,
  UserActivationPayload,
  UserDetail,
  UserId,
  UserInvitationPayload,
  Username,
  UserV2,
  UserVerificationPayload,
  VerificationToken,
} from '../types/user';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/user.json');
  return (mod.default ?? mod) as unknown as Document;
};

let _instance: Client | null = null;

const resolve = async (): Promise<Client> => {
  if (!_instance) {
    const definition = await loadDefinition();
    _instance = createApiClient<Client>({ definition });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  loadDefinition,
});

/** Get the cached singleton client (lazy-initialized on first call) */
export const getClient = _handle.getClient;

/** Create a fresh client instance (not cached) */
export const createClient = _handle.createClient;

/**
 * API handle — also exposes operations directly:
 * `user.someOperation(...)` calls forwarded to lazy singleton
 */
export const user = _handle;
