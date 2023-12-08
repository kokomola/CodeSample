import { closeBS } from './../bottomSheetCommon/index';
/* eslint-disable camelcase */
import { forward } from 'effector';
import { lastDayOfMonth, format } from 'date-fns';

import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { blurSunriseProgramScreen } from '@store/app';

import { sunriseGate } from './index';
import {
  $cumulativeDiscounts,
  $sunriseUserData,
  fetchCumulativeDiscountsFx,
  fetchSunriseUserDataFx,
} from './index';
import { initScrollViewRef, resetScrollViewRef } from '@store/scrollViewRef';

import {
  closeSunriseProfileInfoBottomSheetFx,
  openSunriseProfileInfoBottomSheet,
  sunrisePorfileInfoBottomSheetRef,
} from './index';

/** fetch sunrise data on main screen */

forward({
  from: sunriseGate.open,
  to: [
    fetchCumulativeDiscountsFx,
    fetchSunriseUserDataFx /* fetchReferralFx */,
  ],
});

/** sunrise cumulative discounts */

$cumulativeDiscounts.on(
  fetchCumulativeDiscountsFx.doneData,
  (_, response) => response.data.data
);

fetchCumulativeDiscountsFx.use(() => {
  const method = 'get';
  const url = endpoints.sunrise.cumulativeDiscount;
  return signedRequest({ method, url });
});

/** sunrise user data (deposit structure, income, activity) */

$sunriseUserData.on(fetchSunriseUserDataFx.doneData, (_, response) => response);

fetchSunriseUserDataFx.use(async () => {
  const method = 'get';
  const resource = endpoints.sunrise.sunriseUserInfo;
  const params = `date=${format(lastDayOfMonth(Date.now()), 'YYYY-MM-DD')}`;
  const url = `${resource}?${params}`;

  const result = await signedRequest({ method, url });

  return result.data;
});

/** sunrise referral data */

// work with sunrise screen view

forward({
  from: sunriseGate.open,
  to: initScrollViewRef,
});

forward({
  from: sunriseGate.close,
  to: resetScrollViewRef,
});

/** sunrise profile info bottom sheet */

forward({
  from: blurSunriseProgramScreen,
  to: closeSunriseProfileInfoBottomSheetFx,
});

openSunriseProfileInfoBottomSheet.use(() => {
  if (sunrisePorfileInfoBottomSheetRef.current) {
    sunrisePorfileInfoBottomSheetRef.current.expand();
  }
});

closeSunriseProfileInfoBottomSheetFx.use(() => {
  if (sunrisePorfileInfoBottomSheetRef.current) {
    sunrisePorfileInfoBottomSheetRef.current.close();
  }
  // use this because common bottom sheet can be opened
  closeBS(); // need delete
});
