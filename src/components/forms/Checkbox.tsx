"use client";

import { cn } from "@/utils/cn";
import React, { useState } from "react";
import { CheckIcon } from "../icons";
import Label from "./Label";

type CheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  label?: string;
};

function Checkbox({ className, label, ...props }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(props.checked || false);

  return (
    <Label
      className={cn("flex cursor-pointer items-center gap-2", className)}
      onChange={() => setIsChecked(!isChecked)}
    >
      <input
        type="checkbox"
        {...props}
        checked={isChecked}
        onChange={() => {}}
        className={cn(
          "peer relative shrink-0 appearance-none",
          "h-5 w-5 rounded-md border-2 border-black",
          "transition duration-150 ease-in-out",
          "focus:ring-gray-200",
          "checked:border-primary-500 checked:bg-primary-500 checked:focus:ring-primary-500/30"
        )}
      />
      {label && <span className="pt-0.5">{label}</span>}
      <CheckIcon
        className={cn(
          "absolute transition-opacity duration-150",
          isChecked ? "opacity-150" : "opacity-0"
        )}
        size={20}
        stroke="white"
        strokeWidth={50}
        color="white"
      />
    </Label>
  );
}

export default Checkbox;
