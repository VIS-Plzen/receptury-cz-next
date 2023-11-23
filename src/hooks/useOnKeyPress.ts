"use client";

import { useEffect } from "react";

// Spustí callback funkci, když se stiskne klávesa

// Usage:
// import { useOnKeyPress } from "@/hooks/useOnKeyPress";
// ...
// useOnKeyPress("Enter", () => handleEnterPress());

export function useOnKeyPress(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callback]);
}
