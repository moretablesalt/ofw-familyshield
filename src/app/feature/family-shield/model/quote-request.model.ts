export interface QuoteRequest {
  policyHolderCivilStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'SEPARATED' | null;
  familyUnit: number;
  ofwUnit: number;
}
