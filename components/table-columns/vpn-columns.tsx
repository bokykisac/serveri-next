"use client";

import { VPNConnection } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
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

export const columns: ColumnDef<VPNConnection>[] = [
  {
    accessorKey: "serverVpnType.name",
    header: "Type",
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
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
    cell: ({ row }) => {
      const vpn = row.original;

      const buttonClasses = clsx(
        "h-5 w-8 p-0",
        row.getIsSelected() && "hover:bg-red-300 hover:text-slate-900",
      );

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="dropdown" className={buttonClasses}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableHiding: false,
  },
];
