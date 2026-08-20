import { defineCommand } from 'citty';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { log, readManifest, writeManifest, type ManifestFunction } from './manifest.js';
import { validateScheduleExpression } from './schedule.js';

const NAME_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;

export default defineCommand({
  meta: {
    name: 'add-function',
    description: 'Add a server-side function (optionally scheduled) to the app',
  },
  args: {
    name: { type: 'positional', description: 'Function name (kebab-case)', required: true },
    type: {
      type: 'string',
      description:
        '"workflow" (selectable as flow action) or "scheduled" (cron per installation). Default: scheduled when --schedule is given, workflow otherwise',
    },
    schedule: {
      type: 'string',
      description:
        'Cron ("0 3 * * *") or rate ("rate(30 minutes)") expression to run the function once per installation',
    },
    label: { type: 'string', description: "Display name shown to org admins (e.g. in the installed app's functions summary)" },
    timezone: { type: 'string', description: 'IANA timezone for cron schedules (default: Europe/Berlin)' },
    path: { type: 'string', description: 'Path to manifest.json (default: manifest.json)' },
  },
  run: ({ args }) => {
    const name = args.name;
    if (!NAME_PATTERN.test(name)) {
      log.error(`Invalid function name "${name}" — use kebab-case (a-z, 0-9, dashes; max 64 chars)`);
      process.exit(1);
    }

    const fnType = (args.type ?? (args.schedule ? 'scheduled' : 'workflow')) as 'workflow' | 'scheduled';
    if (fnType !== 'workflow' && fnType !== 'scheduled') {
      log.error(`Invalid --type "${args.type}" — use "workflow" or "scheduled"`);
      process.exit(1);
    }
    if (fnType === 'scheduled' && !args.schedule) {
      log.error('Scheduled functions require --schedule (cron or rate expression)');
      process.exit(1);
    }
    if (fnType === 'workflow' && args.schedule) {
      log.error('Workflow functions cannot have a schedule — drop --schedule or use --type scheduled');
      process.exit(1);
    }

    if (args.schedule) {
      const result = validateScheduleExpression(args.schedule);
      if (!result.valid) {
        log.error(`Invalid schedule: ${result.error}`);
        process.exit(1);
      }
    }

    const manifestPath = resolve(args.path ?? 'manifest.json');
    const manifest = readManifest(manifestPath);
    const rootDir = resolve(manifestPath, '..');

    if (manifest.functions?.some((fn) => fn.name === name)) {
      log.error(`Function "${name}" already exists in the manifest`);
      process.exit(1);
    }

    const fnDir = join(rootDir, 'functions', name);
    if (existsSync(fnDir)) {
      log.error(`Directory already exists: ${fnDir}`);
      process.exit(1);
    }

    mkdirSync(join(fnDir, 'src'), { recursive: true });

    writeFileSync(
      join(fnDir, 'package.json'),
      `${JSON.stringify(
        {
          name,
          private: true,
          version: '0.0.1',
          type: 'module',
          scripts: { build: 'tsc', dev: 'tsx watch src/handler.ts' },
          devDependencies: { typescript: '~5.8.3', tsx: '^4.0.0' },
        },
        null,
        2,
      )}\n`,
    );

    writeFileSync(
      join(fnDir, 'tsconfig.json'),
      `${JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            lib: ['ES2022', 'DOM'],
            module: 'ESNext',
            moduleResolution: 'bundler',
            strict: true,
            rootDir: 'src',
            outDir: 'dist',
            esModuleInterop: true,
            skipLibCheck: true,
          },
          include: ['src'],
        },
        null,
        2,
      )}\n`,
    );

    writeFileSync(join(fnDir, 'src', 'handler.ts'), handlerTemplate(name, fnType, args.schedule));

    const fn: ManifestFunction = {
      name,
      type: fnType,
      ...(args.label ? { label: { de: args.label } } : {}),
      handler: `./functions/${name}/dist/handler.js`,
      ...(args.schedule ? { schedule: args.schedule } : {}),
      ...(args.timezone ? { schedule_timezone: args.timezone } : {}),
    };
    manifest.functions = [...(manifest.functions ?? []), fn];
    writeManifest(manifestPath, manifest);

    log.success(`Added ${fnType} function "${name}"`);
    log.info(`Code:     functions/${name}/src/handler.ts`);
    if (args.schedule) {
      log.info(`Schedule: ${args.schedule} (runs once per installation, max 60s per run)`);
    } else {
      log.info('Wire it into the flow builder with: epilot app add-component <name> --type CUSTOM_FLOW_ACTION_FUNCTION');
    }
    log.dim('Build with "npm run build", then "epilot app deploy"');
  },
});

const handlerTemplate = (
  name: string,
  fnType: 'workflow' | 'scheduled',
  schedule?: string,
): string => `// App function: ${name}
//${
  fnType === 'scheduled'
    ? `
// Runs automatically ${schedule?.startsWith('rate(') ? `every ${schedule.slice(5, -1)}` : `on "${schedule}"`} — once per installation,
// inside the epilot code-execution sandbox with a 60 second budget. Do a
// bounded amount of work per run; the next tick picks up the rest.`
    : `
// The code behind a flow action: reference it from a CUSTOM_FLOW_ACTION
// component ({ "type": "function", "function_name": "..." }). Runs inside the
// epilot code-execution sandbox with the triggering entity in \`input.entity\`.`
}
//
// Runtime contract:
//   - top-level \`async function handler(input, context)\` — no \`export\`.
//   - \`input.trigger\` → { type: '${fnType === 'scheduled' ? 'schedule' : 'workflow'}', ... }.${
  fnType === 'workflow'
    ? `
//   - \`input.entity\` → the entity the flow ran on.
//   - \`input.action_config\` → the action's configuration from the flow builder.`
    : `
//   - \`input.org_id\` / \`input.app_id\` → the installation this run belongs to.`
}
//   - \`context.epilot\` → the bundled @epilot/sdk, pre-authorized with the app token
//     (scoped to the app's permissions): \`await context.epilot.entity.searchEntities(...)\`.
//   - \`context.fetch\` → plain fetch, e.g. for the app's API proxy or non-prod stages
//     (derive base URLs from \`input.app_options.stage\`).
//   - \`input.app_options.token\` → the raw app token, if you need it for fetch calls.
//   - Return \`{ skip_reason }\` to skip, \`{ error_reason }\` to fail the run.

interface FunctionInput {
  trigger?: { type: string; schedule?: string; scheduled_time?: string };
  org_id?: string;
  app_id?: string;${
    fnType === 'workflow'
      ? `
  entity?: Record<string, unknown>;
  action_config?: Record<string, unknown>;`
      : ''
  }
  app_options?: { token?: string; stage?: string } & Record<string, unknown>;
}

interface FunctionContext {
  /** Bundled @epilot/sdk, pre-authorized — e.g. context.epilot.entity.searchEntities(...) */
  epilot: Record<string, any>;
  fetch: typeof fetch;
}

async function handler(input: FunctionInput, context: FunctionContext) {
  const token = input.app_options?.token;
  if (!token) {
    return { error_reason: 'Missing app token in execution context.' };
  }

  // TODO: implement your logic here
  console.log('${name} run', { trigger: input.trigger?.type, org: input.org_id });

  return { success: true };
}
`;
