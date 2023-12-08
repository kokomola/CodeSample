import { Order, FilteredOrdersPayload } from './types';

import { ResponseDone, ResultFail } from '@store/api/types';
import { createGate } from 'effector-react';
import { ShopDomain } from '@store/app';

export const $ordersHistory = ShopDomain.createStore<Order[]>([]);
export const $filteredOrders = ShopDomain.createStore<Order[]>([]);

/** Fetch orders */

export const historyGate = createGate();
export const fetchOrdersHistoryFx = ShopDomain.createEffect<
  void,
  ResponseDone<Order[]>,
  ResultFail
>();

/** Filtering orders */

export const filterOrders = ShopDomain.createEvent<FilteredOrdersPayload>();
export const resetOrdersFilter = ShopDomain.createEvent();
