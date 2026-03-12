import { DateModel } from '../date.model';

export interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  birthDate: DateModel;
  gender: 'MALE' | 'FEMALE';
  civilStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'SEPARATED';
  nationality: string;
}
