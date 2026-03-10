import { defineCommand } from 'citty';
import { listProfiles, upsertProfile, deleteProfile, setActiveProfile, loadProfiles } from '../lib/profiles.js';
import { BOLD, RESET, GREEN, RED, DIM } from '../lib/utils.js';

export default defineCommand({
  meta: {
    name: 'profile',
    description: 'Manage profiles (server URLs, tokens, environments)',
  },
  subCommands: {
    list: defineCommand({
      meta: { name: 'list', description: 'List all profiles' },
      run: () => {
        const profiles = listProfiles();
        if (profiles.length === 0) {
          process.stdout.write(`No profiles configured.\n`);
          process.stdout.write(`Run ${BOLD}epilot profile create <name>${RESET} to create one.\n`);
          return;
        }
        for (const { name, profile, active } of profiles) {
          const marker = active ? `${GREEN}* ${RESET}` : '  ';
          const server = profile.server ? ` ${DIM}server=${profile.server}${RESET}` : '';
          const token = profile.token ? ` ${DIM}token=***${RESET}` : '';
          const org = profile.org_id ? ` ${DIM}org=${profile.org_id}${RESET}` : '';
          process.stdout.write(`${marker}${BOLD}${name}${RESET}${server}${token}${org}\n`);
        }
      },
    }),

    create: defineCommand({
      meta: { name: 'create', description: 'Create or update a profile' },
      args: {
        name: { type: 'positional', description: 'Profile name', required: true },
        server: { type: 'string', alias: 's', description: 'Server base URL' },
        token: { type: 'string', alias: 't', description: 'Bearer token' },
      },
      run: ({ args }) => {
        upsertProfile(args.name, {
          name: args.name,
          server: args.server,
          token: args.token,
        });
        process.stdout.write(`${GREEN}Profile "${args.name}" saved.${RESET}\n`);
      },
    }),

    use: defineCommand({
      meta: { name: 'use', description: 'Set the active profile' },
      args: {
        name: { type: 'positional', description: 'Profile name', required: true },
      },
      run: ({ args }) => {
        if (setActiveProfile(args.name)) {
          process.stdout.write(`${GREEN}Active profile set to "${args.name}".${RESET}\n`);
        } else {
          process.stderr.write(`${RED}Profile "${args.name}" not found.${RESET}\n`);
          process.exit(1);
        }
      },
    }),

    show: defineCommand({
      meta: { name: 'show', description: 'Show details of a profile' },
      args: {
        name: { type: 'positional', description: 'Profile name', required: true },
      },
      run: ({ args }) => {
        const config = loadProfiles();
        const profile = config.profiles[args.name];
        if (!profile) {
          process.stderr.write(`${RED}Profile "${args.name}" not found.${RESET}\n`);
          process.exit(1);
        }
        const active = config.active === args.name;
        process.stdout.write(`${BOLD}${args.name}${RESET}${active ? ` ${GREEN}(active)${RESET}` : ''}\n`);
        if (profile.server) process.stdout.write(`  Server:  ${profile.server}\n`);
        if (profile.token) process.stdout.write(`  Token:   ${profile.token.substring(0, 20)}...\n`);
        if (profile.org_id) process.stdout.write(`  Org:     ${profile.org_id}\n`);
        if (profile.user_id) process.stdout.write(`  User:    ${profile.user_id}\n`);
        if (profile.expires_at) process.stdout.write(`  Expires: ${profile.expires_at}\n`);
        if (profile.headers) {
          process.stdout.write(`  Headers:\n`);
          for (const [k, v] of Object.entries(profile.headers)) {
            process.stdout.write(`    ${k}: ${v}\n`);
          }
        }
      },
    }),

    delete: defineCommand({
      meta: { name: 'delete', description: 'Delete a profile' },
      args: {
        name: { type: 'positional', description: 'Profile name', required: true },
      },
      run: ({ args }) => {
        if (deleteProfile(args.name)) {
          process.stdout.write(`${GREEN}Profile "${args.name}" deleted.${RESET}\n`);
        } else {
          process.stderr.write(`${RED}Profile "${args.name}" not found.${RESET}\n`);
          process.exit(1);
        }
      },
    }),
  },
});
