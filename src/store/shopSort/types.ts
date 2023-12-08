import { Product } from '@store/shop/types';

export enum SortMethod {
  Default,
  PriceAsc,
  PriceDesc,
  Novelty,
  Featured,
}

export type SortFunction = (a: Product, b: Product) => number;
