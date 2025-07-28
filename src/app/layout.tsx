
'use client';

import { useState, useEffect } from 'react';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/providers/cart-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/providers/auth-provider";
import LoadingScreen from '@/components/loading-screen';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Magancharkha</title>
        <meta name="description" content="Authentic Khadi products, handcrafted for you." />
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
        {loading && <LoadingScreen />}
        <div className={loading ? 'hidden' : 'flex flex-col flex-grow'}>
            <AuthProvider>
            <CartProvider>
                <div className="flex-grow flex flex-col">
                    <Header />
                    <main className="flex-grow">{children}</main>
                </div>
                <Footer />
                <Toaster />
            </CartProvider>
            </AuthProvider>
        </div>
      </body>
    </html>
  );
}
