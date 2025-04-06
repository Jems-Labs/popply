import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const calculateDaysLeft = (expiresAt: Date) => {
  const today = new Date();
  const expires = new Date(expiresAt);
  today.setHours(0, 0, 0, 0);
  expires.setHours(0, 0, 0, 0);
  const daysLeft = Math.max(
    Math.round((expires.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    0
  );
  return daysLeft;
};