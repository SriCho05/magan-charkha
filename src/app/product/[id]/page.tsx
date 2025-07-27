"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import ProductSuggestions from "@/components/product-suggestions";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { getProductById } from "@/lib/actions/product-actions";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function ProductPageSkeleton() {
    return (
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div><Skeleton className="w-full h-[500px] rounded-lg" /></div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-1/2" />
            </div>
        </div>
    )
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProduct = async () => {
          setLoading(true);
          const fetchedProduct = await getProductById(params.id);
          setProduct(fetchedProduct);
          setLoading(false);
      }
      fetchProduct();
  }, [params.id]);


  if (loading) {
      return (
          <div className="container mx-auto px-4 py-12">
              <ProductPageSkeleton />
          </div>
      )
  }

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
