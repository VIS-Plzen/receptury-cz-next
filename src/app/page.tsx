import Ssr from "@/components/ui/Receptury/Ssr";
import { useCoderAndCompareDates } from "@/utils/shorties";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Inspirace from "./Inspirace";
import MembershipModal from "./MembershipModal";

export const metadata: Metadata = {
  title: "Stránka | Receptury",
  description: "Desc",
};

export default async function Home({ searchParams }: any) {
  const cookie = cookies();
  const gridView = cookie.get("gridView")?.value ?? "true";
  const sid = cookie.has("token") ? cookie.get("token")?.value : "12345VIS";
  const paid = useCoderAndCompareDates(cookie.get("paid")?.value);
  const inspiraceVisible = cookie.get("inspiraceVisible")?.value ?? "nove";
  const memberModal = await returnMemberModal();

  const [nove, oblibene] =
    inspiraceVisible !== "false"
      ? await Promise.all([
          inspiraceVisible === "nove" ? readNew() : "hidden",
          inspiraceVisible === "oblibene" ? readFavorite() : "hidden",
        ])
      : ["hidden", "hidden"];

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

  async function returnMemberModal() {
    if (searchParams.activated && sid !== "12345VIS") {
      if (searchParams.order_result === "success" && paid) return "paid";
      else if (searchParams.order_result === "pending") return "pending";
    } else if (cookie.has("memModal")) return "unpaid";
  }

  return (
    <div className="flex flex-col items-stretch justify-start pb-20 pt-8 md:pt-10">
      {memberModal && <MembershipModal type={memberModal} />}
      <Inspirace
        inspiraceVisible={inspiraceVisible}
        initData={{ nove: nove, oblibene: oblibene }}
        token={sid}
      />
      <Ssr
        searchParams={searchParams}
        // border-y-2 při volitelný obsah
        className="border-t-2 border-primary-200"
        token={sid}
        paid={paid}
        boxSettings={{
          disabledValues: ["bonduelle", "bidfood"],
          hiddenBoxes: ["partner"],
        }}
        isGridView={gridView === "true"}
      />
      {/* <Spolupracujeme /> */}
      {/*  <VolitelnyObsah
        title="Volitelný obsah"
        img="/images/food.jpeg"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      /> */}
    </div>
  );
}
