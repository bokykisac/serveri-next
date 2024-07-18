"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

// Define schema using zod
const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
  })
  .superRefine(({ email, confirmEmail }, ctx) => {
    if (email !== confirmEmail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Emails do not match",
        path: ["confirmEmail"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const AddNewUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange", // Enable validation on change
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/3">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="confirmEmail"
          >
            Confirm email
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="confirmEmail"
            type="email"
            placeholder="Confirm email"
            {...register("confirmEmail")}
          />
          {errors.confirmEmail && (
            <p className="text-xs italic text-red-500">
              {errors.confirmEmail.message}
            </p>
          )}
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={!isValid}>
            Add user
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddNewUserForm;
