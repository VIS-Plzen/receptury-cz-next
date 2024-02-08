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
  const label1 = "Fusilli s mediteránskou omáčkou a smaženým sumečkem";
  const badgesArray = ["Ryby a mořské plody", "Bezmléčná dieta"];
  const gridClasses = [
    "",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
  ];

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
        data.map((card, index) => (
          <RecipeCard
            key={index}
            isGridView={gridView}
            isLoading={isLoading}
            label={card.title}
            badges={card.badges}
            img="/images/food.jpeg"
            className="cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-gray-900/10"
          />
        ))}
    </div>
  );
}

export default RecipeCardsGrid;
