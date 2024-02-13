"use client";

import { cn } from "@/utils/cn";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RecipeCard from "./RecipeCard";

type Props = {
  data?: { title: string; badges: string[]; img?: string }[];
  gridView?: boolean;
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
  length,
  className = "",
  cardsInGrid,
  assertCard,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 py-6 md:overflow-x-hidden",
        gridView &&
          !cardsInGrid &&
          "md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {data &&
        data.map((card: any, index) => (
          <RecipeCard
            key={index}
            isGridView={gridView}
            isLoading={isLoading}
            label={card.Vlastnosti.Nazev}
            badges={[]}
            img="/images/food.jpeg"
          />
        ))}
    </div>
  );
}

export default RecipeCardsGrid;
