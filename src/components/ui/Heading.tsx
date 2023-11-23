import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  as?: React.ElementType;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  hasMarginBottom?: boolean;
  className?: string;
  [key: string]: any;
};

// Component Variants
const componentVariants = {
  base: "leading-[1.15] font-sans font-bold text-gray-950",
  size: {
    xs: "text-sm md:text-xl",
    sm: "text-base md:text-2xl",
    md: "text-lg md:text-4xl",
    lg: "text-xl md:text-5xl",
    xl: "text-2xl md:text-6xl",
    "2xl": "text-3xl md:text-7xl 2xl:text-8xl",
    inherit: "",
  },
  hasMarginBottom: "mb-[0.65em]",
};

export default function Heading({
  as,
  level = 2,
  size = "md",
  hasMarginBottom = false,
  className = "",
  children,
  ...props
}: Props) {
  // as prop takes precedence over level prop (defined by default)
  const Component = as || (`h${level}` as React.ElementType);
  return (
    <Component
      className={cn(
        componentVariants.base,
        componentVariants.size[size],
        hasMarginBottom && componentVariants.hasMarginBottom,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
