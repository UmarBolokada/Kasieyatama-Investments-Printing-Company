import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/lib/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printing Press - Quality Printing Services",
  description: "Professional printing services and products. Business cards, flyers, banners, and custom printing solutions.",
  keywords: ["printing", "business cards", "flyers", "banners", "custom printing", "print services"],
  authors: [{ name: "Printing Press Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CartProvider>
            <ToastProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
