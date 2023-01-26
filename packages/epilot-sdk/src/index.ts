import { authenticate, authorizeWithToken, UsernamePasswordAuthParams } from '@epilot/auth';

import {
  default as automationClient,
  createClient as createAutomationClient,
  Client as AutomationClient,
} from './automation-client';
import {
  default as discussionClient,
  createClient as createDiscussionClient,
  Client as DiscussionClient,
} from './discussion-client';
import {
  default as emailSettingsClient,
  createClient as createEmailSettingsClient,
  Client as EmailSettingsClient,
} from './email-settings-client';
import {
  default as emailTemplateClient,
  createClient as createEmailTemplateClient,
  Client as EmailTemplateClient,
} from './email-template-client';
import { default as entityClient, createClient as createEntityClient, Client as EntityClient } from './entity-client';
import { default as fileClient, createClient as createFileClient, Client as FileClient } from './file-client';
import {
  default as messageClient,
  createClient as createMessageClient,
  Client as MessageClient,
} from './message-client';
import {
  default as notificationClient,
  createClient as createNotificationClient,
  Client as NotificationClient,
} from './notification-client';
import {
  default as organizationClient,
  createClient as createOrganizationClient,
  Client as OrganizationClient,
} from './organization-client';
import {
  default as partnerClient,
  createClient as createPartnerClient,
  Client as PartnerClient,
} from './partner-directory-client';
import {
  default as permissionsClient,
  createClient as createPermissionsClient,
  Client as PermissionsClient,
} from './permissions-client';
import {
  default as pricingClient,
  createClient as createPricingClient,
  Client as PricingClient,
} from './pricing-client';
import {
  default as submissionClient,
  createClient as createSubmissionClient,
  Client as SubmissionClient,
} from './submission-client';
import {
  default as templateVariablesClient,
  createClient as createTemplateVariablesClient,
  Client as TemplateVariablesClient,
} from './template-variables-client';
import { default as userClient, createClient as createUserClient, Client as UserClient } from './user-client';
import {
  default as workflowClient,
  createClient as createWorkflowClient,
  Client as WorkflowClient,
} from './workflow-client';

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
    this.entity = createEntityClient();
    this.pricing = createPricingClient();
    this.user = createUserClient();
    this.file = createFileClient();
    this.organization = createOrganizationClient();
    this.workflow = createWorkflowClient();
    this.permissions = createPermissionsClient();
    this.submission = createSubmissionClient();
    this.automation = createAutomationClient();
    this.message = createMessageClient();
    this.emailSettings = createEmailSettingsClient();
    this.discussion = createDiscussionClient();
    this.notification = createNotificationClient();
    this.emailTemplate = createEmailTemplateClient();
    this.templateVariables = createTemplateVariablesClient();
    this.partner = createPartnerClient();
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
