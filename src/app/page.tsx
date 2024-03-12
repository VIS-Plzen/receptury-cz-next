import Inspirace from "./Inspirace";
import Receptury from "./Receptury";
import Spolupracujeme from "./Spolupracujeme";
import VolitelnyObsah from "./VolitelnyObsah";

export default async function Home() {
  const groupsData = [
    {
      value: "bezmase_sladke",
      title: "Bezmasé sladké pokrmy",
      options: [
        { value: "pecene", title: "Pečené a smažené" },
        { value: "varene", title: "Vařené" },
        { value: "kase", title: "Kaše" },
      ],
    },
    {
      value: "bezmase_slane",
      title: "Bezmasé slané pokrmy",
      options: [
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
      options: [],
    },
    { value: "nezadano", title: "Nezadáno", options: [] },
    {
      value: "polevky",
      title: "Polévky",
      options: [
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
      options: [],
    },
    {
      value: "svaciny",
      title: "Svačiny",
      options: [
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
      options: [],
    },
  ];

  // základní fetch kterej chce dodělat

  let data = await readSome();

  async function createNew() {
    return await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Create",
          },
          Hodnoty: {
            CisloReceptury: 421112233,
            Druh: "Svačiny Pomazánky sýrové a tvarohové",
            Nazev: "Jidlo",
            Stav: "Rozpracovaná",
          },
        }),
      })
    ).json();
  }

  async function readSome() {
    const result = await (
      await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: "12345VIS",
          Funkce: "ObecnyDotaz",
          Parametry: [
            {
              Tabulka: "Receptury",
              Operace: "Read",
              Limit: 15,
              Vlastnosti: ["Nazev", "Identita", "Obrazek"],
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

  return (
    <div className="flex flex-col items-stretch justify-start gap-12 py-32 md:py-48">
      <Inspirace />
      <Receptury
        className="border-y-2 border-primary-200"
        initialData={data ? data : undefined}
        groupsData={groupsData}
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
