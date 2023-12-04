"use client";

import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

// Features:
// - [x] Double click prevention

type Props = React.ComponentPropsWithoutRef<"label"> & {
  htmlFor: string;
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  [key: string]: any;
};

// Component Variants
// const cv = {
//   base: "",
//   prop: {
//     value: "",
//     value: "",
//     value: "",
//   },
// }

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
        className={cn("text-base font-medium leading-none", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Label.displayName = "Label";
export default Label;
