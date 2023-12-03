import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  className?: string;
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
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "rounded-2xl bg-primary px-4 py-2.5 font-semibold text-primary-50 hover:bg-primary-600",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
