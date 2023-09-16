"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  VisibilityState,
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ChevronsUpDown, Settings2 } from "lucide-react";
import Button from "@/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Skeleton from "@/ui/Skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedItem?:
    | Dispatch<SetStateAction<TData | null>>
    | ((selectedItem: TData) => void);
  className?: string;
  selectable?: boolean;
  multiSelect?: boolean;
  sortable?: boolean;
  isLoading?: boolean;
  canHideColumns?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedItem,
  className,
  selectable = false,
  multiSelect = false,
  sortable = false,
  isLoading = false,
  canHideColumns = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: selectable,
    enableMultiRowSelection: multiSelect,
    onSortingChange: sortable ? setSorting : undefined,
    getSortedRowModel: sortable ? getSortedRowModel() : undefined,
    onColumnVisibilityChange: canHideColumns ? setColumnVisibility : undefined,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (data.length === 0) {
      setRowSelection({});
    }
  }, [data]);

  const classes = cn(
    "rounded-md border w-full h-full overflow-y-auto",
    className
  );

  return (
    <div className={classes}>
      {canHideColumns && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="xs"
              variant="ghost"
              className="absolute right-0 top-0 mt-1 mr-2"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-white">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize hover:bg-slate-200"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header as string}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
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
                        variant="header"
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc"
                          )
                        }
                        className="group"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <ChevronsUpDown className="group-hover:text-red-700 mx-1 w-4 text-slate-500" />
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
          {isLoading ? (
            <>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {Array.from({ length: 3 }).map((_e, i) => (
                    <div className="flex py-2 last:pb-0" key={i}>
                      <Skeleton className="w-full h-3 mx-3 bg-slate-200" />
                      <Skeleton className="w-full h-3 mx-3 bg-slate-200" />
                      <Skeleton className="w-full h-3 mx-3 bg-slate-200" />
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            </>
          ) : table.getRowModel().rows?.length ? (
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
