import { Product } from '@store/shop/types';

export type Bookmark = {
  account_id: number;
  createdAt: string;
  id: number;
  product: Product;
  product_id: number;
  updatedAt: string;
};

export type AddBookmarkFxResponse = {
  id: number;
  product: Product;
  product_id: number;
};
