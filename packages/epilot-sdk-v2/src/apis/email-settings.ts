import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';

export type { TokenArg } from '../authorize';
export { authorize } from '../authorize';

import type { Client } from '../types/email-settings';

export type {
  Client,
  ConnectedOutlookEmail,
  CreateEmailAddressPayload,
  CreateSharedInboxPayload,
  Domain,
  EmailAddressResponse,
  EmailAddressSetting,
  EmailDomainSetting,
  ErrorResponse,
  InboxBucketResponse,
  MailboxSyncFolderStatuses,
  MailboxSyncStatus,
  MailboxSyncStatuses,
  MailboxSyncTimeframePeriods,
  OperationMethods,
  OutlookConnectionError,
  OutlookConnectionStatus,
  PathsDictionary,
  ProvisionEpilotEmailAddressPayload,
  RestrictDuplicatesWithinSetting,
  SetEmailAddressPrimaryPayload,
  Setting,
  SettingMeta,
  SettingsResponse,
  SettingType,
  SharedInboxResponse,
  SignatureSetting,
  UpdateEmailAddressPayload,
  UpdateSharedInboxPayload,
  WhitelistEmailAddressSetting,
} from '../types/email-settings';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/email-settings.json');
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
 * `emailSettings.someOperation(...)` calls forwarded to lazy singleton
 */
export const emailSettings = _handle;
