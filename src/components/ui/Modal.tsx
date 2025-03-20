"use client";
import Container from "@/components/ui/Container";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import type { MutableRefObject } from "react";
import { useEffect, useState } from "react";
import { ArrowLeftAltIcon } from "../icons";
import CloseButton from "./CloseButton";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  width?: "sm" | "md" | "lg";
  isScrollable?: boolean;
  hasArrowBack?: boolean;
  onClose?: () => void;
  children?: any;
  onArrowBackClick?: any;
  initialFocus?: MutableRefObject<HTMLElement | null>;
  setCity?: any;
  cancelAnimations?: boolean;
};

const componentVariants = {
  root: "top-[12%] md:top-[15%] left-1/2 -translate-x-1/2 w-[92%] max-h-[76%] md:max-h-[70%] h-auto overflow-y-auto z-modal-above bg-surface-100 rounded-2xl origin-top",
  width: {
    sm: "max-w-lg",
    md: "max-w-2xl",
    lg: "max-w-6xl",
  },
  isScrollable: "overflow-y-auto",
};

export default function Modal({
  isOpen,
  setIsOpen,
  title,
  hasArrowBack = false,
  width = "md",
  isScrollable = false,
  onArrowBackClick,
  onClose,
  initialFocus,
  children,
  setCity,
  cancelAnimations,
}: ModalProps) {
  useEffect(() => {
    if (isOpen && initialFocus) {
      const timer = setTimeout(() => {
        if (initialFocus.current) {
          initialFocus.current.focus();
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isOpen, initialFocus]);

  return (
    <DialogPrimitive.Root
      defaultOpen={false}
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        onClose && onClose();
      }}
      modal={true}
    >
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={cancelAnimations ? undefined : { opacity: 0 }}
                animate={
                  cancelAnimations
                    ? undefined
                    : {
                        opacity: 1,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }
                }
                exit={
                  cancelAnimations
                    ? undefined
                    : {
                        opacity: 0,
                        transition: { duration: 0.1, ease: "easeOut" },
                      }
                }
                className="fixed inset-0 z-modal-below h-screen w-screen bg-black/40 backdrop-blur-xs dark:bg-white/20"
                aria-hidden={true}
                onClick={() => setIsOpen(false)}
              />
            </DialogPrimitive.Overlay>
            <motion.div
              initial={
                cancelAnimations ? undefined : { opacity: 0, scale: 0.95 }
              }
              animate={
                cancelAnimations
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }
              }
              exit={
                cancelAnimations
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.1, ease: "easeOut" },
                    }
              }
              className={clsx(
                "fixed inset-0 z-modal min-h-screen w-screen",
                isScrollable && componentVariants.isScrollable
              )}
            >
              <DialogPrimitive.Content
                forceMount
                className={clsx(
                  isScrollable ? "relative" : "absolute",
                  componentVariants.root,
                  componentVariants.width[width]
                )}
              >
                <Container className="border-edge relative flex w-full items-center justify-between border-b bg-white py-6 ">
                  {hasArrowBack && (
                    <button
                      onClick={() => onArrowBackClick()}
                      className="mr-auto"
                    >
                      <ArrowLeftAltIcon className="h-5 w-5" />
                    </button>
                  )}
                  <DialogPrimitive.Title
                    className={clsx(
                      "text-center text-lg font-medium",
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    )}
                  >
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close asChild>
                    <CloseButton
                      size="md"
                      onClick={() => {
                        setIsOpen(false);
                        setCity && setCity(false);
                      }}
                      className="ml-auto"
                    />
                  </DialogPrimitive.Close>
                </Container>

                <Container className="bg-white">{children}</Container>
              </DialogPrimitive.Content>
            </motion.div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

export function ModalTester() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>ukaž modal</button>
      <Modal isOpen={open} setIsOpen={setOpen}></Modal>
    </>
  );
}
