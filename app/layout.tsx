import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@/app/lib/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ballio - Le copilote des parents de footballeurs",
    template: "%s | Ballio",
  },
  description:
    "Aidez votre enfant à réussir dans le football sans briser votre relation. Formation, conseils et outils pour les parents de jeunes footballeurs.",
  keywords: [
    "football",
    "parent footballeur",
    "coaching mental",
    "formation football",
    "réussite sportive",
    "relation parent enfant",
  ],
  authors: [{ name: "Ballio Team" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ballio.app",
    title: "Ballio - Le copilote des parents de footballeurs",
    description:
      "La première application dédiée aux parents qui veulent soutenir leur enfant dans le football sainement.",
    siteName: "Ballio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ballio - Devenez le meilleur supporter de votre enfant",
    description: "Conseils et formations pour les parents de footballeurs.",
    // images: ["/og-image.jpg"], // TODO: Add OG image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}