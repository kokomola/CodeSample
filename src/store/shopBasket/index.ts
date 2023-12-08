/* eslint-disable camelcase */
import { ResponseDone } from '@store/api/types';
import { ShopDomain } from '@store/app';
import { Product, ProductColor } from '@store/shop/types';
import { BasketItem } from '@store/shopBasket/types';
import { ProductOption } from '@store/shop/types';
import { createGate } from 'effector-react';

export const $basket = ShopDomain.createStore<BasketItem[]>([]);

export const $basketCount = $basket.map((items) => items.length);

export const $basketPrice = $basket.map((basket) =>
  basket.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
);

export const $basketQuantity = $basket.map((basket) =>
  basket.reduce((quantity, item) => quantity + item.quantity, 0)
);

/** Fetch basket */

export const fetchBasketRequestFx = ShopDomain.createEffect<
  void,
  ResponseDone<{
    basket: BasketItem[];
    basketPrice: number;
  }>
>();

/** Change quantity */

export const changeBasket = ShopDomain.createEvent<{
  basket: BasketItem[];
  basketPrice: number;
}>();

export const changeQuantityItem = ShopDomain.createEvent<{
  id: BasketItem['id'];
  quantity: BasketItem['quantity'];
}>();
export const changeQuantityItemRequestFx = ShopDomain.createEffect<
  { id: BasketItem['id']; quantity: BasketItem['quantity'] },
  ResponseDone
>();

/** Add a item */

export const addItem = ShopDomain.createEvent<BasketItem>();
export const addItemToBasket = ShopDomain.createEvent<{
  product_id: Product['id'];
  title: Product['title'];
  quantity?: number;
  option?: ProductOption['id'] | null;
  color?: ProductColor['id'] | null;
}>();
export const addItemToBasketRequestFx = ShopDomain.createEffect<
  {
    title: string;
    product_id: Product['id'];
    quantity: number;
    option: ProductOption['id'] | null;
    color: ProductColor['id'] | null;
  },
  BasketItem
>();

/** Remove a item */

export const removeItemById = ShopDomain.createEvent<BasketItem['id']>();
export const removeItemFromBasket = ShopDomain.createEvent<BasketItem['id']>();
export const removeItemFromBasketRequestFx = ShopDomain.createEffect<
  BasketItem,
  { id: BasketItem['id']; title: BasketItem['title'] }
>();

/** Clear all the items */

export const clearBasket = ShopDomain.createEvent();
export const clearBasketRequestFx = ShopDomain.createEffect();
