import type { Document } from 'openapi-client-axios';

import { createApiClient } from '../client-factory';
import { createApiHandle } from '../proxy';
import type { ApiHandle } from '../types';
export { authorize } from '../authorize';
export type { TokenArg } from '../authorize';
import type { Client } from '../types/workflow';
export type {
  Client,
  PathsDictionary,
  OperationMethods,
  ActionSchedule,
  AddTaskReq,
  AgentConfig,
  AgentExecutionInfo,
  AiAgentTask,
  AnalyticsInfo,
  Assignees,
  AutomationConfig,
  AutomationInfo,
  AutomationTask,
  ClosingReason,
  ClosingReasonResp,
  Condition,
  ConditionId,
  CreateStepReq,
  DecisionTask,
  DelayedSchedule,
  DueDateConfig,
  DynamicDueDate,
  ECPDetails,
  Edge,
  EnableRequirement,
  EntityRef,
  EntitySync,
  ErrorResp,
  EvaluationSource,
  ExecutionPaginationDynamo,
  Flow,
  FlowClosingReason,
  FlowContext,
  FlowExecution,
  FlowExecutionId,
  FlowSlim,
  FlowTemplateId,
  FlowTrigger,
  ImmediateSchedule,
  ItemType,
  LastEvaluatedKey,
  LoopConfig,
  LoopInfo,
  ManualTask,
  Operator,
  PatchFlowReq,
  PatchPhaseReq,
  PatchTaskReq,
  Phase,
  PhaseId,
  PhaseInEntity,
  RelativeSchedule,
  SearchExecutionsReq,
  SearchExecutionsResp,
  SearchFlowsReq,
  SearchPagination,
  SearchSorting,
  SearchStepsReq,
  SearchStepsResp,
  Section,
  SectionSimplified,
  SectionStatus,
  StartFlowReq,
  Statement,
  Step,
  StepDescription,
  StepExtended,
  StepId,
  StepJourney,
  StepPositionAt,
  StepRequirement,
  StepSimplified,
  StepStatus,
  StepType,
  Task,
  TaskBase,
  TaskId,
  TaskType,
  TimeUnit,
  TriggerMode,
  TriggerType,
  UpdateEntityAttributes,
  UpdateStepReq,
  UpdateStepResp,
  UserId,
  VariableAssignment,
  WorkflowContext,
  WorkflowExecution,
  WorkflowExecutionBase,
  WorkflowExecutionCreateReq,
  WorkflowExecutionSlim,
  WorkflowExecutionUpdateReq,
  WorkflowInEntity,
  WorkflowStatus,
} from '../types/workflow';

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDefinition = (): Document => {
  const mod = require('../definitions/workflow.json');
  return (mod.default ?? mod) as unknown as Document;
};

let _instance: Client | null = null;

const resolve = (): Client => {
  if (!_instance) {
    const definition = loadDefinition();
    _instance = createApiClient<Client>({ definition });
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
 * `workflow.someOperation(...)` calls forwarded to lazy singleton
 */
export const workflow = _handle;
