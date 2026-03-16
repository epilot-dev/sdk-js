import type { Severity, ValidationReport } from './types.js';

const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warning: 1, info: 2 };

/** Format a validation report as human-readable text */
export function formatReport(report: ValidationReport): string {
  const lines: string[] = [];

  lines.push('');
  lines.push(`Blueprint Validation Report`);
  lines.push('='.repeat(40));
  lines.push('');

  // Summary
  lines.push(`Files scanned: ${report.summary.filesScanned}`);
  lines.push(`Resources found: ${report.summary.resourcesFound}`);
  lines.push('');

  if (report.issues.length === 0) {
    lines.push('No issues found. Blueprint looks clean!');
    lines.push('');
    return lines.join('\n');
  }

  // Group by severity
  const sorted = [...report.issues].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  const grouped = new Map<Severity, typeof sorted>();
  for (const issue of sorted) {
    const group = grouped.get(issue.severity) ?? [];
    group.push(issue);
    grouped.set(issue.severity, group);
  }

  for (const severity of ['error', 'warning', 'info'] as Severity[]) {
    const group = grouped.get(severity);
    if (!group || group.length === 0) continue;

    const label = severity === 'error' ? 'ERRORS' : severity === 'warning' ? 'WARNINGS' : 'INFO';
    lines.push(`${label} (${group.length})`);
    lines.push('-'.repeat(30));

    for (const issue of group) {
      const location = issue.line ? `${issue.file}:${issue.line}` : issue.file;
      const resource = issue.resourceAddress ? ` [${issue.resourceAddress}]` : '';
      lines.push(`  ${location}${resource}`);
      lines.push(`    ${issue.message}`);
      if (issue.attributePath) {
        lines.push(`    attribute: ${issue.attributePath}`);
      }
      lines.push('');
    }
  }

  // Summary line
  const parts: string[] = [];
  if (report.summary.errors > 0) parts.push(`${report.summary.errors} error(s)`);
  if (report.summary.warnings > 0) parts.push(`${report.summary.warnings} warning(s)`);
  if (report.summary.infos > 0) parts.push(`${report.summary.infos} info(s)`);

  lines.push('-'.repeat(30));
  lines.push(`Result: ${report.valid ? 'PASS' : 'FAIL'} — ${parts.join(', ')}`);
  lines.push('');

  return lines.join('\n');
}

/** Format a validation report as JSON string */
export function formatReportJson(report: ValidationReport): string {
  return JSON.stringify(report, null, 2);
}
