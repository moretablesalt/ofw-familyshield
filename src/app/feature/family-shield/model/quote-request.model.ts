import { CivilStatus } from '../../../core/enum/civil-status.enum';

export interface QuoteRequest {
  policyHolderCivilStatus: CivilStatus | null;
  familyUnit: number;
  ofwUnit: number;
}
