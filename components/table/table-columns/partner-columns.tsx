"use client";

import BackupinfoLink from "@/components/BackupinfoLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SelectOption } from "@/types/api";
import { Button } from "@/ui/Button";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface ColumnActionWrapperProps extends CellContext<SelectOption, unknown> {}

const ActionWrapper = ({ row }: ColumnActionWrapperProps) => {
  const { isAdmin } = useCurrentUser();

  const partner = row.original;

  const buttonClasses = clsx(
    "h-5 w-8 p-0 hover:bg-inherit hover:text-white",
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
          <DropdownMenuItem disabled={!isAdmin}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!isAdmin}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Remove</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BackupinfoLink selectedItem={partner} selectedType="partner" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<SelectOption>[] = [
  {
    id: "actions",
    cell: ActionWrapper,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{row.getValue("name")}</div>;
    },
  },
];
