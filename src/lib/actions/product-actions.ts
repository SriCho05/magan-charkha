
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, writeBatch, query } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

const productsCollection = collection(db, 'products');

export async function seedInitialProducts() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Seeding initial products...");
    const batch = writeBatch(db);
    initialProducts.forEach((product) => {
      const docRef = doc(productsCollection, product.id);
      batch.set(docRef, product);
    });
    await batch.commit();
    console.log("Initial products seeded successfully.");
    revalidatePath("/admin/products");
  } else {
    console.log("Products collection is not empty. Skipping seed.");
  }
}

// Call this once, perhaps in a startup script or a special admin action if needed.
// For this context, we will not call it automatically to avoid re-seeding issues.

export async function getProducts(): Promise<Product[]> {
    try {
        const querySnapshot = await getDocs(productsCollection);
        if (querySnapshot.empty) {
            await seedInitialProducts();
            const refreshedSnapshot = await getDocs(productsCollection);
            return refreshedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        }
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
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
        return null;
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
