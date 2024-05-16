import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Analytics } from "@vercel/analytics/next";
import { ProductContextProvider } from "@/context/ProductContext";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Catalogo Gri-Yo",
  description: "Catalogo de productos y muchos mas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <Analytics mode="production" />
      <body className={outfit.className}>
        <ProductContextProvider>
          <NavigationBar />
          {children}
        </ProductContextProvider>
      </body>
    </html>
  );
}
