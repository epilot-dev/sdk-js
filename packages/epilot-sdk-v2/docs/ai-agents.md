# AI Agents API

- **Base URL:** `https://ai-agents.sls.epilot.io`
- **Full API Docs:** [https://docs.epilot.io/api/ai-agents](https://docs.epilot.io/api/ai-agents)

## Usage

```ts
import { epilot } from '@epilot/sdk'

epilot.authorize(() => '<token>')
const { data } = await epilot.aiAgents.createAgent(...)
```

### Tree-shakeable import

```ts
import { getClient, authorize } from '@epilot/sdk/ai-agents'

const aiAgentsClient = getClient()
authorize(aiAgentsClient, () => '<token>')
const { data } = await aiAgentsClient.createAgent(...)
```

## Operations

**Agents Configuration**
- [`createAgent`](#createagent)
- [`listAgents`](#listagents)
- [`getAgentById`](#getagentbyid)
- [`updateAgentById`](#updateagentbyid)
- [`deleteAgentById`](#deleteagentbyid)
- [`getAgentAuth`](#getagentauth)
- [`activateAgentAuth`](#activateagentauth)
- [`deactivateAgentAuth`](#deactivateagentauth)

**Customer Chat**
- [`listCustomerChat`](#listcustomerchat)
- [`createCustomerChatAgent`](#createcustomerchatagent)
- [`listCustomerChatCapabilities`](#listcustomerchatcapabilities)
- [`getCustomerChatAgent`](#getcustomerchatagent)
- [`renameCustomerChatAgent`](#renamecustomerchatagent)
- [`deleteCustomerChatAgent`](#deletecustomerchatagent)
- [`saveCustomerChatConfig`](#savecustomerchatconfig)
- [`listCustomerChatConversations`](#listcustomerchatconversations)
- [`getCustomerChatConversation`](#getcustomerchatconversation)

**Agent Execution**
- [`executeAgent`](#executeagent)
- [`executeAgentStream`](#executeagentstream)
- [`listExecutions`](#listexecutions)
- [`getExecution`](#getexecution)
- [`cancelExecution`](#cancelexecution)
- [`getExecutionTrace`](#getexecutiontrace)
- [`getExecutionScreenshots`](#getexecutionscreenshots)
- [`getExecutionFeedback`](#getexecutionfeedback)
- [`putExecutionFeedback`](#putexecutionfeedback)
- [`approveExecution`](#approveexecution)
- [`rejectExecution`](#rejectexecution)
- [`streamExecution`](#streamexecution)

**Chat**
- [`chat`](#chat)

**Conversations**
- [`listConversations`](#listconversations)
- [`getConversation`](#getconversation)
- [`deleteConversation`](#deleteconversation)
- [`submitConversationFeedback`](#submitconversationfeedback)

**Portal Sessions**
- [`createPortalSession`](#createportalsession)
- [`listPortalSessions`](#listportalsessions)
- [`getPortalSession`](#getportalsession)
- [`deletePortalSession`](#deleteportalsession)
- [`listPortalSessionEvents`](#listportalsessionevents)
- [`sendPortalSessionEvent`](#sendportalsessionevent)
- [`getPortalChatConfig`](#getportalchatconfig)

**Sessions**
- [`createSessionUpload`](#createsessionupload)
- [`createSession`](#createsession)
- [`listSessions`](#listsessions)
- [`getSession`](#getsession)
- [`renameSession`](#renamesession)
- [`deleteSession`](#deletesession)
- [`listSessionEvents`](#listsessionevents)
- [`sendSessionEvent`](#sendsessionevent)
- [`getSessionFileUrl`](#getsessionfileurl)
- [`runScript`](#runscript)
- [`getScriptRun`](#getscriptrun)
- [`applyScriptRun`](#applyscriptrun)
- [`revokeSessionAgents`](#revokesessionagents)
- [`createInternalSession`](#createinternalsession)
- [`getInternalSession`](#getinternalsession)
- [`createInternalExecution`](#createinternalexecution)
- [`decideInternalExecution`](#decideinternalexecution)
- [`listInternalPortalChats`](#listinternalportalchats)
- [`getInternalPortalChat`](#getinternalportalchat)

**Schemas**
- [`AgentConfig`](#agentconfig)
- [`AppearanceConfig`](#appearanceconfig)
- [`LocalizedAppearance`](#localizedappearance)
- [`LocalizedFieldList`](#localizedfieldlist)
- [`CapabilityId`](#capabilityid)
- [`AccessLevel`](#accesslevel)
- [`SelfServiceIntent`](#selfserviceintent)
- [`ActionAutonomy`](#actionautonomy)
- [`CapabilityState`](#capabilitystate)
- [`CapabilityInstance`](#capabilityinstance)
- [`CreateCustomerChatAgentRequest`](#createcustomerchatagentrequest)
- [`CustomerChatAgent`](#customerchatagent)
- [`CustomerChatCasRequest`](#customerchatcasrequest)
- [`DeleteCustomerChatAgentRequest`](#deletecustomerchatagentrequest)
- [`CustomerChatPlace`](#customerchatplace)
- [`EscalationConfig`](#escalationconfig)
- [`TicketPurpose`](#ticketpurpose)
- [`CustomerChatKnowledgeSource`](#customerchatknowledgesource)
- [`CustomerChatKnowledgeSourceType`](#customerchatknowledgesourcetype)
- [`ListCustomerChatResponse`](#listcustomerchatresponse)
- [`CustomerChatCapabilityCatalogEntry`](#customerchatcapabilitycatalogentry)
- [`ListCustomerChatCapabilitiesResponse`](#listcustomerchatcapabilitiesresponse)
- [`RenameCustomerChatAgentRequest`](#renamecustomerchatagentrequest)
- [`SaveCustomerChatConfigRequest`](#savecustomerchatconfigrequest)
- [`WebsiteHandover`](#websitehandover)
- [`AgentId`](#agentid)
- [`KnowledgeSourceIds`](#knowledgesourceids)
- [`AgentDomain`](#agentdomain)
- [`CreateAgentRequest`](#createagentrequest)
- [`UpdateAgentRequest`](#updateagentrequest)
- [`AgentDefinition`](#agentdefinition)
- [`ListAgentsResponse`](#listagentsresponse)
- [`ListExecutionsResponse`](#listexecutionsresponse)
- [`ApproveExecutionRequest`](#approveexecutionrequest)
- [`RejectExecutionRequest`](#rejectexecutionrequest)
- [`ExecuteAgentRequest`](#executeagentrequest)
- [`ExecuteAgentStreamRequest`](#executeagentstreamrequest)
- [`ExecutionResponse`](#executionresponse)
- [`ExecutionIterationProjection`](#executioniterationprojection)
- [`ExecutionFeedback`](#executionfeedback)
- [`ExecutionFeedbackResponse`](#executionfeedbackresponse)
- [`PutExecutionFeedbackRequest`](#putexecutionfeedbackrequest)
- [`ExecutionTrace`](#executiontrace)
- [`ExecutionIteration`](#executioniteration)
- [`PendingAction`](#pendingaction)
- [`ExecutionError`](#executionerror)
- [`ExecutionMetrics`](#executionmetrics)
- [`AgentExecutionEventStatus`](#agentexecutioneventstatus)
- [`AgentExecutionEvent`](#agentexecutionevent)
- [`ToolPreview`](#toolpreview)
- [`PreviewActionType`](#previewactiontype)
- [`PreviewEntity`](#previewentity)
- [`PreviewChange`](#previewchange)
- [`PreviewValue`](#previewvalue)
- [`ToolDefinition`](#tooldefinition)
- [`SkillCategory`](#skillcategory)
- [`AgentSource`](#agentsource)
- [`SkillAvailability`](#skillavailability)
- [`ExecutionContext`](#executioncontext)
- [`ExecutionPattern`](#executionpattern)
- [`ExecutionMode`](#executionmode)
- [`ExecutionStatus`](#executionstatus)
- [`ParameterType`](#parametertype)
- [`InputParameterDefinition`](#inputparameterdefinition)
- [`InputParametersSchema`](#inputparametersschema)
- [`ModelConfig`](#modelconfig)
- [`Error`](#error)
- [`AgentAuthAccessProfile`](#agentauthaccessprofile)
- [`AgentAuthActivationRequest`](#agentauthactivationrequest)
- [`AgentAuthStatus`](#agentauthstatus)
- [`ChatRequest`](#chatrequest)
- [`ToolApprovalAnswer`](#toolapprovalanswer)
- [`ToolApprovalRequest`](#toolapprovalrequest)
- [`AgentPreviewOverride`](#agentpreviewoverride)
- [`ChatMessage`](#chatmessage)
- [`StreamingOptions`](#streamingoptions)
- [`StreamEvent`](#streamevent)
- [`ExecutionResult`](#executionresult)
- [`ConversationItem`](#conversationitem)
- [`MessageItem`](#messageitem)
- [`MessageFeedback`](#messagefeedback)
- [`SubmitFeedbackRequest`](#submitfeedbackrequest)
- [`CustomerChatConversation`](#customerchatconversation)
- [`CustomerChatConversationMessage`](#customerchatconversationmessage)
- [`InternalPortalChat`](#internalportalchat)
- [`InternalPortalChatPlace`](#internalportalchatplace)
- [`InternalPortalChats`](#internalportalchats)
- [`InternalPortalChatRows`](#internalportalchatrows)
- [`InternalPortalChatTranscript`](#internalportalchattranscript)
- [`ListCustomerChatConversationsResponse`](#listcustomerchatconversationsresponse)
- [`CustomerChatConversationTranscript`](#customerchatconversationtranscript)
- [`ListConversationsResponse`](#listconversationsresponse)
- [`ConversationWithMessages`](#conversationwithmessages)
- [`SessionsError`](#sessionserror)
- [`ValidationIssue`](#validationissue)
- [`RefusalDetails`](#refusaldetails)
- [`Refusal`](#refusal)
- [`RequestId`](#requestid)
- [`SessionStatus`](#sessionstatus)
- [`SessionLiveInfo`](#sessionliveinfo)
- [`SessionView`](#sessionview)
- [`SessionOrigin`](#sessionorigin)
- [`CreateInternalSessionRequest`](#createinternalsessionrequest)
- [`CreateInternalExecutionRequest`](#createinternalexecutionrequest)
- [`ExecutionDecisionRequest`](#executiondecisionrequest)
- [`ExecutionDecision`](#executiondecision)
- [`CreatedInternalExecution`](#createdinternalexecution)
- [`CreatedInternalSession`](#createdinternalsession)
- [`InternalSessionStatus`](#internalsessionstatus)
- [`SessionResponse`](#sessionresponse)
- [`SessionList`](#sessionlist)
- [`CreatedSession`](#createdsession)
- [`SessionEventsPage`](#sessioneventspage)
- [`MessageInput`](#messageinput)
- [`CreatePortalSessionRequest`](#createportalsessionrequest)
- [`PortalChatConfig`](#portalchatconfig)
- [`CreateSessionRequest`](#createsessionrequest)
- [`RenameSessionRequest`](#renamesessionrequest)
- [`ClientInput`](#clientinput)
- [`UserMessageInput`](#usermessageinput)
- [`UserApprovalInput`](#userapprovalinput)
- [`UserAnswerInput`](#useranswerinput)
- [`UserInterruptInput`](#userinterruptinput)
- [`InputEventId`](#inputeventid)
- [`SessionInputAccepted`](#sessioninputaccepted)
- [`UploadRequest`](#uploadrequest)
- [`SessionUpload`](#sessionupload)
- [`FileRef`](#fileref)
- [`SessionFileUrl`](#sessionfileurl)
- [`RunScriptRequest`](#runscriptrequest)
- [`ScriptRunView`](#scriptrunview)
- [`ApplyScriptRunRequest`](#applyscriptrunrequest)
- [`ScriptApplyResult`](#scriptapplyresult)
- [`ContentPart`](#contentpart)
- [`TextContentPart`](#textcontentpart)
- [`ImageContentPart`](#imagecontentpart)
- [`ThinkingContentPart`](#thinkingcontentpart)
- [`ToolCallContentPart`](#toolcallcontentpart)
- [`SessionErrorCode`](#sessionerrorcode)
- [`ContextBreakdown`](#contextbreakdown)
- [`BatchChange`](#batchchange)
- [`ChangeOutcome`](#changeoutcome)
- [`Question`](#question)
- [`Answer`](#answer)
- [`ClientEvent`](#clientevent)
- [`ClientEventBase`](#clienteventbase)
- [`ClientEventInput`](#clienteventinput)
- [`ClientEventInputTaken`](#clienteventinputtaken)
- [`ClientEventInputCancelled`](#clienteventinputcancelled)
- [`ClientEventInputFailed`](#clienteventinputfailed)
- [`ClientEventTurnStarted`](#clienteventturnstarted)
- [`ClientEventModelUsage`](#clienteventmodelusage)
- [`ClientEventContextCompacted`](#clienteventcontextcompacted)
- [`ClientEventTurnEnded`](#clienteventturnended)
- [`ClientEventMessage`](#clienteventmessage)
- [`ClientEventStepStarted`](#clienteventstepstarted)
- [`ClientEventStepFinished`](#clienteventstepfinished)
- [`ClientEventSkillLoaded`](#clienteventskillloaded)
- [`ClientEventApprovalRequired`](#clienteventapprovalrequired)
- [`ClientEventApprovalResolved`](#clienteventapprovalresolved)
- [`ClientEventApprovalExecuted`](#clienteventapprovalexecuted)
- [`ClientEventApprovalResult`](#clienteventapprovalresult)
- [`ClientEventQuestionAsked`](#clienteventquestionasked)
- [`ClientEventFilesCreated`](#clienteventfilescreated)
- [`ClientEventQuestionAnswered`](#clienteventquestionanswered)

### `createAgent`

Create Agent definition

`POST /v1/agents`

```ts
const { data } = await client.createAgent(
  null,
  {
    domain: 'customer_service',
    availability: ['flows'],
    name: 'Email Reply Generator',
    description: 'string',
    category: 'message',
    icon: 'mail-reply',
    system_prompt: 'string',
    tools: ['entity.search', 'message.draft'],
    model_config: {
      model_id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      temperature: 0.7,
      max_tokens: 4096,
      thinking: false,
      thinking_budget: 10000
    },
    max_iterations: 10,
    execution_pattern: 'direct',
    execution_mode: 'automatic',
    output_schema: {},
    input_parameters_schema: {
      type: 'object',
      parameters: [
        {
          name: 'target_schema',
          label: 'Target Schema',
          type: 'entity-schema',
          description: 'Entity type to create'
        },
        {
          name: 'confidence_threshold',
          label: 'Confidence Threshold',
          type: 'number',
          minimum: 0,
          maximum: 1,
          default: 0.8
        },
        /* ... 1 more */
      ],
      required: ['target_schema']
    },
    knowledge_source_ids: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "domain": "customer_service",
  "agent_id": "skill:email-categorizer",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "source": "system",
  "availability": ["flows", "copilot"],
  "allowed_entity_schemas": ["message"],
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096,
    "thinking": false,
    "thinking_budget": 10000
  },
  "max_iterations": 0,
  "execution_pattern": "direct",
  "execution_mode": "automatic",
  "output_schema": {},
  "input_parameters_schema": {
    "type": "object",
    "parameters": [
      {
        "name": "target_schema",
        "label": "Target Schema",
        "type": "entity-schema",
        "description": "Entity type to create"
      },
      {
        "name": "confidence_threshold",
        "label": "Confidence Threshold",
        "type": "number",
        "minimum": 0,
        "maximum": 1,
        "default": 0.8
      }
    ],
    "required": ["target_schema"]
  },
  "knowledge_source_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  "version": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `listAgents`

List all agent configurations

`GET /v1/agents`

```ts
const { data } = await client.listAgents({
  source: 'example',
  availability: 'example',
  entity_schema: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agents": [
    {
      "domain": "customer_service",
      "agent_id": "skill:email-categorizer",
      "org_id": "string",
      "name": "string",
      "description": "string",
      "category": "message",
      "icon": "string",
      "source": "system",
      "availability": ["flows", "copilot"],
      "allowed_entity_schemas": ["message"],
      "system_prompt": "string",
      "tools": ["string"],
      "model_config": {
        "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "temperature": 0.7,
        "max_tokens": 4096,
        "thinking": false,
        "thinking_budget": 10000
      },
      "max_iterations": 0,
      "execution_pattern": "direct",
      "execution_mode": "automatic",
      "output_schema": {},
      "input_parameters_schema": {
        "type": "object",
        "parameters": [
          {
            "name": "target_schema",
            "label": "Target Schema",
            "type": "entity-schema",
            "description": "Entity type to create"
          },
          {
            "name": "confidence_threshold",
            "label": "Confidence Threshold",
            "type": "number",
            "minimum": 0,
            "maximum": 1,
            "default": 0.8
          }
        ],
        "required": ["target_schema"]
      },
      "knowledge_source_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
      "version": 0,
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z",
      "created_by": "string"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getAgentById`

Get the agent configuration by ID

`GET /v1/agents/{agent_id}`

```ts
const { data } = await client.getAgentById({
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "domain": "customer_service",
  "agent_id": "skill:email-categorizer",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "source": "system",
  "availability": ["flows", "copilot"],
  "allowed_entity_schemas": ["message"],
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096,
    "thinking": false,
    "thinking_budget": 10000
  },
  "max_iterations": 0,
  "execution_pattern": "direct",
  "execution_mode": "automatic",
  "output_schema": {},
  "input_parameters_schema": {
    "type": "object",
    "parameters": [
      {
        "name": "target_schema",
        "label": "Target Schema",
        "type": "entity-schema",
        "description": "Entity type to create"
      },
      {
        "name": "confidence_threshold",
        "label": "Confidence Threshold",
        "type": "number",
        "minimum": 0,
        "maximum": 1,
        "default": 0.8
      }
    ],
    "required": ["target_schema"]
  },
  "knowledge_source_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  "version": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `updateAgentById`

Update the agent configuration by ID

`PUT /v1/agents/{agent_id}`

```ts
const { data } = await client.updateAgentById(
  {
    agent_id: 'example',
  },
  {
    domain: 'customer_service',
    availability: ['flows'],
    name: 'string',
    description: 'string',
    category: 'message',
    icon: 'string',
    system_prompt: 'string',
    tools: ['string'],
    model_config: {
      model_id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      temperature: 0.7,
      max_tokens: 4096,
      thinking: false,
      thinking_budget: 10000
    },
    max_iterations: 1,
    execution_pattern: 'direct',
    execution_mode: 'automatic',
    output_schema: {},
    input_parameters_schema: {
      type: 'object',
      parameters: [
        {
          name: 'target_schema',
          label: 'Target Schema',
          type: 'entity-schema',
          description: 'Entity type to create'
        },
        {
          name: 'confidence_threshold',
          label: 'Confidence Threshold',
          type: 'number',
          minimum: 0,
          maximum: 1,
          default: 0.8
        },
        /* ... 1 more */
      ],
      required: ['target_schema']
    },
    knowledge_source_ids: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "domain": "customer_service",
  "agent_id": "skill:email-categorizer",
  "org_id": "string",
  "name": "string",
  "description": "string",
  "category": "message",
  "icon": "string",
  "source": "system",
  "availability": ["flows", "copilot"],
  "allowed_entity_schemas": ["message"],
  "system_prompt": "string",
  "tools": ["string"],
  "model_config": {
    "model_id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "temperature": 0.7,
    "max_tokens": 4096,
    "thinking": false,
    "thinking_budget": 10000
  },
  "max_iterations": 0,
  "execution_pattern": "direct",
  "execution_mode": "automatic",
  "output_schema": {},
  "input_parameters_schema": {
    "type": "object",
    "parameters": [
      {
        "name": "target_schema",
        "label": "Target Schema",
        "type": "entity-schema",
        "description": "Entity type to create"
      },
      {
        "name": "confidence_threshold",
        "label": "Confidence Threshold",
        "type": "number",
        "minimum": 0,
        "maximum": 1,
        "default": 0.8
      }
    ],
    "required": ["target_schema"]
  },
  "knowledge_source_ids": ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
  "version": 0,
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z",
  "created_by": "string"
}
```

</details>

---

### `deleteAgentById`

Delete the agent configuration by ID

`DELETE /v1/agents/{agent_id}`

```ts
const { data } = await client.deleteAgentById({
  agent_id: 'example',
})
```

---

### `getAgentAuth`

Get the agent's identity for Flows runs

`GET /v1/agents/{agent_id}/agent-auth`

```ts
const { data } = await client.getAgentAuth({
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "status": "inactive",
  "agent_auth_agent_id": "string",
  "activation_id": "string",
  "access_profile": "read",
  "owner_user_id": "string",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "expiring_soon": true
}
```

</details>

---

### `activateAgentAuth`

Activate the agent's identity for Flows runs

`PUT /v1/agents/{agent_id}/agent-auth`

```ts
const { data } = await client.activateAgentAuth(
  {
    agent_id: 'example',
  },
  {
    access_profile: 'read',
    reason: 'Labels inbound emails and updates their tickets'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "status": "inactive",
  "agent_auth_agent_id": "string",
  "activation_id": "string",
  "access_profile": "read",
  "owner_user_id": "string",
  "expires_at": "1970-01-01T00:00:00.000Z",
  "expiring_soon": true
}
```

</details>

---

### `deactivateAgentAuth`

Deactivate the agent's identity for Flows runs

`DELETE /v1/agents/{agent_id}/agent-auth`

```ts
const { data } = await client.deactivateAgentAuth({
  agent_id: 'example',
})
```

---

### `listCustomerChat`

List customer chat agents

`GET /v1/customer-chat`

```ts
const { data } = await client.listCustomerChat()
```

<details>
<summary>Response</summary>

```json
{
  "agents": [
    {
      "org_id": "string",
      "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "place": "website",
      "internal_name": "string",
      "runtime_agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "config": {
        "capabilities": [
          {
            "type": "navigate_portal_pages",
            "instanceId": "string",
            "enabled": true,
            "meterTypes": ["string"],
            "ticketType": "string",
            "allowedDomains": ["string"],
            "autonomy": "draft",
            "label": "string",
            "guidance": "string",
            "blockIds": ["string"],
            "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "accessLevel": "anonymous",
            "intent": "submit_meter_reading",
            "journeyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "journeyName": "string",
            "url": "string",
            "searchDeviceDocs": true
          }
        ],
        "knowledgeSources": [
          {
            "id": "string",
            "type": "portal_page",
            "title": "string",
            "targetId": "string",
            "detail": "string"
          }
        ],
        "escalation": {
          "websiteHandover": {
            "kind": "phone",
            "value": "string",
            "journeyId": "string",
            "journeyName": "string"
          },
          "ticketPurpose": {
            "id": "string",
            "name": "string"
          }
        },
        "appearance": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string",
          "language": "de",
          "formOfAddress": "sie",
          "followUps": true,
          "languages": ["de"],
          "translations": {
            "de": {
              "displayName": "string",
              "greeting": "string",
              "starters": ["string"],
              "starterKeys": ["string"],
              "launcherLabel": "string"
            },
            "en": {
              "displayName": "string",
              "greeting": "string",
              "starters": ["string"],
              "starterKeys": ["string"],
              "launcherLabel": "string"
            }
          },
          "needsReview": {
            "de": ["displayName"],
            "en": ["displayName"]
          }
        },
        "instructions": "string",
        "instructionTranslations": {
          "de": "string",
          "en": "string"
        },
        "instructionsNeedsReview": ["de"]
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `createCustomerChatAgent`

Create a customer chat agent with default config

`POST /v1/customer-chat`

```ts
const { data } = await client.createCustomerChatAgent(
  null,
  {
    place: 'website',
    internal_name: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "place": "website",
  "internal_name": "string",
  "runtime_agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "config": {
    "capabilities": [
      {
        "type": "navigate_portal_pages",
        "instanceId": "string",
        "enabled": true,
        "meterTypes": ["string"],
        "ticketType": "string",
        "allowedDomains": ["string"],
        "autonomy": "draft",
        "label": "string",
        "guidance": "string",
        "blockIds": ["string"],
        "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "accessLevel": "anonymous",
        "intent": "submit_meter_reading",
        "journeyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "journeyName": "string",
        "url": "string",
        "searchDeviceDocs": true
      }
    ],
    "knowledgeSources": [
      {
        "id": "string",
        "type": "portal_page",
        "title": "string",
        "targetId": "string",
        "detail": "string"
      }
    ],
    "escalation": {
      "websiteHandover": {
        "kind": "phone",
        "value": "string",
        "journeyId": "string",
        "journeyName": "string"
      },
      "ticketPurpose": {
        "id": "string",
        "name": "string"
      }
    },
    "appearance": {
      "displayName": "string",
      "greeting": "string",
      "starters": ["string"],
      "starterKeys": ["string"],
      "launcherLabel": "string",
      "language": "de",
      "formOfAddress": "sie",
      "followUps": true,
      "languages": ["de"],
      "translations": {
        "de": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        },
        "en": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        }
      },
      "needsReview": {
        "de": ["displayName"],
        "en": ["displayName"]
      }
    },
    "instructions": "string",
    "instructionTranslations": {
      "de": "string",
      "en": "string"
    },
    "instructionsNeedsReview": ["de"]
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listCustomerChatCapabilities`

List the capability catalog

`GET /v1/customer-chat/capabilities`

```ts
const { data } = await client.listCustomerChatCapabilities()
```

<details>
<summary>Response</summary>

```json
{
  "capabilities": [
    {
      "id": "navigate_portal_pages",
      "places": ["website"],
      "singleInstance": true,
      "requiresIntegration": true
    }
  ]
}
```

</details>

---

### `getCustomerChatAgent`

Get a customer chat agent

`GET /v1/customer-chat/{agent_id}`

```ts
const { data } = await client.getCustomerChatAgent({
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "place": "website",
  "internal_name": "string",
  "runtime_agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "config": {
    "capabilities": [
      {
        "type": "navigate_portal_pages",
        "instanceId": "string",
        "enabled": true,
        "meterTypes": ["string"],
        "ticketType": "string",
        "allowedDomains": ["string"],
        "autonomy": "draft",
        "label": "string",
        "guidance": "string",
        "blockIds": ["string"],
        "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "accessLevel": "anonymous",
        "intent": "submit_meter_reading",
        "journeyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "journeyName": "string",
        "url": "string",
        "searchDeviceDocs": true
      }
    ],
    "knowledgeSources": [
      {
        "id": "string",
        "type": "portal_page",
        "title": "string",
        "targetId": "string",
        "detail": "string"
      }
    ],
    "escalation": {
      "websiteHandover": {
        "kind": "phone",
        "value": "string",
        "journeyId": "string",
        "journeyName": "string"
      },
      "ticketPurpose": {
        "id": "string",
        "name": "string"
      }
    },
    "appearance": {
      "displayName": "string",
      "greeting": "string",
      "starters": ["string"],
      "starterKeys": ["string"],
      "launcherLabel": "string",
      "language": "de",
      "formOfAddress": "sie",
      "followUps": true,
      "languages": ["de"],
      "translations": {
        "de": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        },
        "en": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        }
      },
      "needsReview": {
        "de": ["displayName"],
        "en": ["displayName"]
      }
    },
    "instructions": "string",
    "instructionTranslations": {
      "de": "string",
      "en": "string"
    },
    "instructionsNeedsReview": ["de"]
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `renameCustomerChatAgent`

Rename a customer chat agent

`PATCH /v1/customer-chat/{agent_id}`

```ts
const { data } = await client.renameCustomerChatAgent(
  {
    agent_id: 'example',
    If-Match: 'example',
  },
  {
    internal_name: 'string',
    updated_at: '1970-01-01T00:00:00.000Z'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "place": "website",
  "internal_name": "string",
  "runtime_agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "config": {
    "capabilities": [
      {
        "type": "navigate_portal_pages",
        "instanceId": "string",
        "enabled": true,
        "meterTypes": ["string"],
        "ticketType": "string",
        "allowedDomains": ["string"],
        "autonomy": "draft",
        "label": "string",
        "guidance": "string",
        "blockIds": ["string"],
        "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "accessLevel": "anonymous",
        "intent": "submit_meter_reading",
        "journeyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "journeyName": "string",
        "url": "string",
        "searchDeviceDocs": true
      }
    ],
    "knowledgeSources": [
      {
        "id": "string",
        "type": "portal_page",
        "title": "string",
        "targetId": "string",
        "detail": "string"
      }
    ],
    "escalation": {
      "websiteHandover": {
        "kind": "phone",
        "value": "string",
        "journeyId": "string",
        "journeyName": "string"
      },
      "ticketPurpose": {
        "id": "string",
        "name": "string"
      }
    },
    "appearance": {
      "displayName": "string",
      "greeting": "string",
      "starters": ["string"],
      "starterKeys": ["string"],
      "launcherLabel": "string",
      "language": "de",
      "formOfAddress": "sie",
      "followUps": true,
      "languages": ["de"],
      "translations": {
        "de": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        },
        "en": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        }
      },
      "needsReview": {
        "de": ["displayName"],
        "en": ["displayName"]
      }
    },
    "instructions": "string",
    "instructionTranslations": {
      "de": "string",
      "en": "string"
    },
    "instructionsNeedsReview": ["de"]
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `deleteCustomerChatAgent`

Remove a customer chat agent and its runtime projection

`DELETE /v1/customer-chat/{agent_id}`

```ts
const { data } = await client.deleteCustomerChatAgent(
  {
    agent_id: 'example',
    If-Match: 'example',
  },
  {
    updated_at: '1970-01-01T00:00:00.000Z',
    portal_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
)
```

---

### `saveCustomerChatConfig`

Replace the AgentConfig and compile the runtime AgentRecord

`PUT /v1/customer-chat/{agent_id}/config`

```ts
const { data } = await client.saveCustomerChatConfig(
  {
    agent_id: 'example',
    If-Match: 'example',
  },
  {
    config: {
      capabilities: [
        {
          type: 'navigate_portal_pages',
          instanceId: 'string',
          enabled: true,
          meterTypes: ['string'],
          ticketType: 'string',
          allowedDomains: ['string'],
          autonomy: 'draft',
          label: 'string',
          guidance: 'string',
          blockIds: ['string'],
          integrationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          accessLevel: 'anonymous',
          intent: 'submit_meter_reading',
          journeyId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          journeyName: 'string',
          url: 'string',
          searchDeviceDocs: true
        }
      ],
      knowledgeSources: [
        {
          id: 'string',
          type: 'portal_page',
          title: 'string',
          targetId: 'string',
          detail: 'string'
        }
      ],
      escalation: {
        websiteHandover: {
          kind: 'phone',
          value: 'string',
          journeyId: 'string',
          journeyName: 'string'
        },
        ticketPurpose: {
          id: 'string',
          name: 'string'
        }
      },
      appearance: {
        displayName: 'string',
        greeting: 'string',
        starters: ['string'],
        starterKeys: ['string'],
        launcherLabel: 'string',
        language: 'de',
        formOfAddress: 'sie',
        followUps: true,
        languages: ['de'],
        translations: {
          de: {
            displayName: 'string',
            greeting: 'string',
            starters: ['string'],
            starterKeys: ['string'],
            launcherLabel: 'string'
          },
          en: {
            displayName: 'string',
            greeting: 'string',
            starters: ['string'],
            starterKeys: ['string'],
            launcherLabel: 'string'
          }
        },
        needsReview: {
          de: ['displayName'],
          en: ['displayName']
        }
      },
      instructions: 'string',
      instructionTranslations: {
        de: 'string',
        en: 'string'
      },
      instructionsNeedsReview: ['de']
    },
    updated_at: '1970-01-01T00:00:00.000Z'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "org_id": "string",
  "agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "place": "website",
  "internal_name": "string",
  "runtime_agent_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "config": {
    "capabilities": [
      {
        "type": "navigate_portal_pages",
        "instanceId": "string",
        "enabled": true,
        "meterTypes": ["string"],
        "ticketType": "string",
        "allowedDomains": ["string"],
        "autonomy": "draft",
        "label": "string",
        "guidance": "string",
        "blockIds": ["string"],
        "integrationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "accessLevel": "anonymous",
        "intent": "submit_meter_reading",
        "journeyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "journeyName": "string",
        "url": "string",
        "searchDeviceDocs": true
      }
    ],
    "knowledgeSources": [
      {
        "id": "string",
        "type": "portal_page",
        "title": "string",
        "targetId": "string",
        "detail": "string"
      }
    ],
    "escalation": {
      "websiteHandover": {
        "kind": "phone",
        "value": "string",
        "journeyId": "string",
        "journeyName": "string"
      },
      "ticketPurpose": {
        "id": "string",
        "name": "string"
      }
    },
    "appearance": {
      "displayName": "string",
      "greeting": "string",
      "starters": ["string"],
      "starterKeys": ["string"],
      "launcherLabel": "string",
      "language": "de",
      "formOfAddress": "sie",
      "followUps": true,
      "languages": ["de"],
      "translations": {
        "de": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        },
        "en": {
          "displayName": "string",
          "greeting": "string",
          "starters": ["string"],
          "starterKeys": ["string"],
          "launcherLabel": "string"
        }
      },
      "needsReview": {
        "de": ["displayName"],
        "en": ["displayName"]
      }
    },
    "instructions": "string",
    "instructionTranslations": {
      "de": "string",
      "en": "string"
    },
    "instructionsNeedsReview": ["de"]
  },
  "created_at": "1970-01-01T00:00:00.000Z",
  "updated_at": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `listCustomerChatConversations`

List a portal agent's conversations

`GET /v1/customer-chat/{agent_id}/conversations`

```ts
const { data } = await client.listCustomerChatConversations({
  agent_id: 'example',
  has_ticket: true,
  limit: 1,
  cursor: 'example',
  from: 'example',
  to: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "conversations": [
    {
      "conversation_id": "string",
      "user_id": "string",
      "contact_id": "string",
      "title": "string",
      "message_count": 0,
      "last_message": "string",
      "last_message_at": "1970-01-01T00:00:00.000Z",
      "created_at": "1970-01-01T00:00:00.000Z",
      "ticket_ids": ["string"]
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getCustomerChatConversation`

Get a portal agent conversation transcript

`GET /v1/customer-chat/{agent_id}/conversations/{conversation_id}`

```ts
const { data } = await client.getCustomerChatConversation({
  agent_id: 'example',
  conversation_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "conversation": {
    "conversation_id": "string",
    "user_id": "string",
    "contact_id": "string",
    "title": "string",
    "message_count": 0,
    "last_message": "string",
    "last_message_at": "1970-01-01T00:00:00.000Z",
    "created_at": "1970-01-01T00:00:00.000Z",
    "ticket_ids": ["string"]
  },
  "messages": [
    {
      "role": "user",
      "content": "string",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `executeAgent`

Execute an agent

`POST /v1/agents/{agent_id}/execute`

```ts
const { data } = await client.executeAgent(
  {
    agent_id: 'example',
  },
  {
    mode: 'auto',
    input: {
      message: 'string',
      entity_id: 'string',
      entity_schema: 'string',
      workflow_id: 'string',
      workflow_execution_id: 'string',
      task_id: 'string',
      custom_data: {},
      flow_context: [
        {
          entity_id: 'string',
          entity_schema: 'string'
        }
      ],
      attachment: {
        s3ref: {
          bucket: 'string',
          key: 'string'
        },
        mime_type: 'string',
        filename: 'string'
      },
      attachments: [
        {
          s3ref: {
            bucket: 'string',
            key: 'string'
          },
          mime_type: 'string',
          filename: 'string'
        }
      ]
    },
    parameters: {},
    execution_mode_override: 'automatic',
    execution_context: 'flows',
    callback_url: 'https://example.com/path',
    timeout_ms: 0
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {},
    "stop_reason": "string"
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    },
    "approval_note": "string"
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `executeAgentStream`

Execute an agent with streaming response

`POST /v1/agents/{agent_id}/execute/stream`

```ts
const { data } = await client.executeAgentStream(
  {
    agent_id: 'example',
  },
  {
    mode: 'auto',
    input: {
      message: 'string',
      entity_id: 'string',
      entity_schema: 'string',
      workflow_id: 'string',
      workflow_execution_id: 'string',
      task_id: 'string',
      custom_data: {},
      flow_context: [
        {
          entity_id: 'string',
          entity_schema: 'string'
        }
      ],
      attachment: {
        s3ref: {
          bucket: 'string',
          key: 'string'
        },
        mime_type: 'string',
        filename: 'string'
      },
      attachments: [
        {
          s3ref: {
            bucket: 'string',
            key: 'string'
          },
          mime_type: 'string',
          filename: 'string'
        }
      ]
    },
    parameters: {},
    execution_mode_override: 'automatic',
    execution_context: 'flows',
    callback_url: 'https://example.com/path',
    timeout_ms: 0,
    agent_override: {
      domain: 'customer_service',
      availability: ['flows'],
      name: 'string',
      description: 'string',
      category: 'message',
      icon: 'string',
      system_prompt: 'string',
      tools: ['string'],
      model_config: {
        model_id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
        temperature: 0.7,
        max_tokens: 4096,
        thinking: false,
        thinking_budget: 10000
      },
      max_iterations: 1,
      execution_pattern: 'direct',
      execution_mode: 'automatic',
      output_schema: {},
      input_parameters_schema: {
        type: 'object',
        parameters: [
          {
            name: 'target_schema',
            label: 'Target Schema',
            type: 'entity-schema',
            description: 'Entity type to create'
          },
          {
            name: 'confidence_threshold',
            label: 'Confidence Threshold',
            type: 'number',
            minimum: 0,
            maximum: 1,
            default: 0.8
          },
          /* ... 1 more */
        ],
        required: ['target_schema']
      },
      knowledge_source_ids: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
    }
  },
)
```

---

### `listExecutions`

List executions

`GET /v1/executions`

```ts
const { data } = await client.listExecutions({
  agent_id: 'example',
  status: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "executions": [
    {
      "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "agent_id": "skill:email-categorizer",
      "agent_source": "system",
      "agent_name": "string",
      "execution_context": "flows",
      "org_id": "string",
      "status": "pending",
      "input": {},
      "parameters": {},
      "result": {
        "response": "string",
        "structured_output": {},
        "stop_reason": "string"
      },
      "error": {
        "code": "TIMEOUT",
        "message": "string",
        "details": {}
      },
      "pending_action": {
        "tool": "string",
        "input": {},
        "description": "string",
        "preview": {
          "action": {
            "type": "move",
            "verb": "Move Thread"
          },
          "source": {
            "type": "inbox",
            "id": "string",
            "name": "Support Inbox",
            "schema": "string",
            "icon": "string",
            "url": "string"
          },
          "target": {
            "type": "inbox",
            "id": "string",
            "name": "Support Inbox",
            "schema": "string",
            "icon": "string",
            "url": "string"
          },
          "changes": [
            {
              "field": "string",
              "label": "string",
              "from": {
                "type": "text",
                "value": {},
                "values": ["string"],
                "id": "string",
                "name": "string",
                "schema": "string",
                "color": "success"
              },
              "to": {
                "type": "text",
                "value": {},
                "values": ["string"],
                "id": "string",
                "name": "string",
                "schema": "string",
                "color": "success"
              }
            }
          ],
          "metadata": {},
          "summary": "This email discusses solar panel installation and should be handled by the Service team."
        },
        "approval_note": "string"
      },
      "metrics": {
        "total_tokens": 0,
        "input_tokens": 0,
        "output_tokens": 0,
        "total_cost_usd": 0,
        "duration_ms": 0,
        "iteration_count": 0
      },
      "started_at": "1970-01-01T00:00:00.000Z",
      "completed_at": "1970-01-01T00:00:00.000Z",
      "iterations": [
        {
          "index": 0,
          "tool": "string",
          "status": "running",
          "timestamp": "1970-01-01T00:00:00.000Z"
        }
      ]
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getExecution`

Get execution by ID

`GET /v1/executions/{execution_id}`

```ts
const { data } = await client.getExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {},
    "stop_reason": "string"
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    },
    "approval_note": "string"
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `cancelExecution`

Cancel execution

`DELETE /v1/executions/{execution_id}`

```ts
const { data } = await client.cancelExecution({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {},
    "stop_reason": "string"
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    },
    "approval_note": "string"
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `getExecutionTrace`

Get execution trace/iterations

`GET /v1/executions/{execution_id}/trace`

```ts
const { data } = await client.getExecutionTrace({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "iterations": [
    {
      "iteration_index": 0,
      "thought": "string",
      "action": {
        "tool": "string",
        "input": {}
      },
      "observation": {},
      "timestamp": "1970-01-01T00:00:00.000Z",
      "tokens_used": 0,
      "latency_ms": 0
    }
  ],
  "total_iterations": 0
}
```

</details>

---

### `getExecutionScreenshots`

Get execution screenshots

`GET /v1/executions/{execution_id}/screenshots`

```ts
const { data } = await client.getExecutionScreenshots({
  execution_id: 'example',
  after: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "string",
  "screenshots": [
    {
      "index": 0,
      "label": "string",
      "kind": "page",
      "box": {
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0
      },
      "page_url": "string",
      "tool": "string",
      "taken_at": "1970-01-01T00:00:00.000Z",
      "data_url": "string"
    }
  ]
}
```

</details>

---

### `getExecutionFeedback`

Get execution feedback

`GET /v1/executions/{execution_id}/feedback`

```ts
const { data } = await client.getExecutionFeedback({
  execution_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "feedback": {
    "rating": "up",
    "comment": "string",
    "user_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  }
}
```

</details>

---

### `putExecutionFeedback`

Submit execution feedback

`PUT /v1/executions/{execution_id}/feedback`

```ts
const { data } = await client.putExecutionFeedback(
  {
    execution_id: 'example',
  },
  {
    rating: 'up',
    comment: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "feedback": {
    "rating": "up",
    "comment": "string",
    "user_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  }
}
```

</details>

---

### `approveExecution`

Approve pending action

`POST /v1/executions/{execution_id}/approve`

```ts
const { data } = await client.approveExecution(
  {
    execution_id: 'example',
  },
  {
    reason: 'string',
    approved_action_ids: ['string'],
    rejected_action_ids: ['string']
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {},
    "stop_reason": "string"
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    },
    "approval_note": "string"
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `rejectExecution`

Reject pending action

`POST /v1/executions/{execution_id}/reject`

```ts
const { data } = await client.rejectExecution(
  {
    execution_id: 'example',
  },
  {
    reason: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "execution_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "agent_id": "skill:email-categorizer",
  "agent_source": "system",
  "agent_name": "string",
  "execution_context": "flows",
  "org_id": "string",
  "status": "pending",
  "input": {},
  "parameters": {},
  "result": {
    "response": "string",
    "structured_output": {},
    "stop_reason": "string"
  },
  "error": {
    "code": "TIMEOUT",
    "message": "string",
    "details": {}
  },
  "pending_action": {
    "tool": "string",
    "input": {},
    "description": "string",
    "preview": {
      "action": {
        "type": "move",
        "verb": "Move Thread"
      },
      "source": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "target": {
        "type": "inbox",
        "id": "string",
        "name": "Support Inbox",
        "schema": "string",
        "icon": "string",
        "url": "string"
      },
      "changes": [
        {
          "field": "string",
          "label": "string",
          "from": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          },
          "to": {
            "type": "text",
            "value": {},
            "values": ["string"],
            "id": "string",
            "name": "string",
            "schema": "string",
            "color": "success"
          }
        }
      ],
      "metadata": {},
      "summary": "This email discusses solar panel installation and should be handled by the Service team."
    },
    "approval_note": "string"
  },
  "metrics": {
    "total_tokens": 0,
    "input_tokens": 0,
    "output_tokens": 0,
    "total_cost_usd": 0,
    "duration_ms": 0,
    "iteration_count": 0
  },
  "started_at": "1970-01-01T00:00:00.000Z",
  "completed_at": "1970-01-01T00:00:00.000Z",
  "iterations": [
    {
      "index": 0,
      "tool": "string",
      "status": "running",
      "timestamp": "1970-01-01T00:00:00.000Z"
    }
  ]
}
```

</details>

---

### `streamExecution`

Reconnect to execution stream

`GET /v1/executions/{execution_id}/stream`

```ts
const { data } = await client.streamExecution({
  execution_id: 'example',
  from_sequence: 1,
})
```

---

### `chat`

Streaming chat with AI agent

`POST /v1/chat`

```ts
const { data } = await client.chat(
  null,
  {
    agentId: 'string',
    message: 'string',
    tool_approval: {
      token: 'string',
      approved: true,
      reason: 'string'
    },
    conversationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    clientHistory: [
      {
        role: 'user',
        content: 'string',
        tool_calls: [
          {
            id: 'string',
            name: 'string',
            input: {},
            output: 'string'
          }
        ]
      }
    ],
    context: {
      entityId: 'string',
      customData: {}
    },
    streaming: {
      mode: 'updates',
      streamTokens: false,
      includeMetadata: false
    },
    preview_demo: true,
    agent_override: {
      domain: 'customer_service',
      availability: ['flows'],
      name: 'string',
      description: 'string',
      category: 'message',
      icon: 'string',
      system_prompt: 'string',
      tools: ['string'],
      model_config: {
        model_id: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
        temperature: 0.7,
        max_tokens: 4096,
        thinking: false,
        thinking_budget: 10000
      },
      max_iterations: 1,
      execution_pattern: 'direct',
      execution_mode: 'automatic',
      output_schema: {},
      input_parameters_schema: {
        type: 'object',
        parameters: [
          {
            name: 'target_schema',
            label: 'Target Schema',
            type: 'entity-schema',
            description: 'Entity type to create'
          },
          {
            name: 'confidence_threshold',
            label: 'Confidence Threshold',
            type: 'number',
            minimum: 0,
            maximum: 1,
            default: 0.8
          },
          /* ... 1 more */
        ],
        required: ['target_schema']
      },
      knowledge_source_ids: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
    },
    portal_config_override: {}
  },
)
```

---

### `listConversations`

List conversations

`GET /v1/conversations`

```ts
const { data } = await client.listConversations({
  agent_id: 'example',
  limit: 1,
  cursor: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "conversations": [
    {
      "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "user_id": "string",
      "agent_id": "string",
      "title": "string",
      "message_count": 0,
      "last_message": "string",
      "last_message_at": "1970-01-01T00:00:00.000Z",
      "context": {
        "entityId": "string",
        "customData": {}
      },
      "created_at": "1970-01-01T00:00:00.000Z",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "next_cursor": "string"
}
```

</details>

---

### `getConversation`

Get conversation with messages

`GET /v1/conversations/{conversation_id}`

```ts
const { data } = await client.getConversation({
  conversation_id: 'example',
  message_limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "conversation": {
    "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "user_id": "string",
    "agent_id": "string",
    "title": "string",
    "message_count": 0,
    "last_message": "string",
    "last_message_at": "1970-01-01T00:00:00.000Z",
    "context": {
      "entityId": "string",
      "customData": {}
    },
    "created_at": "1970-01-01T00:00:00.000Z",
    "updated_at": "1970-01-01T00:00:00.000Z"
  },
  "messages": [
    {
      "conversation_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "role": "user",
      "content": "string",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "tool_calls": [
        {
          "id": "string",
          "name": "string",
          "input": {},
          "output": "string"
        }
      ],
      "token_count": 0,
      "trace_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "feedback": {
        "rating": "up",
        "comment": "string",
        "user_id": "string",
        "submitted_at": "1970-01-01T00:00:00.000Z"
      }
    }
  ]
}
```

</details>

---

### `deleteConversation`

Delete conversation

`DELETE /v1/conversations/{conversation_id}`

```ts
const { data } = await client.deleteConversation({
  conversation_id: 'example',
})
```

---

### `submitConversationFeedback`

Submit feedback for an assistant turn

`POST /v1/conversations/{conversation_id}/feedback`

```ts
const { data } = await client.submitConversationFeedback(
  {
    conversation_id: 'example',
  },
  {
    trace_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    rating: 'up',
    comment: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "feedback": {
    "rating": "up",
    "comment": "string",
    "user_id": "string",
    "submitted_at": "1970-01-01T00:00:00.000Z"
  }
}
```

</details>

---

### `createPortalSession`

Start a portal chat

`POST /v2/portal/sessions`

```ts
const { data } = await client.createPortalSession(
  {
    domain: 'example',
  },
  {
    requestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    input: {
      text: 'string',
      context: {}
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "agentId": "string",
    "mode": "read",
    "title": "string",
    "origin": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "status": "idle",
    "live": {
      "transport": "appsync",
      "httpHost": "string",
      "realtimeUrl": "string",
      "channel": "string"
    }
  },
  "events": [
    {
      "seq": 0,
      "eventId": "string",
      "occurredAt": "1970-01-01T00:00:00.000Z",
      "blocked": true,
      "inputEventId": "string",
      "type": "input",
      "input": {
        "kind": "message",
        "text": "string",
        "files": [
          {
            "fileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "name": "string",
            "mediaType": "string",
            "size": 0
          }
        ]
      }
    }
  ],
  "inputEventId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `listPortalSessions`

List the portal user's chats

`GET /v2/portal/sessions`

```ts
const { data } = await client.listPortalSessions({
  domain: 'example',
  limit: 1,
  before: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "sessions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "agentId": "string",
      "mode": "read",
      "title": "string",
      "origin": "string",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z",
      "status": "idle",
      "live": {
        "transport": "appsync",
        "httpHost": "string",
        "realtimeUrl": "string",
        "channel": "string"
      }
    }
  ]
}
```

</details>

---

### `getPortalSession`

Get a portal chat

`GET /v2/portal/sessions/{sessionId}`

```ts
const { data } = await client.getPortalSession({
  domain: 'example',
  sessionId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "agentId": "string",
    "mode": "read",
    "title": "string",
    "origin": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "status": "idle",
    "live": {
      "transport": "appsync",
      "httpHost": "string",
      "realtimeUrl": "string",
      "channel": "string"
    }
  }
}
```

</details>

---

### `deletePortalSession`

Delete a portal chat

`DELETE /v2/portal/sessions/{sessionId}`

```ts
const { data } = await client.deletePortalSession({
  domain: 'example',
  sessionId: 'example',
})
```

---

### `listPortalSessionEvents`

List a portal chat's events

`GET /v2/portal/sessions/{sessionId}/events`

```ts
const { data } = await client.listPortalSessionEvents({
  domain: 'example',
  sessionId: 'example',
  after: 1,
  limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "events": [
    {
      "seq": 0,
      "eventId": "string",
      "occurredAt": "1970-01-01T00:00:00.000Z",
      "blocked": true,
      "inputEventId": "string",
      "type": "input",
      "input": {
        "kind": "message",
        "text": "string",
        "files": [
          {
            "fileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "name": "string",
            "mediaType": "string",
            "size": 0
          }
        ]
      }
    }
  ],
  "lastSeq": 0,
  "hasMore": true,
  "status": "idle"
}
```

</details>

---

### `sendPortalSessionEvent`

Send to a portal chat

`POST /v2/portal/sessions/{sessionId}/events`

```ts
const { data } = await client.sendPortalSessionEvent(
  {
    domain: 'example',
    sessionId: 'example',
  },
  {
    text: '',
    context: {},
    files: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    type: 'user.message',
    requestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
)
```

---

### `getPortalChatConfig`

The portal's chat

`GET /v2/portal/config`

```ts
const { data } = await client.getPortalChatConfig({
  domain: 'example',
  locale: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "agent": {
    "name": "string",
    "greeting": "string",
    "conversation_starters": ["string"],
    "language": "string",
    "formality": "string"
  }
}
```

</details>

---

### `createSessionUpload`

Upload a file for a session

`POST /v2/sessions/uploads`

```ts
const { data } = await client.createSessionUpload(
  null,
  {
    name: 'string',
    mediaType: 'image/png',
    size: 1
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "file": {
    "fileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "mediaType": "string",
    "size": 0
  },
  "upload": {
    "method": "PUT",
    "url": "string",
    "headers": {}
  }
}
```

</details>

---

### `createSession`

Start a session

`POST /v2/sessions`

```ts
const { data } = await client.createSession(
  null,
  {
    agentId: 'string',
    requestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    origin: 'configuration-hub',
    input: {
      text: '',
      context: {},
      files: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
    },
    prepare: true
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "agentId": "string",
    "mode": "read",
    "title": "string",
    "origin": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "status": "idle",
    "live": {
      "transport": "appsync",
      "httpHost": "string",
      "realtimeUrl": "string",
      "channel": "string"
    }
  },
  "events": [
    {
      "seq": 0,
      "eventId": "string",
      "occurredAt": "1970-01-01T00:00:00.000Z",
      "blocked": true,
      "inputEventId": "string",
      "type": "input",
      "input": {
        "kind": "message",
        "text": "string",
        "files": [
          {
            "fileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "name": "string",
            "mediaType": "string",
            "size": 0
          }
        ]
      }
    }
  ],
  "inputEventId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `listSessions`

List the caller's sessions

`GET /v2/sessions`

```ts
const { data } = await client.listSessions({
  agentId: 'example',
  origin: 'example',
  limit: 1,
  before: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "sessions": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "agentId": "string",
      "mode": "read",
      "title": "string",
      "origin": "string",
      "createdAt": "1970-01-01T00:00:00.000Z",
      "updatedAt": "1970-01-01T00:00:00.000Z",
      "status": "idle",
      "live": {
        "transport": "appsync",
        "httpHost": "string",
        "realtimeUrl": "string",
        "channel": "string"
      }
    }
  ]
}
```

</details>

---

### `getSession`

Get a session

`GET /v2/sessions/{sessionId}`

```ts
const { data } = await client.getSession({
  sessionId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "agentId": "string",
    "mode": "read",
    "title": "string",
    "origin": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "status": "idle",
    "live": {
      "transport": "appsync",
      "httpHost": "string",
      "realtimeUrl": "string",
      "channel": "string"
    }
  }
}
```

</details>

---

### `renameSession`

Rename a session

`PATCH /v2/sessions/{sessionId}`

```ts
const { data } = await client.renameSession(
  {
    sessionId: 'example',
  },
  {
    title: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "agentId": "string",
    "mode": "read",
    "title": "string",
    "origin": "string",
    "createdAt": "1970-01-01T00:00:00.000Z",
    "updatedAt": "1970-01-01T00:00:00.000Z",
    "status": "idle",
    "live": {
      "transport": "appsync",
      "httpHost": "string",
      "realtimeUrl": "string",
      "channel": "string"
    }
  }
}
```

</details>

---

### `deleteSession`

Delete a session

`DELETE /v2/sessions/{sessionId}`

```ts
const { data } = await client.deleteSession({
  sessionId: 'example',
})
```

---

### `listSessionEvents`

List a session's events

`GET /v2/sessions/{sessionId}/events`

```ts
const { data } = await client.listSessionEvents({
  sessionId: 'example',
  after: 1,
  limit: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "events": [
    {
      "seq": 0,
      "eventId": "string",
      "occurredAt": "1970-01-01T00:00:00.000Z",
      "blocked": true,
      "inputEventId": "string",
      "type": "input",
      "input": {
        "kind": "message",
        "text": "string",
        "files": [
          {
            "fileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "name": "string",
            "mediaType": "string",
            "size": 0
          }
        ]
      }
    }
  ],
  "lastSeq": 0,
  "hasMore": true,
  "status": "idle"
}
```

</details>

---

### `sendSessionEvent`

Send to a session

`POST /v2/sessions/{sessionId}/events`

```ts
const { data } = await client.sendSessionEvent(
  {
    sessionId: 'example',
  },
  {
    text: '',
    context: {},
    files: ['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
    type: 'user.message',
    requestId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
)
```

---

### `getSessionFileUrl`

Get a link to a session file

`GET /v2/sessions/{sessionId}/files/{fileId}`

```ts
const { data } = await client.getSessionFileUrl({
  sessionId: 'example',
  fileId: 'example',
  download: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "url": "string",
  "expiresAt": "1970-01-01T00:00:00.000Z"
}
```

</details>

---

### `runScript`

Run a script

`POST /v2/sessions/scripts`

```ts
const { data } = await client.runScript(
  null,
  {
    language: 'javascript',
    script: 'string',
    description: 'string',
    waitMs: 0
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "runId": "string",
  "status": "running",
  "output": "string",
  "changes": 0
}
```

</details>

---

### `getScriptRun`

Get a script run

`GET /v2/sessions/scripts/{runId}`

```ts
const { data } = await client.getScriptRun({
  runId: 'example',
  waitMs: 1,
})
```

<details>
<summary>Response</summary>

```json
{
  "runId": "string",
  "status": "running",
  "output": "string",
  "changes": 0
}
```

</details>

---

### `applyScriptRun`

Apply a script run's changes

`POST /v2/sessions/scripts/{runId}/apply`

```ts
const { data } = await client.applyScriptRun(
  {
    runId: 'example',
  },
  {
    approvalSummary: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "done": true,
  "applied": 0,
  "total": 0,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "string"
      }
    ],
    "isError": true
  }
}
```

</details>

---

### `revokeSessionAgents`

Revoke the caller's session agents

`POST /v2/agents/revoke`

```ts
const { data } = await client.revokeSessionAgents()
```

---

### `createInternalSession`

Start an unattended session (services only)

`POST /v2/internal/sessions`

```ts
const { data } = await client.createInternalSession(
  null,
  {
    agentId: 'string',
    origin: 'configuration-hub',
    owner: {
      user_id: 'string'
    },
    unattended: true,
    client_token: 'string',
    input: {
      text: 'string',
      context: {
        intent: 'blueprint-tests.suggest'
      }
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "unattended_access": true
}
```

</details>

---

### `getInternalSession`

What an unattended session is doing (services only)

`GET /v2/internal/sessions/{sessionId}`

```ts
const { data } = await client.getInternalSession({
  sessionId: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "state": "working",
  "needs": "first_message",
  "attended": true,
  "last_activity_at": "1970-01-01T00:00:00.000Z",
  "turns": 0
}
```

</details>

---

### `createInternalExecution`

Start a Flows execution as a background run (services only)

`POST /v2/internal/executions`

```ts
const { data } = await client.createInternalExecution(
  null,
  {
    execution_id: 'string',
    agent_id: 'string',
    input: {
      text: 'string',
      context: {}
    },
    mode: 'automatic',
    skill: {
      instructions: 'string',
      tools: ['string'],
      output_schema: {}
    },
    parameters: {},
    flows: {
      workflow_id: 'string',
      workflow_name: 'string',
      workflow_execution_id: 'string',
      task_id: 'string'
    }
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "session_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

</details>

---

### `decideInternalExecution`

Decide what a Flows run on v2 waits for (services only)

`POST /v2/internal/executions/{executionId}/decision`

```ts
const { data } = await client.decideInternalExecution(
  {
    executionId: 'example',
  },
  {
    approval_id: 'string',
    approved: true,
    reason: 'string',
    decided_by: 'string'
  },
)
```

<details>
<summary>Response</summary>

```json
{
  "approval": {
    "id": "string",
    "status": "string"
  }
}
```

</details>

---

### `listInternalPortalChats`

An agent's portal chats on v2, for Agent Builder's history (services only)

`GET /v2/internal/portal-chats`

```ts
const { data } = await client.listInternalPortalChats({
  agent_id: 'example',
  limit: 1,
  after_updated_at: 'example',
  after_id: 'example',
  from: 'example',
  to: 'example',
  has_ticket: true,
  ids: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "conversations": [
    {
      "conversation_id": "string",
      "updated_at": "1970-01-01T00:00:00.000Z"
    }
  ],
  "has_more": true,
  "read_to": {
    "conversation_id": "string",
    "updated_at": "1970-01-01T00:00:00.000Z"
  }
}
```

</details>

---

### `getInternalPortalChat`

One portal chat on v2 with its transcript, for Agent Builder's history (services only)

`GET /v2/internal/portal-chats/{sessionId}`

```ts
const { data } = await client.getInternalPortalChat({
  sessionId: 'example',
  agent_id: 'example',
})
```

<details>
<summary>Response</summary>

```json
{
  "conversation": {
    "conversation_id": "string",
    "user_id": "string",
    "contact_id": "string",
    "title": "string",
    "message_count": 0,
    "last_message": "string",
    "last_message_at": "1970-01-01T00:00:00.000Z",
    "created_at": "1970-01-01T00:00:00.000Z",
    "ticket_ids": ["string"]
  },
  "messages": [
    {
      "role": "user",
      "content": "string",
      "timestamp": "1970-01-01T00:00:00.000Z",
      "blocked": true
    }
  ]
}
```

</details>

---

## Schemas

### `AgentConfig`

```ts
type AgentConfig = {
  capabilities: Array<{
    type: "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy" | "open_journey" | "open_link" | "submit_meter_reading"
    instanceId?: string
    enabled: boolean
    meterTypes?: string[]
    ticketType?: string
    allowedDomains?: string[]
    autonomy?: "draft" | "approval" | "automatic"
    label?: string
    guidance?: string
    blockIds?: string[]
    integrationId?: string // uuid
    accessLevel?: "anonymous" | "authenticated"
    intent?: "submit_meter_reading"
    journeyId?: string // uuid
    journeyName?: string
    url?: string
    searchDeviceDocs?: boolean
  }>
  knowledgeSources: Array<{
    id: string
    type: "portal_page" | "document" | "catalogue" | "url"
    title: string
    targetId: string
    detail?: string
  }>
  escalation: {
    websiteHandover: {
      kind: { ... }
      value: { ... }
      journeyId?: { ... }
      journeyName?: { ... }
    }
    ticketPurpose?: {
      id: { ... }
      name?: { ... }
    }
  }
  appearance: {
    displayName: string
    greeting: string
    starters: string[]
    starterKeys?: string[]
    launcherLabel?: string
    language: "de" | "en"
    formOfAddress: "sie" | "du"
    followUps?: boolean
    languages?: "de" | "en"[]
    translations?: {
      de?: { ... }
      en?: { ... }
    }
    needsReview?: {
      de?: { ... }
      en?: { ... }
    }
  }
  instructions?: string
  instructionTranslations?: {
    de?: string
    en?: string
  }
  instructionsNeedsReview?: "de" | "en"[]
}
```

### `AppearanceConfig`

```ts
type AppearanceConfig = {
  displayName: string
  greeting: string
  starters: string[]
  starterKeys?: string[]
  launcherLabel?: string
  language: "de" | "en"
  formOfAddress: "sie" | "du"
  followUps?: boolean
  languages?: "de" | "en"[]
  translations?: {
    de?: {
      displayName: { ... }
      greeting: { ... }
      starters: { ... }
      starterKeys?: { ... }
      launcherLabel?: { ... }
    }
    en?: {
      displayName: { ... }
      greeting: { ... }
      starters: { ... }
      starterKeys?: { ... }
      launcherLabel?: { ... }
    }
  }
  needsReview?: {
    de?: "displayName" | "greeting" | "starters" | "launcherLabel"[]
    en?: "displayName" | "greeting" | "starters" | "launcherLabel"[]
  }
}
```

### `LocalizedAppearance`

```ts
type LocalizedAppearance = {
  displayName: string
  greeting: string
  starters: string[]
  starterKeys?: string[]
  launcherLabel?: string
}
```

### `LocalizedFieldList`

```ts
type LocalizedFieldList = "displayName" | "greeting" | "starters" | "launcherLabel"[]
```

### `CapabilityId`

```ts
type CapabilityId = "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy" | "open_journey" | "open_link" | "submit_meter_reading"
```

### `AccessLevel`

Who may use a capability. `anonymous` = every visitor, `authenticated` =
only a customer authenticated by email code or portal login; others are
asked to sign in first. Each capability type has a default and a
minimum; values below the minimum are raised. Used today by
`open_journey`, `open_link` an

```ts
type AccessLevel = "anonymous" | "authenticated"
```

### `SelfServiceIntent`

What a journey, link or in-chat capability is for; names the action in the chat and in analytics.

```ts
type SelfServiceIntent = "submit_meter_reading"
```

### `ActionAutonomy`

Action capabilities only (`open_quick_actions`): per-capability autonomy.
`draft` = suggest only (proposal + deep link, nothing opens),
`approval` = the customer confirms in a card first,
`automatic` = run immediately. Defaults to `approval` when the
capability is enabled without one; unknown values

```ts
type ActionAutonomy = "draft" | "approval" | "automatic"
```

### `CapabilityState`

```ts
type CapabilityState = {
  enabled: boolean
  meterTypes?: string[]
  ticketType?: string
  allowedDomains?: string[]
  autonomy?: "draft" | "approval" | "automatic"
  label?: string
  guidance?: string
  blockIds?: string[]
  integrationId?: string // uuid
  accessLevel?: "anonymous" | "authenticated"
  intent?: "submit_meter_reading"
  journeyId?: string // uuid
  journeyName?: string
  url?: string
  searchDeviceDocs?: boolean
}
```

### `CapabilityInstance`

```ts
type CapabilityInstance = {
  type: "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy" | "open_journey" | "open_link" | "submit_meter_reading"
  instanceId?: string
  enabled: boolean
  meterTypes?: string[]
  ticketType?: string
  allowedDomains?: string[]
  autonomy?: "draft" | "approval" | "automatic"
  label?: string
  guidance?: string
  blockIds?: string[]
  integrationId?: string // uuid
  accessLevel?: "anonymous" | "authenticated"
  intent?: "submit_meter_reading"
  journeyId?: string // uuid
  journeyName?: string
  url?: string
  searchDeviceDocs?: boolean
}
```

### `CreateCustomerChatAgentRequest`

```ts
type CreateCustomerChatAgentRequest = {
  place: "website" | "portal"
  internal_name?: string
}
```

### `CustomerChatAgent`

```ts
type CustomerChatAgent = {
  org_id: string
  agent_id: string // uuid
  place: "website" | "portal"
  internal_name: string
  runtime_agent_id: string // uuid
  config: {
    capabilities: Array<{
      type: { ... }
      instanceId?: { ... }
      enabled: { ... }
      meterTypes?: { ... }
      ticketType?: { ... }
      allowedDomains?: { ... }
      autonomy?: { ... }
      label?: { ... }
      guidance?: { ... }
      blockIds?: { ... }
      integrationId?: { ... }
      accessLevel?: { ... }
      intent?: { ... }
      journeyId?: { ... }
      journeyName?: { ... }
      url?: { ... }
      searchDeviceDocs?: { ... }
    }>
    knowledgeSources: Array<{
      id: { ... }
      type: { ... }
      title: { ... }
      targetId: { ... }
      detail?: { ... }
    }>
    escalation: {
      websiteHandover: { ... }
      ticketPurpose?: { ... }
    }
    appearance: {
      displayName: { ... }
      greeting: { ... }
      starters: { ... }
      starterKeys?: { ... }
      launcherLabel?: { ... }
      language: { ... }
      formOfAddress: { ... }
      followUps?: { ... }
      languages?: { ... }
      translations?: { ... }
      needsReview?: { ... }
    }
    instructions?: string
    instructionTranslations?: {
      de?: { ... }
      en?: { ... }
    }
    instructionsNeedsReview?: "de" | "en"[]
  }
  created_at: string // date-time
  updated_at: string // date-time
}
```

### `CustomerChatCasRequest`

```ts
type CustomerChatCasRequest = {
  updated_at?: string // date-time
}
```

### `DeleteCustomerChatAgentRequest`

```ts
type DeleteCustomerChatAgentRequest = {
  updated_at?: string // date-time
  portal_id?: string // uuid
}
```

### `CustomerChatPlace`

```ts
type CustomerChatPlace = "website" | "portal"
```

### `EscalationConfig`

```ts
type EscalationConfig = {
  websiteHandover: {
    kind: "phone" | "email" | "journey" | "ticket" | "unset"
    value: string
    journeyId?: string
    journeyName?: string
  }
  ticketPurpose?: {
    id: string
    name?: string
  }
}
```

### `TicketPurpose`

Portal places only: purpose set on tickets the portal chat creates when
it hands over to the service team. Omit (or send `null`) for a plain ticket.


```ts
type TicketPurpose = {
  id: string
  name?: string
}
```

### `CustomerChatKnowledgeSource`

```ts
type CustomerChatKnowledgeSource = {
  id: string
  type: "portal_page" | "document" | "catalogue" | "url"
  title: string
  targetId: string
  detail?: string
}
```

### `CustomerChatKnowledgeSourceType`

```ts
type CustomerChatKnowledgeSourceType = "portal_page" | "document" | "catalogue" | "url"
```

### `ListCustomerChatResponse`

```ts
type ListCustomerChatResponse = {
  agents: Array<{
    org_id: string
    agent_id: string // uuid
    place: "website" | "portal"
    internal_name: string
    runtime_agent_id: string // uuid
    config: {
      capabilities: { ... }
      knowledgeSources: { ... }
      escalation: { ... }
      appearance: { ... }
      instructions?: { ... }
      instructionTranslations?: { ... }
      instructionsNeedsReview?: { ... }
    }
    created_at: string // date-time
    updated_at: string // date-time
  }>
}
```

### `CustomerChatCapabilityCatalogEntry`

```ts
type CustomerChatCapabilityCatalogEntry = {
  id: "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy" | "open_journey" | "open_link" | "submit_meter_reading"
  places: "website" | "portal"[]
  singleInstance?: boolean
  requiresIntegration?: boolean
}
```

### `ListCustomerChatCapabilitiesResponse`

```ts
type ListCustomerChatCapabilitiesResponse = {
  capabilities: Array<{
    id: "navigate_portal_pages" | "search_portal_records" | "view_billing" | "view_meter_readings" | "view_contracts" | "search_web" | "open_quick_actions" | "view_hems_energy" | "open_journey" | "open_link" | "submit_meter_reading"
    places: "website" | "portal"[]
    singleInstance?: boolean
    requiresIntegration?: boolean
  }>
}
```

### `RenameCustomerChatAgentRequest`

```ts
type RenameCustomerChatAgentRequest = {
  internal_name: string
  updated_at?: string // date-time
}
```

### `SaveCustomerChatConfigRequest`

```ts
type SaveCustomerChatConfigRequest = {
  config: {
    capabilities: Array<{
      type: { ... }
      instanceId?: { ... }
      enabled: { ... }
      meterTypes?: { ... }
      ticketType?: { ... }
      allowedDomains?: { ... }
      autonomy?: { ... }
      label?: { ... }
      guidance?: { ... }
      blockIds?: { ... }
      integrationId?: { ... }
      accessLevel?: { ... }
      intent?: { ... }
      journeyId?: { ... }
      journeyName?: { ... }
      url?: { ... }
      searchDeviceDocs?: { ... }
    }>
    knowledgeSources: Array<{
      id: { ... }
      type: { ... }
      title: { ... }
      targetId: { ... }
      detail?: { ... }
    }>
    escalation: {
      websiteHandover: { ... }
      ticketPurpose?: { ... }
    }
    appearance: {
      displayName: { ... }
      greeting: { ... }
      starters: { ... }
      starterKeys?: { ... }
      launcherLabel?: { ... }
      language: { ... }
      formOfAddress: { ... }
      followUps?: { ... }
      languages?: { ... }
      translations?: { ... }
      needsReview?: { ... }
    }
    instructions?: string
    instructionTranslations?: {
      de?: { ... }
      en?: { ... }
    }
    instructionsNeedsReview?: "de" | "en"[]
  }
  updated_at?: string // date-time
}
```

### `WebsiteHandover`

```ts
type WebsiteHandover = {
  kind: "phone" | "email" | "journey" | "ticket" | "unset"
  value: string
  journeyId?: string
  journeyName?: string
}
```

### `AgentId`

Agent identifier. Can be either:
- System skill ID (prefixed): "skill:email-categorizer", "skill:email-labeler"
- Custom agent UUID: "0336a235-9417-4dd8-894c-fe81285bba75"


```ts
type AgentId = string
```

### `KnowledgeSourceIds`

Knowledge source IDs available to this agent. An empty array clears the selection.

```ts
type KnowledgeSourceIds = string // uuid[]
```

### `AgentDomain`

Business domain selected in the agent builder.

```ts
type AgentDomain = "customer_service" | "sales" | "billing" | "metering_grid" | "other"
```

### `CreateAgentRequest`

```ts
type CreateAgentRequest = {
  domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
  availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
  name: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  system_prompt: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
  knowledge_source_ids?: string // uuid[]
}
```

### `UpdateAgentRequest`

```ts
type UpdateAgentRequest = {
  domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
  availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
  name?: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  system_prompt?: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern?: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
  knowledge_source_ids?: string // uuid[]
}
```

### `AgentDefinition`

```ts
type AgentDefinition = {
  domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
  agent_id?: string
  org_id?: string
  name?: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  source?: "system" | "custom"
  availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
  allowed_entity_schemas?: string[]
  system_prompt?: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern?: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
  knowledge_source_ids?: string // uuid[]
  version?: number
  created_at?: string // date-time
  updated_at?: string // date-time
  created_by?: string
}
```

### `ListAgentsResponse`

```ts
type ListAgentsResponse = {
  agents?: Array<{
    domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
    agent_id?: string
    org_id?: string
    name?: string
    description?: string
    category?: "message" | "entity" | "document" | "classification" | "custom"
    icon?: string
    source?: "system" | "custom"
    availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
    allowed_entity_schemas?: string[]
    system_prompt?: string
    tools?: string[]
    model_config?: {
      model_id?: { ... }
      temperature?: { ... }
      max_tokens?: { ... }
      thinking?: { ... }
      thinking_budget?: { ... }
    }
    max_iterations?: number
    execution_pattern?: "direct" | "react"
    execution_mode?: "automatic" | "approval" | "draft"
    output_schema?: object
    input_parameters_schema?: {
      type: { ... }
      parameters: { ... }
      required?: { ... }
    }
    knowledge_source_ids?: string // uuid[]
    version?: number
    created_at?: string // date-time
    updated_at?: string // date-time
    created_by?: string
  }>
  next_cursor?: string
}
```

### `ListExecutionsResponse`

```ts
type ListExecutionsResponse = {
  executions?: Array<{
    execution_id?: string // uuid
    agent_id?: string
    agent_source?: "system" | "custom"
    agent_name?: string
    execution_context?: "flows" | "copilot" | "api" | "sharing"
    org_id?: string
    status?: "pending" | "queued" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled"
    input?: object
    parameters?: object
    result?: {
      response?: { ... }
      structured_output?: { ... }
      stop_reason?: { ... }
    }
    error?: {
      code?: { ... }
      message?: { ... }
      details?: { ... }
    }
    pending_action?: {
      tool?: { ... }
      input?: { ... }
      description?: { ... }
      preview?: { ... }
      approval_note?: { ... }
    }
    metrics?: {
      total_tokens?: { ... }
      input_tokens?: { ... }
      output_tokens?: { ... }
      total_cost_usd?: { ... }
      duration_ms?: { ... }
      iteration_count?: { ... }
    }
    started_at?: string // date-time
    completed_at?: string // date-time
    iterations?: Array<{
      index?: { ... }
      tool?: { ... }
      status?: { ... }
      timestamp?: { ... }
    }>
  }>
  next_cursor?: string
}
```

### `ApproveExecutionRequest`

```ts
type ApproveExecutionRequest = {
  reason?: string
  approved_action_ids?: string[]
  rejected_action_ids?: string[]
}
```

### `RejectExecutionRequest`

```ts
type RejectExecutionRequest = {
  reason: string
}
```

### `ExecuteAgentRequest`

```ts
type ExecuteAgentRequest = {
  mode?: "auto" | "stream" | "async" | "sync"
  input?: {
    message?: string
    entity_id?: string
    entity_schema?: string
    workflow_id?: string
    workflow_execution_id?: string
    task_id?: string
    custom_data?: Record<string, unknown>
    flow_context?: Array<{
      entity_id: { ... }
      entity_schema: { ... }
    }>
    attachment?: {
      s3ref: { ... }
      mime_type: { ... }
      filename?: { ... }
    }
    attachments?: Array<{
      s3ref: { ... }
      mime_type: { ... }
      filename?: { ... }
    }>
  }
  parameters?: Record<string, unknown>
  execution_mode_override?: "automatic" | "approval" | "draft"
  execution_context?: "flows" | "copilot" | "api" | "sharing"
  callback_url?: string // uri
  timeout_ms?: number
}
```

### `ExecuteAgentStreamRequest`

```ts
type ExecuteAgentStreamRequest = {
  mode?: "auto" | "stream" | "async" | "sync"
  input?: {
    message?: string
    entity_id?: string
    entity_schema?: string
    workflow_id?: string
    workflow_execution_id?: string
    task_id?: string
    custom_data?: Record<string, unknown>
    flow_context?: Array<{
      entity_id: { ... }
      entity_schema: { ... }
    }>
    attachment?: {
      s3ref: { ... }
      mime_type: { ... }
      filename?: { ... }
    }
    attachments?: Array<{
      s3ref: { ... }
      mime_type: { ... }
      filename?: { ... }
    }>
  }
  parameters?: Record<string, unknown>
  execution_mode_override?: "automatic" | "approval" | "draft"
  execution_context?: "flows" | "copilot" | "api" | "sharing"
  callback_url?: string // uri
  timeout_ms?: number
  agent_override?: {
    domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
    availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
    name?: string
    description?: string
    category?: "message" | "entity" | "document" | "classification" | "custom"
    icon?: string
    system_prompt?: string
    tools?: string[]
    model_config?: {
      model_id?: { ... }
      temperature?: { ... }
      max_tokens?: { ... }
      thinking?: { ... }
      thinking_budget?: { ... }
    }
    max_iterations?: number
    execution_pattern?: "direct" | "react"
    execution_mode?: "automatic" | "approval" | "draft"
    output_schema?: object
    input_parameters_schema?: {
      type: { ... }
      parameters: { ... }
      required?: { ... }
    }
    knowledge_source_ids?: string // uuid[]
  }
}
```

### `ExecutionResponse`

```ts
type ExecutionResponse = {
  execution_id?: string // uuid
  agent_id?: string
  agent_source?: "system" | "custom"
  agent_name?: string
  execution_context?: "flows" | "copilot" | "api" | "sharing"
  org_id?: string
  status?: "pending" | "queued" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled"
  input?: object
  parameters?: object
  result?: {
    response?: string
    structured_output?: object
    stop_reason?: string
  }
  error?: {
    code?: "TIMEOUT" | "MAX_ITERATIONS_EXCEEDED" | "TOOL_EXECUTION_FAILED" | "LLM_ERROR" | "INVALID_OUTPUT" | "REJECTED" | "INTERNAL_ERROR"
    message?: string
    details?: object
  }
  pending_action?: {
    tool?: string
    input?: object
    description?: string
    preview?: {
      action?: { ... }
      source?: { ... }
      target?: { ... }
      changes?: { ... }
      metadata?: { ... }
      summary?: { ... }
    }
    approval_note?: string
  }
  metrics?: {
    total_tokens?: number
    input_tokens?: number
    output_tokens?: number
    total_cost_usd?: number
    duration_ms?: number
    iteration_count?: number
  }
  started_at?: string // date-time
  completed_at?: string // date-time
  iterations?: Array<{
    index?: number
    tool?: string
    status?: "running" | "completed"
    timestamp?: string // date-time
  }>
}
```

### `ExecutionIterationProjection`

```ts
type ExecutionIterationProjection = {
  index?: number
  tool?: string
  status?: "running" | "completed"
  timestamp?: string // date-time
}
```

### `ExecutionFeedback`

```ts
type ExecutionFeedback = {
  rating: "up" | "down"
  comment?: string
  user_id: string
  submitted_at: string // date-time
}
```

### `ExecutionFeedbackResponse`

```ts
type ExecutionFeedbackResponse = {
  feedback: {
    rating: "up" | "down"
    comment?: string
    user_id: string
    submitted_at: string // date-time
  }
}
```

### `PutExecutionFeedbackRequest`

```ts
type PutExecutionFeedbackRequest = {
  rating: "up" | "down"
  comment?: string
}
```

### `ExecutionTrace`

```ts
type ExecutionTrace = {
  execution_id?: string // uuid
  iterations?: Array<{
    iteration_index?: number
    thought?: string
    action?: {
      tool?: { ... }
      input?: { ... }
    }
    observation?: object
    timestamp?: string // date-time
    tokens_used?: number
    latency_ms?: number
  }>
  total_iterations?: number
}
```

### `ExecutionIteration`

```ts
type ExecutionIteration = {
  iteration_index?: number
  thought?: string
  action?: {
    tool?: string
    input?: object
  }
  observation?: object
  timestamp?: string // date-time
  tokens_used?: number
  latency_ms?: number
}
```

### `PendingAction`

Action waiting for approval (when status=waiting_approval)

```ts
type PendingAction = {
  tool?: string
  input?: object
  description?: string
  preview?: {
    action?: {
      type: { ... }
      verb: { ... }
    }
    source?: {
      type?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      icon?: { ... }
      url?: { ... }
    }
    target?: {
      type?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      icon?: { ... }
      url?: { ... }
    }
    changes?: Array<{
      field?: { ... }
      label?: { ... }
      from?: { ... }
      to?: { ... }
    }>
    metadata?: Record<string, {
      type: { ... }
      value?: { ... }
      values?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      color?: { ... }
    }>
    summary?: string
  }
  approval_note?: string
}
```

### `ExecutionError`

```ts
type ExecutionError = {
  code?: "TIMEOUT" | "MAX_ITERATIONS_EXCEEDED" | "TOOL_EXECUTION_FAILED" | "LLM_ERROR" | "INVALID_OUTPUT" | "REJECTED" | "INTERNAL_ERROR"
  message?: string
  details?: object
}
```

### `ExecutionMetrics`

```ts
type ExecutionMetrics = {
  total_tokens?: number
  input_tokens?: number
  output_tokens?: number
  total_cost_usd?: number
  duration_ms?: number
  iteration_count?: number
}
```

### `AgentExecutionEventStatus`

Lifecycle status carried on an agent execution event.

Deliberately narrower than `ExecutionStatus`, which is the stored status of
the execution row: `pending` and `running` both surface as `started`, and
`cancelled` surfaces as `failed`. Consumers must not assume the two
vocabularies are interchang

```ts
type AgentExecutionEventStatus = "started" | "queued" | "completed" | "failed" | "approval_required"
```

### `AgentExecutionEvent`

Detail payload of the `agent-execution-status-update` event, published on
the AI Agents event bus with source `ai-agents`.

`execution_context` and `input` are present on every status, so a consumer
can tell whether an execution is theirs, and what it belonged to, from the
terminal event alone — wit

```ts
type AgentExecutionEvent = {
  executionId: string
  agentId: string
  orgId: string
  userId?: string
  execution_status: "started" | "queued" | "completed" | "failed" | "approval_required"
  execution_context?: "flows" | "copilot" | "api" | "sharing"
  input?: Record<string, unknown>
  output?: Record<string, unknown>
  error?: {
    message?: string
    code?: string
    stack?: string
  }
  duration?: number
  iterations?: number
  iteration?: number
  message?: string
  toolCalls?: Array<{
    name?: string
    args?: Record<string, unknown>
  }>
  timestamp?: string // date-time
}
```

### `ToolPreview`

Structured preview data for approval UI. Provides a generic format that any tool can populate.

```ts
type ToolPreview = {
  action?: {
    type: "move" | "create" | "update" | "delete" | "apply" | "send" | "link" | "unlink" | "batch_approval"
    verb: string
  }
  source?: {
    type?: string
    id?: string
    name?: string
    schema?: string
    icon?: string
    url?: string
  }
  target?: {
    type?: string
    id?: string
    name?: string
    schema?: string
    icon?: string
    url?: string
  }
  changes?: Array<{
    field?: string
    label?: string
    from?: {
      type: { ... }
      value?: { ... }
      values?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      color?: { ... }
    }
    to?: {
      type: { ... }
      value?: { ... }
      values?: { ... }
      id?: { ... }
      name?: { ... }
      schema?: { ... }
      color?: { ... }
    }
  }>
  metadata?: Record<string, {
    type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
    value?: unknown
    values?: string[]
    id?: string
    name?: string
    schema?: string
    color?: "success" | "warning" | "error" | "info"
  }>
  summary?: string
}
```

### `PreviewActionType`

Type of action being previewed

```ts
type PreviewActionType = "move" | "create" | "update" | "delete" | "apply" | "send" | "link" | "unlink" | "batch_approval"
```

### `PreviewEntity`

Entity reference for preview display

```ts
type PreviewEntity = {
  type?: string
  id?: string
  name?: string
  schema?: string
  icon?: string
  url?: string
}
```

### `PreviewChange`

A single field change in the preview

```ts
type PreviewChange = {
  field?: string
  label?: string
  from?: {
    type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
    value?: unknown
    values?: string[]
    id?: string
    name?: string
    schema?: string
    color?: "success" | "warning" | "error" | "info"
  }
  to?: {
    type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
    value?: unknown
    values?: string[]
    id?: string
    name?: string
    schema?: string
    color?: "success" | "warning" | "error" | "info"
  }
}
```

### `PreviewValue`

Typed value for preview display

```ts
type PreviewValue = {
  type: "text" | "number" | "boolean" | "list" | "entity" | "badge"
  value?: unknown
  values?: string[]
  id?: string
  name?: string
  schema?: string
  color?: "success" | "warning" | "error" | "info"
}
```

### `ToolDefinition`

```ts
type ToolDefinition = {
  tool_id?: string
  name?: string
  description?: string
  category?: "entity" | "message" | "taxonomy" | "rag" | "workflow"
  parameters?: object
  returns?: object
  requires_approval?: boolean
  enabled?: boolean
}
```

### `SkillCategory`

```ts
type SkillCategory = "message" | "entity" | "document" | "classification" | "custom"
```

### `AgentSource`

- system: Pre-built by epilot (system skills)
- custom: Created by organization


```ts
type AgentSource = "system" | "custom"
```

### `SkillAvailability`

Where the skill/agent is available:
- flows: Available in workflow automations
- copilot: Available as a sub-agent in copilot
- portals: Available in end-user self-service portals
- website: Website chat, explicitly selected; currently supports anonymous execution
- all: Available on the existing no

```ts
type SkillAvailability = "flows" | "copilot" | "portals" | "website" | "all"
```

### `ExecutionContext`

Where the execution was triggered from:
- flows: Triggered from workflow automation
- copilot: Triggered from copilot assistant
- api: Direct API call
- sharing: Triggered by sharing-api auto-sharing rules


```ts
type ExecutionContext = "flows" | "copilot" | "api" | "sharing"
```

### `ExecutionPattern`

- direct: Single LLM call, no tools
- react: Multi-step reasoning with tool use


```ts
type ExecutionPattern = "direct" | "react"
```

### `ExecutionMode`

- automatic: Execute without human intervention
- approval: Pause for human approval before tool execution
- draft: Execute but mark output as draft for review


```ts
type ExecutionMode = "automatic" | "approval" | "draft"
```

### `ExecutionStatus`

```ts
type ExecutionStatus = "pending" | "queued" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled"
```

### `ParameterType`

Base types:
- text: Text input field
- textarea: Multi-line text input field
- number: Numeric input field
- boolean: Toggle switch
- select: Dropdown selection (requires enum array)

Custom types (domain-specific):
- entity-schema: Entity schema selector (fetches from Entity API)
- entity-attribute

```ts
type ParameterType = "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria" | "journey-task" | "journey" | "journey-context"
```

### `InputParameterDefinition`

```ts
type InputParameterDefinition = {
  name: string
  label: string
  type: "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria" | "journey-task" | "journey" | "journey-context"
  description?: string
  default?: unknown
  multi?: boolean
  dependsOn?: string
  visibleWhen?: Record<string, unknown[]>
  enum?: string[]
  minimum?: number
  maximum?: number
  step?: number
  minLength?: number
  maxLength?: number
  schemaFilter?: string[]
  attributeTypeFilter?: string[]
  hidden?: boolean
}
```

### `InputParametersSchema`

```ts
type InputParametersSchema = {
  type: "object"
  parameters: Array<{
    name: string
    label: string
    type: "text" | "textarea" | "number" | "boolean" | "select" | "entity-schema" | "entity-attribute" | "entity-id" | "taxonomy" | "taxonomy-classification" | "shared-inbox" | "label" | "matching-criteria" | "journey-task" | "journey" | "journey-context"
    description?: string
    default?: unknown
    multi?: boolean
    dependsOn?: string
    visibleWhen?: Record<string, unknown[]>
    enum?: string[]
    minimum?: number
    maximum?: number
    step?: number
    minLength?: number
    maxLength?: number
    schemaFilter?: string[]
    attributeTypeFilter?: string[]
    hidden?: boolean
  }>
  required?: string[]
}
```

### `ModelConfig`

```ts
type ModelConfig = {
  model_id?: string
  temperature?: number
  max_tokens?: number
  thinking?: boolean
  thinking_budget?: number
}
```

### `Error`

```ts
type Error = {
  error?: string
  code?: string
  message?: string
  details?: object
}
```

### `AgentAuthAccessProfile`

Access profile of the agent's grant at the Access Token API (its ceiling)

```ts
type AgentAuthAccessProfile = "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
```

### `AgentAuthActivationRequest`

```ts
type AgentAuthActivationRequest = {
  access_profile: "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
  reason?: string
}
```

### `AgentAuthStatus`

```ts
type AgentAuthStatus = {
  status: "inactive" | "active" | "expired"
  agent_auth_agent_id?: string
  activation_id?: string
  access_profile?: "read" | "config:read" | "config:write" | "data:read" | "data:write" | "full"
  owner_user_id?: string
  expires_at?: string // date-time
  expiring_soon?: boolean
}
```

### `ChatRequest`

```ts
type ChatRequest = {
  agentId: string
  message?: string
  tool_approval?: {
    token: string
    approved: boolean
    reason?: string
  }
  conversationId?: string // uuid
  clientHistory?: Array<{
    role: "user" | "assistant" | "tool" | "system"
    content: string
    tool_calls?: Array<{
      id?: { ... }
      name?: { ... }
      input?: { ... }
      output?: { ... }
    }>
  }>
  context?: {
    entityId?: string
    customData?: Record<string, unknown>
  }
  streaming?: {
    mode?: "updates" | "messages"
    streamTokens?: boolean
    includeMetadata?: boolean
  }
  preview_demo?: boolean
  agent_override?: {
    domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
    availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
    name?: string
    description?: string
    category?: "message" | "entity" | "document" | "classification" | "custom"
    icon?: string
    system_prompt?: string
    tools?: string[]
    model_config?: {
      model_id?: { ... }
      temperature?: { ... }
      max_tokens?: { ... }
      thinking?: { ... }
      thinking_budget?: { ... }
    }
    max_iterations?: number
    execution_pattern?: "direct" | "react"
    execution_mode?: "automatic" | "approval" | "draft"
    output_schema?: object
    input_parameters_schema?: {
      type: { ... }
      parameters: { ... }
      required?: { ... }
    }
    knowledge_source_ids?: string // uuid[]
  }
  portal_config_override?: Record<string, unknown>
}
```

### `ToolApprovalAnswer`

The user's answer to an `approval_required` event (Luna behind the
`luna-tool-approvals` flag). Requires the asking turn's `conversationId` and `agentId`; `message` may
be omitted. On approve the server runs exactly the pending tool call
stored in the conversation, streams its `tool_call` / `tool_re

```ts
type ToolApprovalAnswer = {
  token: string
  approved: boolean
  reason?: string
}
```

### `ToolApprovalRequest`

A tool call waiting for the user's approval; the turn has ended.

```ts
type ToolApprovalRequest = {
  id: string
  tool_id: string
  tool_call_id: string
  title?: string
  input: Record<string, unknown>
  impact?: string
  preview?: Record<string, unknown>
  expires_at: string // date-time
  token: string
}
```

### `AgentPreviewOverride`

Agent Builder preview: unsaved editor settings applied to the saved
custom agent for this request only. Nothing is persisted. Requires
preview_demo on /v1/chat and forces draft execution mode on
/v1/agents/{agent_id}/execute/stream. Not supported for system skills
or Website Chat agents.


```ts
type AgentPreviewOverride = {
  domain?: "customer_service" | "sales" | "billing" | "metering_grid" | "other"
  availability?: "flows" | "copilot" | "portals" | "website" | "all"[]
  name?: string
  description?: string
  category?: "message" | "entity" | "document" | "classification" | "custom"
  icon?: string
  system_prompt?: string
  tools?: string[]
  model_config?: {
    model_id?: string
    temperature?: number
    max_tokens?: number
    thinking?: boolean
    thinking_budget?: number
  }
  max_iterations?: number
  execution_pattern?: "direct" | "react"
  execution_mode?: "automatic" | "approval" | "draft"
  output_schema?: object
  input_parameters_schema?: {
    type: "object"
    parameters: Array<{
      name: { ... }
      label: { ... }
      type: { ... }
      description?: { ... }
      default?: { ... }
      multi?: { ... }
      dependsOn?: { ... }
      visibleWhen?: { ... }
      enum?: { ... }
      minimum?: { ... }
      maximum?: { ... }
      step?: { ... }
      minLength?: { ... }
      maxLength?: { ... }
      schemaFilter?: { ... }
      attributeTypeFilter?: { ... }
      hidden?: { ... }
    }>
    required?: string[]
  }
  knowledge_source_ids?: string // uuid[]
}
```

### `ChatMessage`

```ts
type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system"
  content: string
  tool_calls?: Array<{
    id?: string
    name?: string
    input?: object
    output?: string
  }>
}
```

### `StreamingOptions`

```ts
type StreamingOptions = {
  mode?: "updates" | "messages"
  streamTokens?: boolean
  includeMetadata?: boolean
}
```

### `StreamEvent`

Server-Sent Event for streaming responses

```ts
type StreamEvent = {
  type?: "token" | "agent_step" | "tool_call" | "tool_result" | "complete" | "error" | "metadata" | "needs_approval" | "approval_required"
  content?: string
  approval?: {
    id: string
    tool_id: string
    tool_call_id: string
    title?: string
    input: Record<string, unknown>
    impact?: string
    preview?: Record<string, unknown>
    expires_at: string // date-time
    token: string
  }
  index?: number
  tool?: string
  input?: object
  output?: string
  callId?: string
  result?: {
    response?: string
    structured_output?: object
    status?: "completed" | "failed" | "max_iterations" | "rejected"
    metrics?: {
      total_tokens?: { ... }
      input_tokens?: { ... }
      output_tokens?: { ... }
      total_cost_usd?: { ... }
      duration_ms?: { ... }
      iteration_count?: { ... }
    }
  }
  error?: {
    code?: string
    message?: string
  }
  conversationId?: string // uuid
}
```

### `ExecutionResult`

```ts
type ExecutionResult = {
  response?: string
  structured_output?: object
  status?: "completed" | "failed" | "max_iterations" | "rejected"
  metrics?: {
    total_tokens?: number
    input_tokens?: number
    output_tokens?: number
    total_cost_usd?: number
    duration_ms?: number
    iteration_count?: number
  }
}
```

### `ConversationItem`

```ts
type ConversationItem = {
  conversation_id?: string // uuid
  user_id?: string
  agent_id?: string
  title?: string
  message_count?: number
  last_message?: string
  last_message_at?: string // date-time
  context?: {
    entityId?: string
    customData?: object
  }
  created_at?: string // date-time
  updated_at?: string // date-time
}
```

### `MessageItem`

```ts
type MessageItem = {
  conversation_id?: string // uuid
  role?: "user" | "assistant" | "tool" | "system"
  content?: string
  timestamp?: string // date-time
  tool_calls?: Array<{
    id?: string
    name?: string
    input?: object
    output?: string
  }>
  token_count?: number
  trace_id?: string // uuid
  feedback?: {
    rating: "up" | "down"
    comment?: string
    user_id: string
    submitted_at: string // date-time
  }
}
```

### `MessageFeedback`

```ts
type MessageFeedback = {
  rating: "up" | "down"
  comment?: string
  user_id: string
  submitted_at: string // date-time
}
```

### `SubmitFeedbackRequest`

```ts
type SubmitFeedbackRequest = {
  trace_id: string // uuid
  rating: "up" | "down"
  comment?: string
}
```

### `CustomerChatConversation`

```ts
type CustomerChatConversation = {
  conversation_id: string
  user_id: string
  contact_id?: string
  title?: string
  message_count: number
  last_message?: string
  last_message_at: string // date-time
  created_at: string // date-time
  ticket_ids: string[]
}
```

### `CustomerChatConversationMessage`

```ts
type CustomerChatConversationMessage = {
  role: "user" | "assistant"
  content: string
  timestamp: string // date-time
}
```

### `InternalPortalChat`

A v2 portal chat in v1's conversation shape

```ts
type InternalPortalChat = {
  conversation_id: string
  user_id: string
  contact_id?: string
  title?: string
  message_count: number
  last_message?: string
  last_message_at: string // date-time
  created_at: string // date-time
  ticket_ids: string[]
}
```

### `InternalPortalChatPlace`

Where a v2 portal chat is in the history's order

```ts
type InternalPortalChatPlace = {
  conversation_id: string
  updated_at: string // date-time
}
```

### `InternalPortalChats`

```ts
type InternalPortalChats = {
  conversations: Array<{
    conversation_id: string
    updated_at: string // date-time
  }>
  has_more: boolean
  read_to?: {
    conversation_id: string
    updated_at: string // date-time
  }
}
```

### `InternalPortalChatRows`

```ts
type InternalPortalChatRows = {
  conversations: Array<{
    conversation_id: string
    user_id: string
    contact_id?: string
    title?: string
    message_count: number
    last_message?: string
    last_message_at: string // date-time
    created_at: string // date-time
    ticket_ids: string[]
  }>
}
```

### `InternalPortalChatTranscript`

```ts
type InternalPortalChatTranscript = {
  conversation: {
    conversation_id: string
    user_id: string
    contact_id?: string
    title?: string
    message_count: number
    last_message?: string
    last_message_at: string // date-time
    created_at: string // date-time
    ticket_ids: string[]
  }
  messages: Array<{
    role: "user" | "assistant"
    content: string
    timestamp: string // date-time
    blocked?: boolean
  }>
}
```

### `ListCustomerChatConversationsResponse`

```ts
type ListCustomerChatConversationsResponse = {
  conversations: Array<{
    conversation_id: string
    user_id: string
    contact_id?: string
    title?: string
    message_count: number
    last_message?: string
    last_message_at: string // date-time
    created_at: string // date-time
    ticket_ids: string[]
  }>
  next_cursor?: string
}
```

### `CustomerChatConversationTranscript`

```ts
type CustomerChatConversationTranscript = {
  conversation: {
    conversation_id: string
    user_id: string
    contact_id?: string
    title?: string
    message_count: number
    last_message?: string
    last_message_at: string // date-time
    created_at: string // date-time
    ticket_ids: string[]
  }
  messages: Array<{
    role: "user" | "assistant"
    content: string
    timestamp: string // date-time
  }>
}
```

### `ListConversationsResponse`

```ts
type ListConversationsResponse = {
  conversations?: Array<{
    conversation_id?: string // uuid
    user_id?: string
    agent_id?: string
    title?: string
    message_count?: number
    last_message?: string
    last_message_at?: string // date-time
    context?: {
      entityId?: { ... }
      customData?: { ... }
    }
    created_at?: string // date-time
    updated_at?: string // date-time
  }>
  next_cursor?: string
}
```

### `ConversationWithMessages`

```ts
type ConversationWithMessages = {
  conversation?: {
    conversation_id?: string // uuid
    user_id?: string
    agent_id?: string
    title?: string
    message_count?: number
    last_message?: string
    last_message_at?: string // date-time
    context?: {
      entityId?: { ... }
      customData?: { ... }
    }
    created_at?: string // date-time
    updated_at?: string // date-time
  }
  messages?: Array<{
    conversation_id?: string // uuid
    role?: "user" | "assistant" | "tool" | "system"
    content?: string
    timestamp?: string // date-time
    tool_calls?: Array<{
      id?: { ... }
      name?: { ... }
      input?: { ... }
      output?: { ... }
    }>
    token_count?: number
    trace_id?: string // uuid
    feedback?: {
      rating: { ... }
      comment?: { ... }
      user_id: { ... }
      submitted_at: { ... }
    }
  }>
}
```

### `SessionsError`

An error of the Sessions API

```ts
type SessionsError = {
  error: {
    message: string
    issues?: Array<{
      code: { ... }
      path: { ... }
      message: { ... }
    }>
    requestId?: string
  }
}
```

### `ValidationIssue`

```ts
type ValidationIssue = {
  code: string
  path: string | number[]
  message: string
}
```

### `RefusalDetails`

```ts
type RefusalDetails = {
  code: "not_enabled" | "quota_exceeded" | "refused" | "portal_chat_off" | "portal_chat_unavailable" | "message_too_long" | "screening_unavailable" | "rate_limited" | "usage_limit"
  message: string
  limit?: "concurrent_sessions" | "active_vms" | "daily_budget"
  retryAfterSeconds?: number
}
```

### `Refusal`

A refusal the client tells the user about; `error` repeats it, like every other error

```ts
type Refusal = {
  code: "not_enabled" | "quota_exceeded" | "refused" | "portal_chat_off" | "portal_chat_unavailable" | "message_too_long" | "screening_unavailable" | "rate_limited" | "usage_limit"
  message: string
  limit?: "concurrent_sessions" | "active_vms" | "daily_budget"
  retryAfterSeconds?: number
  error: {
    code: "not_enabled" | "quota_exceeded" | "refused" | "portal_chat_off" | "portal_chat_unavailable" | "message_too_long" | "screening_unavailable" | "rate_limited" | "usage_limit"
    message: string
    limit?: "concurrent_sessions" | "active_vms" | "daily_budget"
    retryAfterSeconds?: number
  }
}
```

### `RequestId`

The client's id for the request: sent again on a retry, it is taken once

```ts
type RequestId = string // uuid
```

### `SessionStatus`

`starting`: its VM starts or the agent catches up; `failed`: its last turn couldn't run

```ts
type SessionStatus = "idle" | "starting" | "running" | "failed"
```

### `SessionLiveInfo`

How to subscribe to the session's live messages on AppSync Events

```ts
type SessionLiveInfo = {
  transport: "appsync"
  httpHost: string
  realtimeUrl: string
  channel: string
}
```

### `SessionView`

```ts
type SessionView = {
  id: string // uuid
  agentId: string
  mode: "read" | "write"
  title: string
  origin?: string
  createdAt: string // date-time
  updatedAt: string // date-time
  status: "idle" | "starting" | "running" | "failed"
  live?: {
    transport: "appsync"
    httpHost: string
    realtimeUrl: string
    channel: string
  }
}
```

### `SessionOrigin`

Where in the product a session is started, e.g. `configuration-hub`

```ts
type SessionOrigin = string
```

### `CreateInternalSessionRequest`

```ts
type CreateInternalSessionRequest = {
  agentId?: string
  origin: string
  owner: {
    user_id: string
  }
  unattended: true
  client_token?: string
  input: {
    text: string
    context: {
      intent: { ... }
    }
  }
}
```

### `CreateInternalExecutionRequest`

```ts
type CreateInternalExecutionRequest = {
  execution_id: string
  agent_id: string
  input: {
    text: string
    context?: Record<string, unknown>
  }
  mode?: "automatic" | "approval" | "draft"
  skill?: {
    instructions: string
    tools: string[]
    output_schema?: Record<string, unknown>
  }
  parameters?: Record<string, unknown>
  flows?: {
    workflow_id?: string
    workflow_name?: string
    workflow_execution_id?: string
    task_id?: string
  }
}
```

### `ExecutionDecisionRequest`

```ts
type ExecutionDecisionRequest = {
  approval_id: string
  approved: boolean
  reason?: string
  decided_by: string
}
```

### `ExecutionDecision`

```ts
type ExecutionDecision = {
  approval: {
    id: string
    status: string
  }
}
```

### `CreatedInternalExecution`

```ts
type CreatedInternalExecution = {
  session_id: string // uuid
}
```

### `CreatedInternalSession`

```ts
type CreatedInternalSession = {
  id: string // uuid
  unattended_access: boolean
}
```

### `InternalSessionStatus`

```ts
type InternalSessionStatus = {
  id: string // uuid
  state: "working" | "needs_owner" | "idle" | "failed"
  needs: "first_message" | "approval" | "answer" | null
  attended: boolean
  last_activity_at: string // date-time
  turns: number
}
```

### `SessionResponse`

```ts
type SessionResponse = {
  session: {
    id: string // uuid
    agentId: string
    mode: "read" | "write"
    title: string
    origin?: string
    createdAt: string // date-time
    updatedAt: string // date-time
    status: "idle" | "starting" | "running" | "failed"
    live?: {
      transport: { ... }
      httpHost: { ... }
      realtimeUrl: { ... }
      channel: { ... }
    }
  }
}
```

### `SessionList`

```ts
type SessionList = {
  sessions: Array<{
    id: string // uuid
    agentId: string
    mode: "read" | "write"
    title: string
    origin?: string
    createdAt: string // date-time
    updatedAt: string // date-time
    status: "idle" | "starting" | "running" | "failed"
    live?: {
      transport: { ... }
      httpHost: { ... }
      realtimeUrl: { ... }
      channel: { ... }
    }
  }>
}
```

### `CreatedSession`

```ts
type CreatedSession = {
  session: {
    id: string // uuid
    agentId: string
    mode: "read" | "write"
    title: string
    origin?: string
    createdAt: string // date-time
    updatedAt: string // date-time
    status: "idle" | "starting" | "running" | "failed"
    live?: {
      transport: { ... }
      httpHost: { ... }
      realtimeUrl: { ... }
      channel: { ... }
    }
  }
  events: Array<{
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "input"
    input: {
      kind: { ... }
      text: { ... }
      files?: { ... }
    } | {
      kind: { ... }
    }
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId: string
    type: "input.taken"
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId: string
    type: "input.cancelled"
    reason: "stopped" | "deleted"
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId: string
    type: "input.failed"
    errorCode: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
    error: string
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "turn.started"
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "model.usage"
    usage: {
      input: { ... }
      output: { ... }
      cacheRead: { ... }
      cacheWrite: { ... }
    }
    context?: {
      window: { ... }
      parts: { ... }
    }
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "context.compacted"
    tokensBefore: number
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "turn.ended"
    reason: "done" | "stopped" | "failed"
    error?: string
    errorCode?: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
    cutOff?: boolean
  } | {
    seq: number
  // ...
}
```

### `SessionEventsPage`

```ts
type SessionEventsPage = {
  events: Array<{
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "input"
    input: {
      kind: { ... }
      text: { ... }
      files?: { ... }
    } | {
      kind: { ... }
    }
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId: string
    type: "input.taken"
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId: string
    type: "input.cancelled"
    reason: "stopped" | "deleted"
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId: string
    type: "input.failed"
    errorCode: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
    error: string
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "turn.started"
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "model.usage"
    usage: {
      input: { ... }
      output: { ... }
      cacheRead: { ... }
      cacheWrite: { ... }
    }
    context?: {
      window: { ... }
      parts: { ... }
    }
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "context.compacted"
    tokensBefore: number
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "turn.ended"
    reason: "done" | "stopped" | "failed"
    error?: string
    errorCode?: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
    cutOff?: boolean
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "message"
    text: string
    reasoning?: string
    reasoningMs?: number
  } | {
    seq: number
    eventId: string
    occurredAt: string // date-time
    blocked?: boolean
    inputEventId?: string
    type: "step.started"
    stepId: string
  // ...
}
```

### `MessageInput`

The user's message, its text (trimmed), its files, or both

```ts
type MessageInput = {
  text?: string
  context?: Record<string, unknown>
  files?: string // uuid[]
}
```

### `CreatePortalSessionRequest`

A portal chat; the portal's settings choose its agent.

```ts
type CreatePortalSessionRequest = {
  requestId?: string // uuid
  input?: {
    text: string
    context?: Record<string, unknown>
  }
}
```

### `PortalChatConfig`

```ts
type PortalChatConfig = {
  agent: {
    name?: string
    greeting?: string
    conversation_starters?: string[]
    language?: string
    formality?: string
  }
}
```

### `CreateSessionRequest`

```ts
type CreateSessionRequest = {
  agentId: string
  requestId?: string // uuid
  origin?: string
  input?: {
    text?: string
    context?: Record<string, unknown>
    files?: string // uuid[]
  }
  prepare?: boolean
}
```

### `RenameSessionRequest`

```ts
type RenameSessionRequest = {
  title: string
}
```

### `ClientInput`

The user's input to a session

```ts
type ClientInput = {
  text?: string
  context?: Record<string, unknown>
  files?: string // uuid[]
  type: "user.message"
  requestId?: string // uuid
} | {
  type: "user.approval"
  approvalId: string // uuid
  approved: boolean
  reason?: string
} | {
  type: "user.answer"
  questionId: string // uuid
  answers: Array<{
    selected: string[]
    other?: string
  }>
} | {
  type: "user.interrupt"
  requestId?: string // uuid
}
```

### `UserMessageInput`

A message. It closes open questions and expires pending approvals.

```ts
type UserMessageInput = {
  text?: string
  context?: Record<string, unknown>
  files?: string // uuid[]
  type: "user.message"
  requestId?: string // uuid
}
```

### `UserApprovalInput`

Approves or rejects what the agent asked to do (`approval.required`)

```ts
type UserApprovalInput = {
  type: "user.approval"
  approvalId: string // uuid
  approved: boolean
  reason?: string
}
```

### `UserAnswerInput`

The user's answers to the agent's questions (`question.asked`), one per question

```ts
type UserAnswerInput = {
  type: "user.answer"
  questionId: string // uuid
  answers: Array<{
    selected: string[]
    other?: string
  }>
}
```

### `UserInterruptInput`

Stops the agent's turn

```ts
type UserInterruptInput = {
  type: "user.interrupt"
  requestId?: string // uuid
}
```

### `InputEventId`

The input as stored (a message, also a blocked one or a retry's first attempt; an approval decision; answers): the turn that answers it names it on `turn.started` and `turn.ended` (`inputEventId`), so a client follows this input's turn and no other's.

```ts
type InputEventId = string // uuid
```

### `SessionInputAccepted`

What was accepted: a message or an interrupt, an approval decision, or answers

```ts
type SessionInputAccepted = {
  accepted: true
  blocked?: boolean
  inputEventId?: string // uuid
} | {
  approval: {
    id: string // uuid
    status: "pending" | "approved" | "rejected" | "executed" | "expired"
  }
  inputEventId?: string // uuid
} | {
  inputEventId?: string // uuid
  question: {
    id: string // uuid
    status: "pending" | "answered" | "dismissed"
  }
}
```

### `UploadRequest`

```ts
type UploadRequest = {
  name: string
  mediaType: "image/png" | "image/jpeg" | "image/webp" | "image/gif" | "application/pdf" | "text/csv" | "text/plain" | "text/markdown" | "application/json" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  size: number
}
```

### `SessionUpload`

```ts
type SessionUpload = {
  file: {
    fileId: string // uuid
    name: string
    mediaType: string
    size: number
  }
  upload: {
    method: "PUT"
    url: string
    headers: Record<string, string>
  }
}
```

### `FileRef`

A file in a session

```ts
type FileRef = {
  fileId: string // uuid
  name: string
  mediaType: string
  size: number
}
```

### `SessionFileUrl`

```ts
type SessionFileUrl = {
  url: string
  expiresAt: string // date-time
}
```

### `RunScriptRequest`

```ts
type RunScriptRequest = {
  language: "javascript" | "python"
  script: string
  description: string
  waitMs?: number
}
```

### `ScriptRunView`

```ts
type ScriptRunView = {
  runId: string
  status: "running" | "done" | "failed"
  output?: string
  changes?: number
}
```

### `ApplyScriptRunRequest`

```ts
type ApplyScriptRunRequest = {
  approvalSummary: string
}
```

### `ScriptApplyResult`

```ts
type ScriptApplyResult = {
  done: boolean
  applied: number
  total: number
  result?: {
    content: Array<{
      type: { ... }
      text: { ... }
    } | {
      type: { ... }
      mimeType: { ... }
      data?: { ... }
      key?: { ... }
    } | {
      type: { ... }
      thinking: { ... }
      redacted?: { ... }
    } | {
      type: { ... }
      id: { ... }
      name: { ... }
      arguments: { ... }
    }>
    isError: boolean
  }
}
```

### `ContentPart`

```ts
type ContentPart = {
  type: "text"
  text: string
} | {
  type: "image"
  mimeType: string
  data?: string
  key?: string
} | {
  type: "thinking"
  thinking: string
  redacted?: boolean
} | {
  type: "tool_call"
  id: string
  name: string
  arguments: Record<string, unknown>
}
```

### `TextContentPart`

```ts
type TextContentPart = {
  type: "text"
  text: string
}
```

### `ImageContentPart`

```ts
type ImageContentPart = {
  type: "image"
  mimeType: string
  data?: string
  key?: string
}
```

### `ThinkingContentPart`

```ts
type ThinkingContentPart = {
  type: "thinking"
  thinking: string
  redacted?: boolean
}
```

### `ToolCallContentPart`

```ts
type ToolCallContentPart = {
  type: "tool_call"
  id: string
  name: string
  arguments: Record<string, unknown>
}
```

### `SessionErrorCode`

Why a turn or an input failed, for the user's copy

```ts
type SessionErrorCode = "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
```

### `ContextBreakdown`

What filled the model's context on one call, in tokens

```ts
type ContextBreakdown = {
  window: number
  parts: {
    instructions?: number
    user?: number
    replies?: number
    thinking?: number
    toolCalls?: number
    toolResults?: number
    files?: number
    summary?: number
  }
}
```

### `BatchChange`

A change the agent asks to make, exactly as it will run

```ts
type BatchChange = {
  operationId: string
  service?: string
  method: string
  path: string
  effect: "read" | "write" | "config" | "destructive"
  pathParameters?: Record<string, unknown>
  queryParameters?: Record<string, unknown>
  body?: unknown
  title?: string
}
```

### `ChangeOutcome`

What happened to one change of an approved batch

```ts
type ChangeOutcome = {
  change: number
  status: "ok" | "failed" | "skipped"
  operationId: string
  error?: string
  mayHaveRun?: boolean
  record?: {
    _id?: string
    _title?: string
    _schema?: string
  }
}
```

### `Question`

```ts
type Question = {
  header: string
  question: string
  multiSelect?: boolean
  options: Array<{
    label: string
    description?: string
  }>
}
```

### `Answer`

One answer per question, in order: the labels picked, and/or the user's own words

```ts
type Answer = {
  selected: string[]
  other?: string
}
```

### `ClientEvent`

What a client sees of a session's history. Every event carries the `seq` of the stored event it comes
from, so history, live messages and reconnects can overlap and a client applies each event once.


```ts
type ClientEvent = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "input"
  input: {
    kind: "message"
    text: string
    files?: Array<{
      fileId: { ... }
      name: { ... }
      mediaType: { ... }
      size: { ... }
    }>
  } | {
    kind: "interrupt"
  }
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId: string
  type: "input.taken"
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId: string
  type: "input.cancelled"
  reason: "stopped" | "deleted"
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId: string
  type: "input.failed"
  errorCode: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
  error: string
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "turn.started"
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "model.usage"
  usage: {
    input: number
    output: number
    cacheRead: number
    cacheWrite: number
  }
  context?: {
    window: number
    parts: {
      instructions?: { ... }
      user?: { ... }
      replies?: { ... }
      thinking?: { ... }
      toolCalls?: { ... }
      toolResults?: { ... }
      files?: { ... }
      summary?: { ... }
    }
  }
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "context.compacted"
  tokensBefore: number
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "turn.ended"
  reason: "done" | "stopped" | "failed"
  error?: string
  errorCode?: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
  cutOff?: boolean
} | {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  // ...
}
```

### `ClientEventBase`

```ts
type ClientEventBase = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
}
```

### `ClientEventInput`

The user's message, or their interrupt

```ts
type ClientEventInput = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "input"
  input: {
    kind: "message"
    text: string
    files?: Array<{
      fileId: { ... }
      name: { ... }
      mediaType: { ... }
      size: { ... }
    }>
  } | {
    kind: "interrupt"
  }
}
```

### `ClientEventInputTaken`

The agent took the user's message `inputEventId`, where it reads it

```ts
type ClientEventInputTaken = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId: string
  type: "input.taken"
}
```

### `ClientEventInputCancelled`

The message will not be answered: the user stopped the turn, or the session was deleted

```ts
type ClientEventInputCancelled = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId: string
  type: "input.cancelled"
  reason: "stopped" | "deleted"
}
```

### `ClientEventInputFailed`

The message failed again and again and was skipped, so the session goes on

```ts
type ClientEventInputFailed = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId: string
  type: "input.failed"
  errorCode: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
  error: string
}
```

### `ClientEventTurnStarted`

```ts
type ClientEventTurnStarted = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "turn.started"
}
```

### `ClientEventModelUsage`

One model call: what it read and wrote, and what filled its context

```ts
type ClientEventModelUsage = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "model.usage"
  usage: {
    input: number
    output: number
    cacheRead: number
    cacheWrite: number
  }
  context?: {
    window: number
    parts: {
      instructions?: { ... }
      user?: { ... }
      replies?: { ... }
      thinking?: { ... }
      toolCalls?: { ... }
      toolResults?: { ... }
      files?: { ... }
      summary?: { ... }
    }
  }
}
```

### `ClientEventContextCompacted`

Older messages were summarized to make room; the context held `tokensBefore` until then

```ts
type ClientEventContextCompacted = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "context.compacted"
  tokensBefore: number
}
```

### `ClientEventTurnEnded`

```ts
type ClientEventTurnEnded = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "turn.ended"
  reason: "done" | "stopped" | "failed"
  error?: string
  errorCode?: "model_unavailable" | "tool_timeout" | "turn_timeout" | "wake_failed" | "boot_failed" | "workspace_lost" | "budget_exceeded" | "internal"
  cutOff?: boolean
}
```

### `ClientEventMessage`

The agent's answer

```ts
type ClientEventMessage = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "message"
  text: string
  reasoning?: string
  reasoningMs?: number
}
```

### `ClientEventStepStarted`

The agent calls a tool

```ts
type ClientEventStepStarted = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "step.started"
  stepId: string
  tool: string
  input: Record<string, unknown>
}
```

### `ClientEventStepFinished`

```ts
type ClientEventStepFinished = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "step.finished"
  stepId: string
  tool: string
  ok: boolean
  output: string
  marker?: "interrupted" | "may_have_run"
}
```

### `ClientEventSkillLoaded`

```ts
type ClientEventSkillLoaded = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "skill.loaded"
  skill: string
  version?: string
  stepId?: string
}
```

### `ClientEventApprovalRequired`

The agent asks to make changes: approve or reject with `user.approval`

```ts
type ClientEventApprovalRequired = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "approval.required"
  approvalId: string
  stepId: string
  tool: string
  summary: string
  changes?: Array<{
    operationId: string
    service?: string
    method: string
    path: string
    effect: "read" | "write" | "config" | "destructive"
    pathParameters?: Record<string, unknown>
    queryParameters?: Record<string, unknown>
    body?: unknown
    title?: string
  }>
  executionId?: string
  call?: {
    operationId: string
    service?: string
    method: string
    path: string
    effect: "read" | "write" | "config" | "destructive"
    pathParameters?: Record<string, unknown>
    queryParameters?: Record<string, unknown>
    body?: unknown
    title?: string
  }
  card?: Record<string, unknown>
}
```

### `ClientEventApprovalResolved`

```ts
type ClientEventApprovalResolved = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "approval.resolved"
  approvalId: string
  approved: boolean
  reason?: string
}
```

### `ClientEventApprovalExecuted`

An approved batch ran: every change ran, or it stopped at the first failure

```ts
type ClientEventApprovalExecuted = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "approval.executed"
  approvalId: string
  stepId: string
  applied: number
  total: number
  complete: boolean
  stopped?: boolean
  changes: Array<{
    change: number
    status: "ok" | "failed" | "skipped"
    operationId: string
    error?: string
    mayHaveRun?: boolean
    record?: {
      _id?: { ... }
      _title?: { ... }
      _schema?: { ... }
    }
  }>
}
```

### `ClientEventApprovalResult`

An approved single call ran: its result, as `step.finished` shows a step's (a client reads its markers there, e.g. a portal's ticket or open directive)

```ts
type ClientEventApprovalResult = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "approval.result"
  approvalId: string
  stepId: string
  tool: string
  ok: boolean
  output: string
}
```

### `ClientEventQuestionAsked`

The agent asks the user: answer with `user.answer`

```ts
type ClientEventQuestionAsked = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "question.asked"
  questionId: string
  stepId: string
  questions: Array<{
    header: string
    question: string
    multiSelect?: boolean
    options: Array<{
      label: { ... }
      description?: { ... }
    }>
  }>
}
```

### `ClientEventFilesCreated`

Files the agent wrote for the user in this turn

```ts
type ClientEventFilesCreated = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "files.created"
  files: Array<{
    fileId: string // uuid
    name: string
    mediaType: string
    size: number
  }>
}
```

### `ClientEventQuestionAnswered`

Answered, or `dismissed`: the user wrote a message instead

```ts
type ClientEventQuestionAnswered = {
  seq: number
  eventId: string
  occurredAt: string // date-time
  blocked?: boolean
  inputEventId?: string
  type: "question.answered"
  questionId: string
  answers?: Array<{
    selected: string[]
    other?: string
  }>
  dismissed?: boolean
}
```
