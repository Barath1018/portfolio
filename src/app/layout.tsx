import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Particles = dynamic(() => import("@/components/Particles"), { ssr: false });

const syne = Syne({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Barath's Portfolio",
  description: "Created with the help of Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body
        className={twMerge(
          syne.variable,
          inter.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
      >
  <Particles count={100} color="#ffffff" />
        {children}
      </body>
    </html>
  );
}