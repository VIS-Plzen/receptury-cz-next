import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  children: React.ReactNode;
  asChild?: boolean;
  isLoading?: boolean;
  className?: string;
  [key: string]: any;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { children, asChild, isLoading = false, className = "", ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "bg-primary rounded-2xl px-4 py-2.5 font-semibold text-primary-50 hover:bg-primary-600",
          className
        )}
        {...props}
      >
        <span className={clsx(isLoading && "invisible")}>{children}</span>
        {isLoading && (
          <div className="absolute inset-auto z-[1] m-auto flex items-center justify-center">
            <LoadingSpinner
              size="inherit"
              color="inherit"
              className="translate-x-0 transform-gpu text-[1.4em]"
            />
          </div>
        )}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
