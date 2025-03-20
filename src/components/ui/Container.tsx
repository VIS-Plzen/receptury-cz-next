import { cn } from "@/utils/cn";

import type { JSX } from "react";

type Props<E extends React.ElementType = "div"> = {
  children: React.ReactNode;
  as?: E | keyof JSX.IntrinsicElements;
  className?: string;
};

type ElementTypeProps<E extends React.ElementType> = Props<E> &
  Omit<React.ComponentProps<E>, keyof Props<E>>;

export default function Container<E extends React.ElementType = "div">({
  children,
  as,
  className = "",
  ...props
}: ElementTypeProps<E>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "mx-auto block w-full max-w-[90rem] px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
