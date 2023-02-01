// eslint-disable-next-line @typescript-eslint/no-var-requires
const execSync = require('child_process').execSync;
/*
 * openapicmd wrapper to update client openapi files from client packages.
 *
 * npm usage: npm run openapi <path-to-openapi.yml>
 * direct usage: node ./update-openapi.js <default_source> <source> <output>
 */

const default_source = process.argv[2];
const input_source = process.argv[3];
const output_file = process.argv[4];

// </output> get server from default source
const server = execSync(`npx openapi read --json ${default_source}`).toString();
const serverURL = JSON.parse(server).servers[0].url;

// update client openapi file
execSync(
  `npx openapi read --json ${input_source || default_source} --server ${serverURL} > ${
    output_file || './src/openapi.json'
  }`,
  { stdio: 'inherit' },
);
