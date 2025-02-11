// Dependencies
import { z } from "zod";
import type { Control, FieldPath } from "react-hook-form";

export const signUpFormSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required" })
      .min(1, { message: "Full name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 character(s)")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 character(s)")
      .regex(
        /[A-Z]/,
        "Confirm password must contain at least one uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Confirm password must contain at least one lowercase letter"
      )
      .regex(/\d/, "Confirm password must contain at least one digit")
      .regex(
        /[!@#$%^&*]/,
        "Confirm password must contain at least one special character"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password don't match",
    path: ["confirmPassword"], // path of error
  });

export interface SignUpFieldProps {
  name: FieldPath<z.infer<typeof signUpFormSchema>>;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof signUpFormSchema>>;
  options?: Array<string>;
}

export interface PasswordsControl {
  password: string;
  confirmPassword: string;
}
