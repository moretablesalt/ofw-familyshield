import { Component, computed, inject, signal } from '@angular/core';
import { PremiumBreakdownModal } from './premium-breakdown-modal/premium-breakdown-modal';
import { DecimalPipe } from '@angular/common';
import { QuoteStateService } from '../../feature/family-shield/state/quote-state.service';

@Component({
  selector: 'app-premium-summary-bar',
  imports: [PremiumBreakdownModal],
  templateUrl: './premium-summary-bar.html',
  styleUrl: './premium-summary-bar.scss',
})
export class PremiumSummaryBar {
  private quoteState = inject(QuoteStateService);

  showModal = signal(false);

  premium = computed(() => {
    const quote = this.quoteState.apiQuote();

    return {
      grossPremium: quote?.familyShieldPremium.total,
      basicPremium: quote?.familyShieldPremium.basicPremium,
      dst: quote?.taxes.docStamp,
      premTax: quote?.taxes.premiumTax,
      lgt: quote?.taxes.lgt,
    };
  });

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
