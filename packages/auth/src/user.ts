import { getClient as getUserClient } from '@epilot/user-client';
import axios from 'axios';

import { config } from './config';

export const getLoginParametersForUser = async (params: { username: string }) => {
  try {
    const userClient = getUserClient();
    userClient.defaults.baseURL = userClient.defaults.baseURL ?? config.USER_API_URL;

    const loginParamsRes = await userClient.getUserLoginParametersV2({ username: params.username });
    const loginParams = loginParamsRes.data?.login_parameters?.[0];

    return {
      userPoolId: loginParams.cognito_user_pool_id,
      userPoolClientId: loginParams.cognito_user_pool_client_id,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.code === '404') {
      throw new Error('InvalidUser');
    }

    throw err;
  }
};
