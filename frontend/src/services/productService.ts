import apiClient from './api';
import type { Product } from '@app-types/index';
import { products as fallbackProducts } from '@data/products';

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.warn('No se pudo obtener productos del backend, usando datos locales:', error);
    return fallbackProducts;
  }
}

export async function getProduct(id: string): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}
