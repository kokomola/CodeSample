/* eslint-disable camelcase */
import { ResultFail } from '@store/api/types';
import { ShopDomain } from '@store/app';
import {
  CreateFeaturedListPayload,
  Product,
  ProductColor,
  ProductOption,
} from '@store/shop/types';
import { log } from '@utils/debug';
import { checkImageURL } from '@utils/imgUtil';
import { createRef, RefObject } from 'react';
import { ScrollView } from 'react-native';

export type SelectedPayload = {
  product?: Product;
  colorId?: number;
  optionId?: number;
};

export const $selectedProduct = ShopDomain.createStore<Product | null>(null);
export const changeProduct = ShopDomain.createEvent<Product | null>();
export const selectProduct = ShopDomain.createEvent<{
  id: Product['id'];
  colorId?: ProductColor['id'];
  optionId?: ProductOption['id'];
}>();

export const $validImgs = ShopDomain.createStore<string[]>([]);
export const checkImgsFx = ShopDomain.createEffect<string[], string[]>();

export const $images = $selectedProduct.map((product) => {
  if (!product) return [];
  const {
    picture_mobile,
    picture,
    images_mobile: smallImgs,
    images: bigImgs,
  } = product;
  let imgs = smallImgs?.length ? smallImgs : bigImgs;
  const mainImg = picture_mobile || picture;
  if (mainImg) {
    imgs = [mainImg, ...imgs];
  }
  return imgs;
});

export const $selectedColorId = ShopDomain.createStore<
  ProductColor['id'] | null
>(null);
export const selectColorId = ShopDomain.createEvent<
  ProductColor['id'] | null
>();

export const $selectedOptionId = ShopDomain.createStore<
  ProductOption['id'] | null
>(null);

export const selectOptionId = ShopDomain.createEvent<
  ProductOption['id'] | null
>();

export type ScrollViewRef = RefObject<ScrollView>;

const ref = createRef<ScrollView>();

export const $scrollViewRef = ShopDomain.createStore<ScrollViewRef>(ref);

export const scrollToTopFx = ShopDomain.createEffect<ScrollViewRef, void>();
/** Featured products */
// dev
export const $featured = ShopDomain.createStore<Product[]>([]);
export const createFeaturedListFx = ShopDomain.createEffect<
  CreateFeaturedListPayload,
  Product[],
  ResultFail
>();
