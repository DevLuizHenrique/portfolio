import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalUI from "@/presentation/components/shared/GlobalUI";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Luiz Henrique Ferreira | Desenvolvedor Frontend e Full Stack";
const description =
  "Portfólio de Luiz Henrique Ferreira, desenvolvedor pleno com foco em React, Next.js e TypeScript para produtos web e sistemas corporativos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Luiz Henrique Ferreira",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col noise grid-bg">
        <GlobalUI />
        {children}
      </body>
    </html>
  );
}
