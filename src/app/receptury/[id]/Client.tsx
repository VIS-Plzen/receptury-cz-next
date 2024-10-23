"use client";
import MealSymbol from "@/components/symbols/MealSymbol";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { toast } from "@/hooks/useToast";
import Image from "next/image";
import { useEffect, useState } from "react";

const icons: {
  name:
    | "archive"
    | "calendar-view-months"
    | "downloading"
    | "favorite-fill"
    | "favorite"
    | "list"
    | "print"
    | "share";
  label: string;
}[] = [
  {
    name: "favorite",
    label: "oblíbené",
  },
  {
    name: "print",
    label: "tisk",
  },
  {
    name: "archive",
    label: "MSklad",
  },
  {
    name: "share",
    label: "Sdílet",
  },
];

export function Page({
  card,
  curr,
  logged,
  paid,
  token,
  path,
  shared,
}: {
  card: any;
  curr: any;
  logged: string | undefined;
  paid: boolean;
  token: string | undefined;
  path?: string;
  shared?: number | false;
}) {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // přepíše text v liště na počet kolikrát jde ještě sdílená zobrazit
    if (!shared) return;
    setTimeout(() => {
      const el = document.getElementById("slt1");
      if (!el) return;
      el.textContent = el.innerText.replace("%", shared.toString());
    }, 200);
  }, [shared]);

  async function zmenStitek(
    veta: number,
    stitek: "Oblíbené" | "MSklad",
    hodnota: boolean
  ) {
    if (!logged || !paid) {
      return toast({
        intent: "warning",
        title: `Pro použití této funkce je potřeba ${
          logged
            ? "mít aktivní předplacené členství."
            : "být přihlášen a mít předplacené členství."
        }`,
      });
    }
    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: logged,
          Funkce: "Stitek",
          Parametry: {
            Tabulka: "Receptury",
            Operace: hodnota ? "Pridat" : "Smazat",
            Stitek: stitek,
            Vety: [veta],
          },
        }),
      })
    ).json();
    if (hodnota) curr.Stitky.push(stitek);
    else {
      var index = curr.Stitky.indexOf(stitek);
      if (index !== -1) {
        curr.Stitky.splice(index, 1);
      }
    }
    setRefresh(!refresh);
  }
  const partnerInfo: any = [
    {
      logo: null,
      jmeno: "Bidfood",
      name: "bidfood",
      heslo: "Heslo partnera, něco o bidfood a jídle",
    },
    {
      logo: null,
      jmeno: "Bonduelle",
      name: "bonduelle",
      heslo: "Něco jako heslo nebo popis, tady pro Bonduelle",
    },
  ];

  async function getShareLink() {
    if (!logged || !paid) {
      return toast({
        intent: "warning",
        title: `Pro použití této funkce je potřeba ${
          logged
            ? "mít předplacené členství."
            : "být přihlášen a mít předplacené členství."
        }`,
      });
    }
    const res = await (
      await fetch("/api/shareRecipe", {
        method: "POST",
        body: JSON.stringify({
          sid: token ?? "12345VIS",
          cislo: curr.Vlastnosti.Identita,
        }),
      })
    ).json();
    if (res.Status) {
      navigator.clipboard.writeText(`${path}/receptury/sdilena?${res.Kod}`);
      toast({
        intent: "success",
        title: "Odkaz uložen do clipboardu, nyní stačí vložit.",
      });
    } else {
      toast({
        intent: "error",
        title: "Nepodařilo se vytvořit odkaz.",
      });
    }
  }

  const currParner =
    card.Receptar === "1"
      ? partnerInfo[0]
      : card.Receptar === "2"
        ? partnerInfo[1]
        : "";
  return (
    <div className="flex flex-col items-stretch justify-start gap-12 py-32 print:py-5 md:py-48">
      <Hero
        title={card.Nazev}
        jmeno={card.Autor}
        badges={[
          card.Dieta1 === "Ano" && "Bezlepková",
          card.Dieta2 === "Ano" && "Bezmléčná",
          card.Dieta3 === "Ano" && "Šetřící",
          card.TepelnaUprava,
          card.DruhSkupina,
          card.DruhPodskupina,
        ]}
        image={card.Obrazek}
        veta={card.Identita}
        stitky={logged ? curr.Stitky : []}
        zmenStitek={zmenStitek}
        currParner={currParner}
        logged={logged}
        paid={paid}
        getShareLink={getShareLink}
        refresh={refresh}
      />
      {shared !== false || (logged && paid) ? (
        <>
          <Informations
            title={card.Nazev}
            hmotnost={{
              porce: card.HmotnostPorceDospeli,
              masa: card.HmotnostMasaDospeli,
              omacky: card.HmotnostOmackyDospeli,
            }}
            kalkulacka={{
              porci: parseInt(card.PocetPorci),
              koeficient: "1",
              porciBackend: parseInt(card.PocetPorci),
              data: curr.Suroviny,
            }}
            postup={card.TechnologickyPostup}
            alergeny={{
              alergeny: curr.Alergeny,
              text: "Alergeny uvedené u receptu se mohou lišit v závislosti na použitých surovinách. Čísla alergenů jsou uvedena podle přílohy II nařízení EU 1169/2011.",
            }}
            terapeut={{
              text:
                card.VyjadreniNT === "" ? "Není vyplněno" : card.VyjadreniNT,
              badges: [
                card.Dieta1 === "Ano" && "Bezlepková",
                card.Dieta2 === "Ano" && "Bezmléčná",
                card.Dieta3 === "Ano" && "Šetřící",
              ],
            }}
            skladba={{
              polevka: card.DoporucenaPolevka,
              priloha: card.DoporucenaPriloha,
              doplnek: card.DoporucenyDoplnek,
            }}
            veta={card.Identita}
            stitky={curr.Stitky}
            zmenStitek={zmenStitek}
            refresh={refresh}
          />

          {/* <Galerie images={[card.Obrazek1, card.Obrazek2, card.Obrazek3]} /> */}

          {/* <VolitelnyObsah
        className="bg-white"
        title="Volitelný obsah partnera k danému receptu"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
        img="/images/food.jpeg"
      /> */}
          {currParner && (
            <Partner
              jmeno={currParner.jmeno}
              heslo={currParner.heslo}
              img="/images/food.jpeg"
              color={currParner.name}
              hasButton
            />
          )}
        </>
      ) : (
        <Container className="mt-10 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold">
            Pro zobrazení více informací o receptuře je potřeba
            {logged
              ? " mít aktivní předplacené členství."
              : " být přihlášen a mít předplacené členství."}
          </p>
          {!logged && (
            <ul className="mt-10 flex gap-x-4">
              <li>
                <Button asChild className="my-auto w-min">
                  <a href="/prihlaseni">Přihlásit se</a>
                </Button>
              </li>
              <li>
                <Button
                  asChild
                  className="my-auto w-min"
                  variant="primary-outline"
                >
                  <a href="/registrace">Registrovat</a>
                </Button>
              </li>
            </ul>
          )}
        </Container>
      )}
    </div>
  );
}

export function Kalkulacka({
  kalkulacka,
}: {
  kalkulacka: {
    porci: number;
    koeficient: string;
    porciBackend: number;
    data: {
      MnozstviHrubeDospeli: string;
      NazevSuroviny: string;
      MernaJednotka: string;
    }[];
  };
}) {
  const [porci, setPorci] = useState(kalkulacka.porci);
  const [koeficient, setKoeficient] = useState(kalkulacka.koeficient);

  return (
    <div className="flex w-full min-w-fit flex-col justify-between gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-5 print:gap-y-0.5 md:w-min">
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
            <td className="pb-3 font-bold print:py-0.5">Váha</td>
            <td className="pb-3 font-bold print:py-0.5">Suroviny</td>
          </tr>
        </thead>
        <tbody>
          {kalkulacka.data.map((row, index) => {
            let mnoz =
              parseFloat(row.MnozstviHrubeDospeli.replace(",", ".")) /
              kalkulacka.porciBackend;
            let calcResult: string = (
              mnoz *
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
                <td className="py-3 font-bold print:py-0.5">
                  {calcResult} {row.MernaJednotka}
                </td>
                <td className="py-3 print:py-0.5">{row.NazevSuroviny}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Galerie({ images }: { images: string[] }) {
  const picsCount = images.length / 3;

  return (
    <Container>
      <Heading className="pb-4">Galerie</Heading>
      <div className="grids-cols-3 grid">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <li className="flex flex-wrap justify-between gap-6">
        <Image
          src={images[0]}
          alt=""
          width={670}
          height={300}
          className="rounded-2xl"
        />
        <Image
          src={images[1]}
          alt=""
          width={670}
          height={300}
          className="rounded-2xl"
        />
        {images.slice(2, images.length).map((image, index) => (
          <ul key={index} className="">
            <Image
              src={image}
              width={435}
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
  image,
  veta,
  stitky,
  zmenStitek,
  getShareLink,
  currParner,
  logged,
  paid,
  refresh,
}: {
  logo?: string;
  title: string;
  jmeno: string;
  badges: string[];
  image?: string;
  veta: number;
  stitky: string[];
  zmenStitek: (
    veta: number,
    stitek: "Oblíbené" | "MSklad",
    hodnota: boolean,
    changeHodnota?: () => void
  ) => void;
  getShareLink: () => void;
  currParner: any;
  logged: string | undefined;
  paid: boolean;
  refresh: boolean;
}) {
  const [isValidImage, setIsValidImage] = useState(false);
  const [, setRefreshIn] = useState(refresh);
  let badgeCounter = 0;

  useEffect(() => {
    setRefreshIn(refresh);
  }, [setRefreshIn, refresh]);

  useEffect(() => {
    if (!image) return;
    const checkImage = async () => {
      try {
        const response = await fetch(image);
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image")) {
          setIsValidImage(false);
        }
      } catch (error) {
        setIsValidImage(false);
        console.error("Error checking image:", error);
      }
    };

    checkImage();
  }, [image]);

  return (
    <Container className="print:hidden">
      <div className="relative grid grid-rows-2 overflow-hidden rounded-3xl border-2 border-primary-300/60 bg-white md:grid-cols-2 md:grid-rows-1 md:flex-row-reverse md:justify-between md:pr-0">
        <div className="relative flex items-center justify-center bg-primary-300/30 md:order-2">
          {isValidImage && image ? (
            <Image
              src={image}
              alt=""
              className="w-full bg-gray-300 object-cover"
              fill
            />
          ) : (
            <MealSymbol size={48} className="scale-150" />
          )}
        </div>
        <div className="flex flex-col  gap-y-6 p-5 md:px-0 md:py-14">
          <div
            className={`flex gap-x-2 md:mt-auto md:px-10 ${
              !currParner && "opacity-0"
            }`}
          >
            {currParner.logo ? (
              <Image
                src={currParner.logo}
                className="bg-transparent object-cover mix-blend-screen"
                alt=""
                height={50}
                width={100}
              />
            ) : (
              <span className="flex min-w-min items-center rounded-sm bg-primary-300/30 px-2 font-bold text-black">
                {currParner.jmeno}
              </span>
            )}
            <span className="line-clamp-2">
              Tuto recepturu pro vás připravila společnost {currParner.jmeno}
            </span>
          </div>
          <div className="flex flex-col gap-y-3 md:flex-col-reverse md:px-10">
            <Heading className="line-clamp-4 w-5/6" as="h1">
              {title}
            </Heading>
          </div>
          <div className="flex gap-x-1.5 md:px-10">
            {badges.map((badge, index) => {
              if (!badge || badgeCounter >= 4) return null;
              badgeCounter++;
              return (
                <Badge
                  key={"bmbi" + index}
                  variant={index <= 2 ? "healthy" : undefined}
                >
                  {badge}
                </Badge>
              );
            })}
          </div>
          <div className="min-w-20 absolute right-5 top-5 my-auto hidden grid-cols-6 gap-x-3 md:static md:mt-20 md:grid md:gap-x-2 md:px-10">
            {icons.map((icon, index) => (
              <div
                key={"kfhi" + index}
                className={`${
                  icon.name === "favorite" ? "flex" : "hidden md:flex"
                } flex w-min flex-col items-center gap-1 justify-self-center text-center`}
              >
                <ButtonIcon
                  onClick={() => {
                    switch (icon.name) {
                      case "archive":
                        return zmenStitek(
                          veta,
                          "MSklad",
                          !stitky.includes("MSklad")
                        );
                      case "favorite":
                        return zmenStitek(
                          veta,
                          "Oblíbené",
                          !stitky.includes("Oblíbené")
                        );
                      case "print":
                        if (!logged || !paid) {
                          return toast({
                            intent: "warning",
                            title: `Pro použití této funkce je potřeba ${
                              logged
                                ? "mít předplacené členství."
                                : "být přihlášen a mít předplacené členství."
                            }`,
                          });
                        }
                        return window.print();
                      case "share":
                        return getShareLink();
                    }
                  }}
                  icon={(() => {
                    let iconName:
                      | "archive"
                      | "calendar-view-months"
                      | "downloading"
                      | "favorite-fill"
                      | "favorite"
                      | "list"
                      | "print"
                      | "visibility"
                      | "archive-fill"
                      | "rate-review"
                      | "share"
                      | "visibility-off"
                      | undefined = icon.name;
                    switch (icon.name) {
                      case "archive":
                        if (stitky.includes("MSklad"))
                          iconName = "archive-fill";
                        break;

                      case "favorite":
                        if (stitky.includes("Oblíbené"))
                          iconName = "favorite-fill";
                        break;
                    }
                    return iconName;
                  })()}
                  className={`bg-white ${
                    icon.name === "archive" &&
                    stitky.includes("MSklad") &&
                    " text-primary-500"
                  }
                  ${
                    icon.name === "favorite" &&
                    stitky.includes("Oblíbené") &&
                    "text-primary-500"
                  }`}
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
  veta,
  stitky,
  zmenStitek,
  refresh,
}: {
  title: string;
  postup: string;
  kalkulacka: {
    porci: number;
    koeficient: string;
    porciBackend: number;
    data: {
      MnozstviHrubeDospeli: string;
      NazevSuroviny: string;
      MernaJednotka: string;
    }[];
  };
  hmotnost: { porce: string; masa: string; omacky: string };
  alergeny: { alergeny: string[]; text: string };
  terapeut: { text: string; badges: any };
  skladba: { polevka: string; priloha: string; doplnek: string };
  veta: number;
  stitky: string[];
  zmenStitek: (
    veta: number,
    stitek: "Oblíbené" | "MSklad",
    hodnota: boolean,
    changeHodnota?: () => void
  ) => void;
  refresh: boolean;
}) {
  const [, setRefreshIn] = useState(refresh);

  useEffect(() => {
    setRefreshIn(refresh);
  }, [refresh]);

  return (
    <Container className="flex flex-col gap-5 sm:gap-7">
      <Title
        stitky={stitky}
        title={title}
        veta={veta}
        zmenStitek={zmenStitek}
      />
      <div className="flex flex-col gap-5 print:flex-row sm:gap-7 md:flex-row">
        <div className="flex flex-col gap-5 sm:gap-7">
          <Hmotnost hmotnost={hmotnost} />
          <Kalkulacka kalkulacka={kalkulacka} />
        </div>
        <div className="flex flex-col gap-5 sm:gap-7">
          <Postup postup={postup} />
          <div className="grid gap-5 sm:gap-7 xl:grid-cols-2">
            <Alergeny alergeny={alergeny} />
            <Skladba skladba={skladba} />
          </div>
          <Terapeut terapeut={terapeut} />
        </div>
      </div>
    </Container>
  );
}

function Title({
  title,
  zmenStitek,
  veta,
  stitky,
}: {
  title: string;
  zmenStitek: (
    veta: number,
    stitek: "Oblíbené" | "MSklad",
    hodnota: boolean
  ) => void;
  veta: number;
  stitky: string[];
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-between">
      <Heading className="max-w-3xl print:!text-3xl">{title}</Heading>
      <div className="right-5 top-5 grid max-w-xs grid-cols-4 gap-y-3 print:hidden md:max-w-md md:gap-x-5">
        {icons.map((icon, index) => (
          <div
            key={"kfii" + index}
            className={`flex flex-col items-center gap-1 text-center`}
          >
            <ButtonIcon
              onClick={() => {
                switch (icon.name) {
                  case "archive":
                    return zmenStitek(
                      veta,
                      "MSklad",
                      !stitky.includes("MSklad")
                    );
                  case "favorite":
                    return zmenStitek(
                      veta,
                      "Oblíbené",
                      !stitky.includes("Oblíbené")
                    );
                  case "print":
                    return window.print();
                }
              }}
              icon={(() => {
                let iconName:
                  | "archive"
                  | "calendar-view-months"
                  | "downloading"
                  | "favorite-fill"
                  | "favorite"
                  | "list"
                  | "print"
                  | "visibility"
                  | "archive-fill"
                  | "rate-review"
                  | "share"
                  | "visibility-off"
                  | undefined = icon.name;
                switch (icon.name) {
                  case "archive":
                    if (stitky.includes("MSklad")) iconName = "archive-fill";
                    break;

                  case "favorite":
                    if (stitky.includes("Oblíbené")) iconName = "favorite-fill";
                    break;
                }
                return iconName;
              })()}
              className={`bg-white ${
                icon.name === "archive" &&
                stitky.includes("MSklad") &&
                " text-primary-500"
              }
              ${
                icon.name === "favorite" &&
                stitky.includes("Oblíbené") &&
                "text-primary-500"
              }`}
            ></ButtonIcon>
            <span className="text-sm">{icon.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function Hmotnost({ hmotnost }: { hmotnost: any }) {
  return (
    <div className="flex flex-col justify-between gap-y-2 rounded-3xl border-2 border-primary-300/60 bg-white p-5 sm:flex-row">
      <span className="my-auto font-bold lg:text-lg">Hmotnost</span>
      <div className="flex flex-row divide-x-2 divide-primary-300/60">
        <div className="flex flex-col items-center px-2">
          <span className="font-bold">Porce</span>
          <span>{hmotnost.porce}g</span>
        </div>
        {hmotnost.masa !== "0" && (
          <div className="flex flex-col items-center px-2">
            <span className="font-bold">Masa</span>
            <span>{hmotnost.masa}g</span>
          </div>
        )}
        {hmotnost.omacky !== "0" && (
          <div className="flex flex-col items-center pl-2">
            <span className="font-bold">Omáčky</span>
            <span>{hmotnost.omacky}g</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Postup({ postup }: { postup?: string }) {
  return (
    <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
      <Heading size="sm">Postup</Heading>
      <p>
        {postup && postup.replace("&lt;p&gt;", "").replace("&lt;/p&gt;", "")}
      </p>
    </div>
  );
}
function Alergeny({
  alergeny,
}: {
  alergeny: { text: string; alergeny: string[] };
}) {
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
function Skladba({ skladba }: { skladba: any }) {
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
function Terapeut({
  terapeut,
}: {
  terapeut: { text: string; badges: string[] };
}) {
  let badgeCounter = 0;
  return (
    <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4 print:hidden">
      <Heading size="sm">Nutriční terapeut</Heading>
      <p>{terapeut.text}</p>
      <div className="flex flex-row gap-1.5">
        {terapeut.badges.map((badge: any, index: number) => {
          if (!badge || badgeCounter >= 4) return null;
          badgeCounter++;
          return (
            <Badge
              key={"bmbi" + index}
              variant={index <= 2 ? "healthy" : undefined}
            >
              {badge}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

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
    <Container className="print:hidden">
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
              {jmeno}
            </span>
          )}
          <Heading className="text-white md:text-2xl lg:text-4xl">
            {jmeno}
          </Heading>
          <p className="font-semibold text-white">{heslo}</p>
          {hasButton && (
            <Button
              className={`w-min ${
                color === "bidfood"
                  ? "bg-bidfood-900 hover:bg-bidfood-950"
                  : color === "bonduelle"
                    ? "bg-bonduelle-900 hover:bg-bonduelle-950"
                    : ""
              }`}
            >
              Více o nás
            </Button>
          )}
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

export function LogMe({ msg }: { msg: any }) {
  console.log(msg);
  return null;
}
