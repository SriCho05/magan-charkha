
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocale } from "@/hooks/use-locale";
import { languages } from "@/lib/locales/languages";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;


export default function Header() {
  const { user, logout } = useAuth();
  const { t, setLocale, locale } = useLocale();

  const handleLanguageSelect = (langCode: string) => {
    setLocale(langCode);
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
                {t('Home')}
            </Link>
             <Link
                href="/shop"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                {t('Shop')}
            </Link>
            <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                {t('Contact')}
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
                            <DropdownMenuLabel>{t('My Account')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">{t('Dashboard')}</Link>
                            </DropdownMenuItem>
                            {user.email === ADMIN_EMAIL && (
                                <DropdownMenuItem asChild>
                                    <Link href="/admin">{t('Admin Panel')}</Link>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>{t('Logout')}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/login">{t('Login')}</Link>
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
                        <DropdownMenuLabel>{t('Select Language')}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <ScrollArea className="h-72 w-48">
                            {Object.entries(languages).map(([code, name]) => (
                                <DropdownMenuItem key={code} onClick={() => handleLanguageSelect(code)}>
                                    {name}
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
