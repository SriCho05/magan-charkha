
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import type { CartItem, Order } from '@/lib/types';
import { products as initialProducts } from '@/lib/data';

const ordersCollectionRef = collection(db, 'orders');

export async function createOrder(cartItems: CartItem[], userId: string, userEmail: string) {
    if (!userId || cartItems.length === 0) {
        throw new Error("Cannot create an order with an empty cart or without a user.");
    }
    if (!userEmail) {
        throw new Error("User email is required to create an order.");
    }

    const orderData = {
        userId: userId,
        customer: userEmail,
        items: cartItems.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: "Pending" as const,
        date: new Date().toISOString(),
    };

    try {
        const docRef = await addDoc(ordersCollectionRef, orderData);
        revalidatePath("/dashboard");
        revalidatePath("/admin/orders");
        return { id: docRef.id, ...orderData };
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Could not create order.");
    }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
    if (!userId) return [];
    
    try {
        const q = query(ordersCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Order)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        return [];
    }
}
