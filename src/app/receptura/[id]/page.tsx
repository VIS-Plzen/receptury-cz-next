import Heading from "@/components/ui/Heading";
import { LogMe, Page } from "./Client";

async function readSome(id: string) {
  if (id === "test.receptury.adelis.cz") return null;
  const result = await (
    await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Uzivatel: process.env.BE_USER,
        Heslo: process.env.BE_PASSWORD,
        SID: "12345VIS",
        Funkce: "Receptury",
        Parametry: [
          {
            Tabulka: "Receptury",
            Operace: "Read",
            Podminka: `Identita='${id}'`,
            Limit: 1,
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
  const data: any = await readSome(params.id);

  if (!data || !data.Status) {
    return <Heading>Nenačetl jsem.</Heading>;
  }

  if (!data.Vety[0]) {
    return <LogMe msg={[data, params.id]} />;
  }
  const curr = data.Vety[0];
  const card = curr.Vlastnosti;

  return <Page card={card} curr={curr} />;
}

const cv = {
  base: "border-secondary",
};
