import { computed, inject, Injectable, signal } from '@angular/core';
import { QuoteStore } from '../store/quote.store';

@Injectable({
  providedIn: 'root',
})
export class PremiumBreakdownService {
  private store = inject(QuoteStore);

  // =====================================================
  // CONSTANTS (Regulatory)
  // =====================================================

  private readonly DST = 200; // Fixed PHP
  private readonly PREMIUM_TAX_RATE = 0.02; // 2%
  private readonly LGT_RATE = 0.002; // 0.2%

  private round2(value: number): number {
    return Math.round(value * 100) / 100;
  }

  // =====================================================
  // GROSS PREMIUM
  // =====================================================

  readonly grossPremiumPhp = computed(() => this.store.totalPremium());

  // =====================================================
  // DST
  // =====================================================

  readonly dstPhp = computed(() => this.round2(this.DST));

  // =====================================================
  // TAX BASE
  // =====================================================

  readonly taxBasePhp = computed(() => this.round2(this.grossPremiumPhp() - this.dstPhp()));

  // =====================================================
  // PREMIUM TAX (2%)
  // =====================================================

  readonly premiumTaxPhp = computed(() => this.round2(this.taxBasePhp() * this.PREMIUM_TAX_RATE));

  // =====================================================
  // BASIC PREMIUM
  // =====================================================

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

  // =====================================================
  // API Snapshot
  // =====================================================

  getBreakdownPayload() {
    return {
      grossPremium: this.grossPremiumPhp(),
      basicPremium: this.basicPremiumPhp(),
      dst: this.dstPhp(),
      premiumTax: this.premiumTaxPhp(),
      lgt: this.lgtPhp(),
    };
  }
}
