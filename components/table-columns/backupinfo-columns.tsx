"use client";

import { Backupinfo } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Backupinfo>[] = [
  {
    header: "Time",
    accessorKey: "time",
    cell: (info) =>
      format(new Date(info.getValue() as string), "dd-mm-yyyy, hh:mm:ss"),
  },
  {
    header: "Partner",
    accessorKey: "partnerName",
  },
  {
    header: "Hostname",
    accessorKey: "hostname",
  },
  {
    header: "Public IP",
    accessorKey: "publicIp",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Object",
    accessorKey: "actionObject",
  },
  {
    header: "Size",
    accessorKey: "size",
  },
  {
    header: "Duration",
    accessorKey: "duration",
  },
  {
    header: "Speed",
    accessorKey: "speed",
  },
  {
    header: "Comment",
    accessorKey: "comment",
  },
  {
    header: "Version",
    accessorKey: "version",
  },
  {
    header: "Action",
    accessorKey: "actionOk",
  },
];
