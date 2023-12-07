import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean;
  hoverEffect?: "underline" | "opacity" | "none";
  className?: string;
};

const cv = {
  underline:
    "decoration-current decoration-[0.09375em] underline-offset-[0.25em] hover:underline",
  opacity: "hover:opacity-70",
  none: "",
};

const StyledLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { asChild, hoverEffect = "underline", className = "", ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "a";
    return (
      <Component
        ref={forwardedRef}
        className={cn(cv[hoverEffect], className)}
        {...props}
      />
    );
  }
);

StyledLink.displayName = "StyledLink";
export default StyledLink;
