import { PersonalInfo } from './personal-info.model';
import { ContactInfo } from './contact-info.model';
import { EmploymentInfo } from './employment-info.model';

export interface PolicyHolder {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  employmentInfo: EmploymentInfo;
}
