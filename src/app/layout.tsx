import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/app/components/navbar";

import "react-quill/dist/quill.snow.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-slate-950 text-white `}
      >
        <Navbar />
        <main className="flex-1 container mt-28 mx-auto px-3 md:px-6">
          {children}
        </main>
        <footer className="container mx-auto">Footer</footer>
      </body>
    </html>
  );
}
