import type { AxiosInstance } from 'openapi-client-axios';

export interface Credentials {
  /**
   * Currently active OAuth tokens
   */
  tokens: OAuthTokens;
  /**
   * Refresh tokens
   */
  refresh(): Promise<void>;
  /**
   * Revoke tokens and sign out
   */
  logout(): Promise<void>;
  /**
   * Configures an axios instance to pass oauth tokens
   */
  configureClient: <T extends AxiosInstance>(client: T) => T;
}

export interface OAuthTokens {
  id_token: string;
  access_token: string;
  refresh_token: string;
}
