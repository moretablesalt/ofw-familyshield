import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CivilStatus } from '../../../core/enum/civil-status.enum';
import { QuoteCalculatorService } from '../services/quote-calculator.service';
import { QuoteRequest } from '../model/quote-request.model';
import { buildBreakdown } from '../mapper/quote-breakdown.mapper';
import { PolicyHolderStateService } from '../services/form/policy-holder-state.service';

export interface Quote {
  civilStatus: CivilStatus | null;
  familyLevel: number;
  personalLevel: number;
}

const STORAGE_KEY = 'family-shield-quote-state';

@Injectable({
  providedIn: 'root',
})
export class QuoteStateService {
  private calculator = inject(QuoteCalculatorService);
  private policyHolderState = inject(PolicyHolderStateService);

  // This is where the fields in the quote are stored.
  private _request = signal<QuoteRequest>(this.loadInitialState());
  readonly request = this._request.asReadonly();

  readonly quoteResult = computed(() => this.calculator.calculate(this._request()));

  readonly totalPremium = computed(() => this.quoteResult().totalPremium);

  private previousStatus: CivilStatus | null = null;

  readonly breakdown = computed(() => {
    const request = this._request();
    if (!request.civilStatus) return [];

    return buildBreakdown(request.civilStatus, this.quoteResult());
  });

  readonly isValid = computed(() => this._request().civilStatus !== null);

  // Setters
  setCivilStatus(status: CivilStatus) {
    this.patch({ civilStatus: status });
  }

  setFamilyLevel(level: number) {
    this.patch({ familyLevel: level });
  }

  setPersonalLevel(level: number) {
    this.patch({ personalLevel: level });
  }

  reset() {
    this._request.set(this.getEmptyState());
    sessionStorage.removeItem(STORAGE_KEY);
  }

  // Session storage
  constructor() {
    effect(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this._request()));
    });

    // Reset dependents when civil status changes
    effect(() => {
      const current = this._request().civilStatus;

      if (current !== this.previousStatus) {
        if (this.previousStatus !== null) {
          this.policyHolderState.resetDependents();
        }

        this.previousStatus = current;
      }
    });
  }

  // Utility functions
  private loadInitialState(): QuoteRequest {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return this.getEmptyState();

    try {
      return JSON.parse(stored);
    } catch {
      return this.getEmptyState();
    }
  }

  private patch(partial: Partial<QuoteRequest>) {
    this._request.update((current) => ({
      ...current,
      ...partial,
    }));
  }

  private getEmptyState(): QuoteRequest {
    return {
      civilStatus: null,
      familyLevel: 2,
      personalLevel: 0,
    };
  }
}
