"use client";

import Badge from "@/components/ui/Badge";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { useState } from "react";

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
      <Hero />
      <Informations />
    </div>
  );
}

function Hero() {
  return (
    <Container className="relative flex flex-col gap-y-3 rounded-3xl border-2 border-primary-600/30 bg-white px-0 pb-4 md:flex-row-reverse md:justify-between md:gap-x-7 md:pb-0 md:pr-0 lg:pr-0">
      <div className="mx-auto flex h-[300px] w-full rounded-2xl bg-secondary-700 md:mx-0 md:my-auto md:mb-auto md:h-[350px] md:max-w-[650px] lg:h-[400px] lg:max-w-[750px]"></div>
      <div className="flex flex-col gap-y-5 p-3 md:max-w-[450px] md:px-0 md:pt-8">
        <div className="flex flex-col gap-y-3 md:flex-col-reverse">
          <div className="flex gap-x-2">
            <span className="flex items-center rounded-md bg-primary-300/30 px-2 font-bold text-black">
              Logo
            </span>
            <span>
              Tento recept pro vás připravila společnost Jméno partnera
            </span>
          </div>
          <Heading as="h1">
            Sumeček v parmazánovém těstíčku s bramborovou kaší
          </Heading>
        </div>
        <div className="flex gap-x-1.5">
          <Badge>Ryby a mořské plody</Badge>
          <Badge>Bezmléčná dieta</Badge>
        </div>
        <div className="absolute right-5 top-5 flex gap-x-3 md:static md:mt-20">
          {icons.map((icon) => (
            <div
              className={`${
                icon.name === "share" || icon.name === "favorite"
                  ? "flex"
                  : "hidden md:flex"
              } w-min flex-col items-center text-center`}
            >
              <ButtonIcon onClick={icon.onClick} icon={icon.name}></ButtonIcon>
              <span className="hidden text-sm font-bold md:block">
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function Informations() {
  function Title() {
    return (
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <Heading className="max-w-3xl">
          Sumeček v parmazánovém těstíčku s bramborovou kaší
        </Heading>
        <div className="right-5 top-5 flex gap-x-3">
          {icons.map((icon) => (
            <div className={`flex w-min flex-col items-center text-center`}>
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
        <span className="font-bold">Hmotnost</span>
        <div className="flex flex-row gap-x-3">
          <div className="flex flex-col items-center">
            <span className="font-bold">Porce</span>
            <span>280g</span>
          </div>
          <div className="flex flex-col items-center border-x-2 border-primary-300/60 px-3">
            <span className="font-bold">Masa</span>
            <span>280g</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Omáčky</span>
            <span>280g</span>
          </div>
        </div>
      </div>
    );
  }
  function Kalkulacka() {
    const [koeficient, setKoeficient] = useState(1);
    const [porci, setPorci] = useState(50);

    const data = [
      { vaha: 24, surovina: "Filet ze sumečka" },
      { vaha: 1.5, surovina: "Podravka přísada do jídel Natura" },
      { vaha: 0.3, surovina: "Citrón (ks)" },
    ];
    return (
      <div className="flex w-min min-w-fit flex-col justify-between gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-5">
        <Heading>Kalkulačka surovin</Heading>
        <div className="flex flex-row gap-x-5 border-b-2 border-primary-300/60 py-3">
          <div className="flex gap-x-1.5">
            <label htmlFor="pocet" className="text-sm font-bold md:text-base">
              Počet porcí
            </label>
            <input
              id="pocet"
              defaultValue={porci}
              onChange={(e) => {
                const value =
                  e.target.value === "" ? 0 : parseInt(e.target.value);
                if (value === porci) return;
                setPorci(value);
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  e.target.value = "0";
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
              onChange={(e) => {
                const value =
                  e.target.value === "" ? 0 : parseFloat(e.target.value);
                if (value === koeficient) return;
                setKoeficient(value);
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  e.target.value = "0";
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
            {data.map((row, index) => {
              let calcResult: string = (
                row.vaha *
                porci *
                koeficient
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
        <p>
          Čerstvou rybu nakrájíme na porce. Mrkev a celer očistíme a nakrájíme
          na kostičky. Očištěný pórek nakrájíme na kolečka. Pekáč vymažeme
          olejem a poklademe částí pórku, vložíme ryby, ochutíme solí, posypeme
          špetkou koriandru a oregana, mrkví, celerem a zbylým pórkem. Pečeme v
          konvektomatu 20 minut na 160 °C.
        </p>
      </div>
    );
  }
  function Alergeny() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-3">
        <Heading>Alergeny</Heading>
        <div className="flex flex-row gap-x-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/60 font-bold text-black">
            1
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/60 font-bold text-black">
            3
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/60 font-bold text-black">
            7
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/60 font-bold text-black">
            13
          </span>
        </div>
        <p>
          Alergeny uvedené u receptu se mohou lišit v závislosti na použitých
          surovinách. Čísla alergenů jsou uvedena podle přílohy II nařízení EU
          1169/2011.
        </p>
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
        <p>
          Rybích pokrmů není nikdy málo, tento navíc využívá velmi kvalitní rybí
          maso, které se na trhu prodává bez kostí a kůže. Lehkce stravitelné a
          šťavnaté rybí maso je doplněné zeleninou, zajímavou chuť pokrmu navíc
          přidá mletý koriandr v kombinaci s oreganem (dobromyslí).
        </p>
        <div className="flex flex-row gap-1.5">
          <Badge>Ryby a mořské plody</Badge>
          <Badge>Smažené</Badge>
          <Badge>Bezlepkové</Badge>
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
