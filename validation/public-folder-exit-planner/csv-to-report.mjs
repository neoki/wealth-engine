import { parseInventoryCsv } from './csv-inventory-adapter.mjs';
import { buildExitPlan, renderMarkdown } from './report.mjs';

/**
 * End-to-end vendor-neutral assessment entry point.
 * Accepts customer/admin supplied CSV text, normalizes it, and produces the
 * same guarded MSP assessment used by the internal planner.
 *
 * Import warnings are deliberately preserved in the plan. They are evidence
 * quality signals, not parser noise: a plausible-looking report must not hide
 * a weak source inventory.
 */
export function buildExitPlanFromCsv(text, options = {}) {
  const now = options.now ?? new Date();
  const imported = parseInventoryCsv(text, now);
  const sourceRows = imported.rows.map(r => r.raw);
  const plan = buildExitPlan(sourceRows, { ...options, now });

  return {
    ...plan,
    sourceImport: {
      format: 'csv',
      delimiter: imported.delimiter ?? null,
      rowsImported: imported.rows.length,
      mappedFields: imported.mappedFields,
      warnings: imported.warnings
    }
  };
}

export function renderAssessmentFromCsv(text, options = {}) {
  const plan = buildExitPlanFromCsv(text, options);
  const report = renderMarkdown(plan);
  const importLines = [
    '',
    '## Source inventory import',
    '',
    `- Rows imported: ${plan.sourceImport.rowsImported}`,
    `- Delimiter: ${plan.sourceImport.delimiter ?? 'unknown'}`,
    `- Recognised fields: ${plan.sourceImport.mappedFields.join(', ') || 'none'}`,
    `- Import warnings: ${plan.sourceImport.warnings.length}`,
    ...plan.sourceImport.warnings.map(w => `  - ${w}`)
  ];
  return `${report}\n${importLines.join('\n')}`;
}
