export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Apparel" | "Home Decor" | "Accessories";
  color: "Green" | "Beige" | "Brown" | "White" | "Black";
  image: string;
  stock: number;
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
  status: "Pending" | "Shipped" | "Delivered";
  date: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
