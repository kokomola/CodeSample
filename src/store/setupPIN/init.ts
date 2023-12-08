import uuid from 'react-native-uuid';


import { sha3_512 } from 'js-sha3';

import { combine, forward, guard, sample } from 'effector';
import {
  $salt,
  focusSetupPinScreen,
  generateSaltFx,
  setupPinFx,
  $form,
  submitConfirmStep,
  generateHashFx,
  $hash,
  $pin,
  changePin,
  $step,
  submitPinStep,
  $confirmPin,
  changeConfirmPin,
  $pinsAreEq,
  blurSetupPinScreen,
  $error,
  showErrorFx,
  resetStep,
} from '@store/setupPIN/index';
import { savePinSaltFx } from '@store/auth';
import i18n from '@utils/i18n';
import { showError } from '@store/alert';
import { endpoints } from '@constants/endpoints';
import { signedRequest } from '@utils/agent';
import { logline } from '@utils/debug';

forward({
  from: focusSetupPinScreen,
  to: generateSaltFx,
});

generateSaltFx.use(() => uuid.v4());
$salt.on(generateSaltFx.doneData, (_, salt) => salt);



$pin.on(changePin, (_, pin) => pin);
$confirmPin.on(changeConfirmPin, (_, pin) => pin);
$step.on(submitPinStep, () => 'confirm');
$salt.reset(blurSetupPinScreen, savePinSaltFx.done);
$pin.reset(blurSetupPinScreen, savePinSaltFx.done, resetStep);
$confirmPin.reset(blurSetupPinScreen, savePinSaltFx.done, resetStep);
$step.reset(blurSetupPinScreen, savePinSaltFx.done, resetStep);
$hash.reset(blurSetupPinScreen, savePinSaltFx.done);
$error.reset(blurSetupPinScreen, savePinSaltFx.done);

guard({
  source: sample({
    source: $form,
    clock: submitConfirmStep,
    fn: (body) => ({ body }),
  }),
  filter: $pinsAreEq,
  target: generateHashFx,
});

guard({
  source: combine($pinsAreEq, $step, (pinsAreEq, step) => ({
    pinsAreEq,
    step,
  })),
  clock: submitConfirmStep,
  filter: ({ step, pinsAreEq }) => !pinsAreEq && step === 'confirm',
  target: [resetStep, showErrorFx],
});

showErrorFx.use(() => {
  showError({
    title: i18n.t('AppDomainErrors:wrong_pin_code_title'),
    message: i18n.t('AppDomainErrors:wrong_pin_code_message'),
  });
});

generateHashFx.use(({ body }) => {
  const { generated_salt, pin_code, device_id } = body;
  return sha3_512(generated_salt + pin_code + device_id);
});

$hash.on(generateHashFx.doneData, (_, hash) => hash);

setupPinFx.use(async (body) => {
  const method = 'post';
  const url = endpoints.account.setupPin;
  return signedRequest({ method, url, body });
});
guard({
  source: sample({
    source: $form,
    clock: $hash.updates,
    fn: (body) => body,
  }),
  filter: $pinsAreEq,
  target: setupPinFx,
});

sample({
  source: $salt,
  clock: setupPinFx.done,
  fn: (pinSalt) => ({ pinSalt }),
  target: savePinSaltFx,
});

guard({
  source: $pin,
  filter: (pin) => pin.length === 4,
  target: submitPinStep,
});

guard({
  source: $confirmPin,
  filter: (pin) => pin.length === 4,
  target: submitConfirmStep,
});

//$salt.watch((salt) => logline('$store/setupPIN', { salt }));