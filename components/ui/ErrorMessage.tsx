import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HtmlHTMLAttributes } from "react";

const errorVariants = cva("text-red-600 mb-3", {
  variants: {
    position: {
      default: "text-left",
      center: "text-center",
    },
  },
  defaultVariants: {
    position: "default",
  },
});

interface ErrorMessageProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorVariants> {
  error: string | null;
}

const ErrorMessage = ({
  className,
  error,
  position,
  ...props
}: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className={cn(errorVariants({ position, className }))} {...props}>
      {error}
    </div>
  );
};

export default ErrorMessage;
