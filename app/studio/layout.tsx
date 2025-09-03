import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Sanity Studio - Printing Press",
  description: "Content management system for Printing Press website",
  keywords: ["sanity", "cms", "printing", "press", "content management"],
  authors: [{ name: "Printing Press Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "noindex, nofollow", // Studio should not be indexed
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
