import { Injectable } from '@angular/core';
import { QUOTE_PRICING } from '../../../../core/config/quote-pricing.config';
import { CivilStatus } from '../../../../core/enum/civil-status.enum';

@Injectable({
  providedIn: 'root',
})
export class QuoteCalculatorService {
  calculateSpouse(level: number): number {
    return QUOTE_PRICING.spouseBase + (level - 1) * QUOTE_PRICING.spouseIncrement;
  }

  calculateDependent(level: number): number {
    return QUOTE_PRICING.dependentBase + (level - 1) * QUOTE_PRICING.dependentIncrement;
  }

  calculatePersonalCoverage(level: number): number {
    return level * QUOTE_PRICING.personalCoveragePerLevel;
  }

  calculateFamilyPremium(level: number): number {
    return QUOTE_PRICING.familyBasePremium + (level - 1) * QUOTE_PRICING.familyIncrementPremium;
  }

  calculatePersonalPremium(level: number): number {
    return level * QUOTE_PRICING.personalPremiumPerLevel;
  }

  calculateTotalPremium(familyLevel: number, personalLevel: number): number {
    return this.calculateFamilyPremium(familyLevel) + this.calculatePersonalPremium(personalLevel);
  }

  buildBreakdown(status: CivilStatus, familyLevel: number, personalLevel: number) {
    if (!status) return null;

    const sections: any[] = [];

    const dependent = this.calculateDependent(familyLevel);
    const spouse = this.calculateSpouse(familyLevel);
    const personal = this.calculatePersonalCoverage(personalLevel);

    const familyRows: { label: string; amount: number }[] = [];

    switch (status) {
      case CivilStatus.Married:
        familyRows.push({ label: 'Spouse', amount: spouse });
        familyRows.push({
          label: `Children (Up to ${QUOTE_PRICING.maxChildren})`,
          amount: dependent,
        });
        break;

      case CivilStatus.Single:
        familyRows.push({
          label: 'Parents & Siblings (each)',
          amount: dependent,
        });
        break;

      case CivilStatus.Widowed:
        familyRows.push({
          label: `Children (each, up to ${QUOTE_PRICING.maxChildren})`,
          amount: dependent,
        });
        break;
    }

    if (familyRows.length) {
      sections.push({
        title: 'Family Protection',
        rows: familyRows,
      });
    }

    if (personalLevel > 0) {
      sections.push({
        title: 'Personal Protection',
        rows: [{ label: 'OFW Personal Shield', amount: personal }],
      });
    }

    return sections;
  }
}
