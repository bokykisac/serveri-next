"use client";

import Skeleton from "@/ui/Skeleton";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/Button";
interface SectionHeaderProps {
  title: string;
  isLoading?: boolean;
  className?: string;
}

const SectionHeader = ({ title, isLoading, className }: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mr-20 flex items-center text-center align-middle",
        className,
      )}
    >
      <div className="text-palette-black w-full truncate px-2 text-center align-middle text-lg font-semibold">
        {isLoading ? (
          <Skeleton className="h-[14px] w-20 bg-stone-300" />
        ) : (
          <>
            <span>{title}</span>
          </>
        )}
      </div>
      <div className="ml-auto">
        <Button variant="outline" size="xs" className="whitespace-nowrap">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default SectionHeader;
