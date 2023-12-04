import SmartLink from "@/components/primitives/SmartLink";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<typeof SmartLink> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
};

const StyledLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { asChild, variant = "primary", className = "", ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : SmartLink;
    return (
      <Component
        ref={forwardedRef}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "",
          className
        )}
        {...props}
      />
    );
  }
);

StyledLink.displayName = "StyledLink";
export default StyledLink;
