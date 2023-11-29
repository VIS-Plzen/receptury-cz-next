import { cn } from "@/utils/cn";

type Props = React.ComponentPropsWithoutRef<"p"> & {
  children: React.ReactNode;
  className?: string;
};

export default function ErrorText({
  children,
  className = "",
  ...props
}: Props) {
  return (
    <p
      className={cn("text-sm leading-tight text-error-500", className)}
      {...props}
    >
      {children}
    </p>
  );
}
