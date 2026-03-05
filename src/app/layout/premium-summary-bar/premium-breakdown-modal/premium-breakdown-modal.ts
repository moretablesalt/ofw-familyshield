import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-premium-breakdown-modal',
  imports: [DecimalPipe],
  templateUrl: './premium-breakdown-modal.html',
  styleUrl: './premium-breakdown-modal.scss',
})
export class PremiumBreakdownModal {
  visible = input.required<boolean>();

  grossUsd = input.required<string | undefined>();
  basicUsd = input.required<string | undefined>();
  dstUsd = input.required<string | undefined>();
  premTaxUsd = input.required<string | undefined>();
  lgtUsd = input.required<string | undefined>();

  close = output<void>();

  closeModal() {
    this.close.emit();
  }
}
