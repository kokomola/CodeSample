import { endpoints } from '@constants/endpoints';
import { focusSunriseDiscountHistoryScreen } from '@store/app';
import { signedRequest } from '@utils/agent';
import {
  $discountHistory,
  updateDiscountHistory,
  fetchDiscountHistoryRequestFx,
  $selectedDiscountProduct,
  selectDiscountProduct,
  $selectedDiscountItem,
  selectDiscountItem,
} from './index';

import { forward } from 'effector';
import { initChildBS } from '@store/bottomSheetCommon';
//import { log, logline } from '@utils/debug';

$selectedDiscountProduct.on(selectDiscountProduct, (_, product) => product);
//.watch((product) => logline('[selectedProduct]', product));

// discount history

$discountHistory.on(updateDiscountHistory, (_, history) => history);
//.watch((discount) => log('$discountHistory', { discount }));

$selectedDiscountItem.on(selectDiscountItem, (_, item) => item);

forward({
  from: focusSunriseDiscountHistoryScreen,
  to: [
    fetchDiscountHistoryRequestFx,
    initChildBS.prepend(() => ({
      fcKey: 'SunriseDiscountDetail',
      height: 240,
    })),
  ],
});

fetchDiscountHistoryRequestFx.use(() => {
  const method = 'get';
  const url = endpoints.sunrise.fetchDiscountHistory;

  return signedRequest({ method, url });
});

forward({
  from: fetchDiscountHistoryRequestFx.doneData.map(
    (response) => response.data.data
  ),
  to: updateDiscountHistory,
});
