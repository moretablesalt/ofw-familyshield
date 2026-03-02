import { Injectable, signal } from '@angular/core';
import { PolicyHolder } from '../../model/policy-holder/policy-holder.model';
import { PersonalInfo } from '../../model/policy-holder/personal-info.model';
import { ContactInfo } from '../../model/policy-holder/contact-info.model';
import { EmploymentInfo } from '../../model/policy-holder/employment-info.model';
import { SelectOption } from '../../../../shared/ui/drop-down/drop-down';
import { Dependent } from '../../model/dependent.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyHolderStateService {
  readonly formModel = signal<PolicyHolder>(this.createInitialPolicyHolder());

  // --------- RESET ---------
  reset(): void {
    this.formModel.set(this.createInitialPolicyHolder());
  }

  // ---------------- DEPENDENT METHODS ----------------

  addDependent(): void {
    this.formModel.update((model) => ({
      ...model,
      dependents: [...model.dependents, this.createInitialDependent()],
    }));
  }

  removeDependent(index: number): void {
    this.formModel.update((model) => ({
      ...model,
      dependents: model.dependents.filter((_, i) => i !== index),
    }));
  }

  // ---------------- TEST DATA ----------------

  populateTestData(): void {
    this.formModel.set({
      personalInfo: {
        firstName: 'Juan',
        middleName: 'Santos',
        lastName: 'Dela Cruz',
        suffix: '',
        dob: { month: '01', day: '15', year: '1990' },
        gender: 'MALE',
        civilStatus: 'single',
        nationality: 'FILIPINO',
      },
      contactInfo: {
        address: {
          province: 'CAGAYAN VALLEY',
          city: 'MANILA',
          barangay: 'BRGY. 1',
          zipCode: '1000',
          street: '123 Sample St.',
        },
        email: 'test.user@example.com',
        mobile: '09171234567',
        passportNo: 'P1234567',
        passportExpiryDate: '2030-12-31',
      },
      employmentInfo: {
        jobTitle: 'Welder',
        employerName: 'Sample Employer Inc.',
        fullAddress: 'United Arab Emirates',
      },
      dependents: [
        {
          firstName: 'Maria',
          middleInitial: 'A',
          lastName: 'Dela Cruz',
          birthDate: { month: '05', day: '10', year: '2015' },
          relationship: 'CHILD',
        },
      ],
    });
  }

  // --------- DEFAULT FACTORIES ---------

  public createInitialPolicyHolder(): PolicyHolder {
    return {
      personalInfo: this.createInitialPersonalInfo(),
      contactInfo: this.createInitialContactInfo(),
      employmentInfo: this.createInitialEmploymentInfo(),
      dependents: [],
    };
  }

  private createInitialPersonalInfo(): PersonalInfo {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      dob: { month: '', day: '', year: '' },
      gender: 'MALE',
      civilStatus: '',
      nationality: '',
    };
  }

  private createInitialContactInfo(): ContactInfo {
    return {
      address: {
        province: '',
        city: '',
        barangay: '',
        zipCode: '',
        street: '',
      },
      email: '',
      mobile: '',
      passportNo: '',
      passportExpiryDate: '',
    };
  }

  private createInitialEmploymentInfo(): EmploymentInfo {
    return {
      jobTitle: '',
      employerName: '',
      fullAddress: '',
    };
  }

  private createInitialDependent(): Dependent {
    return {
      firstName: '',
      middleInitial: '',
      lastName: '',
      birthDate: { month: '', day: '', year: '' },
      relationship: '',
    };
  }

  readonly CIVIL_STATUS_OPTIONS: SelectOption[] = [
    { description: 'Single', value: 'single' },
    { description: 'Married', value: 'married' },
    { description: 'Divorced', value: 'divorced' },
    { description: 'Widowed', value: 'widowed' },
  ];

  readonly NATIONALITY_OPTIONS: SelectOption[] = [{ description: 'Filipino', value: 'FILIPINO' }];

  readonly MONTH_OPTIONS: SelectOption[] = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return {
      description: date.toLocaleString('en-US', { month: 'long' }),
      value: String(i + 1).padStart(2, '0'),
    };
  });

  readonly DAY_OPTIONS: SelectOption[] = Array.from({ length: 31 }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    return { description: day, value: day };
  });

  readonly YEAR_OPTIONS: SelectOption[] = (() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;

    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
      const year = String(currentYear - i);
      return { description: year, value: year };
    });
  })();

  readonly PROVINCE_OPTIONS: SelectOption[] = [
    { description: 'Cagayan Valley', value: 'CAGAYAN VALLEY' },
  ];

  readonly CITY_OPTIONS: SelectOption[] = [{ description: 'Manila', value: 'MANILA' }];

  readonly BARANGAY_OPTIONS: SelectOption[] = [{ description: 'Brgy. 1', value: 'BRGY. 1' }];

  readonly ZIPCODE_OPTIONS: SelectOption[] = [{ description: '1000', value: '1000' }];
}
