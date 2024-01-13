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
import { FieldElement, UseFormReturn } from "react-hook-form";
import type { VPNConnectionForm } from "./forms/VPNConnectionForm";

type Option = {
  value: string;
  label: string;
}

interface ComboboxProps {
  field: FieldElement;
  form: UseFormReturn<VPNConnectionForm>;
  options: Option[];
  fieldName: string;
}

export function Combobox({ field, form, options = [], fieldName }: ComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value
              ? options.find((option) => option.value === field.value)
                  ?.label
              : `Select ${fieldName}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${fieldName}s...`} />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => {
                  console.log(option.value);
                  form.setValue("partner", option.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option.value === field.value
                      ? "opacity-100"
                      : "opacity-0",
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
