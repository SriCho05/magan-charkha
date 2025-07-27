
"use client";

import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { useAuth } from '@/hooks/use-auth';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);
        
        if (querySnapshot.empty && initialProducts.length > 0) {
          const batch = writeBatch(db);
          initialProducts.forEach((product) => {
            const docRef = doc(productsCollection, product.id);
            batch.set(docRef, product);
          });
          await batch.commit();
          const seededProducts = await getDocs(productsCollection);
          const productsData = seededProducts.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
          setProducts(productsData);
        } else {
          const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
        toast({
          title: "Error",
          description: "Could not fetch products.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
        fetchProducts();
    }
  }, [authLoading, toast]);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const productsCollection = collection(db, 'products');
      const docRef = await addDoc(productsCollection, productData);
      const newProduct: Product = { id: docRef.id, ...productData };
      setProducts(prevProducts => [...prevProducts, newProduct]);
    } catch (error) {
        console.error("Error adding product: ", error);
        toast({
            title: "Error",
            description: "Could not add product.",
            variant: "destructive",
        });
        throw error;
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
        const productDoc = doc(db, 'products', updatedProduct.id);
        const { id, ...productData } = updatedProduct;
        await updateDoc(productDoc, productData);
        setProducts(prevProducts =>
            prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    } catch (error) {
        console.error("Error updating product: ", error);
        toast({
            title: "Error",
            description: "Could not update product.",
            variant: "destructive",
        });
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        toast({
            title: "Product deleted",
            description: "The product has been successfully removed.",
        });
    } catch (error) {
        console.error("Error deleting product: ", error);
        toast({
            title: "Error",
            description: "Could not delete product.",
            variant: "destructive",
        });
    }
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if(context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
