import { Database } from './database.types';

// Utility types for accessing database schema types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// Define `Product` type based on your database schema
export type Product = Tables<'products'>;

// Define `PizzaSize` as a union of string literals
export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

// Define `CartItem` for the cart system
export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

// List of possible order statuses
export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

// Define possible values for `OrderStatus`
export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

// Define `Order` type with related `order_items`
export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];  // Optional related order items
};

// Define `OrderItem` type with `Product` relationship
export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;  // Relationship to `Product`
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

// Define `Profile` type based on your database schema
export type Profile = Tables<'profiles'>;
