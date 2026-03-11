import { CivilStatus } from '../../../core/enum/civil-status.enum';
import { QuoteApiResponse } from '../services/quote.service';

export interface BreakdownRow {
  label: string;
  amount: string;
}

export interface BreakdownSection {
  title: string;
  rows: BreakdownRow[];
}

export function buildBreakdown(
  civilStatus: string,
  response: QuoteApiResponse,
): BreakdownSection[] {
  const sections: BreakdownSection[] = [];
  const familyRows: BreakdownRow[] = [];

  const coverage = response.familyShieldCoverage;

  // -------------------------------
  // Family Protection Section
  // -------------------------------

  if (civilStatus === CivilStatus.Married) {
    familyRows.push({
      label: 'Spouse',
      amount: coverage.spouse,
    });

    familyRows.push({
      label: 'Children (each)',
      amount: coverage.child,
    });
  }

  if (civilStatus === CivilStatus.Single) {
    familyRows.push({
      label: 'Parents (each)',
      amount: coverage.parent,
    });

    familyRows.push({
      label: 'Siblings (each)',
      amount: coverage.sibling,
    });
  }

  if (civilStatus === CivilStatus.Widowed || civilStatus === CivilStatus.Separated) {
    familyRows.push({
      label: 'Children (each)',
      amount: coverage.child,
    });
  }

  if (familyRows.length > 0) {
    sections.push({
      title: 'Family Protection',
      rows: familyRows,
    });
  }

  sections.push({
    title: '** Scroll down to see full coverage details',
    rows: [],
  });

  return sections;
}
