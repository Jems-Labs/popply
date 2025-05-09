import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Popply",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark">


      <body className={`${fredoka.variable} font-fredoka flex min-h-screen flex-col`}>
        <Navbar />
        <QueryProvider>
          <main className="flex-1">
            {children}
          </main>
        </QueryProvider>
        <Toaster position="top-center" />
        <Footer />
      </body>

    </html>
  );
}
