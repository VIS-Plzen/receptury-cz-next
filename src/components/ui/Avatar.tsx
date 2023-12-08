"use client";

import { cn } from "@/utils/cn";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import clsx from "clsx";

// Component docs: https://www.radix-ui.com/docs/primitives/components/avatar

//
// Avatar component
type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
> & {
  src?: string;
  name: string;
  loading?: "eager" | "lazy";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  fallbackColor?: "primary" | "secondary";
  className?: string;
  [x: string]: any;
};

// Component Variants
const cv = {
  root: "inline-flex shrink-0 aspect-square select-none items-center justify-center overflow-hidden align-middle relative isolate",
  radius: "rounded-full",
  size: {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
    "2xl": "h-20 w-20 text-2xl",
  },
  color: {
    primary: "bg-primary-700 text-primary-50",
    secondary: "bg-secondary-700 text-secondary-50",
  },
};

export default function Avatar({
  src,
  name = "John Doe",
  loading = "lazy",
  size = "md",
  fallbackColor = "secondary",
  className = "",
  ...props
}: AvatarProps) {
  // Get initials from the first and the last name and save them in a variable
  const initials = name
    .split(" ")
    .map((n, i) => (i === 0 || i === name.split(" ").length - 1 ? n[0] : ""))
    .join("");

  return (
    <AvatarPrimitive.Root
      {...props}
      className={cn(cv.root, cv.size[size], cv.radius, className)}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={name}
        loading={loading}
        className="h-full w-full object-cover"
      />

      <AvatarPrimitive.Fallback
        className={clsx(
          cv.color[fallbackColor],
          "flex h-full w-full items-center justify-center text-[1em] font-semibold uppercase leading-none"
        )}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
