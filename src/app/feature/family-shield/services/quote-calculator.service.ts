import { Injectable } from '@angular/core';
import { QUOTE_PRICING } from '../../../core/config/quote-pricing.config';
import { CivilStatus } from '../../../core/enum/civil-status.enum';

export interface BreakdownRow {
  label: string;
  amount: number;
}

export interface BreakdownSection {
  title: string;
  rows: BreakdownRow[];
}


@Injectable({
  providedIn: 'root',
})
export class QuoteCalculatorService {
  // =====================================================
  // FAMILY COVERAGE CALCULATIONS
  // =====================================================

  calculateSpouseCoverage(level: number): number {
    return QUOTE_PRICING.spouseBase + (level - 1) * QUOTE_PRICING.spouseIncrement;
  }

  calculateDependentCoverage(level: number): number {
    return QUOTE_PRICING.dependentBase + (level - 1) * QUOTE_PRICING.dependentIncrement;
  }

  // =====================================================
  // PERSONAL COVERAGE
  // =====================================================

  calculatePersonalCoverage(level: number): number {
    return level * QUOTE_PRICING.personalCoveragePerLevel;
  }

  // =====================================================
  // PREMIUM CALCULATIONS
  // =====================================================

  calculateFamilyPremium(level: number): number {
    return QUOTE_PRICING.familyBasePremium + (level - 1) * QUOTE_PRICING.familyIncrementPremium;
  }

  calculatePersonalPremium(level: number): number {
    return level * QUOTE_PRICING.personalPremiumPerLevel;
  }

  calculateTotalPremium(familyLevel: number, personalLevel: number): number {
    return this.calculateFamilyPremium(familyLevel) + this.calculatePersonalPremium(personalLevel);
  }

  // =====================================================
  // BREAKDOWN BUILDER
  // =====================================================

  buildBreakdown(
    civilStatus: CivilStatus,
    familyLevel: number,
    personalLevel: number,
  ): BreakdownSection[] | null {
    if (!civilStatus) return null;

    const sections: BreakdownSection[] = [];

    const spouseCoverage = this.calculateSpouseCoverage(familyLevel);
    const dependentCoverage = this.calculateDependentCoverage(familyLevel);
    const personalCoverage = this.calculatePersonalCoverage(personalLevel);

    const familyRows: BreakdownRow[] = [];

    switch (civilStatus) {
      case CivilStatus.Married:
        familyRows.push({
          label: 'Spouse',
          amount: spouseCoverage,
        });
        familyRows.push({
          label: `Children (each, up to ${QUOTE_PRICING.maxChildren})`,
          amount: dependentCoverage,
        });
        break;

      case CivilStatus.Single:
        familyRows.push({
          label: 'Parents & Siblings (each)',
          amount: dependentCoverage,
        });
        break;

      case CivilStatus.Widowed:
        familyRows.push({
          label: `Children (each, up to ${QUOTE_PRICING.maxChildren})`,
          amount: dependentCoverage,
        });
        break;
    }

    if (familyRows.length > 0) {
      sections.push({
        title: 'Family Protection',
        rows: familyRows,
      });
    }

    if (personalLevel > 0) {
      sections.push({
        title: 'Personal Protection',
        rows: [
          {
            label: 'OFW Personal Shield',
            amount: personalCoverage,
          },
        ],
      });
    }

    return sections;
  }
}
