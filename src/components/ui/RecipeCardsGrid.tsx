"use client";

import { cn } from "@/utils/cn";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
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
        // cardsInGrid && `md:grid ${gridClasses[cardsInGrid]}`,
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
        : length && (
            <>
              <Swiper
                spaceBetween={25}
                slidesPerView={2}
                modules={[Pagination]}
                pagination={{ clickable: false }}
                className="block [--swiper-pagination-color:theme(colors.primary.600)] md:hidden"
              >
                {Array.from({ length: length }, (_, index) => (
                  <SwiperSlide key={index} className="block py-10 md:hidden">
                    <RecipeCard
                      key={index}
                      isGridView={gridView}
                      isLoading={isLoading}
                      label={label1}
                      badges={badgesArray}
                      assertCard={assertCard}
                      className="block md:hidden"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className={cn(
                  "hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                )}
              >
                {Array.from({ length: length }, (_, index) => (
                  <RecipeCard
                    key={index}
                    isGridView={gridView}
                    isLoading={isLoading}
                    label={label1}
                    badges={badgesArray}
                    assertCard={assertCard}
                  />
                ))}
              </div>
            </>
          )}
    </div>
  );
}

export default RecipeCardsGrid;
