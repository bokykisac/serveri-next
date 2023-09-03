"use client";

import { ServerFunction } from "@/types/api";
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
import CopyButton from "../CopyButton";

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
    cell: ({ row }) => {
      const serverFunction = row.original;

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
