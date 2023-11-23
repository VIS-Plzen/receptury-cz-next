import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge tailwind classes and update them
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
