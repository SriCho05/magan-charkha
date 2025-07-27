"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';
import type { Product } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast({
        title: "Product deleted",
        description: "The product has been successfully removed.",
        variant: "destructive"
    });
  };

  const value = {
    products,
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
