import { coder, returnPaidTo } from "@/utils/shorties";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const resLogin = await fetch(
      "https://jidelny.cz/wp-json/receptury/v1/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const dataLogin = await resLogin.json();
    if (!dataLogin.token) {
      return NextResponse.json(dataLogin);
    }

    const resProfile = await fetch(
      "https://jidelny.cz/wp-json/receptury/v1/user/profile",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: dataLogin.token,
        }),
      }
    );
    const dataProfile = await resProfile.json();
    if (!dataProfile.firstName) {
      return NextResponse.json(dataProfile);
    }
    const resValidate = await fetch(
      "https://jidelny.cz/wp-json/receptury/v1/user/validate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: dataLogin.token,
        }),
      }
    );
    const dataValidate = await resValidate.json();

    dataProfile.token = dataLogin.token;
    dataProfile.tokenValidTo = dataLogin.tokenValidTo;

    const paid: any = coder(undefined, returnPaidTo(dataValidate), "long");

    if (!paid.Status) {
      NextResponse.json({
        Status: false,
        Chyba: { Kod: 1000, message: paid.error },
      });
    }
    dataProfile.paid = paid.data;

    return NextResponse.json(dataProfile);
  } catch (error) {
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  }
}
