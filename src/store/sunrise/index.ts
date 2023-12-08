/* eslint-disable camelcase */
import { createEffect, combine } from 'effector';
import { createGate } from 'effector-react';

import { bn } from '@utils/numbers/bn';
import { fix } from '@utils/numbers/fix';

import { $userV2 } from '@store/user';
import { SunriseDomain } from '@store/app';

import { getUserProgram } from './helpers';

import { CumulativeDiscounts, SunriseUserData } from './types';
import { ResponseDone } from '@store/api/types';

import { createRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';

/** sunrise program data (icon/level/name/benefits, etc.) */

export const $sunriseProgramData = $userV2.map((user) => {
  const { loyalty_programs } = user;
  return getUserProgram(loyalty_programs);
});

/** sunrise user data (deposit structure, income, activity) */

export const $sunriseUserData = SunriseDomain.createStore<SunriseUserData>({
  activity_stats: {
    activity_progress: 0,

    partnerIncrease: {
      current: {
        kyc: 0,
        light: 0,
        ray: 0,
        shine: 0,
        spark: 0,
        sun: 0,
      },
      max: {
        light: 0,
        ray: 0,
        shine: 0,
        spark: 0,
        sun: 0,
      },
      received: 0,
    },

    solar_condition: 0,

    structureIncrease: {
      current: {
        btc: '0',
        eth: '0',
        usdt: '0',
      },
      max: {
        btc: '0',
        eth: '0',
        usdt: '0',
      },
      received: {
        usdt: '0',
        btc: '0',
        eth: '0',
      },
    },

    total_received: '0',
  },

  deposit_structure: '0',
  partner_structure: '0',
  previous_month_income: {
    usdt: '0',
    solar: '0',
  },
  partners_length: '0',
});

const rewardSolarByStatus: Record<
  'kyc' | 'spark' | 'ray' | 'light' | 'shine' | 'sun',
  number
> = {
  kyc: 1,
  spark: 2,
  ray: 3,
  light: 5,
  shine: 8,
  sun: 13,
};

export const $ambassadorActivityPartnersGrowth = $sunriseUserData.map(
  (data) => {
    return (Object.keys(data.activity_stats.partnerIncrease.current) as Array<
      keyof typeof data.activity_stats.partnerIncrease.current
    >).map((structure) => {
      const max =
        structure === 'kyc'
          ? '0'
          : String(data.activity_stats.partnerIncrease.max[structure]);
      const current = String(
        data.activity_stats.partnerIncrease.current[structure]
      );
      const diffBN = bn(current).minus(bn(max));
      const diff = diffBN.toString();
      const received = diffBN.gt(0)
        ? diffBN.multipliedBy(rewardSolarByStatus[structure]).toString()
        : '0';
      const name =
        structure === 'kyc'
          ? 'KYC'
          : structure.charAt(0).toUpperCase() + structure.slice(1);

      return {
        name,
        max,
        current,
        diff,
        received,
      };
    });
  }
);

export const $ambassadorActivityMoneyGrowth = $sunriseUserData.map((data) => {
  return (Object.keys(data.activity_stats.structureIncrease.max) as Array<
    keyof typeof data.activity_stats.structureIncrease.max
  >).map((currency) => {
    const max = fix(data.activity_stats.structureIncrease.max[currency], {
      currency,
    });
    const current = fix(
      data.activity_stats.structureIncrease.current[currency],
      { currency }
    );
    const diff = bn(current).minus(bn(max)).toString();
    const received = data.activity_stats.structureIncrease.received[currency];

    return {
      name: currency.toUpperCase(),
      max,
      current,
      diff,
      received,
    };
  });
});

export const fetchSunriseUserDataFx = SunriseDomain.createEffect<
  void,
  SunriseUserData
>();

/** sunrise cumulative discounts */

export const $cumulativeDiscounts = SunriseDomain.createStore<
  CumulativeDiscounts
>([
  {
    account_id: 0,
    amount: '0',
    product: 'Amir Smart',
  },
]);

export const fetchCumulativeDiscountsFx = createEffect<
  void,
  ResponseDone<CumulativeDiscounts>
>();

/** sunrise pending screen */

export const $isLoading = combine(
  {
    cumulativeDiscounts: fetchCumulativeDiscountsFx.pending,
    sunriseUserInfo: fetchSunriseUserDataFx.pending,
  },
  ({ cumulativeDiscounts, sunriseUserInfo }) =>
    cumulativeDiscounts || sunriseUserInfo
);

/*gate for fetching data */

export const sunriseGate = createGate<void>();

/** sunrise profile info bottom sheet */

export const sunrisePorfileInfoBottomSheetRef = createRef<BottomSheet>();

export const openSunriseProfileInfoBottomSheet = SunriseDomain.createEffect();

export const closeSunriseProfileInfoBottomSheetFx = SunriseDomain.createEffect<
  void,
  void
>();

/** logs */
