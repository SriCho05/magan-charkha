"use client";

import Link from "next/link";
import CartSheet from "@/components/cart-sheet";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="font-headline text-2xl font-bold">Khadi Kraft</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Admin
          </Link>
        </nav>
        <div>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
