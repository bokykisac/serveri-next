"use client";

import { Button } from "@/ui/Button";
import ErrorMessage from "@/ui/ErrorMessage";
import FormInput from "@/components/ui/FormInput";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordField from "@/components/PasswordField";

type UserAuthValues = {
  username: string;
  password: string;
};

const UserAuthForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (
    values: UserAuthValues,
    { setSubmitting }: FormikHelpers<UserAuthValues>,
  ) => {
    console.log("login");
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/",
    });
    console.log("response from next signIn");
    console.log(res);

    if (!res) {
      throw new Error("Unknown Error occurred.");
    }

    setSubmitting(false);

    if (!res.ok) return setErrorMessage(res.error || null);

    setErrorMessage(null);
    router.replace(res.url!);
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full">
          <Field
            as={FormInput}
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
            renderPrefix={() => <User className="ml-3 text-slate-500" />}
          >
            Username
          </Field>
          <PasswordField
            type="password"
            name="password"
            placeholder="Enter your password"
          >
            Password
          </PasswordField>
          <ErrorMessage error={errorMessage} position="center" />
          <Button isLoading={isSubmitting} type="submit" className="w-full">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserAuthForm;
