import { NextResponse } from "next/server";

/* Příklad parametrů
    {
      Tabulka: string; "Receptury"
      Operace: "Read" | "Create" | "Update" | "Delete";
      Podminka?: string; "Druh='Svačiny Pomazánky'"
      Hodnoty?: { Druh: string; Nazev: string; Stav: string };
      Stitek?: { Nazev: string; Uzivatel: string; Pouziti: string };
    },
*/

export async function POST(request: Request) {
  const { sid, funkce, parametry } = await request.json();
  try {
    const res = await fetch(
      "https://test.receptury.adelis.cz/APIFrontend.aspx",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: sid,
          Funkce: funkce,
          Parametry: [parametry],
        }),
      }
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ Chyba: error });
  }
}
