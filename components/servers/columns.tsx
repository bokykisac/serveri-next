"use client";

import { Server } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Button from "@/ui/Button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";

export const columns: ColumnDef<Server>[] = [
  {
    accessorKey: "ipAddress",
    header: "IP1",
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
  },
  {
    accessorKey: "id",
    header: "Code",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const server = row.original;

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
