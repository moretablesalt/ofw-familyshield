import { CivilStatus } from '../../../core/enum/civil-status.enum';
import { QUOTE_PRICING } from '../../../core/config/quote-pricing.config';
import { QuoteResult } from '../model/quote-result.model';

export interface BreakdownRow {
  label: string;
  amount: number;
}

export interface BreakdownSection {
  title: string;
  rows: BreakdownRow[];
}

export function buildBreakdown(civilStatus: CivilStatus, result: QuoteResult): BreakdownSection[] {
  const sections: BreakdownSection[] = [];
  const familyRows: BreakdownRow[] = [];

  // -------------------------------
  // Family Protection Section
  // -------------------------------

  if (civilStatus === CivilStatus.Married) {
    familyRows.push({
      label: 'Spouse',
      amount: result.spouseCoverage,
    });

    familyRows.push({
      label: `Children (each, up to ${QUOTE_PRICING.maxChildren})`,
      amount: result.dependentCoverage,
    });
  }

  if (civilStatus === CivilStatus.Single) {
    familyRows.push({
      label: 'Parents & Siblings (each)',
      amount: result.dependentCoverage,
    });
  }

  if (civilStatus === CivilStatus.Widowed) {
    familyRows.push({
      label: `Children (each, up to ${QUOTE_PRICING.maxChildren})`,
      amount: result.dependentCoverage,
    });
  }

  if (familyRows.length > 0) {
    sections.push({
      title: 'Family Protection',
      rows: familyRows,
    });
  }

  // -------------------------------
  // Personal Protection Section
  // -------------------------------

  if (result.personalCoverage > 0) {
    sections.push({
      title: 'Personal Protection',
      rows: [
        {
          label: 'OFW Personal Shield',
          amount: result.personalCoverage,
        },
      ],
    });
  }

  return sections;
}
