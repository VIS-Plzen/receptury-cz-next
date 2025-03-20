import { cn } from "@/utils/cn";

import type { JSX } from "react";

type Props<E extends React.ElementType = "h2"> = {
  children: React.ReactNode;
  as?: E | keyof JSX.IntrinsicElements;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  hasMarginBottom?: boolean;
  className?: string;
};

type ElementTypeProps<E extends React.ElementType> = Props<E> &
  Omit<React.ComponentProps<E>, keyof Props<E>>;

// Component Variants
const cv = {
  base: "leading-[1.15] font-sans font-bold text-gray-950",
  size: {
    xs: "text-sm md:text-xl",
    sm: "text-lg md:text-2xl",
    md: "text-lg md:text-4xl",
    lg: "text-xl md:text-5xl",
    xl: "text-2xl md:text-6xl",
    "2xl": "text-3xl md:text-7xl 2xl:text-8xl",
    inherit: "",
  },
  hasMarginBottom: "mb-[0.65em]",
};

export default function Heading<E extends React.ElementType = "h2">({
  children,
  as,
  size = "md",
  hasMarginBottom = false,
  className = "",
  ...props
}: ElementTypeProps<E>) {
  const Component = as || "h2";

  return (
    <Component
      className={cn(
        cv.base,
        cv.size[size],
        hasMarginBottom && cv.hasMarginBottom,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
