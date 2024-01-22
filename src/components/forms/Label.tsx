"use client";

import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"label"> & {
  htmlFor: string;
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  [key: string]: any;
};

const Label = forwardRef<HTMLLabelElement, Props>(
  ({ htmlFor, children, asChild, className = "", ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "label";

    return (
      <Component
        ref={forwardedRef}
        htmlFor={htmlFor}
        onMouseDown={(e) => {
          // Prevent double click selection
          if (!e.defaultPrevented && e.detail > 1) e.preventDefault();
        }}
        className={cn(
          "cursor-text font-medium leading-none",
          "absolute left-4 duration-75",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-current",
          "top-0 -translate-y-1/2 rounded-md bg-white px-1 text-sm font-bold text-black",
          "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-base peer-focus:font-bold peer-focus:text-black",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Label.displayName = "Label";
export default Label;
