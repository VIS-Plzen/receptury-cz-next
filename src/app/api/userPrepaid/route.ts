import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  try {
    const res = await fetch(
      "https://jidelny.cz/wp-json/receptury/v1/user/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
        }),
      }
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  }
}
