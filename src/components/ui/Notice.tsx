"use client";

import React, { useEffect, useRef, useState } from "react";
// import { tv } from "tailwind-variants";
import clsx from "clsx";
import {
  CancelIcon,
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  HelpIcon,
} from "../icons";
import Button from "./Button";

// const noticeStyles = tv({
//   base: [""],
//   variants: {
//     variant: {
//       info: [""],
//       success: [""],
//       warning: [""],
//       error: [""],
//       "info-solid": [""],
//       "success-solid": [""],
//       "warning-solid": [""],
//       "error-solid": [""],
//     },
//   },
// });

const noticeStyles = {
  base: "flex items-start justify-start gap-x-3 rounded-xl px-4 py-3",
  variants: {
    variant: {
      info: [
        "text-gray-600 bg-gray-400/25",
        "dark:text-gray-200 dark:bg-gray-600/25",
      ],
      success: [
        "text-success-700 bg-success-400/25",
        "dark:text-success-300 dark:bg-success-800/25",
      ],
      warning: [
        "text-warning-700 bg-warning-400/25",
        "dark:text-warning-300 dark:bg-warning-800/25",
      ],
      error: [
        "text-error-700 bg-error-400/25",
        "dark:text-error-300 dark:bg-error-800/25",
      ],
      "info-solid": [
        "text-gray-100 bg-gray-800",
        "dark:text-gray-600 dark:bg-gray-200",
      ],
      "success-solid": [
        "text-primary-100 bg-success-600",
        "dark:text-primary-900 dark:bg-success-400",
      ],
      "warning-solid": [
        "text-warning-100 bg-warning-600",
        "dark:text-warning-900 dark:bg-warning-400",
      ],
      "error-solid": [
        "text-error-100 bg-error-600",
        "dark:text-error-900 dark:bg-error-400",
      ],
    },
  },
};

const noticeTitleStyles = {
  base: "",
  variants: {
    variant: {
      info: ["text-gray-950", "dark:text-white"],
      success: ["text-success-800", "dark:text-success-200"],
      warning: ["text-warning-800", "dark:text-warning-200"],
      error: ["text-error-800", "dark:text-error-200"],
      "info-solid": ["text-gray-100", "dark:text-gray-950"],
      "success-solid": ["text-success-50", "dark:text-primary-950"],
      "warning-solid": ["text-warning-50", "dark:text-warning-950"],
      "error-solid": ["text-error-50", "dark:text-error-950"],
    },
  },
};

type NoticeStyleProps = {
  variant?: keyof typeof noticeStyles.variants.variant;
};

type NoticeProps = React.ComponentPropsWithoutRef<"div"> &
  NoticeStyleProps & {
    children?: string;
    title: string;
    isOpen?: boolean;
    onOpenChange?: () => void;
    isDismissible?: boolean;
    scrollOnMount?: boolean;
    className?: string;
  };

export function Notice({
  children,
  title,
  variant = "info",
  isOpen = true,
  onOpenChange,
  isDismissible = true,
  scrollOnMount = false,
  ...props
}: NoticeProps) {
  const [isVisible, setIsVisible] = useState(isOpen);

  const ref = useRef<HTMLDivElement>(null);

  const isControlled = isOpen !== undefined && onOpenChange !== undefined;

  // If prop scrollOnMount is true, scroll to the top of the notice
  useEffect(() => {
    if (!ref.current) return;

    if (scrollOnMount) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isVisible, scrollOnMount]);

  // If the component is controlled, update the state when the prop changes
  useEffect(() => {
    if (isControlled) {
      setIsVisible(isOpen!);
    }
  }, [isOpen, isControlled]);

  // If the component is controlled, call the prop when the state changes
  function handleDismiss() {
    if (isControlled) {
      onOpenChange?.();
    } else {
      setIsVisible(false);
    }
  }

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      {...props}
      className={clsx(
        noticeStyles.base,
        noticeStyles.variants.variant[variant],
        "flex items-center justify-between"
      )}
    >
      <div className="flex items-center gap-4">
        <NoticeIcon variant={variant} />
        <div className="flex flex-col gap-1 text-sm">
          {title && <NoticeTitle variant={variant}>{title}</NoticeTitle>}
          {children && <NoticeText>{children}</NoticeText>}
        </div>
      </div>
      {isDismissible && <NoticeCloseButton onClick={handleDismiss} />}
    </div>
  );
}

function NoticeIcon(props: {
  variant?: keyof typeof noticeStyles.variants.variant;
}) {
  if (props.variant?.includes("success")) {
    return <CheckIcon {...props} />;
  }

  if (props.variant?.includes("warning")) {
    return <CancelIcon {...props} />;
  }

  if (props.variant?.includes("error")) {
    return <ErrorIcon {...props} />;
  }

  return <HelpIcon {...props} />;
}

function NoticeCloseButton(
  props: Omit<React.ComponentPropsWithoutRef<typeof Button>, "children">
) {
  return (
    <Button
      {...props}
      className={clsx(
        "relative mt-1 inline-flex shrink-0 items-center justify-center",
        props.className
      )}
    >
      <CloseIcon size={16} />
    </Button>
  );
}

function NoticeTitle({
  children,
  variant = "info",
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"p"> &
  NoticeStyleProps & { children: React.ReactNode }) {
  return (
    <p
      {...props}
      className={clsx(noticeTitleStyles.variants.variant[variant], className)}
    >
      <strong>{children}</strong>
    </p>
  );
}

function NoticeText(props: React.ComponentPropsWithoutRef<"p">) {
  return <p {...props} />;
}
