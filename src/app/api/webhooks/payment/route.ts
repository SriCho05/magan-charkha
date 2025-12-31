
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { updateOrderStatus } from '@/lib/actions/order-actions';

// This is where the Bank/Payment Gateway sends status updates
export async function POST(req: Request) {
    try {
        // 1. Verify the signature (Security check)
        // Most banks send a signature header to prove the request is really from them.
        // const signature = req.headers.get('x-razorpay-signature'); 

        // 2. Parse the body
        const body = await req.json();
        console.log('Payment Webhook Received:', body);

        // 3. Logic to handle payment success
        // Example: if (body.event === 'payment.captured') ...

        // For now, we just log it. When you get the specific docs from the bank,
        // we will add the exact logic here to update the order status.

        // await updateOrderStatus(body.payload.order.entity.notes.orderId, 'Processing');

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
    }
}

// GET method just to test if the endpoint is reachable
export async function GET() {
    return NextResponse.json({ status: "Payment Webhook Endpoint is Ready" });
}
