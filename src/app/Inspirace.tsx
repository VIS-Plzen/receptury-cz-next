"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCard from "@/components/ui/RecipeCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Inspirace({ className = "" }: { className?: string }) {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const isLargeScreen = useMediaQuery("(min-width: 1280px)");
  const totalCards = isLargeScreen ? 10 : 8;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const defaultTab = useMemo(
    () => searchParams.get("tab") || "doporucene",
    [searchParams.get("tab")]
  );
  const [selected, setSelected] = useState<
    "doporucene" | "oblibene" | "nove" | string
  >(defaultTab);

  // useEffect(() => {
  //   const newSearchParams = new URLSearchParams();
  //   newSearchParams.set("tab", selected);
  //   router.push(`${pathname}?${newSearchParams.toString()}`);
  // }, [selected, router]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabParam !== selected) {
      setSelected(tabParam);
    }
  }, [searchParams]);

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
          <div className="flex w-full items-center justify-between pt-5 md:pt-20">
            <Tabs
              defaultValue={selected}
              className="w-full"
              onValueChange={(value: string) => setSelected(value)}
            >
              <div className="flex w-full flex-row justify-between">
                <TabsList className="flex w-full items-center justify-evenly md:max-w-[550px]">
                  <TabsTrigger value="doporucene" className="w-full">
                    Doporučené pro vás
                  </TabsTrigger>
                  <TabsTrigger value="oblibene" className="w-full">
                    Oblíbené
                  </TabsTrigger>
                  <TabsTrigger value="nove" className="w-full">
                    Nové recepty
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          {isDesktop ? (
            <div
              className={cn("grid gap-4 pt-6 lg:grid-cols-4 xl:grid-cols-5")}
            >
              {Array.from({ length: totalCards }, (_, index) => (
                <RecipeCard
                  key={index}
                  isGridView={true}
                  isLoading={false}
                  label="Smažené kuřecí řízečky, bramborové placičky"
                  badges={["Dieta", "Brambor"]}
                  assertCard={true}
                />
              ))}
            </div>
          ) : (
            <Swiper
              spaceBetween={25}
              breakpoints={{
                370: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
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
                    isGridView={true}
                    isLoading={false}
                    label={"Smažené kuřecí řízečky, bramborové placičky"}
                    badges={["Dieta", "Brambor"]}
                    assertCard={true}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </div>
  );
}
