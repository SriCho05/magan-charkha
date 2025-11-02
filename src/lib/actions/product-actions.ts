
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { adminDb } from "@/lib/firebase-admin";
import { collection, getDocs, getDoc, doc, writeBatch, setDoc, updateDoc, query } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

const productsCollectionRef = collection(db, 'products');
const productsAdminCollectionRef = adminDb.collection('products');

export async function seedInitialProducts() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Seeding initial products...");
    const batch = writeBatch(db);
    initialProducts.forEach((product) => {
      // Use the product's string ID when creating the document reference
      const docRef = doc(productsCollectionRef, product.id);
      batch.set(docRef, product);
    });
    await batch.commit();
    console.log("Initial products seeded successfully.");
    revalidatePath("/");
    revalidatePath("/admin/products");
  }
}

export async function getProducts(): Promise<Product[]> {
    try {
        const querySnapshot = await getDocs(productsCollectionRef);
        if (querySnapshot.empty) {
            await seedInitialProducts();
            const refreshedSnapshot = await getDocs(productsCollectionRef);
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

// The data coming from the form won't have an ID.
export async function addProduct(productData: Omit<Product, 'id'>) {
  try {
    // Use the adminDb instance for this server-side write operation
    const newDocRef = await productsAdminCollectionRef.add(productData);
    
    revalidatePath("/admin/products");
    
    return { id: newDocRef.id, ...productData };
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Could not add product.");
  }
}


export async function updateProduct(product: Product) {
  try {
    const { id, ...productData } = product;
    // Use the adminDb instance for this server-side write operation
    await productsAdminCollectionRef.doc(id).update(productData);

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
    if (!productId) {
        throw new Error("Product ID is required.");
    }
    // Use the adminDb instance for this server-side write operation
    await productsAdminCollectionRef.doc(productId).delete();
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw new Error("Could not delete product.");
  }
}
