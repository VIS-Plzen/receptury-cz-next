import {
  ArchiveIcon,
  DownloadingIcon,
  FavoriteFillIcon,
  FavoriteIcon,
  PrintIcon,
  RateReviewIcon,
  ShareIcon,
} from "@/components/icons";
import { cn } from "@/utils/cn";

type Props = React.ComponentPropsWithRef<"button"> & {
  icon?:
    | "favorite"
    | "favorite-fill"
    | "share"
    | "print"
    | "downloading"
    | "archive"
    | "rate-review"
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
    favorite: FavoriteIcon,
    "favorite-fill": FavoriteFillIcon,
    share: ShareIcon,
    print: PrintIcon,
    downloading: DownloadingIcon,
    archive: ArchiveIcon,
    "rate-review": RateReviewIcon,
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
