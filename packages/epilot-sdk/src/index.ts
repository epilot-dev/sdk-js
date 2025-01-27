import { authenticate, authorizeWithToken, UsernamePasswordAuthParams } from '@epilot/auth';
import { AxiosInstance } from 'axios';

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

    return this;
  }

  public async login(credentials: UsernamePasswordAuthParams) {
    const authorizer = await authenticate(credentials);

    authorizer.configureClient((this.entity as unknown) as AxiosInstance);
    authorizer.configureClient((this.pricing as unknown) as AxiosInstance);
    authorizer.configureClient((this.user as unknown) as AxiosInstance);
    authorizer.configureClient((this.file as unknown) as AxiosInstance);
    authorizer.configureClient((this.organization as unknown) as AxiosInstance);
    authorizer.configureClient((this.submission as unknown) as AxiosInstance);
    authorizer.configureClient((this.workflow as unknown) as AxiosInstance);
    authorizer.configureClient((this.permissions as unknown) as AxiosInstance);
    authorizer.configureClient((this.automation as unknown) as AxiosInstance);
    authorizer.configureClient((this.message as unknown) as AxiosInstance);
    authorizer.configureClient((this.emailSettings as unknown) as AxiosInstance);
    authorizer.configureClient((this.discussion as unknown) as AxiosInstance);
    authorizer.configureClient((this.notification as unknown) as AxiosInstance);
    authorizer.configureClient((this.emailTemplate as unknown) as AxiosInstance);
    authorizer.configureClient((this.templateVariables as unknown) as AxiosInstance);
    authorizer.configureClient((this.partner as unknown) as AxiosInstance);
    authorizer.configureClient((this.addressSuggestions as unknown) as AxiosInstance);
    authorizer.configureClient((this.blueprintManifest as unknown) as AxiosInstance);
    authorizer.configureClient((this.sandbox as unknown) as AxiosInstance);
    authorizer.configureClient((this.design as unknown) as AxiosInstance);
    authorizer.configureClient((this.auditLogs as unknown) as AxiosInstance);

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
