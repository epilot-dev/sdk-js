import { defineCommand } from 'citty';
import { API_LIST } from '../generated/api-list.js';

const BASH_SCRIPT = `
_epilot_completions() {
  local cur prev words cword
  _init_completion || return

  # Get all words on the command line
  local cmd="\${COMP_WORDS[0]}"

  if [[ \${cword} -eq 1 ]]; then
    # First arg: subcommands (APIs + auth + profile + completion)
    COMPREPLY=( $(compgen -W "$(\${cmd} --_completions subcommands 2>/dev/null)" -- "\${cur}") )
    return
  fi

  if [[ \${cword} -eq 2 ]]; then
    # Second arg: operationIds for the given API
    local api="\${COMP_WORDS[1]}"
    COMPREPLY=( $(compgen -W "$(\${cmd} --_completions operations \${api} 2>/dev/null)" -- "\${cur}") )
    return
  fi

  # Flags
  if [[ "\${cur}" == -* ]]; then
    COMPREPLY=( $(compgen -W "--token --profile --server --json --verbose --interactive --no-interactive --jsonata --include --data --param --header --definition --help" -- "\${cur}") )
    return
  fi
}

complete -F _epilot_completions epilot
`.trim();

const ZSH_SCRIPT = `
#compdef epilot

_epilot() {
  local -a subcommands operations flags

  _arguments -C \\
    '1:api:->api' \\
    '2:operation:->operation' \\
    '*:flags:->flags'

  case "\$state" in
    api)
      subcommands=(\${(f)"$(epilot --_completions subcommands 2>/dev/null)"})
      _describe 'api' subcommands
      ;;
    operation)
      operations=(\${(f)"$(epilot --_completions operations \$words[2] 2>/dev/null)"})
      _describe 'operation' operations
      ;;
    flags)
      flags=(
        '--token[Bearer token]:token:'
        '--profile[Use a named profile]:profile:'
        '--server[Override server base URL]:url:'
        '--json[Output raw JSON]'
        '--verbose[Verbose output]'
        '--interactive[Interactive mode]'
        '--no-interactive[Disable interactive mode]'
        '--jsonata[JSONata expression]:expr:'
        '--include[Include response headers]'
        '-d[Request body JSON]:json:'
        '-p[Parameter key=value]:param:'
        '-H[Custom header]:header:'
        '--definition[Override OpenAPI spec]:file:_files'
        '--help[Show help]'
      )
      _arguments "\$flags[@]"
      ;;
  esac
}

_epilot
`.trim();

const FISH_SCRIPT = `
# Fish completions for epilot

# Disable file completions by default
complete -c epilot -f

# Subcommands (first arg)
complete -c epilot -n '__fish_use_subcommand' -a '(epilot --_completions subcommands 2>/dev/null)'

# Operations (second arg)
complete -c epilot -n '__fish_seen_subcommand_from (epilot --_completions subcommands 2>/dev/null)' \\
  -a '(epilot --_completions operations (commandline -opc)[2] 2>/dev/null)'

# Global flags
complete -c epilot -l token -s t -d 'Bearer token' -r
complete -c epilot -l profile -d 'Use a named profile' -r
complete -c epilot -l server -s s -d 'Override server base URL' -r
complete -c epilot -l json -d 'Output raw JSON'
complete -c epilot -l verbose -s v -d 'Verbose output'
complete -c epilot -l interactive -d 'Interactive mode'
complete -c epilot -l no-interactive -d 'Disable interactive mode'
complete -c epilot -l jsonata -d 'JSONata expression' -r
complete -c epilot -l include -s i -d 'Include response headers'
complete -c epilot -s d -d 'Request body JSON' -r
complete -c epilot -s p -d 'Parameter key=value' -r
complete -c epilot -s H -d 'Custom header' -r
complete -c epilot -l definition -d 'Override OpenAPI spec' -r -F
complete -c epilot -l help -d 'Show help'
`.trim();

/** Handle `epilot --_completions <type> [api]` for dynamic shell completions */
export const handleCompletions = (type: string, api?: string): void => {
  if (type === 'subcommands') {
    const names = API_LIST.map((a) => a.kebabName);
    names.push('auth', 'profile', 'completion');
    console.log(names.join('\n'));
    return;
  }

  if (type === 'operations' && api) {
    const info = API_LIST.find((a) => a.kebabName === api);
    if (info) {
      console.log(info.operationIds.join('\n'));
    }
    return;
  }
};

export default defineCommand({
  meta: { name: 'completion', description: 'Generate shell completion scripts' },
  args: {
    shell: {
      type: 'positional',
      description: 'Shell type: bash, zsh, or fish',
      required: false,
    },
  },
  run: ({ args }) => {
    const shell = args.shell || detectShell();

    switch (shell) {
      case 'bash':
        console.log(BASH_SCRIPT);
        console.log('\n# Add to your ~/.bashrc:');
        console.log('# eval "$(epilot completion bash)"');
        break;
      case 'zsh':
        console.log(ZSH_SCRIPT);
        console.log('\n# Add to your ~/.zshrc:');
        console.log('# eval "$(epilot completion zsh)"');
        break;
      case 'fish':
        console.log(FISH_SCRIPT);
        console.log('\n# Save to ~/.config/fish/completions/epilot.fish:');
        console.log('# epilot completion fish > ~/.config/fish/completions/epilot.fish');
        break;
      default:
        console.error(`Unknown shell: ${shell}. Supported: bash, zsh, fish`);
        process.exit(1);
    }
  },
});

const detectShell = (): string => {
  const shell = process.env.SHELL || '';
  if (shell.includes('zsh')) return 'zsh';
  if (shell.includes('fish')) return 'fish';
  return 'bash';
};
