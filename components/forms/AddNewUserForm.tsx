"use client";

import { Button } from "@/components/ui/Button";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox } from "../Combobox";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { toast } from "../ui/Toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type ColleagueOption = {
  id: number;
  firstName: string;
  lastName: string;
};

const fetchAllColleagues = async () => {
  const { data } = await axios.get<ColleagueOption[]>(
    "/zaposleni/getAllForSelect",
  );
  const options = data.map((data) => {
    return {
      value: data.id,
      label: `${data.firstName} ${data.lastName}`,
    };
  });
  return options;
};

// Define schema using zod
const schema = z
  .object({
    username: z.string().min(1, "Username is required"),
    colleague: z.number(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const AddNewUserForm = () => {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange", // Enable validation on change
  });

  const { data: colleaguesOptions, isLoading: colleaguesOptionsLoading } =
    useQuery({
      queryKey: ["allColleaguesFormQuery"],
      queryFn: () => fetchAllColleagues(),
    });

  const createNewUser = useMutation({
    mutationFn: (values: FormData) => axios.post("/auth/register", values),
    onSuccess: () => {
      toast({
        title: "Success",
        message: `User successfully created.`,
        type: "success",
      });
      router.refresh();
    },
    onError: (e: AxiosError) => {
      const message = e?.response?.data as string;

      toast({
        title: "Error",
        message: message || "Failed to create user, try again.",
        type: "error",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    createNewUser.mutate(data);
  };

  if (colleaguesOptionsLoading)
    return <span className="m-auto">Loading...</span>;

  return (
    <Form {...form}>
      <form
        className="w-full rounded-md bg-white p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* New row with Username and Account fields */}
        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <FormField
              control={form.control}
              name="colleague"
              render={({ field }) => (
                <FormItem className="flex basis-1/2 flex-col">
                  <FormLabel>Colleague</FormLabel>
                  <Combobox<FormData>
                    field={field}
                    fieldLabel="colleague"
                    form={form}
                    fieldName="colleague"
                    options={colleaguesOptions || []}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-1/3 flex-col justify-end">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="w-full"
              isLoading={createNewUser.isLoading}
            >
              Add user
            </Button>
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-xs italic text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          <div className="w-1/3">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-xs italic text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="w-1/3">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-xs italic text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddNewUserForm;
