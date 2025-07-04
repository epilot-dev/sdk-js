import { authenticate, authorizeWithToken, UsernamePasswordAuthParams } from '@epilot/auth';

import { default as accessTokenClient, getClient as getAccessTokenClient } from './access-token-client';
import {
  default as addressSuggestionsClient,
  getClient as getAddressSuggestionsClient,
} from './address-suggestions-client';
import { default as auditLogsClient, getClient as getAuditLogsClient } from './audit-logs-client';
import { default as automationClient, getClient as getAutomationClient } from './automation-client';
import {
  default as blueprintManifestClient,
  getClient as getBlueprintManifestClient,
} from './blueprint-manifest-client';
import { default as designClient, getClient as getDesignClient } from './design-client';
import { default as discussionClient, getClient as getDiscussionClient } from './discussion-client';
import { default as emailSettingsClient, getClient as getEmailSettingsClient } from './email-settings-client';
import { default as emailTemplateClient, getClient as getEmailTemplateClient } from './email-template-client';
import { default as entityClient, getClient as getEntityClient } from './entity-client';
import { default as fileClient, getClient as getFileClient } from './file-client';
import { default as messageClient, getClient as getMessageClient } from './message-client';
import { default as notificationClient, getClient as getNotificationClient } from './notification-client';
import { default as organizationClient, getClient as getOrganizationClient } from './organization-client';
import { default as partnerClient, getClient as getPartnerClient } from './partner-directory-client';
import { default as permissionsClient, getClient as getPermissionsClient } from './permissions-client';
import { default as pricingClient, getClient as getPricingClient } from './pricing-client';
import { default as sandboxClient, getClient as getSandboxClient } from './sandbox-client';
import { default as submissionClient, getClient as getSubmissionClient } from './submission-client';
import {
  default as templateVariablesClient,
  getClient as getTemplateVariablesClient,
} from './template-variables-client';
import { default as userClient, getClient as getUserClient } from './user-client';
import { default as workflowClient, getClient as getWorkflowClient } from './workflow-client';

export class EpilotClient {
  get entity() {
    return getEntityClient();
  }
  get pricing() {
    return getPricingClient();
  }
  get user() {
    return getUserClient();
  }
  get file() {
    return getFileClient();
  }
  get organization() {
    return getOrganizationClient();
  }
  get submission() {
    return getSubmissionClient();
  }
  get workflow() {
    return getWorkflowClient();
  }
  get permissions() {
    return getPermissionsClient();
  }
  get automation() {
    return getAutomationClient();
  }
  get message() {
    return getMessageClient();
  }
  get emailSettings() {
    return getEmailSettingsClient();
  }
  get discussion() {
    return getDiscussionClient();
  }
  get notification() {
    return getNotificationClient();
  }
  get emailTemplate() {
    return getEmailTemplateClient();
  }
  get templateVariables() {
    return getTemplateVariablesClient();
  }
  get partner() {
    return getPartnerClient();
  }
  get addressSuggestions() {
    return getAddressSuggestionsClient();
  }
  get blueprintManifest() {
    return getBlueprintManifestClient();
  }
  get sandbox() {
    return getSandboxClient();
  }
  get design() {
    return getDesignClient();
  }
  get auditLogs() {
    return getAuditLogsClient();
  }
  get accessToken() {
    return getAccessTokenClient();
  }

  public authorize(token: string) {
    authorizeWithToken(this.entity, token);
    authorizeWithToken(this.pricing, token);
    authorizeWithToken(this.user, token);
    authorizeWithToken(this.file, token);
    authorizeWithToken(this.organization, token);
    authorizeWithToken(this.submission, token);
    authorizeWithToken(this.workflow, token);
    authorizeWithToken(this.permissions, token);
    authorizeWithToken(this.automation, token);
    authorizeWithToken(this.message, token);
    authorizeWithToken(this.emailSettings, token);
    authorizeWithToken(this.discussion, token);
    authorizeWithToken(this.notification, token);
    authorizeWithToken(this.emailTemplate, token);
    authorizeWithToken(this.templateVariables, token);
    authorizeWithToken(this.partner, token);
    authorizeWithToken(this.addressSuggestions, token);
    authorizeWithToken(this.blueprintManifest, token);
    authorizeWithToken(this.sandbox, token);
    authorizeWithToken(this.design, token);
    authorizeWithToken(this.auditLogs, token);
    authorizeWithToken(this.accessToken, token);

    return this;
  }

  public async login(credentials: UsernamePasswordAuthParams) {
    const authorizer = await authenticate(credentials);

    authorizer.configureClient(this.entity);
    authorizer.configureClient(this.pricing);
    authorizer.configureClient(this.user);
    authorizer.configureClient(this.file);
    authorizer.configureClient(this.organization);
    authorizer.configureClient(this.submission);
    authorizer.configureClient(this.workflow);
    authorizer.configureClient(this.permissions);
    authorizer.configureClient(this.automation);
    authorizer.configureClient(this.message);
    authorizer.configureClient(this.emailSettings);
    authorizer.configureClient(this.discussion);
    authorizer.configureClient(this.notification);
    authorizer.configureClient(this.emailTemplate);
    authorizer.configureClient(this.templateVariables);
    authorizer.configureClient(this.partner);
    authorizer.configureClient(this.addressSuggestions);
    authorizer.configureClient(this.blueprintManifest);
    authorizer.configureClient(this.sandbox);
    authorizer.configureClient(this.design);
    authorizer.configureClient(this.auditLogs);
    authorizer.configureClient(this.accessToken);

    return this;
  }
}

export default EpilotClient;

export { entityClient };
export { pricingClient };
export { userClient };
export { fileClient };
export { organizationClient };
export { submissionClient };
export { workflowClient };
export { permissionsClient };
export { automationClient };
export { messageClient };
export { emailSettingsClient };
export { discussionClient };
export { notificationClient };
export { emailTemplateClient };
export { templateVariablesClient };
export { partnerClient };
export { addressSuggestionsClient };
export { blueprintManifestClient };
export { sandboxClient };
export { designClient };
export { auditLogsClient };
export { accessTokenClient };
