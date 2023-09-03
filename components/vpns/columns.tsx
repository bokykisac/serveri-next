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
import Button from "@/ui/Button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

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
          className="text-red-900 underline hover:text-red-700 hover:cursor-pointer"
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
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
      );
    },
  },
];
