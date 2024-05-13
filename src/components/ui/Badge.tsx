import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
  variant?: "subtle" | "text" | "healthy";
  className?: string;
};

// Component Variants
const cv = {
  base: "inline-flex items-center justify-center !leading-none gap-2 text-xs md:text-sm text-primary-600 rounded-md font-medium disabled:pointer-events-none disabled:opacity-60",
  variant: {
    subtle: "py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-full bg-primary-300/30",
    text: "",
    healthy:
      "py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-full text-healthy-600 bg-healthy-200",
  },
};

const Badge = forwardRef<HTMLDivElement, Props>(
  ({ asChild, variant = "subtle", className = "", ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={forwardedRef}
        className={cn(cv.base, cv.variant[variant], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
export default Badge;
