"use client";

import { toast } from "@/ui/Toast";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  children: string;
}

const CopyButton = ({ children }: CopyButtonProps) => {
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

  return (
    <div className="flex flex-row gap-2">
      {children}
      <button type="button" onClick={copyText}>
        <Copy size={18} className="text-slate-500 hover:text-slate-400" />
      </button>
    </div>
  );
};

export default CopyButton;
