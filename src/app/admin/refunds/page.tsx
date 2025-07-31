
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
import { getAllOrders } from '@/lib/actions/order-actions';
import { useToast } from '@/hooks/use-toast';
import { processRefund } from '@/lib/actions/refund-actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'Refund Requested':
      return 'destructive';
    case 'Refunded':
      return 'default';
    default:
      return 'secondary';
  }
};

export default function AdminRefundsPage() {
  const [refundOrders, setRefundOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    const allOrders = await getAllOrders();
    const filteredOrders = allOrders.filter(o => o.status === 'Refund Requested' || o.status === 'Refunded');
    setRefundOrders(filteredOrders);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
    return <p>Loading refund requests...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-headline font-bold">Refund Management</h1>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refundOrders.length > 0 ? refundOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.slice(0, 7)}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.refundDetails?.requestedAt ? new Date(order.refundDetails.requestedAt).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell className="max-w-xs truncate">{order.refundDetails?.reason}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {order.status === 'Refund Requested' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleProcessRefund(order.id, 'Approved')}>
                              Approve Refund
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleProcessRefund(order.id, 'Rejected')}>
                              Reject Refund
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            )) : (
                 <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        No refund requests found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
