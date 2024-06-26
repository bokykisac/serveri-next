"use client";

import { Combobox } from "@/components/Combobox";
import axios from "@/lib/axios";
import { SelectOption, VPNConnection, VPNType } from "@/types/api";
import { Button } from "@/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Spinner from "@/ui/Spinner";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "@/ui/Toast";
import { DialogClose } from "@/components/ui/Dialog";
import { SectionContext } from "../SectionContext";

interface VPNConnectionFormProps {
  VPNConnection?: VPNConnection;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  partner: z.string(),
  serverVpnType: z.number(),
  ipAddress: z.string(),
  presharedKey: z.string(),
  username: z.string(),
  password: z.string(),
  groupUsername: z.string(),
  groupPassword: z.string(),
  file: z.any(),
  filename: z.string(),
  fileBase64: z.string(),
  description: z.string(),
});

export type VPNConnectionForm = z.infer<typeof formSchema>;

const fetchAllPartners = async () => {
  const { data } = await axios.get<SelectOption[]>("/poslovni-partner/getAll");
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
    return {
      value: vpn.id,
      label: vpn.name,
    };
  });
  return vpnTypeOptions;
};

const VPNConnectionForm = ({
  VPNConnection,
  setOpen,
}: VPNConnectionFormProps) => {
  const { selectedPartner } = useContext(SectionContext);
  const queryClient = useQueryClient();

  const { data: partnerOptions, isLoading: partnerOptionsLoading } = useQuery({
    queryKey: ["allPartnersFormQuery"],
    queryFn: () => fetchAllPartners(),
  });
  const { data: vpnTypeOptions, isLoading: vpnTypeOptionsLoading } = useQuery({
    queryKey: ["allVpnTypesQuery"],
    queryFn: () => fetchAllVpnTypes(),
  });

  const [showFilename, setShowfilename] = useState<boolean>(
    !!VPNConnection?.file,
  );

  const isUpdating = !!VPNConnection;

  const mutationFunction = (values: VPNConnectionForm) => {
    if (isUpdating) {
      return axios.put("/vpn/update", { ...values, id: VPNConnection.id });
    }

    return axios.post("/vpn/save", values);
  };

  const VPNConnectionMutation = useMutation({
    mutationFn: (values: VPNConnectionForm) => {
      return mutationFunction(values)
        .then(() => {
          toast({
            title: "Success",
            message: "VPN connection successfully created.",
            type: "success",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            message: "Failed to create new VPN connection, please try again.",
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
        serverVpnType: VPNConnection.serverVpnType.id,
        ipAddress: VPNConnection.ipAddress,
        presharedKey: VPNConnection.presharedKey,
        username: VPNConnection.username,
        password: VPNConnection.password,
        groupUsername: VPNConnection.groupUsername,
        groupPassword: VPNConnection.groupPassword,
        file: undefined,
        fileBase64: VPNConnection.file || "",
        filename: VPNConnection.filename || "",
        description: VPNConnection.description,
      }
    : {
        partner: undefined,
        serverVpnType: undefined,
        ipAddress: undefined,
        presharedKey: "",
        username: undefined,
        password: undefined,
        groupUsername: "",
        groupPassword: "",
        file: undefined,
        fileBase64: "",
        filename: "",
        description: "",
      };

  const form = useForm<VPNConnectionForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = (ev) => {
        const fileString = ev?.target?.result as string;
        const c = fileString?.indexOf(",");

        if (c === null) {
          toast({
            title: "Error",
            message: "There was an error during file upload. Please try again.",
            type: "error",
          });
          return;
        }

        let base64String = fileString;

        if (c !== null) {
          base64String = fileString.substring(c + 1, fileString.length);
        }

        form.setValue("filename", file.name);
        form.setValue("fileBase64", base64String);
        setShowfilename(false);
      };
      reader.onerror = () => {
        toast({
          title: "Error",
          message: "There was an error during file upload. Please try again.",
          type: "error",
        });
      };
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      file: values.fileBase64,
    };

    delete (data as any).fileBase64;

    VPNConnectionMutation.mutate(data);
  };

  if (partnerOptionsLoading || vpnTypeOptionsLoading)
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
              <FormLabel>VPN type*</FormLabel>
              <Combobox
                field={field}
                fieldLabel="VPN Type"
                form={form}
                fieldName="serverVpnType"
                options={vpnTypeOptions || []}
              />
              <FormDescription>The type of an VPN connection.</FormDescription>
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
                <FormLabel>IP Address*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter IP Address"
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
            name="presharedKey"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Pre-shared key</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter pre-shared key"
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
            name="username"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Username*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
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
            name="password"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Password*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password"
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
            name="groupUsername"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Group username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter group username"
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
            name="groupPassword"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Group password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter group password"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  placeholder="Upload a file"
                  className="h-10"
                  type="file"
                  {...field}
                  onChange={onFileInputChange}
                />
              </FormControl>
              {showFilename && (
                <div>
                  <p>
                    Current file:{" "}
                    <span className="text-primary">
                      {VPNConnection?.filename}
                    </span>
                  </p>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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

        <FormDescription>Fields marked with * are required.</FormDescription>

        <div className="flex flex-row justify-between pt-4">
          <DialogClose asChild>
            <Button size="lg" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            type="submit"
            isLoading={VPNConnectionMutation.isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VPNConnectionForm;
