/* Auto-copied from integration-toolkit-client/src/schema-model.ts */
/* eslint-disable */
/**
 * DO NOT MODIFY - GENERATED FROM erp-integration-api
 *
 * Monitoring code catalog: the level and operator-facing description for every code
 * the Integration Toolkit emits. Regenerate with `npm run codes:local`.
 */

import type { Components } from '../types/integration-toolkit';

/**
 * Every monitoring code the toolkit itself emits.
 *
 * Local alias only — the public `MonitoringCode` type is exported from '../types/integration-toolkit',
 * generated from the spec's enum. Re-exporting it here would collide with that.
 */
type MonitoringCode = Components.Schemas.MonitoringCode;

/** The level a code is always emitted at. */
export type MonitoringCodeLevel = 'success' | 'error' | 'warning' | 'info';

export interface MonitoringCodeMeta {
  level: MonitoringCodeLevel;
  description: string;
}

/**
 * Upstream HTTP statuses are emitted as a family rather than as taxonomy members,
 * because the status is unbounded. They are emitted at `warning`.
 */
export const HTTP_STATUS_CODE_FAMILY = {
  pattern: 'HTTP_{status}',
  level: 'warning' as MonitoringCodeLevel,
  description:
    'The upstream system answered the proxied request with this HTTP status. The proxy itself worked — it reached the target and returned its answer — so the refusal is recorded against the use case that owns the request.',
} as const;

const HTTP_STATUS_CODE_PATTERN = /^HTTP_\d{3}$/;

/** Level and description per taxonomy code. */
export const MONITORING_CODES: Record<MonitoringCode, MonitoringCodeMeta> = {
  ACK_CONFIRMED: { level: 'info', description: 'Acknowledgement was confirmed by the ERP system' },
  ACK_PENDING: { level: 'info', description: 'Acknowledgement is pending from the ERP system' },
  ACK_TIMEOUT: { level: 'warning', description: 'Acknowledgement timed out waiting for the ERP system' },
  ATTACHMENT_NOT_FOUND: {
    level: 'error',
    description: 'The file no longer exists — it was removed between the event and the delivery',
  },
  ATTRIBUTE_TYPE_MISMATCH: {
    level: 'error',
    description: 'An attribute value did not match the type declared in the entity schema',
  },
  DEPRECATED_ENDPOINT: { level: 'error', description: 'This endpoint version is deprecated' },
  DIRECT_ENTITY_NOT_ALLOWED: {
    level: 'error',
    description: 'The entity is not permitted by the use case entity allowlist',
  },
  DIRECT_PAYLOAD_INVALID: {
    level: 'error',
    description: 'The direct mode payload failed validation against the versioned payload schema',
  },
  DIRECT_VERSION_UNSUPPORTED: {
    level: 'error',
    description: 'The direct mode payload version is not supported by the platform',
  },
  DUPLICATE_EVENT: { level: 'info', description: 'This event was already processed (duplicate)' },
  ENTITY_CREATED: { level: 'success', description: 'A new entity was created in epilot' },
  ENTITY_DELETED: { level: 'success', description: 'An entity was deleted from epilot' },
  ENTITY_NO_OP: { level: 'success', description: 'No changes were needed for the entity' },
  ENTITY_REFERENCE_NOT_FOUND: {
    level: 'error',
    description: 'A direct-by-id entity reference points at an entity that does not exist or has a different schema',
  },
  ENTITY_UPDATED: { level: 'success', description: 'An existing entity was updated in epilot' },
  EVENT_NOT_CONFIGURED: { level: 'error', description: 'No mapping configuration found for this event type' },
  EXTERNAL_API_ERROR: { level: 'error', description: 'An external API returned an error' },
  EXTERNAL_ERROR: {
    level: 'error',
    description:
      "An error span pushed by an external system (e.g. your integration middleware) via the external monitoring events endpoint. epilot assigns the code from the span's level; the middleware never sends one.",
  },
  EXTERNAL_INFO: {
    level: 'info',
    description: 'An informational span pushed by an external system via the external monitoring events endpoint.',
  },
  EXTERNAL_SUCCESS: {
    level: 'success',
    description: 'A success span pushed by an external system via the external monitoring events endpoint.',
  },
  EXTERNAL_WARNING: {
    level: 'warning',
    description: 'A warning span pushed by an external system via the external monitoring events endpoint.',
  },
  FAN_OUT_EMPTY: {
    level: 'info',
    description:
      'The split expression returned an empty list, so nothing was sent — expected for events that carry no relevant items',
  },
  FAN_OUT_INVALID_RESULT: {
    level: 'error',
    description:
      'The split expression returned something other than a list, so no deliveries could be created — see split_expression_result_type',
  },
  FILE_EXTRACTION_FAILED: { level: 'error', description: 'Failed to extract file from the request' },
  FILE_FETCH_FAILED: {
    level: 'error',
    description: 'The file could not be fetched from epilot before it could be uploaded',
  },
  FILE_PROXY_OK: { level: 'success', description: 'File proxy request completed successfully' },
  FILE_PROXY_UPLOAD_ENQUEUED: {
    level: 'info',
    description: 'A per-file upload was accepted for delivery during fan-out',
  },
  FILE_PROXY_UPLOAD_FAILED: {
    level: 'error',
    description: 'A file upload failed terminally, or every delivery attempt was exhausted',
  },
  FILE_PROXY_UPLOAD_RETRYING: {
    level: 'warning',
    description:
      'A file upload failed with a retryable error and will be retried automatically — one event per attempt',
  },
  FILE_PROXY_UPLOADED: { level: 'success', description: 'The external system accepted the file' },
  FILE_TOO_LARGE: {
    level: 'error',
    description: 'The file exceeds the maximum size configured on the upload use case',
  },
  INTEGRATION_NOT_FOUND: {
    level: 'error',
    description:
      "The inbound event referenced an integration_id that does not exist in the calling token's organization. Check the integration id and that the token belongs to the same org.",
  },
  INVALID_METER_READING_ATTRIBUTES: { level: 'error', description: 'Meter reading has invalid attributes' },
  LOOKUP_UNMAPPED: {
    level: 'warning',
    description:
      'A value was not listed in a lookup table and its fallback was used — see lookup_name and lookup_key for the gap',
  },
  MALFORMED_PAYLOAD: { level: 'error', description: 'The event payload could not be parsed (malformed JSON)' },
  MAPPING_EXPRESSION_FAILED: { level: 'error', description: 'A mapping expression failed to evaluate' },
  METER_READING_DELETED: {
    level: 'success',
    description:
      'One or more meter readings were deleted — emitted once per batch, not per reading (reading_count and external_ids in details)',
  },
  METER_READING_GROUP_FAILED: {
    level: 'error',
    description:
      'A batch write of meter readings failed permanently after all retries — summary event alongside the per-reading errors',
  },
  METER_READING_GROUP_RETRYING: {
    level: 'error',
    description:
      'A batch write of meter readings failed and will be retried automatically — one event per attempt covering the whole group (reading_count and external_ids in details)',
  },
  METER_READING_UPSERTED: {
    level: 'success',
    description:
      'One or more meter readings were created or updated — emitted once per batch, not per reading (reading_count and external_ids in details)',
  },
  METERING_API_ERROR: { level: 'error', description: 'The metering API returned an error' },
  MISSING_REQUIRED_PARAM: { level: 'error', description: 'A required parameter is missing from the request' },
  MISSING_UNIQUE_IDENTIFIERS: {
    level: 'error',
    description: 'The event is missing the unique identifier field(s) required to match an entity',
  },
  MSG_ACKED: {
    level: 'info',
    description: 'Outbound message acknowledged by the polling consumer and removed from the queue',
  },
  MSG_DEAD_LETTERED: {
    level: 'info',
    description:
      'Outbound message moved to the dead-letter queue after exhausting delivery attempts, or via an operator skip',
  },
  MSG_ENQUEUED: {
    level: 'info',
    description: 'Outbound message enqueued to the poll queue, awaiting consumption by the ERP',
  },
  MSG_EXPIRED_UNPOLLED: {
    level: 'info',
    description: 'Outbound message expired before being consumed — retention elapsed without a successful poll',
  },
  MSG_HEAD_BLOCKED: {
    level: 'info',
    description:
      'Outbound stream halted by a poison head message (block policy) — requires operator unblock or consumer acknowledgement',
  },
  OAUTH2_TOKEN_FAILURE: { level: 'error', description: 'Failed to obtain an OAuth2 access token' },
  PAYLOAD_TOO_LARGE: {
    level: 'error',
    description: 'The payload exceeded the maximum size accepted by the receiving system',
  },
  PRUNE_SCOPE_COMPLETED: { level: 'success', description: 'Scope pruning completed successfully' },
  PRUNE_SCOPE_PARTIAL_FAILURE: { level: 'error', description: 'Scope pruning completed with some failures' },
  RECURSION_DEPTH_EXCEEDED: { level: 'error', description: 'Maximum recursion depth was exceeded during processing' },
  RELATION_REF_ITEM_NOT_FOUND: {
    level: 'error',
    description:
      'The relation_ref target entity exists but the referenced item/value could not be matched — skipped as non-retryable. Check the mapping configuration and the entity data.',
  },
  RELATION_REF_VALUE_UNDEFINED: {
    level: 'error',
    description: 'A relation_ref mapping value resolved to undefined — check the mapping expression',
  },
  REQUIRED_PARAM_MISSING: {
    level: 'error',
    description:
      'A param the use case marks as required resolved to nothing, so the delivery was stopped before anything was sent — see param_name',
  },
  SECURE_PROXY_DISABLED: { level: 'error', description: 'The secure proxy use case is disabled' },
  SECURE_PROXY_DOMAIN_BLOCKED: { level: 'error', description: 'The target domain is blocked' },
  SECURE_PROXY_DOMAIN_NOT_ALLOWED: { level: 'error', description: 'The target domain is not in the allowlist' },
  SECURE_PROXY_ERROR: { level: 'error', description: 'An error occurred in the secure proxy' },
  SECURE_PROXY_INVALID_CONFIG: { level: 'error', description: 'The secure proxy configuration is invalid' },
  SECURE_PROXY_INVALID_TYPE: { level: 'error', description: 'The secure proxy type is invalid' },
  SECURE_PROXY_INVALID_URL: { level: 'error', description: 'The target URL is invalid' },
  SECURE_PROXY_IP_BLOCKED: { level: 'error', description: 'The target IP address is blocked' },
  SECURE_PROXY_IP_NOT_ALLOWED: { level: 'error', description: 'The target IP address is not in the allowlist' },
  SECURE_PROXY_NOT_FOUND: { level: 'error', description: 'The secure proxy use case was not found' },
  SECURE_PROXY_UNAVAILABLE: { level: 'error', description: 'Secure proxy service is unavailable' },
  SIGNATURE_VERIFICATION_FAILED: { level: 'error', description: 'Request signature could not be verified' },
  SIGNATURE_VERIFICATION_UNAVAILABLE: {
    level: 'error',
    description: 'The file service could not be reached to verify the request signature',
  },
  SOFT_DELETED_ENTITY_MATCHED: {
    level: 'warning',
    description:
      'A soft-deleted entity matched the unique ID — it will be resurrected on upsert, or referenced as-is by a relation. Investigate why the ERP source is sending events for a deleted entity.',
  },
  STEP_DISABLED: {
    level: 'error',
    description:
      'A request step\'s "run this step when" expression returned false, so this step and every step after it were skipped. This is the configuration working as written, not a fault.',
  },
  TIMEOUT: { level: 'error', description: 'The operation timed out' },
  UNIQUE_ID_MULTIPLE_MATCHES: { level: 'error', description: 'Multiple entities matched the unique ID' },
  UNIQUE_ID_NOT_IN_SCHEMA: {
    level: 'error',
    description: 'The unique ID attribute is not defined in the entity schema',
  },
  UNKNOWN_ERROR: { level: 'error', description: 'An unexpected error occurred during processing' },
  USE_CASE_DISABLED: { level: 'error', description: 'The use case is currently disabled' },
  USE_CASE_INVALID_TYPE: { level: 'error', description: 'The use case type is invalid or unsupported' },
  USE_CASE_MISSING_CONFIG: { level: 'error', description: 'The use case is missing required configuration' },
  USE_CASE_NOT_FOUND: { level: 'error', description: 'The use case could not be found' },
  WEBHOOK_DELIVERED: { level: 'success', description: 'Webhook was delivered successfully' },
};

/**
 * Describes any code seen on a monitoring event, including the `HTTP_{status}`
 * family and codes this package predates. Returns `undefined` only for a code it
 * cannot place at all, so callers can render a sensible fallback.
 */
export function describeMonitoringCode(code: string): MonitoringCodeMeta | undefined {
  const known = (MONITORING_CODES as Record<string, MonitoringCodeMeta>)[code];
  if (known) return known;

  if (HTTP_STATUS_CODE_PATTERN.test(code)) {
    return {
      level: HTTP_STATUS_CODE_FAMILY.level,
      description: HTTP_STATUS_CODE_FAMILY.description,
    };
  }

  return undefined;
}
