import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * READ ONLY: For shadcn UI library only
 * Tailwind CSS classnames generator
 * @param inputs - List of classnames
 * @returns Tailwind CSS classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
