import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/providers/cart-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/providers/auth-provider";
import { ProductProvider } from "@/providers/product-provider";

export const metadata: Metadata = {
  title: "Khadi Kraft",
  description: "Authentic Khadi products, handcrafted for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <div className="flex-grow">
                    <Header />
                    <main>{children}</main>
                    </div>
                    <Footer />
                    <Toaster />
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
