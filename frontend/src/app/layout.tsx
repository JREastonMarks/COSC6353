import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
          <body className={inter.className}>
            <section>
              <Header></Header>
              {children}
            </section>
          </body>
      </html>
    );
}
