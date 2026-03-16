import { type BlueprintInput, normalizeBlueprintInput } from './adapters/index.js';
import { allRules } from './rules/index.js';
import type {
  BlueprintData,
  BlueprintFormat,
  ParsedTerraformFile,
  Severity,
  ValidationContext,
  ValidationIssue,
  ValidationReport,
  ValidationRule,
  ValidatorOptions,
} from './types.js';
import { buildResourceIndexFromData } from './utils/resource-index.js';

const SEVERITY_LEVELS: Record<Severity, number> = { error: 0, warning: 1, info: 2 };

/** Validate a blueprint from any supported input format */
export async function validateBlueprint(
  input: BlueprintInput,
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

  /** Run validation on any supported blueprint input */
  async validate(input: BlueprintInput): Promise<ValidationReport> {
    const data = normalizeBlueprintInput(input);
    return this.validateData(data);
  }

  /** Run validation on already-normalized BlueprintData */
  async validateData(data: BlueprintData): Promise<ValidationReport> {
    if (data.resources.length === 0) {
      return this.emptyReport(data.sourceFiles, data.format);
    }

    const resourceIndex = buildResourceIndexFromData(data);

    // Wrap resources into ParsedTerraformFile structure for rule compatibility
    const files = this.buildFiles(data);

    const context: ValidationContext = {
      files,
      resourceIndex,
      options: this.options,
      format: data.format,
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

    const errors = allIssues.filter((i) => i.severity === 'error').length;
    const warnings = allIssues.filter((i) => i.severity === 'warning').length;
    const infos = allIssues.filter((i) => i.severity === 'info').length;

    const resourceTypes: Record<string, number> = {};
    for (const resource of data.resources) {
      resourceTypes[resource.type] = (resourceTypes[resource.type] ?? 0) + 1;
    }

    return {
      valid: errors === 0,
      summary: {
        errors,
        warnings,
        infos,
        filesScanned: data.sourceFiles.length,
        resourcesFound: data.resources.length,
      },
      issues: allIssues,
      metadata: {
        validatedAt: new Date().toISOString(),
        blueprintFiles: data.sourceFiles,
        resourceTypes,
        format: data.format,
        blueprintId: data.metadata?.blueprintId,
      },
    };
  }

  private buildFiles(data: BlueprintData): ParsedTerraformFile[] {
    // Group resources by source file
    const byFile = new Map<string, typeof data.resources>();
    for (const resource of data.resources) {
      const file = resource.source;
      const existing = byFile.get(file) ?? [];
      existing.push(resource);
      byFile.set(file, existing);
    }

    return Array.from(byFile.entries()).map(([path, resources]) => ({
      path,
      resources: resources.map((r) => ({
        type: r.type,
        name: r.name,
        address: r.address,
        attributes: r.attributes,
        dependsOn: r.dependsOn,
        rawHcl: r.rawContent,
        rawContent: r.rawContent,
        file: r.source,
        lineStart: r.lineStart ?? 1,
      })),
      variables: data.variables,
      rawContent: resources.map((r) => r.rawContent).join('\n'),
    }));
  }

  private selectRules(): ValidationRule[] {
    if (!this.options.rules || this.options.rules.length === 0) {
      return [...allRules];
    }
    const selected = new Set(this.options.rules);
    return allRules.filter((r) => selected.has(r.id));
  }

  private emptyReport(files: string[], format: BlueprintFormat): ValidationReport {
    return {
      valid: true,
      summary: { errors: 0, warnings: 0, infos: 0, filesScanned: 0, resourcesFound: 0 },
      issues: [],
      metadata: { validatedAt: new Date().toISOString(), blueprintFiles: files, resourceTypes: {}, format },
    };
  }
}
