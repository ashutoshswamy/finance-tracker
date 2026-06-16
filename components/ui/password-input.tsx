"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  inputClassName?: string;
}

export function PasswordInput({ className, inputClassName, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Input
        type={show ? "text" : "password"}
        {...props}
        className={cn("pr-7", inputClassName)}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground transition-colors p-0.5"
      >
        {show ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
