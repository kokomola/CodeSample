import {check, openSettings, request} from 'react-native-permissions';
import {forward, guard} from 'effector';
import {
  $permissions,
  askPerm,
  checkPermFx,
  requestPermFx,
  checkedPerm,
  requestedPerm,
  openSettingsFx,
  openSettingsEvent,
} from '@store/permissions/index';
import {Domains} from '@store/app/constants';
import {platform} from '@constants/platform';
import {showSuccess} from '@store/alert';
import {
  //focusGlobalPassBioScreen,
  focusGlobalPassKycScreen,
  focusKycScreen,
  focusWithdrawScreen,
} from '@store/app';
import {PermRESULT, REQUEST_PERMISSION_TYPE} from './types';

$permissions
  .on(checkPermFx.doneData, (perms, perm) => ({...perms, ...perm}))
  .on(requestPermFx.doneData, (perms, perm) => ({...perms, ...perm}));

forward({
  from: [
    focusWithdrawScreen,
    /* focusGlobalPassBioScreen, */ focusGlobalPassKycScreen,
    focusKycScreen,
  ],
  to: askPerm.prepend(() => 'camera'),
});

forward({
  from: askPerm,
  to: checkPermFx,
});

checkPermFx.use(async permKey => {
  const perms = REQUEST_PERMISSION_TYPE[permKey][platform];
  if (perms) {
    const result = await check(perms);
    return {[permKey]: PermRESULT[result]};
  }
  return {[permKey]: PermRESULT.denied};
});

requestPermFx.use(async permKey => {
  const perms = REQUEST_PERMISSION_TYPE[permKey][platform];
  if (perms) {
    const result = await request(perms);
    return {[permKey]: PermRESULT[result]};
  }
  return {[permKey]: PermRESULT.denied};
});

forward({
  from: checkedPerm.denied.map(({params: permKey}) => permKey),
  to: requestPermFx,
});

openSettingsFx.use(async permKey => {
  await openSettings();
  askPerm(permKey);
});

forward({
  from: openSettingsEvent,
  to: openSettingsFx,
});

forward({
  from: checkedPerm.unavailable.map(({params: permKey}) => permKey),
  to: showSuccess.prepend(permKey => ({
    domain: Domains.Permission,
    title: 'featureNotAvailable',
    message: 'openSettings',
    buttons: [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'ok',
        onPress: openSettings,
      },
    ],
  })),
});

forward({
  from: [checkedPerm.blocked, requestedPerm.blocked, requestedPerm.denied],
  to: showSuccess.prepend(
    (
      {
        /* params: permKey */
      },
    ) => ({
      domain: Domains.Permission,
      title: 'allowCamera',
      message: 'openSettings',
      buttons: [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'ok',
          onPress: openSettings,
        },
      ],
    }),
  ),
});

//$permissions.watch((permissions) => log('[$permissions])', { permissions }));
