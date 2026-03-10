import { runMain } from 'citty';
import { main } from '../src/index.js';
import { API_LIST } from '../src/generated/api-list.js';

const args = process.argv.slice(2);

// Handle `epilot --_completions <type> [api]` for shell autocomplete
const completionsIdx = args.indexOf('--_completions');
if (completionsIdx >= 0) {
  const { handleCompletions } = await import('../src/commands/completion.js');
  handleCompletions(args[completionsIdx + 1], args[completionsIdx + 2]);
  process.exit(0);
}

// Intercept `epilot <api> <operationId> --help` before citty swallows it.
// citty handles --help itself and never calls our run(), so we strip it from
// argv and inject a sentinel flag that call.ts recognises.
const hasHelp = args.includes('--help') || args.includes('-h');

if (hasHelp && args.length >= 2) {
  const apiArg = args.find((a) => !a.startsWith('-'));
  const isApi = apiArg && API_LIST.some((api) => api.kebabName === apiArg);

  if (isApi) {
    // Find the operationId (second non-flag positional)
    const positionals = args.filter((a) => !a.startsWith('-'));
    const operationId = positionals[1]; // e.g. "getEntity"

    if (operationId) {
      // Remove --help / -h so citty doesn't intercept it
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
