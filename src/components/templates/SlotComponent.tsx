import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";

// Slot merges its props onto its immediate child.

// Docs: https://www.radix-ui.com/primitives/docs/utilities/slot

// Usage:
// <SlotComponent asChild data-something="true" ... >
//   <button onClick={() => {...do something}} />
// </SlotComponent>

// Output:
// <button data-something="true" ... onClick={() => {...do something}} />

type Props = {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  [key: string]: any;
};

// Component Variants
// const componentVariants = {
//   base: "",
//   prop: {
//     value: "",
//     value: "",
//     value: "",
//   },
// }

export default function SlotComponent({
  children,
  asChild,
  className = "",
  ...props
}: Props) {
  const Component = asChild ? Slot : "div";
  return (
    <Component className={cn("", className)} {...props}>
      {children}
    </Component>
  );
}
