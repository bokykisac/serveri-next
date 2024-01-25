"use client";

import { Combobox } from "@/components/Combobox";
import axios from "@/lib/axios";
import { Partner, VPNType } from "@/types/api";
import { Button } from "@/ui/Button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Spinner from "@/ui/Spinner";

interface VPNConnectionFormProps {
  VPNConnection?: any;
}

const formSchema = z.object({
  partner: z.string(),
  serverVpnType: z.string(),
});

export type VPNConnectionForm = z.infer<typeof formSchema>;

const fetchAllPartners = async () => {
  const { data } = await axios.get<Partner[]>("/poslovni-partner/getAll");
  const partnerOptions = data.map((partner) => {
    return {
      value: partner.id,
      label: partner.name,
    };
  });
  return partnerOptions;
};

const fetchAllVpnTypes = async () => {
  const { data } = await axios.get<VPNType[]>("/vpn-type/getAll");
  const vpnTypeOptions = data.map((vpn) => {
    console.log(typeof vpn.id);
    return {
      value: vpn.id,
      label: vpn.name,
    };
  });
  return vpnTypeOptions;
};

const VPNConnectionForm = ({ VPNConnection }: VPNConnectionFormProps) => {
  const { data: partnerOptions, isLoading: partnerOptionsLoading } = useQuery({
    queryKey: ["allPartnersFormQuery"],
    queryFn: () => fetchAllPartners(),
  });
  const { data: vpnTypeOptions, isLoading: vpnTypeOptionsLoading } = useQuery({
    queryKey: ["allVpnTypesQuery"],
    queryFn: () => fetchAllVpnTypes(),
  });

  const form = useForm<VPNConnectionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partner: "",
      serverVpnType: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  if (partnerOptionsLoading || vpnTypeOptionsLoading)
    return <Spinner className="m-auto" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="partner"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Business partner</FormLabel>
              <Combobox
                field={field}
                fieldLabel="partner"
                form={form}
                fieldName="partner"
                options={partnerOptions || []}
              />
              <FormDescription>
                This is the partner for which you create a VPN connection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serverVpnType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>VPN type</FormLabel>
              <Combobox
                field={field}
                fieldLabel='VPN Type'
                form={form}
                fieldName="serverVpnType"
                options={vpnTypeOptions || []}
              />
              <FormDescription>The type of an VPN connection.</FormDescription>
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
