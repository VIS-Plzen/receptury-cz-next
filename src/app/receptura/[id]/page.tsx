import Heading from "@/components/ui/Heading";
import { cookies } from "next/headers";
import { LogMe, Page } from "./Client";

async function readSome(id: string, token: string | undefined) {
  if (id === "test.receptury.adelis.cz") return null;
  const vlastnosti = token
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

export default async function Home({ params }: { params: any }) {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const paid = cookie.get("paid")?.value;
  const showAll = paid && token;

  const data: any = await readSome(params.id, token);

  if (!data || !data.Status) {
    return (
      <div className="flex h-[calc(100vh-200px)] justify-center pt-48">
        <Heading size="sm">Nepodařilo se načíst data.</Heading>
      </div>
    );
  }

  if (!data.Vety[0]) {
    return <LogMe msg={[data, params.id]} />;
  }
  const curr = data.Vety[0];
  const card = curr.Vlastnosti;

  return (
    <Page card={card} curr={curr} logged={showAll} paid={paid === "true"} />
  );
}
