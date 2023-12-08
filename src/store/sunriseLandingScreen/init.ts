import { forward, guard } from 'effector';
import i18n from '@utils/i18n';

import { showSuccess } from '@store/alert';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';

import { fetchUserFx } from '@store/user';
import { $isJoinedToSunrise, joinSunriseFx } from './index';

import {
  initBottomSheet,
  resetBottomSheet,
  closeBottomSheet,
} from '@store/bottomSheet';

import {
  blurSunriseLandingScreen,
  focusSunriseLandingScreen,
  redirectToHome,
} from '@store/app';
import { agreeSunriseTermsFx } from '@store/sunrise/agreement';

/** bottomSheet initialization */

forward({
  from: focusSunriseLandingScreen,
  to: initBottomSheet,
});

forward({
  from: blurSunriseLandingScreen,
  to: [resetBottomSheet, closeBottomSheet],
});


/** join sunrise after agreeing Sunrise terms */

guard({
  clock: agreeSunriseTermsFx.doneData,
  source: $isJoinedToSunrise,
  filter: (isJoined) => !isJoined,
  target: joinSunriseFx,
});

joinSunriseFx.use(() => {
  console.log('join to sunrise');

  const method = 'post';
  const url = endpoints.sunrise.joinSunrise;
  const body = {}; // "invalid_sign" error without empty body

  return signedRequest({ method, url, body });
});

forward({
  from: joinSunriseFx.doneData,
  to: [
    redirectToHome,
    fetchUserFx,
    showSuccess.prepend(() => ({
      title: i18n.t('SunriseStore:joinedSunriseTitle'),
      message: i18n.t('SunriseStore:joinedSunriseMessage'),
    })),
  ],
});
