import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CivilStatus } from '../../../../core/enum/civil-status.enum';
import { QuoteStateService } from '../../../../feature/family-shield/state/quote-state.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
  imports: [DecimalPipe],
})
export class Quote {
  protected state = inject(QuoteStateService);
  private router = inject(Router);

  readonly request = this.state.request;
  readonly totalPremium = this.state.totalPremium;
  readonly breakdown = this.state.breakdown;
  readonly isValid = this.state.isValid;

  isloading = this.state.loading;

  protected readonly CivilStatus = CivilStatus;

  // ===============================
  // CLEAN EVENT HANDLERS
  // ===============================

  onCivilStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value as CivilStatus;

    if (!value) return;

    this.state.setCivilStatus(value);
  }

  validate() {
    if (!this.isValid()) return;
    this.router.navigate(['/family-shield/form']);
  }
}
