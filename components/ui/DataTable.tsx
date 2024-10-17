"use client";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Skeleton from "@/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import { ChevronsUpDown, Filter, TelescopeIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TDataKeys<T, U extends keyof T> = {
  [K in U]?: boolean;
};

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
  selectedItem?: TData | null;
  defaultHiddenColumns?: TDataKeys<TData, keyof TData>;
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
  defaultHiddenColumns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    (defaultHiddenColumns || {}) as VisibilityState,
  );
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

  // clear selected row highlight on deselecting partner
  useEffect(() => {
    setRowSelection({});
  }, [selectedItem]);

  const classes = cn(
    "rounded-md w-full h-full overflow-y-auto overflow-x-auto",
    className,
  );

  return (
    <div className={classes}>
      {canHideColumns && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="xs"
              variant="ghost"
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
                        className="group font-semibold hover:text-white"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        <ChevronsUpDown className="mx-1 w-4 text-[#1F1717] group-hover:text-[#FCF5ED]" />
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
              <TableCell className="border-0" colSpan={columns.length}>
                {Array.from({ length: 3 }).map((_e, i) => (
                  <div className="flex py-2 last:pb-0" key={i}>
                    <Skeleton className="mx-3 h-3 w-full" />
                    <Skeleton className="mx-3 h-3 w-full" />
                    <Skeleton className="mx-3 h-3 w-full" />
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
                    selectable && "hover:cursor-pointer hover:bg-palette-stone",
                    {
                      "bg-palette-stone":
                        //@ts-ignore
                        selectedItem?.id === row.original.id,
                    },
                    {
                      "bg-stone-200 text-zinc-400":
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
              <TableCell
                colSpan={columns.length}
                className="h-24 border-0 text-center"
              >
                <div className="mt-4 flex flex-col justify-center text-center text-zinc-500">
                  <TelescopeIcon className="m-auto h-10 w-10" />
                  <span className="text-base">No results found.</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
