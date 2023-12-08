import {
  ArchiveIcon,
  CalendarViewMontsIcon,
  DownloadingIcon,
  FavoriteFillIcon,
  FavoriteIcon,
  ListIcon,
  PrintIcon,
  RateReviewIcon,
  ShareIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "@/components/icons";
import { cn } from "@/utils/cn";

type Props = React.ComponentPropsWithRef<"button"> & {
  icon?:
    | "archive"
    | "calendar-view-months"
    | "downloading"
    | "favorite-fill"
    | "favorite"
    | "list"
    | "print"
    | "rate-review"
    | "share"
    | "visibility"
    | "visibility-off"
    | undefined;
  children?: React.ReactElement;
  className?: string;
};

export default function ButtonIcon({
  icon,
  children,
  className = "",
  ...props
}: Props) {
  // If both icon and children are provided, throw an error
  if (icon && children)
    throw new Error("ButtonIcon component can't have both icon and children");

  const Icons = {
    archive: ArchiveIcon,
    "calendar-view-months": CalendarViewMontsIcon,
    downloading: DownloadingIcon,
    "favorite-fill": FavoriteFillIcon,
    favorite: FavoriteIcon,
    list: ListIcon,
    print: PrintIcon,
    "rate-review": RateReviewIcon,
    share: ShareIcon,
    visibility: VisibilityIcon,
    "visibility-off": VisibilityOffIcon,
  };

  const IconComponent = Icons[icon || "favorite"];

  return (
    <button
      className={cn(
        "inline-flex aspect-square h-10 w-10 items-center justify-center rounded-full border-2 border-primary-200 p-1 text-gray-900 transition-colors duration-200 hover:bg-white hover:text-primary",
        className
      )}
      {...props}
    >
      {icon ? <IconComponent size={24} /> : children}
    </button>
  );
}
