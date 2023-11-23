import { cn } from "@/utils/cn";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  as?: React.ElementType;
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

const TemplateRefPolymorphic = forwardRef<HTMLElement, Props>(
  ({ children, as: AsElement = "div", className = "", ...props }, ref) => {
    return (
      <AsElement ref={ref} className={cn("", className)} {...props}>
        {children}
      </AsElement>
    );
  }
);

TemplateRefPolymorphic.displayName = "TemplateRefPolymorphic";
export default TemplateRefPolymorphic;
