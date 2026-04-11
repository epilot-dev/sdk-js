import type { Document } from 'openapi-client-axios';

import { expand } from '../compact';
import type { CompactDefinition } from '../compact';
import { registerApi } from '../registry';
import type { ApiEntry, ExtensionEntry } from '../types';

/* eslint-disable @typescript-eslint/no-require-imports */
const expandDef = (mod: { default?: unknown }): Document =>
  expand((mod.default ?? mod) as CompactDefinition) as Document;

export const registerBuiltinApis = (registry: Map<string, ApiEntry>) => {
  registerApi({
    registry,
    name: 'accessToken',
    loader: () => expandDef(require('../definitions/access-token-runtime.json')),
  });
  registerApi({
    registry,
    name: 'address',
    loader: () => expandDef(require('../definitions/address-runtime.json')),
  });
  registerApi({
    registry,
    name: 'addressSuggestions',
    loader: () => expandDef(require('../definitions/address-suggestions-runtime.json')),
  });
  registerApi({
    registry,
    name: 'aiAgents',
    loader: () => expandDef(require('../definitions/ai-agents-runtime.json')),
  });
  registerApi({
    registry,
    name: 'app',
    loader: () => expandDef(require('../definitions/app-runtime.json')),
  });
  registerApi({
    registry,
    name: 'auditLogs',
    loader: () => expandDef(require('../definitions/audit-logs-runtime.json')),
  });
  registerApi({
    registry,
    name: 'automation',
    loader: () => expandDef(require('../definitions/automation-runtime.json')),
  });
  registerApi({
    registry,
    name: 'billing',
    loader: () => expandDef(require('../definitions/billing-runtime.json')),
  });
  registerApi({
    registry,
    name: 'blueprintManifest',
    loader: () => expandDef(require('../definitions/blueprint-manifest-runtime.json')),
  });
  registerApi({
    registry,
    name: 'consent',
    loader: () => expandDef(require('../definitions/consent-runtime.json')),
  });
  registerApi({
    registry,
    name: 'customerPortal',
    loader: () => expandDef(require('../definitions/customer-portal-runtime.json')),
  });
  registerApi({
    registry,
    name: 'dashboard',
    loader: () => expandDef(require('../definitions/dashboard-runtime.json')),
  });
  registerApi({
    registry,
    name: 'dataGovernance',
    loader: () => expandDef(require('../definitions/data-governance-runtime.json')),
  });
  registerApi({
    registry,
    name: 'deduplication',
    loader: () => expandDef(require('../definitions/deduplication-runtime.json')),
  });
  registerApi({
    registry,
    name: 'design',
    loader: () => expandDef(require('../definitions/design-runtime.json')),
  });
  registerApi({
    registry,
    name: 'document',
    loader: () => expandDef(require('../definitions/document-runtime.json')),
  });
  registerApi({
    registry,
    name: 'emailSettings',
    loader: () => expandDef(require('../definitions/email-settings-runtime.json')),
  });
  registerApi({
    registry,
    name: 'emailTemplate',
    loader: () => expandDef(require('../definitions/email-template-runtime.json')),
  });
  registerApi({
    registry,
    name: 'entity',
    loader: () => expandDef(require('../definitions/entity-runtime.json')),
  });
  registerApi({
    registry,
    name: 'entityMapping',
    loader: () => expandDef(require('../definitions/entity-mapping-runtime.json')),
  });
  registerApi({
    registry,
    name: 'environments',
    loader: () => expandDef(require('../definitions/environments-runtime.json')),
  });
  registerApi({
    registry,
    name: 'erpIntegration',
    loader: () => expandDef(require('../definitions/erp-integration-runtime.json')),
  });
  registerApi({
    registry,
    name: 'eventCatalog',
    loader: () => expandDef(require('../definitions/event-catalog-runtime.json')),
  });
  registerApi({
    registry,
    name: 'file',
    loader: () => expandDef(require('../definitions/file-runtime.json')),
  });
  registerApi({
    registry,
    name: 'iban',
    loader: () => expandDef(require('../definitions/iban-runtime.json')),
  });
  registerApi({
    registry,
    name: 'journey',
    loader: () => expandDef(require('../definitions/journey-runtime.json')),
  });
  registerApi({
    registry,
    name: 'kanban',
    loader: () => expandDef(require('../definitions/kanban-runtime.json')),
  });
  registerApi({
    registry,
    name: 'message',
    loader: () => expandDef(require('../definitions/message-runtime.json')),
  });
  registerApi({
    registry,
    name: 'metering',
    loader: () => expandDef(require('../definitions/metering-runtime.json')),
  });
  registerApi({
    registry,
    name: 'notes',
    loader: () => expandDef(require('../definitions/notes-runtime.json')),
  });
  registerApi({
    registry,
    name: 'notification',
    loader: () => expandDef(require('../definitions/notification-runtime.json')),
  });
  registerApi({
    registry,
    name: 'organization',
    loader: () => expandDef(require('../definitions/organization-runtime.json')),
  });
  registerApi({
    registry,
    name: 'partnerDirectory',
    loader: () => expandDef(require('../definitions/partner-directory-runtime.json')),
  });
  registerApi({
    registry,
    name: 'permissions',
    loader: () => expandDef(require('../definitions/permissions-runtime.json')),
  });
  registerApi({
    registry,
    name: 'pricing',
    loader: () => expandDef(require('../definitions/pricing-runtime.json')),
  });
  registerApi({
    registry,
    name: 'pricingTier',
    loader: () => expandDef(require('../definitions/pricing-tier-runtime.json')),
  });
  registerApi({
    registry,
    name: 'purpose',
    loader: () => expandDef(require('../definitions/purpose-runtime.json')),
  });
  registerApi({
    registry,
    name: 'sandbox',
    loader: () => expandDef(require('../definitions/sandbox-runtime.json')),
  });
  registerApi({
    registry,
    name: 'sharing',
    loader: () => expandDef(require('../definitions/sharing-runtime.json')),
  });
  registerApi({
    registry,
    name: 'submission',
    loader: () => expandDef(require('../definitions/submission-runtime.json')),
  });
  registerApi({
    registry,
    name: 'targeting',
    loader: () => expandDef(require('../definitions/targeting-runtime.json')),
  });
  registerApi({
    registry,
    name: 'templateVariables',
    loader: () => expandDef(require('../definitions/template-variables-runtime.json')),
  });
  registerApi({
    registry,
    name: 'user',
    loader: () => expandDef(require('../definitions/user-runtime.json')),
  });
  registerApi({
    registry,
    name: 'validationRules',
    loader: () => expandDef(require('../definitions/validation-rules-runtime.json')),
  });
  registerApi({
    registry,
    name: 'webhooks',
    loader: () => expandDef(require('../definitions/webhooks-runtime.json')),
  });
  registerApi({
    registry,
    name: 'workflow',
    loader: () => expandDef(require('../definitions/workflow-runtime.json')),
  });
  registerApi({
    registry,
    name: 'workflowDefinition',
    loader: () => expandDef(require('../definitions/workflow-definition-runtime.json')),
  });
};

/**
 * Register non-API extensions (plain objects, not OpenAPI clients).
 * These are mounted on the SDK alongside API handles.
 */
export const registerBuiltinExtensions = (extensions: Map<string, ExtensionEntry>) => {
  // Journey Toolkit – factory functions, block utilities, export
  try {
    const journeySDK = require('@epilot/epilot-journey-sdk');
    extensions.set('journeyToolkit', {
      value: {
        // Factories
        createBlock: journeySDK.createBlock,
        createJourney: journeySDK.createJourney,
        createStep: journeySDK.createStep,
        createTextInput: journeySDK.createTextInput,
        createNumberInput: journeySDK.createNumberInput,
        createBinaryInput: journeySDK.createBinaryInput,
        createDatePicker: journeySDK.createDatePicker,
        createSingleChoice: journeySDK.createSingleChoice,
        createMultipleChoice: journeySDK.createMultipleChoice,
        createPersonalInformation: journeySDK.createPersonalInformation,
        createContact: journeySDK.createContact,
        createAddress: journeySDK.createAddress,
        createProductSelection: journeySDK.createProductSelection,
        createShoppingCart: journeySDK.createShoppingCart,
        createAvailabilityCheck: journeySDK.createAvailabilityCheck,
        createPVRoofPlanner: journeySDK.createPVRoofPlanner,
        createFileUpload: journeySDK.createFileUpload,
        createPaymentMethod: journeySDK.createPaymentMethod,
        createConsents: journeySDK.createConsents,
        createParagraph: journeySDK.createParagraph,
        createImage: journeySDK.createImage,
        createActionBar: journeySDK.createActionBar,
        createSuccessMessage: journeySDK.createSuccessMessage,
        createSummary: journeySDK.createSummary,
        // Block types
        ControlName: journeySDK.ControlName,
        BLOCK_CATALOG: journeySDK.BLOCK_CATALOG,
        // Utilities
        findBlock: journeySDK.findBlock,
        getStepBlocks: journeySDK.getStepBlocks,
        getAllBlocks: journeySDK.getAllBlocks,
        updateBlock: journeySDK.updateBlock,
        addBlock: journeySDK.addBlock,
        removeBlock: journeySDK.removeBlock,
        exportJourneyCode: journeySDK.exportJourneyCode,
        parseBlockValue: journeySDK.parseBlockValue,
        mergeBlockValue: journeySDK.mergeBlockValue,
        // Client constructor
        JourneyClient: journeySDK.JourneyClient,
      },
    });
  } catch {
    // @epilot/epilot-journey-sdk not installed — journeyToolkit won't be available
  }
};
