import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import { ModalProvider } from "./context/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cherry Cash 🍒",
  description: "Beautiful personal finance tracker",
  applicationName: "Cherry Cash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="
          min-h-screen
          overflow-x-hidden
          bg-gradient-to-br
          from-pink-50
          via-white
          to-rose-100
          text-gray-900
          selection:bg-pink-500
          selection:text-white
        "
      >
        <Providers>
          <ModalProvider>
            <main className="relative min-h-screen">
              {children}
            </main>
          </ModalProvider>
        </Providers>
      </body>
    </html>
  );
}