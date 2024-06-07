"use client";

import { ServerFunction } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import clsx from "clsx";
import { Button } from "@/ui/Button";
import ServerFunctionForm from "@/components/forms/ServerFunctionForm";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useContext, useState } from "react";
import RemoveConfirmationModal from "@/components/RemoveConfirmationModal";
import axios from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { SectionContext } from "@/components/SectionContext";

interface ColumnActionWrapperProps
  extends CellContext<ServerFunction, unknown> {}

// TODO: create component
const ActionWrapper = ({ row }: ColumnActionWrapperProps) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const queryClient = useQueryClient();
  const { selectedServer } = useContext(SectionContext);

  const serverFunction = row.original;

  const buttonClasses = clsx(
    "h-5 w-8 p-0 hover:bg-inherit hover:text-primary",
    row.getIsSelected() && "hover:bg-red-300 hover:text-slate-900",
  );

  const removeServerFunction = async () => {
    await axios.delete(`/server-funkcije/delete/${serverFunction.id}`);
    await queryClient.invalidateQueries({
      queryKey: ["serverClickQuery", selectedServer?.id],
    });
    setOpenConfirmationModal(false);
  };

  return (
    <>
      <Dialog open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="dropdown" className={buttonClasses}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem onClick={() => setOpenConfirmationModal(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Remove</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="max-h-full max-w-3xl overflow-y-scroll">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center text-2xl">
              Update existing{" "}
              <span className="text-primary">Server function</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Fill out the required fields for the Server function here. Click
              save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ServerFunctionForm
            serverFunction={serverFunction}
            setOpen={setOpenDropdown}
          />
        </DialogContent>
      </Dialog>
      <RemoveConfirmationModal
        open={openConfirmationModal}
        setOpen={setOpenConfirmationModal}
        removeAction={removeServerFunction}
      >
        You are about to remove{" "}
        <span className="font-bold">server function </span>with ID of{" "}
        <span className="font-semibold text-primary">{serverFunction.id}</span>{" "}
        from server{" "}
        <span className="font-semibold text-primary">
          {selectedServer?.hostname || selectedServer?.ipAddress}
        </span>
      </RemoveConfirmationModal>
    </>
  );
};

export const columns: ColumnDef<ServerFunction>[] = [
  {
    accessorKey: "serverFunctionType",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.serverFunctionType.name;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return <CopyButton>{row.getValue("username")}</CopyButton>;
    },
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      return <CopyButton>{row.getValue("password")}</CopyButton>;
    },
  },
  {
    accessorKey: "proccessInstanceUrl",
    header: "URL Instance PID DIR",
  },
  {
    accessorKey: "port",
    header: "Port",
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "custom1",
    header: "Custom1",
  },
  {
    accessorKey: "custom2",
    header: "Custom2",
  },
  {
    accessorKey: "custom3",
    header: "Custom3",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ActionWrapper,
    enableHiding: false,
  },
];
