import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krea AI Clone - Frontend Internship Assignment",
  description: "A clone of the Krea AI website created as part of a frontend internship assignment",
  icons: {
    icon: '/icons/logo.svg',
    apple: '/icons/logo.svg',
  },
  keywords: ["frontend", "clone", "internship", "assignment", "Krea AI", "portfolio"],
  openGraph: {
    title: "Krea AI Clone - Frontend Internship Assignment",
    description: "A clone of the Krea AI website created as part of a frontend internship assignment",
    images: ['/icons/logo.svg'],
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Krea AI Clone - Frontend Internship Assignment",
    description: "A clone of the Krea AI website created as part of a frontend internship assignment",
    images: ['/icons/logo.svg'],
  },
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
