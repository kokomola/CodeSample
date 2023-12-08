/* eslint-disable camelcase */
import { BigNumber } from 'bignumber.js';

export type Product = {
  id: number;
  all_description: string;
  bookmark: boolean;
  brand: number | null;
  categories: { category_id: number; ShopCategory: ShopCategory }[];
  category: number | null;
  certificate_type: string; // !
  colors: ProductColor[];
  description: string;
  featured: boolean | null;
  images_by_color: any;
  images: string[];
  images_mobile: string[];
  is_new: boolean; //!
  html_title: string;
  picture_mobile: string | null;
  picture: string;
  price_usdt: BigNumber;
  price: BigNumber;
  prices: [] | null;
  seller_id: number | null;
  title: string;
  total_orders: number;
  recommended_category?: number | null;
  createdAt: Date;
  // new
  is_promo?: boolean;
  is_vip?: boolean; // !
  options: ProductOption[];
  published?: boolean;
  review_comment?: string;
  review_status?: string;
  ShopCategory?: ShopCategory;
  hide_on_ios: boolean;
};

export type Brand = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type ResetFiltersPayload = number[] | void;

export type ProductColor = {
  id: number;
  product_id: number;
  title: string;
  country: string;
  image_url: string;
};

export type ShopCategory = {
  id: number;
  name: string;
};

export type ProductOption = {
  id: number;
  product_id: number;
  image_url: string;
  price: number;
  price_usdt: BigNumber;
  name: string;
  param_name: string | null;
  country: string | null;
};

export type CreateFeaturedListPayload = {
  products: Product[];
  chosenProduct: Product;
};

export type FilterParams = {
  products: Product[];
  categories: number[];
  brands: number[];
  prices: number[];
};
