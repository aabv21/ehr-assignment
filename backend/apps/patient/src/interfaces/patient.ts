export interface Patient {
  id: string;
  name?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  email?: string;
  address?: string;
  ehrSystem?: string;
  dateOfDeath?: string;
  medicalHistory?: string;
  medications?: string;
  allergies?: string;
  vitals?: string;
  createdAt: string;
}

export interface PatientWithDifferentEhr extends Patient {
  p_name?: string;
  p_gender?: string;
  p_ehrSystem?: string;
  p_dateOfBirth?: string;
  p_dateOfDeath?: string;
  p_phoneNumber?: string;
  p_email?: string;
  p_address?: string;
  p_medicalHistory?: string;
  p_medications?: string;
  p_allergies?: string;
  p_vitals?: string;
  createdAt: string;
}
