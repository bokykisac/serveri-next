import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-palette-orange/70 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export default Skeleton;
