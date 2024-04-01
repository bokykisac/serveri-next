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

const ServerForm = ({ server }: ServerFormProps) => {
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
                options={[]}
              />
              <FormDescription>
                Business partner for which you are creating a server.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
