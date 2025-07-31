
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Order } from '@/lib/types';
import { getAllOrders, updateOrderStatus } from '@/lib/actions/order-actions';
import { useToast } from '@/hooks/use-toast';
import { processRefund } from '@/lib/actions/refund-actions';

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'Pending':
      return 'default';
    case 'Shipped':
      return 'secondary';
    case 'Delivered':
      return 'outline';
    case 'Refund Requested':
      return 'destructive';
    case 'Refunded':
      return 'default';
    default:
      return 'default';
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const allOrders = await getAllOrders();
    setOrders(allOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await updateOrderStatus(orderId, status);
      toast({ title: 'Success', description: `Order status updated to ${status}.` });
      fetchOrders(); // Refresh the list
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update order status.',
        variant: 'destructive',
      });
    }
  };

  const handleProcessRefund = async (orderId: string, outcome: 'Approved' | 'Rejected') => {
     try {
      await processRefund(orderId, outcome);
      toast({ title: 'Success', description: `Refund has been ${outcome.toLowerCase()}.` });
      fetchOrders(); // Refresh the list
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process refund.',
        variant: 'destructive',
      });
    }
  }

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-headline font-bold">Orders</h1>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(0, 7)}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {order.status === 'Pending' && (
                        <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Shipped')}>
                          Mark as Shipped
                        </DropdownMenuItem>
                      )}
                      {order.status === 'Shipped' && (
                         <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Delivered')}>
                          Mark as Delivered
                        </DropdownMenuItem>
                      )}
                      {order.status === 'Refund Requested' && (
                        <>
                            <DropdownMenuItem onClick={() => handleProcessRefund(order.id, 'Approved')}>
                                Approve Refund
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleProcessRefund(order.id, 'Rejected')}>
                                Reject Refund
                            </DropdownMenuItem>
                        </>
                      )}
                       <DropdownMenuItem disabled>View Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
