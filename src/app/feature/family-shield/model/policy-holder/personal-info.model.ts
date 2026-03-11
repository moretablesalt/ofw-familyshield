export interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: {
    month: string;
    day: string;
    year: string;
  };
  gender: 'MALE' | 'FEMALE';
  civilStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'SEPARATED' ;
  nationality: string;
}
