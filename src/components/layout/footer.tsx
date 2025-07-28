import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-muted-foreground">
        <div className="flex justify-center items-center mb-4">
          <Leaf className="w-5 h-5 text-primary mr-2"/>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Magancharkha. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center gap-4">
            <Link href="#" className="text-sm hover:text-primary transition-colors">Facebook</Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">Twitter</Link>
        </div>
      </div>
    </footer>
  );
}
