"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { toast } from "@/components/ui/Toast";
import axios from "@/lib/axios";
import { User } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { MoreHorizontal, UserRoundCheck, UserRoundX } from "lucide-react";
import { useRouter } from "next/navigation";

enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  INACTIVE = "INACTIVE",
}

interface ColumnActionWrapperProps extends CellContext<User, unknown> {}

const ActionWrapper = ({ row }: ColumnActionWrapperProps) => {
  const router = useRouter();

  const user = row.original;

  const { misid, active } = user;

  const updateUserStatus = useMutation({
    mutationFn: () =>
      axios.put("/auth/status", { colleague: misid, active: !active }),
    onSuccess: () => {
      toast({
        title: "Success",
        message: `User successfully created.`,
        type: "success",
      });
      router.refresh();
    },
    onError: (e: AxiosError) => {
      const message = e?.response?.data as string;

      toast({
        title: "Error",
        message: message || "Failed to update user status, try again.",
        type: "error",
      });
    },
  });

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
              updateUserStatus.mutate();
            }}
          >
            {active ? (
              <UserRoundX className="mr-2 h-4 w-4 text-primary" />
            ) : (
              <UserRoundCheck className="mr-2 h-4 w-4 text-green-700" />
            )}
            <span>{active ? "Disable" : "Enable"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

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
    cell: ActionWrapper,
  },
];
