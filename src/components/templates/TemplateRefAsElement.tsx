import { cn } from "@/lib/cn";
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

const TemplateRefAsElement = forwardRef<HTMLElement, Props>(
  ({ children, as: AsElement = "div", className = "", ...rest }, ref) => {
    return (
      <AsElement ref={ref} className={cn("", className)} {...rest}>
        {children}
      </AsElement>
    );
  }
);

TemplateRefAsElement.displayName = "TemplateRefAsElement";
export default TemplateRefAsElement;
