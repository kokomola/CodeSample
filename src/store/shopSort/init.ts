import { sample } from 'effector';
import * as D from 'date-fns';
import {
  $sortMethod,
  redirectToShopFx,
  sortProductsFx,
  submitSort,
} from './index';
import { $filteredProducts } from '@store/shop';

import { SortFunction, SortMethod } from './types';
import * as RootNavigation from '../../navigator/RootNavigation';
import { logline } from '@utils/debug';

$sortMethod.on(submitSort, (_, method) => method);
//.watch((s) => logline('sortMethod', s));

sample({
  clock: submitSort,
  source: $filteredProducts,
  fn: (products, method) => ({ products, method }),
  target: [sortProductsFx, redirectToShopFx],
});

sortProductsFx.use(({ products, method }) => {
  const sortFns: { [key: string]: SortFunction } = {
    [SortMethod.Default]: (a, b) => +b.total_orders - +a.total_orders,
    [SortMethod.Novelty]: (a, b) => D.compareDesc(a.createdAt, b.createdAt),
    [SortMethod.PriceAsc]: (a, b) => +a.price - +b.price,
    [SortMethod.PriceDesc]: (a, b) => +b.price - +a.price,
    [SortMethod.Featured]: (a, b) =>
      a.is_vip === b.is_vip ? 0 : a.is_vip ? -1 : 1,
  };

  const sorted = products
    .sort(sortFns[method])
    .sort(sortFns[SortMethod.Featured]);
  return [...sorted];
});

redirectToShopFx.use(() => {
  RootNavigation.goBackOrToScreen('ShopList');
});
