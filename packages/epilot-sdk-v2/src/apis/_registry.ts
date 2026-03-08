import type { Document } from 'openapi-client-axios';

import { registerApi } from '../registry';
import type { ApiEntry } from '../types';

export const registerBuiltinApis = (registry: Map<string, ApiEntry>) => {
  registerApi({
    registry,
    name: 'accessToken',
    loader: async () => {
      const mod = await import('../definitions/access-token.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'address',
    loader: async () => {
      const mod = await import('../definitions/address.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'addressSuggestions',
    loader: async () => {
      const mod = await import('../definitions/address-suggestions.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'aiAgents',
    loader: async () => {
      const mod = await import('../definitions/ai-agents.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'app',
    loader: async () => {
      const mod = await import('../definitions/app.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'auditLogs',
    loader: async () => {
      const mod = await import('../definitions/audit-logs.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'automation',
    loader: async () => {
      const mod = await import('../definitions/automation.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'billing',
    loader: async () => {
      const mod = await import('../definitions/billing.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'blueprintManifest',
    loader: async () => {
      const mod = await import('../definitions/blueprint-manifest.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'consent',
    loader: async () => {
      const mod = await import('../definitions/consent.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'customerPortal',
    loader: async () => {
      const mod = await import('../definitions/customer-portal.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'dataManagement',
    loader: async () => {
      const mod = await import('../definitions/data-management.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'deduplication',
    loader: async () => {
      const mod = await import('../definitions/deduplication.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'design',
    loader: async () => {
      const mod = await import('../definitions/design.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'document',
    loader: async () => {
      const mod = await import('../definitions/document.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'emailSettings',
    loader: async () => {
      const mod = await import('../definitions/email-settings.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'emailTemplate',
    loader: async () => {
      const mod = await import('../definitions/email-template.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'entity',
    loader: async () => {
      const mod = await import('../definitions/entity.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'entityMapping',
    loader: async () => {
      const mod = await import('../definitions/entity-mapping.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'environments',
    loader: async () => {
      const mod = await import('../definitions/environments.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'erpIntegration',
    loader: async () => {
      const mod = await import('../definitions/erp-integration.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'eventCatalog',
    loader: async () => {
      const mod = await import('../definitions/event-catalog.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'file',
    loader: async () => {
      const mod = await import('../definitions/file.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'iban',
    loader: async () => {
      const mod = await import('../definitions/iban.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'journey',
    loader: async () => {
      const mod = await import('../definitions/journey.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'kanban',
    loader: async () => {
      const mod = await import('../definitions/kanban.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'message',
    loader: async () => {
      const mod = await import('../definitions/message.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'metering',
    loader: async () => {
      const mod = await import('../definitions/metering.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'notes',
    loader: async () => {
      const mod = await import('../definitions/notes.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'notification',
    loader: async () => {
      const mod = await import('../definitions/notification.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'organization',
    loader: async () => {
      const mod = await import('../definitions/organization.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'partnerDirectory',
    loader: async () => {
      const mod = await import('../definitions/partner-directory.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'permissions',
    loader: async () => {
      const mod = await import('../definitions/permissions.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'pricing',
    loader: async () => {
      const mod = await import('../definitions/pricing.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'pricingTier',
    loader: async () => {
      const mod = await import('../definitions/pricing-tier.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'purpose',
    loader: async () => {
      const mod = await import('../definitions/purpose.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'sandbox',
    loader: async () => {
      const mod = await import('../definitions/sandbox.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'submission',
    loader: async () => {
      const mod = await import('../definitions/submission.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'targeting',
    loader: async () => {
      const mod = await import('../definitions/targeting.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'templateVariables',
    loader: async () => {
      const mod = await import('../definitions/template-variables.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'user',
    loader: async () => {
      const mod = await import('../definitions/user.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'validationRules',
    loader: async () => {
      const mod = await import('../definitions/validation-rules.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'webhooks',
    loader: async () => {
      const mod = await import('../definitions/webhooks.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'workflow',
    loader: async () => {
      const mod = await import('../definitions/workflow.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
  registerApi({
    registry,
    name: 'workflowDefinition',
    loader: async () => {
      const mod = await import('../definitions/workflow-definition.json');
      return (mod.default ?? mod) as unknown as Document;
    },
  });
};
