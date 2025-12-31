
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from "@/lib/supabase/server";

export async function requestRefund(orderId: string, reason: string) {
  if (!orderId || !reason) {
    throw new Error('Order ID and reason are required.');
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('orders')
      .update({
        status: 'Refund Requested',
        refundDetails: {
          reason: reason,
          requestedAt: new Date().toISOString(),
          status: 'Pending',
        }
      })
      .eq('id', orderId);

    if (error) throw error;

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

  const supabase = await createClient();

  try {
    // We need to fetch current refundDetails first to preserve other fields if any, 
    // though here we are just updating status and processedAt.
    // Actually, `processRefund` existing logic merges `...orderData?.refundDetails`.

    // Fetch
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('refundDetails')
      .eq('id', orderId)
      .single();

    if (fetchError || !order) {
      throw new Error("Order not found");
    }

    const currentRefundDetails = order.refundDetails as any; // Cast as any or RefundDetails

    const newRefundDetails = {
      ...currentRefundDetails,
      status: outcome,
      processedAt: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('orders')
      .update({
        status: outcome === 'Approved' ? 'Refunded' : 'Delivered', // Revert to delivered if rejected
        refundDetails: newRefundDetails,
      })
      .eq('id', orderId);

    if (error) throw error;

    revalidatePath('/dashboard');
    revalidatePath('/admin/refunds');
    revalidatePath('/admin/orders');

  } catch (error) {
    console.error(`Error processing refund for order ${orderId}:`, error);
    throw new Error('Could not process refund.');
  }
}
