import { Injectable } from '@angular/core';
import { QUOTE_PRICING } from '../../../core/config/quote-pricing.config';
import { QuoteRequest } from '../model/quote-request.model';
import { QuoteResult } from '../model/quote-result.model';

@Injectable({
  providedIn: 'root',
})
export class QuoteCalculatorService {
  calculate(request: QuoteRequest): QuoteResult {
    const familyUnits = request.familyUnit;
    const personalLevel = request.ofwUnit;

    const spouseCoverage = familyUnits * QUOTE_PRICING.coveragePerUnit;
    const dependentCoverage = familyUnits * QUOTE_PRICING.dependentCoveragePerUnit;

    const familyPremium = familyUnits * QUOTE_PRICING.familyPremiumPerUnit;

    const personalCoverage = personalLevel * QUOTE_PRICING.personalCoveragePerLevel;

    const personalPremium = personalLevel * QUOTE_PRICING.personalPremiumPerLevel;

    return {
      spouseCoverage,
      dependentCoverage,
      personalCoverage,
      familyPremium,
      personalPremium,
      totalPremium: familyPremium + personalPremium,
    };
  }

}
