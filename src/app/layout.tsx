import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
const thickPoppins = Poppins({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-thickPoppins",
});

export const metadata: Metadata = {
  title: "Naman Nagelia",
  description: "Software and AI Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${thickPoppins.variable}`}>
      <head>
        <style>
          {`
            body { font-family: ${poppins.className}, sans-serif; }
            h1, h2, h3 { font-family: Georgia, serif; }
          `}
        </style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
