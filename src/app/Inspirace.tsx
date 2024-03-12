"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCard from "@/components/ui/RecipeCard";
import Selector from "@/components/ui/Selector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Inspirace({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const defaultTab = useMemo(
    () => searchParams.get("tab") || "doporucene",
    [searchParams.get("tab")]
  );

  const TabsData = [
    {
      value: "doporucene",
      title: "Doporučené pro vás",
    },
    {
      value: "oblibene",
      title: "Oblíbené",
    },
    {
      value: "nove",
      title: "Nové recepty",
    },
  ];

  const [selected, setSelected] = useState(TabsData[0].value);

  // useEffect(() => {
  //   const newSearchParams = new URLSearchParams();
  //   newSearchParams.set("tab", selected);
  //   router.push(`${pathname}?${newSearchParams.toString()}`);
  // }, [selected, router]);

  // useEffect(() => {
  //   const tabParam = searchParams.get("tab");
  //   if (tabParam && tabParam !== selected.value) {
  //     const selectedTab = TabsData.find((tab) => tab.value === tabParam);
  //     if (selectedTab) {
  //       setSelected(selectedTab);
  //     }
  //   }
  // }, [searchParams]);

  useEffect(() => {
    if (!window) return;
    const localVisible =
      window.localStorage.getItem("inspiraceVisible") !== "false";
    setIsVisible(localVisible);
  });

  function setLocalVisible(visible: boolean) {
    if (!window) return;
    window.localStorage.setItem("inspiraceVisible", visible.toString());
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
              onValueChange={(value: string) => {
                const selectedTab = TabsData.find((tab) => tab.value === value);
                if (selectedTab) {
                  setSelected(selectedTab.value);
                }
              }}
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
            setSelected={setSelected}
            className="block md:hidden"
          />

          <Swiper
            spaceBetween={25}
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
              1536: {
                slidesPerView: 7,
              },
            }}
            modules={[Pagination]}
            pagination={{ clickable: false }}
            className=" [--swiper-pagination-color:theme(colors.primary.600)]"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <SwiperSlide key={index} className="py-10">
                <RecipeCard
                  key={index}
                  isLoading={false}
                  label={"Smažené kuřecí řízečky, bramborové placičky"}
                  badges={["Dieta", "Brambor"]}
                  forceGrid
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}
