"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";

export default function Inspirace({ className = "" }: { className?: string }) {
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
        </div>
      </Container>
      <Container className="md:pr pr-0">
        <RecipeCardsGrid
          length={15}
          gridView
          assertCard
          className="flex flex-row overflow-visible"
        />
      </Container>
    </div>
  );
}
