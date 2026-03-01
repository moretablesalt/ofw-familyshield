export interface ContactInfo {
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
