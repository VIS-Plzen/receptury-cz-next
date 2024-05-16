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
        Veta: number;
        Nazev: string;
        Identita: string;
        DruhSkupina: string;
        DruhPodskupina: string;
        TepelnaUprava: string;
        Dieta1: "Ano" | "Ne";
        Dieta2: "Ano" | "Ne";
        Dieta3: "Ano" | "Ne";
        badges: string[];
        img?: string;
      };
      Stitky: string[];
    }[];
  };
  gridView?: any;
  isLoading?: boolean;
  length?: number;
  className?: string;
  cardsInGrid?: number;
  assertCard?: boolean;
  zmenStitek?: any;
  logged?: boolean;
};

function RecipeCardsGrid({
  data,
  gridView = false,
  isLoading = false,
  length = 15,
  className = "",
  cardsInGrid,
  assertCard,
  zmenStitek,
  logged,
}: Props) {
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
            badges={[
              card.Vlastnosti.Dieta1 === "Ano" && "Bezlepková",
              card.Vlastnosti.Dieta2 === "Ano" && "Bezmléčná",
              card.Vlastnosti.Dieta3 === "Ano" && "Šetřící",
              card.Vlastnosti.TepelnaUprava,
              card.Vlastnosti.DruhSkupina,
              card.Vlastnosti.DruhPodskupina,
            ]}
            img="/images/food.jpeg"
            zmenStitek={zmenStitek}
            veta={card.Vlastnosti.Veta}
            stitky={logged ? card.Stitky : []}
          />
        ))}
    </div>
  );
}

export default RecipeCardsGrid;
