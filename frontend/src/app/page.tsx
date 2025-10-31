"use client";

import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { data: ordersData, loading: ordersLoading } = useOrders({ limit: 5 });
  const { data: products, loading: productsLoading } = useProducts();

  const totalOrders = ordersData?.pagination?.total || 0;
  const totalProducts = products?.length || 0;
  const recentOrders = ordersData?.orders || [];

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Active Customers",
      value: 3,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Revenue",
      value: recentOrders
        .reduce((sum, order) => sum + parseFloat(order.total), 0)
        .toFixed(2),
      prefix: "$",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-10">
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Welcome back! Here’s your latest store overview.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-100"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">
                {stat.title}
              </CardTitle>
              <div
                className={`p-2 rounded-xl ${stat.bg} ${stat.color} shadow-sm`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight text-gray-900">
                {stat.prefix}
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Section */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Orders */}
        <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Recent Orders
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            {ordersLoading ? (
              <div className="text-center py-6 text-gray-500">Loading...</div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.user?.name || "Guest"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">${parseFloat(order.total).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent orders found.
              </p>
            )}

            <div className="mt-6">
              <Link href="/orders">
                <Button className="w-full flex items-center cursor-pointer justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl h-11">
                  <ShoppingCart className="h-4 w-4" />
                  View All Orders
                </Button>
              </Link> 
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Quick Actions
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {/* Manage Orders */}
            <Link href="/orders">
              <Button className="w-full flex items-center cursor-pointer justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl h-11">
                <ShoppingCart className="h-4 w-4" />
                Manage Orders
              </Button>
            </Link>

            {/* Manage Products */}
            <div className="w-full mt-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled
              >
                <Package className="h-4 w-4 text-gray-500" />
                Manage Products (Coming Soon)
              </Button>
            </div>

            {/* Manage Customers */}
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled
              >
                <Users className="h-4 w-4 text-gray-500" />
                Manage Customers (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}