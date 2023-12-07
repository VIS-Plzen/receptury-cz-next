import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export default function SkipNavigationButton({
  className,
}: {
  className?: string;
}) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "absolute left-10 top-0 z-offcanvas-above -translate-y-[250%] focus-visible:translate-y-0",
        className
      )}
    >
      <a href="#obsah">Přeskočit navigaci</a>
    </Button>
  );
}
