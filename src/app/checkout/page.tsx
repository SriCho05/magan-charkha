
"use client";

import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/lib/actions/order-actions";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";


const shippingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Valid ZIP code is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

// Dummy function to simulate payment processing
const processPayment = async (): Promise<{ success: boolean }> => {
    console.log("Processing payment...");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Simulate random success/failure
    const isSuccess = Math.random() > 0.2; // 80% success rate
    console.log(`Payment ${isSuccess ? 'successful' : 'failed'}`);
    return { success: isSuccess };
};

function UpiDialog({ onPaymentSuccess, cartTotal }: { onPaymentSuccess: () => void, cartTotal: number }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmPayment = () => {
        setIsLoading(true);
        // Simulate a brief delay before confirming, then proceed.
        setTimeout(() => {
            onPaymentSuccess();
        }, 1500);
    }

    return (
        <Dialog open={true}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()} hideCloseButton>
                <DialogHeader>
                    <DialogTitle className="font-headline text-center">Complete Your Payment</DialogTitle>
                    <DialogDescription className="text-center">
                        Scan the QR code with your UPI app to pay <span className="font-bold">₹{cartTotal.toFixed(2)}</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-4 space-y-4">
                    {/* IMPORTANT: Replace this placeholder with your actual UPI QR code image */}
                    <Image 
                        src="https://placehold.co/256x256.png?text=Replace+with+your+QR+Code" 
                        alt="UPI QR Code" 
                        width={256} 
                        height={256} 
                        data-ai-hint="upi qr code" 
                    />
                    <p className="text-sm text-center text-muted-foreground">
                        After paying, click the button below to confirm your order.
                        Your order will be processed upon verification of payment.
                    </p>
                </div>
                <DialogFooter>
                    <Button onClick={handleConfirmPayment} disabled={isLoading} className="w-full">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Confirming..." : "I have paid"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showUpiDialog, setShowUpiDialog] = useState(false);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast({ title: "Please login to checkout."});
        router.push("/login");
      } else if (cartItems.length === 0) {
        toast({ title: "Your cart is empty", description: "Please add items to your cart before checking out." });
        router.push("/");
      } else {
        form.setValue("name", user.displayName || user.email?.split('@')[0] || '');
      }
    }
  }, [user, authLoading, cartItems, router, toast, form]);

  const handleSuccessfulOrder = async (shippingData: ShippingFormValues) => {
    if (!user || !user.email) return;

    await createOrder({
        userId: user.uid, 
        customer: shippingData.name, 
        shippingAddress: shippingData,
        items: cartItems
    });
    clearCart();
    router.push('/order-status?status=success');
  };
  
  const onSubmit = async (data: ShippingFormValues) => {
    setIsSubmitting(true);
    
    try {
        if (paymentMethod === 'card') {
            const paymentResult = await processPayment();
            if (paymentResult.success) {
                await handleSuccessfulOrder(data);
            } else {
                router.push('/order-status?status=failed');
            }
        } else if (paymentMethod === 'upi') {
            setShowUpiDialog(true);
            // The UpiDialog will call handleSuccessfulOrder when the user confirms payment.
        }
    } catch (error) {
        console.error("Checkout error:", error)
        toast({ title: "An unexpected error occurred", description: "Please try again.", variant: "destructive" });
    } finally {
        if(paymentMethod === 'card') setIsSubmitting(false);
    }
  };

  if (authLoading || cartItems.length === 0 || !user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const getButtonText = () => {
    if (isSubmitting) return "Processing...";
    if (paymentMethod === 'card') return `Pay ₹${cartTotal.toFixed(2)}`;
    return "Proceed with UPI";
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {showUpiDialog && (
        <UpiDialog onPaymentSuccess={() => handleSuccessfulOrder(form.getValues())} cartTotal={cartTotal} />
      )}
      <h1 className="text-3xl font-headline font-bold mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">1. Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form id="shipping-form" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                            <Input placeholder="Anytown" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                            <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                            <Input placeholder="12345" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                            <Input placeholder="555-555-5555" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">2. Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card">Credit/Debit Card (Test)</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi">UPI / QR Code</Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">3. Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-4">
                    {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="product image" />
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        </div>
                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-bold text-lg">
                    <p>Total</p>
                    <p>₹{cartTotal.toFixed(2)}</p>
                    </div>
                </div>
                </CardContent>
            </Card>
            <Button
                type="submit"
                form="shipping-form"
                onClick={form.handleSubmit(onSubmit)}
                size="lg"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {getButtonText()}
            </Button>
        </div>
      </div>
    </div>
  );
}
