import { useEffect, useState } from "react";

// Komponent zajistí fungování komponentu pouze na straně klienta
// Občas je nutné použít pokud dojde k rozdílu v UI mezi stranou klienta a serveru
// -> (např. při načtení hodnoty z localStorage na klientovi a podle toho aktualizace UI)

// Poznámka:
// - To co vracíme když ještě funkce neproběhla (!mounted)... by mělo sloužit jako placeholder
// a mít stejné rozměry i vzhled jako mountnutá UI, aby nedošlo k layout shiftu a probliknutí.

// How to use:
// import { useMounted } from "@/hooks/useMounted";
// const mounted = useMounted();
// ...
// if (!mounted) {
//   return null; // or <div>...</div>;
// }
// ...
// return <div>...</div>;

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
