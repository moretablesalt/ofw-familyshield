import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CivilStatus } from '../../../core/enum/civil-status.enum';
import { QuoteCalculatorService } from '../services/quote-calculator.service';
import { QuoteRequest } from '../model/quote-request.model';
import { buildBreakdown } from '../mapper/quote-breakdown.mapper';
import { PolicyHolderStateService } from '../services/form/policy-holder-state.service';
import { QuoteApiResponse, QuoteService } from '../services/quote.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, switchMap, tap } from 'rxjs';

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

  private quoteService = inject(QuoteService);

  private _apiQuote = signal<QuoteApiResponse | null>(null);
  readonly apiQuote = this._apiQuote.asReadonly();

  // This is where the fields in the quote are stored.
  private _request = signal<QuoteRequest>(this.loadInitialState());
  readonly request = this._request.asReadonly();

  readonly quoteResult = computed(() => this.calculator.calculate(this._request()));

  readonly totalPremium = computed(() => this.quoteResult().totalPremium);

  private previousStatus: CivilStatus | null = null;

  readonly breakdown = computed(() => {
    const request = this._request();
    if (!request.policyHolderCivilStatus) return [];

    const apiQuote = this.apiQuote();
    if (!apiQuote) return [];

    return buildBreakdown(request.policyHolderCivilStatus, apiQuote);
  });

  readonly isValid = computed(() => this._request().policyHolderCivilStatus !== null);

  // Setters
  setCivilStatus(status: CivilStatus) {
    this.patch({ policyHolderCivilStatus: status });
  }

  setFamilyLevel(level: number) {
    this.patch({ familyUnit: level });
  }

  setPersonalLevel(level: number) {
    this.patch({ ofwUnit: level });
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
      const current = this._request().policyHolderCivilStatus;

      if (current !== this.previousStatus) {
        if (this.previousStatus !== null) {
          this.policyHolderState.resetDependents();
        }

        this.previousStatus = current;
      }
    });

    toObservable(this._request)
      .pipe(
        debounceTime(400),
        filter((request) => !!request.policyHolderCivilStatus),
        switchMap((request) => this.quoteService.quoteFamilyShield(request)),
        tap((response) => this._apiQuote.set(response)),
        takeUntilDestroyed(),
      )
      .subscribe();
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
      policyHolderCivilStatus: null,
      familyUnit: 2,
      ofwUnit: 0,
    };
  }
}
