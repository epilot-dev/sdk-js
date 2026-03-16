export type Severity = 'error' | 'warning' | 'info';

export type BlueprintFormat = 'terraform' | 'json';

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
    format: BlueprintFormat;
    blueprintId?: string;
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

/** Format-agnostic resource representation */
export interface BlueprintResource {
  type: string;
  name: string;
  address: string;
  attributes: Record<string, unknown>;
  dependsOn: string[];
  /** Raw content for pattern scanning (HCL text or JSON string) */
  rawContent: string;
  source: string;
  lineStart?: number;
}

/** Normalized blueprint data from any input format */
export interface BlueprintData {
  resources: BlueprintResource[];
  variables: Record<string, unknown>;
  sourceFiles: string[];
  format: BlueprintFormat;
  metadata?: {
    blueprintId?: string;
    sourceOrgId?: string;
    sourceType?: string;
  };
}

/** @deprecated Use BlueprintResource instead */
export interface TerraformResource {
  type: string;
  name: string;
  address: string;
  attributes: Record<string, unknown>;
  dependsOn: string[];
  rawHcl: string;
  rawContent: string;
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
  format: BlueprintFormat;
}

export interface ResourceIndex {
  byAddress: Map<string, BlueprintResource>;
  byType: Map<string, BlueprintResource[]>;
  allAddresses: Set<string>;
  /** UUIDs embedded in resource identifier names */
  allUuidsInIdentifiers: Set<string>;
}

/** Blueprint manifest resource as returned by the getBlueprint API */
export interface ManifestResource {
  type: string;
  id: string;
  name?: string;
  address?: string;
  is_root?: boolean;
  is_ready?: boolean;
  depends_on_addresses?: string[];
  config?: Record<string, unknown>;
}

/** Blueprint manifest as returned by the getBlueprint API */
export interface BlueprintManifest {
  blueprint_id: string;
  name?: string;
  source_type?: string;
  resources?: ManifestResource[];
  installation_status?: string;
}
