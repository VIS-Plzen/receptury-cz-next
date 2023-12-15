"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import clsx from "clsx";
import { useState } from "react";
import Button from "./Button";
import RecipeCard from "./RecipeCard";

function RecipeCardsGrid() {
  const label1 = "Fusilli s mediteránskou omáčkou a smaženým sumečkem";
  const badgesArray = ["Ryby a mořské plody", "Bezmléčná dieta", "Rohlík"];

  const [gridView, setGridView] = useLocalStorage<Boolean>("gridView", true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleGridView = () => {
    setGridView((prevGridView) => !prevGridView);
  };

  const toggleLoading = () => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  return (
    <div className="flex flex-col justify-center px-2">
      <div className="space-x-4 py-4">
        <Button onClick={toggleGridView}>Change layout</Button>
        <Button onClick={toggleLoading}>Set Loading</Button>
      </div>
      <div className="grid">
        <div
          className={clsx(
            "justify-center gap-2",
            gridView ? "lg:grid lg:grid-cols-5" : "grid grid-cols-1 gap-2"
          )}
        >
          {Array.from({ length: 18 }, (_, index) => (
            <RecipeCard
              key={index}
              isGridView={gridView}
              isLoading={isLoading}
              label={label1}
              badges={badgesArray}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeCardsGrid;
