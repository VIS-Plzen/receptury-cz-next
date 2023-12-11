import { DebugContext } from "@/context/Debug";
import { useCallback, useContext, useState } from "react";

export function useDebugMode() {
  const { debugMode, toggleDebugMode } = useContext(DebugContext);
  const [clickCount, setClickCount] = useState(0);

  // Modifikovat zde pro změnu počtu kliknutí
  const targetClickCount = 5;

  const updateDebugModeClickCount = useCallback(() => {
    setClickCount((count) => count + 1);

    if (clickCount + 1 === targetClickCount) {
      toggleDebugMode();
      setClickCount(0);
    }
  }, [clickCount, toggleDebugMode]);

  return { isDebugModeEnabled: debugMode, updateDebugModeClickCount };
}
