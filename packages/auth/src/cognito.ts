import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import { Credentials } from './types';

export interface UserPoolLoginParams {
  userPoolId: string;
  userPoolClientId: string;
  username: string;
  password: string;
}
export const loginToUserPool = async (params: UserPoolLoginParams): Promise<Credentials> => {
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: params.username,
    Pool: new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: params.userPoolId,
      ClientId: params.userPoolClientId,
    }),
  });

  try {
    const cognitoSession = await new Promise<AmazonCognitoIdentity.CognitoUserSession>((resolve, reject) =>
      cognitoUser.authenticateUser(
        new AmazonCognitoIdentity.AuthenticationDetails({
          Username: params.username,
          Password: params.password,
        }),
        { onSuccess: resolve, onFailure: reject },
      ),
    );

    return {
      tokens: {
        id_token: cognitoSession.getIdToken().getJwtToken(),
        access_token: cognitoSession.getAccessToken().getJwtToken(),
        refresh_token: cognitoSession.getRefreshToken().getToken(),
      },
      logout: async () => new Promise<void>((resolve) => cognitoUser.signOut(resolve)),
      refresh: async () =>
        new Promise<void>((resolve) => cognitoUser.refreshSession(cognitoSession.getRefreshToken(), resolve)),
    };
  } catch (err) {
    if (isCognitoError(err) && err.code === 'NotAuthorizedException') {
      throw new Error('InvalidPassword');
    }
    throw err;
  }
};

interface CognitoError extends Error {
  code: string;
}
const isCognitoError = (err: unknown): err is CognitoError => 'code' in (err as Error);
