import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Lights } from "@/components/lights";
import { Snow } from "../components/snow";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
      <body className={`${nunito.variable} ${fraunces.variable} antialiased`}>
        <Lights />
        <Snow />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
