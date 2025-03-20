import { cn } from "@/utils/cn";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { motion } from "motion/react";
import { CalendarViewMontsIcon, ListIcon } from "../icons";

function ToggleGridButton({
  className,
  gridView,
  setGridView,
  id,
}: {
  className?: string;
  gridView?: boolean;
  setGridView: (gridView: boolean) => void;
  id: string;
}) {
  return (
    <ToggleGroup.Root
      className={cn(
        "relative h-[52px] space-x-1 rounded-2xl border-2 border-primary-200 px-1.5 py-1.5",
        className
      )}
      type="single"
      defaultValue="grid"
      aria-label="View"
    >
      <ToggleGroup.Item
        className={cn("relative isolate z-10 rounded-xl p-0.5")}
        value="grid"
        aria-label="Grid view"
        onClick={() => setGridView(true)}
      >
        <CalendarViewMontsIcon className="relative z-10 h-8 w-8" />
        {gridView && (
          <motion.span
            layoutId={id}
            className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-primary-200"
          />
        )}
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className={cn("relative isolate rounded-xl p-0.5", gridView && "z-10")}
        value="row"
        aria-label="Row view"
        onClick={() => setGridView(false)}
      >
        <ListIcon className="relative z-10 h-8 w-8" />
        {gridView === false && (
          <motion.span
            layoutId={id}
            className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-primary-200"
          />
        )}
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}

export default ToggleGridButton;
