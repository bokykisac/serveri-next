"use client";

import BackupinfoLink from "@/components/BackupinfoLink";
import CopyButton from "@/components/CopyButton";
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
import { Server } from "@/types/api";
import { Button } from "@/ui/Button";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import ServerForm from "@/components/forms/ServerForm";

interface ColumnActionWrapperProps extends CellContext<Server, unknown> {}

// TODO: create component
const ActionWrapper = ({ row }: ColumnActionWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const server = row.original;

  const buttonClasses = clsx(
    "h-5 w-8 p-0 hover:bg-inherit hover:text-primary",
    row.getIsSelected() && "hover:bg-red-300 hover:text-slate-900",
  );

  return (
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
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Remove</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BackupinfoLink selectedItem={server} selectedType="server" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-h-full max-w-3xl overflow-y-scroll">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-center text-2xl">
            Update existing <span className="text-primary">Server</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill out the required fields for the Server here. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ServerForm server={server} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "ipAddress",
    header: "IP1",
    cell: ({ row }) => {
      const ipAddress = row.original.ipAddress;
      const isSelected = row.getIsSelected();
      return <CopyButton isRowSelected={isSelected}>{ipAddress}</CopyButton>;
    },
  },
  {
    accessorKey: "ipAddress2",
    header: "IP2",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "hostname",
    header: "Hostname",
  },
  {
    accessorKey: "serverOs",
    header: "OS",
    cell: ({ row }) => {
      const OSName = row.original.serverOS.name;
      return <div>{OSName}</div>;
    },
  },
  {
    accessorKey: "consultant",
    header: "Consultant",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "installationDate",
    header: "Installation Date",
    cell: ({ row }) => {
      const parsedDate = parseISO(row.original.installationDate);
      const formattedDate = format(parsedDate, "dd-MM-yyyy");
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "cpuNumber",
    header: "No. CPU",
  },
  {
    accessorKey: "cpuType",
    header: "CPU type",
  },
  {
    accessorKey: "ram",
    header: "RAM",
  },
  {
    accessorKey: "hddDescription",
    header: "HDD Description",
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.original.comment;
      return <span className="text-ellipsis">{comment}</span>;
    },
  },
  {
    accessorKey: "id",
    header: "Code",
  },
  {
    id: "actions",
    cell: ActionWrapper,
    enableHiding: false,
  },
];
