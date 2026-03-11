import { CivilStatus } from '../../../core/enum/civil-status.enum';

export interface QuoteRequest {
  policyHolderCivilStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'SEPARATED' | null;
  familyUnit: number;
  ofwUnit: number;
}
