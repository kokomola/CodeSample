import * as React from 'react';
import Carousel from 'react-native-snap-carousel';
import { ShopDomain } from '@store/app';
import {
  BannersObj,
  FetchBannersFxDone,
  FetchBannersFxParams,
} from '@store/shopBanner/types';

export const CarouselRef = React.createRef<Carousel<any>>();

export const $bannersObj = ShopDomain.createStore<BannersObj>(null);
export const $banners = $bannersObj.map((obj) => {
  if (!obj) return null;
  return Object.keys(obj).map((key) => obj[key]);
});

export const fetchBannersFx = ShopDomain.createEffect<
  FetchBannersFxParams,
  FetchBannersFxDone
>();
