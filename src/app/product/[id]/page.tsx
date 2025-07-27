"use client";

import { notFound } from "next/navigation";
import { useProducts } from "@/providers/product-provider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import ProductSuggestions from "@/components/product-suggestions";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="animate-fade-in">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            data-ai-hint="product lifestyle"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex gap-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge variant="outline">{product.color}</Badge>
                </div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold">
                {product.name}
              </h1>
              <p className="text-3xl text-primary font-semibold">
                ₹{product.price.toFixed(2)}
              </p>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" onClick={() => addToCart(product, 1)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <p className="text-sm text-muted-foreground">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <ProductSuggestions productDescription={product.description} />
      </div>
    </div>
  );
}
