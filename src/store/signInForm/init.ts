import { sample, forward } from 'effector';

import { signInRequest, signInRequestFx } from '../api';
import {
  $captcha,
  $captchaRef,
  $email,
  $signInform,
  $password,
  changeCaptcha,
  changeCaptchaRef,
  changeEmail,
  changePassword,
  $emailInFocus,
  focusEmail,
  blurEmail,
  $passwordInFocus,
  focusPassword,
  blurPassword,
  $emailTouched,
  $passwordTouched,
  blurSignInScreen,
  pressSignIn,
  $loadingCaptcha,
  changeLoadingCaptcha,
  $isTestAccount,
} from './index';

import { $accessToken } from '@store/auth';
import { logline } from '@utils/debug';
import { TEST_ACCOUNT_EMAIL } from 'src/config';
import { registerDeviceFx } from '@store/registerDeviceForm';

$email.on(changeEmail, (_, email) => email);
$password.on(changePassword, (_, password) => password);
$captcha.on(changeCaptcha, (_, captcha) => captcha);
$captchaRef.on(changeCaptchaRef, (_, captchaRef) => captchaRef);

$emailInFocus.on(focusEmail, () => true).reset(blurEmail);
$passwordInFocus.on(focusPassword, () => true).reset(blurPassword);

$emailTouched.on(blurEmail, () => true);
$passwordTouched.on(blurPassword, () => true);

$email.reset(blurSignInScreen);
$password.reset(blurSignInScreen);
$captcha.reset(blurSignInScreen);
$emailInFocus.reset(blurSignInScreen);
$passwordInFocus.reset(blurSignInScreen);
$emailTouched.reset(blurSignInScreen);
$passwordTouched.reset(blurSignInScreen);

$loadingCaptcha.on(changeLoadingCaptcha, (_, isLoading) => isLoading);

$isTestAccount
  .on(changeEmail, (_, email) => email === TEST_ACCOUNT_EMAIL)
  .reset(registerDeviceFx.doneData);

sample({
  source: $signInform,
  clock: pressSignIn,
  target: signInRequest,
});

forward({
  from: [changeCaptcha, blurSignInScreen],
  to: changeLoadingCaptcha.prepend((captcha) => false),
});

$accessToken.on(signInRequestFx.doneData, (_, { data }) => data.token);

/* $captcha.watch((c = '') => logline('[$captcha]', c));

$email.watch((email) => logline('', { email, TEST_ACCOUNT_EMAIL }));
$email.watch((email) => logline('email === TEST_ACCOUNT_EMAIL', email === TEST_ACCOUNT_EMAIL));
$isTestAccount.watch((isTestAccount) => logline('', { isTestAccount })); */

//$captchaRef.watch((c) => logline('[$captcha ref]', !!c?.current));

/* reloadCaptchaFx.use(({ captchaRef }) => {
  captchaRef?.current?.refresh();
}); */
