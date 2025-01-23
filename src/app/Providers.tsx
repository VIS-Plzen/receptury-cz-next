"use client";

import DebugContextProvider from "@/context/Debug";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DebugContextProvider>{children}</DebugContextProvider>
    </div>
  );
}
