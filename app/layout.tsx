import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/data";
import ChatWidget from "@/components/ChatWidget";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://harborlightdental.example.com"), // [PLACEHOLDER] set to real domain
  title: {
    default: `${brand.name} — Exceptional Dentistry, Beautifully Personal`,
    template: `%s — ${brand.name}`
  },
  description:
    "A premium dental clinic offering general, cosmetic and restorative dentistry with advanced technology and a calm, patient-first approach.",
  openGraph: {
    title: `${brand.name} — Exceptional Dentistry, Beautifully Personal`,
    description:
      "A premium dental clinic offering general, cosmetic and restorative dentistry with advanced technology and a calm, patient-first approach.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-ivory text-charcoal font-sans antialiased selection:bg-clinical/20">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
