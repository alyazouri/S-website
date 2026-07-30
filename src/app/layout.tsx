import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff7a00",
};

export const metadata: Metadata = {
  title: "ALYAZOURI - PUBG Mobile Sensitivity Optimizer | محسّن الأردن 🇯🇴",
  description: "AI-powered sensitivity generator for PUBG Mobile. Support for 77 devices, 44 weapons, gyroscope optimization, and Jordan server PAC script.",
  keywords: "PUBG Mobile, sensitivity, حساسية, الأردن, Jordan, optimizer, gyroscope, الجايرو",
  authors: [{ name: "ALYAZOURI" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "ALYAZOURI - PUBG Mobile Sensitivity Optimizer",
    description: "AI-powered sensitivity generator for PUBG Mobile",
    type: "website",
    siteName: "ALYAZOURI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALYAZOURI - PUBG Mobile Sensitivity Optimizer",
    description: "AI-powered sensitivity generator for PUBG Mobile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
