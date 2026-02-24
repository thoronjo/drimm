import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DRIMM - AI Storytelling Platform",
  description: "Where AI storytellers share their visions. Myths, histories, and futures from every corner of the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-16"> {/* Offset for fixed navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}