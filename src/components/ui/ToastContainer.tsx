"use client";
import {
  Toast,
  ToastClose,
  ToastCopyToClipboard,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import clsx from "clsx";
import { useEffect } from "react";
import { CheckCircleIcon, ErrorIcon, HelpIcon } from "../icons";

export function ToastContainer() {
  const { toasts, clearAllToasts } = useToast();

  useEffect(() => {
    clearAllToasts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        icon,
        intent,
        backend,
        // action,
        ...props
      }) {
        if (intent === "error" && backend && props.open) {
          console.log(title + ":", {
            editedText: description,
            backend: backend,
          });
        }
        if (intent === "error" && title === "Chyba [42]") {
          return null;
        }
        return (
          <Toast key={id} {...props} intent={intent}>
            <div className="col-span-1 print:hidden">
              {!icon ? (
                intent === "error" ? (
                  <div className="text-error-400">
                    <ErrorIcon size={24} />
                  </div>
                ) : intent === "warning" ? (
                  <div className="text-warning-300">
                    <HelpIcon size={24} />
                  </div>
                ) : (
                  <div className="text-success-400">
                    <CheckCircleIcon size={24} />
                  </div>
                )
              ) : (
                icon
              )}
            </div>
            <div
              className={clsx(
                "grid w-full",
                // !action ? "col-span-8" : "col-span-5"
                "col-span-8"
              )}
            >
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* {action && <div className="col-span-2">{action}</div>} */}
            <div className="col-span-3 flex justify-end gap-1">
              {title && intent === "error" && (
                <ToastCopyToClipboard
                  textToCopy={
                    title?.toString() +
                    (description ? " - " + description.toString() : "")
                  }
                />
              )}
              <ToastClose />
            </div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
