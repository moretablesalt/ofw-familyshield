import { Injectable } from '@angular/core';
import { QUOTE_PRICING } from '../../../core/config/quote-pricing.config';
import { QuoteRequest } from '../model/quote-request.model';
import { QuoteResult } from '../model/quote-result.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteCalculatorService {

  calculate(request: QuoteRequest): QuoteResult {
    const { familyLevel, personalLevel } = request;

    const spouseCoverage = this.calculateSpouseCoverage(familyLevel);
    const dependentCoverage = this.calculateDependentCoverage(familyLevel);
    const personalCoverage = this.calculatePersonalCoverage(personalLevel);

    const familyPremium = this.calculateFamilyPremium(familyLevel);
    const personalPremium = this.calculatePersonalPremium(personalLevel);

    return {
      spouseCoverage,
      dependentCoverage,
      personalCoverage,
      familyPremium,
      personalPremium,
      totalPremium: familyPremium + personalPremium,
    };
  }

  // ================================
  // Coverage Calculations
  // ================================

  private calculateSpouseCoverage(level: number): number {
    if (level <= 0) return 0;
    return QUOTE_PRICING.spouseBase + (level - 1) * QUOTE_PRICING.spouseIncrement;
  }

  private calculateDependentCoverage(level: number): number {
    if (level <= 0) return 0;
    return QUOTE_PRICING.dependentBase + (level - 1) * QUOTE_PRICING.dependentIncrement;
  }

  private calculatePersonalCoverage(level: number): number {
    if (level <= 0) return 0;
    return level * QUOTE_PRICING.personalCoveragePerLevel;
  }

  // ================================
  // Premium Calculations
  // ================================

  private calculateFamilyPremium(level: number): number {
    if (level <= 0) return 0;
    return QUOTE_PRICING.familyBasePremium + (level - 1) * QUOTE_PRICING.familyIncrementPremium;
  }

  private calculatePersonalPremium(level: number): number {
    if (level <= 0) return 0;
    return level * QUOTE_PRICING.personalPremiumPerLevel;
  }
}
