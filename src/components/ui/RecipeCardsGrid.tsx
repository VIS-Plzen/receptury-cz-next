"use client";

import clsx from "clsx";
import { useState } from "react";
import Button from "./Button";
import RecipeCard from "./RecipeCard";

function RecipeCardsGrid() {
  const label1 = "Fusilli s mediteránskou omáčkou a smaženým sumečkem";
  const badgesArray = ["Ryby a mořské plody", "Bezmléčná dieta"];

  const [gridView, setGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <div className="flex justify-center py-28">
        <RecipeCard
          isGridView={gridView}
          isLoading={isLoading}
          label={label1}
          badges={badgesArray}
        />
      </div>
      <div className="space-x-4 py-4">
        <Button onClick={() => setGridView(!gridView)}>Change layout</Button>
        <Button onClick={() => setIsLoading(!isLoading)}>Set Loading</Button>
      </div>

      <div
        className={clsx(
          gridView && "grid grid-cols-6 justify-center gap-4 py-6",
          !gridView && "grid grid-cols-1 justify-center gap-4 py-6"
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
  );
}

export default RecipeCardsGrid;
