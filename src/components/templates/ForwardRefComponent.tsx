import { cn } from "@/utils/cn";
import { forwardRef } from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
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
  ({ children, className = "", ...props }, forwardedRef) => {
    return (
      <div ref={forwardedRef} className={cn("", className)} {...props}>
        {children}
      </div>
    );
  }
);

ForwardRefComponent.displayName = "ForwardRefComponent";
export default ForwardRefComponent;
