// Dependencies
import { z } from "zod";
import type { Control, FieldPath } from "react-hook-form";

// Define the form schema
export const patientFormSchema = z.object({
  ehrSystem: z.enum(["Athena", "Allscripts"]),
  name: z.string().min(1, "Name is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  insurancePolicyNumber: z.string().min(1, "Policy number is required"),
  primaryCarePhysician: z.string().min(1, "Primary care physician is required"),
  allergies: z.string(),
  currentMedications: z.string(),
  medicalHistory: z.string(),
  socialHistory: z.string(),
  familyHistory: z.string(),
});

export interface PatientFieldProps {
  name: FieldPath<z.infer<typeof patientFormSchema>>;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof patientFormSchema>>;
  options?: Array<string>;
}
