import { getNazvy } from './fetchNazvy';
import { getSuroviny } from './fetchSuroviny';
import { nazvy as nazvyStatic, suroviny as surovinyStatic } from './static';

export async function fetchCachedData() {
  const [surovinyRes, nazvyRes] = await Promise.all([getSuroviny(), getNazvy()]);
  let suroviny: string[] = [];
  if (surovinyRes.Status) {
    suroviny = surovinyRes.Vety.map((veta: any) => veta.Vlastnosti.NazevSuroviny).sort((a: string, b: string) => a.localeCompare(b));
  } else {
    suroviny = surovinyStatic;
  }
  let nazvy: string[] = [];
  if (nazvyRes.Status) {
    nazvy = nazvyRes.Vety.map((veta: any) => veta.Vlastnosti.Nazev).sort((a: string, b: string) => a.localeCompare(b));
  } else {
    nazvy = nazvyStatic;
  }
  return { suroviny, nazvy };
}