import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean;
  hoverEffect?: "underline" | "appear" | "none";
  className?: string;
};

const cv = {
  base: "ui-styled-link relative h-max max-w-max",
  hoverEffect: {
    underline: "ui-styled-link--underline",
    appear:
      "ui-styled-link--appear hover:opacity-80 transition-opacity duration-200",
    none: "",
  },
};

const StyledLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { asChild, hoverEffect = "underline", className = "", ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "a";

    if (props.href && props.href.startsWith("/")) {
      console.warn(
        `StyledLink href prop starts with "/". This will break Next.js routing. Use "asChild" prop to wrap StyledLink around Next.js Link component.`
      );
    }

    return (
      <Component
        ref={forwardedRef}
        className={cn(cv.base, cv.hoverEffect[hoverEffect], className)}
        {...props}
      />
    );
  }
);

StyledLink.displayName = "StyledLink";
export default StyledLink;
