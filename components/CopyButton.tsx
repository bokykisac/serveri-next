"use client";

import { cn } from "@/lib/utils";
import { toast } from "@/ui/Toast";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  children: string;
  isRowSelected?: boolean;
}

const CopyButton = ({ children, isRowSelected }: CopyButtonProps) => {
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(children.trimEnd());
      toast({
        title: "Success!",
        message: "Text has been copied to clipboard.",
        type: "success",
      });
    } catch (error) {
      toast({
        title: "Error.",
        message: "Could not copy text to clipboard, please try again.",
        type: "success",
      });
    }
  };

  if (!children) return "-";

  return (
    <div className="flex flex-row justify-between gap-2">
      {children}
      <button type="button" onClick={copyText} className="pr-1">
        <Copy
          size={18}
          className={cn("hover:text-palette-red text-primary", {
            "hover:text-palette-beige text-palette-orange": isRowSelected,
          })}
        />
      </button>
    </div>
  );
};

export default CopyButton;
