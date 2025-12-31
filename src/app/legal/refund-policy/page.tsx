
import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-foreground">
            <h1 className="text-3xl font-headline font-bold mb-6">Refund & Cancellation Policy</h1>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Cancellation Policy</h2>
            <p className="mb-4">
                You can cancel your order before it has been dispatched from our facility. To cancel an order, please go to your dashboard on our website and view your order history, or contact our customer support team immediately at contact@magancharkha.com. Once the order has been shipped, it cannot be cancelled.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Refund Policy</h2>
            <p className="mb-4">
                We take pride in the quality of our Khadi products. However, if you are not completely satisfied with your purchase, we are here to help.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Eligibility:</strong> Returns are accepted within 7 days of delivery if the item is unused, in its original condition, and with all tags attached.</li>
                <li><strong>Damaged/Defective Items:</strong> If you receive a damaged or defective item, please report it to us within 48 hours of delivery with clear photographs. We will arrange for a replacement or a full refund.</li>
                <li><strong>Process:</strong> To initiate a return/refund request, navigate to your "Order History" in the Dashboard and click "Request Refund" next to the eligible order.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Refund Timeline</h2>
            <p className="mb-4">
                Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Shipping Costs</h2>
            <p className="mb-4">
                Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund, unless the return is due to our error (e.g., damaged or incorrect item).
            </p>
        </div>
    );
}
