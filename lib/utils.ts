import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTokenValid(encodedToken: string) {
  const payload = encodedToken.split(".")[1];
  const decodedPayload = atob(payload);
  const decodedToken = JSON.parse(decodedPayload);

  return decodedToken.exp ? decodedToken.exp * 1000 > Date.now() : false;
}
