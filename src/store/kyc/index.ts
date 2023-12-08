import { AxiosError } from 'axios';
import { KycDomain } from '@store/app';
import { ScreeningStatus } from './types';
import { ResponseDone } from '@store/api/types';
import { combine } from 'effector';

/** Work with tokens */
export const $screeningToken = KycDomain.createStore<string | null>(null);

export const verifyKycEvent = KycDomain.createEvent();

export const fetchScreeningTokenFx = KycDomain.createEffect<
  void,
  ResponseDone<string>,
  AxiosError
>();

export const finishKycCheck = KycDomain.createEvent();

/*** Work with status */

export const $screeningStatus = KycDomain.createStore<ScreeningStatus | null>(
  null
);

export const fetchScreeningStatusFx = KycDomain.createEffect<
  void,
  ResponseDone<{ status: ScreeningStatus }>
>();

export const $isInProcess = $screeningStatus.map(
  (status) => status === ScreeningStatus.Processing
);

export const $detectingKyc = combine(
  {
    kycStatus: fetchScreeningStatusFx.pending,
    gettingScreeningToken: fetchScreeningTokenFx.pending,
  },
  ({ kycStatus, gettingScreeningToken }) => kycStatus || gettingScreeningToken
);
