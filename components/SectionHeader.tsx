"use client";

import Skeleton from "@/ui/Skeleton";
import { Plus } from "lucide-react";
import Button from "@/ui/Button";

interface SectionHeaderProps {
  title: string;
  isLoading?: boolean;
}

const SectionHeader = ({ title, isLoading }: SectionHeaderProps) => {
  return (
    <div className="flex text-center align-middle items-center">
      <span className="px-2 truncate font-semibold text-sm justify-center text-center align-middle">
        {isLoading ? (
          <Skeleton className="w-20 h-[14px] bg-slate-200" />
        ) : (
          title
        )}
      </span>
      <div className="whitespace-nowrap">
        <Button variant="ghost" size="xs" className="whitespace-nowrap">
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default SectionHeader;
