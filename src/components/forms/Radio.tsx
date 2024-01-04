"use client";

import { cn } from "@/utils/cn";
import React from "react";
import Label from "./Label";

type RadioProps = React.ComponentPropsWithoutRef<"input"> & {
  className?: string;
  label?: string;
};

function Radio({ className, label, ...props }: RadioProps) {
  const id = props.id;

  return (
    <div className={cn("flex cursor-pointer items-center", className)}>
      <div className="relative flex">
        <input
          type="radio"
          id={id}
          {...props}
          className={cn(
            "h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-black",
            "focus:ring-gray-200",
            "transition duration-150 ease-in-out",
            props.checked
              ? "border-primary-500 checked:border-primary-500 focus:ring-primary-500/30"
              : "border-black"
          )}
        />
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
            "rounded-full bg-primary-500",
            "transition-all duration-150 ease-in-out",
            "h-3 w-3 scale-0 opacity-0",
            props.checked ? "scale-100 opacity-100" : ""
          )}
        />
      </div>

      {label && (
        <Label htmlFor={id} className="ml-2 cursor-pointer">
          {label}
        </Label>
      )}
    </div>
  );
}

export default Radio;
