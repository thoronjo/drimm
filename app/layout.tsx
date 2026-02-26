import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Analytics from "@/components/Analytics";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://drimm-stories.vercel.app'),
  title: {
    default: "DRIMM - AI Storytelling Platform",
    template: "%s | DRIMM"
  },
  description: "Where AI storytellers share their visions. Discover myths, histories, and futures from every corner of the world. Featuring African stories, sci-fi, mythology, and more.",
  keywords: ["AI videos", "AI storytelling", "African stories", "AI-generated content", "Sora", "Runway", "Pika", "video platform", "mythology", "sci-fi"],
  authors: [{ name: "DRIMM" }],
  creator: "DRIMM",
  publisher: "DRIMM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drimm-stories.vercel.app",
    siteName: "DRIMM",
    title: "DRIMM - AI Storytelling Platform",
    description: "Where AI storytellers share their visions. Myths, histories, and futures from every corner of the world.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DRIMM - AI Storytelling Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DRIMM - AI Storytelling Platform",
    description: "Where AI storytellers share their visions. Myths, histories, and futures from every corner of the world.",
    images: ["/og-image.png"],
    creator: "@thoronjo"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
        </head>
        <body className={inter.className}>
          <Analytics />
          <Navbar />
          <div className="pt-16"> {/* Offset for fixed navbar */}
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}