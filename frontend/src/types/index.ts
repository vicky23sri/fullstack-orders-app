import { apiClient } from '../lib/api/client';


export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  total: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
}

// ... other types

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
  };
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateOrderData {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

// Helper function to ensure status is properly typed
function normalizeOrderStatus(status: string): OrderStatus {
  const upperStatus = status.toUpperCase();
  const validStatuses: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
  
  return validStatuses.includes(upperStatus as OrderStatus) 
    ? (upperStatus as OrderStatus) 
    : "PENDING";
}

// Helper function to transform API response
function transformOrder(rawOrder: any): Order {
  return {
    ...rawOrder,
    status: normalizeOrderStatus(rawOrder.status)
  };
}

export const ordersApi = {
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<OrdersResponse> => {
    const { data } = await apiClient.get('/orders', { params });
    
    return {
      ...data,
      orders: data.orders.map(transformOrder)
    };
  },

  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const { data } = await apiClient.post('/orders', orderData);
    return transformOrder(data);
  },
};

export interface CreateOrderRequest {
  userId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}