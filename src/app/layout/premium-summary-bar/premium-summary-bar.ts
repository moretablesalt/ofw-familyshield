import { Component, inject, signal } from '@angular/core';
import { PremiumBreakdownModal } from './premium-breakdown-modal/premium-breakdown-modal';
import { DecimalPipe } from '@angular/common';
import { PremiumBreakdownService } from '../../feature/family-shield/services/premium-breakdown.service';

@Component({
  selector: 'app-premium-summary-bar',
  imports: [DecimalPipe, PremiumBreakdownModal],
  templateUrl: './premium-summary-bar.html',
  styleUrl: './premium-summary-bar.scss',
})
export class PremiumSummaryBar {
  private breakdown = inject(PremiumBreakdownService);

  showModal = signal(false);

  // INPUTS (later replace with service values)
  grossPremium = this.breakdown.grossPremiumPhp;

  dst = this.breakdown.dstPhp;
  premTax = this.breakdown.premiumTaxPhp;
  basicPremium = this.breakdown.basicPremiumPhp;
  lgt = this.breakdown.lgtPhp;

  /* ===============================
     MODAL CONTROL
     =============================== */
  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
