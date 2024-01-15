"use client";

import clsx from "clsx";
import img from "public/images/food.jpeg";
import RecipeCard from "./RecipeCard";

type CardsGridProps = {
  isGridView: boolean;
  isLoading: boolean;
};

const label1 = "Fusilli s mediteránskou omáčkou a smaženým sumečkem";
const badgesArray = [
  "Ryby a mořské plody",
  "Bezmléčná dieta",
  "Vegetariánská dieta",
];

function RecipeCardsGrid({ isGridView, isLoading }: CardsGridProps) {
  return (
    <div className="flex flex-col justify-center ">
      <div className="grid">
        <div
          className={clsx(
            "justify-center ",
            isGridView
              ? " gap-y-4 md:grid md:grid-cols-5"
              : "grid grid-cols-1 space-y-4"
          )}
        >
          {Array.from({ length: 18 }, (_, index) => (
            <RecipeCard
              key={index}
              isGridView={isGridView}
              isLoading={isLoading}
              label={label1}
              badges={badgesArray}
              img={img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCardsGrid;
