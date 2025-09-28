
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Truck, RotateCw, Replace } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
          Terms & Conditions
        </h1>
        <p className="text-lg text-muted-foreground">
          Please read our terms and conditions carefully before making a purchase.
        </p>
      </header>

      <div className="space-y-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-primary" />
              Payment Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>All payments are to be made in Indian Rupees (INR). We accept online payments through UPI and credit/debit cards via our secure payment gateway.</p>
            <p>For orders paid via direct UPI transfer, it is the customer's responsibility to complete the payment and confirm it on the checkout page. Orders will only be processed after payment verification. Magancharkha reserves the right to cancel any unpaid orders after a reasonable time.</p>
            <p>All listed prices are inclusive of applicable taxes.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              Shipping & Courier Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>We ship our products across India. We partner with reliable courier services to ensure your products reach you safely and on time.</p>
            <p>Shipping charges, if any, will be calculated at checkout based on your delivery location and the weight of your order.</p>
            <p>Orders are typically dispatched within 2-3 business days. Delivery times may vary from 5-10 business days depending on your location. You will receive a tracking link via email once your order is shipped.</p>
            <p>We are not liable for any delays in delivery caused by the courier company or other unforeseeable circumstances.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <RotateCw className="w-6 h-6 text-primary" />
              Return & Replacement Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>We take great care in crafting our products. However, if you receive a damaged or incorrect item, we are happy to offer a return or replacement.</p>
            <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
            <p>You must initiate a return request from your dashboard within 7 days of receiving the product. Please provide a clear reason and photographic evidence of the damage or issue.</p>
            <p>Once your return request is approved, we will arrange for a reverse pickup. After we receive and inspect the item, we will process your refund or dispatch a replacement.</p>
            <p>Please note that due to the handcrafted nature of our products, minor variations in color, weave, or texture are not considered defects and are not eligible for return.</p>
             <p>Refunds will be processed to the original method of payment within 7-10 business days after the returned item has been inspected and approved.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
