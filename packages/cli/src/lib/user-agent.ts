declare const __CLI_VERSION__: string;

/**
 * Identifies the CLI to epilot backends (e.g. `epilot-cli/0.1.133`) so API
 * access logs can attribute traffic to the CLI and its version. tsup injects
 * __CLI_VERSION__ at build time; 'dev' covers running from source via tsx.
 */
export const CLI_USER_AGENT = `epilot-cli/${typeof __CLI_VERSION__ !== 'undefined' ? __CLI_VERSION__ : 'dev'}`;
