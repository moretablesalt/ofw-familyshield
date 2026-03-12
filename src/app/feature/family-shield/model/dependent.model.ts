import { DateModel } from './date.model';

export interface Dependent {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: DateModel;
  relationship: string;
}
