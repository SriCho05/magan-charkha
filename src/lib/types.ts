
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Men's Apparel" | "Women's Apparel" | "Home & Living" | "Accessories";
  color: "Green" | "Beige" | "Brown" | "White" | "Black";
  image: string;
  stock: number;
}

export interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
}

export interface RefundDetails {
    reason: string;
    requestedAt: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    processedAt?: string;
}

export interface Order {
  id: string;
  userId: string;
  customer: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Refund Requested" | "Refunded";
  date: string;
  shippingAddress: ShippingAddress;
  refundDetails?: RefundDetails;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
