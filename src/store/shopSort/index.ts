import { ShopDomain } from '@store/app';
import { Product } from '@store/shop/types';
import { SortMethod } from './types';

export const $sortMethod = ShopDomain.createStore(SortMethod.Default);

export const submitSort = ShopDomain.createEvent<SortMethod>();

//export const sortProducts = shopDomain.createEvent<Product[]>();

export const sortProductsFx = ShopDomain.createEffect<
  { products: Product[]; method: SortMethod },
  Product[]
>();

export const redirectToShopFx = ShopDomain.createEffect();
