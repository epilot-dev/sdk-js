import { runMain } from 'citty';
import { main } from '../src/index.js';
import { API_LIST } from '../src/generated/api-list.js';

declare const __CLI_VERSION__: string;
// tsup injects __CLI_VERSION__ at build time; fall back to package.json for dev (tsx)
const VERSION =
  typeof __CLI_VERSION__ !== 'undefined'
    ? __CLI_VERSION__
    : ((await import('../package.json', { with: { type: 'json' } })) as { default: { version: string } }).default
        .version;

const args = process.argv.slice(2);

// Handle `epilot --_completions <type> [api]` for shell autocomplete
const completionsIdx = args.indexOf('--_completions');
if (completionsIdx >= 0) {
  const { handleCompletions } = await import('../src/commands/completion.js');
  handleCompletions(args[completionsIdx + 1], args[completionsIdx + 2]);
  process.exit(0);
}

const hasHelp = args.includes('--help') || args.includes('-h');
const hasVersion = args.includes('--version') || args.includes('-V');
const hasNoSubcommand = args.filter((a) => !a.startsWith('-')).length === 0;

// Intercept root --version
if (hasVersion && hasNoSubcommand) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

// Intercept root --help (or no args at all) to show custom help instead of citty's auto-generated one
if (hasNoSubcommand && (hasHelp || args.length === 0)) {
  printRootHelp();
  process.exit(0);
}

// Intercept `epilot <api> <operationId> --help` before citty swallows it.
// citty handles --help itself and never calls our run(), so we strip it from
// argv and inject a sentinel flag that call.ts recognises.
if (hasHelp && args.length >= 2) {
  const apiArg = args.find((a) => !a.startsWith('-'));
  const isApi = apiArg && API_LIST.some((api) => api.kebabName === apiArg);

  if (isApi) {
    const positionals = args.filter((a) => !a.startsWith('-'));
    const operationId = positionals[1];

    if (operationId) {
      process.argv = [
        process.argv[0],
        process.argv[1],
        ...args.filter((a) => a !== '--help' && a !== '-h'),
        '--_ophelp',
      ];
    }
  }
}

runMain(main);

function printRootHelp() {
  const DIM = '\x1b[2m';
  const BOLD = '\x1b[1m';
  const CYAN = '\x1b[36m';
  const GREEN = '\x1b[32m';
  const YELLOW = '\x1b[33m';
  const R = '\x1b[0m';

  const w = (s: string) => process.stdout.write(s);

  w(`${BOLD}epilot${R} ${DIM}v${VERSION}${R} — CLI for epilot APIs\n`);
  w(`\n`);
  w(`${BOLD}USAGE${R}\n`);
  w(`  ${CYAN}epilot${R} <api> <operationId> [params...] [flags]\n`);
  w(`  ${CYAN}epilot${R} <api>                ${DIM}List operations for an API${R}\n`);
  w(`  ${CYAN}epilot${R} <api> <op> --help    ${DIM}Show operation details${R}\n`);
  w(`\n`);
  w(`${BOLD}FLAGS${R}\n`);
  w(`  ${GREEN}-t, --token${R} <token>     Bearer token for authentication\n`);
  w(`  ${GREEN}--profile${R} <name>        Use a named profile ${DIM}(or EPILOT_PROFILE)${R}\n`);
  w(`  ${GREEN}-s, --server${R} <url>      Override server base URL\n`);
  w(`  ${GREEN}--json${R}                  Output raw JSON (no formatting)\n`);
  w(`  ${GREEN}-v, --verbose${R}           Verbose output (show request details)\n`);
  w(`  ${GREEN}--jsonata${R} <expr>        JSONata expression to transform response\n`);
  w(`  ${GREEN}--no-interactive${R}        Disable interactive prompts\n`);
  w(`\n`);
  w(`${BOLD}PARAMETER FLAGS${R}\n`);
  w(`  ${GREEN}-p${R} key=value             Set a named parameter\n`);
  w(`  ${GREEN}-d${R} '{...}'               Request body JSON\n`);
  w(`  ${GREEN}-H${R} 'Key: Value'          Custom header\n`);
  w(`  ${GREEN}-i, --include${R}            Include response headers in output\n`);
  w(`\n`);
  w(`${BOLD}COMMANDS${R}\n`);
  w(`  ${CYAN}auth login${R}              Authenticate with epilot (browser)\n`);
  w(`  ${CYAN}auth token${R}              Store an API token directly\n`);
  w(`  ${CYAN}auth status${R}             Show authentication status\n`);
  w(`  ${CYAN}auth logout${R}             Remove stored credentials\n`);
  w(`  ${CYAN}profile${R}                 Manage named profiles\n`);
  w(`  ${CYAN}completion${R}              Generate shell completion scripts\n`);
  w(`  ${CYAN}upgrade${R}                 Upgrade to the latest version\n`);
  w(`\n`);
  w(`${BOLD}APIs${R}\n`);

  // Print APIs in columns
  const maxName = Math.max(...API_LIST.map((a) => a.kebabName.length));
  for (const api of API_LIST) {
    const padded = api.kebabName.padEnd(maxName + 2);
    w(`  ${CYAN}${padded}${R}${DIM}${api.title}${R}\n`);
  }

  w(`\n`);
  w(`${BOLD}EXAMPLES${R}\n`);
  w(`  ${YELLOW}$${R} epilot auth login\n`);
  w(`  ${YELLOW}$${R} epilot user getMeV2\n`);
  w(`  ${YELLOW}$${R} epilot entity getEntity contact abc123\n`);
  w(`  ${YELLOW}$${R} epilot entity searchEntities -d '{"q":"*"}'\n`);
  w(`  ${YELLOW}$${R} epilot entity searchEntities --jsonata 'results[0]._title'\n`);
  w(`  ${YELLOW}$${R} echo '{"q":"*"}' | epilot entity searchEntities\n`);
  w(`\n`);
  w(`Run ${CYAN}epilot <api>${R} to list available operations.\n`);
  w(`Run ${CYAN}epilot <api> <operationId> --help${R} for operation details.\n`);
}
