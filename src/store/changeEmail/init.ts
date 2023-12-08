import { Alert } from 'react-native';
import { forward, sample } from 'effector';
import i18n from '@utils/i18n';
import * as RootNavigation from '../../navigator/RootNavigation';
import {
  $form,
  $newEmail,
  $newEmailInFocus,
  $newEmailTouched,
  blurNewEmail,
  changeNewEmail,
  changeEmailErrors,
  changeEmailFx,
  focusNewEmail,
  redirectToSettingsFx,
  submit,
} from '@store/changeEmail/index';
import { blurChangeEmailScreen } from '@store/app';
import { signedRequest } from '@utils/agent';
import { endpoints } from '@constants/endpoints';
import { routes } from 'src/navigator/routes';

$newEmail.on(changeNewEmail, (_, email) => email);

$newEmailInFocus.on(focusNewEmail, () => true).reset(blurNewEmail);

$newEmailTouched.on(blurNewEmail, () => true);

$newEmailInFocus.reset(blurChangeEmailScreen);

$newEmailTouched.reset(blurChangeEmailScreen);

$newEmail.reset(blurChangeEmailScreen);

changeEmailFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.changeEmail;
  return signedRequest({ method, url, body });
});

sample({
  clock: submit,
  source: $form,
  fn: (body) => body,
  target: changeEmailFx,
});

forward({
  from: changeEmailFx.done,
  to: redirectToSettingsFx,
});

redirectToSettingsFx.use(async () => {
  RootNavigation.reset({
    index: 0,
    routes: [{ name: routes.profileTab.profileMenu }],
  });
});

changeEmailFx.done.watch(() => {
  Alert.alert('', i18n.t('ChangeEmailStore:success'), [
    {
      text: 'OK',
    },
  ]);
});

changeEmailErrors.__.watch(() => {
  Alert.alert('', i18n.t('ChangeEmailStore:defaultError'), [
    {
      text: 'OK',
    },
  ]);
});
