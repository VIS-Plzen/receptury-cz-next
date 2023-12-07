import { cn } from "@/utils/cn";

type Props<E extends React.ElementType = "div"> = {
  children: React.ReactNode;
  as?: E | keyof JSX.IntrinsicElements;
  className?: string;
};

type GenericProps<E extends React.ElementType> = Props<E> &
  Omit<React.ComponentProps<E>, keyof Props<E>>;

export default function Container<E extends React.ElementType = "div">({
  children,
  as,
  className = "",
  ...props
}: GenericProps<E>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "mx-auto block w-full max-w-[84rem] px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
