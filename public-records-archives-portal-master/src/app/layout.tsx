import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archivum Lumen - Digital Archive System",
  description: "A modern, visually engaging public archive system with comprehensive preservation tools and intuitive navigation",
  keywords: ["archive", "digital preservation", "archival management", "historical documents", "collections"],
  authors: [{ name: "Archivum Lumen Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Archivum Lumen",
    description: "Modern digital archive system for preserving and exploring historical collections",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archivum Lumen",
    description: "Modern digital archive system",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
