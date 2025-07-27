
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import type { CartItem, Order, ShippingAddress } from '@/lib/types';

const ordersCollectionRef = collection(db, 'orders');

interface CreateOrderArgs {
    userId: string;
    customer: string;
    shippingAddress: ShippingAddress;
    items: CartItem[];
}

export async function createOrder({ userId, customer, shippingAddress, items }: CreateOrderArgs) {
    if (!userId || items.length === 0) {
        throw new Error("Cannot create an order with an empty cart or without a user.");
    }
    if (!customer) {
        throw new Error("Customer name is required to create an order.");
    }
    if(!shippingAddress) {
        throw new Error("Shipping address is required to create an order.");
    }

    const orderData = {
        userId: userId,
        customer: customer,
        items: items.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        total: items.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: "Pending" as const,
        date: new Date().toISOString(),
        shippingAddress: shippingAddress,
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
