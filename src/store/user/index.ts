import { attach, combine, createEffect } from 'effector';
import { SyntheticEvent } from 'react';
import { AxiosRequestParams } from '@store/api';
import { Course, NormalizedCourses, User, User2 } from '@store/user/types';
import { AppDomain } from '@store/app';
import { $screeningStatus } from '@store/kyc';
import { userInitialValues, userInitialValuesV2 } from './defaultUser';
import { AxiosResponse, AxiosError } from 'axios';

export const POLLING_INTERVAL = 30000;

export const $user = AppDomain.createStore<User>(userInitialValues);

export const $courses = AppDomain.createStore<NormalizedCourses>({
  btc: {
    btc: '1',
    eth: '0',
    usdt: '0',
  },
  eth: {
    btc: '0',
    eth: '1',
    usdt: '0',
  },
  usdt: {
    btc: '0',
    eth: '0',
    usdt: '1',
  },
});

export const $isVerifiedKyc = $user.map(({ is_verified }) => is_verified);

/** KYC */

export const $isPassedKyc = combine(
  $isVerifiedKyc,
  $screeningStatus,
  (isVerified, status) =>
    !!isVerified /* && status === ScreeningStatus.Accepted */
);

export const $isGlobalPassedKyc = combine(
  $isVerifiedKyc,
  $screeningStatus,
  (isVerified, status) =>
    !!isVerified /*&& status === ScreeningStatus.Accepted*/
);

export const $needToKyc = $isGlobalPassedKyc.map((isPassed) => !isPassed);

/* KYC & 2fa */

export const $userHas2faSecurityAlert = $user.map((user) => {
  if (user.twofa_status === null) return false;
  return user.twofa_status !== 'enabled';
});

export const $userHasSecurityAlert = combine(
  // $isPassedKyc,
  $userHas2faSecurityAlert,
  (tfa) => tfa
);

export const $isTwoFa = $userHas2faSecurityAlert.map((hasAlert) => !hasAlert);

export const $isVerifiedAnd2fa = combine(
  $isVerifiedKyc,
  $isTwoFa,
  (isKyc, isTwoFa) => isKyc && isTwoFa
);

export const redirectKycSetupFx = AppDomain.createEffect<
  SyntheticEvent,
  void
>();
export const redirect2faSetupFx = AppDomain.createEffect<
  SyntheticEvent,
  void
>();

export const fetchUserFx = AppDomain.createEffect<
  void,
  AxiosResponse<{ data: User }>,
  AxiosError
>();
export const pollUserFx = attach({ effect: fetchUserFx });

export const startUserPolling = pollUserFx.prepend(
  (payload: AxiosRequestParams) => payload
);
export const stopUserPolling = AppDomain.createEvent();
export const delayBetweenUserPollsFx = AppDomain.createEffect();

export const normalizeCoursesFx = AppDomain.createEffect<
  Course,
  NormalizedCourses
>();

// ===== TO DO - v2 url ======
export const $userV2 = AppDomain.createStore<User2>(userInitialValuesV2);

export const fetchUserV2Fx = createEffect<unknown, User2, AxiosError>();

/* ========================= */

// logs
