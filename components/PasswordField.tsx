"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, type FieldAttributes } from "formik";
import FormInput from "@/components/ui/FormInput";

export interface PasswordFieldProps extends FieldAttributes<any> {}

const PasswordField = ({
  className,
  name,
  type,
  children,
  ...props
}: PasswordFieldProps) => {
  const [isVisible, setIsVibisle] = useState<boolean>(false);

  return (
    <Field
      as={FormInput}
      {...props}
      type={isVisible ? "text" : "password"}
      name={name}
      className={cn(className)}
      renderPrefix={() => <Lock className="ml-3 text-slate-500" />}
      renderSuffix={() => (
        <button
          className="absolute inset-y-0 right-0 px-4 text-slate-500 hover:text-slate-400"
          onClick={() => setIsVibisle((prevState) => !prevState)}
          type="button"
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </button>
      )}
    >
      {children}
    </Field>
  );
};

export default PasswordField;
