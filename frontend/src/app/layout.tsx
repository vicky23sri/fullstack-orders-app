import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { 
  Menu, 
  Home, 
  ShoppingBag 
} from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orders Management System",
  description: "A full-stack orders management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              {/* Left: Logo with Icon - Clickable to Home */}
              <Link href="/" className="flex items-center space-x-3 hover:no-underline focus:no-underline">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="hidden md:flex text-xl font-bold text-gray-900">Orders App</h1>
              </Link>

              {/* Center: Desktop Navigation with Icons */}
              <nav className="flex items-end space-x-8">
                <a href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
                <a href="/orders" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Orders</span>
                </a>
              </nav>
            </nav>
          </div>
        </header>

        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}