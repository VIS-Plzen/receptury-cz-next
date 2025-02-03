import { useCoderAndCompareDates } from "@/utils/shorties";
import { cookies, headers } from "next/headers";
import { LogMe, Page } from "./Client";
import { ErrorPage } from "./Error";

async function readSome(id: string, token: string | undefined, paid: boolean) {
  if (id === "test.receptury.adelis.cz") return null;
  const vlastnosti = paid
    ? []
    : [
        "Nazev",
        "Identita",
        "Obrazek",
        "DruhSkupina",
        "DruhPodskupina",
        "Dieta1",
        "Dieta2",
        "Dieta3",
        "TepelnaUprava",
        "Receptar",
      ];

  const result = await (
    await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Uzivatel: process.env.BE_USER,
        Heslo: process.env.BE_PASSWORD,
        SID: token ? token : "12345VIS",
        Funkce: "RecepturyDetail",
        Parametry: [
          {
            Tabulka: "Receptury",
            Operace: "Read",
            Podminka: `Identita='${id}'`,
            Limit: 1,
            Stitek: "",
            Vlastnosti: vlastnosti,
          },
        ],
      }),
    })
  ).json();

  if (result.Result) {
    result.Result.Vety = result.Vety;
    return result.Result;
  }
  return {
    Status: false,
    Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
  };
}

async function readSomeByCode(code: string) {
  const result = await (
    await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Uzivatel: process.env.BE_USER,
        Heslo: process.env.BE_PASSWORD,
        SID: "12345VIS",
        Funkce: "RecepturyDetail",
        Parametry: [
          {
            KodSdileni: code,
          },
        ],
      }),
    })
  ).json();

  if (result.Result && result.Result.Status) {
    result.Result.Vety = result.Vety;
    return result.Result;
  }

  return {
    Status: false,
    Chyba: {
      Kod: 1000,
      message: result.Result.Chyba?.Popis ?? "Chybně odchyceno v API",
    },
  };
}

export default async function Home({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const path = `${protocol}://${host}${params.path || ""}`;

  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const paid = useCoderAndCompareDates(cookie.get("paid")?.value);

  const shared = params.id === "sdilena";

  const data: any = shared
    ? await readSomeByCode(Object.keys(searchParams)[0])
    : await readSome(params.id, token, paid);

  if (!data || !data.Status) {
    return <ErrorPage shared={shared} />;
  }

  if (!data.Vety[0]) {
    return <LogMe msg={[data, params.id]} />;
  }
  const curr = data.Vety[0];
  const card = curr.Vlastnosti;

  return (
    <Page
      card={card}
      curr={curr}
      logged={token}
      token={token}
      paid={paid}
      path={path}
      shared={shared ? curr.ZbyvaSdileni : false}
    />
  );
}
