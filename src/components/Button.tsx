import { cn } from "@/lib/cn";
import { forwardRef } from "react";
import SmartLink from "./SmartLink";

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
          "bg-primary-500 text-primary-50 hover:bg-primary-600 inline-flex rounded-xl px-4 py-2 font-semibold",
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
