import { Component, inject, signal } from '@angular/core';
import { PremiumBreakdownModal } from './premium-breakdown-modal/premium-breakdown-modal';
import { DecimalPipe } from '@angular/common';
// import { PremiumBreakdownService } from '../../feature/direct/services/premium-breakdown.service';

@Component({
  selector: 'app-premium-summary-bar',
  imports: [DecimalPipe, PremiumBreakdownModal],
  templateUrl: './premium-summary-bar.html',
  styleUrl: './premium-summary-bar.scss',
})
export class PremiumSummaryBar {
  // private breakdown = inject(PremiumBreakdownService);

  showModal = signal(false);

  // INPUTS (later replace with service values)
  grossUsd = signal(500);

  dstUsd = signal(500);
  premTaxUsd = signal(500);
  basicUsd = signal(500);
  lgtUsd = signal(500);

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
