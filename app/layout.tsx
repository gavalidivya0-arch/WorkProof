import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MarketingLayoutWrapper } from "@/components/layout/MarketingLayoutWrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "WorkProof | Verified Professional Proof",
  description: "Turn your freelance work into verified professional proof.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <MarketingLayoutWrapper navbar={<Navbar />} footer={<Footer />}>
          {children}
        </MarketingLayoutWrapper>
        <Toaster position="bottom-right" theme="system" />
      </body>
    </html>
  );
}
