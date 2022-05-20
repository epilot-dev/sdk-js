import { authenticate, UsernamePasswordAuthParams } from '@epilot/auth';
import { getClient as getEntityClient, Client as EntityClient } from '@epilot/entity-client';
import { getClient as getFileClient, Client as FileClient } from '@epilot/file-client';
import { getClient as getOrganizationClient, Client as OrganizationClient } from '@epilot/organization-client';
import { getClient as getPricingClient, Client as PricingClient } from '@epilot/pricing-client';
import { getClient as getUserClient, Client as UserClient } from '@epilot/user-client';

export class EpilotClient {
  entity: EntityClient = null;
  pricing: PricingClient = null;
  user: UserClient = null;
  file: FileClient = null;
  organization: OrganizationClient = null;

  async login(credentials: UsernamePasswordAuthParams) {
    const authorizer = await authenticate(credentials);

    this.entity = authorizer.configureClient(getEntityClient());
    this.pricing = authorizer.configureClient(getPricingClient());
    this.user = authorizer.configureClient(getUserClient());
    this.file = authorizer.configureClient(getFileClient());
    this.organization = authorizer.configureClient(getOrganizationClient());

    return this;
  }
}

export default {
  buildClient: (authCredentials: UsernamePasswordAuthParams) => {
    return new EpilotClient().login(authCredentials);
  },
};
