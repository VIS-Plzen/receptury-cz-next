import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean;
  hoverEffect?: "appear" | "slide-back" | "none";
  className?: string;
};

const cv = {
  base: "ui-styled-link relative h-max max-w-max",
  hoverEffect: {
    appear:
      "ui-styled-link--appear hover:opacity-80 transition-opacity duration-200",
    "slide-back": "ui-styled-link--slide-back",
    none: "",
  },
};

const StyledLink = forwardRef<HTMLAnchorElement, Props>(
  (
    { asChild, hoverEffect = "appear", className = "", ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "a";

    if (props.href && props.href.startsWith("/")) {
      throw new Error(
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
