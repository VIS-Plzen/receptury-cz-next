import Ssr from "@/components/ui/Receptury/Ssr";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Inspirace from "./Inspirace";
import MembershipModal from "./MembershipModal";
import Spolupracujeme from "./Spolupracujeme";
import VolitelnyObsah from "./VolitelnyObsah";

export const metadata: Metadata = {
  title: "Stránka | Receptury",
  description: "Desc",
};

export default async function Home({ searchParams }: any) {
  const cookie = cookies();
  const sid = cookie.has("token") ? cookie.get("token")?.value : "12345VIS";

  const [nove, oblibene] = await Promise.all([readNew(), readFavorite()]);

  async function readNew() {
    const result = await (
      await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: sid,
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
    if (result.Result && result.Result.Status) {
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
          SID: sid,
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

    if (result.Result && result.Result.Status) {
      return result.Vety;
    }
    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  }

  return (
    <div className="flex flex-col items-stretch justify-start gap-12 pb-32 pt-8 md:pb-36 md:pt-10">
      <MembershipModal params={searchParams} />
      <Inspirace initData={{ nove: nove, oblibene: oblibene }} />
      <Ssr
        searchParams={searchParams}
        className="border-y-2 border-primary-200"
        sid={sid}
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
