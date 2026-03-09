export interface ContactInfo {
  address: {
    region: string;
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
