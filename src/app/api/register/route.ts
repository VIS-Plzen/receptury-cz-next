import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { firstName, lastName, email, password } = await request.json();

  try {
    const res = await fetch(
      "https://jidelny.cz/wp-json/receptury/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          redirectAfter: "https://receptury.cz/registration-finished",
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
