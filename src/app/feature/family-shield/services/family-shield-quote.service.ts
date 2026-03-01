import { computed, effect, Injectable, signal } from '@angular/core';
import { CivilStatus } from '../../../core/enum/civil-status.enum';

export interface QuoteState {
  civilStatus: CivilStatus | null;
  familyLevel: number;
  personalLevel: number;
}

const STORAGE_KEY = 'family-shield-quote';

@Injectable({
  providedIn: 'root',
})
export class FamilyShieldQuoteService {
}
