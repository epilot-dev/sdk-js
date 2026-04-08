import { defineCommand } from 'citty';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineCommand({
  meta: {
    name: 'blueprint-test',
    description: 'Validate a blueprint for common issues (ZIP file, JSON file, or blueprint manifest)',
  },
  args: {
    file: {
      type: 'positional',
      description: 'Path to blueprint .zip or .json file',
      required: true,
    },
    rules: {
      type: 'string',
      description: 'Comma-separated list of rules to run (default: all)',
    },
    severity: {
      type: 'string',
      description: 'Minimum severity to report: error, warning, info (default: info)',
    },
    json: {
      type: 'boolean',
      description: 'Output as JSON',
    },
    'source-org-id': {
      type: 'string',
      description: 'Source org ID to flag specifically',
    },
    'known-safe-uuids': {
      type: 'string',
      description: 'Comma-separated UUIDs to skip in dangling check',
    },
  },
  async run({ args }) {
    const { validateBlueprint, formatReport, formatReportJson } = await import(
      '@epilot/blueprint-tester'
    );

    const filePath = resolve(args.file as string);
    let input: Buffer | string;

    if (filePath.endsWith('.json')) {
      // Pass the file path — the adapter handles JSON parsing
      input = filePath;
    } else {
      // ZIP file — read as buffer
      input = readFileSync(filePath);
    }

    const report = await validateBlueprint(input, {
      rules: args.rules ? (args.rules as string).split(',') : undefined,
      severity: args.severity as 'error' | 'warning' | 'info' | undefined,
      sourceOrgId: args['source-org-id'] as string | undefined,
      knownSafeUuids: args['known-safe-uuids']
        ? (args['known-safe-uuids'] as string).split(',')
        : undefined,
    });

    if (args.json) {
      process.stdout.write(formatReportJson(report) + '\n');
    } else {
      process.stdout.write(formatReport(report));
    }

    process.exitCode = report.valid ? 0 : 1;
  },
});
