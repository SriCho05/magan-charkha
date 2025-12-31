
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { requestRefund } from "@/lib/actions/refund-actions";

function RefundDialog({ order, onOpenChange, onRefundRequested }: { order: Order, onOpenChange: (open: boolean) => void, onRefundRequested: () => void }) {
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (reason.trim().length < 10) {
            toast({ title: "Reason required", description: "Please provide a reason of at least 10 characters.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        try {
            await requestRefund(order.id, reason);
            toast({ title: "Success", description: "Your refund request has been submitted." });
            onRefundRequested();
            onOpenChange(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to submit refund request.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog defaultOpen onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Refund for Order #{order.id.slice(0, 7)}</DialogTitle>
                    <DialogDescription>
                        Please provide a reason for your refund request. This will be sent to our admin team for review.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="reason">Reason for Refund</Label>
                        <Textarea
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g., Item was damaged upon arrival..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


function OrderHistory({ orders, onOrderUpdate }: { orders: Order[], onOrderUpdate: () => void }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleRefundClick = (order: Order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    }

    const getStatusVariant = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return 'outline';
            case 'Refund Requested': return 'destructive';
            case 'Refunded': return 'default';
            default: return 'secondary';
        }
    }


    if (orders.length === 0) {
        return (
            <CardDescription>You have not placed any orders yet.</CardDescription>
        )
    }

    return (
        <>
            <div className="rounded-lg border mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium text-primary">#{order.id.slice(0, 7)}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>Rs. {order.total.toFixed(2)}</TableCell>
                                <TableCell><Badge variant={getStatusVariant(order.status)}>{order.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    {order.status === 'Delivered' && (
                                        <Button variant="link" size="sm" onClick={() => handleRefundClick(order)}>Request Refund</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {dialogOpen && selectedOrder && (
                <RefundDialog
                    order={selectedOrder}
                    onOpenChange={setDialogOpen}
                    onRefundRequested={() => {
                        onOrderUpdate();
                        setSelectedOrder(null);
                    }}
                />
            )}
        </>
    )
}


export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    const fetchOrders = async () => {
        if (user) {
            setOrdersLoading(true);
            const userOrders = await getOrdersByUserId(user.id);
            setOrders(userOrders);
            setOrdersLoading(false);
        }
    }

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        fetchOrders();
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
                        <CardTitle>Welcome, {user.user_metadata?.full_name || user.email}</CardTitle>
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
                        {ordersLoading ? <p>Loading orders...</p> : <OrderHistory orders={orders} onOrderUpdate={fetchOrders} />}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
