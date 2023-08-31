"use client";

import { VPNConnection } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import CopyButton from "@/components/CopyButton";

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
];
