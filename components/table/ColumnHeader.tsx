import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const toggleSort = () => {
    const isSorted = column.getIsSorted();
    if (isSorted === "asc") {
      column.toggleSorting(true);
    } else if (isSorted === "desc" || isSorted === false) {
      column.toggleSorting(false);
    }
  };

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 font-semibold data-[state=open]:bg-accent"
        onClick={() => toggleSort()}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
