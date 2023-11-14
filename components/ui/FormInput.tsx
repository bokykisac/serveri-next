"use client";

import React, { useRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface PrefixSuffixRenderProps {
  disabled?: boolean;
}

const inputContainerClasses = cva("relative", {
  variants: {
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "bg-gray-50 text-gray-300",
      false: "text-gray-900",
    },
    hasLabel: {
      true: "mt-1.5",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
    disabled: false,
    hasLabel: false,
  },
});

export const inputClasses = cva(
  "flex h-10 py-2 px-3 w-full rounded-md border border-slate-300 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      hasPrefix: {
        true: "pl-12",
      },
      hasSuffix: {
        true: "pr-12",
      },
    },
    defaultVariants: {
      hasPrefix: false,
      hasSuffix: false,
    },
  }
);

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    VariantProps<typeof inputClasses> {
  fullWidth?: boolean;
  helperText?: React.ReactElement;
  renderPrefix?: ({ disabled }: PrefixSuffixRenderProps) => React.ReactElement;
  renderSuffix?: ({ disabled }: PrefixSuffixRenderProps) => React.ReactElement;
}

const Input = React.forwardRef(
  (
    {
      children,
      className,
      disabled,
      fullWidth,
      helperText,
      name,
      id = name,
      renderPrefix,
      renderSuffix,
      type = "text",
      ...restProps
    }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const prefixRef = useRef<HTMLSpanElement | null>(null);
    const suffixRef = useRef<HTMLSpanElement | null>(null);

    const prefixPresent = typeof renderPrefix === "function";
    const suffixPresent = typeof renderSuffix === "function";

    return (
      <div className={cn("mb-4 shadow-sm", fullWidth ? "w-full" : "")}>
        <label htmlFor={name} className="font-medium mb-10">
          {children}
        </label>

        <div
          className={cn([
            inputContainerClasses({
              className,
              disabled,
              fullWidth,
              hasLabel: !!children,
            }),
          ])}
        >
          {prefixPresent ? (
            <span
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              ref={prefixRef}
            >
              {renderPrefix({ disabled })}
            </span>
          ) : null}

          <input
            type={type}
            name={name}
            id={id}
            disabled={disabled}
            className={inputClasses({
              hasPrefix: prefixPresent,
              hasSuffix: suffixPresent,
            })}
            ref={ref}
            {...restProps}
          />

          {suffixPresent ? (
            <span
              className="absolute inset-y-0 right-0 flex items-center"
              ref={suffixRef}
            >
              {renderSuffix({ disabled })}
            </span>
          ) : null}
        </div>

        {helperText ? (
          <div className="mt-1.5 text-sm text-gray-600">{helperText}</div>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
