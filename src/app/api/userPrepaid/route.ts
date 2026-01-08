import { cFalse, coder, returnPaidTo } from "@/utils/shorties";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Není vyplňen SID token." },
      paidTo: cFalse,
    });
  }

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

    if (!data.email)
      return NextResponse.json({
        Status: false,
        Chyba: { Kod: data.data.status, message: data.message },
        paidTo: cFalse,
      });

    const coderRes = coder(undefined, returnPaidTo(data), "long");

    if (!coderRes.Status) {
      return NextResponse.json({
        Status: false,
        Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
        paidTo: cFalse,
      });
    }
    const response = NextResponse.json({
      Status: true,
      paidTo: coderRes.data,
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
      paidTo: cFalse,
    });
  }
}
