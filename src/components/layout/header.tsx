
"use client";

import Link from "next/link";
import CartSheet from "@/components/cart-sheet";
import { Leaf, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          <span className="font-headline text-2xl font-bold">Magancharkha</span>
        </Link>
        <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6 items-center">
            <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Home
            </Link>
             <Link
                href="/shop"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Shop
            </Link>
            </nav>
            <div className="flex items-center gap-2">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </DropdownMenuItem>
                            {user.email === ADMIN_EMAIL && (
                                <DropdownMenuItem asChild>
                                    <Link href="/admin">Admin Panel</Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/login">Login</Link>
                    </Button>
                )}
                <CartSheet />
            </div>
        </div>
      </div>
    </header>
  );
}
