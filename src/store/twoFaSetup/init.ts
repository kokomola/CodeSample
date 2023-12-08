import { forward, sample, split } from 'effector';
import { Alert } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { blurTwoFaSettingsScreen } from '@store/app';
import {
  $code,
  $codeInFocus,
  $codeTouched,
  $phone,
  $phoneInFocus,
  $phoneTouched,
  $qr,
  $qrShown,
  $secret,
  $step,
  blurCode,
  blurPhone,
  changeCode,
  changePhone,
  copySecretFx,
  disable2faFx,
  enable2faFx,
  enableGoogle2fa,
  enableSms2fa,
  focusCode,
  focusPhone,
  pressCopySecret,
  pressDisable2fa,
  pressQrScanned,
  pressRedirectToKycSetup,
  pressShowQr,
  pressVerifyGoogleCode,
  pressVerifySmsCode,
  pressVerifySmsPhone,
  verifyEnable2faFx,
} from './index';
import { fetchUserFx, fetchUserV2Fx, redirectKycSetupFx } from '@store/user';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { TwoFaType } from './types';
import { showSuccess } from '../alert/index';
import i18n from '@utils/i18n';
import { redirectToScreenFx } from '@store/redirect';
import { routes } from 'src/navigator/routes';

/***  Requests  ***/

enable2faFx.use((body) => {
  const method = 'post';
  const url = endpoints.twoFa.enable;

  return signedRequest({ method, url, body });
});

verifyEnable2faFx.use((body) => {
  const method = 'post';
  const url = endpoints.twoFa.enableVerify;

  return signedRequest({ method, url, body });
});

disable2faFx.use(() => {
  const method = 'post';
  const url = endpoints.twoFa.disable;

  return signedRequest({ method, url /* body: {} */ });
});

/*** Launch requests ***/

// google
forward({
  from: enableGoogle2fa,
  to: enable2faFx.prepend(() => ({ type: TwoFaType.Google })),
});

sample({
  clock: pressVerifyGoogleCode,
  source: $code,
  fn: (code) => ({ code, type: TwoFaType.Google }),
  target: verifyEnable2faFx,
});

// sms
sample({
  clock: pressVerifySmsPhone,
  source: $phone,
  fn: (phone) => ({ phone, type: TwoFaType.Sms }),
  target: enable2faFx,
});

sample({
  clock: pressVerifySmsCode,
  source: $code,
  fn: (code) => ({ code, type: TwoFaType.Sms }),
  target: verifyEnable2faFx,
});

const enable2faFxDone = split(enable2faFx.done, {
  google: ({ params }) => params.type === TwoFaType.Google,
  sms: ({ params }) => params.type === TwoFaType.Sms,
});

// enable response creds
$qr.on(enable2faFxDone.google, (_, { result }) => result.data.data.qrCode);
$secret.on(enable2faFxDone.google, (_, { result }) => result.data.data.secret);

// copy secret to clipboard
sample({
  clock: pressCopySecret,
  source: $secret,
  fn: (secret) => ({ secret }),
  target: copySecretFx,
});

copySecretFx.use(({ secret }) => {
  Clipboard.setString(secret);
});

// show qr
$qrShown.on(pressShowQr, () => true).reset(blurTwoFaSettingsScreen);

// change step
$step
  .reset(blurTwoFaSettingsScreen)
  .reset(disable2faFx.done)
  .on(enable2faFxDone.google, () => 'google_qr')
  .on(pressQrScanned, () => 'google_code')
  .on(enableSms2fa, () => 'sms_phone')
  .on(enable2faFxDone.sms, () => 'sms_code')

//
$phone.on(changePhone, (_, phone) => phone).reset(blurTwoFaSettingsScreen);
$phoneInFocus
  .on(focusPhone, () => true)
  .reset(blurPhone, blurTwoFaSettingsScreen);
$phoneTouched.on(focusPhone, () => true).reset(blurTwoFaSettingsScreen);

$code.on(changeCode, (_, code) => code).reset(blurTwoFaSettingsScreen);
$codeInFocus.on(focusCode, () => true).reset(blurCode, blurTwoFaSettingsScreen);
$codeTouched.on(focusCode, () => true).reset(blurTwoFaSettingsScreen);

forward({
  from: pressDisable2fa,
  to: showSuccess.prepend(() => ({
    domain: 'twoFaDomain',
    title: 'confirmDisable2faTitle',
    message: 'confirmDisable2faMessage',
    buttons: [
      { text: 'cancel', style: 'cancel' },
      { text: 'yes', onPress: () => disable2faFx() },
    ],
    options: { cancelable: false },
  })),
});

forward({
  from: [disable2faFx.done, verifyEnable2faFx.done],
  to: [fetchUserFx, fetchUserV2Fx],
});

forward({
  from: disable2faFx.done,
  to: [
    showSuccess.prepend(() => ({
      domain: 'twoFaDomain',
      title: 'successfullyDisabled2faTitle',
      message: 'successfullyDisabled2faOKButtonText',
    })),
    redirectToScreenFx.prepend(() => ({ screen: routes.profileTab.profileMenu })),
  ],
});

verifyEnable2faFx.done.watch(() => {
  Alert.alert(i18n.t('twoFaDomain:successfullyEnabled2faTitle'), '', [
    {
      text: i18n.t('twoFaDomain:successfullyEnabled2faOKButtonText'),
    },
  ]);

  redirectToScreenFx({ screen: routes.profileTab.profileMenu });
});

forward({
  from: pressRedirectToKycSetup,
  to: redirectKycSetupFx,
});
