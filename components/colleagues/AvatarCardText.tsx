import { cn } from "@/lib/utils";

interface AvatarCardTextProps {
  children?: string;
  className?: string;
}

const AvatarCardText = ({ children, className }: AvatarCardTextProps) => {
  return (
    <div
      className={cn(
        "mx-2 my-1 flex h-6 items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-primary to-palette-red p-4 text-[12px] font-semibold text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AvatarCardText;
