type Props = {};

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
export default function Ssr({ params, searchParams }: any) {
  console.log(searchParams);
  return <div>ssr</div>;
}
