import { cn } from "@/utils/cn";
import React from "react";

type Props = React.ComponentPropsWithRef<"div"> & {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

// Component Variants
// const cv = {
//   base: "",
//   prop: {
//     value: "",
//     value: "",
//     value: "",
//   },
// }

export default function BaseComponent({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
