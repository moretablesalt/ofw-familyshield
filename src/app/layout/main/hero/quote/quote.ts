import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CivilStatus } from '../../../../core/enum/civil-status.enum';
import { QuoteStore } from '../../../../feature/family-shield/store/quote.store';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
  imports: [DecimalPipe],
})
export class Quote {
  private store = inject(QuoteStore);
  private router = inject(Router);

  readonly state = this.store.state;
  readonly totalPremium = this.store.totalPremium;
  readonly breakdown = this.store.breakdown;

  protected readonly CivilStatus = CivilStatus;

  // ===============================
  // CLEAN EVENT HANDLERS
  // ===============================

  onCivilStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = select.value as CivilStatus;

    if (!value) return;

    this.store.setCivilStatus(value);
  }

  onFamilyLevelChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const level = Number(select.value);

    this.store.setFamilyLevel(level);
  }

  onPersonalLevelChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const level = Number(select.value);

    this.store.setPersonalLevel(level);
  }

  validate() {
    if (!this.store.isValid()) return;
    this.router.navigate(['/family-shield/form']);
  }
}
