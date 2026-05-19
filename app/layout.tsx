import type { Metadata } from "next";
import { Poppins, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PST BPS Flores Timur - Pelayanan Statistik Terpadu",
  description: "Buku Tamu dan Pelayanan Statistik Terpadu Badan Pusat Statistik Kabupaten Flores Timur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${outfit.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col font-sans text-text-primary">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
