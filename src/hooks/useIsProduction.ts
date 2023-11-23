"use client";

import { useEffect, useState } from "react";

// Hook vrátí true pokud je aplikace spuštěna v produkčním prostředí
// (pokud je nastavena proměnná NEXT_PUBLIC_ENVIRONMENT na hodnotu "production")
//

// Usage:
// import { useIsProduction } from "@/hooks/useIsProduction";
// const isProduction = useIsProduction();
// ...
// if (isProduction) {
//   return null;
// }
// ...
// return <div>...</div>;

export function useIsProduction(): boolean {
  const [isProduction, setIsProduction] = useState<boolean>(false);

  useEffect(() => {
    setIsProduction(process.env.NEXT_PUBLIC_ENVIRONMENT === "production");
  }, []);

  return isProduction;
}
