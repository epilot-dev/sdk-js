export type Severity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  ruleId: string;
  severity: Severity;
  message: string;
  file: string;
  line?: number;
  resourceAddress?: string;
  attributePath?: string;
  /** The offending value (truncated for secrets) */
  value?: string;
}

export interface ValidationReport {
  valid: boolean;
  summary: {
    errors: number;
    warnings: number;
    infos: number;
    filesScanned: number;
    resourcesFound: number;
  };
  issues: ValidationIssue[];
  metadata: {
    validatedAt: string;
    blueprintFiles: string[];
    resourceTypes: Record<string, number>;
  };
}

export interface ValidatorOptions {
  /** Specific rule IDs to run (default: all) */
  rules?: string[];
  /** Minimum severity to report (default: 'info') */
  severity?: Severity;
  /** UUIDs to skip in dangling check */
  knownSafeUuids?: string[];
  /** If known, flag this org_id specifically */
  sourceOrgId?: string;
}

export interface TerraformResource {
  type: string;
  name: string;
  address: string;
  attributes: Record<string, unknown>;
  dependsOn: string[];
  rawHcl: string;
  file: string;
  lineStart: number;
}

export interface ParsedTerraformFile {
  path: string;
  resources: TerraformResource[];
  variables: Record<string, unknown>;
  rawContent: string;
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  severity: Severity;
  validate(context: ValidationContext): ValidationIssue[];
}

export interface ValidationContext {
  files: ParsedTerraformFile[];
  resourceIndex: ResourceIndex;
  options: ValidatorOptions;
}

export interface ResourceIndex {
  byAddress: Map<string, TerraformResource>;
  byType: Map<string, TerraformResource[]>;
  allAddresses: Set<string>;
  /** UUIDs embedded in resource identifier names */
  allUuidsInIdentifiers: Set<string>;
}
