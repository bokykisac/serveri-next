"use client";

import { cn } from "@/lib/utils";
import { toast } from "@/ui/Toast";
import { Copy } from "lucide-react";
import { MouseEventHandler } from "react";

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
  async function copyToClipboard(textToCopy: string) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (error) {
        toast({
          title: "Error.",
          message: "Could not copy text to clipboard, please try again.",
          type: "success",
        });
      } finally {
        textArea.remove();
      }
    }
  }

  const copyText = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await copyToClipboard(children);
    toast({
      title: "Success!",
      message: "Text has been copied to clipboard.",
      type: "success",
    });
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
