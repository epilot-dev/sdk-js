export interface Credentials {
  tokens: {
    id_token: string;
    access_token: string;
    refresh_token: string;
  };
  refresh(): Promise<void>;
  logout(): Promise<void>;
}
