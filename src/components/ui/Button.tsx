import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  variant?:
    | "primary"
    | "primary-outline"
    | "primary-text"
    | "secondary"
    | "secondary-outline"
    | "black";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Component Variants
const cv = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold tracking-wider transition duration-200 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-offset-0 focus-visible:outline-[3px]",
  variant: {
    primary:
      "text-primary-50 bg-primary hover:bg-primary-600 focus-visible:outline-primary/70 focus-visible:ring-0",
    "primary-outline":
      "text-primary bg-transparent hover:bg-primary hover:text-primary-50 ring-primary ring-inset ring-[3px] focus-visible:outline-primary/70",
    "primary-text":
      "text-primary-600 bg-transparent hover:bg-primary-400/30 focus-visible:outline-primary/70 focus-visible:ring-0",
    secondary:
      "text-secondary-50 bg-secondary hover:bg-secondary-600 focus-visible:outline-secondary/70 focus-visible:ring-0",
    "secondary-outline":
      "text-secondary bg-transparent hover:bg-secondary hover:text-secondary-50 ring-secondary ring-inset ring-[3px] focus-visible:outline-secondary/70",
    black:
      "text-gray-50 bg-gray-950 hover:bg-gray-700 focus-visible:outline-gray-700/70 focus-visible:ring-0",
  },
  size: {
    sm: "px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm",
    md: "px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base",
    lg: "px-6 py-3 text-base md:px-8 md:py-4 md:text-lg",
  },
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { asChild, variant = "primary", size = "md", className = "", ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cn(cv.base, cv.variant[variant], cv.size[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
