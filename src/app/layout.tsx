import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mapa do Portfólio — I Solemnly Swear",
  description: "Um portfólio mágico inspirado no Mapa do Maroto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&family=UnifrakturMaguntia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col parchment-bg">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
