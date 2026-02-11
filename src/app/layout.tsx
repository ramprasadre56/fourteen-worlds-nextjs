import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AmazonHeader, HeaderSpacer } from "@/components/header/AmazonHeader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fourteen Worlds — Vedic Cosmology",
  description:
    "Interactive exploration of Vedic cosmology and the fourteen planetary systems based on Śrīmad-Bhāgavatam",
  keywords: [
    "Vedic cosmology",
    "fourteen worlds",
    "Srimad Bhagavatam",
    "ISKCON",
    "Prabhupada",
    "Bhagavad Gita",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        <Providers>
          <AmazonHeader />
          <HeaderSpacer />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
