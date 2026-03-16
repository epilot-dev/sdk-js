import AdmZip from 'adm-zip';

export interface ExtractedFile {
  path: string;
  content: string;
}

export function extractTerraformFiles(input: Buffer | string): ExtractedFile[] {
  const zip = new AdmZip(input);
  const entries = zip.getEntries();

  return entries
    .filter((entry) => entry.entryName.endsWith('.tf') && !entry.isDirectory)
    .map((entry) => ({
      path: entry.entryName,
      content: entry.getData().toString('utf-8'),
    }));
}
