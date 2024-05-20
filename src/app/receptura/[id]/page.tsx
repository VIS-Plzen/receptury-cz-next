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
      ];
  const result = await (
    await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Uzivatel: process.env.BE_USER,
        Heslo: process.env.BE_PASSWORD,
        SID: token ? token : "12345VIS",
        Funkce: "Receptury",
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
  const showAll = token && paid;

  const data: any = await readSome(params.id, showAll);

  if (!data || !data.Status) {
    return <Heading>Nenačetl jsem.</Heading>;
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

const cv = {
  base: "border-secondary",
};
