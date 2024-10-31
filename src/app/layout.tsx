import { ToastContainer } from "@/components/ui/ToastContainer";
import "@/styles/globals.css";
import { compareDates } from "@/utils/dateWorker";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { cookies } from "next/headers";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Providers from "./Providers";
import SkipNavigationButton from "./SkipNavigationButton";

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
  const cookie = cookies();
  const sid = cookie.has("token");
  const paid = compareDates(cookie.get("paid")?.value);
  const name = cookie.get("name")?.value;

  return (
    <html lang="cs">
      <body
        className={`overflow-x-hidden bg-primary-50 font-sans text-gray-700 selection:bg-primary/80 selection:text-primary-50 ${nunito.variable}`}
      >
        <Providers>
          <SkipNavigationButton
            href="#obsah"
            className="hidden lg:inline-flex"
          />
          <div className="grid min-h-[100dvh] grid-rows-[1fr_auto]">
            <div className="relative grid min-h-[100dvh] grid-rows-[auto_1fr]">
              <header className="sticky top-0 z-fixed">
                <Navbar logged={sid} paid={paid} name={name ?? ""} />
              </header>
              <main id="obsah" className="max-w-[100vw]">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
