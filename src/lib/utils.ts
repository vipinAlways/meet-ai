import { clsx, type ClassValue } from "clsx";
import humanizeDuration from "humanize-duration";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formateDuration(second: number) {
  return humanizeDuration(second * 10000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}
