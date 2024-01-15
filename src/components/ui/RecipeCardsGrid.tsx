"use client";

import { cn } from "@/utils/cn";
import RecipeCard from "./RecipeCard";

type Props = {
  data?: { title: string; badges: string[]; img?: string }[];
  gridView?: boolean;
  isLoading?: boolean;
  length?: number;
  className?: string;
  cardsInGrid?: number;
};

function RecipeCardsGrid({
  data,
  gridView = false,
  isLoading = false,
  length,
  className = "",
  cardsInGrid,
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

function RecipeCardsGrid({ isGridView, isLoading }: CardsGridProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 overflow-x-auto py-6 md:overflow-x-hidden",
        gridView && !cardsInGrid && "md:grid md:grid-cols-5 lg:grid-cols-6",
        cardsInGrid && `md:grid ${gridClasses[cardsInGrid]}`,
        className
      )}
    >
      {data
        ? data.map((card, index) => (
            <RecipeCard
              key={index}
              isGridView={gridView}
              isLoading={isLoading}
              label={card.title}
              badges={card.badges}
              img={card.img}
            />
          ))
        : length &&
          Array.from({ length: length }, (_, index) => (
            <RecipeCard
              key={index}
              isGridView={gridView}
              isLoading={isLoading}
              label={label1}
              badges={badgesArray}
            />
          ))}
    </div>
  );
}

export default RecipeCardsGrid;
