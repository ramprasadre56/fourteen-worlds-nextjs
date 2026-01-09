import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AmazonHeader, HeaderSpacer } from "@/components/header/AmazonHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fourteen Worlds - Vedic Cosmology",
  description: "Interactive visualization of Vedic cosmology and the fourteen planetary systems based on Śrīmad-Bhāgavatam",
  keywords: ["Vedic cosmology", "fourteen worlds", "Srimad Bhagavatam", "ISKCON", "Prabhupada", "Bhagavad Gita"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <AmazonHeader />
          <HeaderSpacer />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
