
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

const productsCollection = collection(db, 'products');

// Function to seed initial data if the collection is empty
async function seedInitialProducts() {
  try {
    const querySnapshot = await getDocs(productsCollection);
    if (querySnapshot.empty && initialProducts.length > 0) {
      console.log("Seeding initial products...");
      const batch = writeBatch(db);
      initialProducts.forEach((product) => {
        // Use the predefined ID from the data file for seeding
        const docRef = doc(productsCollection, product.id);
        batch.set(docRef, product);
      });
      await batch.commit();
      console.log("Initial products seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding initial products:", error)
  }
}

// Call seeding once at the start.
seedInitialProducts();

export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return products;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
    if (!id) return null;
    try {
        const productDoc = await getDoc(doc(db, 'products', id));
        if (productDoc.exists()) {
            return { id: productDoc.id, ...productDoc.data() } as Product;
        }
        return null;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        // Fallback for environments where single doc fetch might fail
        try {
            const products = await getProducts();
            const product = products.find(p => p.id === id) || null;
            return product;
        } catch (fallbackError) {
             console.error("Fallback fetching failed:", fallbackError);
             return null;
        }
    }
}

export async function addProduct(productData: Omit<Product, 'id'>) {
  try {
    const docRef = await addDoc(productsCollection, productData);
    revalidatePath("/admin/products");
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Could not add product.");
  }
}

export async function updateProduct(product: Product) {
  try {
    const productDoc = doc(db, 'products', product.id);
    const { id, ...productData } = product;
    await updateDoc(productDoc, productData);
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${id}`);
    revalidatePath(`/product/${id}`);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw new Error("Could not update product.");
  }
}

export async function deleteProduct(productId: string) {
  try {
    await deleteDoc(doc(db, 'products', productId));
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Could not delete product.");
  }
}
