"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import Button from "./Button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedItem: Dispatch<SetStateAction<TData | null>>;
  className: string;
  selectable?: boolean;
  multiSelect?: boolean;
  sortable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedItem,
  className,
  selectable = false,
  multiSelect = false,
  sortable = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: selectable,
    enableMultiRowSelection: multiSelect,
    onSortingChange: sortable ? setSorting : undefined,
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    state: {
      sorting,
    },
  });

  const classes = cn("rounded-md border w-full overflow-y-scroll", className);

  return (
    <div className={classes}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (sortable && header.column.id !== "actions") {
                  return (
                    <TableHead key={header.id}>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc"
                          )
                        }
                        className="px-1 hover:bg-slate-200 hover:font-semibold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                  );
                }

                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  if (selectable && typeof setSelectedItem === "function") {
                    row.toggleSelected();
                    setSelectedItem(row.original);
                  }
                }}
                className={cn(
                  selectable &&
                    "data-[state=selected]:bg-red-200 hover:bg-slate-100 hover:cursor-pointer"
                )}
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
    </div>
  );
}
