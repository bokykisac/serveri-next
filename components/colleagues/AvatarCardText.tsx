import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/Toast";

interface AvatarCardTextProps {
  clipboard?: boolean;
  children?: string;
  className?: string;
}

const AvatarCardText = ({
  children,
  className,
  clipboard = false,
}: AvatarCardTextProps) => {
  const copyText = async () => {
    if (!children) return;

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
    <div
      className={cn(
        "mx-2 my-1 flex h-6 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-palette-red p-4 text-[12px] font-semibold text-white",
        className,
      )}
    >
      <div className="flex w-full gap-2">
        <span className="truncate">{children}</span>
        {clipboard && (
          <div>
            {children ? (
              <Copy
                className="h-4 w-4 cursor-pointer text-white hover:opacity-70"
                onClick={copyText}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCardText;
