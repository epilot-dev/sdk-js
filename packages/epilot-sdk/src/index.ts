import { authenticate, UsernamePasswordAuthParams } from '@epilot/auth';

import { default as entityClient, Client as EntityClient } from './entity-client';
import { default as fileClient, Client as FileClient } from './file-client';
import { default as organizationClient, Client as OrganizationClient } from './organization-client';
import { default as permissionsClient, Client as PermissionsClient } from './permissions-client';
import { default as pricingClient, Client as PricingClient } from './pricing-client';
import { default as submissionClient, Client as SubmissionClient } from './submission-client';
import { default as userClient, Client as UserClient } from './user-client';
import { default as workflowClient, Client as WorkflowClient } from './workflow-client';

export class EpilotClient {
  entity: EntityClient = null;
  pricing: PricingClient = null;
  user: UserClient = null;
  file: FileClient = null;
  organization: OrganizationClient = null;
  submission: SubmissionClient = null;
  workflow: WorkflowClient = null;
  permissions: PermissionsClient = null;

  async login(credentials: UsernamePasswordAuthParams) {
    const authorizer = await authenticate(credentials);

    this.entity = authorizer.configureClient(entityClient);
    this.pricing = authorizer.configureClient(pricingClient);
    this.user = authorizer.configureClient(userClient);
    this.file = authorizer.configureClient(fileClient);
    this.organization = authorizer.configureClient(organizationClient);
    this.submission = authorizer.configureClient(submissionClient);
    this.workflow = authorizer.configureClient(workflowClient);
    this.permissions = authorizer.configureClient(permissionsClient);

    return this;
  }
}

export default {
  buildClient: (authCredentials: UsernamePasswordAuthParams) => {
    return new EpilotClient().login(authCredentials);
  },
};

export { entityClient };
export { pricingClient };
export { userClient };
export { fileClient };
export { organizationClient };
export { submissionClient };
export { workflowClient };
export { permissionsClient };
