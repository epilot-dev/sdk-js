import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/automation';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
  ActionCondition,
  ActionSchedule,
  ActionScheduleSource,
  ActivityId,
  ActivityTrigger,
  AnyAction,
  AnyActionConfig,
  AnyTrigger,
  AnythingButCondition,
  ApiCallerContext,
  ApiSubmissionTrigger,
  AppendValueMapper,
  AssignThreadAction,
  AssignThreadConfig,
  AssignUsersToStep,
  AutomationAction,
  AutomationActionConfig,
  AutomationActionExecutionState,
  AutomationActionId,
  AutomationExecution,
  AutomationExecutionId,
  AutomationFlow,
  AutomationFlowId,
  AutomationTrigger,
  BulkTriggerJob,
  BulkTriggerRequest,
  CancellationReason,
  CartCheckoutAction,
  CartCheckoutActionConfig,
  CartCheckoutConfig,
  Comparison,
  ConditionStatement,
  CopyValueMapper,
  CreateDocumentAction,
  CreateDocumentActionConfig,
  CreateDocumentConfig,
  CustomAction,
  DiffAdded,
  DiffDeleted,
  DiffUpdated,
  EntityId,
  EntityItemSnapshot,
  EntityManualTrigger,
  EntityOperation,
  EntityOperationTrigger,
  EntityRef,
  EntitySearchFilter,
  EntitySearchFilterValue,
  EqualsIgnoreCaseCondition,
  ErrorCode,
  ErrorDetail,
  ErrorObject,
  ErrorOutput,
  ExecItem,
  ExecutionChain,
  ExecutionStatus,
  ExistsCondition,
  FilterConditionOnEvent,
  FlowExecutionCancelAction,
  FlowExecutionCancelActionConfig,
  FlowExecutionCancelConfig,
  FlowsTrigger,
  FrontendSubmitTrigger,
  GetExecutionsResp,
  InformERPAction,
  InformERPActionConfig,
  InformERPConfig,
  JobId,
  JourneySubmitTrigger,
  MapEntityAction,
  MapEntityActionConfig,
  MapEntityConfig,
  MappingAttribute,
  MappingAttributeMode,
  MappingAttributeV2,
  MappingConfigRef,
  MoveThreadAction,
  MoveThreadConfig,
  NewEmailThreadTrigger,
  NumericCondition,
  OperationNode,
  OperationObjectNode,
  OrCondition,
  OrConditionForDiff,
  OrganizationId,
  PatchBulkJobRequest,
  PrefixCondition,
  PrimitiveJSONValue,
  ReceivedEmailTrigger,
  RelationAttribute,
  ResumeReq,
  ResumeResp,
  ResumeToken,
  RetryReq,
  RetryStrategy,
  SearchAutomationsResp,
  SendEmailAction,
  SendEmailActionConfig,
  SendEmailCondition,
  SendEmailConfig,
  SetValueMapper,
  StartExecutionRequest,
  SuffixCondition,
  TriggerCondition,
  TriggerContext,
  TriggerEventAction,
  TriggerEventActionConfig,
  TriggerEventConfig,
  TriggerEventEntityActivity,
  TriggerEventEntityOperation,
  TriggerEventFlowAutomationTask,
  TriggerEventManual,
  TriggerEventMessaging,
  TriggerShareEntityAction,
  TriggerShareEntityActionConfig,
  TriggerShareEntityConfig,
  TriggerWebhookAction,
  TriggerWebhookActionConfig,
  TriggerWebhookConfig,
  TriggerWorkflowAction,
  TriggerWorkflowActionConfig,
  TriggerWorkflowCondition,
  TriggerWorkflowConfig,
  WildcardCondition,
  WorkflowContext,
  WorkflowContextRole,
  WorkflowExecutionContext,
} from '../types/automation';

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/automation-runtime.json');
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
 * `automation.someOperation(...)` calls forwarded to lazy singleton
 */
export const automation = _handle;
