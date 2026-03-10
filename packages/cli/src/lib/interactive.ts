import type { OpenAPIV3 } from 'openapi-client-axios';
import { methodColor, RESET, DIM } from './utils.js';

export type OperationChoice = {
  operationId: string;
  method: string;
  path: string;
  summary: string;
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
  const { select } = await import('@inquirer/prompts');

  const result = await select({
    message: 'Select an operation:',
    choices: operations.map((op) => ({
      name: `${op.method.padEnd(7)} ${op.path} ${DIM}${op.summary}${RESET}`,
      value: op.operationId,
      description: op.operationId,
    })),
    pageSize: 20,
  });

  return result;
};

/**
 * Prompt for a missing parameter value.
 */
export const promptParam = async (
  name: string,
  param: OpenAPIV3.ParameterObject,
): Promise<string> => {
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
 * Print the operations list as a table (non-interactive).
 */
export const printOperationsTable = (
  apiName: string,
  operations: OperationChoice[],
): void => {
  // Group by first tag or just list them
  for (const op of operations) {
    const color = methodColor(op.method);
    const method = op.method.toUpperCase().padEnd(7);
    const path = op.path;
    const summary = op.summary ? `  ${DIM}${op.summary}${RESET}` : '';
    process.stdout.write(
      `  ${color}${method}${RESET} ${path.padEnd(50)} ${op.operationId}${summary}\n`,
    );
  }
  process.stdout.write(`\nRun \`epilot ${apiName} <operationId> --help\` for details.\n`);
};
