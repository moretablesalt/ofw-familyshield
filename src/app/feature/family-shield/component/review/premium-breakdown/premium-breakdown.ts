import { Component, computed, inject } from '@angular/core';
import { QuoteStateService } from '../../../state/quote-state.service';

@Component({
  selector: 'app-premium-breakdown',
  imports: [],
  templateUrl: './premium-breakdown.html',
  styleUrl: './premium-breakdown.css',
})
export class PremiumBreakdown {
  private quoteState = inject(QuoteStateService);

  premiumBreakdown = computed(() => {
    const quote = this.quoteState.apiQuote();

    return {
      basicPremium: quote?.familyShieldPremium.basicPremium,
      grossPremium: quote?.familyShieldPremium.total,
      premiumTax: quote?.taxes.premiumTax,
      lgt: quote?.taxes.lgt,
      dst: quote?.taxes.docStamp,
    };
  });
}
