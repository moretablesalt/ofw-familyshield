import { PolicyHolder } from '../model/policy-holder/policy-holder.model';
import { QuoteRequest } from '../model/quote-request.model';
import { ApplicationRequestDto } from '../model/dto/application-request.dto';

export function buildApplicationRequest(
  policyHolder: PolicyHolder,
  quote: QuoteRequest,
): ApplicationRequestDto {
  const p = policyHolder.personalInfo;
  const c = policyHolder.contactInfo;
  const e = policyHolder.employmentInfo;

  return {
    policyHolder: {
      firstName: p.firstName,
      middleName: p.middleName || null,
      lastName: p.lastName,
      suffix: p.suffix || null,
      birthDate: buildDate(p.birthDate),
      gender: p.gender,
      civilStatus: p.civilStatus,
      nationality: p.nationality,

      emailAddress: c.email,
      mobileNumber: c.mobile,
      passportNo: c.passportNo,
      passportExpiryDate: c.passportExpiryDate,

      province: c.address.province,
      city: c.address.city,
      barangay: c.address.barangay,
      zipCode: c.address.zipCode,
      streetAddress: c.address.street,

      jobTitle: e.jobTitle,
      employerName: e.employerName,
      employerAddress: e.fullAddress,
    },

    quote,

    insuredPersons: policyHolder.dependents.map((d) => ({
      firstName: d.firstName,
      middleName: d.middleName || null,
      lastName: d.lastName,
      birthDate: buildDate(d.birthDate),
      relationshipToPolicyHolder: d.relationship,
    })),
  };
}

function buildDate(date: { month: string; day: string; year: string }): string {
  return `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}`;
}
