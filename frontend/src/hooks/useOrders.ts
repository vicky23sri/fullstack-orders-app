import { useState, useEffect } from 'react';
import { ordersApi, OrdersResponse, CreateOrderData } from '@/lib/api/orders';

export const useOrders = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ordersApi.getOrders(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [params?.page, params?.limit, params?.search]);

  const createOrder = async (orderData: CreateOrderData) => {
    try {
      const newOrder = await ordersApi.createOrder(orderData);
      // Refresh orders after creating
      await fetchOrders();
      return newOrder;
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchOrders,
    createOrder,
  };
};