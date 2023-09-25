import { cn } from "@/lib/cn";

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

export default function TemplateBase({
  as: AsElement = "div",
  className = "",
  children,
  onClick,
  ...props
}: Props) {
  return (
    <AsElement className={cn("", className)} {...props}>
      {children}
    </AsElement>
  );
}
