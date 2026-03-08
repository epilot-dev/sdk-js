import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/workflow-definition';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
  ActionSchedule,
  AgentConfig,
  AiAgentTask,
  AutomationConfig,
  AutomationTask,
  AutomationTrigger,
  ChangeReasonStatusReq,
  ClosingReason,
  ClosingReasonId,
  ClosingReasonNotFoundResp,
  ClosingReasons,
  ClosingReasonsIds,
  ClosingReasonsStatus,
  Condition,
  CreateFlowTemplate,
  DecisionTask,
  DefinitionNotFoundResp,
  DelayedSchedule,
  DueDateConfig,
  DynamicDueDate,
  ECPDetails,
  Edge,
  EnableRequirement,
  EntitySync,
  ErrorResp,
  EvaluationSource,
  FlowTemplate,
  FlowTemplateBase,
  FlowTemplateExport,
  FlowTemplateId,
  FlowTemplateImportResult,
  FlowTemplatesList,
  ImmediateSchedule,
  ItemType,
  JourneyAutomationTrigger,
  JourneySubmissionTrigger,
  ManualTask,
  ManualTrigger,
  MaxAllowedLimit,
  Operator,
  Phase,
  RelativeSchedule,
  SearchFlowTemplates,
  Section,
  Statement,
  Step,
  StepDescription,
  StepJourney,
  StepRequirement,
  StepType,
  Task,
  TaskBase,
  TaskType,
  TimeUnit,
  Trigger,
  TriggerMode,
  TriggerType,
  UpdateEntityAttributes,
  VariableAssignment,
  Version,
  WorkflowDefinition,
} from '../types/workflow-definition';

const loadDefinition = async (): Promise<Document> => {
  const mod = await import('../definitions/workflow-definition.json');
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
 * `workflowDefinition.someOperation(...)` calls forwarded to lazy singleton
 */
export const workflowDefinition = _handle;
