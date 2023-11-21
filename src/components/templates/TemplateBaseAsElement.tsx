import { cn } from "@/lib/cn";

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

export default function TemplateBaseAsElement({
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
