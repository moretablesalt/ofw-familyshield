import { effect, Injectable, signal } from '@angular/core';
import { disabled, form, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { SelectOption } from '../../../shared/ui/drop-down/drop-down';

interface PersonalInfo {
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
  civilStatus: string;
  nationality: string;
}

interface ContactInfo {
  address: {
    province: string;
    city: string;
    barangay: string;
    zipCode: string;
    street: string;
  };
  email: string;
  mobile: string;
  passportNo: string;
  passportExpiryDate: string;
}

interface EmploymentInfo {
  deploymentType: 'LAND' | 'SEA';
  jobTitle: string;
  employerName: string;
  countryOfEmployment: string;
}

interface PolicyHolder {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  employmentInfo: EmploymentInfo;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {

  private readonly STORAGE_KEY = 'directForm.policyHolder';

  formModel = signal<PolicyHolder>({
    personalInfo: this.createInitialPersonalInfo(),
    contactInfo: this.createInitialContactInfo(),
    employmentInfo: this.createInitialEmploymentInfo()
  });

  readonly schema = (path: SchemaPathTree<PolicyHolder>)  => {
    // personal info
    required(path.personalInfo.firstName, {message: 'First name is required.'});
    required(path.personalInfo.lastName, {message: 'Last name is required.'});
    required(path.personalInfo.dob.month, {message: 'Birth month is required.'});
    required(path.personalInfo.dob.day, {message: 'Birth day is required.'});
    required(path.personalInfo.dob.year, {message: 'Birth year is required.'});
    required(path.personalInfo.gender, {message: 'Gender is required.'});
    required(path.personalInfo.civilStatus, {message: 'Civil status is required.'});
    required(path.personalInfo.nationality, {message: 'Nationality is required.'});

    // contact info
    required(path.contactInfo.address.province, {message: 'Province is required.'});
    required(path.contactInfo.address.city, {message: 'City is required.'});
    required(path.contactInfo.address.barangay, {message: 'Barangay is required.'});
    required(path.contactInfo.address.zipCode, {message: 'Zip code is required.'});
    required(path.contactInfo.address.street, {message: 'Street address is required.'});

    required(path.contactInfo.email, {message: 'Email is required.'});
    required(path.contactInfo.mobile, {message: 'Mobile number is required.'});
    required(path.contactInfo.passportNo, {message: 'Passport number is required.'});
    required(path.contactInfo.passportExpiryDate, {message: 'Passport expiry date is required.'});

    // employment info
    required(path.employmentInfo.deploymentType, {message: 'Deployment type is required.'});
    required(path.employmentInfo.jobTitle, {message: 'Job title is required.'});
    required(path.employmentInfo.employerName, {message: 'Employer name is required.'});
    required(path.employmentInfo.countryOfEmployment, {message: 'Country of employment is required.'});

    disabled(path.employmentInfo.deploymentType);
  }

  readonly form = form(this.formModel, this.schema)

  constructor() {
    this.rehydrateFromSession();

    effect(() => {
      const value = this.formModel(); // track signal
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
    });
  }

  private rehydrateFromSession(): void {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<PolicyHolder>;

      const defaults = this.createInitialPolicyHolder();

      const merged: PolicyHolder = {
        ...defaults,
        ...parsed,

        personalInfo: {
          ...defaults.personalInfo,
          ...parsed.personalInfo,
          dob: {
            ...defaults.personalInfo.dob,
            ...parsed.personalInfo?.dob
          }
        },

        contactInfo: {
          ...defaults.contactInfo,
          ...parsed.contactInfo,
          address: {
            ...defaults.contactInfo.address,
            ...parsed.contactInfo?.address
          }
        },

        employmentInfo: {
          ...defaults.employmentInfo,
          ...parsed.employmentInfo
        }
      };

      this.formModel.set(merged);

    } catch {
      sessionStorage.removeItem(this.STORAGE_KEY);
    }
  }

  clearSession(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.formModel.set(this.createInitialPolicyHolder());
  }

  populateTestData(): void {
    // NOTE: Uses placeholder-only values. Adjust as needed.
    this.formModel.set({
      personalInfo: {
        firstName: 'Juan',
        middleName: 'Santos',
        lastName: 'Dela Cruz',
        suffix: '',
        dob: {
          month: '01',
          day: '15',
          year: '1990'
        },
        gender: 'MALE',
        civilStatus: 'single',
        nationality: 'FILIPINO'
      },
      contactInfo: {
        address: {
          province: 'CAGAYAN VALLEY',
          city: 'MANILA',
          barangay: 'BRGY. 1',
          zipCode: '1000',
          street: '123 Sample St.'
        },
        email: 'test.user@example.com',
        mobile: '09171234567',
        passportNo: 'P1234567',
        passportExpiryDate: '2030-12-31'
      },
      employmentInfo: {
        deploymentType: 'LAND',
        jobTitle: 'Welder',
        employerName: 'Sample Employer Inc.',
        countryOfEmployment: 'United Arab Emirates'
      }
    });
  }

  readonly MONTH_OPTIONS: SelectOption[] =
    Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2000, i, 1);

      return {
        description: date.toLocaleString('en-US', { month: 'long' }),
        value: String(i + 1).padStart(2, '0')
      };
    });

  readonly DAY_OPTIONS: SelectOption[] =
    Array.from({ length: 31 }, (_, i) => {
      const day = String(i + 1).padStart(2, '0');

      return {
        description: day,
        value: day
      };
    });

  readonly YEAR_OPTIONS: SelectOption[] = (() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;

    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => {
        const year = String(currentYear - i);

        return {
          description: year,
          value: year
        };
      }
    );
  })();

  readonly CIVIL_STATUS_OPTIONS: SelectOption[] = [
    { description: 'Single', value: 'single' },
    { description: 'Married', value: 'married' },
    { description: 'Divorced', value: 'divorced' },
    { description: 'Widowed', value: 'widowed' }
  ];

  readonly NATIONALITY_OPTIONS: SelectOption[] = [
    { description: 'Filipino', value: 'FILIPINO' },
  ]

  readonly PROVINCE_OPTIONS: SelectOption[] = [
    { description: 'Cagayan Valley', value: 'CAGAYAN VALLEY' },
  ]

  readonly CITY_OPTIONS: SelectOption[] = [
    { description: 'Manila', value: 'MANILA' },
  ]

  readonly BARANGAY_OPTIONS: SelectOption[] = [
    { description: 'Brgy. 1', value: 'BRGY. 1' },
  ]

  readonly ZIPCODE_OPTIONS: SelectOption[] = [
    { description: '1000', value: '1000' },
  ]

  private createInitialPersonalInfo(): PersonalInfo {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      dob: {
        month: '',
        day: '',
        year: ''
      },
      gender: 'MALE', // default value
      civilStatus: '',
      nationality: ''
    };
  }

  private createInitialContactInfo(): ContactInfo {
    return {
      address: {
        province: '',
        city: '',
        barangay: '',
        zipCode: '',
        street: ''
      },
      email: '',
      mobile: '',
      passportNo: '',
      passportExpiryDate: ''
    };
  }

  createInitialEmploymentInfo(): EmploymentInfo {
    return {
      deploymentType: 'LAND', // default
      jobTitle: '',
      employerName: '',
      countryOfEmployment: ''
    };
  }

  createInitialPolicyHolder(): PolicyHolder {
    return {
      personalInfo: this.createInitialPersonalInfo(),
      contactInfo: this.createInitialContactInfo(),
      employmentInfo: this.createInitialEmploymentInfo()
    };
  }

  focusFirstInvalid() {
    const el = document.querySelector(
      '.field.error input, .field.error select'
    ) as HTMLElement | null;

    el?.focus();
  }

}

