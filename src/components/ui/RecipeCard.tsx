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
};

type BadgesProps = {
  badges: (string | false)[];
};

//function to render action buttons on card
function ActionButtons({ isGridView }: any) {
  return (
    <div className={cn("flex flex-row space-x-1", !isGridView && "space-x-3")}>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon="favorite"
          aria-label="Přidat recepturu do oblíbených"
          onClick={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon="share"
          aria-label="Sdílet recepturu"
          onClick={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon="archive"
          aria-label="Uložit recepturu"
          onClick={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

// function to redner badges on card
function BadgeRenderer({ badges }: BadgesProps) {
  let badgeCounter = 0;
  return (
    <ul className="flex flex-wrap justify-start gap-1">
      {badges.map((badge, index) => {
        if (!badge || badgeCounter >= 4) return null;
        badgeCounter++;
        return (
          <li key={index}>
            <Badge
              className="md:px-2 md:py-0.5 md:text-xs"
              variant={index <= 2 ? "healthy" : undefined}
            >
              {badge}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}

// Card for grid layout
function GridCardLayout({
  label,
  badges,
  img,
  isLoading,
  className,
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
          <ActionButtons isGridView={true} />
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
}: RecipeCardProps) {
  return (
    <div
      className={cn(
        "h-[70px] flex-row justify-between overflow-hidden rounded-2xl",
        isLoading && "animate-pulse border-2 border-gray-200",
        !isLoading && "border-2 border-primary-300/30",
        className
      )}
    >
      {img ? (
        <div className={cn("relative h-[70px] w-[70px]")}>
          <Image alt="" src={img} fill className="object-cover" />
        </div>
      ) : (
        <div className={cn("bg-primary-300/30 p-2.5", isLoading && "hidden")}>
          <MealSymbol />
        </div>
      )}
      <div
        className={cn(
          "hidden",
          isLoading && "block h-full w-[70px] bg-gray-200"
        )}
      ></div>
      <div
        className={cn(
          "flex flex-grow flex-row items-center justify-between bg-white"
        )}
      >
        <div className="line-clamp-3 w-80 pl-[20px] pr-2 text-sm font-bold">
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
          <div className="items-center">
            <div className={cn(isLoading && "hidden")}>
              <div className={cn("hidden items-center space-x-2 p-3 md:flex")}>
                <ActionButtons isGridView={false} />
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
}: RecipeCardProps) {
  return (
    <ReturnedLayout
      card={{ label: label, id: id, badges: badges, className: className }}
      loading={isLoading}
      isGridView={isGridView}
      forceGrid={forceGrid}
      forceRow={forceRow}
    />
  );
}

function ReturnedLayout({
  isGridView,
  forceGrid,
  forceRow,
  card,
  loading,
}: {
  isGridView: boolean | undefined;
  forceGrid?: boolean;
  forceRow?: boolean;
  card: RecipeCardProps;
  loading?: boolean;
}) {
  return (
    <a href={`/receptura/${card.id}`}>
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
      />
    </a>
  );
}

export default RecipeCard;
