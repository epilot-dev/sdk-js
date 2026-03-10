import type { OpenAPIV3 } from 'openapi-client-axios';
import { RESET, DIM } from './utils.js';

export type OperationChoice = {
  operationId: string;
  method: string;
  path: string;
  summary: string;
  description: string;
};

/**
 * Check if the current environment supports interactive prompts.
 */
export const isInteractive = (flags?: { interactive?: boolean }): boolean => {
  if (flags?.interactive === false) return false;
  return !!process.stdout.isTTY;
};

/**
 * Display an interactive operation picker using @inquirer/prompts.
 */
export const pickOperation = async (operations: OperationChoice[]): Promise<string> => {
  const { search } = await import('@inquirer/prompts');

  const choices = operations.map((op) => ({
    name: `${op.operationId} ${DIM}${op.method.toUpperCase()} ${op.path}${RESET}`,
    value: op.operationId,
    description: op.description,
  }));

  const result = await search({
    message: 'Select an operation (type to filter):',
    source: (input) => {
      if (!input) return choices;
      const term = input.toLowerCase();
      return choices.filter((c) => c.value.toLowerCase().includes(term) || c.name.toLowerCase().includes(term));
    },
    pageSize: 20,
  });

  return result;
};

/**
 * Prompt for a missing parameter value.
 */
export const promptParam = async (name: string, param: OpenAPIV3.ParameterObject): Promise<string> => {
  const { input } = await import('@inquirer/prompts');

  const schema = param.schema as OpenAPIV3.SchemaObject | undefined;
  const defaultValue = schema?.default != null ? String(schema.default) : undefined;

  const result = await input({
    message: `${name}${param.required ? ' (required)' : ''}:`,
    default: defaultValue,
    validate: (value) => {
      if (param.required && !value.trim()) {
        return `${name} is required`;
      }
      return true;
    },
  });

  return result;
};

/**
 * Prompt the user for a bearer token when none is configured.
 */
export const promptToken = async (): Promise<string | null> => {
  const { password } = await import('@inquirer/prompts');

  const token = await password({
    message: 'No token found. Paste a bearer token (or run `epilot auth login`):',
    mask: '*',
    validate: (value) => {
      if (!value.trim()) return 'Token is required';
      return true;
    },
  });

  return token || null;
};

/**
 * Print the operations list as a table (non-interactive).
 */
export const formatOperationsTable = (apiName: string, operations: OperationChoice[]): string => {
  const lines: string[] = [];
  for (const op of operations) {
    const desc = op.description ? ` – ${op.description}` : '';
    lines.push(`  ${op.operationId} ${DIM}${op.method.toUpperCase()} ${op.path}${desc}${RESET}`);
  }
  lines.push(`\nRun \`epilot ${apiName} <operationId> --help\` for details.\n`);
  return lines.join('\n');
};
