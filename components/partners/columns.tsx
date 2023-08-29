"use client";

import { Partner } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Partner>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
