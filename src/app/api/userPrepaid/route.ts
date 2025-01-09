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
      }
      const response = NextResponse.json({
        Status: true,
        paidTo: coderRes.data,
      });
      response.cookies.set("paid", coderRes.data ?? "", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return response;
    }

    return NextResponse.json({ Status: false, paidTo: false });
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  }
}
