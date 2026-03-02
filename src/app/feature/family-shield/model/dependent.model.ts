export interface Dependent {
  firstName: string;
  middleInitial: string;
  lastName: string;
  birthDate: {
    month: string;
    day: string;
    year: string;
  };
  relationship: string;
}
