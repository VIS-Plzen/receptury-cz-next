"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useEffect, useState } from "react";

export default function Inspirace() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const [selected, setSelected] = useState<
    "recommended" | "favorites" | "new" | string
  >("recommended");

  useEffect(() => {
    if (!window) return;
    const localVisible =
      window.localStorage.getItem("inspiraceVisible") === "true";
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
        />
      </div>
    );
  }

  return (
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
                <TabsTrigger value="recommended" className="w-full">
                  Doporučené pro vás
                </TabsTrigger>
                <TabsTrigger value="favorites" className="w-full">
                  Oblíbené
                </TabsTrigger>
                <TabsTrigger value="new" className="w-full">
                  Nové recepty
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        <RecipeCardsGrid
          length={12}
          gridView
          assertCard
          className="flex flex-row"
        />
      </div>
    </Container>
  );
}
