/* eslint-disable camelcase */

import { ProductColor, ProductOption, ShopCategory } from '@store/shop/types';

export type Order = {
  address: string;
  cancel_reason: string;
  comment: string;
  createdAt: string;
  id: number;
  is_refunded: boolean;
  order_products: OrderProducts[];
  phone: string;
  recipient: string;
  status: 'new' | 'processing' | 'approved' | 'cancelled' | 'shipping' | 'done';
  products: OrderProduct[];
  total_price: string;
  tracking_link: string;
  tracking_number: string;
};

export type OrderProducts = {
  ProductColor: ProductColor;
  ProductOption: ProductOption;
  color: number;
  createdAt: string;
  deletedAt: string;
  id: number;
  option: number;
  order_id: number;
  price: number;
  product: OrderProduct;
  product_id: number;
  quantity: number;
  updatedAt: string;
};

export type OrderProduct = {
  ShopCategory: ShopCategory;
  all_description: string;
  brand: number;
  category: number;
  certificate_type: string;
  createdAt: string;
  description: string;
  featured: boolean;
  html_title: string;
  id: number;
  images: string[];
  images_by_color: any;
  is_vip: boolean;
  picture: string;
  picture_mobile: string;
  price: string;
  price_usdt: string;
  prices: any;
  recommended_category: string;
  seller_id: number;
  title: string;
};

export type FilteredOrdersPayload = Order['status'];
