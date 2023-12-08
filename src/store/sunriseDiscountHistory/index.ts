import { ResponseDone } from '@store/api/types';
import { SunriseDomain } from '@store/app';
import { DiscountProduct, SunriseDiscount } from './types';

// selected discount product

export const $selectedDiscountProduct = SunriseDomain.createStore<
  DiscountProduct
>(DiscountProduct.Smart);

export const selectDiscountProduct = SunriseDomain.createEvent<
  DiscountProduct
>();

// fetch discount history

export const $discountHistory = SunriseDomain.createStore<SunriseDiscount[]>(
  []
);

export const updateDiscountHistory = SunriseDomain.createEvent<
  SunriseDiscount[]
>();

export const fetchDiscountHistoryRequestFx = SunriseDomain.createEffect<
  void,
  ResponseDone<SunriseDiscount[]>
>();

// filtered history by product

export const $smartDiscountHistory = $discountHistory.map((history) =>
  history.filter((h) => h.product === DiscountProduct.Smart)
);
export const $guardDiscountHistory = $discountHistory.map((history) =>
  history.filter((h) => h.product === DiscountProduct.Guard)
);
export const $travelDiscountHistory = $discountHistory.map((history) =>
  history.filter((h) => h.product === DiscountProduct.Travel)
);

// select product

export const $selectedDiscountItem = SunriseDomain.createStore<SunriseDiscount | null>(
  null
);

export const selectDiscountItem = SunriseDomain.createEvent<SunriseDiscount>();
