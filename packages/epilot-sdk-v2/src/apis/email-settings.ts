import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/email-settings';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
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
  OutlookConnectionError,
  OutlookConnectionStatus,
  ProvisionEpilotEmailAddressPayload,
  RestrictDuplicatesWithinSetting,
  SetEmailAddressPrimaryPayload,
  Setting,
  SettingMeta,
  SettingType,
  SettingsResponse,
  SharedInboxResponse,
  SignatureSetting,
  UpdateEmailAddressPayload,
  UpdateSharedInboxPayload,
  WhitelistEmailAddressSetting,
} from '../types/email-settings';

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/email-settings-runtime.json');
  return expand((mod.default ?? mod) as CompactDefinition) as Document;
};

let _instance: Client | null = null;

const resolve = (): Client => {
  if (!_instance) {
    const def = loadDefinition();
    _instance = createApiClient<Client>({ definition: def });
  }
  return _instance;
};

const _handle: ApiHandle<Client> = createApiHandle({
  resolveClient: resolve,
  createClient: () => createApiClient<Client>({ definition: loadDefinition() }),
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
