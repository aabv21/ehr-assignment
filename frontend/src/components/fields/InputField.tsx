import React from "react";

// Dependencies
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Interfaces
import { SignUpFieldProps } from "@/interfaces/signUp";
import { SignInFieldProps } from "@/interfaces/signIn";
import { PatientFieldProps } from "@/interfaces/patient";

const InputField: React.FC<
  SignUpFieldProps | SignInFieldProps | PatientFieldProps
> = ({ name, placeholder, description, inputType, formControl, disabled }) => {
  return (
    <FormField
      control={formControl as Control<any>}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
