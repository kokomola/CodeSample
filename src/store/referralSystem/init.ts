import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import {
  $referralName,
  fetchReferralNameFx,
  generateDynamicLinkFx,
  handlePressShare,
  loadReferralIdFx,
  REFERRAL_ID_STORAGE_KEY,
  saveReferralIdFx,
  shareFx,
  tryToCatchReferralLinkFx,
} from '@store/referralSystem/index';
//import dynamicLinks from '@react-native-firebase/dynamic-links';
import { forward, sample } from 'effector';
import { $referralData } from '@store/referralWeb';
import { Alert, Platform, Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { InitialScreenGate } from '@store/auth';
import {
  $referral,
  $referralDisabled,
  focusSignUpScreen,
} from '@store/signUpForm';
import i18n from '@utils/i18n';
import { logline } from '@utils/debug';

// generate

sample({
  clock: handlePressShare,
  source: $referralData,
  fn: ({ refferal_link: referralLink }) => ({ id: referralLink.split('=')[1] }),
  target: generateDynamicLinkFx,
});

/* generateDynamicLinkFx.use(async ({ id }) => {
  const link = await dynamicLinks().buildShortLink({
    domainUriPrefix: 'https://amirwallet.page.link',
    link: `https://account.amircapital.app/front/auth/sign-up?partner=${id}`,
    ios: {
      bundleId: 'capital.amir.wallet',
      appStoreId: '1498748864',
    },
    android: {
      packageName: 'capital.amir.wallet',
    },
  });

  return { link };
}); */

forward({
  from: generateDynamicLinkFx.doneData,
  to: shareFx,
});

shareFx.use(async ({ link }) => {
  await Share.share(
    Platform.select({
      ios: {
        url: link,
      },
      android: {
        message: `${i18n.t('referralSystem:shareMessage')} \n ${link}`,
      },
      default: {
        message: `${i18n.t('referralSystem:shareMessage')} \n ${link}`,
      },
    }),
  );
});

// handle
forward({
  from: [InitialScreenGate.open, focusSignUpScreen],
  to: loadReferralIdFx,
});

loadReferralIdFx.use(async () => {
  const id = await AsyncStorage.getItem(REFERRAL_ID_STORAGE_KEY);

  if (!id) throw new Error('Cannot find saved referral id');

  return { id };
});

/* forward({
  from: loadReferralIdFx.fail,
  to: tryToCatchReferralLinkFx,
});
 
tryToCatchReferralLinkFx.use(async () => {
  const link = await dynamicLinks().getInitialLink();

  if (!link) throw new Error('Referral link not found');

  return { id: link.url.split('=')[1] };
});

forward({
  from: tryToCatchReferralLinkFx.doneData,
  to: saveReferralIdFx,
}); */

saveReferralIdFx.use(async ({ id }) => {
  // we should remember only first referral id
  const savedId = await AsyncStorage.getItem(REFERRAL_ID_STORAGE_KEY);

  if (!savedId) {
    await AsyncStorage.setItem(REFERRAL_ID_STORAGE_KEY, id);
  }
});

// referral name
forward({
  from: [loadReferralIdFx.doneData, tryToCatchReferralLinkFx.doneData],
  to: fetchReferralNameFx,
});

fetchReferralNameFx.use(async ({ id }) => {
  const method = 'get';
  const url = endpoints.referral.getName(id);
  const response = await signedRequest({ method, url });

  return { name: response.data.data.name };
});

$referral
  .on(loadReferralIdFx.doneData, (_, { id }) => id)
  .on(tryToCatchReferralLinkFx.doneData, (_, { id }) => id);

$referralName.on(fetchReferralNameFx.doneData, (_, { name }) => name);

$referralDisabled.on(fetchReferralNameFx.done, () => true);

// debug

//$referral.watch((link) => Alert.alert('$referral for request', link));
