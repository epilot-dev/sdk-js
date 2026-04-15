import { defineCommand } from 'citty';
import { getStage, setStage } from '../lib/profiles.js';
import { BOLD, RESET, GREEN, RED, DIM, YELLOW } from '../lib/utils.js';

const VALID_STAGES = ['prod', 'dev', 'staging'] as const;

const CONFIG_KEYS = {
  stage: {
    get: () => getStage() ?? 'prod',
    set: (value: string) => {
      if (!VALID_STAGES.includes(value as (typeof VALID_STAGES)[number])) {
        process.stderr.write(`${RED}Invalid stage "${value}". Must be one of: ${VALID_STAGES.join(', ')}${RESET}\n`);
        process.exit(1);
      }
      setStage(value === 'prod' ? undefined : value);
    },
  },
} as const;

export default defineCommand({
  meta: {
    name: 'config',
    description: 'Manage CLI configuration',
  },
  subCommands: {
    get: defineCommand({
      meta: { name: 'get', description: 'Get a config value' },
      args: {
        key: { type: 'positional', description: 'Config key', required: true },
      },
      run: ({ args }) => {
        const handler = CONFIG_KEYS[args.key as keyof typeof CONFIG_KEYS];
        if (!handler) {
          process.stderr.write(`${RED}Unknown config key "${args.key}".${RESET}\n`);
          process.stderr.write(`Available keys: ${Object.keys(CONFIG_KEYS).join(', ')}\n`);
          process.exit(1);
        }
        process.stdout.write(`${handler.get()}\n`);
      },
    }),

    set: defineCommand({
      meta: { name: 'set', description: 'Set a config value' },
      args: {
        key: { type: 'positional', description: 'Config key', required: true },
        value: { type: 'positional', description: 'Config value', required: true },
      },
      run: ({ args }) => {
        const handler = CONFIG_KEYS[args.key as keyof typeof CONFIG_KEYS];
        if (!handler) {
          process.stderr.write(`${RED}Unknown config key "${args.key}".${RESET}\n`);
          process.stderr.write(`Available keys: ${Object.keys(CONFIG_KEYS).join(', ')}\n`);
          process.exit(1);
        }
        handler.set(args.value);
        process.stdout.write(`${GREEN}Set ${BOLD}${args.key}${RESET}${GREEN} = ${args.value}${RESET}\n`);
      },
    }),

    list: defineCommand({
      meta: { name: 'list', description: 'List all config values' },
      run: () => {
        process.stdout.write(`${BOLD}stage${RESET}  ${DIM}=${RESET}  ${getStage() ?? 'prod'}  ${DIM}(${YELLOW}prod${DIM} | dev | staging)${RESET}\n`);
      },
    }),
  },
});
