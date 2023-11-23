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

export default function Container({
  children,
  as: AsElement = "div",
  className = "",
  ...props
}: Props) {
  return (
    <AsElement
      className={cn(
        "mx-auto block w-full max-w-[84rem] px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </AsElement>
  );
}
