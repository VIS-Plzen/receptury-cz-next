import { cn } from "@/utils/cn";
import { DownloadingIcon, FavoriteIcon, ShareIcon } from "../icons";
import MealSymbol from "../symbols/MealSymbol";
import Badge from "./Badge";

type Props = {
  isGridView: Boolean;
  isLoading: Boolean;
  label: string;
  img?: string;
  badges: string[];
};

type CardLayoutProps = {
  label: string;
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
        <FavoriteIcon size={36} className="p-1" />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ShareIcon size={36} className="p-1" />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <DownloadingIcon size={36} className="p-1" />
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
function GridCardLayout({ label, badges }: CardLayoutProps) {
  return (
    <div>
      <div className="flex h-[120px] w-full items-start justify-end border-primary-300/30 bg-primary-300/30">
        <div className="right-20 top-6 z-50 flex space-x-2 p-2">
          <ActionButtons isGridView={true} />
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-between bg-white p-[16px]">
        <div className="mb-4 line-clamp-3 text-sm font-bold">
          <p>{label}</p>
        </div>
        <BadgeRenderer badges={badges} />
      </div>
    </div>
  );
}

// Card for row layout
function RowCardLayout({ label, badges }: CardLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-row justify-between border-primary-300/30 bg-white"
      )}
    >
      <div className="bg-primary-300/30 p-3">
        <MealSymbol />
      </div>
      <div className="flex flex-grow flex-row items-center justify-between">
        <div className="line-clamp-3 pl-[20px] pr-2 text-sm font-bold">
          <p>{label}</p>
        </div>
        <BadgeRenderer badges={badges} />
        <div className="items-center bg-white">
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
  // Render the loading placeholder for the grid view
  return (
    <div>
      <div className="flex h-[120px] w-full items-center justify-center border-gray-200 bg-gray-200"></div>
      <div className="flex flex-grow flex-col justify-between bg-white p-[16px]">
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
    <div className="flex h-[70px] w-full items-center justify-between border-gray-200 bg-white">
      <div className="h-full w-16 animate-pulse bg-gray-200"></div>
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
    <div className="flex h-[70px] w-full items-center justify-between border-gray-200 bg-white">
      <div className="h-full w-16 animate-pulse bg-gray-200"></div>
      <div className="flex flex-grow flex-col justify-center px-4">
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
}

// Mobile card
function MobileCardLayout({ label, badges }: CardLayoutProps) {
  return (
    <div className="flex justify-start rounded-2xl bg-white">
      <div className="items-center p-4">
        <MealSymbol className=" text-primary-300" />
      </div>
      <div className="flex flex-col items-start">
        <div className="line-clamp-2 pr-2 pt-2 text-sm font-bold">
          <p>{label}</p>
        </div>
        <div className="flex flex-row items-center">
          <BadgeRenderer badges={badges} />
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ isGridView, isLoading, label, img, badges }: Props) {
  const Placeholder = isGridView
    ? LoadingPlaceholderGrid
    : LoadingPlaceholderRow;
  const MobilePlaceholder = LoadingPlaceholderMobile;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-2",
        isLoading && "border-gray-200",
        !isLoading && "border-primary-300/30"
      )}
    >
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
          <div className="lg:hidden">
            <MobileCardLayout label={label} badges={badges} />
          </div>
          <div className="hidden lg:block">
            {isGridView ? (
              <GridCardLayout label={label} badges={badges} />
            ) : (
              <RowCardLayout label={label} badges={badges} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeCard;
