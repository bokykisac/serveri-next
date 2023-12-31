"use client";

import { Backupinfo } from "@/types/api";

import { DataTablePagination } from "@/components/table/Pagination";
import { columns } from "@/components/table/table-columns/backupinfo-columns";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/Tooltip";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Filter from "@/components/table/Filter";

interface BackupinfoTableProps {
  data: Backupinfo[];
  type: "partner" | "server" | "all";
  partnerName?: string;
  hostname?: string;
}

const BackupinfoTable = ({
  data,
  type,
  partnerName,
  hostname,
}: BackupinfoTableProps) => {
  const { push } = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        partnerName: type === "all",
        hostname: type !== "server",
        actionOk: false,
      },
      columnSizing: {
        time: 200,
        comment: 200,
      },
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const headerText = {
    all: (
      <span>
        Showing backup info of{" "}
        <span className="text-primary">all partners</span> for the last{" "}
        <span className="text-primary">10 days.</span>
      </span>
    ),
    partner: (
      <span>
        Showing backup info for partner{" "}
        <span className="text-primary">{partnerName}</span>
      </span>
    ),
    server: (
      <span>
        Showing backup info for server{" "}
        <span className="text-primary">{hostname}</span> from partner{" "}
        <span className="text-primary">{partnerName}</span>
      </span>
    ),
  };

  return (
    <div className="grainy">
      <div className="flex w-full items-center justify-between border border-b px-2 py-2">
        <Button size="xs" variant="ghost" onClick={() => push("/")}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="mx-auto text-lg font-bold">{headerText[type]}</div>
        <Tooltip delayDuration={150}>
          <TooltipTrigger className="mr-3 cursor-default align-middle">
            <HelpCircle className="h-6 w-6 text-primary/70" />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex flex-col p-1 font-normal">
              <div className="flex gap-3 py-1">
                <div className="h-4 w-8 bg-green-300" />
                <span>Action was successful.</span>
              </div>
              <div className="flex gap-3 py-1">
                <div className="h-4 w-8 bg-red-300" />
                <span>Action failed.</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="text-palette-black grainy"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <div className="flex space-x-2">
                    <Filter column={header.column} />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected()}
                className={cn("h-12", {
                  "bg-green-300": row.original.actionOk,
                  "bg-red-300": !row.original.actionOk,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
};

export default BackupinfoTable;
