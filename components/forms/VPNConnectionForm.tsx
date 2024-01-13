"use client";

import { Combobox } from "@/components/Combobox";
import { Button } from "@/ui/Button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";


interface VPNConnectionFormProps {
  VPNConnection?: any;
}


const formSchema = z.object({
  partner: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export type VPNConnectionForm = z.infer<typeof formSchema>


const VPNConnectionForm = ({ VPNConnection }: VPNConnectionFormProps) => {
  const form = useForm<VPNConnectionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partner: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="partner"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Business partner</FormLabel>
              <Combobox field={field} form={form} fieldName="partner" options={[]}/>
              <FormDescription>
                This is the partner for which you create a VPN connection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default VPNConnectionForm;
