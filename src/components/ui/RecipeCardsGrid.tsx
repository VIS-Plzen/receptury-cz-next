import { cn } from "@/utils/cn";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RecipeCard from "./RecipeCard";

type Props = {
  data?:
    | {
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
      }
    | "loading";
  gridView?: boolean;
  className?: string;
  cardsInGrid?: number;
};

function RecipeCardsGrid({
  data,
  gridView = false,
  className = "",
  cardsInGrid,
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
      {(() => {
        if (!data) {
          return <div>Data se nepodařilo načíst</div>;
        }
        if (data === "loading") {
          return Array(15)
            .fill("")
            .map((_: any, index) => (
              <RecipeCard
                key={index}
                isGridView={gridView}
                isLoading={true}
                label={""}
                id={"e" + index}
                badges={[]}
                img="/images/food.jpeg"
              />
            ));
        }
        if (!data.Status) {
          return (
            <div>
              Chyba {data.Chyba?.Kod}: {data.Chyba?.Popis}
            </div>
          );
        }
        return (
          data.Vety &&
          data.Vety.map((card, index) => (
            <RecipeCard
              key={index}
              isGridView={gridView}
              isLoading={false}
              label={card.Vlastnosti.Nazev}
              id={card.Vlastnosti.Identita}
              badges={[]}
              img="/images/food.jpeg"
            />
          ))
        );
      })()}
    </div>
  );
}

export default RecipeCardsGrid;
