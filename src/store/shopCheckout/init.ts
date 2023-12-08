import { forward, sample } from 'effector';
import {
  $isOrderInFocus,
  focusOrderInfo,
  $orderInfo,
  changeOrderInfo,
  submitOrderFx,
  submitOrder,
} from './index';
import i18n from '@utils/i18n';
import { showSuccess } from '@store/alert';
import { blurShopCheckoutScreen, redirectToHome } from '@store/app';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';
import { fetchSollar } from '@store/sollars';

$orderInfo.on(changeOrderInfo, (state, { type, value }) => ({
  ...state,
  [type]: value,
}));
$orderInfo.reset(blurShopCheckoutScreen, submitOrderFx.done);

$isOrderInFocus.on(focusOrderInfo, () => true);
$isOrderInFocus.reset(submitOrderFx.done, blurShopCheckoutScreen);

/*********** Submit order ***********/
sample({
  clock: submitOrder,
  source: $orderInfo,
  target: submitOrderFx,
});

submitOrderFx.use(async (orderInfo) => {
  const method = 'post';
  const url = endpoints.shop.createOrder;

  const body = {
    address: `${orderInfo.country}, ${orderInfo.city}, ${orderInfo.street}, ${orderInfo.house} ${orderInfo.apartment}, ${orderInfo.postCode}`,
    recipient: `${orderInfo.userName} ${orderInfo.userSurname} ${orderInfo.patronymic}`,
    phone: orderInfo.phone,
    comment: orderInfo.comments,
  };

  return await signedRequest({ method, url, body });
});

forward({
  from: submitOrderFx.done,
  to: [
    redirectToHome,
    showSuccess.prepend(() => ({
      title: i18n.t('ShopCheckoutStore:successTitle'),
      message: i18n.t('ShopCheckoutStore:successMessage'),
      buttons: [{ text: i18n.t('ShopCheckoutStore:successOk') }],
    })),
    fetchSollar,
  ],
});
