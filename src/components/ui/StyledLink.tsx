import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import SmartLink from "../primitives/SmartLink";

type Props = React.ComponentPropsWithoutRef<typeof SmartLink> & {
  children: React.ReactNode;
  color?: "inherit" | "primary" | "secondary";
  hoverEffect?:
    | "none"
    | "static"
    | "appear"
    | "disappear"
    | "slide-left"
    | "slide-right"
    | "slide-back"
    | "scale-up"
    | "scale-down";
  asChild?: boolean;
  className?: string;
  [key: string]: any;
};

// Component Variants
const componentVariants = {
  base: "relative group/link h-max max-w-max",
  color: {
    inherit: "",
    primary: "text-primary",
    secondary: "text-secondary",
  },
  hoverEffect: {
    none: "",
    static:
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full bg-current opacity-0 group-hover/link:opacity-60",
    appear:
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-center translate-y-[-0.2875em] transform-gpu bg-current opacity-0 transition duration-200 group-hover/link:translate-y-0 group-hover/link:opacity-60",
    disappear:
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-center translate-y-0 transform-gpu bg-current opacity-60 transition duration-200 group-hover/link:translate-y-[0.125em] group-hover/link:opacity-0",
    "slide-left":
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-left scale-x-0 transform-gpu bg-current opacity-60 transition-transform duration-300 group-hover/link:origin-right group-hover/link:scale-x-100",
    "slide-right":
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-right scale-x-0 transform-gpu bg-current opacity-60 transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100",
    "slide-back":
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-left scale-x-100 transform-gpu bg-current opacity-60 transition-transform duration-300 group-hover/link:origin-right group-hover/link:scale-x-0 ease-out-circ",
    "scale-up":
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-center scale-x-0 transform-gpu bg-current opacity-60 transition-transform duration-300 group-hover/link:scale-x-100 ease-out-circ",
    "scale-down":
      "absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-center scale-x-100 transform-gpu bg-current opacity-60 transition-transform duration-300 group-hover/link:scale-x-0 ease-out-circ",
  },
};

const StyledLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      children,
      color = "inherit",
      hoverEffect = "slide-back",
      asChild,
      isLoading = false,
      className = "",
      ...props
    },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : SmartLink;
    return (
      <Component
        ref={forwardedRef}
        className={cn(
          "inline-flex gap-1",
          hoverEffect !== "none" && componentVariants.base,
          componentVariants.color[color],
          className
        )}
        {...props}
      >
        {hoverEffect !== "none" && (
          <span className={cn(componentVariants.hoverEffect[hoverEffect])} />
        )}
        {hoverEffect === "slide-back" && (
          <span className="ease-out-circ absolute inset-x-0 top-[92%] h-[0.0625em] w-full origin-right scale-x-0 transform-gpu bg-current opacity-60 transition-transform duration-300 group-hover/link:origin-left group-hover/link:scale-x-100 group-hover/link:delay-300" />
        )}
        {children}
      </Component>
    );
  }
);

StyledLink.displayName = "StyledLink";
export default StyledLink;
