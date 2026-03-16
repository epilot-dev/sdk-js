import { readFileSync } from 'node:fs';
import { parseTerraformFile } from './hcl-parser.js';
import { allRules } from './rules/index.js';
import type {
  ParsedTerraformFile,
  Severity,
  ValidationContext,
  ValidationIssue,
  ValidationReport,
  ValidationRule,
  ValidatorOptions,
} from './types.js';
import { buildResourceIndex } from './utils/resource-index.js';
import { extractTerraformFiles } from './zip-reader.js';

const SEVERITY_LEVELS: Record<Severity, number> = { error: 0, warning: 1, info: 2 };

/** Validate a blueprint ZIP file and return a report of issues found */
export async function validateBlueprint(
  input: Buffer | string,
  options: ValidatorOptions = {},
): Promise<ValidationReport> {
  const validator = new BlueprintValidator(options);
  return validator.validate(input);
}

export class BlueprintValidator {
  private rules: ValidationRule[];
  private options: ValidatorOptions;

  constructor(options: ValidatorOptions = {}) {
    this.options = options;
    this.rules = this.selectRules();
  }

  /** Register an additional custom validation rule */
  registerRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  /** Run validation on a blueprint ZIP */
  async validate(input: Buffer | string): Promise<ValidationReport> {
    // Read the ZIP
    const zipInput = typeof input === 'string' ? readFileSync(input) : input;
    const extractedFiles = extractTerraformFiles(zipInput);

    if (extractedFiles.length === 0) {
      return this.emptyReport([]);
    }

    // Parse all .tf files
    const parsedFiles: ParsedTerraformFile[] = extractedFiles.map((f) =>
      parseTerraformFile(f.path, f.content),
    );

    // Build resource index
    const resourceIndex = buildResourceIndex(parsedFiles);

    // Create validation context
    const context: ValidationContext = {
      files: parsedFiles,
      resourceIndex,
      options: this.options,
    };

    // Run all rules and collect issues
    const allIssues: ValidationIssue[] = [];
    const minSeverity = SEVERITY_LEVELS[this.options.severity ?? 'info'];

    for (const rule of this.rules) {
      const issues = rule.validate(context);
      for (const issue of issues) {
        if (SEVERITY_LEVELS[issue.severity] <= minSeverity) {
          allIssues.push(issue);
        }
      }
    }

    // Build report
    const errors = allIssues.filter((i) => i.severity === 'error').length;
    const warnings = allIssues.filter((i) => i.severity === 'warning').length;
    const infos = allIssues.filter((i) => i.severity === 'info').length;

    const resourceTypes: Record<string, number> = {};
    for (const file of parsedFiles) {
      for (const resource of file.resources) {
        resourceTypes[resource.type] = (resourceTypes[resource.type] ?? 0) + 1;
      }
    }

    return {
      valid: errors === 0,
      summary: {
        errors,
        warnings,
        infos,
        filesScanned: parsedFiles.length,
        resourcesFound: parsedFiles.reduce((sum, f) => sum + f.resources.length, 0),
      },
      issues: allIssues,
      metadata: {
        validatedAt: new Date().toISOString(),
        blueprintFiles: parsedFiles.map((f) => f.path),
        resourceTypes,
      },
    };
  }

  private selectRules(): ValidationRule[] {
    if (!this.options.rules || this.options.rules.length === 0) {
      return [...allRules];
    }
    const selected = new Set(this.options.rules);
    return allRules.filter((r) => selected.has(r.id));
  }

  private emptyReport(files: string[]): ValidationReport {
    return {
      valid: true,
      summary: { errors: 0, warnings: 0, infos: 0, filesScanned: 0, resourcesFound: 0 },
      issues: [],
      metadata: { validatedAt: new Date().toISOString(), blueprintFiles: files, resourceTypes: {} },
    };
  }
}
