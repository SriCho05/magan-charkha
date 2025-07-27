"use client";

import ProductForm from "@/components/product-form";
import { useProducts } from "@/providers/product-provider";
import { notFound } from "next/navigation";

export default function EditProductPage({ params }: { params: { id: string } }) {
    const { products } = useProducts();
    const product = products.find(p => p.id === params.id);

    if(!product) {
        return notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-headline font-bold mb-6">Edit Product</h1>
            <ProductForm initialData={product} />
        </div>
    )
}
