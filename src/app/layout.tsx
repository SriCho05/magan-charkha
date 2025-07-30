
'use client';

import { useState, useEffect } from 'react';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/providers/cart-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/providers/auth-provider";
import LoadingScreen from '@/components/loading-screen';
import { ThemeProvider } from "@/providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This now waits for the window to be fully loaded, which is a better
    // indicator of readiness than a fixed timer.
    if (document.readyState === 'complete') {
        setLoading(false);
    } else {
        const handleLoad = () => setLoading(false);
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
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
         <link 
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" 
            rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {loading && <LoadingScreen />}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
