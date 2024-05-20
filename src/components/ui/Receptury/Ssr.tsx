import Receptury from "./Receptury";

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
            Podminka: podminka,
            Limit: 15,
            Offset: (page - 1) * 15,
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
  if (result.Result) {
    result.Result.Vety = result.Vety;
    return result.Result;
  }
  return {
    Status: false,
    Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
  };
}

export const groupsData = [
  {
    value: "bezmase_sladke",
    title: "Bezmasé sladké pokrmy",
    options: [
      { value: "vse", title: "Vše" },
      { value: "pecene", title: "Pečené a smažené" },
      { value: "varene", title: "Vařené" },
      { value: "kase", title: "Kaše" },
    ],
  },
  {
    value: "bezmase_slane",
    title: "Bezmasé slané pokrmy",
    options: [
      { value: "vse", title: "Vše" },
      {
        value: "zeleninove",
        title: "Zeleninové",
      },
      {
        value: "lusteniny",
        title: "Luštěninové",
      },
      {
        value: "moucne",
        title: "Moučné a obilninové",
      },
      { value: "testovinove", title: "Těstovinové" },
      { value: "bramborove", title: "Bramborové" },
      { value: "houbove", title: "Houbové" },
      { value: "salaty", title: "Saláty" },
      { value: "ostatni", title: "Ostatní" },
    ],
  },
  {
    value: "doplnky",
    title: "Doplňky",
    options: [
      { value: "vse", title: "Vše" },
      {
        value: "salaty_zeleninove",
        title: "Saláty zeleninové",
      },
      {
        value: "salaty_ovocne",
        title: "Saláty ovocné",
      },
      {
        value: "kompoty",
        title: "Kompoty",
      },
      {
        value: "moucniky",
        title: "Moučníky",
      },
      {
        value: "mlecne_dezerty",
        title: "Mléčné dezerty",
      },
      {
        value: "zelenina_cerstva",
        title: "Zelenina čerstvá",
      },
      {
        value: "ovoce_cerstve",
        title: "Ovoce čerstvé",
      },
      {
        value: "ostatni",
        title: "Ostatní",
      },
    ],
  },
  {
    value: "masite",
    title: "Masité pokrmy",
    options: [
      { value: "vse", title: "Vše" },
      { value: "veprove", title: "Vepřové" },
      { value: "kureci", title: "Kuřecí" },
      { value: "kruti", title: "Krůtí" },
      { value: "kralici", title: "Králičí" },
      { value: "hovezi", title: "Hovězí" },
      { value: "zverina", title: "Zvěřina" },
      { value: "teleci", title: "Telecí" },
      { value: "vnitrnosti", title: "Vnitřnosti" },
      { value: "husi_a_kachni", title: "Husí a kachní" },
      { value: "ostatni", title: "Ostatní" },
      {
        value: "mleta_masa_a_masove_smesi",
        title: "Mletá masa a masové směsi",
      },
    ],
  },
  {
    value: "napoje",
    title: "Nápoje",
    options: [{ value: "vse", title: "Vše" }],
  },
  {
    value: "nezadano",
    title: "Nezadáno",
    options: [{ value: "vse", title: "Vše" }],
  },
  {
    value: "polevky",
    title: "Polévky",
    options: [
      { value: "vse", title: "Vše" },
      {
        value: "zeleninove",
        title: "Zeleninové",
      },
      {
        value: "lusteninove",
        title: "Luštěninové",
      },
      {
        value: "masove_a_rybi",
        title: "Masové a rybí",
      },
      {
        value: "obilninove",
        title: "Obilninové",
      },
      { value: "bramborove", title: "Bramborové" },
      { value: "vyvary", title: "Vývary" },
      { value: "houbove", title: "Houbové" },
      {
        value: "ostatni",
        title: "Ostatní",
      },
    ],
  },
  {
    value: "prilohy_a_prikrmy",
    title: "Přílohy a příkrmy",
    options: [
      { value: "vse", title: "Vše" },
      { value: "bramborove", title: "Bramborové" },
      { value: "testovinove", title: "Těstovinové" },
      { value: "obilninove", title: "Obilninové" },
      { value: "knedliky", title: "Knedlíky" },
      { value: "zelenina", title: "Zelenina" },
      { value: "omacky", title: "Omáčky" },
      { value: "pecivo", title: "Pečivo" },
      { value: "ostatni", title: "Ostatní" },
      { value: "lusteninove", title: "Luštěninové" },
    ],
  },
  {
    value: "rybi_pokrmy",
    title: "Rybí pokrmy",
    options: [{ value: "vse", title: "Vše" }],
  },
  {
    value: "svaciny",
    title: "Svačiny",
    options: [
      { value: "vse", title: "Vše" },
      {
        value: "pomazanky_syrove_a_tvarohove",
        title: "Pomazánky sýrové a tvarohové",
      },
      {
        value: "pomazanky_masove",
        title: "Pomazánky masové",
      },
      {
        value: "pomazanky_vajecne",
        title: "Pomazánky vaječné",
      },
      {
        value: "pomazanky_rybi",
        title: "Pomazánky rybí",
      },
      {
        value: "mlecne_vyrobky",
        title: "Mléčné výrobky",
      },
      {
        value: "kase",
        title: "Kaše",
      },
      {
        value: "pecivo",
        title: "Pečivo",
      },
      {
        value: "moucniky",
        title: "Moučníky",
      },
      {
        value: "ostatni",
        title: "Ostatní",
      },
      {
        value: "pomazanky_zeleninove/ovocne",
        title: "Pomazánky zeleninové/ovocné",
      },
      {
        value: "pomazanky_lusteninove",
        title: "Pomazánky luštěninové",
      },
      {
        value: "pomazanky_ostatni",
        title: "Pomazánky ostatní",
      },
    ],
  },
  {
    value: "zavarky",
    title: "Zavářky",
    options: [{ value: "vse", title: "Vše" }],
  },
];

export default async function Ssr({
  searchParams,
  title = "Receptury",
  className = "",
  urlPreQuery = "",
  boxSettings,
  sid,
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
  sid?: string;
}) {
  let [selectedGroup, selectedSubgroup] = returnGroups();

  function returnGroups() {
    if (!searchParams.skupina) return [undefined, undefined];
    let skup = groupsData.find((group) => group.value === searchParams.skupina);
    if (!skup) return [undefined, undefined];

    if (!searchParams.podskupina) return [skup.title, undefined];
    let podskup = skup.options.find(
      (subgroup) => subgroup.value === searchParams.podskupina
    );
    if (!podskup) return [skup.title, undefined];
    return [skup.title, podskup.title];
  }
  const sideBarValues = returnSideBarValues();
  function returnSideBarValues() {
    let holder: {
      title: string;
      name: string;
      backend: string;
      options: {
        title: string;
        name: string;
        checked: boolean;
        disabled?: boolean;
        backend?: string;
      }[];
    }[] = [
      {
        title: "Obecné",
        name: "obecne",
        backend: "Obecne",
        options: [
          {
            title: "Moje oblíbené",
            name: "moje",
            backend: "Oblíbené",
            checked: false,
          },
          {
            title: "Nutričně ověřeno",
            name: "nutricni",
            backend: "SchvalenoNT",
            checked: false,
          },
          {
            title: "Stáhnout do skladu",
            name: "sklad",
            backend: "MSklad",
            checked: false,
          },
          {
            title: "Videoreceptury",
            name: "videoreceptury",
            checked: false,
            backend: "Video",
          },
        ],
      },
      {
        title: "Speciální strava",
        name: "special",
        backend: "Dieta",
        options: [
          {
            title: "Bezlepková",
            name: "bezlepkova",
            backend: "Dieta1",
            checked: false,
          },
          {
            title: "Bezmléčná",
            name: "bezmlecna",
            backend: "Dieta2",
            checked: false,
          },
          {
            title: "Šetřící",
            name: "setrici",
            backend: "Dieta3",
            checked: false,
          },
        ],
      },
      {
        title: "Způsob přípravy",
        name: "priprava",
        backend: "TepelnaUprava",
        options: [
          {
            title: "Vařené",
            name: "varene",
            backend: "Vařené",
            checked: false,
          },
          {
            title: "Dušené",
            name: "dusene",
            backend: "Dušené",
            checked: false,
          },
          {
            title: "Pečené",
            name: "pecene",
            backend: "Pečené",
            checked: false,
          },
          {
            title: "Zapečené",
            name: "zapecene",
            backend: "Zapečené",
            checked: false,
          },
          {
            title: "Smažené",
            name: "smazene",
            backend: "Smažené",
            checked: false,
          },
          {
            title: "Ostatní",
            name: "ostatni",
            backend: "Ostatní",
            checked: false,
          },
        ],
      },
      {
        title: "Partner",
        name: "partner",
        backend: "Receptar",
        options: [
          {
            title: "Bidfood",
            name: "bidfood",
            backend: "1",
            checked: false,
          },
          {
            title: "Bonduelle",
            name: "bonduelle",
            backend: "2",
            checked: false,
          },
        ],
      },
    ];
    searchParams &&
      Object.keys(searchParams).forEach((key) => {
        const values = searchParams[key].split(",");
        const box = holder.find((b) => b.name === key);
        if (box && Array.isArray(values)) {
          values.forEach((v) => {
            const option = box.options.find((o) => o.name === v);
            if (option) {
              option.checked = true;
            }
          });
        }
      });

    if (boxSettings) {
      holder.forEach((box) =>
        box.options.forEach((boxValue) => {
          const valueName = boxValue.name;
          if (boxSettings.initialTrue?.includes(valueName))
            boxValue.checked = true;
          if (boxSettings.disabledValues?.includes(valueName))
            boxValue.disabled = true;
        })
      );
    }
    return holder;
  }

  const comboBoxValues = returnComboBoxValues();
  function returnComboBoxValues() {
    const holder = [
      {
        title: "Dle receptury",
        name: "receptura",
        value: "",
        options: [
          "Znojemský guláš",
          "Hovězí pečeně na celeru",
          "Celerová pomazánka s krabím masem",
        ],
      },
      {
        title: "Dle suroviny",
        name: "surovina",
        value: "",
        options: ["Cizrna", "Avokádo", "Med", "Rajčata"],
      },
    ];
    // Načte hodnoty z URL
    searchParams &&
      Object.keys(searchParams).forEach((key) => {
        const comboBox = holder.find((b) => b.name === key);
        const values = searchParams[key].split(",");
        if (comboBox) {
          comboBox.value = values[0];
        }
      });
    return holder;
  }

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
    sid
  );

  return (
    <Receptury
      title={title}
      className={className}
      boxSettings={boxSettings}
      urlPreQuery={urlPreQuery}
      initialData={data}
      groupsData={groupsData}
    />
  );
}
