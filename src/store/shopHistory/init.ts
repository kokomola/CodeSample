import { forward, sample } from 'effector';
import {
  $ordersHistory,
  fetchOrdersHistoryFx,
  $filteredOrders,
  filterOrders,
  resetOrdersFilter,
  historyGate,
} from './index';

import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';

$ordersHistory.on(fetchOrdersHistoryFx.doneData, (_, response) =>
  response.data.data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
);

$filteredOrders.on($ordersHistory, (_, result) => result);

/*********** Fetch order history *********/

forward({
  from: historyGate.open,
  to: fetchOrdersHistoryFx,
});

fetchOrdersHistoryFx.use(() => {
  const method = 'get';
  const url = endpoints.shop.ordersHistory;

  return signedRequest({ method, url });
});

/******** Filter orders by status *********/

sample({
  source: $ordersHistory,
  clock: filterOrders,
  fn: (orders, status) => orders.filter((product) => product.status === status),
  target: $filteredOrders,
});

sample({
  source: $ordersHistory,
  clock: resetOrdersFilter,
  fn: (orders) => orders,
  target: $filteredOrders,
});
