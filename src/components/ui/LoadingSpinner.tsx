import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  color?: "inherit" | "primary" | "white" | "black";
  [key: string]: any;
};

// Component Variants
const cv = {
  size: {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
    inherit: "h-[1em] w-[1em]",
  },
  borderSize: {
    xs: "border-[0.125rem]",
    sm: "border-[0.1875rem]",
    md: "border-[0.25rem]",
    lg: "border-[0.375rem]",
    xl: "border-[0.5rem]",
    "2xl": "border-[0.625rem]",
    inherit: "border-[0.125em]",
  },
  color: {
    inherit: "border-current",
    primary: "border-primary",
    white: "border-white",
    black: "border-gray-950",
  },
};

export default function LoadingSpinner({
  size = "inherit",
  color = "inherit",
  ...props
}: Props) {
  return (
    <div {...props}>
      <div aria-label="načítání..." className={clsx("relative", cv.size[size])}>
        <div
          className={clsx(
            "absolute origin-center animate-[spin_0.7s_linear_infinite] rounded-full border-dashed border-b-transparent border-l-transparent border-r-transparent opacity-25",
            cv.size[size],
            cv.borderSize[size],
            cv.color[color]
          )}
        ></div>
        <div
          className={clsx(
            "absolute origin-center animate-[spin_0.7s_ease_infinite] rounded-full border-b-transparent border-l-transparent border-r-transparent",
            cv.size[size],
            cv.borderSize[size],
            cv.color[color]
          )}
        ></div>
      </div>
    </div>
  );
}
