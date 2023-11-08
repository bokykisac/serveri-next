"use client";

import { Formik, Form, FormikHelpers, Field } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ErrorMessage from "@/ui/ErrorMessage";
import { useRouter } from "next/navigation";
import { User2, KeyRound, User } from "lucide-react";
import PasswordField from "./PasswordField";
import Input from "@/ui/Input";

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
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl: "/",
    });

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
            as={Input}
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
