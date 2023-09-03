"use client";

import Skeleton from "@/ui/Skeleton";
import { PlusSquare } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  isLoading?: boolean;
}

const SectionHeader = ({ title, isLoading }: SectionHeaderProps) => {
  return (
    <>
      <div className="flex text-center items-center justify-center">
        <div className="mr-auto" />
        <span className="px-2 truncate font-semibold text-sm">
          {isLoading ? (
            <Skeleton className="w-20 h-[14px] bg-slate-200" />
          ) : (
            title
          )}
        </span>
        <div className="ml-auto">
          <PlusSquare className="text-red-900 hover:text-red-700 hover:cursor-pointer" />
        </div>
      </div>
      <hr className="mx-5 bg-slate-700" />
    </>
  );
};

export default SectionHeader;
