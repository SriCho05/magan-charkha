
'use server';

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';

export async function requestRefund(orderId: string, reason: string) {
  if (!orderId || !reason) {
    throw new Error('Order ID and reason are required.');
  }

  try {
    const orderRef = adminDb.collection('orders').doc(orderId);
    await orderRef.update({
      status: 'Refund Requested',
      refundDetails: {
        reason: reason,
        requestedAt: new Date().toISOString(),
        status: 'Pending',
      },
    });

    revalidatePath('/dashboard');
    revalidatePath('/admin/refunds');
    revalidatePath('/admin/orders');
  } catch (error) {
    console.error(`Error requesting refund for order ${orderId}:`, error);
    throw new Error('Could not request refund.');
  }
}


export async function processRefund(orderId: string, outcome: 'Approved' | 'Rejected') {
  if (!orderId || !outcome) {
    throw new Error('Order ID and outcome are required.');
  }

  try {
    const orderRef = adminDb.collection('orders').doc(orderId);
    const doc = await orderRef.get();
    if (!doc.exists) {
        throw new Error("Order not found");
    }
    
    const orderData = doc.data();

    await orderRef.update({
      status: outcome === 'Approved' ? 'Refunded' : 'Delivered', // Revert to delivered if rejected
      refundDetails: {
        ...orderData?.refundDetails,
        status: outcome,
        processedAt: new Date().toISOString(),
      },
    });

    revalidatePath('/dashboard');
    revalidatePath('/admin/refunds');
    revalidatePath('/admin/orders');

  } catch (error) {
    console.error(`Error processing refund for order ${orderId}:`, error);
    throw new Error('Could not process refund.');
  }
}
