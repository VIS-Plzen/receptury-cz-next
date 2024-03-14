// Not using Headless UI Disclosure component,
// because it can't be properly animated even with framer-motion.
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

import { CloseIcon } from "../icons";

//
// Collapse Group component
type CollapseGroupProps = {
  children:
    | React.ReactElement<typeof Collapse>
    | React.ReactElement<typeof Collapse>[];
  className?: string;
  [x: string]: any;
};

export function CollapseGroup({
  children,
  className = "",
  ...props
}: CollapseGroupProps) {
  return (
    <div className={className} {...props}>
      <div className="flex flex-col divide-y divide-white/15">{children}</div>
    </div>
  );
}

//
// Collapse component
type CollapseProps = {
  title: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6 | "none";
  isDefaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
};

export function Collapse({
  title,
  titleLevel = 3,
  isDefaultOpen = false,
  children,
  className = "",
  ...props
}: CollapseProps) {
  // Opening and closing state
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  // Generate unique ids for aria
  const triggerId = useId();
  const panelID = useId();

  // Resolve title level
  let Tag = `h${titleLevel}` as keyof JSX.IntrinsicElements;
  if (titleLevel === "none") Tag = "div";

  return (
    <div className={clsx(className)} {...props}>
      {/* Title and trigger button */}
      <Tag className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          id={"collapse-trigger-" + triggerId}
          aria-controls={"collapse-panel-" + panelID}
          aria-expanded={isOpen ? "true" : "false"}
          className="flex w-full items-center justify-between py-4 text-black hover:text-primary"
        >
          <span className="block w-full text-left text-lg font-extrabold uppercase transition-colors duration-300 sm:text-xl">
            {title}
          </span>
          <CloseIcon
            className={clsx(
              "h-6 w-6 shrink-0 origin-center transition duration-300 ease-out",
              isOpen ? "rotate-0 scale-105" : "rotate-[225deg]"
            )}
          />
        </button>
      </Tag>

      {/* Content panel */}
      <div
        id={"collapse-panel-" + panelID}
        role="region"
        aria-labelledby={"collapse-trigger-" + triggerId}
        aria-hidden={isOpen ? "false" : "true"}
        className="overflow-hidden"
      >
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              exit={{ height: 0, opacity: 0 }}
              className=""
            >
              <div className="pb-6 pt-2">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Exports
export default Collapse;
Collapse.Group = CollapseGroup;
