import { apiClient } from './client';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    const { data } = await apiClient.get('/products');
    return data;
  },
};