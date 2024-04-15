import { Dispatch, SetStateAction, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SectionContext } from "../SectionContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Combobox } from "@/components/Combobox";
import axios from "@/lib/axios";
import { SelectOption, Server } from "@/types/api";
import Spinner from "@/ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/ui/Button";
import { DialogClose } from "@/components/ui/Dialog";
import { Input } from "@/ui/Input";
import { Textarea } from "@/ui/Textarea";
import { Checkbox } from "@/ui/Checkbox";
import { toast } from "@/ui/Toast";

interface ServerFunctionFormProps {
  serverFunction: any;
  selectedServer: Server;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  server: z.number(),
  functionType: z.string(),
  username: z.string(),
  password: z.string(),
  proccessInstanceUrl: z.string(),
  port: z.string(),
  version: z.string(),
  location: z.string(),
  adminAccount: z.boolean(),
  custom1: z.string(),
  custom2: z.string(),
  custom3: z.string(),
  description: z.string(),
});

export type ServerFunctionForm = z.infer<typeof formSchema>;

const fetchAllFunctionalityTypes = async () => {
  const { data } = await axios.get<SelectOption[]>("/server-function-type/all");
  const options = data.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  return options;
};

const ServerFunctionForm = ({
  serverFunction,
  selectedServer,
  setOpen,
}: ServerFunctionFormProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["allServerFunctionalityTypes"],
    queryFn: () => fetchAllFunctionalityTypes(),
  });

  const createNewFunctionMutation = useMutation({
    mutationFn: (values: ServerFunctionForm) => {
      return axios
        .put("/server-funkcije/save", values)
        .then(() => {
          toast({
            title: "Success",
            message: "Server connection successfully created.",
            type: "success",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            message: "Failed to create new VPN connection, please try again.",
            type: "error",
          });
        });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["serverClickQuery", selectedServer?.id],
      });
      setOpen(false);
    },
  });

  const form = useForm<ServerFunctionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server: selectedServer.id,
      functionType: undefined,
      username: undefined,
      password: undefined,
      proccessInstanceUrl: undefined,
      port: undefined,
      version: undefined,
      location: undefined,
      adminAccount: undefined,
      custom1: undefined,
      custom2: undefined,
      custom3: undefined,
      description: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createNewFunctionMutation.mutate(values);
  };

  const serverOption = selectedServer
    ? [
        {
          value: selectedServer.id,
          label: `${selectedServer.hostname || selectedServer.ipAddress}`,
        },
      ]
    : [];

  if (isLoading) return <Spinner className="m-auto" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="server"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Server</FormLabel>
              <Combobox<ServerFunctionForm>
                disabled
                field={field}
                fieldLabel="server"
                form={form}
                fieldName="server"
                options={serverOption}
              />
              <FormDescription>
                Server for which you are creating a functionality.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="functionType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Functionality type</FormLabel>
              <Combobox<ServerFunctionForm>
                field={field}
                fieldLabel="functionType"
                form={form}
                fieldName="functionType"
                options={data || []}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Username</FormLabel>
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
                <FormLabel>Password</FormLabel>
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
            name="proccessInstanceUrl"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Process instance URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter URL" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input placeholder="Enter port" className="h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-x-3">
          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter version"
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
            name="location"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location"
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
            name="custom1"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Custom 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter custom1"
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
            name="custom2"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Custom 2</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter custom2"
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
            name="description"
            render={({ field }) => (
              <FormItem className="basis-1/2">
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

          <FormField
            control={form.control}
            name="custom3"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>Custom 3</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter custom3"
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
          name="adminAccount"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Admin account</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormDescription>Fields marked with * are required.</FormDescription>

        <hr />

        <div className="flex flex-row justify-between pt-4">
          <DialogClose asChild>
            <Button size="lg" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            type="submit"
            isLoading={createNewFunctionMutation.isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServerFunctionForm;
