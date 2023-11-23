import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ asChild, className = "", children, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex rounded-xl bg-primary-500 px-4 py-2 font-semibold text-primary-50 hover:bg-primary-600",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
