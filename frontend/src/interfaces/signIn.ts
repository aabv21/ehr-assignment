// Dependencies
import { z } from "zod";
import type { Control, FieldPath } from "react-hook-form";

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 character(s)" }),
});

export interface SignInFieldProps {
  name: FieldPath<z.infer<typeof signInFormSchema>>;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<typeof signInFormSchema>>;
  options?: Array<string>;
}
