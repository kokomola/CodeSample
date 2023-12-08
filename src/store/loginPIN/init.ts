import { guard, sample } from 'effector';
import { sha3_512 } from 'js-sha3';
import {
  $pin,
  changePin,
  $form,
  $hash,
  generateHashFx,
  submit,
  loginPinFx,
  blurLoginPinScreen,
  checkMobileDeviceToken,
} from '@store/loginPIN/index';
import { $accessToken } from '@store/auth';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';

$pin.on(changePin, (_, pin) => pin);

$pin.reset(blurLoginPinScreen);

sample({
  source: $form,
  clock: submit,
  fn: (body) => ({ body }),
  target: generateHashFx,
});

guard({
  source: $pin,
  filter: (pin) => pin.length === 4,
  target: submit,
});

generateHashFx.use(async ({ body }) => {
  const { generated_salt, pin_code, device_id } = body;
  return sha3_512(generated_salt + pin_code + device_id);
});
$hash.on(generateHashFx.doneData, (_, hash) => hash);

loginPinFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.loginPinCode;
  return signedRequest({ method, url, body });
});

sample({
  source: $form,
  clock: $hash.updates,
  fn: (body) => body,
  target: loginPinFx,
});

sample({
  source: $form,
  clock: checkMobileDeviceToken,
  target: loginPinFx
})


$accessToken.on(loginPinFx.doneData, (_, response) => response.data.token);
