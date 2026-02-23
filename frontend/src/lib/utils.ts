import 'dotenv';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getJWT } from "./auth";
import axios from "axios";

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

export const api = axios.create({
  baseURL: process.env.SERVER_URL ?? "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getJWT();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // silently continue without token
  }
  return config;
});

export function getSessionData(): { userId: string; email: string } | null {
    if (typeof window === "undefined") return null; // SSR guard

    const userId = sessionStorage.getItem("userId");
    const email = sessionStorage.getItem("email");

    if (!userId || !email) return null;

    return { userId, email };
}

export function setSessionData(userId: string, email: string): void {
    if (typeof window === "undefined") return; // SSR guard

    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("email", email);
}