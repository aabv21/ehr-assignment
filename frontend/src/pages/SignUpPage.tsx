// Dependencies
import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

import InputField from "@/components/fields/InputField";
// import SelectField from "@/components/fields/SelectField";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Interfaces
import { signUpFormSchema, PasswordsControl } from "@/interfaces/signUp";

export default function SignIn() {
  const { toast } = useToast();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [arePasswordsSame, setArePasswordsSame] = useState<boolean>(false);

  const schema = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onChangeConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    setArePasswordsSame(password && value && password === value ? true : false);
  };

  const onSubmit = async (
    values: z.infer<typeof signUpFormSchema> & PasswordsControl
  ) => {
    const { email, name } = values;
    if (schema?.formState?.isSubmitting) {
      try {
        toast({
          description: `User ${name} with email ${email} created successfully`,
        });
      } catch (err) {
        if (err instanceof Error) {
          toast({ variant: "destructive", description: err.message });
        }
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <div className="flex flex-row justify-center h-full">
        <div className="flex flex-col justify-center items-center h-full">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Enter your name, email and password below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                <Form {...schema}>
                  <form
                    onSubmit={schema.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-1 gap-2">
                      <InputField
                        name="name"
                        placeholder="Full name"
                        formControl={schema.control}
                      />
                      <InputField
                        name="email"
                        placeholder="Email"
                        inputType="email"
                        formControl={schema.control}
                      />
                      <FormField
                        control={schema.control}
                        name={"password"}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  id="password"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                  onChange={(e) => {
                                    field?.onChange(e.target.value);
                                    onChangePassword(e.target.value);
                                  }}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground cursor-pointer">
                                  {showPassword ? (
                                    <Eye
                                      className="h-5 w-5"
                                      onClick={togglePasswordVisibility}
                                    />
                                  ) : (
                                    <EyeOff
                                      className="h-5 w-5"
                                      onClick={togglePasswordVisibility}
                                    />
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage>
                              {schema?.formState?.errors?.password?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={schema.control}
                        name={"confirmPassword"}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  id="confirmPassword"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm password"
                                  onChange={(e) => {
                                    field?.onChange(e.target.value);
                                    onChangeConfirmPassword(e.target.value);
                                  }}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground cursor-pointer">
                                  {showConfirmPassword ? (
                                    <Eye
                                      className="h-5 w-5"
                                      onClick={toggleConfirmPasswordVisibility}
                                    />
                                  ) : (
                                    <EyeOff
                                      className="h-5 w-5"
                                      onClick={toggleConfirmPasswordVisibility}
                                    />
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage>
                              {
                                schema?.formState?.errors?.confirmPassword
                                  ?.message
                              }
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      disabled={schema?.formState?.isSubmitting}
                      type="submit"
                      className="w-full p-6"
                    >
                      {schema?.formState?.isSubmitting
                        ? "Signing Up..."
                        : "Create account"}
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full gap-2 space-y-4">
                <div className="flex flex-row justify-center">
                  <p className="text-[14px]">
                    Already have an account?{" "}
                    <a
                      className="text-[14px] hover:text-blue-500 underline"
                      href="/login"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
