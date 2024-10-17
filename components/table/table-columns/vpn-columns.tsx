"use client";

import { VPNConnection } from "@/types/api";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import CopyButton from "@/components/CopyButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useState, useContext } from "react";
import VPNConnectionForm from "@/components/forms/VPNConnectionForm";
import RemoveConfirmationModal from "@/components/RemoveConfirmationModal";
import axios from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { SectionContext } from "@/components/SectionContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";
interface ColumnActionWrapperProps
  extends CellContext<VPNConnection, unknown> {}

const ActionWrapper = ({ row }: ColumnActionWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);
  const queryClient = useQueryClient();
  const { selectedPartner } = useContext(SectionContext);
  const { isAdmin } = useCurrentUser();

  const vpnConnection = row.original;

  const buttonClasses = clsx(
    "h-5 w-8 p-0 hover:bg-inherit hover:text-primary",
    row.getIsSelected() && "hover:bg-red-300 hover:text-slate-900",
  );

  const removeVPNConnection = async () => {
    await axios.delete(`/vpn/delete/${vpnConnection.id}`);
    await queryClient.invalidateQueries({
      queryKey: ["partnerClickQuery", selectedPartner?.id],
    });
    setOpenConfirmationModal(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="dropdown" className={buttonClasses}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DialogTrigger asChild>
              <DropdownMenuItem disabled={!isAdmin}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              disabled={!isAdmin}
              onClick={() => setOpenConfirmationModal(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Remove</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="max-h-full max-w-3xl overflow-y-scroll">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center text-2xl">
              Update existing{" "}
              <span className="text-primary">VPN connection</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Fill out the required fields for the VPN connection here. Click
              save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <VPNConnectionForm VPNConnection={vpnConnection} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      <RemoveConfirmationModal
        open={openConfirmationModal}
        setOpen={setOpenConfirmationModal}
        removeAction={removeVPNConnection}
      >
        You are about to remove{" "}
        <span className="font-bold">VPN Connection </span>with ID of{" "}
        <span className="font-semibold text-primary">{vpnConnection.id}</span>{" "}
        from partner{" "}
        <span className="font-semibold text-primary">
          {selectedPartner?.name}
        </span>
      </RemoveConfirmationModal>
    </>
  );
};

export const columns: ColumnDef<VPNConnection>[] = [
  {
    accessorKey: "serverVpnType.name",
    header: "Type",
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => {
      return <CopyButton>{row.getValue("ipAddress")}</CopyButton>;
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
    accessorKey: "groupUsername",
    header: "Group username",
    cell: ({ row }) => {
      return <CopyButton>{row.getValue("groupUsername")}</CopyButton>;
    },
  },
  {
    accessorKey: "groupPassword",
    header: "Group password",
    cell: ({ row }) => {
      return <CopyButton>{row.getValue("groupPassword")}</CopyButton>;
    },
  },
  {
    accessorKey: "presharedKey",
    header: "Preshared key",
    cell: ({ row }) => {
      return <CopyButton>{row.getValue("presharedKey")}</CopyButton>;
    },
  },
  {
    accessorKey: "",
    header: "Attachment",
    cell: ({ row }) => {
      const fileName = row.original.filename;
      const file = row.original.file;

      return (
        <a
          className="text-red-900 underline hover:cursor-pointer hover:text-red-700"
          href={`data:application/pdf;base64,${file}`}
          download={fileName}
        >
          {fileName}
        </a>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Opis",
    cell: ({ row }) => {
      return (
        <div className="whitespace-normal">{row.getValue("description")}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ActionWrapper,
    enableHiding: false,
  },
];
