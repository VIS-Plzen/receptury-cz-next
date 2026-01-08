"use client";

import DebugContextProvider from "@/context/Debug";
import { CardProvider } from "@/context/FavoriteCards";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DebugContextProvider>
        <CardProvider>{children}</CardProvider>
      </DebugContextProvider>
    </div>
  );
}
