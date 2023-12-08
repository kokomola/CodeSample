// export const $hasTokenCred = $creds.map(({ token }) => Boolean(token));

import { forward, guard } from 'effector';
import { signedRequest } from '@utils/agent';
import { focusKycScreen } from '@store/app';
import {
  $screeningStatus,
  $screeningToken,
  fetchScreeningStatusFx,
  fetchScreeningTokenFx,
  finishKycCheck,
} from './index';
import { endpoints } from '@constants/endpoints';
import { ScreeningStatus } from './types';
import { routes } from 'src/navigator/routes';
import { redirectToScreenFx } from '@store/redirect';
import { logline } from '@utils/debug';

$screeningToken.on(fetchScreeningTokenFx.doneData, (_, { data }) => data?.data);

fetchScreeningTokenFx.use(() => {
  const method = 'get';
  const url = endpoints.kyc.getScreeningToken;

  return signedRequest({ method, url });
});

$screeningStatus.on(
  fetchScreeningStatusFx.doneData,
  (_, { data }) => data?.data?.status || ScreeningStatus.Initiated
);

fetchScreeningStatusFx.use(() => {
  const method = 'get';
  const url = endpoints.kyc.getScreeningStatus;

  return signedRequest({ method, url });
});

/** Initiate */

forward({
  from: focusKycScreen,
  to: fetchScreeningTokenFx,
});

guard({
  clock: [focusKycScreen, finishKycCheck, $screeningToken.updates],
  source: $screeningToken,
  filter: (screening_token) => !!screening_token,
  target: fetchScreeningStatusFx,
});

/** Finished */

forward({
  from: finishKycCheck,
  to: redirectToScreenFx.prepend(() => ({ screen: routes.tabs.AmirWallet })),
});

/** Debug */

/* $screeningToken.watch((token) => logline('[$screeningToken]', token));
$screeningStatus.watch((status) => logline('[$screeningStatus]', status)); */
/*$isVerifiedKyc.watch((isVerifiedKyc) => logline('', { isVerifiedKyc }));
$isPassedKyc.watch((isPassedKyc) => logline('', { isPassedKyc }));
$needToKyc.watch((needToKyc) => logline('', { needToKyc }));
$isInProcess.watch((isInProcess) => logline('', { isInProcess })); */
