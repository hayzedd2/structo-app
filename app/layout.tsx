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
  description: "Generate json data based on your typescript interface",

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
