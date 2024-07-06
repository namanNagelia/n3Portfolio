import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            body { font-family: ${poppins.className}, sans-serif; }
            h1, h2, h3 { font-family: Georgia, serif; }
          `}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}
