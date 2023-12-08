import { Alert } from 'react-native';
import { forward, sample } from 'effector';
import i18n from '@utils/i18n';
import * as RootNavigation from '../../navigator/RootNavigation';
import {
  $form,
  $newPassword,
  $newPasswordConfirm,
  $newPasswordConfirmInFocus,
  $newPasswordConfirmTouched,
  $newPasswordInFocus,
  $newPasswordTouched,
  $oldPassword,
  $oldPasswordInFocus,
  $oldPasswordTouched,
  blurNewPassword,
  blurNewPasswordConfirm,
  blurOldPassword,
  changeNewPassword,
  changeNewPasswordConfirm,
  changeOldPassword,
  changePasswordErrors,
  changePasswordFx,
  focusNewPassword,
  focusNewPasswordConfirm,
  focusOldPassword,
  redirectToSettingsFx,
  submit,
} from '@store/changePassword/index';
import { blurChangePasswordScreen } from '@store/app';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { routes } from 'src/navigator/routes';

$oldPassword.on(changeOldPassword, (_, pass) => pass);
$newPassword.on(changeNewPassword, (_, pass) => pass);
$newPasswordConfirm.on(changeNewPasswordConfirm, (_, pass) => pass);

$oldPasswordInFocus.on(focusOldPassword, () => true).reset(blurOldPassword);
$newPasswordInFocus.on(focusNewPassword, () => true).reset(blurNewPassword);
$newPasswordConfirmInFocus
  .on(focusNewPasswordConfirm, () => true)
  .reset(blurNewPasswordConfirm);

$oldPasswordTouched.on(blurOldPassword, () => true);
$newPasswordTouched.on(blurNewPassword, () => true);
$newPasswordConfirmTouched.on(blurNewPasswordConfirm, () => true);

$oldPassword.reset(blurChangePasswordScreen);
$newPassword.reset(blurChangePasswordScreen);
$newPasswordConfirm.reset(blurChangePasswordScreen);
$oldPasswordInFocus.reset(blurChangePasswordScreen);
$newPasswordInFocus.reset(blurChangePasswordScreen);
$newPasswordConfirmInFocus.reset(blurChangePasswordScreen);
$oldPasswordTouched.reset(blurChangePasswordScreen);
$newPasswordTouched.reset(blurChangePasswordScreen);
$newPasswordConfirmTouched.reset(blurChangePasswordScreen);

changePasswordFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.changePassword;
  return signedRequest({ method, url, body });
});
sample({
  clock: submit,
  source: $form,
  fn: (body) => body,
  target: changePasswordFx,
});

forward({
  from: changePasswordFx.done,
  to: redirectToSettingsFx,
});

redirectToSettingsFx.use(async () => {
  RootNavigation.reset({
    index: 0,
    routes: [{ name: routes.profileTab.profileMenu }],
  });
});

changePasswordFx.done.watch(() => {
  Alert.alert('', i18n.t('ChangePasswordStore:success'), [
    {
      text: 'OK',
    },
  ]);
});

// errors
changePasswordErrors.invalidPassword.watch(() => {
  Alert.alert('', i18n.t('ChangePasswordStore:invalidPasswordError'), [
    {
      text: 'OK',
    },
  ]);
});

changePasswordErrors.__.watch(() => {
  Alert.alert('', i18n.t('ChangePasswordStore:defaultError'), [
    {
      text: 'OK',
    },
  ]);
});
