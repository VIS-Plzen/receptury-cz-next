import { fetchCachedData } from "@/utils/fetchCachedData";
import { returnFilterBase } from "@/utils/shorties";
import Receptury from "./Receptury";

export const recipesPerPage = 15;

async function readSome(
  page: any,
  selectedGroup: any,
  selectedSubgroup: any,
  comboBoxValues: any,
  sideBarValues: any,
  sid: string | undefined
) {
  //Filtrování
  let podminka = "";
  let stitek = "";

  //Skupina podskupina
  if (selectedGroup) {
    podminka += `DruhSkupina='${selectedGroup}'`;
    if (selectedSubgroup) {
      podminka += ` AND DruhPodskupina='${selectedSubgroup}'`;
    }
  }

  //Comboboxy
  if (comboBoxValues[0].value !== "") {
    if (podminka !== "") podminka += " AND ";
    podminka += `Nazev LIKE '%${comboBoxValues[0].value}%'`;
  }

  //Boxiky
  sideBarValues.forEach((box: any) => {
    let boxPodminka = "";
    box.options.forEach((option: any) => {
      if (option.checked && option.backend) {
        switch (box.name) {
          case "partner":
            if (boxPodminka !== "") boxPodminka += " OR ";
            boxPodminka += `${box.backend}='${option.backend}'`;
            break;
          case "priprava":
            if (boxPodminka !== "") boxPodminka += " OR ";
            boxPodminka += `${box.backend}='${option.backend}'`;
            break;
          case "special":
            if (boxPodminka !== "") boxPodminka += " AND ";
            boxPodminka += `${option.backend}='Ano'`;
            break;
          case "obecne":
            if (option.name === "moje" || option.name === "sklad") {
              stitek = option.backend;
            } else {
              if (boxPodminka !== "") boxPodminka += " AND ";
              boxPodminka += `${option.backend}<>''`;
              break;
            }
        }
      }
    });
    if (boxPodminka !== "") {
      if (podminka !== "") podminka += ` AND `;
      podminka += `(${boxPodminka})`;
      boxPodminka = "";
    }
  });

  try {
    const result = await (
      await fetch(process.env.NEXT_PUBLIC_RECEPTURY_URL ?? "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: sid ? sid : "12345VIS",
          Funkce: "Receptury",
          Parametry: [
            {
              Tabulka: "Receptury",
              Operace: "Read",
              Podminka: podminka,
              Limit: recipesPerPage,
              Offset: (page - 1) * recipesPerPage,
              OrderBy: "Ulozeno DESC",
              Vlastnosti: [
                "Veta",
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
              Stitek: stitek,
              Surovina: comboBoxValues[1].value.toLowerCase(),
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
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  } catch {
    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  }
}

export default async function Ssr({
  searchParams,
  title = "Receptury",
  className = "",
  urlPreQuery = "",
  boxSettings = {
    initialTrue: ["vse"],
  },
  token,
  paid,
  isGridView,
}: {
  searchParams: any;
  title?: string;
  initialData?: any;
  className?: string;
  urlPreQuery?: string;
  boxSettings?: {
    hiddenBoxes?: string[];
    disabledValues?: string[];
    initialTrue?: string[];
  };
  token?: string;
  paid?: boolean | string;
  isGridView?: boolean;
}) {
  const { suroviny, nazvy } = await fetchCachedData();
  const { selectedGroup, selectedSubgroup, sideBarValues, comboBoxValues } =
    returnFilterBase(searchParams, boxSettings, suroviny, nazvy);

  const page = !searchParams
    ? 1
    : !searchParams.stranka
      ? 1
      : searchParams.stranka;

  const data = await readSome(
    page,
    selectedGroup,
    selectedSubgroup,
    comboBoxValues,
    sideBarValues,
    token
  );

  return (
    <Receptury
      title={title}
      className={className}
      boxSettings={boxSettings}
      urlPreQuery={urlPreQuery}
      initialData={data}
      isGridView={isGridView}
      logged={token}
      paid={paid}
      comboBoxes={comboBoxValues}
      sideBars={sideBarValues}
    />
  );
}
