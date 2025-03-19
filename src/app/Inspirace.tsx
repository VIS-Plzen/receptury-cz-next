"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/EmblaCarousel";
import Heading from "@/components/ui/Heading";
import RecipeCard from "@/components/ui/RecipeCard";
import Selector from "@/components/ui/Selector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useCard } from "@/context/FavoriteCards";
import { cn } from "@/utils/cn";
import { returnExpirationTime } from "@/utils/shorties";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Inspirace({
  className = "",
  initData,
  inspiraceVisible,
  token,
}: {
  className?: string;
  initData?: any;
  inspiraceVisible: string;
  token?: string;
}) {
  const { cards, setAllCards, cardsLength } = useCard();

  const [isVisible, setIsVisible] = useState<boolean>(
    inspiraceVisible !== "false"
  );

  const TabsData = [
    {
      value: "nove",
      title: "Nové receptury",
    },
    {
      value: "oblibene",
      title: "Oblíbené",
    },
  ];

  const [selected, setSelected] = useState(
    inspiraceVisible !== "false" ? inspiraceVisible : TabsData[0].value
  );

  const [data, setData] = useState<any>(initData);
  const [loading, setLoading] = useState<any>(data ? false : true);
  const cookies = new Cookies();

  function setLocalVisible(visible: boolean) {
    const toSet = visible ? selected : "false";
    cookies.set("inspiraceVisible", toSet, {
      expires: returnExpirationTime(24 * 30),
      path: "/",
    });
    setNewSelected(selected);
    setIsVisible(visible);
  }

  async function setNewSelected(newSelected: string) {
    if (newSelected !== selected) {
      cookies.set("inspiraceVisible", newSelected, {
        expires: returnExpirationTime(24 * 30),
        path: "/",
      });
    }
    if (data[newSelected] !== "hidden") return setSelected(newSelected);

    setLoading(true);
    const result = await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          Sid: token ? token : "12345VIS",
          Funkce: "Receptury",
          Parametry: {
            Tabulka: "Receptury",
            Operace: "Read",
            Limit: 10,
            OrderBy: newSelected === "nove" ? "DatumAktualizace" : undefined,
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
            Stitek: newSelected === "oblibene" ? "Oblíbené" : undefined,
          },
        }),
      })
    ).json();
    if (result.Status) {
      if (newSelected === "oblibene") {
        setAllCards(result.Vety);
      }
      setData((prevData: any) => ({
        ...prevData,
        [newSelected]: result.Vety,
      }));
    } else {
      setData((prevData: any) => ({
        ...prevData,
        [newSelected]: result,
      }));
    }
    setLoading(false);
    setSelected(newSelected);
  }

  function HideButton({ className = "" }: { className?: string }) {
    return (
      <div
        className={`items-center gap-x-2 whitespace-nowrap font-semibold ${className}`}
      >
        {!isVisible ? "Zobrazit " : "Skrýt "}
        <span className="hidden md:inline-block">inspirace</span>
        <ButtonIcon
          icon={!isVisible ? "visibility" : "visibility-off"}
          onClick={() => setLocalVisible(!isVisible)}
          aria-label={!isVisible ? "Zobrazit inspirace" : "Skrýt inspirace"}
        />
      </div>
    );
  }

  useEffect(() => {
    if (
      !initData ||
      (initData.oblibene === "hidden" && initData.oblibene?.length === 0)
    )
      return;
    setAllCards(initData.oblibene);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      oblibene: cards,
    }));
  }, [cardsLength, cards]);

  return (
    <div className={cn(className)}>
      <Container>
        <div className="flex flex-row items-center justify-between">
          <Heading as="h1" size="lg">
            Inspirace na vaření
          </Heading>
          <HideButton className="ml-auto flex" />
        </div>
        <div className={`${!isVisible && "hidden"}`}>
          <div className="flex w-full items-center justify-between pt-5 md:pt-10">
            <Tabs
              value={selected}
              className="w-full"
              onValueChange={setNewSelected}
            >
              <div className="hidden w-full flex-row justify-between md:flex">
                <TabsList className="w-full items-center justify-evenly md:max-w-[550px]">
                  {TabsData.map((tab, index) => (
                    <TabsTrigger
                      value={tab.value}
                      className="w-full"
                      key={tab.value}
                      id={"TabsTriggerIndex" + index}
                      aria-controls={"TabsTriggerIndex" + index}
                    >
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
          <Selector
            data={TabsData}
            selected={selected}
            setSelected={setNewSelected}
            className="block md:hidden"
          />
          {data?.[selected] &&
          data[selected]?.length !== 0 &&
          data[selected].Status !== false ? (
            <Carousel
              options={{ align: "start", loop: true }}
              hasArrows
              slides={
                data?.[selected] === "hidden"
                  ? Array.from({ length: 6 }, (_, index) => (
                      <RecipeCard key={index} isLoading={true} forceGrid />
                    ))
                  : data?.[selected]?.map((card: any, index: number) => (
                      <RecipeCard
                        key={index}
                        isLoading={loading}
                        id={card.Vlastnosti.Identita}
                        label={card.Vlastnosti.Nazev}
                        badges={[
                          card.Vlastnosti.Dieta1 === "Ano" && "Bezlepková",
                          card.Vlastnosti.Dieta2 === "Ano" && "Bezmléčná",
                          card.Vlastnosti.Dieta3 === "Ano" && "Šetřící",
                          card.Vlastnosti.TepelnaUprava,
                          card.Vlastnosti.DruhSkupina,
                          card.Vlastnosti.DruhPodskupina,
                        ]}
                        forceGrid
                      />
                    ))
              }
            />
          ) : (
            <div className="flex h-[400px] items-center px-10">
              <p>
                {selected === "nove"
                  ? "Receptury se nepodařilo najít."
                  : "Žádné receptury k zobrazení."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
