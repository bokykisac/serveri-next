"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { FormControl } from "@/ui/Form";
import {
  FieldElement,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import type { VPNConnectionForm } from "./forms/VPNConnectionForm";
import { useState } from "react";

type Option = {
  value: string | number;
  label: string;
};

interface ComboboxProps<FormSchema extends FieldValues> {
  field: FieldElement;
  form: UseFormReturn<FormSchema>;
  options: Option[];
  fieldName: Path<FormSchema>;
  fieldLabel: string;
  disabled?: boolean;
}

export function Combobox<FormSchema extends FieldValues>({
  field,
  form,
  options = [],
  fieldName,
  fieldLabel,
  disabled,
}: ComboboxProps<FormSchema>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between",
              !field.value && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            {field.value
              ? options.find((option) => option.value === field.value)?.label
              : `Select ${fieldLabel}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0" asChild>
        <Command>
          <CommandInput placeholder={`Search ${fieldLabel}s...`} />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => {
                  form.setValue(fieldName, option.value as any);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === field.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
