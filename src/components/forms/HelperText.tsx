import { cn } from "@/utils/cn";

type Props = React.ComponentPropsWithoutRef<"p"> & {
  children: React.ReactNode;
  className?: string;
};

export default function HelperText({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <p
      className={cn("text-sm leading-tight text-gray-500", className)}
      {...props}
    >
      {children}
    </p>
  );
}
