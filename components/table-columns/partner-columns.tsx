"use client";

import { Partner } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Edit, MoreHorizontal, Trash2, DatabaseBackup } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@/ui/Button";

export const columns: ColumnDef<Partner>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const partner = row.original;

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
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DatabaseBackup className="mr-2 h-4 w-4" />
                <Link
                  href={{
                    pathname: `/backup-info/${partner.id}`,
                    query: { type: "partner" },
                  }}
                >
                  Backup Info
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.getValue("name")}</div>;
    },
  },
];
