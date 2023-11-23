import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export default function TemplateBase({
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
