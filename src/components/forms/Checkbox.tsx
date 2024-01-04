"use client";

import { cn } from "@/utils/cn";
import clsx from "clsx";
import React from "react";
import { CheckIcon } from "../icons";
import Label from "./Label";

type CheckboxProps = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  label?: string;
};

function Checkbox({ className, label, ...props }: CheckboxProps) {
  const id = props.id;
  return (
    <div className={cn("relative flex cursor-pointer gap-2", className)}>
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          {...props}
          className={cn(
            "peer relative shrink-0 cursor-pointer appearance-none",
            "h-5 w-5 rounded-md border-2 border-black",
            "transition duration-150 ease-in-out",
            "focus:ring-gray-200",
            "checked:border-primary-500 checked:bg-primary-500 checked:focus:ring-primary-500/30"
          )}
        />
        {props.checked ? (
          <CheckIcon
            className={clsx(
              "absolute inset-0 transition-opacity duration-150"
              // props.checked ? "opacity-100" : "opacity-0"
            )}
            size={20}
            stroke="white"
            strokeWidth={50}
            color="white"
          />
        ) : (
          ""
        )}
      </div>
      {label && (
        <Label htmlFor={id} className=" pt-0.5">
          {label}
        </Label>
      )}
    </div>
  );
}

export default Checkbox;
