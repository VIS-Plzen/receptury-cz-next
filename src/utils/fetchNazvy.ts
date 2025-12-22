// Cache for last successful response
let lastSuccessfulResponse: any = null;

export async function getNazvy() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_RECEPTURY_URL ?? "", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 60 * 60 * 24,
      },
      body: JSON.stringify({
        Uzivatel: process.env.BE_USER,
        Heslo: process.env.BE_PASSWORD,
        SID: "12345VIS",
        Funkce: "Receptury",
        Parametry: [
          {
            Tabulka: "Receptury",
            Operace: "Read",
            Vlastnosti: ["Nazev"],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const result = await response.json();
    if (result.Result && result.Result.Status) {
      result.Result.Vety = result.Vety;
      // Store successful response
      lastSuccessfulResponse = result.Result;
      return result.Result;
    }

    // If result is not successful but we have a cached response, use it
    if (lastSuccessfulResponse) {
      console.warn("API returned unsuccessful result, using cached response");
      return lastSuccessfulResponse;
    }

    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  } catch (error) {
    console.error("Error fetching nazvy:", error);

    // If request failed but we have a cached response, use it
    if (lastSuccessfulResponse) {
      console.warn(
        "Request failed, using cached response from previous successful request"
      );
      return lastSuccessfulResponse;
    }

    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  }
}
