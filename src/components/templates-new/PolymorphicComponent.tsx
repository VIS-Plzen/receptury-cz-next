import { cn } from "@/utils/cn";

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

export default function PolymorphicComponent({
  children,
  as: AsElement = "div",
  className = "",
  ...props
}: Props) {
  return (
    <AsElement className={cn("", className)} {...props}>
      {children}
    </AsElement>
  );
}
