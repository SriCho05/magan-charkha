import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to the Khadi Kraft admin panel. Here you can manage your products and orders.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Package className="w-5 h-5" />
              Manage Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Add, edit, or delete products from your store inventory.
            </p>
            <Button asChild>
              <Link href="/admin/products">Go to Products</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ShoppingBag className="w-5 h-5" />
              Manage Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View customer orders and manage their fulfillment status.
            </p>
            <Button asChild>
              <Link href="/admin/orders">Go to Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
