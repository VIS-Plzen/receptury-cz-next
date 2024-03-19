"use client";
import Badge from "@/components/ui/Badge";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
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
  // {
  //   name: "downloading",
  //   label: ".PDF",
  //   onClick: () => console.log(".PDF"),
  // },
  // {
  //   name: "downloading",
  //   label: ".XLS",
  //   onClick: () => console.log(".XLS"),
  // },
];

export function Kalkulacka({
  kalkulacka,
}: {
  kalkulacka: {
    porci: number;
    koeficient: string;
    data: { vaha: string; surovina: string }[];
  };
}) {
  const [porci, setPorci] = useState(kalkulacka.porci);
  const [koeficient, setKoeficient] = useState(kalkulacka.koeficient);

  return (
    <div className="flex w-full min-w-fit flex-col justify-between gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-5 md:w-min">
      <Heading size="sm">Kalkulačka surovin</Heading>
      <div className="flex flex-col gap-5 border-b-2 border-primary-300/60 py-3 sm:flex-row">
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
          <div className="flex flex-col items-start justify-start">
            <label
              htmlFor="koeficient"
              className="text-sm font-bold md:text-base"
            >
              Koeficient
            </label>
            <a
              href="#"
              target="_blank"
              rel="noopenner noreferrer"
              className="text-sm underline"
            >
              Zjistit více
            </a>
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

export function Galerie({ images }: { images: string[] }) {
  return (
    <Container>
      <Heading className="pb-4">Galerie</Heading>
      <li className="flex flex-wrap justify-between gap-4">
        <Image
          src={images[0]}
          alt=""
          width={650}
          height={300}
          className="rounded-2xl"
        />
        <Image
          src={images[1]}
          alt=""
          width={650}
          height={300}
          className="rounded-2xl"
        />
        {images.slice(2, images.length).map((image, index) => (
          <ul key={index} className="">
            <Image
              src={image}
              width={400}
              height={300}
              alt=""
              className="aspect-video rounded-2xl bg-gray-300 object-cover"
            />
          </ul>
        ))}
      </li>
    </Container>
  );
}

export function Hero({
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
      <div className="relative flex flex-col overflow-hidden rounded-3xl border-2 border-primary-300/60 bg-white md:flex-row-reverse md:justify-between md:pr-0">
        <Image
          src="/images/food.jpeg"
          alt=""
          className="w-full bg-gray-300 object-cover md:w-1/3 lg:w-5/12 xl:w-7/12"
          height={300}
          width={500}
        />

        <div className="flex flex-col  gap-y-5 p-5 md:px-0">
          <div className="flex gap-x-2 md:mt-auto md:px-10">
            <span className="flex min-w-min items-center rounded-sm bg-primary-300/30 px-2 font-bold text-black">
              Logo
            </span>
            <span className="line-clamp-2">
              Tento recept pro vás připravila společnost {jmeno}
            </span>
          </div>
          <div className="flex flex-col gap-y-3 md:flex-col-reverse md:px-10">
            <Heading className="line-clamp-4 w-5/6" as="h1">
              {title}
            </Heading>
          </div>
          <div className="flex gap-x-1.5 md:px-10">
            {badges.map((badge, index) => (
              <Badge key={"bmbi" + index}>{badge}</Badge>
            ))}
          </div>
          <div className="min-w-20 absolute right-5 top-5 my-auto grid grid-cols-6 gap-x-3 md:static md:gap-x-2 md:px-10 ">
            {icons.map((icon, index) => (
              <div
                key={"kfhi" + index}
                className={`${
                  icon.name === "share" || icon.name === "favorite"
                    ? "flex"
                    : "hidden md:flex"
                }  flex w-min flex-col items-center gap-1 justify-self-center text-center`}
              >
                <ButtonIcon
                  onClick={icon.onClick}
                  icon={icon.name}
                  className="bg-white"
                />
                <span className="hidden text-sm md:block">{icon.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export function Informations({
  title,
  postup,
  kalkulacka,
  hmotnost,
  alergeny,
  terapeut,
  skladba,
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
  skladba: { polevka: string; priloha: string; doplnek: string };
}) {
  function Title() {
    return (
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <Heading className="max-w-3xl">{title}</Heading>
        <div className="right-5 top-5 grid max-w-xs grid-cols-4 gap-y-3 md:max-w-md md:gap-x-5">
          {icons.map((icon, index) => (
            <div
              key={"kfii" + index}
              className={`flex flex-col items-center gap-1 text-center`}
            >
              <ButtonIcon onClick={icon.onClick} icon={icon.name}></ButtonIcon>
              <span className="text-sm">{icon.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function Hmotnost() {
    return (
      <div className="flex flex-col justify-between gap-y-2 rounded-3xl border-2 border-primary-300/60 bg-white p-5 sm:flex-row">
        <span className="my-auto font-bold lg:text-lg">Hmotnost</span>
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

  function Postup() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Postup</Heading>
        <p>{postup}</p>
      </div>
    );
  }
  function Alergeny() {
    return (
      <div className="flex flex-col gap-y-5 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Alergeny</Heading>
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
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Doporučení ke skladbě</Heading>
        <p>
          <span className="font-bold text-black">Doporučená polévka: </span>
          {skladba.polevka}
        </p>
        <p>
          <span className="font-bold text-black">Doporučená příloha: </span>
          {skladba.priloha}
        </p>
        <p>
          <span className="font-bold text-black">Doporučený doplněk: </span>
          {skladba.doplnek}
        </p>
      </div>
    );
  }
  function Terapeut() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Nutriční terapeut</Heading>
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
    <Container className="flex flex-col gap-5 sm:gap-7">
      <Title />
      <div className="flex flex-col gap-5 sm:gap-7 md:flex-row">
        <div className="flex flex-col gap-5 sm:gap-7">
          <Hmotnost />
          <Kalkulacka kalkulacka={kalkulacka} />
        </div>
        <div className="flex flex-col gap-5 sm:gap-7">
          <Postup />
          <div className="grid gap-5 sm:gap-7 xl:grid-cols-2">
            <Alergeny />
            <Skladba />
          </div>
          <Terapeut />
        </div>
      </div>
    </Container>
  );
}
