
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CartItem, Order, ShippingAddress } from '@/lib/types';

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
    if (!shippingAddress) {
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

    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

        if (error) throw error;

        revalidatePath("/dashboard");
        revalidatePath("/admin/orders");
        return data; // Supabase returns the created object with ID
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Could not create order.");
    }
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
    if (!userId) return [];

    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('userId', userId)
            .order('date', { ascending: false });

        if (error) throw error;

        return (data as Order[]) || [];

    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        return [];
    }
}

export async function getAllOrders(): Promise<Order[]> {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        return (data as Order[]) || [];
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return [];
    }
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
    const supabase = await createClient();
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);

        if (error) throw error;

        revalidatePath('/admin/orders');
        revalidatePath('/dashboard');
    } catch (error) {
        console.error(`Error updating order ${orderId} status:`, error);
        throw new Error('Could not update order status.');
    }
}
