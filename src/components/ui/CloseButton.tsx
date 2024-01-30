import clsx from "clsx";
import { forwardRef } from "react";
import { CancelIcon } from "../icons";

type CloseButtonProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
  onClick?: () => void;
  [x: string]: any;
};

// Component Variant Styles
const componentVariants = {
  root: "flex items-center justify-center aspect-square shrink-0 justify-center relative isolate cursor-pointer group/close-button",
  transition: "transition duration-200",
  radius: "rounded-xl",
  size: {
    root: {
      xs: "p-0.5",
      sm: "p-1",
      md: "p-1.5",
      lg: "p-2",
      xl: "p-2.5",
      "2xl": "p-3.5",
      inherit: "p-[0.2em]",
    },
    icon: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "w-6 h-6",
      xl: "h-8 w-8",
      "2xl": "w-10 h-10",
      inherit: "h-[1em] w-[1em]",
    },
  },
};

const CloseButton = forwardRef<Ref, CloseButtonProps>(
  (
    {
      // Component props
      size = "md",
      className = "",
      onClick,
      ...rest
    },
    ref
  ) => {
    // Component logic
    return (
      // Component Markup
      <button
        ref={ref}
        onClick={onClick}
        className={clsx(
          componentVariants.root,
          componentVariants.transition,
          componentVariants.size.root[size],
          componentVariants.radius,
          className
        )}
        aria-label="Zavřít"
        type="button"
        {...rest}
      >
        <CancelIcon
          aria-hidden="true"
          className={clsx(
            componentVariants.size.icon[size],
            "translate-x-0 transform-gpu"
          )}
        />
      </button>
    );
  }
);

export type Ref = HTMLButtonElement;

CloseButton.displayName = "CloseButton";

export default CloseButton;
