import { Injectable } from '@angular/core';
import { applyEach, disabled, minLength, required, SchemaPathTree } from '@angular/forms/signals';
import { PolicyHolder } from '../../model/policy-holder/policy-holder.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyHolderSchemaService {
  build(path: SchemaPathTree<PolicyHolder>) {
    // Personal Info
    required(path.personalInfo.firstName);
    required(path.personalInfo.lastName);
    required(path.personalInfo.dob.month);
    required(path.personalInfo.dob.day);
    required(path.personalInfo.dob.year);
    required(path.personalInfo.gender);
    required(path.personalInfo.civilStatus);
    required(path.personalInfo.nationality);

    // Contact Info
    required(path.contactInfo.address.province);
    required(path.contactInfo.address.city);
    required(path.contactInfo.address.barangay);
    required(path.contactInfo.address.zipCode);
    required(path.contactInfo.address.street);

    required(path.contactInfo.email);
    required(path.contactInfo.mobile);
    minLength(path.contactInfo.mobile, 11);

    required(path.contactInfo.passportNo);
    required(path.contactInfo.passportExpiryDate);

    // Employment Info
    required(path.employmentInfo.jobTitle);
    required(path.employmentInfo.employerName);
    required(path.employmentInfo.fullAddress);

    applyEach(path.dependents, (dependent) => {
      required(dependent.firstName);
      required(dependent.lastName);
      required(dependent.relationship);
      required(dependent.birthDate.month)
      required(dependent.birthDate.day)
      required(dependent.birthDate.year)
    })

  }
}
