import { useClipboard } from "@/hooks/useClipboard";
import * as ToastPrimitives from "@radix-ui/react-toast";
import clsx from "clsx";
import { forwardRef } from "react";
import { CheckCircleIcon } from "../icons";
import CloseButton from "./CloseButton";

// Komponent slouží k zobrazení notifikace, která po čase sama zmizí
// Používá se v kombinaci s `useToast` hookem

// Vychází z komponentu z radix ui - https://www.radix-ui.com/docs/primitives/components/toast

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx(
      "tablet:flex-col desktop:pb-12 pointer-events-none fixed bottom-0 left-1/2 top-auto z-modal-above flex max-h-screen w-full max-w-xl -translate-x-1/2 flex-col-reverse gap-3 px-4 pb-7",
      className
    )}
    {...props}
  />
));

type ToastComponentProps = {
  intent?: "default" | "error" | "success" | "warning";
  className?: string;
  [x: string]: any;
};

// Component Variant Styles
const componentVariants = {
  base: "group relative z-tooltip pointer-events-auto grid grid-cols-12 items-center w-full gap-3 overflow-hidden rounded-3xl px-4 py-3 shadow-lg transition-all data-[swipe=move]:transition-none data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:tablet:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
  intent: {
    default:
      "border border-transparent bg-gray-900 text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
    success:
      "border border-transparent bg-gray-900 text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
    error:
      "border border-transparent bg-gray-900 text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
    warning:
      "border border-transparent bg-gray-900 text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
  },
};

// Záloha původních hodnot
// const componentVariants = {
//   base: "group relative z-tooltip pointer-events-auto grid grid-cols-9 items-center w-full gap-3 overflow-hidden rounded-3xl p-4 shadow-lg transition-all data-[swipe=move]:transition-none data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:tablet:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full",
//   intent: {
//     default:
//       "border border-transparent bg-gray-900 text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
//     error: "bg-error text-error-content",
//     success: "bg-success text-success-content",
//     warning: "bg-warning text-warning-content",
//   },
// };

const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    ToastComponentProps
>(({ className, intent = "default", ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={clsx(
        componentVariants.base,
        componentVariants.intent[intent],
        className
      )}
      {...props}
    />
  );
});

const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={clsx(
      "inline-flex shrink-0 rounded-md bg-gray-600/40 px-3 py-2 text-sm font-semibold text-current hover:bg-gray-600/60 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close asChild>
    <CloseButton ref={ref} className={className} toast-close="" {...props} />
  </ToastPrimitives.Close>
));

const ToastCopyToClipboard = forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    textToCopy: string;
    [x: string]: any;
  }
>(({ className, textToCopy, ...props }, ref) => {
  const { copyToClipboard, isCopied } = useClipboard(textToCopy, {
    timeout: 3000,
  });
  return (
    <button
      ref={ref}
      className={clsx(
        "group/copy-to-clipboard relative isolate flex aspect-square shrink-0 cursor-pointer items-center justify-center",
        "transition duration-200",
        "p-1.5",
        className
      )}
      toast-close=""
      onClick={copyToClipboard}
      {...props}
    >
      <span className="sr-only">{isCopied ? "Zkopírováno" : "Zkopírovat"}</span>
      {isCopied ? (
        <CheckCircleIcon size={18} aria-hidden="true" />
      ) : (
        <ToastCopyToClipboard size={18} aria-hidden="true" />
      )}
      <span
        className={clsx(
          "rounded-xl",
          "absolute left-1/2 top-1/2 aspect-square h-auto w-full -translate-x-1/2 -translate-y-1/2 bg-current opacity-0 transition-opacity duration-200 group-hover/copy-to-clipboard:opacity-10"
        )}
      />
    </button>
  );
});

const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={clsx("whitespace-pre-line text-base font-bold", className)}
    {...props}
  />
));

const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={clsx(
      "desktop:text-base max-h-28 whitespace-pre-line text-sm opacity-90",
      className
    )}
    {...props}
  />
));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
Toast.displayName = ToastPrimitives.Root.displayName;
ToastAction.displayName = ToastPrimitives.Action.displayName;
ToastClose.displayName = ToastPrimitives.Close.displayName;
ToastCopyToClipboard.displayName = "ToastCopyToClipboard";
ToastTitle.displayName = ToastPrimitives.Title.displayName;
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastCopyToClipboard,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
