"use client";

import { cn } from "@/utils/cn";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RecipeCard from "./RecipeCard";

type Props = {
  data?: {
    Status: boolean;
    Chyba?: { Kod: number; Popis: string };
    Vety?: {
      Vlastnosti: {
        Nazev: string;
        Identita: string;
        badges: string[];
        img?: string;
      };
    }[];
  };
  gridView?: any;
  isLoading?: boolean;
  length?: number;
  className?: string;
  cardsInGrid?: number;
  assertCard?: boolean;
};

function RecipeCardsGrid({
  data,
  gridView = false,
  isLoading = false,
  length = 15,
  className = "",
  cardsInGrid,
  assertCard,
}: Props) {
  console.log();
  return (
    <div
      className={cn(
        "flex flex-col justify-start gap-4 py-6 md:overflow-visible",
        gridView &&
          !cardsInGrid &&
          "md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {data &&
        data.Vety &&
        data.Vety.map((card, index) => (
          <RecipeCard
            key={index}
            isGridView={gridView}
            isLoading={isLoading}
            label={card.Vlastnosti.Nazev}
            id={card.Vlastnosti.Identita}
            badges={[]}
            img="/images/food.jpeg"
          />
        ))}
    </div>
  );
}

export default RecipeCardsGrid;
