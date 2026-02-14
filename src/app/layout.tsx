import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import CartDrawer from "@/components/features/CartDrawer";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZipKart - Superfast Grocery Delivery",
  description: "Order fresh groceries, vegetables, fruits, and daily needs in minutes.",
  icons: {
    icon: "/images/zipkart_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-zip-gray text-zip-dark overflow-x-hidden`}
      >
        <CartProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
