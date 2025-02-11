import React from "react";

// Dependencies
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

// Interfaces
import { PatientFieldProps } from "@/interfaces/patient";

const SelectField: React.FC<PatientFieldProps> = ({
  name,
  description,
  formControl,
  placeholder,
  options,
}) => {
  return (
    <FormField
      control={formControl as Control<any>}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? "Select a option"} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((value: any) => (
                  <SelectItem
                    key={value?.value ?? value}
                    value={value?.value ?? value}
                  >
                    {value?.label ?? value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectField;
