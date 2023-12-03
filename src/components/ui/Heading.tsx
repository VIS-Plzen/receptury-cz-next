import { cn } from "@/utils/cn";

type Props<E extends React.ElementType = "h2"> = {
  children: React.ReactNode;
  as?: E;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  hasMarginBottom?: boolean;
  className?: string;
};

type GenericProps<E extends React.ElementType> = Props<E> &
  Omit<React.ComponentProps<E>, keyof Props<E>>;

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

export default function Heading<E extends React.ElementType = "h2">({
  children,
  as,
  size = "md",
  hasMarginBottom = false,
  className = "",
  ...props
}: GenericProps<E>) {
  const Component = as || "h2";

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
