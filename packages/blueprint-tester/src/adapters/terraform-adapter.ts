import { parseTerraformFile } from '../hcl-parser.js';
import type { BlueprintData, BlueprintResource } from '../types.js';
import { extractTerraformFiles } from '../zip-reader.js';

/** Convert a blueprint ZIP (containing .tf files) to format-agnostic BlueprintData */
export function fromTerraformZip(input: Buffer): BlueprintData {
  const extractedFiles = extractTerraformFiles(input);

  const resources: BlueprintResource[] = [];
  const variables: Record<string, unknown> = {};
  const sourceFiles: string[] = [];

  for (const file of extractedFiles) {
    sourceFiles.push(file.path);
    const parsed = parseTerraformFile(file.path, file.content);

    Object.assign(variables, parsed.variables);

    for (const tfResource of parsed.resources) {
      resources.push({
        type: tfResource.type,
        name: tfResource.name,
        address: tfResource.address,
        attributes: tfResource.attributes,
        dependsOn: tfResource.dependsOn,
        rawContent: tfResource.rawHcl,
        source: tfResource.file,
        lineStart: tfResource.lineStart,
      });
    }
  }

  return {
    resources,
    variables,
    sourceFiles,
    format: 'terraform',
  };
}
