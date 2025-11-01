"use client";

import { useState } from 'react';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { CreateOrderDialog } from '@/components/orders/CreateOrderDialog';
import { SearchBox } from '@/components/orders/SearchBox';
import { Pagination } from '@/components/orders/Pagination';
import { useOrders } from '@/hooks/useOrders';
import { CreateOrderRequest } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error, createOrder } = useOrders({
    page: currentPage,
    limit: 10,
    search: searchQuery || undefined,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateOrder = async (orderData: CreateOrderRequest) => {
    await createOrder(orderData);
  };

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              Error loading orders: {error}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            View and manage all orders
          </p>
        </div>
        <CreateOrderDialog onCreateOrder={handleCreateOrder} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchBox onSearch={handleSearch} />
        </CardContent>
      </Card>

      <OrdersTable orders={data?.orders || []} loading={loading} />

      {data?.pagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {((data.pagination.page - 1) * data.pagination.limit) + 1} to{' '}
            {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
            {data.pagination.total} orders
          </div>
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}