"use client";

import { Backupinfo } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/table/ColumnHeader";

export const columns: ColumnDef<Backupinfo>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    accessorKey: "time",
    cell: (info) =>
      format(new Date(info.getValue() as string), "dd-MM-yyyy, hh:mm:ss"),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Partner" />
    ),
    accessorKey: "partnerName",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hostname" />
    ),
    accessorKey: "hostname",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Public IP" />
    ),
    accessorKey: "publicIp",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    accessorKey: "name",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Object" />
    ),
    accessorKey: "actionObject",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    accessorKey: "size",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    accessorKey: "duration",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Speed" />
    ),
    accessorKey: "speed",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    ),
    accessorKey: "comment",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version" />
    ),
    accessorKey: "version",
  },
  {
    header: "Action",
    accessorKey: "actionOk",
  },
];
