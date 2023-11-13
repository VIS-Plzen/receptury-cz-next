import SmartLink from "@/components/primitives/SmartLink";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Props = {
  as?: React.ElementType;
  href?: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  ({ as, href, className = "", children, ...props }, ref) => {
    return (
      <SmartLink
        as={as}
        href={href}
        ref={ref}
        className={cn(
          "inline-flex rounded-xl bg-primary-500 px-4 py-2 font-semibold text-primary-50 hover:bg-primary-600",
          className
        )}
        {...props}
      >
        {children}
      </SmartLink>
    );
  }
);

Button.displayName = "Button";
export default Button;
