import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

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

const TemplateRefSlot = forwardRef<HTMLDivElement, Props>(
  ({ children, asChild, className = "", ...rest }, ref) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component ref={ref} className={cn("", className)} {...rest}>
        {children}
      </Component>
    );
  }
);

TemplateRefSlot.displayName = "TemplateRefSlot";
export default TemplateRefSlot;
