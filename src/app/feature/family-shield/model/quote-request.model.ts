import { CivilStatus } from '../../../core/enum/civil-status.enum';

export interface QuoteRequest {
  civilStatus: CivilStatus | null;
  familyLevel: number;
  personalLevel: number;
}
