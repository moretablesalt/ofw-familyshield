export interface Dependent {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: {
    month: string;
    day: string;
    year: string;
  };
  relationship: string;
}
