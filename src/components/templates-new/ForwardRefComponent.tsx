import { cn } from "@/utils/cn";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
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

const ForwardRefComponent = forwardRef<HTMLDivElement, Props>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);

ForwardRefComponent.displayName = "ForwardRefComponent";
export default ForwardRefComponent;
