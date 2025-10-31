"use client";

import { useState } from "react";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { SearchBox } from "@/components/orders/SearchBox";
import { Pagination } from "@/components/orders/Pagination";
import { useOrders } from "@/hooks/useOrders";
import { CreateOrderRequest } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShoppingCart, Search } from "lucide-react";

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error, createOrder } = useOrders({
    page: currentPage,
    limit: 5, // ✅ Only 5 orders per page
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
      <div className="container mx-auto py-12">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center text-red-600 font-medium">
            Error loading orders: {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* ====== PAGE HEADER ====== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </span>
            Orders
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all customer orders from one place.
          </p>
        </div>
        <CreateOrderDialog onCreateOrder={handleCreateOrder} />
      </div>

      {/* ====== SEARCH SECTION ====== */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-md">
              <Search className="w-4 h-4" />
            </span>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Search Orders
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Find orders quickly by name, email, or ID.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SearchBox onSearch={handleSearch} />
        </CardContent>
      </Card>

      {/* ====== ORDERS TABLE ====== */}
      <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-all">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Orders Overview
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Showing the latest customer orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <OrdersTable orders={data?.orders || []} loading={loading} />
        </CardContent>
      </Card>

      {/* ====== PAGINATION ====== */}
      {data?.pagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {(data.pagination.page - 1) * data.pagination.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-800">
              {Math.min(
                data.pagination.page * data.pagination.limit,
                data.pagination.total
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-800">
              {data.pagination.total}
            </span>{" "}
            orders
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
