import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CivilStatus } from '../../../core/enum/civil-status.enum';
import { QuoteCalculatorService } from '../services/quote-calculator.service';

export interface QuoteState {
  civilStatus: CivilStatus | null;
  familyLevel: number;
  personalLevel: number;
}

const STORAGE_KEY = 'family-shield-quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteStore {
  private calculator = inject(QuoteCalculatorService);

  // =====================================================
  // 1️⃣ STATE
  // =====================================================

  private _state = signal<QuoteState>(this.loadInitialState());
  readonly state = this._state.asReadonly();

  // =====================================================
  // 2️⃣ DERIVED VALUES
  // =====================================================

  readonly totalPremium = computed(() =>
    this.calculator.calculateTotalPremium(this._state().familyLevel, this._state().personalLevel),
  );

  readonly breakdown = computed(() =>
    this._state().civilStatus
      ? this.calculator.buildBreakdown(
          this._state().civilStatus!,
          this._state().familyLevel,
          this._state().personalLevel,
        )
      : null,
  );

  readonly isValid = computed(() => this._state().civilStatus !== null);

  // =====================================================
  // 3️⃣ PUBLIC API
  // =====================================================

  setCivilStatus(status: CivilStatus) {
    this.patchState({ civilStatus: status });
  }

  setFamilyLevel(level: number) {
    this.patchState({ familyLevel: level });
  }

  setPersonalLevel(level: number) {
    this.patchState({ personalLevel: level });
  }

  reset() {
    this._state.set(this.getEmptyState());
    sessionStorage.removeItem(STORAGE_KEY);
  }

  // =====================================================
  // 4️⃣ PERSISTENCE
  // =====================================================

  constructor() {
    effect(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this._state()));
    });
  }

  private loadInitialState(): QuoteState {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return this.getEmptyState();

    try {
      return JSON.parse(stored);
    } catch {
      return this.getEmptyState();
    }
  }

  private patchState(partial: Partial<QuoteState>) {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }

  private getEmptyState(): QuoteState {
    return {
      civilStatus: null,
      familyLevel: 1,
      personalLevel: 0,
    };
  }
}
