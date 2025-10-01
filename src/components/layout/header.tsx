
"use client";

import Link from "next/link";
import CartSheet from "@/components/cart-sheet";
import { Leaf, User, Globe } from "lucide-react";
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
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const languages = [
    "English", "Mandarin Chinese", "Hindi", "Spanish", "French", 
    "Modern Standard Arabic", "Bengali", "Russian", "Portuguese", 
    "Urdu", "Indonesian", "German", "Japanese", "Marathi", "Telugu", 
    "Turkish", "Tamil", "Cantonese", "Vietnamese", "Korean"
];

export default function Header() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLanguageSelect = (lang: string) => {
    toast({
        title: "Language Selected",
        description: `${lang} has been selected. (UI placeholder)`
    });
  }

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
            <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Contact
            </Link>
            </nav>
            <div className="flex items-center gap-1">
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Globe className="h-5 w-5" />
                            <span className="sr-only">Select language</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <ScrollArea className="h-72 w-48">
                            {languages.map(lang => (
                                <DropdownMenuItem key={lang} onClick={() => handleLanguageSelect(lang)}>
                                    {lang}
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ThemeToggle />
            </div>
        </div>
      </div>
    </header>
  );
}

    