"use client";

import DebugContextProvider from "@/context/Debug";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DebugContextProvider>
        {children}

        <ProgressBar
          height="4px"
          color="#ED7002"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </DebugContextProvider>
    </div>
  );
}
