import { coder, returnPaidTo } from "@/utils/shorties";
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
    if (data.paid) {
      const coderRes = coder(undefined, returnPaidTo(data.paidTo), "long");
      if (!coderRes.Status) {
        return NextResponse.json({
          Status: false,
          Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
        });
      } else return NextResponse.json({ Status: true, paidTo: coderRes.data });
    }

    return NextResponse.json({ Status: false, paidTo: false });
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  }
}
