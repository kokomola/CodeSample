import { forward, sample } from 'effector';
import { Alert } from 'react-native';
import i18n from '@utils/i18n';

import { signUpRequest, signUpRequestFx } from '@store/api';
import {
  $email,
  changeEmail,
  $password,
  changePassword,
  $name,
  changeName,
  $phone,
  changePhone,
  $referral,
  changeReferral,
  $form,
  submit,
  throwEmailConfirmationAlertFx,
  $emailInFocus,
  focusEmail,
  blurEmail,
  $passwordInFocus,
  $nameInFocus,
  focusName,
  blurName,
  $phoneInFocus,
  focusPhone,
  blurPhone,
  focusPassword,
  blurPassword,
  $referralInFocus,
  focusReferral,
  blurReferral,
  $emailTouched,
  $passwordTouched,
  $nameTouched,
  $phoneTouched,
  $referralTouched,
  blurSignUpScreen,
} from '@store/signUpForm/index';
import { blurSignInScreen } from '@store/signInForm';
import { routes } from 'src/navigator/routes';
import { redirectToScreenFx } from '@store/redirect';

$email.on(changeEmail, (_, email) => email);
$password.on(changePassword, (_, password) => password);
$name.on(changeName, (_, name) => name);
$phone.on(changePhone, (_, phone) => phone);
$referral.on(changeReferral, (_, referral) => referral);

$emailInFocus.on(focusEmail, () => true).reset(blurEmail);
$passwordInFocus.on(focusPassword, () => true).reset(blurPassword);
$nameInFocus.on(focusName, () => true).reset(blurName);
$phoneInFocus.on(focusPhone, () => true).reset(blurPhone);
$referralInFocus.on(focusReferral, () => true).reset(blurReferral);

$emailTouched.on(blurEmail, () => true);
$passwordTouched.on(blurPassword, () => true);
$nameTouched.on(blurName, () => true);
$phoneTouched.on(blurPhone, () => true);
$referralTouched.on(blurReferral, () => true);

$email.reset(blurSignUpScreen);
$password.reset(blurSignUpScreen);
$name.reset(blurSignUpScreen);
$phone.reset(blurSignUpScreen);
$referral.reset(blurSignUpScreen);

$emailInFocus.reset(blurSignUpScreen);
$passwordInFocus.reset(blurSignUpScreen);
$nameInFocus.reset(blurSignUpScreen);
$phoneInFocus.reset(blurSignUpScreen);
$referralInFocus.reset(blurSignUpScreen);

$emailTouched.reset(blurSignUpScreen);
$passwordTouched.reset(blurSignUpScreen);
$nameTouched.reset(blurSignUpScreen);
$phoneTouched.reset(blurSignInScreen);
$referralTouched.reset(blurSignUpScreen);

sample({
  source: $form,
  clock: submit,
  target: signUpRequest,
});

forward({
  from: signUpRequestFx.done,
  to: throwEmailConfirmationAlertFx,
});

throwEmailConfirmationAlertFx.use(() => {
  Alert.alert(
    i18n.t('signUpFormStore:emailConfirmationAlertTitle'),
    i18n.t('signUpFormStore:emailConfirmationAlertMessage'),
    [
      {
        text: i18n.t('signUpFormStore:emailConfirmationAlertButton'),
        onPress: redirectToScreenFx.prepend(() => ({ screen: routes.auth.SignIn })),
      },
    ]
  );
});
