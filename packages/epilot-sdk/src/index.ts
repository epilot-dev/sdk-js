import { authenticate, authorizeWithToken, UsernamePasswordAuthParams } from '@epilot/auth';

import {
  default as automationClient,
  getClient as getAutomationClient,
  Client as AutomationClient,
} from './automation-client';
import {
  default as discussionClient,
  getClient as getDiscussionClient,
  Client as DiscussionClient,
} from './discussion-client';
import {
  default as emailSettingsClient,
  getClient as getEmailSettingsClient,
  Client as EmailSettingsClient,
} from './email-settings-client';
import {
  default as emailTemplateClient,
  getClient as getEmailTemplateClient,
  Client as EmailTemplateClient,
} from './email-template-client';
import { default as entityClient, getClient as getEntityClient, Client as EntityClient } from './entity-client';
import { default as fileClient, getClient as getFileClient, Client as FileClient } from './file-client';
import { default as messageClient, getClient as getMessageClient, Client as MessageClient } from './message-client';
import {
  default as notificationClient,
  getClient as getNotificationClient,
  Client as NotificationClient,
} from './notification-client';
import {
  default as organizationClient,
  getClient as getOrganizationClient,
  Client as OrganizationClient,
} from './organization-client';
import {
  default as partnerClient,
  getClient as getPartnerClient,
  Client as PartnerClient,
} from './partner-directory-client';
import {
  default as permissionsClient,
  getClient as getPermissionsClient,
  Client as PermissionsClient,
} from './permissions-client';
import { default as pricingClient, getClient as getPricingClient, Client as PricingClient } from './pricing-client';
import {
  default as submissionClient,
  getClient as getSubmissionClient,
  Client as SubmissionClient,
} from './submission-client';
import {
  default as templateVariablesClient,
  getClient as getTemplateVariablesClient,
  Client as TemplateVariablesClient,
} from './template-variables-client';
import { default as userClient, getClient as getUserClient, Client as UserClient } from './user-client';
import { default as workflowClient, getClient as getWorkflowClient, Client as WorkflowClient } from './workflow-client';

export class EpilotClient {
  entity: EntityClient = null;
  pricing: PricingClient = null;
  user: UserClient = null;
  file: FileClient = null;
  organization: OrganizationClient = null;
  submission: SubmissionClient = null;
  workflow: WorkflowClient = null;
  permissions: PermissionsClient = null;
  automation: AutomationClient = null;
  message: MessageClient = null;
  emailSettings: EmailSettingsClient = null;
  emailTemplate: EmailTemplateClient = null;
  discussion: DiscussionClient = null;
  notification: NotificationClient = null;
  templateVariables: TemplateVariablesClient = null;
  partner: PartnerClient = null;

  constructor() {
    this.entity = getEntityClient();
    this.pricing = getPricingClient();
    this.user = getUserClient();
    this.file = getFileClient();
    this.organization = getOrganizationClient();
    this.workflow = getWorkflowClient();
    this.permissions = getPermissionsClient();
    this.submission = getSubmissionClient();
    this.automation = getAutomationClient();
    this.message = getMessageClient();
    this.emailSettings = getEmailSettingsClient();
    this.discussion = getDiscussionClient();
    this.notification = getNotificationClient();
    this.emailTemplate = getEmailTemplateClient();
    this.templateVariables = getTemplateVariablesClient();
    this.partner = getPartnerClient();
  }

  public authorize(token: string) {
    this.entity = authorizeWithToken(this.entity, token);
    this.pricing = authorizeWithToken(this.pricing, token);
    this.user = authorizeWithToken(this.user, token);
    this.file = authorizeWithToken(this.file, token);
    this.organization = authorizeWithToken(this.organization, token);
    this.submission = authorizeWithToken(this.submission, token);
    this.workflow = authorizeWithToken(this.workflow, token);
    this.permissions = authorizeWithToken(this.permissions, token);
    this.automation = authorizeWithToken(this.automation, token);
    this.message = authorizeWithToken(this.message, token);
    this.emailSettings = authorizeWithToken(this.emailSettings, token);
    this.discussion = authorizeWithToken(this.discussion, token);
    this.notification = authorizeWithToken(this.notification, token);
    this.emailTemplate = authorizeWithToken(this.emailTemplate, token);
    this.templateVariables = authorizeWithToken(this.templateVariables, token);
    this.partner = authorizeWithToken(this.partner, token);

    return this;
  }

  public async login(credentials: UsernamePasswordAuthParams) {
    const authorizer = await authenticate(credentials);

    this.entity = authorizer.configureClient(this.entity);
    this.pricing = authorizer.configureClient(this.pricing);
    this.user = authorizer.configureClient(this.user);
    this.file = authorizer.configureClient(this.file);
    this.organization = authorizer.configureClient(this.organization);
    this.submission = authorizer.configureClient(this.submission);
    this.workflow = authorizer.configureClient(this.workflow);
    this.permissions = authorizer.configureClient(this.permissions);
    this.automation = authorizer.configureClient(this.automation);
    this.message = authorizer.configureClient(this.message);
    this.emailSettings = authorizer.configureClient(this.emailSettings);
    this.discussion = authorizer.configureClient(this.discussion);
    this.notification = authorizer.configureClient(this.notification);
    this.emailTemplate = authorizer.configureClient(this.emailTemplate);
    this.templateVariables = authorizer.configureClient(this.templateVariables);
    this.partner = authorizer.configureClient(this.partner);

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
