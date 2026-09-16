import assert from 'node:assert/strict';
import { buildExitPlanFromCsv, renderAssessmentFromCsv } from './csv-to-report.mjs';

const NOW = new Date('2026-09-16T00:00:00Z');
const csv = `FolderPath;ItemCount;SizeGB;LastModified;MailEnabled;PrimarySMTPAddress;PermissionCount;ComplianceHold;ApplicationDependency;MailItems;DocumentItems;CalendarItems;ContactItems;ItemsLast90Days;LargestItemMB
\\Finance;1200;1.8;2026-09-10;true;finance@example.com;4;false;false;1100;80;20;0;35;12
\\LegacyApp;8000;9.5;2024-01-15;false;;12;false;true;7000;900;100;0;0;18
\\LegalHold;350;0.6;2026-08-20;false;;3;true;false;300;50;0;0;8;4`;

const plan = buildExitPlanFromCsv(csv, { organisation:'Example MSP Customer', now:NOW });
assert.equal(plan.summary.folders, 3);
assert.equal(plan.sourceImport.rowsImported, 3);
assert.equal(plan.sourceImport.delimiter, ';');
assert.equal(plan.sourceImport.warnings.length, 0);
assert.ok(plan.waves.wave3Specialist.length >= 2, 'application dependency and compliance hold must stay specialist-reviewed');

const markdown = renderAssessmentFromCsv(csv, { organisation:'Example MSP Customer', now:NOW });
assert.match(markdown, /Public Folder Exit Assessment/);
assert.match(markdown, /Source inventory import/);
assert.match(markdown, /Rows imported: 3/);
assert.match(markdown, /Planning output only/);

// Weak exports must remain visibly weak end-to-end.
const weakCsv = `FolderPath;ItemCount\n\\Mystery;10`;
const weak = buildExitPlanFromCsv(weakCsv, { now:NOW });
assert.ok(weak.sourceImport.warnings.some(w => /size/i.test(w)));
assert.equal(weak.summary.migrationCandidates, 0, 'missing evidence must not become a low-risk candidate');
const weakMarkdown = renderAssessmentFromCsv(weakCsv, { now:NOW });
assert.match(weakMarkdown, /Import warnings: 1/);
assert.match(weakMarkdown, /Missing evidence:/);

console.log('CSV-to-report end-to-end tests passed');
