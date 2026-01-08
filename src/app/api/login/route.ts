import { coder, returnPaidTo } from "@/utils/shorties";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log(`Login attempt for email: ${email}`);

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
    console.log("Login response:", { ...dataLogin, token: dataLogin.token ? "EXISTS" : "MISSING" });
    if (!dataLogin.token) {
      console.log("Login failed - no token received");
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
    console.log("Profile response:", { hasData: !!dataProfile, firstName: dataProfile.firstName || "MISSING" });
    if (!dataProfile.firstName) {
      console.log("Profile fetch failed - no firstName received");
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
    console.log("Validation response:", { validated: !!dataValidate });

    dataProfile.token = dataLogin.token;
    dataProfile.tokenValidTo = dataLogin.tokenValidTo;

    const paid: any = coder(undefined, returnPaidTo(dataValidate), "long");
    console.log("Paid status:", { status: paid.Status ? "SUCCESS" : "FAILED" });

    if (!paid.Status) {
      console.log("Paid status error:", paid.error);
      NextResponse.json({
        Status: false,
        Chyba: { Kod: 1000, message: paid.error },
      });
    }
    dataProfile.paid = paid.data;
    console.log("Login process successful, returning profile data");

    return NextResponse.json(dataProfile);
  } catch (error) {
    console.error("Login process error:", error);
    return NextResponse.json({
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    });
  }
}
