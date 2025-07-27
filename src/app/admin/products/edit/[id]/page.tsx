import ProductForm from "@/components/product-form";
import { getProductById } from "@/lib/actions/product-actions";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

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
