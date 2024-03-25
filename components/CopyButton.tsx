"use client";

import { cn } from "@/lib/utils";
import { toast } from "@/ui/Toast";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  children: string;
  isRowSelected?: boolean;
  className?: string;
}

const CopyButton = ({
  children,
  isRowSelected,
  className,
}: CopyButtonProps) => {
  const copyText = async () => {
    try {
      console.log(children);
      await navigator.clipboard.writeText(children.trimEnd());
      toast({
        title: "Success!",
        message: "Text has been copied to clipboard.",
        type: "success",
      });
    } catch (error) {
      console.log(error);
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
          className={cn("text-primary hover:text-palette-red", className, {
            "text-palette-orange hover:text-palette-beige": isRowSelected,
          })}
        />
      </button>
    </div>
  );
};

export default CopyButton;
