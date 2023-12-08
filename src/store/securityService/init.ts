import { keyboardHeight } from './../../consts/platform';
import { forward, split } from 'effector';
import { withdrawRequestFx } from '@store/withdraw';
import {
  $actionId,
  $currentOperation,
  setOperation,
  setActionId,
  $bioToken,
  setBioToken,
  launchBioVerificationFx,
} from './index';
import { SecurityOperation, SecurityStage } from './types';
import { initChildBS, openBS } from '@store/bottomSheetCommon';
import { heightScreen } from '@constants/platform';
import { buildIBDev, buildIBProd } from 'src/utils/globalpass';
import { IsProd } from '@utils/getEnv';
import { finishFaceCheck } from '@store/globalPassFaceCheck';

$actionId.on(setActionId, (_, id) => id);

$bioToken.on(setBioToken, (_, token) => token);

$currentOperation.on(setOperation, (_, operation) => operation);

const securityServiceVerifyResult = split(withdrawRequestFx.doneData, {
  twoFa: (result) => result.data.nextStage === SecurityStage.TwoFa,
});

forward({
  from: securityServiceVerifyResult.twoFa,
  to: [
    initChildBS.prepend(() => ({
      fcKey: 'TwoFaVerifyForm',
      height:
        heightScreen - (keyboardHeight + 381) > 0
          ? keyboardHeight + 381
          : heightScreen,
    })),
    setOperation.prepend(() => SecurityOperation.Withdraw2fa),
    openBS.prepend(() => 'TwoFaVerifyForm'),
  ],
});

launchBioVerificationFx.use(async (bioToken) => {
  console.log('bio token', bioToken);
  let token;
  if (IsProd) {
    console.log('is prod bio token');
    token = await buildIBProd(bioToken);
  } else {
    console.log('is dev bio token');
    token = await buildIBDev(bioToken);
  }
  console.log('checkface bio is over', token);
});

forward({
  from: launchBioVerificationFx.done,
  to: finishFaceCheck,
});
/* Debug */
