import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import 'dotenv';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrl(path: string) {
  const baseUrl = process.env.SERVER_URL ?? 'http://localhost:3001';
  return new URL("/api/v1" + path, baseUrl).toString();
}

export function getRedirectUrl(searchParams: URLSearchParams): string {
  const redirectTo = searchParams.get("redirectTo");
  if (redirectTo) return redirectTo;

  const envUrl = process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_URL;
  if (envUrl) return envUrl;

  return "/";
}