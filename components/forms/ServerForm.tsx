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
import { SelectOption, Server } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/ui/Spinner";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { toast } from "@/ui/Toast";
import { Dispatch, SetStateAction, useContext } from "react";
import { SectionContext } from "@/components/SectionContext";
import { format } from "date-fns";
import { Checkbox } from "@/ui/Checkbox";

interface ServerFormProps {
  server?: Server;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  partner: z.string(),
  ipAddress: z.string(),
  ipAddress2: z.string(),
  role: z.string(),
  hostname: z.string(),
  serverOs: z.string(),
  colleague: z.number(),
  model: z.string(),
  installationDate: z.string(),
  cpuNumber: z.string(),
  cpuType: z.string(),
  ram: z.string(),
  hddDescription: z.string(),
  comment: z.string(),
  active: z.boolean(),
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

  data.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

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
  const options = data.map((data) => {
    return {
      value: data.id,
      label: `${data.firstName} ${data.lastName}`,
    };
  });
  return options;
};

const ServerForm = ({ server, setOpen }: ServerFormProps) => {
  const queryClient = useQueryClient();
  const { selectedPartner } = useContext(SectionContext);

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

  const isUpdating = !!server;

  const mutationFunction = (values: ServerForm) => {
    if (isUpdating) {
      return axios.put("/server/update", {
        ...values,
        id: server.id,
      });
    }

    return axios.post("/server/save", { ...values, active: true });
  };

  const serverMutation = useMutation({
    mutationFn: (values: ServerForm) => {
      return mutationFunction(values)
        .then(() => {
          toast({
            title: "Success",
            message: "Server successfully created.",
            type: "success",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            message: "Failed to update server, please try again.",
            type: "error",
          });
          throw new Error("Mutation failed");
        });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["partnerClickQuery", selectedPartner?.id],
      });
      setOpen(false);
    },
  });
  const defaultValues = isUpdating
    ? {
        partner: selectedPartner?.id as string,
        ipAddress: server.ipAddress,
        ipAddress2: server.ipAddress2,
        role: server.role,
        hostname: server.hostname,
        serverOs: server.serverOS.id,
        colleague: server.consultantId,
        model: server.model,
        installationDate: format(
          new Date(server.installationDate),
          "yyyy-MM-dd",
        ),
        cpuNumber: server.cpuNumber ? server.cpuNumber.toString() : "",
        cpuType: server.cpuType,
        ram: server.ram ? server.ram.toString() : "",
        hddDescription: server.hddDescription,
        comment: server.comment,
        active: server.active,
      }
    : {
        partner: selectedPartner ? (selectedPartner.id as string) : undefined,
        ipAddress: undefined,
        ipAddress2: "",
        role: undefined,
        hostname: undefined,
        serverOs: undefined,
        colleague: undefined,
        model: undefined,
        installationDate: undefined,
        cpuNumber: "",
        cpuType: "",
        ram: "",
        hddDescription: "",
        comment: "",
        active: false,
      };

  const form = useForm<ServerForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    serverMutation.mutate(values);
  };

  if (partnerOptionsLoading || OSOptionsLoading || colleaguesOptionsLoading)
    return <Spinner className="m-auto" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="partner"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Business partner *</FormLabel>
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
                <FormLabel>IP Address 1 *</FormLabel>
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
                <FormLabel>Role *</FormLabel>
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
                <FormLabel>Hostname *</FormLabel>
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
                <FormLabel>Server OS *</FormLabel>
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
                <FormLabel>Colleague *</FormLabel>
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

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Model *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter model"
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
            name="installationDate"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Installation date *</FormLabel>
                <FormControl>
                  <Input type="date" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="cpuNumber"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>No. CPU</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter CPU number"
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
            name="cpuType"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>CPU type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter CPU type"
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
            name="ram"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>RAM</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter RAM"
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
            name="hddDescription"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>HDD Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isUpdating && (
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is active</FormLabel>
                </div>
              </FormItem>
            )}
          />
        )}

        <FormDescription>Fields marked with * are required.</FormDescription>

        <div className="flex flex-row justify-between pt-4">
          <DialogClose asChild>
            <Button size="lg" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button size="lg" type="submit" isLoading={serverMutation.isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServerForm;
