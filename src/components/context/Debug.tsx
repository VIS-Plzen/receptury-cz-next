"use client";
import { createContext, useCallback, useEffect, useState } from "react";

type DebugContextType = {
  debugMode: boolean;
  toggleDebugMode: () => void;
};

export const DebugContext = createContext<DebugContextType>(
  {} as DebugContextType
);

// Context Provider
export default function DebugContextProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [debugMode, setDebugMode] = useState(false);
  const [keyPressCount, setKeyPressCount] = useState(0);

  // Change behavior here!
  const targetKey = "Shift";
  const targetPressCount = 5;

  // Turn debug mode on/off
  const toggleDebugMode = useCallback(() => {
    setDebugMode((count) => !count);
  }, []); // prevent re-rendering with useCallback

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== targetKey) {
        setKeyPressCount(0);
        return;
      }

      setKeyPressCount((count) => count + 1);

      if (keyPressCount + 1 === targetPressCount) {
        toggleDebugMode();
        setKeyPressCount(0);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyPressCount, toggleDebugMode]);

  return <DebugContext.Provider value={{ debugMode, toggleDebugMode }} />;
}
