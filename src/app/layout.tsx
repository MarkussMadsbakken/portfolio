import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aa",
  description: "aa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 z-50">
          <div className=" space-x-6">
            <a href="/#home">Home</a>
            <a href="/#about">About</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
