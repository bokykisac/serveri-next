"use client";

import { Backupinfo } from "@/types/api";

import { columns } from "@/components/table-columns/backupinfo-columns";
import { Button } from "@/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, Dot, HelpCircle, Info } from "lucide-react";
import Filter from "./table/Filter";
import { DataTablePagination } from "@/components/table/Pagination";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";

interface BackupinfoTableProps {
  data: Backupinfo[];
  type: "partner" | "server" | undefined;
  partnerName: string | undefined;
}

const BackupinfoTable = ({ data, type, partnerName }: BackupinfoTableProps) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        partnerName: type !== "partner",
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
  });

  const headerText = {
    partner: (
      <span>
        Showing backup info for partner{" "}
        <span className="text-primary">{partnerName}</span>
      </span>
    ),
    server: (
      <span>
        Showing backup info for <span className="text-primary">server</span>
      </span>
    ),
  };

  return (
    <div className="grainy h-[calc(100vh-2.5rem)]">
      <div className="flex w-full items-center justify-between border border-b px-2 py-2">
        <Button size="xs" variant="ghost">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="mx-auto text-lg font-bold">
          {type ? (
            headerText[type]
          ) : (
            <span>
              Showing backupinfo of{" "}
              <span className="text-primary">all partners</span> for the last{" "}
              <span className="text-primary">10 days.</span>
            </span>
          )}
        </div>
        <Tooltip delayDuration={150}>
          <TooltipTrigger className="mr-3 cursor-default align-middle">
            <HelpCircle className="h-6 w-6 text-primary/70" />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex flex-col p-1 font-normal">
              <div className="flex gap-3 py-1">
                <Dot className="h-4 w-8 bg-green-300 text-green-300" />
                <span>Action was successful.</span>
              </div>
              <div className="flex gap-3 py-1">
                <Dot className="h-4 w-8 bg-red-300 text-red-300" />
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
                <TableHead key={header.id} style={{ width: header.getSize() }}>
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
