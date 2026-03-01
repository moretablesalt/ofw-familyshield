import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { QuoteCalculatorService } from './quote-calculator.service';
import { CivilStatus } from '../../../../core/enum/civil-status.enum';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
  imports: [DecimalPipe],
})
export class Quote {
  private calculator = inject(QuoteCalculatorService);

  status = signal<CivilStatus | null>(null);
  familyLevel = signal<number>(1);
  personalLevel = signal<number>(0);
  error = signal<string>('');

  totalPremium = computed(() =>
    this.calculator.calculateTotalPremium(this.familyLevel(), this.personalLevel()),
  );

  breakdown = computed(() =>
    this.status()
      ? this.calculator.buildBreakdown(this.status()!, this.familyLevel(), this.personalLevel())
      : null,
  );

  validate() {
    if (!this.status()) {
      this.error.set('Please select civil status.');
      return;
    }

    this.error.set('');
    alert('Proceeding to checkout...');
  }
}
