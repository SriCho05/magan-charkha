
"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <Card className="group flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="khadi product"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <span className="text-xs text-muted-foreground">{product.category}</span>
        <CardTitle className="mt-1 font-headline text-xl">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">Rs. {product.price.toFixed(2)}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addToCart(product, 1)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
