"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { useState } from "react";
import VolitelnyObsah from "../VolitelnyObsah";

const icons: {
  name:
    | "archive"
    | "calendar-view-months"
    | "downloading"
    | "favorite-fill"
    | "favorite"
    | "list"
    | "print"
    | "rate-review"
    | "share"
    | "visibility"
    | "visibility-off";
  label: string;
  onClick: () => void;
}[] = [
  {
    name: "favorite",
    label: "oblíbené",
    onClick: () => console.log("oblíbené"),
  },
  {
    name: "share",
    label: "sdílet",
    onClick: () => console.log("sdílet"),
  },
  {
    name: "print",
    label: "tisk",
    onClick: () => console.log("tisk"),
  },
  {
    name: "archive",
    label: "MSklad",
    onClick: () => console.log("MSklad"),
  },
  {
    name: "downloading",
    label: ".PDF",
    onClick: () => console.log(".PDF"),
  },
  {
    name: "downloading",
    label: ".XLS",
    onClick: () => console.log(".XLS"),
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-24 py-32 md:py-48">
      <Hero
        title={"Sumeček v parmazánovém těstíčku s bramborovou kaší"}
        jmeno={"Jméno partnera"}
        badges={["Ryby a mořské plody", "Bezmléčná dieta"]}
      />
      <Informations
        title={"Sumeček v parmazánovém těstíčku s bramborovou kaší"}
        hmotnost={{ porce: "280", masa: "115", omacky: "70" }}
        kalkulacka={{
          porci: 25,
          koeficient: "0.8",
          data: [
            { vaha: "24", surovina: "Filet ze sumečka" },
            { vaha: "1.5", surovina: "Podravka přísada do jídel Natura" },
            { vaha: "0.3", surovina: "Citrón (ks)" },
          ],
        }}
        postup={
          "Čerstvou rybu nakrájíme na porce. Mrkev a celer očistíme a nakrájíme na kostičky. Očištěný pórek nakrájíme na kolečka. Pekáč vymažeme olejem a poklademe částí pórku, vložíme ryby, ochutíme solí, posypeme špetkou koriandru a oregana, mrkví, celerem a zbylým pórkem. Pečeme v konvektomatu 20 minut na 160 °C."
        }
        alergeny={{
          alergeny: ["1", "3", "7", "13"],
          text: "Alergeny uvedené u receptu se mohou lišit v závislosti na použitých surovinách. Čísla alergenů jsou uvedena podle přílohy II nařízení EU 1169/2011.",
        }}
        terapeut={{
          text: "Rybích pokrmů není nikdy málo, tento navíc využívá velmi kvalitní rybí maso, které se na trhu prodává bez kostí a kůže. Lehkce stravitelné a šťavnaté rybí maso je doplněné zeleninou, zajímavou chuť pokrmu navíc přidá mletý koriandr v kombinaci s oreganem (dobromyslí).",
          badges: ["Ryby a mořské plody", "Smažené", "Bezlepkové"],
        }}
      />
      <VolitelnyObsah
        className="bg-white"
        title="Volitelný obsah partnera k danému receptu"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      />
      <Partner
        jmeno="Jméno partnera"
        heslo="Heslo partnera, nebo krátký popis jejich služeb"
      />
    </div>
  );
}

function Hero({
  logo,
  title,
  jmeno,
  badges,
}: {
  logo?: string;
  title: string;
  jmeno: string;
  badges: string[];
}) {
  return (
    <Container>
      <div className="relative flex flex-col gap-y-3 rounded-3xl border-2 border-primary-600/30 bg-white p-5 md:flex-row-reverse md:justify-between md:gap-x-7 md:pr-0">
        <div className="mx-auto flex h-[300px] w-full rounded-2xl bg-secondary-700 md:mx-0 md:my-auto md:mb-auto md:h-[350px] md:max-w-[650px] lg:h-[400px] lg:max-w-[750px]"></div>
        <div className="flex flex-col gap-y-5 p-3 md:max-w-[450px] md:px-0">
          <div className="flex flex-col gap-y-3 md:flex-col-reverse">
            <div className="flex gap-x-2">
              <span className="flex min-w-min items-center rounded-sm bg-primary-300/30 px-2 font-bold text-black">
                Logo
              </span>
              <span>Tento recept pro vás připravila společnost {jmeno}</span>
            </div>
            <Heading as="h1">{title}</Heading>
          </div>
          <div className="flex gap-x-1.5">
            {badges.map((badge, index) => (
              <Badge key={"bmbi" + index}>{badge}</Badge>
            ))}
          </div>
          <div className="absolute right-5 top-5 flex gap-x-3 md:static md:mt-20">
            {icons.map((icon, index) => (
              <div
                key={"kfhi" + index}
                className={`${
                  icon.name === "share" || icon.name === "favorite"
                    ? "flex"
                    : "hidden md:flex"
                } w-min flex-col items-center text-center`}
              >
                <ButtonIcon
                  onClick={icon.onClick}
                  icon={icon.name}
                ></ButtonIcon>
                <span className="hidden text-sm font-bold md:block">
                  {icon.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
function Informations({
  title,
  postup,
  kalkulacka,
  hmotnost,
  alergeny,
  terapeut,
}: {
  title: string;
  postup: string;
  kalkulacka: {
    porci: number;
    koeficient: string;
    data: { vaha: string; surovina: string }[];
  };
  hmotnost: { porce: string; masa: string; omacky: string };
  alergeny: { alergeny: string[]; text: string };
  terapeut: { text: string; badges: string[] };
}) {
  function Title() {
    return (
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <Heading className="max-w-3xl">{title}</Heading>
        <div className="right-5 top-5 flex gap-x-3">
          {icons.map((icon, index) => (
            <div
              key={"kfii" + index}
              className={`flex w-min flex-col items-center text-center`}
            >
              <ButtonIcon onClick={icon.onClick} icon={icon.name}></ButtonIcon>
              <span className="text-sm font-bold">{icon.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function Hmotnost() {
    return (
      <div className="flex flex-row justify-between rounded-3xl border-2 border-primary-300/60 bg-white p-5">
        <span className="my-auto font-bold">Hmotnost</span>
        <div className="flex flex-row gap-x-3">
          <div className="flex flex-col items-center">
            <span className="font-bold">Porce</span>
            <span>{hmotnost.porce}g</span>
          </div>
          <div className="flex flex-col items-center border-x-2 border-primary-300/60 px-3">
            <span className="font-bold">Masa</span>
            <span>{hmotnost.masa}g</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Omáčky</span>
            <span>{hmotnost.omacky}g</span>
          </div>
        </div>
      </div>
    );
  }
  function Kalkulacka() {
    const [porci, setPorci] = useState(kalkulacka.porci);
    const [koeficient, setKoeficient] = useState(kalkulacka.koeficient);

    return (
      <div className="flex w-full min-w-fit flex-col justify-between gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-5 md:w-min">
        <Heading>Kalkulačka surovin</Heading>
        <div className="flex flex-row gap-x-5 border-b-2 border-primary-300/60 py-3">
          <div className="flex gap-x-1.5">
            <label
              htmlFor="pocet"
              className="whitespace-nowrap text-sm font-bold md:text-base"
            >
              Počet porcí
            </label>
            <input
              id="pocet"
              defaultValue={porci}
              type="number"
              min="1"
              max="999"
              pattern="\d*"
              onChange={(e) => {
                const value =
                  e.target.value === "" ? 0 : parseInt(e.target.value);
                if (value === porci) return;
                setPorci(value);
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  e.target.value = kalkulacka.porci.toString();
                  setPorci(kalkulacka.porci);
                }
              }}
              className="w-16 rounded-xl border-2 border-primary-300/60 text-center"
            ></input>
          </div>
          <div className="flex gap-x-1.5">
            <div className="flex flex-col">
              <label
                htmlFor="koeficient"
                className="text-sm font-bold md:text-base"
              >
                Koeficient
              </label>
              <button className="text-sm underline">Zjistit více</button>
            </div>
            <input
              id="koeficient"
              defaultValue={koeficient}
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              onChange={(e) => {
                if (e.target.value === koeficient) return;
                const parsedValue = parseInt(e.target.value);
                if (Number.isNaN(parsedValue)) {
                  setKoeficient("0");
                } else {
                  setKoeficient(e.target.value);
                }
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  e.target.value = kalkulacka.koeficient;
                  setKoeficient(kalkulacka.koeficient);
                }
              }}
              className="w-16 rounded-xl border-2 border-primary-300/60 text-center"
            ></input>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td className="pb-5 font-bold">Váha (g)</td>
              <td className="pb-5 font-bold">Suroviny</td>
            </tr>
          </thead>
          <tbody>
            {kalkulacka.data.map((row, index) => {
              let calcResult: string = (
                parseFloat(row.vaha) *
                porci *
                parseFloat(koeficient)
              ).toString();
              calcResult = calcResult.includes(".")
                ? calcResult.substring(0, calcResult.indexOf(".") + 3)
                : calcResult;
              return (
                <tr
                  key={"kfdr" + index}
                  className="border-t border-primary-300/60"
                >
                  <td className="py-3 font-bold">{calcResult}</td>
                  <td className="py-3">{row.surovina}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  function Postup() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-3">
        <Heading>Postup</Heading>
        <p>{postup}</p>
      </div>
    );
  }
  function Alergeny() {
    return (
      <div className="flex flex-col gap-y-5 rounded-3xl border-2 border-primary-300/60 bg-white p-3">
        <Heading>Alergeny</Heading>
        <div className="flex flex-row gap-x-3">
          {alergeny.alergeny.map((alergen, index) => (
            <span
              key={"aaai" + index}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/60 font-bold text-black"
            >
              {alergen}
            </span>
          ))}
        </div>
        <p>{alergeny.text}</p>
      </div>
    );
  }
  function Skladba() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-3">
        <Heading>Doporučení ke skladbě</Heading>
        <p>
          <span className="font-bold text-black">Doporučená polévka: </span>dle
          použité přílohy - s bramborem, s obilovinou
        </p>
        <p>
          <span className="font-bold text-black">Doporučená příloha: </span>
          vařené brambory, bulgur
        </p>
        <p>
          <span className="font-bold text-black">Doporučený doplněk: </span>
          zeleninový salát
        </p>
      </div>
    );
  }
  function Terapeut() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-3">
        <Heading>Nutriční terapeut</Heading>
        <p>{terapeut.text}</p>
        <div className="flex flex-row gap-1.5">
          {terapeut.badges.map((badge, index) => (
            <Badge key={"tbb" + index}>{badge}</Badge>
          ))}
        </div>
      </div>
    );
  }
  return (
    <Container className="flex flex-col gap-5">
      <Title />
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col gap-5">
          <Hmotnost />
          <Kalkulacka />
        </div>
        <div className="flex flex-col gap-5">
          <Postup />
          <div className="flex flex-col gap-5 md:flex-row">
            <Alergeny />
            <Skladba />
          </div>
          <Terapeut />
        </div>
      </div>
    </Container>
  );
}

function Partner({ jmeno, heslo }: { jmeno: string; heslo: string }) {
  return (
    <Container>
      <div className="relative flex aspect-[9/10] max-h-[450px] w-full rounded-3xl border-2 border-secondary-700 bg-white bg-gradient-to-b from-secondary-700 from-40% via-secondary/50 via-70% to-transparent px-3 py-5 md:aspect-[3/1] md:max-h-full md:items-center md:bg-gradient-to-r md:p-10">
        <div className="flex flex-col gap-y-5">
          <span className="flex w-min items-center rounded-sm bg-white px-2 font-bold text-black">
            Logo
          </span>
          <Heading className="text-white">{jmeno}</Heading>
          <p className="font-semibold text-white">{heslo}</p>
          <Button className="w-min">Více o nás</Button>
        </div>
        <span className="absolute right-5 top-5 text-xs text-secondary-900">
          Inspirační foto
        </span>
      </div>
    </Container>
  );
}
