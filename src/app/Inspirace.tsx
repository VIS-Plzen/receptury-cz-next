"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCard from "@/components/ui/RecipeCard";
import Selector from "@/components/ui/Selector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/utils/cn";
import { useState } from "react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Cookies from "universal-cookie";

export default function Inspirace({
  className = "",
  initData,
  inspiraceVisible,
}: {
  className?: string;
  initData?: any;
  inspiraceVisible: boolean;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(inspiraceVisible);

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

  const [selected, setSelected] = useState(TabsData[0].value);

  const [data, setData] = useState<any>(initData[selected]);
  const [loading, setLoading] = useState<any>(data ? false : true);
  const cookies = new Cookies();

  function setLocalVisible(visible: boolean) {
    cookies.set("inspiraceVisible", visible.toString());
    setIsVisible(visible);
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

  function setNewSelected(newSelected: string) {
    setSelected(newSelected);
    setData(initData[newSelected]);
  }

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

          <Swiper
            spaceBetween={16}
            breakpoints={{
              370: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            modules={[Pagination]}
            pagination={{ clickable: false }}
            className=" [--swiper-pagination-color:theme(colors.primary.600)]"
          >
            {data && data.length > 0 ? (
              data.map((card: any, index: number) => (
                <SwiperSlide key={index} className="py-10">
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
                </SwiperSlide>
              ))
            ) : (
              <div className="flex h-[400px] items-center px-10">
                <p>Data se nepodařilo najít</p>
              </div>
            )}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
