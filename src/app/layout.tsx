import type { Metadata } from "next";
import { Inter, Syne, IBM_Plex_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sahil Lunia — Video Editor",
  description:
    "Sahil Lunia (FLUX) — video editor & storyteller. Cinematic edits, VFX & motion graphics, reels, music videos and corporate films.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${syne.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
