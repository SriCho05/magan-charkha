
import React from 'react';

export default function ShippingPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl text-foreground">
            <h1 className="text-3xl font-headline font-bold mb-6">Shipping & Delivery Policy</h1>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Shipping Locations</h2>
            <p className="mb-4">
                We currently ship to all major cities and towns within India. International shipping is currently unavailable but we are working on it.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Processing Time</h2>
            <p className="mb-4">
                All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Shipping Rates & Delivery Estimates</h2>
            <p className="mb-4">
                Shipping charges for your order will be calculated and displayed at checkout. Standard delivery usually takes 5-7 business days depending on your location.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Shipment Confirmation & Order Tracking</h2>
            <p className="mb-4">
                You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Damages</h2>
            <p className="mb-4">
                Magan Sangrahalaya Samiti is not liable for any products damaged or lost during shipping. However, if you received your order damaged, please contact us immediately to file a claim. Please save all packaging materials and damaged goods before filing a claim.
            </p>
        </div>
    );
}
