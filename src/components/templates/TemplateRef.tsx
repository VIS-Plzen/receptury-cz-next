import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

// Component Variant Styles
// const componentVariants = {
//   base: "",
//   prop: {
//     value: "",
//     value: "",
//     value: "",
//   },
// }

const TemplateRef = forwardRef<HTMLElement, Props>(
  ({ as: AsElement = "div", className = "", children, ...rest }, ref) => {
    return (
      <AsElement ref={ref} className={cn("", className)} {...rest}>
        {children}
      </AsElement>
    );
  }
);

TemplateRef.displayName = "TemplateRef";
export default TemplateRef;
