"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Server } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { DatabaseBackup, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

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
    cell: ({ row }) => {
      const server = row.original;

      const buttonClasses = clsx(
        "h-5 w-8 p-0",
        row.getIsSelected() && "hover:bg-red-300 hover:text-slate-900",
      );

      return (
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
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DatabaseBackup className="mr-2 h-4 w-4" />
              <Link
                href={{
                  pathname: "/backup-info",
                  query: { type: "server", id: server.id },
                }}
              >
                Backup Info
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
