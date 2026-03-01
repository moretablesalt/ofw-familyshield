import { computed, inject, Injectable, signal } from '@angular/core';
import { QuoteStateService } from '../state/quote-state.service';

@Injectable({
  providedIn: 'root',
})
export class PremiumBreakdownService {
  private state = inject(QuoteStateService);

  // move to constants / config?
  private readonly DST = 200; // Fixed PHP
  private readonly PREMIUM_TAX_RATE = 0.02; // 2%
  private readonly LGT_RATE = 0.002; // 0.2%

  readonly grossPremiumPhp = computed(() => this.state.totalPremium());
  readonly dstPhp = computed(() => this.round2(this.DST));
  readonly taxBasePhp = computed(() => this.round2(this.grossPremiumPhp() - this.dstPhp()));
  readonly premiumTaxPhp = computed(() => this.round2(this.taxBasePhp() * this.PREMIUM_TAX_RATE));

  readonly basicPremiumPhp = computed(() =>
    this.round2(this.taxBasePhp() - this.premiumTaxPhp() - this.taxBasePhp() * this.LGT_RATE),
  );

  // =====================================================
  // LGT (Balancing Figure)
  // =====================================================

  readonly lgtPhp = computed(() =>
    this.round2(
      this.grossPremiumPhp() - this.basicPremiumPhp() - this.dstPhp() - this.premiumTaxPhp(),
    ),
  );

  getBreakdownPayload() {
    return {
      grossPremium: this.grossPremiumPhp(),
      basicPremium: this.basicPremiumPhp(),
      dst: this.dstPhp(),
      premiumTax: this.premiumTaxPhp(),
      lgt: this.lgtPhp(),
    };
  }

  // utility
  private round2(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
