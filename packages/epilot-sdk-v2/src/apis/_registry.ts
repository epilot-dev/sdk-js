import type { Document } from 'openapi-client-axios'

import { expand } from '../compact'
import type { CompactDefinition } from '../compact'
import { registerApi } from '../registry'
import type { ApiEntry } from '../types'

/* eslint-disable @typescript-eslint/no-require-imports */
const base = '../definitions/'
const loadDef = (name: string): Document => {
  // biome-ignore lint/style/useTemplate: dynamic concatenation prevents tsup from inlining definitions
  const mod = require(base + name + '-runtime.json')
  return expand((mod.default ?? mod) as CompactDefinition) as Document
}

export const registerBuiltinApis = (registry: Map<string, ApiEntry>) => {
  registerApi({
    registry,
    name: 'accessToken',
    loader: () => loadDef('access-token'),
  })
  registerApi({
    registry,
    name: 'address',
    loader: () => loadDef('address'),
  })
  registerApi({
    registry,
    name: 'addressSuggestions',
    loader: () => loadDef('address-suggestions'),
  })
  registerApi({
    registry,
    name: 'aiAgents',
    loader: () => loadDef('ai-agents'),
  })
  registerApi({
    registry,
    name: 'app',
    loader: () => loadDef('app'),
  })
  registerApi({
    registry,
    name: 'auditLogs',
    loader: () => loadDef('audit-logs'),
  })
  registerApi({
    registry,
    name: 'automation',
    loader: () => loadDef('automation'),
  })
  registerApi({
    registry,
    name: 'billing',
    loader: () => loadDef('billing'),
  })
  registerApi({
    registry,
    name: 'blueprintManifest',
    loader: () => loadDef('blueprint-manifest'),
  })
  registerApi({
    registry,
    name: 'consent',
    loader: () => loadDef('consent'),
  })
  registerApi({
    registry,
    name: 'customerPortal',
    loader: () => loadDef('customer-portal'),
  })
  registerApi({
    registry,
    name: 'dashboard',
    loader: () => loadDef('dashboard'),
  })
  registerApi({
    registry,
    name: 'dataManagement',
    loader: () => loadDef('data-management'),
  })
  registerApi({
    registry,
    name: 'deduplication',
    loader: () => loadDef('deduplication'),
  })
  registerApi({
    registry,
    name: 'design',
    loader: () => loadDef('design'),
  })
  registerApi({
    registry,
    name: 'document',
    loader: () => loadDef('document'),
  })
  registerApi({
    registry,
    name: 'emailSettings',
    loader: () => loadDef('email-settings'),
  })
  registerApi({
    registry,
    name: 'emailTemplate',
    loader: () => loadDef('email-template'),
  })
  registerApi({
    registry,
    name: 'entity',
    loader: () => loadDef('entity'),
  })
  registerApi({
    registry,
    name: 'entityMapping',
    loader: () => loadDef('entity-mapping'),
  })
  registerApi({
    registry,
    name: 'environments',
    loader: () => loadDef('environments'),
  })
  registerApi({
    registry,
    name: 'erpIntegration',
    loader: () => loadDef('erp-integration'),
  })
  registerApi({
    registry,
    name: 'eventCatalog',
    loader: () => loadDef('event-catalog'),
  })
  registerApi({
    registry,
    name: 'file',
    loader: () => loadDef('file'),
  })
  registerApi({
    registry,
    name: 'iban',
    loader: () => loadDef('iban'),
  })
  registerApi({
    registry,
    name: 'journey',
    loader: () => loadDef('journey'),
  })
  registerApi({
    registry,
    name: 'kanban',
    loader: () => loadDef('kanban'),
  })
  registerApi({
    registry,
    name: 'message',
    loader: () => loadDef('message'),
  })
  registerApi({
    registry,
    name: 'metering',
    loader: () => loadDef('metering'),
  })
  registerApi({
    registry,
    name: 'notes',
    loader: () => loadDef('notes'),
  })
  registerApi({
    registry,
    name: 'notification',
    loader: () => loadDef('notification'),
  })
  registerApi({
    registry,
    name: 'organization',
    loader: () => loadDef('organization'),
  })
  registerApi({
    registry,
    name: 'partnerDirectory',
    loader: () => loadDef('partner-directory'),
  })
  registerApi({
    registry,
    name: 'permissions',
    loader: () => loadDef('permissions'),
  })
  registerApi({
    registry,
    name: 'pricing',
    loader: () => loadDef('pricing'),
  })
  registerApi({
    registry,
    name: 'pricingTier',
    loader: () => loadDef('pricing-tier'),
  })
  registerApi({
    registry,
    name: 'purpose',
    loader: () => loadDef('purpose'),
  })
  registerApi({
    registry,
    name: 'sandbox',
    loader: () => loadDef('sandbox'),
  })
  registerApi({
    registry,
    name: 'submission',
    loader: () => loadDef('submission'),
  })
  registerApi({
    registry,
    name: 'targeting',
    loader: () => loadDef('targeting'),
  })
  registerApi({
    registry,
    name: 'templateVariables',
    loader: () => loadDef('template-variables'),
  })
  registerApi({
    registry,
    name: 'user',
    loader: () => loadDef('user'),
  })
  registerApi({
    registry,
    name: 'validationRules',
    loader: () => loadDef('validation-rules'),
  })
  registerApi({
    registry,
    name: 'webhooks',
    loader: () => loadDef('webhooks'),
  })
  registerApi({
    registry,
    name: 'workflow',
    loader: () => loadDef('workflow'),
  })
  registerApi({
    registry,
    name: 'workflowDefinition',
    loader: () => loadDef('workflow-definition'),
  })
}