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
  const { Sid, Funkce, Parametry } = await request.json();

  try {
    const res = await fetch(
      "https://test.receptury.adelis.cz/APIFrontend.aspx",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: Sid,
          Funkce: Funkce,
          Parametry: [Parametry],
        }),
      }
    );

    const data = await res.json();
    if (data.Result) {
      data.Result.Vety = data.Vety;
      return NextResponse.json(data.Result);
    }
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  }
}
