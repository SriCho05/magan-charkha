
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

export async function seedInitialProducts() {
  const supabase = await createClient();
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });

  if (count === 0) {
    console.log("Seeding initial products...");
    // Supabase insert supports array of objects
    const { error } = await supabase.from('products').insert(initialProducts);

    if (error) {
      console.error("Error seeding products:", error);
    } else {
      console.log("Initial products seeded successfully.");
      revalidatePath("/");
      revalidatePath("/admin/products");
    }
  }
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  try {
    const { data, error, count } = await supabase.from('products').select('*', { count: 'exact' });

    if (error) throw error;

    if (count === 0) {
      await seedInitialProducts();
      const { data: refreshedData } = await supabase.from('products').select('*');
      return (refreshedData as Product[]) || [];
    }

    return (data as Product[]) || [];
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!id) return null;
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null; // .single() returns error if not found or multiple
    return data as Product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

// The data coming from the form won't have an ID.
export async function addProduct(productData: Omit<Product, 'id'>) {
  const supabase = await createClient();
  try {
    // We let Supabase generate the ID or we can generate one if we want specific format.
    // Assuming Supabase 'products' table has 'id' as uuid default gen_random_uuid() or similar.
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/products");

    return data as Product;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Could not add product.");
  }
}


export async function updateProduct(product: Product) {
  const supabase = await createClient();
  try {
    const { id, ...productData } = product;

    const { error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id);

    if (error) throw error;

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${id}`);
    revalidatePath(`/product/${id}`);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw new Error("Could not update product.");
  }
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  try {
    if (!productId) {
      throw new Error("Product ID is required.");
    }
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Could not delete product.");
  }
}
