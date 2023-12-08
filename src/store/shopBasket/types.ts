/* eslint-disable camelcase */

import { ProductColor, ProductOption } from '@store/shop/types';

export type BasketItem = {
  id: number;
  product_id: number;
  title: string;
  option: ProductOption['id'];
  option_name: string;
  color: ProductColor['id'];
  color_title: string;
  color_name: string;
  color_image: string;
  quantity: number;
  seller_id: number;
  category_name: string;
  picture: string;
  price: number;
  total_price: number;
  total_price_by_seller_id: number;
};
