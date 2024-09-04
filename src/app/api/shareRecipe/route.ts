import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { sid, cislo } = await request.json();

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
          Funkce: "Sdilet",
          Parametry: [
            {
              Receptura: cislo,
            },
          ],
        }),
      }
    );

    const data = await res.json();
    if (data.Result?.Status) {
      return NextResponse.json({ Status: true, Kod: data.Kod });
    }
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1001, message: "Chybně odchyceno v API" },
    });
  }
}
