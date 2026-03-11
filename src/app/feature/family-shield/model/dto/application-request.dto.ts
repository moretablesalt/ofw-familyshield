import { QuoteRequest } from '../quote-request.model';

export interface ApplicationRequestDto {
  policyHolder: PolicyHolderDto;
  quote: QuoteRequest;
  insuredPersons: InsuredPersonDto[];
}

export interface PolicyHolderDto {
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  civilStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'SEPARATED';
  nationality: string;
  emailAddress: string;
  mobileNumber: string;
  passportNo: string;
  passportExpiryDate: string;
  province: string;
  city: string;
  barangay: string;
  zipCode: string;
  streetAddress: string;
  jobTitle: string;
  employerName: string;
  employerAddress: string;
}

export interface InsuredPersonDto {
  firstName: string;
  middleName: string | null;
  lastName: string;
  birthDate: string;
  relationshipToPolicyHolder: string;
}
