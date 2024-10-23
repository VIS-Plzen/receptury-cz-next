import { cn } from "@/utils/cn";
import Image from "next/image";
import MealSymbol from "../symbols/MealSymbol";
import Badge from "./Badge";
import ButtonIcon from "./ButtonIcon";

type RecipeCardProps = {
  isGridView?: boolean;
  forceGrid?: boolean;
  forceRow?: boolean;
  isLoading?: boolean;
  label: string;
  id?: string;
  img?: any;
  badges: (string | false)[];
  className?: string;
  zmenStitek?: any;
  veta?: any;
  stitky?: any;
};

type BadgesProps = {
  badges: (string | false)[];
};
//function to render action buttons on card
function ActionButtons({ isGridView, zmenStitek, veta, stitky }: any) {
  if (!stitky) return null;
  return (
    <div
      className={cn("flex flex-row space-x-1", !isGridView && "md:space-x-2")}
    >
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon={stitky.includes("Oblíbené") ? "favorite-fill" : "favorite"}
          aria-label="Přidat recepturu do oblíbených"
          className={`bg-white 
          ${stitky.includes("Oblíbené") && "text-primary-500"}`}
          onClick={(e) => {
            e.preventDefault();
            zmenStitek(veta, "Oblíbené", !stitky.includes("Oblíbené"));
          }}
        />
      </div>

      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon={stitky.includes("MSklad") ? "archive-fill" : "archive"}
          aria-label="MSklad"
          className={`bg-white 
          ${stitky.includes("MSklad") && "text-primary-500"}`}
          onClick={(e) => {
            e.preventDefault();
            zmenStitek(veta, "MSklad", !stitky.includes("MSklad"));
          }}
        />
      </div>
    </div>
  );
}

// function to redner badges on card
function BadgeRenderer({ badges }: BadgesProps) {
  let badgeCounter = 0;
  return (
    <div className="flex flex-wrap justify-start gap-1">
      {badges.map((badge, index) => {
        if (!badge || badgeCounter >= 4) return null;
        badgeCounter++;
        return (
          <Badge
            key={index}
            className="md:px-2 md:py-0.5 md:text-xs"
            variant={index <= 2 ? "healthy" : undefined}
          >
            {badge}
          </Badge>
        );
      })}
    </div>
  );
}

// Card for grid layout
function GridCardLayout({
  label,
  badges,
  img,
  isLoading,
  className,
  zmenStitek,
  stitky,
  veta,
}: RecipeCardProps) {
  return (
    <div
      className={cn(
        "h-80 w-full min-w-[180px] overflow-hidden rounded-2xl",
        isLoading && "animate-pulse border-2 border-gray-200",
        !isLoading && "border-2 border-primary-300/30",
        className
      )}
    >
      <div
        className={cn(
          "relative inset-0 h-36 w-full bg-primary-300/30",
          isLoading && "bg-gray-200"
        )}
      >
        {img ? (
          <div className={cn(isLoading && "hidden", "h-full")}>
            <Image
              alt=""
              src={img}
              className="h-full w-full object-cover"
              fill
            />
          </div>
        ) : (
          <div className={cn("flex scale-125 justify-center pt-11")}>
            <MealSymbol className={cn("scale-150", isLoading && "hidden")} />
          </div>
        )}
        <div
          className={cn(
            "absolute right-2 top-2 z-50 flex space-x-2 p-1",
            isLoading && "hidden"
          )}
        >
          <ActionButtons
            isGridView={true}
            zmenStitek={zmenStitek}
            veta={veta}
            stitky={stitky}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex h-44 flex-grow flex-col justify-between bg-white p-[16px]"
        )}
      >
        <div className="line-clamp-3 text-sm font-bold">
          <p className={cn(isLoading && "hidden")}>{label}</p>
          {/* loading text placeholder */}
          <div className={cn("hidden", isLoading && "block")}>
            <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="inline-block h-4 w-7 animate-pulse rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className={cn(isLoading && "hidden")}>
          <BadgeRenderer badges={badges} />
        </div>
        {/* loading badges placeholder */}
        <div className={cn("hidden", isLoading && "flex flex-col gap-1")}>
          <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

// Card for row layout
function RowCardLayout({
  label,
  badges,
  img,
  isLoading,
  className,
  zmenStitek,
  veta,
  stitky,
}: RecipeCardProps) {
  return (
    <div
      className={cn(
        "min-h-[70px] w-full flex-row items-center justify-between overflow-hidden rounded-2xl bg-white",
        isLoading && "animate-pulse border-2 border-gray-200",
        !isLoading && "border-2 border-primary-300/30",
        className
      )}
    >
      {img ? (
        <div className={cn("relative h-full w-[70px]")}>
          <Image alt="" src={img} fill className="object-cover" />
        </div>
      ) : (
        <div
          className={cn(
            "flex h-full items-center bg-primary-300/30 p-2.5",
            isLoading && "hidden"
          )}
        >
          <MealSymbol />
        </div>
      )}
      <div
        className={cn(
          "hidden",
          isLoading && "block h-full w-[70px] bg-gray-200"
        )}
      ></div>
      <div className="flex w-full items-center justify-between gap-x-3 bg-white px-4 py-2">
        <div className={cn("grid w-full gap-x-3 gap-y-1 md:grid-cols-2")}>
          <div className="line-clamp-3 text-sm font-bold">
            <p className={cn("block", isLoading && "hidden")}>{label}</p>
            <div
              className={cn(
                isLoading && "h-4 w-full rounded-full bg-gray-300",
                !isLoading && "hidden"
              )}
            ></div>
          </div>
          <div className="flex items-center justify-between gap-12">
            <div className={cn("block", isLoading && "hidden")}>
              <BadgeRenderer badges={badges} />
            </div>
          </div>
        </div>
        <div className="items-center">
          <div className={cn(isLoading && "hidden")}>
            <div className={cn("flex items-center")}>
              <ActionButtons
                isGridView={false}
                zmenStitek={zmenStitek}
                veta={veta}
                stitky={stitky}
              />
            </div>
          </div>
          <div
            className={cn("hidden", isLoading && "flex flex-row gap-2 pr-10")}
          >
            <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200"></div>
            <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeCard({
  isGridView,
  forceGrid,
  forceRow,
  label,
  id,
  badges,
  className,
  isLoading,
  zmenStitek,
  stitky,
  veta,
}: RecipeCardProps) {
  return (
    <ReturnedLayout
      card={{
        label: label,
        id: id,
        badges: badges,
        className: className,
        zmenStitek: zmenStitek,
        stitky: stitky,
        veta: veta,
      }}
      loading={isLoading}
      isGridView={isGridView}
      forceGrid={forceGrid}
      forceRow={forceRow}
      zmenStitek={zmenStitek}
      stitky={stitky}
      veta={veta}
    />
  );
}

function ReturnedLayout({
  isGridView,
  forceGrid,
  forceRow,
  card,
  loading,
  zmenStitek,
  stitky,
  veta,
}: {
  isGridView: boolean | undefined;
  forceGrid?: boolean;
  forceRow?: boolean;
  card: RecipeCardProps;
  loading?: boolean;
  zmenStitek: any;
  stitky: any;
  veta: any;
}) {
  let href = "";
  if (card.id != null) {
    href = `/receptury/${card.id}`;
  } else {
    href = "/";
  }

  return (
    <a href={`/receptury/${card.id}`} className="flex w-full">
      <GridCardLayout
        label={card.label}
        badges={card.badges}
        img={card.img}
        isLoading={loading}
        className={`${
          forceGrid
            ? "block"
            : forceRow
              ? "hidden"
              : isGridView
                ? "hidden md:block"
                : "hidden"
        }`}
        zmenStitek={zmenStitek}
        stitky={stitky}
        veta={veta}
      />
      <RowCardLayout
        label={card.label}
        badges={card.badges}
        img={card.img}
        isLoading={loading}
        className={` ${
          forceRow
            ? "flex"
            : forceGrid
              ? "hidden"
              : isGridView
                ? "flex md:hidden"
                : "flex"
        }`}
        zmenStitek={zmenStitek}
        stitky={stitky}
        veta={veta}
      />
    </a>
  );
}

export default RecipeCard;
