import { combine } from 'effector';
import { createGate } from 'effector-react';
import { Product, Brand, Category, ResetFiltersPayload } from './types';

import { ResponseDone, ResultFail } from '@store/api/types';
import { fetchBookmarksFx } from '@store/shopFavourites';
import { ShopDomain } from '@store/app';

export const ShopGate = createGate();

/** Products */

export const $products = ShopDomain.createStore<Product[]>([]);
export const $filteredProducts = ShopDomain.createStore<Product[]>([]);

/** Fetch products */

export const fetchProductsFx = ShopDomain.createEffect<
  { search: string } | void,
  Product[],
  ResultFail
>();

/** Categories */

export const $categories = ShopDomain.createStore<Category[]>([]);
export const $filterCategories = ShopDomain.createStore<Category['id'][]>([]);

export const selectCategoryEvent = ShopDomain.createEvent<{
  id: Category['id'];
  selected: boolean;
}>();

/** Fetch categories */

export const fetchCategoriesFx = ShopDomain.createEffect<
  void,
  ResponseDone<Category[]>,
  ResultFail
>();

/** Brands */

export const $brands = ShopDomain.createStore<Brand[]>([]);
export const $filterBrands = ShopDomain.createStore<Brand['id'][]>([]);
export const selectBrandEvent = ShopDomain.createEvent<{
  id: Brand['id'];
  selected: boolean;
}>();

/** Fetch Brands */

export const fetchBrandsFx = ShopDomain.createEffect<
  void,
  ResponseDone<Brand[]>,
  ResultFail
>();

/** Prices */

export const $priceInterval = ShopDomain.createStore<number[]>([0, 0]); // values for indicator
export const $filterPrices = $priceInterval.map((state) => {
  const [minPrice, maxPrice] = state;
  return [minPrice, maxPrice]; // set starting value
});
export const changePriceFilterEvent = ShopDomain.createEvent<number[]>();

/** Filters */

export const confirmFilters = ShopDomain.createEvent();
export const $isFiltersLoading = combine(
  {
    brands: fetchBrandsFx.pending,
    categories: fetchCategoriesFx.pending,
  },
  ({ brands, categories }) => brands || categories
);
export const resetFilters = ShopDomain.createEvent<ResetFiltersPayload>();

/** gates */

export const productsGate = createGate<void>();
export const filtersGate = createGate<void>();

export const $isDataLoading = combine(
  {
    bookmarks: fetchBookmarksFx.pending,
    products: fetchProductsFx.pending,
    brands: fetchBrandsFx.pending,
    categories: fetchCategoriesFx.pending,
  },
  ({ bookmarks, products, brands, categories }) =>
    bookmarks || products || brands || categories
);

/** shop search */

export const $search = ShopDomain.createStore<string>('');
export const changeSearch = ShopDomain.createEvent<string>();

export const $currentSearchRequest = ShopDomain.createStore<string>('');

export const submitSearch = ShopDomain.createEvent();

export const resetSearch = ShopDomain.createEvent();
