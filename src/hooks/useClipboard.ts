import { useEffect, useState } from "react";

// How to use
// import { useClipboard } from "@/hooks/useClipboard";
// ...
// const { copyToClipboard, isCopied } = useClipboard("Hello World", {
//    timeout: 1000,
// });
// ...
// <button onClick={copyToClipboard}>Copy</button>
// <p>Text is copied: {isCopied ? "Yes" : "No"}</p>

type UseClipboardProps = {
  timeout?: number;
};

type UseClipboardReturn = {
  copyToClipboard: () => void;
  isCopied: boolean;
};

export function useClipboard(
  initialValue: string,
  { timeout }: UseClipboardProps = {}
): UseClipboardReturn {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCopied && timeout) {
      timeoutId = setTimeout(() => setIsCopied(false), timeout);
    }

    return () => clearTimeout(timeoutId);
  }, [isCopied, timeout]);

  const copyToClipboard = () => {
    const tempInput = document.createElement("input");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-1000px";
    tempInput.style.width = "1px";
    tempInput.style.height = "1px";
    tempInput.style.margin = "-1px";
    tempInput.style.padding = "0";
    tempInput.style.opacity = "0";
    tempInput.style.zIndex = "-1000";
    tempInput.style.pointerEvents = "none";
    tempInput.style.userSelect = "none";
    tempInput.value = initialValue;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setIsCopied(true);
  };

  return { copyToClipboard, isCopied };
}
