import { endpoints } from './../../consts/endpoints';
import { guard, sample, split } from 'effector';
import {
  $code,
  $token,
  $form,
  changeCode,
  registerDeviceFx,
  submit,
  $codeInFocus,
  focusCode,
  $codeTouched,
  blurCode,
  registerDevice,
} from './index';
import { signInRequestFx } from '@store/api';
import { $accessToken, saveDeviceTokenFx } from '@store/auth';
import { blurRegisterDeviceScreen } from '@store/app';
import { TEST_ACCOUNT_CODE } from 'src/config';
import { $isTestAccount } from '@store/signInForm';
import { routes } from 'src/navigator/routes';
import { redirectToScreenFx } from '@store/redirect';
import { log, logline } from '@utils/debug';
import { signedRequest } from '@utils/agent';

$code
  .on(changeCode, (_, code) => code)
  .reset(blurRegisterDeviceScreen, registerDeviceFx.failData);
$token.on(signInRequestFx.failData, (_, error) => {
  return error.response?.data.error.data?.token;
});

$codeInFocus.on(focusCode, () => true).reset(blurCode);
$codeTouched.on(blurCode, () => true);

registerDeviceFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.registerDevice;

  const result = await signedRequest({ method, url, body });
  //log('[registerDeviceFx]', { response: result });
  return result;
});

split({
  source: sample({
    clock: registerDevice,
    source: $isTestAccount,
  }),
  match: {
    isTester: (isTestAccount) => isTestAccount,
  },
  cases: {
    isTester: changeCode.prepend(() => TEST_ACCOUNT_CODE),
    __: redirectToScreenFx.prepend(() => ({ screen: routes.auth.RegisterDevice })),
  },
});

guard({
  clock: $code.updates,
  source: $isTestAccount,
  filter: (isTestAccount, code) => isTestAccount && code.trim().length === 6,
  target: submit,
});


sample({
  source: $form,
  clock: submit,
  target: registerDeviceFx,
});

sample({
  source: registerDeviceFx.doneData,
  fn: (response) => ({ deviceToken: response.data.token }),
  target: saveDeviceTokenFx,
});

$accessToken.on(
  registerDeviceFx.doneData,
  (_, response) => response.data.accessToken
);

//registerDeviceFx.watch((body) => logline('[$registerDeviceFx]', body));

/* $accessToken.watch((accessToken) => logline('[$registerDevice', { accessToken }));
$token.watch((token) => logline('[$registerDevice', { token }));

$code.watch((code) => logline('[$code]', { code })); */
