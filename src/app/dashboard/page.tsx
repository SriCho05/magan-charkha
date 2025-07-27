
"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrdersByUserId } from "@/lib/actions/order-actions";
import { Order } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function OrderHistory({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <CardDescription>You have not placed any orders yet.</CardDescription>
        )
    }

    return (
        <div className="rounded-lg border mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium text-primary">#{order.id.slice(0, 7)}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>₹{order.total.toFixed(2)}</TableCell>
                            <TableCell><Badge variant={order.status === 'Delivered' ? 'outline' : 'secondary'}>{order.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    
    if (user) {
        const fetchOrders = async () => {
            setOrdersLoading(true);
            const userOrders = await getOrdersByUserId(user.uid);
            setOrders(userOrders);
            setOrdersLoading(false);
        }
        fetchOrders();
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-headline font-bold">My Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
      <div className="space-y-8">
        <Card>
            <CardHeader>
            <CardTitle>Welcome, {user.displayName || user.email}</CardTitle>
            <CardDescription>
                This is your personal dashboard. You can view your recent orders and manage your account details here.
            </CardDescription>
            </CardHeader>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>My Order History</CardTitle>
            </CardHeader>
            <CardContent>
                {ordersLoading ? <p>Loading orders...</p> : <OrderHistory orders={orders} />}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
