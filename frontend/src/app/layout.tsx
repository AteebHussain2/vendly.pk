import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import AppProvider from "@/components/providers/AppProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext", "devanagari"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  style: ["normal", "italic"],
  adjustFontFallback: true,
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vendly - Simplified E-commerce Solutions",
  description: "Vendly offers a seamless e-commerce platform designed to simplify online selling for businesses of all sizes. Our user-friendly tools and customizable features empower entrepreneurs to create, manage, and grow their online stores with ease.",
  keywords: [
    "e-commerce",
    "online store",
    "selling platform",
    "business solutions",
    "online selling",
    "store management",
    "customizable features",
    "entrepreneur tools",
    "digital marketplace",
    "e-commerce solutions",
  ],
  authors: [
    { name: "Vendly Team", url: "https://vendly.pk/about" },
  ],
  openGraph: {
    title: "Vendly - Simplified E-commerce Solutions",
    description: "Vendly offers a seamless e-commerce platform designed to simplify online selling for businesses of all sizes. Our user-friendly tools and customizable features empower entrepreneurs to create, manage, and grow their online stores with ease.",
    url: "https://vendly.pk",
    siteName: "Vendly",
    images: [
      {
        url: "https://vendly.pk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vendly E-commerce Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendly - Simplified E-commerce Solutions",
    description: "Vendly offers a seamless e-commerce platform designed to simplify online selling for businesses of all sizes. Our user-friendly tools and customizable features empower entrepreneurs to create, manage, and grow their online stores with ease.",
    images: ["https://vendly.pk/og-image.png"],
    creator: "@vendly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`} >
        <AppProvider>
          {children}
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}
