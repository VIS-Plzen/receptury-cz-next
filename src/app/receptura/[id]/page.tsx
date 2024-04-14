import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Galerie from "@/components/ui/Galery";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import { Hero, Informations } from "../Client";

export default async function Home({ params }: { params: { id: number } }) {
  const data = await readSome(params.id);

  async function readSome(id: number) {
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
              Podminka: `Identita='${id}'`,
              Vlastnosti: [],
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
  if (!data.Status) {
    return <Heading>Nenačetl jsem.</Heading>;
  }

  if (!data.Vety[0]) return null;
  const card = data.Vety[0].Vlastnosti;

  return (
    <div className="flex flex-col items-stretch justify-start gap-12 py-32 md:py-48">
      <Hero
        title={card.Nazev}
        jmeno={card.Autor}
        badges={data.Vety[0].Stitky}
        image={card.Obrazek}
      />
      <Informations
        title={card.Nazev}
        hmotnost={{
          porce: card.HmotnostPorceDospeli,
          masa: "115",
          omacky: "70",
        }}
        kalkulacka={{
          porci: 25,
          koeficient: "0.8",
          data: [
            { vaha: "24", surovina: "Filet ze sumečka" },
            { vaha: "1.5", surovina: "Podravka přísada do jídel Natura" },
            { vaha: "0.3", surovina: "Citrón (ks)" },
          ],
        }}
        postup={card.TechnologickyPostup}
        alergeny={{
          alergeny: ["1", "3", "7", "13"],
          text: "Alergeny uvedené u receptu se mohou lišit v závislosti na použitých surovinách. Čísla alergenů jsou uvedena podle přílohy II nařízení EU 1169/2011.",
        }}
        terapeut={{
          text:
            card.VyjadreniNT === ""
              ? "Není vyplněno - VyjadreniNT"
              : card.VyjadreniNT,
          badges: ["Ryby a mořské plody", "Smažené", "Bezlepkové"],
        }}
        skladba={{
          polevka: card.DoporucenaPolevka,
          priloha: card.DoporucenaPriloha,
          doplnek: card.DoporucenyDoplnek,
        }}
      />

      <Galerie images={[card.Obrazek1, card.Obrazek2, card.Obrazek3]} />

      {/* <VolitelnyObsah
        className="bg-white"
        title="Volitelný obsah partnera k danému receptu"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        img="/images/food.jpeg"
      /> */}
      {card.Autor !== "" && (
        <Partner
          jmeno={card.Autor}
          heslo="Heslo partnera, nebo krátký popis jejich služeb"
          img="/images/food.jpeg"
          color="default"
          hasButton
        />
      )}
    </div>
  );
}

const cv = {
  base: "border-secondary",
};

export function Partner({
  jmeno,
  heslo,
  img,
  hasButton,
  logo = "",
  color = "default",
}: {
  jmeno: string;
  heslo: string;
  img: any;
  hasButton?: boolean;
  logo?: string;
  color: "default" | "bidfood" | "bonduelle";
}) {
  const outterDivClasses = {
    default: "border-secondary-700 bg-secondary-700",
    bidfood: "border-bidfood-700 bg-bidfood-700",
    bonduelle: "border-bonduelle-700 bg-bonduelle-700",
  };

  const innerDivClasses = {
    default: "from-secondary-700 via-secondary/50",
    bidfood: "from-bidfood-700 via-bidfood/50",
    bonduelle: "from-bonduelle-700 via-bonduelle/50",
  };

  const textColor = {
    default: "text-secondary-900",
    bidfood: "text-bidfood-900",
    bonduelle: "text-bonduelle-900",
  };

  return (
    <Container>
      <div
        className={`relative flex aspect-[9/10] max-h-[450px] w-full flex-col overflow-hidden rounded-3xl border-2 ${outterDivClasses[color]} md:aspect-[3/1] md:max-h-full md:flex-row md:items-center`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b ${innerDivClasses[color]} from-45% via-80% to-transparent sm:from-60% md:bg-gradient-to-r md:via-70% lg:from-55%`}
        />
        <div className="z-fixed-below mt-5 flex flex-col gap-y-1 pl-5 md:my-auto md:pl-10 lg:gap-y-5">
          {logo ? (
            <Image
              src={logo}
              className="bg-transparent object-cover mix-blend-screen"
              alt=""
              height={50}
              width={100}
            />
          ) : (
            <span className="flex w-min items-center rounded-sm bg-white px-2 font-bold text-black">
              Logo
            </span>
          )}
          <Heading className="text-white md:text-2xl lg:text-4xl">
            {jmeno}
          </Heading>
          <p className="font-semibold text-white">{heslo}</p>
          {hasButton && <Button className="w-min">Více o nás</Button>}
        </div>
        <div className=" flex h-full w-full justify-end">
          <Image
            src={img}
            className="w-full bg-gray-300 object-cover"
            alt=""
            width={400}
            height={200}
          />
        </div>
        <span
          className={`absolute bottom-5 right-5 z-20 text-xs ${textColor[color]} md:top-5`}
        >
          Inspirační foto
        </span>
      </div>
    </Container>
  );
}
