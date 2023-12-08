import React from 'react';
import { combine } from 'effector';
import { OrderInfo } from './types';
import { ShopOrderTextFieldProps } from '../../components/ShopCheckoutTextField/types';
import { ShopDomain } from '@store/app';
import { ResponseDone, ResponseFail } from '@store/api/types';

export const $orderInfo = ShopDomain.createStore<OrderInfo>({
  userName: '',
  userSurname: '',
  patronymic: '',
  phone: '',
  country: '',
  city: '',
  postCode: '',
  street: '',
  comments: '',
  house: '',
  apartment: '',
});

/** Change input */

export const $isOrderInFocus = ShopDomain.createStore<boolean>(false);
export const focusOrderInfo = ShopDomain.createEvent<React.SyntheticEvent>();
export const changeOrderInfo = ShopDomain.createEvent<{
  type: ShopOrderTextFieldProps['type'];
  value: string;
}>();

/** Submit order */

export const submitOrder = ShopDomain.createEvent();
export const submitOrderFx = ShopDomain.createEffect<
  OrderInfo,
  ResponseDone<{ code: 'ok' }>,
  ResponseFail
>();

/** Inputs validation errors */

export const $recipientInfoErrors = combine(
  {
    requiredSenderInfo: combine($orderInfo, (orderInfo: OrderInfo) => {
      const { userName, userSurname, phone } = orderInfo;

      if (!userSurname) return 'ShopCheckoutStore:requiredSurname';
      if (!userName) return 'ShopCheckoutStore:requiredName';
      if (!phone || phone.length < 3) return 'ShopCheckoutStore:requiredPhone';

      return null;
    }),
  },
  ({ requiredSenderInfo }) => [requiredSenderInfo].filter(Boolean)
);

export const $recipientAddressErrors = combine(
  {
    requiredAddressInfo: combine($orderInfo, (orderInfo: OrderInfo) => {
      const { country, city, street, postCode, house } = orderInfo;

      if (!country) return 'ShopCheckoutStore:requiredCountry';
      if (!city) return 'ShopCheckoutStore:requiredCity';
      if (!street) return 'ShopCheckoutStore:requiredStreet';
      if (!postCode) return 'ShopCheckoutStore:requiredPostCode';
      if (!house) return 'ShopCheckoutStore:requiredHouse';

      return null;
    }),
  },
  ({ requiredAddressInfo }) => [requiredAddressInfo].filter(Boolean)
);

export const $isFormValid = combine(
  [$recipientInfoErrors, $recipientAddressErrors],
  (errors) => !errors.flat().length
);
