import Ssr from "@/components/ui/Receptury/Ssr";
import type { Metadata } from "next";
import Inspirace from "./Inspirace";
import MembershipModal from "./MembershipModal";
import Spolupracujeme from "./Spolupracujeme";
import VolitelnyObsah from "./VolitelnyObsah";

export const metadata: Metadata = {
  title: "Stránka | Receptury",
  description: "Desc",
};

export default async function Home({ searchParams }: any) {
  let nove = await readNew();
  let oblibene = await readFavorite();

  async function readNew() {
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
              Limit: 10,
              OrderBy: "DatumAktualizace",
              Vlastnosti: [
                "Nazev",
                "Identita",
                "Obrazek",
                "DruhSkupina",
                "DruhPodskupina",
                "Dieta1",
                "Dieta2",
                "Dieta3",
                "TepelnaUprava",
              ],
            },
          ],
        }),
      })
    ).json();

    if (result.Result) {
      return result.Vety;
    }
    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  }

  async function readFavorite() {
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
              Stitek: "Oblíbené",
              Limit: 10,
              OrderBy: "",
              Vlastnosti: [
                "Nazev",
                "Identita",
                "Obrazek",
                "DruhSkupina",
                "DruhPodskupina",
                "Dieta1",
                "Dieta2",
                "Dieta3",
                "TepelnaUprava",
              ],
            },
          ],
        }),
      })
    ).json();

    if (result.Result) {
      return result.Vety;
    }
    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  }

  return (
    <div className="flex flex-col items-stretch justify-start gap-12 py-32 md:py-36">
      <MembershipModal />
      <Inspirace initData={{ nove: nove, oblibene: oblibene }} />
      <Ssr
        searchParams={searchParams}
        className="border-y-2 border-primary-200"
      />
      <Spolupracujeme />
      <VolitelnyObsah
        title="Volitelný obsah"
        img="/images/food.jpeg"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      />
    </div>
  );
}
