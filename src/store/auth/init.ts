import { bootstrapDeviceIdFx } from './../deviceInfo/index';
import {
  $deviceToken,
  $pinSalt,
  bootstrapFx,
  InitialScreenGate,
  removeDeviceTokenFx,
  removePinSaltFx,
  saveDeviceTokenFx,
  savePinSaltFx,
  $canLoginPin,
  $canSetupPin,
  $cantDoAnything,
  setTokenToHeader,
  $accessToken,
  $canOpenApp,
} from '@store/auth/index';
import AsyncStorage from '@react-native-community/async-storage';
import { forward, guard, combine } from 'effector';
import { tokenToHeaders } from '@utils/agent';
import { routes } from 'src/navigator/routes';
import { DEVICE_TOKEN_STORAGE_KEY, DEVICE_UNIQUE_ID, PIN_SALT_STORAGE_KEY } from 'src/common/storageKey';
import { redirectToScreenFx } from '@store/redirect';
import { logline } from '@utils/debug';

// bootstrap
forward({
  from: InitialScreenGate.open,
  to: bootstrapFx,
});

bootstrapFx.use(async () => {
  const deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN_STORAGE_KEY);
  const pinSalt = await AsyncStorage.getItem(PIN_SALT_STORAGE_KEY);
  const deviceId = await AsyncStorage.getItem(DEVICE_UNIQUE_ID);
  //log('[$auth] GET from AsyncStorage', { deviceToken, pinSalt });
  return { deviceToken, pinSalt, deviceId };
});

// device token
saveDeviceTokenFx.use(async ({ deviceToken }) => {
  await AsyncStorage.setItem(DEVICE_TOKEN_STORAGE_KEY, deviceToken);
});

removeDeviceTokenFx.use(async () => {
  await AsyncStorage.removeItem(DEVICE_TOKEN_STORAGE_KEY);
});

$deviceToken
  .on(bootstrapFx.doneData, (_, { deviceToken }) => deviceToken)
  .on(saveDeviceTokenFx.done, (_, { params }) => params.deviceToken)
  .reset(removeDeviceTokenFx.done);

// pin salt
savePinSaltFx.use(async ({ pinSalt }) => {
  await AsyncStorage.setItem(PIN_SALT_STORAGE_KEY, pinSalt);
});

removePinSaltFx.use(async () => {
  await AsyncStorage.removeItem(PIN_SALT_STORAGE_KEY);
});

$pinSalt
  .on(bootstrapFx.doneData, (_, { pinSalt }) => pinSalt)
  .on(savePinSaltFx.done, (_, { params }) => params.pinSalt)
  .reset(removePinSaltFx.done);

// redirections

guard({
  source: $canLoginPin.updates,
  filter: $canLoginPin,
  target: redirectToScreenFx.prepend(() => ({ screen: routes.auth.LoginPIN })),
});

guard({
  source: $canSetupPin.updates,
  filter: $canSetupPin,
  target: redirectToScreenFx.prepend(() => ({ screen: routes.auth.SetupPIN })),
});

guard({
  source: $cantDoAnything.updates,
  filter: $cantDoAnything,
  target: redirectToScreenFx.prepend(() => ({ screen: routes.auth.Initial })),
});

forward({
  from: $accessToken.updates,
  to: setTokenToHeader,
});

setTokenToHeader.use((accessToken) => tokenToHeaders(accessToken));

// prints
//bootstrapFx.watch(() => console.log('bootstrapFx'));
// bootstrapFx.done.watch((s) => console.log('bootstrapFx done', s));
// bootstrapFx.fail.watch((s) => console.log('bootstrapFx fail', s));

/* combine($canLoginPin, $canSetupPin, $cantDoAnything, $canOpenApp, (canLoginPin, canSetupPin, cantDoAnything, canOpenApp) => logline('$store/auth', {
  canLoginPin, canSetupPin, cantDoAnything, canOpenApp
})) */
