import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
        <div className="flex justify-center items-center mb-4">
          <Leaf className="w-5 h-5 text-primary mr-2" />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Magancharkha. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/legal/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/legal/terms-and-conditions" className="text-sm hover:text-primary transition-colors">Terms</Link>
          <Link href="/legal/refund-policy" className="text-sm hover:text-primary transition-colors">Refunds</Link>
          <Link href="/legal/shipping-policy" className="text-sm hover:text-primary transition-colors">Shipping</Link>
          <Link href="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
