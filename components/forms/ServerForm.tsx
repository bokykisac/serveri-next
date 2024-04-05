"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Button } from "@/ui/Button";
import { DialogClose } from "@/components/ui/Dialog";
import { Combobox } from "@/components/Combobox";
import axios from "@/lib/axios";
import { SelectOption } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "@/ui/Spinner";
import { Input } from "@/ui/Input";

interface ServerFormProps {
  server?: any;
}

const formSchema = z.object({
  partner: z.string(),
  ipAddress: z.string(),
  ipAddress2: z.string(),
  role: z.string(),
  hostname: z.string(),
  serverOs: z.string(),
  colleague: z.string(),
  model: z.string(),
  installationDate: z.date(),
  cpuNumber: z.number(),
  cpuType: z.string(),
  ram: z.string(),
  hddDescription: z.string(),
  comment: z.string(),
});

export type ServerForm = z.infer<typeof formSchema>;

type ColleagueOption = {
  id: number;
  firstName: string;
  lastName: string;
};

const fetchAllPartners = async () => {
  const { data } = await axios.get<SelectOption[]>("/poslovni-partner/getAll");
  const options = data.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  return options;
};

const fetchAllOS = async () => {
  const { data } = await axios.get<SelectOption[]>("/os/getAll");
  console.log(data);
  const options = data.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  return options;
};

const fetchAllColleagues = async () => {
  const { data } = await axios.get<ColleagueOption[]>(
    "/zaposleni/getAllForSelect",
  );
  console.log(data);
  const options = data.map((data) => {
    return {
      value: data.id,
      label: `${data.firstName} ${data.lastName}`,
    };
  });
  return options;
};

const ServerForm = ({ server }: ServerFormProps) => {
  const { data: partnerOptions, isLoading: partnerOptionsLoading } = useQuery({
    queryKey: ["allPartnersFormQuery"],
    queryFn: () => fetchAllPartners(),
  });

  const { data: OSOptions, isLoading: OSOptionsLoading } = useQuery({
    queryKey: ["allOSFormQuery"],
    queryFn: () => fetchAllOS(),
  });

  const { data: colleaguesOptions, isLoading: colleaguesOptionsLoading } =
    useQuery({
      queryKey: ["allColleaguesFormQuery"],
      queryFn: () => fetchAllColleagues(),
    });

  const form = useForm<ServerForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partner: undefined,
      ipAddress: undefined,
      ipAddress2: undefined,
      role: undefined,
      hostname: undefined,
      serverOs: undefined,
      colleague: undefined,
      model: undefined,
      installationDate: undefined,
      cpuNumber: undefined,
      cpuType: undefined,
      ram: undefined,
      hddDescription: undefined,
      comment: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (partnerOptionsLoading || partnerOptionsLoading)
    return <Spinner className="m-auto" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="partner"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Business partner*</FormLabel>
              <Combobox<ServerForm>
                field={field}
                fieldLabel="partner"
                form={form}
                fieldName="partner"
                options={partnerOptions || []}
              />
              <FormDescription>
                Business partner for which you are creating a server.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="ipAddress"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>IP Address 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter IP Address 1"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ipAddress2"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>IP Address 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter IP Address 2"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hostname"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Hostname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter hostname"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="serverOs"
            render={({ field }) => (
              <FormItem className="flex basis-1/2 flex-col">
                <FormLabel>Server OS</FormLabel>
                <Combobox<ServerForm>
                  field={field}
                  fieldLabel="OS"
                  form={form}
                  fieldName="serverOs"
                  options={OSOptions || []}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="colleague"
            render={({ field }) => (
              <FormItem className="flex basis-1/2 flex-col">
                <FormLabel>Colleague</FormLabel>
                <Combobox<ServerForm>
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

        <FormDescription>Fields marked with * are required.</FormDescription>

        <div className="flex flex-row justify-between pt-4">
          <DialogClose asChild>
            <Button size="lg" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" type="submit" isLoading={false}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServerForm;
