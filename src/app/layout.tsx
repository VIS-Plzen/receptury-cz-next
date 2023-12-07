import "@/styles/globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Receptury",
  description: "základ projektu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body
        className={`bg-primary-50 font-sans text-gray-700 selection:bg-primary/80 selection:text-primary-50 ${nunito.variable}`}
      >
        <main>
          <header>
            <Navbar />
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
