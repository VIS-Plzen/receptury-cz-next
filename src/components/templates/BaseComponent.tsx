import { cn } from "@/utils/cn";

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
