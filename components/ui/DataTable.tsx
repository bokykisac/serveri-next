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
import { ChevronsUpDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Skeleton from "@/ui/Skeleton";
import { Button } from "@/ui/Button";
import { Server } from "@/types/api";

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
  selectedItem?: TData;
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
  selectedItem,
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
    table.getRow;
    if (data.length === 0) {
      setRowSelection({});
    }
  }, [data]);

  const classes = cn(
    "rounded-md border w-full h-full overflow-y-auto",
    className,
  );

  return (
    <div className={classes}>
      {canHideColumns && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="xs"
              variant="outline"
              className="absolute right-0 top-0 mr-2 mt-1"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
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
                        variant="ghost"
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc",
                          )
                        }
                        className="group font-semibold hover:text-primary/70"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        <ChevronsUpDown className="mx-1 w-4 text-slate-500 group-hover:text-primary/70" />
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
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {Array.from({ length: 3 }).map((_e, i) => (
                  <div className="flex py-2 last:pb-0" key={i}>
                    <Skeleton className="mx-3 h-3 w-full bg-slate-200" />
                    <Skeleton className="mx-3 h-3 w-full bg-slate-200" />
                    <Skeleton className="mx-3 h-3 w-full bg-slate-200" />
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              //@ts-ignore
              const serverFunctionTypeId = row.original?.serverFunctionType?.id;
              const validIds = ["1", "2", "3", "4", "9"];
              let highlightServerFunction = false;
              if (
                serverFunctionTypeId &&
                validIds.includes(serverFunctionTypeId)
              ) {
                highlightServerFunction = true;
              }

              return (
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
                      "hover:cursor-pointer hover:bg-slate-100 data-[state=selected]:bg-red-200",
                    //@ts-ignore
                    { "bg-red-200": selectedItem?.id === row.original.id },
                    {
                      "bg-zinc-200/80 text-zinc-500":
                        //@ts-ignore
                        row.original.active === false,
                    },
                    { "bg-yellow-100": highlightServerFunction },
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
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
