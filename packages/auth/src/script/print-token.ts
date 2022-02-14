#!/usr/bin/env node

import yargsInteractive from 'yargs-interactive';

import { authenticate } from '..';

yargsInteractive()
  .usage('$0 [args]')
  .interactive({
    interactive: { default: true },
    user: { type: 'input', describe: 'Email' },
    pass: { type: 'password', describe: 'Password' },
  })
  .then(async (result) => {
    try {
      const credentials = await authenticate({
        username: result.user,
        password: result.pass,
      });
      console.log(credentials?.tokens?.access_token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.message);
    }
  });
