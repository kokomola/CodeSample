import { forward } from 'effector';
import i18n from '@utils/i18n';

import { endpoints } from '@constants/endpoints';
import { showSuccess } from '@store/alert';
import { signedRequest } from '@utils/agent';

import { fetchUserFx } from '@store/user';
import { agreeAmbassadorTerms, agreeAmbassadorTermsFx } from './index';

import {
  initBottomSheet,
  resetBottomSheet,
  closeBottomSheet,
} from '@store/bottomSheet';

import {
  blurAmbassadorLandingScreen,
  focusAmbassadorLandingScreen,
  redirectToHome,
} from '@store/app';

/** bottomSheet initialization */

forward({
  from: focusAmbassadorLandingScreen,
  to: initBottomSheet,
});

forward({
  from: blurAmbassadorLandingScreen,
  to: [resetBottomSheet, closeBottomSheet],
});

/** agree Ambassador terms */

forward({
  from: agreeAmbassadorTerms,
  to: agreeAmbassadorTermsFx,
});

agreeAmbassadorTermsFx.use(() => {
  const method = 'post';
  const url = endpoints.sunrise.agreeAmbassador;
  const body = { ambassador_agree: true };

  return signedRequest({ method, url, body });
});

forward({
  from: agreeAmbassadorTermsFx.doneData,
  to: [
    redirectToHome,
    fetchUserFx,
    showSuccess.prepend(() => ({
      title: i18n.t('SunriseStore:joinedAmbassadorTitle'),
      message: i18n.t('SunriseStore:joinedAmbassadorMessage'),
    })),
  ],
});
