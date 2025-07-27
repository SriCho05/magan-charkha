"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Leaf, Package, ShoppingBag, LayoutDashboard, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// For this example, we'll use a hardcoded admin email.
// In a real application, you would manage roles in a database.
const ADMIN_EMAIL = "admin@khadikraft.com";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
         <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-3xl font-headline font-bold">Unauthorized</h1>
            <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
            <Button asChild onClick={() => router.push('/')} className="mt-6">
                Go to Homepage
            </Button>
         </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2 p-2">
                <Leaf className="w-6 h-6 text-primary" />
                <span className="font-headline text-xl font-bold">Khadi Kraft Admin</span>
             </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin"}
                  tooltip="Dashboard"
                >
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/admin/products")}
                   tooltip="Products"
                >
                  <Link href="/admin/products">
                    <Package />
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/admin/orders")}
                   tooltip="Orders"
                >
                  <Link href="/admin/orders">
                    <ShoppingBag />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="flex items-center p-4 border-b">
                <SidebarTrigger />
                <h1 className="font-headline text-2xl ml-4">Admin Panel</h1>
            </header>
            <div className="p-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
