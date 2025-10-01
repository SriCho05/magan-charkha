
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Hand, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/actions/product-actions";
import type { Product } from "@/lib/types";
import ScrollAnimation from "@/components/scroll-animation";
import StoryTimeline from "@/components/story-timeline";
import WhiteVoid from "@/components/white-void";
import { useLocale } from "@/hooks/use-locale";
import { useEffect, useState } from "react";


function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getProducts();
      const featured = allProducts.slice(0, 3);
      setProducts(featured);
      setLoading(false);
    }
    loadProducts();
  }, []);
  

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product: Product, index: number) => (
        <ScrollAnimation key={product.id} delay={index * 150}>
            <ProductCard product={product} />
        </ScrollAnimation>
      ))}
    </div>
  )
}

export default function LandingPage() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
            >
                <source src="https://videos.pexels.com/video-files/2527992/2527992-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="container px-4 z-20">
            <ScrollAnimation>
                <h1 className="font-headline text-5xl md:text-7xl font-bold mb-4">
                {t('The Fabric of Freedom')}
                </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                {t('Experience the timeless elegance of authentic Khadi, handcrafted with passion and woven with tradition.')}
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
                <Button asChild size="lg">
                <Link href="/shop">{t('Explore the Collection')}</Link>
                </Button>
            </ScrollAnimation>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <ScrollAnimation>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Hand className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">{t('Handcrafted Tradition')}</h3>
                    <p className="text-muted-foreground">
                    {t('Each thread is spun by hand, weaving stories of heritage and skill into every garment.')}
                    </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={200}>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Leaf className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">{t('Sustainable Fabrics')}</h3>
                    <p className="text-muted-foreground">
                    {t('Embrace eco-friendly fashion with our all-natural, breathable Khadi material.')}
                    </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={400}>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Sun className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">{t('Modern Legacy')}</h3>
                    <p className="text-muted-foreground">
                    {t('Fusing timeless craft with contemporary designs for the conscious global citizen.')}
                    </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Parallax Section 1: Craftsmanship */}
        <section 
            className="parallax-section min-h-[50vh] py-20 flex items-center" 
            style={{backgroundImage: "url('/photos/Magan Kadhi 0720.jpg')"}}
            data-ai-hint="handloom weaving"
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="container mx-auto px-4 z-10 text-center text-white">
                <ScrollAnimation>
                    <h2 className="font-headline text-4xl font-bold mb-4">{t('The Art of Khadi')}</h2>
                    <p className="max-w-2xl mx-auto text-lg text-white/90">
                        {t('From cotton pod to finished fabric, every step is a testament to patience and artistry. Our Khadi is hand-spun and hand-woven by skilled artisans in rural communities, preserving a rich cultural heritage and supporting sustainable livelihoods.')}
                    </p>
                </ScrollAnimation>
            </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4">
            <ScrollAnimation>
                <h2 className="font-headline text-4xl font-bold text-center mb-10">{t('Featured Products')}</h2>
            </ScrollAnimation>
            <FeaturedProducts />
             <div className="text-center mt-12">
                <ScrollAnimation>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/shop">{t('View All Products')}</Link>
                    </Button>
                </ScrollAnimation>
             </div>
          </div>
        </section>

        {/* Parallax Section 2: Philosophy */}
        <section 
            className="parallax-section min-h-[50vh] py-20 flex items-center" 
            style={{backgroundImage: "url('/photos/WhatsApp Image 2022-01-16 at 6.29.32 PM.jpeg')"}}
            data-ai-hint="modern fashion"
        >
             <div className="absolute inset-0 bg-black/60"></div>
            <div className="container mx-auto px-4 z-10 text-center text-white">
                <ScrollAnimation>
                    <h2 className="font-headline text-4xl font-bold mb-4">{t('Modern Legacy')}</h2>
                    <p className="max-w-2xl mx-auto text-lg text-white/90">
                        {t('We believe in fashion that is both beautiful and meaningful. Magancharkha reinterprets traditional Khadi for the modern wardrobe, creating pieces that are timeless, versatile, and conscious. It\'s more than clothing; it\'s a piece of history, a commitment to sustainability, and a statement of mindful living.')}
                    </p>
                </ScrollAnimation>
            </div>
        </section>
        
        <StoryTimeline />
        <WhiteVoid />

      </main>
    </div>
  );
}
