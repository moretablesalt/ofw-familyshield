import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-premium-breakdown-modal',
  imports: [
    DecimalPipe
  ],
  templateUrl: './premium-breakdown-modal.html',
  styleUrl: './premium-breakdown-modal.scss',
})
export class PremiumBreakdownModal {

  visible = input.required<boolean>();

  grossUsd = input.required<number>();
  basicUsd = input.required<number>();
  dstUsd = input.required<number>();
  premTaxUsd = input.required<number>();
  lgtUsd = input.required<number>();

  close = output<void>();

  closeModal() {
    this.close.emit();
  }
}
