
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';

function StatusContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h1 className="text-3xl font-headline font-bold">Congratulations!</h1>
                <p className="text-muted-foreground mt-2">Your payment was successful and your order has been placed.</p>
                <div className="flex gap-4 mt-6">
                    <Button asChild>
                        <Link href="/dashboard">View Order History</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center">
            <XCircle className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-3xl font-headline font-bold">Payment Failed</h1>
            <p className="text-muted-foreground mt-2">Unfortunately, we were unable to process your payment. Please try again.</p>
             <div className="flex gap-4 mt-6">
                <Button asChild>
                    <Link href="/checkout">Try Again</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/">Go to Homepage</Link>
                </Button>
            </div>
        </div>
    );
}


export default function OrderStatusPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center font-headline">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
            <Suspense fallback={<div>Loading...</div>}>
                <StatusContent />
            </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
