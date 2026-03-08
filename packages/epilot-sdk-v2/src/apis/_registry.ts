import type { Document } from 'openapi-client-axios'

import { registerApi } from '../registry'
import type { ApiEntry } from '../types'

/* eslint-disable @typescript-eslint/no-require-imports */
const loadDef = (id: string): Document => {
  const mod = require(id)
  return (mod.default ?? mod) as unknown as Document
}

export const registerBuiltinApis = (registry: Map<string, ApiEntry>) => {
  registerApi({
    registry,
    name: 'accessToken',
    loader: () => loadDef('../definitions/access-token.json'),
  })
  registerApi({
    registry,
    name: 'address',
    loader: () => loadDef('../definitions/address.json'),
  })
  registerApi({
    registry,
    name: 'addressSuggestions',
    loader: () => loadDef('../definitions/address-suggestions.json'),
  })
  registerApi({
    registry,
    name: 'aiAgents',
    loader: () => loadDef('../definitions/ai-agents.json'),
  })
  registerApi({
    registry,
    name: 'app',
    loader: () => loadDef('../definitions/app.json'),
  })
  registerApi({
    registry,
    name: 'auditLogs',
    loader: () => loadDef('../definitions/audit-logs.json'),
  })
  registerApi({
    registry,
    name: 'automation',
    loader: () => loadDef('../definitions/automation.json'),
  })
  registerApi({
    registry,
    name: 'billing',
    loader: () => loadDef('../definitions/billing.json'),
  })
  registerApi({
    registry,
    name: 'blueprintManifest',
    loader: () => loadDef('../definitions/blueprint-manifest.json'),
  })
  registerApi({
    registry,
    name: 'consent',
    loader: () => loadDef('../definitions/consent.json'),
  })
  registerApi({
    registry,
    name: 'customerPortal',
    loader: () => loadDef('../definitions/customer-portal.json'),
  })
  registerApi({
    registry,
    name: 'dashboard',
    loader: () => loadDef('../definitions/dashboard.json'),
  })
  registerApi({
    registry,
    name: 'dataManagement',
    loader: () => loadDef('../definitions/data-management.json'),
  })
  registerApi({
    registry,
    name: 'deduplication',
    loader: () => loadDef('../definitions/deduplication.json'),
  })
  registerApi({
    registry,
    name: 'design',
    loader: () => loadDef('../definitions/design.json'),
  })
  registerApi({
    registry,
    name: 'document',
    loader: () => loadDef('../definitions/document.json'),
  })
  registerApi({
    registry,
    name: 'emailSettings',
    loader: () => loadDef('../definitions/email-settings.json'),
  })
  registerApi({
    registry,
    name: 'emailTemplate',
    loader: () => loadDef('../definitions/email-template.json'),
  })
  registerApi({
    registry,
    name: 'entity',
    loader: () => loadDef('../definitions/entity.json'),
  })
  registerApi({
    registry,
    name: 'entityMapping',
    loader: () => loadDef('../definitions/entity-mapping.json'),
  })
  registerApi({
    registry,
    name: 'environments',
    loader: () => loadDef('../definitions/environments.json'),
  })
  registerApi({
    registry,
    name: 'erpIntegration',
    loader: () => loadDef('../definitions/erp-integration.json'),
  })
  registerApi({
    registry,
    name: 'eventCatalog',
    loader: () => loadDef('../definitions/event-catalog.json'),
  })
  registerApi({
    registry,
    name: 'file',
    loader: () => loadDef('../definitions/file.json'),
  })
  registerApi({
    registry,
    name: 'iban',
    loader: () => loadDef('../definitions/iban.json'),
  })
  registerApi({
    registry,
    name: 'journey',
    loader: () => loadDef('../definitions/journey.json'),
  })
  registerApi({
    registry,
    name: 'kanban',
    loader: () => loadDef('../definitions/kanban.json'),
  })
  registerApi({
    registry,
    name: 'message',
    loader: () => loadDef('../definitions/message.json'),
  })
  registerApi({
    registry,
    name: 'metering',
    loader: () => loadDef('../definitions/metering.json'),
  })
  registerApi({
    registry,
    name: 'notes',
    loader: () => loadDef('../definitions/notes.json'),
  })
  registerApi({
    registry,
    name: 'notification',
    loader: () => loadDef('../definitions/notification.json'),
  })
  registerApi({
    registry,
    name: 'organization',
    loader: () => loadDef('../definitions/organization.json'),
  })
  registerApi({
    registry,
    name: 'partnerDirectory',
    loader: () => loadDef('../definitions/partner-directory.json'),
  })
  registerApi({
    registry,
    name: 'permissions',
    loader: () => loadDef('../definitions/permissions.json'),
  })
  registerApi({
    registry,
    name: 'pricing',
    loader: () => loadDef('../definitions/pricing.json'),
  })
  registerApi({
    registry,
    name: 'pricingTier',
    loader: () => loadDef('../definitions/pricing-tier.json'),
  })
  registerApi({
    registry,
    name: 'purpose',
    loader: () => loadDef('../definitions/purpose.json'),
  })
  registerApi({
    registry,
    name: 'sandbox',
    loader: () => loadDef('../definitions/sandbox.json'),
  })
  registerApi({
    registry,
    name: 'submission',
    loader: () => loadDef('../definitions/submission.json'),
  })
  registerApi({
    registry,
    name: 'targeting',
    loader: () => loadDef('../definitions/targeting.json'),
  })
  registerApi({
    registry,
    name: 'templateVariables',
    loader: () => loadDef('../definitions/template-variables.json'),
  })
  registerApi({
    registry,
    name: 'user',
    loader: () => loadDef('../definitions/user.json'),
  })
  registerApi({
    registry,
    name: 'validationRules',
    loader: () => loadDef('../definitions/validation-rules.json'),
  })
  registerApi({
    registry,
    name: 'webhooks',
    loader: () => loadDef('../definitions/webhooks.json'),
  })
  registerApi({
    registry,
    name: 'workflow',
    loader: () => loadDef('../definitions/workflow.json'),
  })
  registerApi({
    registry,
    name: 'workflowDefinition',
    loader: () => loadDef('../definitions/workflow-definition.json'),
  })
}