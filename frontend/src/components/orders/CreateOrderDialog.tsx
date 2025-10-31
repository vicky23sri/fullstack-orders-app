"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { CreateOrderRequest } from '@/types';

const orderSchema = z.object({
  userId: z.number().min(1, 'Please select a user'),
  items: z.array(z.object({
    productId: z.number().min(1, 'Please select a product'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })).min(1, 'At least one item is required'),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface CreateOrderDialogProps {
  onCreateOrder: (orderData: CreateOrderRequest) => Promise<void>;
}

// Mock users for demo
const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export function CreateOrderDialog({ onCreateOrder }: CreateOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: products } = useProducts();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{ productId: 0, quantity: 1 }],
    },
  });

  const watchedItems = watch('items');

  const addItem = () => {
    setValue('items', [...watchedItems, { productId: 0, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    if (watchedItems.length > 1) {
      setValue('items', watchedItems.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      setLoading(true);
      await onCreateOrder(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="userId">Customer</Label>
            <Select
              onValueChange={(value) => setValue('userId', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_USERS.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.userId && (
              <p className="text-sm text-red-500 mt-1">{errors.userId.message}</p>
            )}
          </div>

          <div>
            <Label>Order Items</Label>
            <div className="space-y-3 mt-2">
              {watchedItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor={`product-${index}`}>Product</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue(`items.${index}.productId`, parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name} - ${product.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24">
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={watchedItems.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="mt-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            {errors.items && (
              <p className="text-sm text-red-500 mt-1">{errors.items.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}