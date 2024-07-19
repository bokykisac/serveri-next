"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { User } from "@/types/api";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { MoreHorizontal } from "lucide-react";

enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
      const dateCreated = row.original.dateCreated;
      if (dateCreated) {
        const date = parseISO(dateCreated);
        return format(date, "dd-MM-yyyy");
      }
      return "";
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      // boolean for now
      const status = row.original.active;

      const badgeText = status ? "Active" : "Inactive";

      return (
        <div className="flex h-full w-full items-center justify-center">
          <Badge variant={status ? "active" : "inactive"}>{badgeText}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "misid",
    header: "M&I ID",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex h-full w-full items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  // Handle remove action
                  console.log("Remove user:", user.username);
                }}
              >
                Remove
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // Handle disable action
                  console.log("Disable user:", user.username);
                }}
              >
                Disable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
