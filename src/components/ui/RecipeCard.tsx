import { cn } from "@/utils/cn";
import Image, { StaticImageData } from "next/legacy/image";
import MealSymbol from "../symbols/MealSymbol";
import Badge from "./Badge";
import ButtonIcon from "./ButtonIcon";

type RecipeCardProps = {
  isGridView?: Boolean;
  isLoading?: Boolean;
  label: string;
  img?: StaticImageData;
  badges: string[];
};

type BadgesProps = {
  badges: string[];
};

//function to render action buttons on card
function ActionButtons({ isGridView }: any) {
  return (
    <div className={cn("flex flex-row space-x-1", !isGridView && "space-x-3")}>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon icon="favorite" />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon icon="share" />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon icon="archive" />
      </div>
    </div>
  );
}

// function to redner badges on card
function BadgeRenderer({ badges }: BadgesProps) {
  return (
    <ul className="line-clamp-1 justify-start space-y-[4px] lg:line-clamp-2">
      {badges.map((badge, index) => (
        <Badge key={index} className="mx-[2px] md:px-1.5 md:py-0.5 md:text-xs">
          {badge}
        </Badge>
      ))}
    </ul>
  );
}

// Card for grid layout
function GridCardLayout({ label, badges, img }: RecipeCardProps) {
  return (
    <div className={cn("h-80 w-11/12 max-w-[220px] ")}>
      <div
        className={cn(
          "relative inset-0 h-36 w-full overflow-hidden rounded-t-2xl",
          img ? "border-none" : "border-primary-300/30 bg-primary-300/30"
        )}
      >
        {img ? (
          <div>
            <Image alt="" src={img} className="h-full w-full" />
          </div>
        ) : (
          <div className="flex scale-125 justify-center pt-11">
            <MealSymbol className="scale-150" />
          </div>
        )}
        <div className="absolute right-2 top-2 z-50 flex space-x-2 p-1">
          <ActionButtons isGridView={true} />
        </div>
      </div>
      <div className="flex h-44 flex-grow flex-col justify-between overflow-hidden rounded-b-2xl border-2 border-t-0 border-primary-300/30 bg-white p-[16px]">
        <div className="line-clamp-3 text-sm font-bold">
          <p>{label}</p>
        </div>
        <BadgeRenderer badges={badges} />
      </div>
    </div>
  );
}

// Card for row layout
function RowCardLayout({ label, badges, img }: RecipeCardProps) {
  return (
    <div
      className={cn(
        "flex h-[70px] flex-row justify-between border-primary-300/30"
      )}
    >
      {img ? (
        <div className="relative h-[70px] w-[70px] overflow-hidden rounded-l-2xl">
          <Image alt="" src={img} layout="fill" objectFit="cover" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-l-2xl bg-primary-300/30 p-3">
          <MealSymbol />
        </div>
      )}
      <div className="flex flex-grow flex-row items-center justify-between overflow-hidden rounded-r-2xl border-2 border-l-0 border-primary-300/30 bg-white">
        <div className="line-clamp-3 pl-[20px] pr-2 text-sm font-bold">
          <p>{label}</p>
        </div>
        <BadgeRenderer badges={badges} />
        <div className="items-center ">
          <div className="flex space-x-2 p-3">
            <ActionButtons isGridView={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid card loading placeholder
function LoadingPlaceholderGrid() {
  return (
    <div className="flex h-80 w-11/12 max-w-[220px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-gray-200 bg-white">
      <div className="flex h-36 w-full items-center justify-center border-gray-200 bg-gray-200"></div>
      <div className="flex flex-grow flex-col justify-between p-[16px]">
        <div className="mb-4 text-sm font-bold">
          <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-500"></div>
          <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-500"></div>
          <div className="inline-block h-4 w-7 animate-pulse rounded-full bg-gray-500"></div>
        </div>
        <div className="flex flex-col space-y-[4px]">
          <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

// Row card loading placeholder
function LoadingPlaceholderRow() {
  return (
    <div className="flex h-[70px] w-full items-center justify-between overflow-hidden rounded-2xl border-2 border-gray-200 bg-white">
      <div className="h-full w-[72px] animate-pulse bg-gray-200"></div>
      <div className="flex flex-grow flex-col justify-center px-4">
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-500"></div>
      </div>
      <div className="flex items-center space-x-2 px-8">
        <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200"></div>
        <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}

// Mobile loading placeholder
function LoadingPlaceholderMobile() {
  return (
    <div className="flex h-[90px] w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-white">
      <div className="h-full w-[75px] animate-pulse bg-gray-200"></div>
      <div className="flex flex-grow flex-col justify-center px-4">
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
}

// Mobile card
function MobileCardLayout({ label, badges, img }: RecipeCardProps) {
  return (
    <div className="flex h-[90px] items-center justify-start overflow-hidden">
      {img ? (
        <div className="relative h-[90px] w-[90px] overflow-hidden rounded-l-xl">
          <Image alt="" src={img} layout="fill" objectFit="cover" />
        </div>
      ) : (
        <div className="items-center p-4">
          <MealSymbol className=" text-primary-300" />
        </div>
      )}
      <div className="flex h-full w-full flex-col items-start justify-center overflow-hidden rounded-r-xl border-2 border-l-0 border-primary-300/30 bg-white">
        <div className="line-clamp-2 px-4 text-sm font-bold">
          <p>{label}</p>
        </div>
        <div className="flex flex-row  items-center px-4">
          <BadgeRenderer badges={badges} />
        </div>
      </div>
    </div>
  );
}

function RecipeCard({
  isGridView,
  isLoading,
  label,
  img,
  badges,
}: RecipeCardProps) {
  const Placeholder = isGridView
    ? LoadingPlaceholderGrid
    : LoadingPlaceholderRow;
  const MobilePlaceholder = LoadingPlaceholderMobile;

  return (
    <>
      {isLoading ? (
        <>
          <div className="lg:hidden">
            <MobilePlaceholder />
          </div>
          <div className="hidden lg:block">
            <Placeholder />
          </div>
        </>
      ) : (
        <>
          <div className="block lg:hidden">
            <MobileCardLayout label={label} badges={badges} img={img} />
          </div>
          <div className="hidden lg:block">
            {isGridView ? (
              <GridCardLayout label={label} badges={badges} img={img} />
            ) : (
              <RowCardLayout label={label} badges={badges} img={img} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default RecipeCard;
