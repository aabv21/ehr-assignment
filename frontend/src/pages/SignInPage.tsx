import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Dependencies
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
import InputField from "@/components/fields/InputField";

// Interfaces
import { signInFormSchema } from "@/interfaces/signIn";
import { toast } from "@/hooks/use-toast";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    const { email } = values;
    setLoading(true);
    if (!isSigningIn) {
      try {
        toast({ description: `User ${email} signed in successfully` });
      } catch (err) {
        setIsSigningIn(false);
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-row justify-center h-full">
        <div className="flex flex-col justify-center items-center h-full">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email below to access your account
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
                    </div>
                    <Button
                      id="signinButton"
                      disabled={isSigningIn || schema?.formState?.isSubmitting}
                      type="submit"
                      className="w-full p-6"
                    >
                      {isSigningIn || schema?.formState?.isSubmitting
                        ? "Signing In..."
                        : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full gap-2 space-y-4">
                <div className="flex flex-row justify-center">
                  <p className="text-[14px]">
                    Dont have an account?{" "}
                    <a
                      href="signup"
                      className="text-[14px] hover:text-blue-500 underline"
                    >
                      Sign Up
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
