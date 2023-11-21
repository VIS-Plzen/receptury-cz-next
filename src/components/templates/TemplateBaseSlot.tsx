import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";

// Slot docs: https://www.radix-ui.com/primitives/docs/utilities/slot

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

export default function TemplateBaseSlot({
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
