import { forward, sample } from 'effector';
import {
  $brands,
  $categories,
  $filterBrands,
  $filterCategories,
  $filteredProducts,
  $filterPrices,
  $products,
  changePriceFilterEvent,
  confirmFilters,
  fetchBrandsFx,
  fetchCategoriesFx,
  fetchProductsFx,
  filtersGate,
  resetFilters,
  $priceInterval,
  submitSearch,
  $search,
  changeSearch,
  resetSearch,
  $currentSearchRequest,
} from './index';
import { FilterParams, Product } from './types';
import { $sortMethod, sortProductsFx } from '@store/shopSort';

import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';

import { productsGate, selectBrandEvent, selectCategoryEvent } from './index';
import { addBookmarkFx, removeBookmarkFx } from '@store/shopFavourites';
import { Platform } from 'react-native';

$products.on(fetchProductsFx.doneData, (_, products) => products);
$filteredProducts.on(sortProductsFx.doneData, (_, products) => products);

/*********** Fetch categories & brands  *********/

$brands.on(fetchBrandsFx.doneData, (_, response) => response.data.data);

$categories.on(fetchCategoriesFx.doneData, (_, response) => response.data.data);

/*********** Filters && sorts  *********/

$filteredProducts.on($products, (_, payload) => payload);
$filteredProducts.on(sortProductsFx.doneData, (_, products) => products);
$filterBrands.on(selectBrandEvent, (state, { selected, id }) =>
  selected ? [...state, id] : state.filter((s) => s !== id)
);

$filterCategories.on(selectCategoryEvent, (state, { selected, id }) =>
  selected ? [...state, id] : state.filter((s) => s !== id)
);

$filterPrices.on(changePriceFilterEvent, (_, payload) => payload);

$priceInterval.on($products, (_, payload) => {
  const endPoint = Math.max(...payload.map((o) => +o.price), 0);
  const startPoint = Math.min(...payload.map((o) => +o.price), 0);

  return [startPoint, endPoint];
});

sample({
  clock: fetchProductsFx.doneData,
  source: $sortMethod,
  fn: (method, products) => ({ products, method }),
  target: sortProductsFx,
});

/*********** Set filters *********/

sample<FilterParams, void, Product[]>({
  source: {
    products: $products,
    brands: $filterBrands,
    categories: $filterCategories,
    prices: $filterPrices,
  },
  clock: [filtersGate.close, confirmFilters],
  fn: ({ products, brands, categories, prices }) => {
    const [minPrice, maxPrice] = prices;

    let filterProducts = products.filter(
      (p: Product) => minPrice <= p.price && maxPrice >= p.price
    );

    if (categories.length > 0) {
      filterProducts = filterProducts.filter((p: Product) => {
        const itemCategories = p.categories.map((c) => c.category_id);
        return categories.some((category: number[]) =>
          itemCategories.includes(category)
        );
      });
    }

    if (brands.length > 0) {
      filterProducts = filterProducts.filter((p: Product) =>
        brands.includes(p.brand)
      );
    }

    return filterProducts;
  },
  target: $filteredProducts,
});

/*********** Reset filters *********/

$filterCategories.reset(resetFilters);
$filterBrands.reset(resetFilters);
$filterPrices.on(resetFilters, (_, payload) => payload);

/*********** Fetch products *********/

forward({ from: productsGate.open, to: fetchProductsFx });

fetchProductsFx.use(async (params) => {
  const method = 'get';
  let url = endpoints.shop.products;

  if (params) {
    const { search = '' } = params;
    url = `/shop/product?search=${encodeURI(search)}`;
  }

  const result = await signedRequest({ method, url });
  // filter restricted items on ios
  const filteredResult = result.data.data.filter((item: Product) =>
    Platform.OS === 'ios' ? !item.hide_on_ios : true
  );

  return filteredResult;
});

/*********** Fetch brands and categories *********/

forward({ from: filtersGate.open, to: [fetchBrandsFx, fetchCategoriesFx] });

fetchBrandsFx.use(async () => {
  const method = 'get';
  const url = endpoints.shop.brands;

  return await signedRequest({ method, url });
});

fetchCategoriesFx.use(async () => {
  const method = 'get';
  const url = endpoints.shop.categories;

  return await signedRequest({ method, url });
});

/*********** Add/remove bookmark  *********/

$products.on(addBookmarkFx.doneData, (state, { product }) => {
  return state.map((oldProduct) => ({
    ...oldProduct,
    bookmark: product.id === oldProduct.id ? true : oldProduct.bookmark,
  }));
});

$products.on(removeBookmarkFx.doneData, (state, id) => {
  return state.map((product) => ({
    ...product,
    bookmark: product.id === id ? false : product.bookmark,
  }));
});

/** search products */

$search.on(changeSearch, (_, productName) => productName);
$search.reset(resetSearch);

sample({
  clock: submitSearch,
  source: $search,
  fn: (productName) => ({
    search: productName,
  }),
  target: fetchProductsFx,
});

forward({
  from: resetSearch,
  to: fetchProductsFx,
});

$currentSearchRequest
  .on(
    sample({
      source: $search,
      clock: fetchProductsFx.doneData,
    }),
    (_, payload) => payload
  )
  .reset(resetSearch);
