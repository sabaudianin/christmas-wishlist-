import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Lights } from "@/components/lights";
import { Snow } from "../components/snow";
import { Footer } from "@/components/footer";
import "./globals.css";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Świąteczne listy prezentów",
  description:
    "Firmowa lista życzeń świątecznych: dodaj swoją i zobacz, co chcą dostać inni.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${jakarta.variable} ${dmSerif.variable} antialiased`}>
        <Lights />
        <Snow />
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
