import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Structo",
  description:
    "Generate type-safe mock data directly from your TypeScript interfaces or Go structs.",
  metadataBase: new URL("https://structo-it.vercel.app"),
  openGraph: {
    title: "Structo",
    description:
      "Generate type-safe mock data directly from your TypeScript interfaces or Go structs.",
    type: "website",
    url: "https://structo-it.vercel.app",
    siteName: "Structo",
    locale: "en_US",
    images: [
      {
        url: "/og-img.png",
        width: 1200,
        height: 630,
        alt: "Structo - Type-safe mock data generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Structo",
    description: "Generate json data based on your typescript interface",
    images: ["/og-img.png"],
    creator: "@xylogeist_",
  },
  keywords: ["typescript", "mock data", "json", "mock", "data", "generator","interface to data"],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${firaCode.className} antialiased`}>{children}</body>
      </html>
    </QueryProvider>
  );
}
