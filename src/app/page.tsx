
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Hand, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/actions/product-actions";
import type { Product } from "@/lib/types";
import ScrollAnimation from "@/components/scroll-animation";


async function FeaturedProducts() {
  const allProducts = await getProducts();
  // Feature the first 3 products for the landing page
  const featured = allProducts.slice(0, 3);

  if (featured.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featured.map((product: Product, index: number) => (
        <ScrollAnimation key={product.id} delay={index * 150}>
            <ProductCard product={product} />
        </ScrollAnimation>
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-secondary/30">
           <Image
            src="https://placehold.co/1600x900.png"
            alt="Khadi fabric texture"
            fill
            className="opacity-20 object-cover"
            data-ai-hint="fabric texture"
            priority
          />
          <div className="container px-4 z-10">
            <ScrollAnimation>
                <h1 className="font-headline text-5xl md:text-7xl font-bold mb-4">
                The Fabric of Freedom
                </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Experience the timeless elegance of authentic Khadi, handcrafted with passion and woven with tradition.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
                <Button asChild size="lg">
                <Link href="/shop">Explore the Collection</Link>
                </Button>
            </ScrollAnimation>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <ScrollAnimation>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Hand className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">Handcrafted Tradition</h3>
                    <p className="text-muted-foreground">
                    Each thread is spun by hand, weaving stories of heritage and skill into every garment.
                    </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={200}>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Leaf className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">Sustainable Fabrics</h3>
                    <p className="text-muted-foreground">
                    Embrace eco-friendly fashion with our all-natural, breathable Khadi material.
                    </p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={400}>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Sun className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">Modern Legacy</h3>
                    <p className="text-muted-foreground">
                    Fusing timeless craft with contemporary designs for the conscious global citizen.
                    </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4">
            <ScrollAnimation>
                <h2 className="font-headline text-4xl font-bold text-center mb-10">Featured Products</h2>
            </ScrollAnimation>
            <FeaturedProducts />
             <div className="text-center mt-12">
                <ScrollAnimation>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/shop">View All Products</Link>
                    </Button>
                </ScrollAnimation>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}
