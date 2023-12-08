import { forward } from 'effector';
import { logout } from '@store/logout/index';
import { $accessToken, $pinSalt, removeDeviceTokenFx, removePinSaltFx } from '@store/auth';
import { reloadAppFx } from '@store/app/connection';
import { removeDeviceIdFx } from '@store/deviceInfo';

forward({
  from: logout,
  to: [removePinSaltFx, removeDeviceTokenFx, removeDeviceIdFx, reloadAppFx /* unsubscribePushFx */],
});

$pinSalt.reset(logout);
$accessToken.reset(logout);
